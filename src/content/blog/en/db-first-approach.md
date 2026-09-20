---
title: "The DB-First Approach in DDD: Why I Step Away from Traditional ORM Mapping"
description: "How combining Domain-Driven Design, CQRS, Flyway, and jOOQ offers predictable persistence and a pristine, 100% pure domain model."
pubDate: 2026-09-20
author: "Miguel Ángel Luna"
tags: ["DDD", "Architecture", "Database", "Java"]
image: "/blog/db-first-approach-en.webp"
---

When combining **Domain-Driven Design (DDD)** and **CQRS** with a traditional ORM like Hibernate or JPA, you inevitably hit the same wall: the object-relational mapping starts dictating how you design your core business model.

In more than one production environment, I've run into bloated *Aggregates* running hundreds of lines long, unexpected database locks, and rogue N+1 queries appearing out of nowhere. All because domain entities and database tables were forced to be the exact same thing.

To steer clear of this trap, in my recent projects I've embraced a **DB-First approach with Flyway and jOOQ**: a strategy that keeps domain logic strictly pure, drastically simplifies read queries, and makes database persistence 100% predictable.

![The DB-First Approach in DDD](/blog/db-first-approach-en.webp)

---

## 1. Why the change? The entity graph trap

In the enterprise Java ecosystem, it's common practice to model domain aggregates as giant **entity graphs** wired with annotations:

* `@OneToOne` and `@ManyToOne` scattered everywhere simply because foreign keys exist in the database.
* Cascades and fetch policies (`FetchType.LAZY` / `EAGER`) making opaque decisions about when and how much data gets read or written.
* Giant, fuzzy *Aggregates*, where traversing relationships feels practically free—until an innocent method call fires 50 extra database queries.

This trap leads to critical issues in high-concurrency environments:

1. **Broken Aggregate boundaries:** A `@ManyToOne` relationship tempts developers into modifying external objects "because they are already loaded in memory," violating business invariants and coupling unrelated use cases.
2. **Unpredictable performance:** Ghost queries, N+1 issues, and cascading locks caused by ORM dirty checking.
3. **Polluted domain model:** Business classes laden with infrastructure annotations, no-arg constructors forced by proxy frameworks, and data types tailored to ORM quirks rather than business rules.

---

## 2. The Strategy: What DB-First really means

A **DB-First** approach establishes that the **database schema and its versioned migrations** are the single source of truth for persistence:

* First, we define tables, columns, constraints, and indexes in **raw SQL managed with Flyway**.
* Based on that concrete structure, **jOOQ generates strongly typed Java code** representing the tables and records for our infrastructure layer.
* **The domain does not mimic the database:** The domain model is designed exclusively around business invariants, without caring whether the underlying storage is PostgreSQL, MySQL, or flat files.

```text
[ Flyway Migrations (SQL) ]
            │
            ▼
[ jOOQ Code Generation ]
            │
            ▼
[ Infrastructure Repository ] ◄── (Explicit Mapping) ──► [ Pure Aggregate (Domain) ]
```

### Core Design Principles

* **Relationships by identity, not navigation:** Aggregates hold strong references using Value Objects (`AccountId`, `CardId`), never full nested objects.
* **Explicit mapping in Repositories:** The infrastructure layer explicitly maps between jOOQ `Record` instances and pure domain entities. Zero magic, zero surprises.
* **Compact Aggregates:** Aggregates load only the state strictly required to enforce and execute a given business invariant.

---

## 3. Clear separation with CQRS

Once domain logic is decoupled from the relational schema, applying **CQRS (Command Query Responsibility Segregation)** becomes natural and straightforward:

* **Reads (Queries):** When rendering screens, feeding client APIs, or generating reports, **you don't need to instantiate an Aggregate**. We query the database directly using jOOQ, executing optimized SQL projections into immutable DTOs with explicit joins.
* **Writes (Commands):** The command use case orchestrates the flow: it fetches the aggregate by ID via its repository, invokes business rules, persists the modified state, and publishes resulting domain events.

---

## 4. Practical Examples: The Complete Flow

To see all the pieces fit together, let's look at a classic banking domain: a customer account (`accounts`) with multiple associated payment cards (`cards`).

### Step 1: The Source of Truth in SQL (Flyway Migration)

Everything starts by writing the relational schema migration in raw SQL (`V1__create_accounts_and_cards.sql`). Here we define precise types, constraints, and indexes optimized for our queries:

```sql
CREATE TABLE accounts (
    id UUID PRIMARY KEY,
    holder_name VARCHAR(255) NOT NULL,
    balance NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE cards (
    id UUID PRIMARY KEY,
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    card_number_masked VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cards_account_status ON cards(account_id, status);
```

Flyway executes this migration, and **jOOQ generates strongly typed classes** (`ACCOUNTS`, `CARDS`, records, and keys) directly from this schema.

### Step 2: Optimized Read Query (Query)

For reads, we completely bypass the domain model. The use case queries the database via jOOQ and projects the result directly into a clean DTO:

