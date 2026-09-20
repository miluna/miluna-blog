---
title: "Enfoque DB-First en DDD: por qué prefiero alejarme del mapeo clásico de ORMs"
description: "Cómo combinar Domain-Driven Design, CQRS, Flyway y jOOQ para lograr persistencia predecible y un dominio 100% puro sin enredos de entidades."
pubDate: 2026-09-20
author: "Miguel Ángel Luna"
tags: ["DDD", "Architecture", "Base de datos", "Java"]
image: "/blog/db-first-approach-es.webp"
---

Cuando combinas **Domain-Driven Design (DDD)** y **CQRS** mientras utilizas un ORM tradicional como Hibernate o JPA, antes o después te estrellas contra el mismo muro: el mapeo objeto-relacional empieza a dictar cómo diseñas tu modelo de negocio.

En más de un proyecto en producción me he encontrado con *Aggregates* hinchados de cientos de líneas, bloqueos de base de datos inesperados y consultas N+1 que aparecían de la nada. Todo por intentar forzar que las entidades de dominio y las tablas de la base de datos fuesen la misma cosa.

Para evitar esta trampa, en mis proyectos recientes he apostado por un **enfoque DB-First con Flyway y jOOQ**: una estrategia que permite mantener el dominio completamente puro, simplificar drásticamente las lecturas y hacer que la persistencia sea 100% predecible.

![Enfoque DB-First en DDD](/blog/db-first-approach-es.webp)

---

## 1. ¿Por qué el cambio? La trampa del grafo de entidades

En el ecosistema Java empresarial es habitual modelar el dominio como un gigantesco **grafo de entidades** mediante anotaciones:

* `@OneToOne` y `@ManyToOne` por todas partes simplemente porque en la base de datos existen claves foráneas (*foreign keys*).
* Cascadas y políticas de carga (`FetchType.LAZY` / `EAGER`) que acaban decidiendo de forma opaca cuándo y cuántos datos se leen o escriben.
* *Aggregates* gigantescos y difusos, donde "navegar" relaciones parece gratis hasta que una llamada inocente dispara 50 consultas adicionales.

Esta trampa genera problemas críticos en entornos de alta concurrencia:

1. **Límites de Aggregate rotos:** Una relación `@ManyToOne` invita a modificar objetos fuera del agregado correspondiente "porque ya están cargados en memoria", violando invariantes de negocio y acoplando casos de uso independientes.
2. **Rendimiento impredecible:** *Queries* fantasma, N+1 y bloqueos en cascada provocados por el *dirty checking* del ORM.
3. **Dominio contaminado:** Clases de negocio repletas de anotaciones de infraestructura, constructores vacíos requeridos por proxies y tipos adaptados a las limitaciones del ORM en lugar de a la lógica del negocio.

---

## 2. La estrategia: Qué significa realmente DB-First

Un enfoque **DB-First** establece que la **base de datos (su esquema y sus migraciones versionadas)** es la fuente de verdad de la persistencia:

* Primero definimos tablas, columnas, restricciones (*constraints*) e índices en **SQL puro gestionado con Flyway**.
* A partir de esa estructura real, **jOOQ genera código Java fuertemente tipado** que representa las tablas y registros para la capa de infraestructura.
* **El dominio no imita a la base de datos:** El modelo de dominio se diseña exclusivamente para satisfacer las reglas de negocio, sin saber si por debajo existe PostgreSQL, MySQL o ficheros planos.

```text
[ Migraciones Flyway (SQL) ]
            │
            ▼
[ Generación de código jOOQ ]
            │
            ▼
[ Repositorio de Infraestructura ] ◄── (Mapeo explícito) ──► [ Agregado Puro (Dominio) ]
```

### Principios clave de este diseño

* **Relaciones por identificador, no por navegación:** Los *Aggregates* solo guardan referencias fuertes mediante Value Objects (`AccountId`, `CardId`), nunca el objeto anidado completo.
* **Mapeo explícito en el Repositorio:** La capa de infraestructura traduce entre los `Record` generados por jOOQ y las entidades puras del dominio. Cero magia, cero sorpresas.
* **Aggregates compactos:** Solo cargan el estado estrictamente necesario para validar y ejecutar una regla de negocio.

