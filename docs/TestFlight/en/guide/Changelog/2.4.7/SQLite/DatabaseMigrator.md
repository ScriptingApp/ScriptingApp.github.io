---
title: DatabaseMigrator
description: It is responsible for managing and executing database schema migrations.

---

`DatabaseMigrator` is responsible for **managing and executing database schema migrations**.
It provides an ordered, traceable, and repeatable mechanism to evolve database schemas safely as an application grows.

In the Scripting SQLite API, `DatabaseMigrator` is typically used together with `DatabaseQueue` or `DatabasePool`, and migrations are executed during database initialization or application startup.

---

## Design Goals

The core goals of `DatabaseMigrator` are:

* Manage migrations using **explicit identifiers**
* Guarantee that each migration **runs at most once**
* Execute migrations **in registration order**
* Provide safe access to `Database` during migrations
* Support foreign key checking strategies for complex schema changes
* Expose migration state for diagnostics and debugging

---

## Type Definition

```ts
type DatabaseMigratorForeignKeyChecks =
  | "deferred"
  | "immediate"

class DatabaseMigrator {
  eraseDatabaseOnSchemaChange: boolean
  readonly migrations: string[]

  disablingDeferredForeignKeyChecks(): void

  registerMigration(
    identifier: string,
    migration: (db: Database) => void
  ): void

  registerMigration(
    identifier: string,
    foreignKeyChecks: DatabaseMigratorForeignKeyChecks,
    migration: (db: Database) => void
  ): void

  migrate(
    writer: DatabaseQueue | DatabasePool,
    upToTargetIdentifier?: string
  ): void

  appliedMigrations(db: Database): string[]
  appliedIdentifiers(db: Database): string[]
  completedMigrations(db: Database): string[]
  hasCompletedMigrations(db: Database): boolean
  hasBeenSuperseded(db: Database): boolean
}
```

---

## Basic Workflow

A typical migration workflow consists of:

1. Creating a `DatabaseMigrator`
2. Registering migrations in order
3. Executing migrations during database setup

```ts
const migrator = new SQLite.DatabaseMigrator()

migrator.registerMigration("create_users", db => {
  db.createTable("users", {
    columns: [
      { name: "id", type: "integer", primaryKey: true },
      { name: "name", type: "text", notNull: true }
    ]
  })
})

migrator.registerMigration("add_email_to_users", db => {
  db.execute("ALTER TABLE users ADD COLUMN email TEXT")
})

migrator.migrate(queue)
```

---

## Migration Identifiers

Each migration must have a **unique identifier**, which is used to:

* Track whether the migration has been applied
* Determine execution order
* Prevent duplicate execution

Migrations are executed in **registration order**, not by sorting identifiers.

### Recommendations

* Identifiers should be stable and never changed after release
* Use descriptive, human-readable names
* Do not remove or reuse published migration identifiers

---

## registerMigration

### Basic Registration

```ts
migrator.registerMigration("create_posts", db => {
  db.createTable("posts", {
    columns: [
      { name: "id", type: "integer", primaryKey: true },
      { name: "title", type: "text" }
    ]
  })
})
```

The migration callback receives a writable `Database` instance.

---

### Registration with Foreign Key Checks

```ts
migrator.registerMigration(
  "add_foreign_key",
  "deferred",
  db => {
    db.execute(`
      CREATE TABLE comments (
        id INTEGER PRIMARY KEY,
        postId INTEGER REFERENCES posts(id)
      )
    `)
  }
)
```

---

## Foreign Key Check Strategies

### DatabaseMigratorForeignKeyChecks

Controls when foreign key constraints are validated during a migration.

#### deferred

* Foreign keys are validated at transaction commit
* Suitable for complex migrations involving multiple tables

#### immediate

* Foreign keys are validated immediately after each statement
* Suitable for simple, well-ordered migrations

---

## disablingDeferredForeignKeyChecks

Disables deferred foreign key checking during migrations.

```ts
migrator.disablingDeferredForeignKeyChecks()
```

Use cases:

* The platform does not support deferred foreign keys
* The migration logic does not rely on foreign key enforcement
* You want errors to surface as early as possible

---

## migrate

Executes registered migrations.

```ts
migrator.migrate(queue)
```

Or migrate only up to a specific migration:

```ts
migrator.migrate(queue, "add_email_to_users")
```

Notes:

* Migrations are executed using the writer side of `DatabaseQueue` or `DatabasePool`
* Each migration runs inside a transaction
* Already applied migrations are skipped automatically

---

## eraseDatabaseOnSchemaChange

Controls whether the database should be **erased and rebuilt** if an incompatible schema change is detected.

```ts
migrator.eraseDatabaseOnSchemaChange = true
```

Guidelines:

* Appropriate for cache or ephemeral databases
* Not recommended for critical user data
* Enabling this option may result in complete data loss

---

## Migration State Inspection

### migrations

Returns all registered migration identifiers.

```ts
console.log(migrator.migrations)
```

---

### appliedMigrations / appliedIdentifiers

Returns the migrations that have been applied to the database.

```ts
const applied = migrator.appliedMigrations(db)
```

---

### completedMigrations

Returns the list of migrations that completed successfully.

```ts
const completed = migrator.completedMigrations(db)
```

---

### hasCompletedMigrations

Indicates whether all registered migrations have been applied.

```ts
if (migrator.hasCompletedMigrations(db)) {
  console.log("All migrations completed")
}
```

---

### hasBeenSuperseded

Indicates whether the database schema has been superseded by newer migration definitions.

```ts
if (migrator.hasBeenSuperseded(db)) {
  console.log("Database schema is outdated")
}
```

This typically means:

* Migration definitions have changed
* The database schema no longer matches the current code

---

## Best Practices and Notes

* Migration functions should focus on **schema changes only**
* Avoid large data writes inside migrations
* Never modify or remove published migrations
* Use `eraseDatabaseOnSchemaChange` with extreme caution
* Keep migrations deterministic and repeatable

---

## Summary

`DatabaseMigrator` provides a **reliable, controlled, and inspectable migration system**:

* Identifier-based ordered migrations
* Built-in transaction and foreign key handling
* Detailed migration state inspection
* Seamless integration with Queue and Pool
