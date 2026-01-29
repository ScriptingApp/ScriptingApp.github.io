---
title: Configuration
description: The configuration parameters of the SQLite module.

---

`SQLite.Configuration` defines how a database is opened and how it behaves at runtime. It controls fundamental SQLite settings such as foreign key enforcement, journaling mode, busy handling, read-only mode, and reader concurrency. It also provides a hook to initialize schema and perform one-time database setup.

SQLite is a global API in Scripting and does not require an import. In production code, wrap database operations in `try / catch`.

```ts
try {
  const path = Path.join(FileManager.documentsDirectory, "example.sqlite")

  const config = new SQLite.Configuration()
  config.foreignKeysEnabled = true
  config.journalMode = "wal"
  config.busyMode = 2
  config.maximumReaderCount = 4
  config.label = "main-db"

  config.prepareDatabase(db => {
    db.createTable("users", {
      ifNotExists: true,
      columns: [
        { name: "id", type: "integer", primaryKey: true, autoIncrement: true },
        { name: "name", type: "text", notNull: true }
      ]
    })

    db.createIndex("users_name_idx", {
      table: "users",
      columns: ["name"],
      ifNotExists: true
    })
  })

  const queue = SQLite.openQueue(path, config)
} catch (e) {
  // Handle database errors
}
```

---

### Type Definition

```ts
class Configuration {
  foreignKeysEnabled: boolean
  readonly: boolean
  label: string | null
  busyMode: "immediateError" | DurationInSeconds
  journalMode: "wal" | "default"
  maximumReaderCount: number

  prepareDatabase(setup: (db: Database) => void): void
}
```

---

## Properties

### foreignKeysEnabled

Enables or disables SQLite foreign key constraints.

When enabled, SQLite enforces `REFERENCES` constraints and applies `ON DELETE` / `ON UPDATE` actions.

```ts
const config = new SQLite.Configuration()
config.foreignKeysEnabled = true
```

Practical guidance:

* Enable this when your schema uses foreign keys and you rely on referential integrity.
* If disabled, foreign key declarations may exist in schema but are not enforced.

---

### readonly

Opens the database in read-only mode.

```ts
const config = new SQLite.Configuration()
config.readonly = true

const pool = SQLite.openPool(path, config)
```

Practical guidance:

* Use for analytics, reporting, or safe viewing of data.
* Any write attempt (DDL/DML) will fail.

---

### label

An optional identifier used to describe the connection instance (for debugging, logging, diagnostics, or internal labeling).

```ts
const config = new SQLite.Configuration()
config.label = "cache-db"
```

---

### busyMode

Controls what happens when the database is busy (locked by another connection/transaction).

Allowed values:

* `"immediateError"`: fail immediately when the database is busy
* `DurationInSeconds`: wait for the specified number of seconds before failing

```ts
const config = new SQLite.Configuration()
config.busyMode = "immediateError"
```

```ts
const config = new SQLite.Configuration()
config.busyMode = 2
```

Practical guidance:

* For UI-sensitive scripts or strict latency control, consider `"immediateError"`.
* For normal workloads with occasional contention, use a small duration (for example `1`–`3` seconds).

---

### journalMode

Controls SQLite journaling behavior.

* `"default"`: platform/default journaling behavior
* `"wal"`: write-ahead logging, typically better for concurrency

```ts
const config = new SQLite.Configuration()
config.journalMode = "wal"
```

Practical guidance:

* `wal` is usually recommended for concurrent read access and better throughput.
* Use `default` if you want the system default behavior or need maximum compatibility.

---

### maximumReaderCount

Sets the maximum number of concurrent reader connections (primarily relevant for `DatabasePool`).

```ts
const config = new SQLite.Configuration()
config.maximumReaderCount = 4

const pool = SQLite.openPool(path, config)
```

Practical guidance:

* Increase for read-heavy workloads where parallel queries improve performance.
* Keep moderate to avoid excessive resource usage.

---

## Methods

### prepareDatabase(setup)

Registers a setup callback executed when preparing the database connection. This is the recommended place to:

* Create tables and indexes
* Perform schema migrations
* Set up deterministic initial state

```ts
const config = new SQLite.Configuration()

config.prepareDatabase(db => {
  db.execute("PRAGMA user_version = 1")

  db.createTable("events", {
    ifNotExists: true,
    columns: [
      { name: "id", type: "integer", primaryKey: true },
      { name: "createdAt", type: "date", notNull: true, indexed: true },
      { name: "payload", type: "text" }
    ]
  })
})
```

Important notes:

* Keep this callback deterministic and fast.
* Avoid putting large data imports here; treat it as schema/setup logic.
* If you need migrations, prefer checking `db.schemaVersion()` (or your own versioning approach) and applying incremental updates.

---

## Recommended Patterns

### Basic Configuration Template

```ts
function makeConfig() {
  const config = new SQLite.Configuration()
  config.foreignKeysEnabled = true
  config.journalMode = "wal"
  config.busyMode = 2
  config.maximumReaderCount = 4
  return config
}
```

### Using a Configuration with Queue vs Pool

```ts
try {
  const path = Path.join(FileManager.documentsDirectory, "app.sqlite")
  const config = makeConfig()

  const queue = SQLite.openQueue(path, config)
  // or:
  const pool = SQLite.openPool(path, config)
} catch (e) {
  // Handle errors
}
```

---

## Common Mistakes

* Not enabling foreign keys when using `references` in table definitions.
* Setting an excessively large `maximumReaderCount` (may increase memory/file descriptor usage).
* Using `"immediateError"` busy mode in workflows that regularly contend on the same database.
* Performing heavy data operations inside `prepareDatabase` (should focus on schema).