---

## 3. Separación de caminos con CQRS

Al desacoplar el dominio del esquema relacional, la implementación de **CQRS (Command Query Responsibility Segregation)** se vuelve natural e intuitiva:

* **Lecturas (Queries):** Para pintar pantallas, alimentar APIs o generar reportes, **no necesitas instanciar un Aggregate**. Usamos jOOQ directamente para ejecutar proyecciones SQL optimizadas hacia DTOs inmutables con los *joins* exactos.
* **Escrituras (Commands):** El caso de uso orquesta la operación: pide al repositorio el agregado por su ID, invoca el método de negocio, persiste el estado modificado y publica los eventos de dominio resultantes.

---

## 4. Ejemplos prácticos: El flujo completo

Para ver cómo encajan todas las piezas, imaginemos un caso clásico en banca: una cuenta (`accounts`) con varias tarjetas asociadas (`cards`).

### Paso 1: La fuente de verdad en SQL (Migración Flyway)

Todo comienza escribiendo la migración relacional en SQL (`V1__create_accounts_and_cards.sql`). Aquí definimos los tipos precisos, restricciones e índices óptimos para nuestras consultas:

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

Flyway aplica esta migración y **jOOQ genera las clases tipadas** (`ACCOUNTS`, `CARDS`, registros y claves) directamente desde esta estructura.

### Paso 2: Consulta de lectura optimizada (Query)

En las consultas nos saltamos por completo el modelo de dominio. El caso de uso consulta la base de datos a través de jOOQ y proyecta los datos en un DTO plano:

```java
// DTO plano inmutable que proyecta exactamente las columnas seleccionadas
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
        // Consulta SQL limpia, tipada y sin instanciar entidades de dominio
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

### Paso 3: Comando de escritura transaccional (Command)

Para operaciones de negocio cargamos el Aggregate puro mediante su repositorio, aplicamos las reglas y persistimos los cambios de forma intencional:

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
        // 1. Cargamos el Agregado puro (sin subgrafos innecesarios)
        Account account = accountRepository.findById(command.accountId())
            .orElseThrow(() -> new AccountNotFoundException(command.accountId()));

        // 2. Ejecutamos la regla de negocio dentro del Agregado
        account.withdraw(command.amount());

        // 3. Persistimos los cambios mediante el repositorio (usando jOOQ por debajo)
        accountRepository.save(account);

        // 4. Despachamos los eventos de dominio registrados
        eventPublisher.publish(account.pullDomainEvents());
    }
}
```

---

## 5. Conclusiones y compromisos (*Trade-offs*)

Apostar por **DB-First + jOOQ + DDD** en mis desarrollos ha cambiado por completo la experiencia de construir servicios:

* **Latencias predecibles:** Se eliminan de raíz las consultas N+1 accidentales y las serializaciones masivas provocadas por el *lazy loading*.
* **Dominio libre de dependencias:** Puedes probar cualquier regla de negocio o invariante con tests unitarios instantáneos en milisegundos, sin necesidad de levantar Spring Context ni bases de datos en memoria (H2).
* **Migraciones como contrato:** Todo cambio en la base de datos queda auditado y versionado en SQL antes de tocar una sola línea de código Java.

### ¿Cuáles son los compromisos?

En ingeniería no existe la comida gratis y conviene tener claros los costes:
1. **Mapeo manual:** Tienes que escribir tú mismo la traducción entre los `Record` de jOOQ y tus entidades de dominio. A cambio, obtienes control milimétrico sobre qué y cómo se persiste.
2. **Paso extra de compilación:** Añadir una migración requiere regenerar las clases de jOOQ antes de usarlas en el código, lo que exige configurar adecuadamente el *build* en Gradle o Maven.

Para sistemas transaccionales, servicios core o proyectos donde la consistencia y el rendimiento no son negociables, cambiar la magia de los ORMs por la claridad y el control del enfoque DB-First es una alternativa que merece mucho la pena explorar.