```java
// Immutable flat DTO that matches the projected query columns exactly
public record AccountOverviewResponse(
    UUID id,
    String holderName,
    BigDecimal balance,
    String currency,
    int activeCardsCount
) {}

@Service
public class GetAccountOverviewQueryHandler {

    private final DSLContext dsl;

    public GetAccountOverviewQueryHandler(DSLContext dsl) {
        this.dsl = dsl;
    }

    public AccountOverviewResponse handle(AccountId accountId) {
        // Clean, type-safe SQL query without instantiating domain entities
        return dsl.select(
                ACCOUNTS.ID,
                ACCOUNTS.HOLDER_NAME,
                ACCOUNTS.BALANCE,
                ACCOUNTS.CURRENCY,
                count(CARDS.ID).as("active_cards_count")
            )
            .from(ACCOUNTS)
            .leftJoin(CARDS).on(CARDS.ACCOUNT_ID.eq(ACCOUNTS.ID).and(CARDS.STATUS.eq("ACTIVE")))
            .where(ACCOUNTS.ID.eq(accountId.value()))
            .groupBy(ACCOUNTS.ID, ACCOUNTS.HOLDER_NAME, ACCOUNTS.BALANCE, ACCOUNTS.CURRENCY)
            .fetchOneInto(AccountOverviewResponse.class);
    }
}
```

### Step 3: Transactional Command (Command)

For state-mutating operations, we load the pure Aggregate through its repository, enforce business rules, and explicitly persist changes:

```java
@Service
@Transactional
public class WithdrawMoneyUseCase {

    private final AccountRepository accountRepository;
    private final EventPublisher eventPublisher;

    public WithdrawMoneyUseCase(AccountRepository accountRepository, EventPublisher eventPublisher) {
        this.accountRepository = accountRepository;
        this.eventPublisher = eventPublisher;
    }

    public void execute(WithdrawMoneyCommand command) {
        // 1. Fetch pure Aggregate (without pulling unnecessary subgraphs) and lock the row to prevent race conditions
        Account account = accountRepository.findByIdForUpdate(command.accountId())
            .orElseThrow(() -> new AccountNotFoundException(command.accountId()));

        // 2. Execute business rule inside the Aggregate
        account.withdraw(command.amount());

        // 3. Persist state changes via repository (powered by jOOQ under the hood)
        accountRepository.save(account);

        // 4. Dispatch registered domain events
        eventPublisher.publish(account.pullDomainEvents());
    }
}
```

And how does the repository implementation look under the hood? This is where the DB-First approach truly shines: the pessimistic lock is a native SQL clause (`FOR UPDATE`), and saving is performed via an atomic *upsert* (`ON CONFLICT ... DO UPDATE`) in a single network roundtrip, without needing opaque *dirty checking* or JPA's pre-insert `SELECT`:

```java
@Repository
public class JooqAccountRepository implements AccountRepository {

    private final DSLContext dsl;

    public JooqAccountRepository(DSLContext dsl) {
        this.dsl = dsl;
    }

    @Override
    public Optional<Account> findByIdForUpdate(AccountId id) {
        return dsl.selectFrom(ACCOUNTS)
            .where(ACCOUNTS.ID.eq(id.value()))
            .forUpdate() // Native row-level pessimistic lock (SELECT ... FOR UPDATE)
            .fetchOptional()
            .map(this::toDomain); // Clean in-memory reconstitution without ORM proxies
    }

    @Override
    public void save(Account account) {
        // Atomic upsert: inserts if new, updates by ID if already exists
        dsl.insertInto(ACCOUNTS)
            .set(ACCOUNTS.ID, account.id().value())
            .set(ACCOUNTS.HOLDER_NAME, account.holderName().value())
            .set(ACCOUNTS.BALANCE, account.balance().amount())
            .set(ACCOUNTS.CURRENCY, account.balance().currency())
            .onConflict(ACCOUNTS.ID)
            .doUpdate()
            .set(ACCOUNTS.HOLDER_NAME, account.holderName().value())
            .set(ACCOUNTS.BALANCE, account.balance().amount())
            .execute();
    }

    private Account toDomain(AccountsRecord record) {
        return Account.reconstitute(
            new AccountId(record.getId()),
            new HolderName(record.getHolderName()),
            new Money(record.getBalance(), record.getCurrency())
        );
    }
}
```

---

## 5. Takeaways and Trade-offs

Embracing **DB-First + jOOQ + DDD** in my projects fundamentally changed the way I build backend services:

* **Predictable latencies:** Accidental N+1 queries and massive memory allocations triggered by uncontrolled lazy loading are eliminated at the root.
* **Zero-overhead roundtrips:** Every database interaction is reduced to the theoretical minimum number of queries: on reads, a single projection fetches only the requested columns; on writes, an atomic upsert completely eliminates the pre-insert `SELECT` query traditional ORMs execute to check if an ID already exists.
* **Zero-dependency domain:** You can run and verify any business rule with unit tests running in milliseconds—no Spring context or in-memory databases (H2) required.
* **Migrations as contracts:** Every database change is audited, reviewed, and versioned in SQL before touching a single line of Java code.

### What are the trade-offs?

Engineering always involves trade-offs, and it's essential to be clear about the costs:
1. **Manual mapping:** You write the translation between jOOQ `Record` classes and your domain entities yourself. In return, you gain absolute control over what gets persisted and when.
2. **Additional build step:** Adding a migration requires regenerating jOOQ classes before referencing them, which requires clean Gradle or Maven build setup.

For transactional engines, core services, or domains where consistency and performance are paramount, swapping ORM magic for the clarity and control of a DB-First architecture is an approach well worth exploring.
