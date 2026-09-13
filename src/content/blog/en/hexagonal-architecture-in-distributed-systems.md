---
title: "Hexagonal Architecture in Distributed Systems: Lessons from Automotive"
description: "How we decoupled microservices using ports, adapters, and CQRS at Daimler, and why JSONB became a costly trap."
pubDate: 2026-09-01
author: "Miguel Angel Luna"
tags: ["Architecture", "Distributed Systems", "Java", "Spring Boot"]
image: "/blog/hexagonal-architecture.webp"
---

Coupling your core business logic to a framework like Spring Boot or directly to a database is like welding a car's engine straight onto its chassis: hit one pothole, and the entire cabin vibrates until it cracks. When I was working at Daimler on the connected vehicle platform, we found ourselves facing that exact dilemma.

We had dozens of microservices ingesting data and every time a third-party API or database schema changed, it triggered an unacceptable domino effect across our platform.

To eliminate that fragility, we adopted **Hexagonal Architecture (Ports and Adapters) paired with CQRS in Java**. Here is how we structured the solution, which shortcuts backfired, and the hard-won engineering lessons we learned along the way.

![Hexagonal Architecture in Distributed Systems](/blog/hexagonal-architecture.webp)

## 1. Why the Shift? The Initial Bottleneck

Most services begin life with the standard layered setup (*Controller ➔ Service ➔ Repository*) centered heavily around Spring Data JPA. It works fine initially, but as scale increases, three major pain points surfaced:

* **Framework hostage crisis:** Core domain entities were littered with Hibernate annotations (`@Entity`, `@Table`, `@ManyToOne`). Any tweak to how data was persisted required editing business logic.
* **Sluggish test suites:** Validating basic business logic forced us to boot up the entire Spring application context via `@SpringBootTest`. CI/CD pipelines crept from minutes to nearly half an hour.
* **Read and write contention:** The same domain aggregates were pulled into memory both for strict transactional writes and for lightweight dashboard reads, dragging down overall throughput.

## 2. The Strategy: Ports, Adapters, and CQRS

Our goal was simple: the **domain had to be pure Java**, completely oblivious to frameworks, message brokers, or storage backends. We split the architecture across three key pillars:

1. **Ports and Adapters:**
   The core domain defines **ports** (clean Java interfaces) for inbound and outbound operations. External systems—such as REST controllers, Kafka listeners, and PostgreSQL repositories—act as interchangeable **adapters** that implement those contracts. If we upgrade Spring Boot or switch databases tomorrow, the business core remains untouched.
2. **Clear Boundary Separation with CQRS:**
   We split system interactions into two distinct pipelines:
   * **Commands:** State-mutating actions (e.g., updating fleet telemetry or vehicle status). They route through the domain, enforce business invariants, and emit events.
   * **Queries:** Read-only lookups for analytics dashboards. They bypass the heavy domain models entirely and hit database read models optimized for ultra-low latency.
3. **Custom Annotation-Driven Tooling:**
   Manually wiring ports and adapters across dozens of microservices created excessive boilerplate. To keep developer ergonomics high, we built internal Spring annotations (`@CommandHandler`, `@QueryHandler`, `@UseCase`) coupled with a lightweight dispatcher that routed operations automatically at runtime.

## 3. The Reality Check: The JSONB Trap

To avoid constantly rewriting tables for each new car model, we took a tempting shortcut: **dumping dynamic sensor payloads into a PostgreSQL `JSONB` column**.

*"Flexible schema, zero migration headaches,"* we told ourselves. **It turned out to be our biggest architectural mistake.**

* **Cryptic query syntax:** The moment product teams needed aggregated filters on specific sensor keys, our SQL queries devolved into unreadable chains of `->>`, `#>>`, and `jsonb_extract_path`.
* **Resource-hungry GIN indexes:** To keep search queries from stalling out, we had to introduce heavy GIN indexes. These indexes bloated disk usage on our RDS instances and crippled continuous telemetry write throughput.
* **Complexity didn't disappear—it moved:** Without a strict schema enforced by the database, type-checking and schema-evolution guarantees fell on Java adapters, introducing far more application complexity than we originally saved.

We ultimately made the call to rip out JSONB entirely and rebuild on a structured relational schema. Fortunately, we took this decision early enough to avoid the headache of a massive live production migration.

## 4. Extreme Rigidity vs. Pragmatism: The 500 Value Objects Trap

When teams embrace Domain-Driven Design (DDD) and hexagonal architecture with almost religious fervor, over-engineering is just around the corner. We fell right into that trap.

In pure textbook theory, every single domain concept should be encapsulated in an immutable **Value Object** with its own validation logic. In real-world practice, this spiraled out of control: we ended up creating hundreds of tiny classes that were nothing more than thin, artificial wrappers around a primitive `String`, `Integer`, or `Boolean`:

* `VehicleVin` wrapping a String.
* `EngineDisplacement` wrapping an Integer.
* `ExteriorColor` wrapping a String.
* `IsActive` wrapping a Boolean.

The consequence? Moving simple data from an HTTP endpoint down to the database required unpacking, converting, validating, and repacking dozens of trivial primitives across endless mapper layers. Adding a single field to an entity forced modifications across 10 different files. It ground day-to-day engineering velocity to a halt.

**What actually worked:**
* **Explicit Input and Output Objects:** Using clear, dedicated Input and Output DTOs to cross port boundaries kept contracts strictly isolated without polluting the core domain.
* **Pragmatic primitives:** If an attribute doesn't guard complex invariants, keeping it as a plain language primitive inside your entity is ten times healthier than maintaining 500 artificial wrapper classes.

## 5. Key Takeaways and Results

Once we completed the transition across our microservice fleet and pruned the architectural over-engineering, the operational gains were undeniable:

* **Domain tests in milliseconds:** Running our domain test suite went from 20 minutes down to **under 30 seconds**, giving developers instant local feedback without booting Spring.
* **True infrastructure independence:** We successfully upgraded core frameworks and replaced messaging adapters without altering a single line of Daimler's core business logic.

The big lessons we took away:

* **Beware of Value Object dogmatism:** Not every piece of data needs its own class. Input and Output objects provide the ideal architectural boundary; wrapping every primitive only generates friction.
* **JSONB is no replacement for relational modeling:** Shortcuts with unstructured data in transactional systems quickly turn into an operational nightmare.
* **CQRS pays for itself:** Investing upfront in custom annotations and command buses required several weeks of foundational work, but it paid compounding dividends as the team expanded to dozens of consistent microservices.
