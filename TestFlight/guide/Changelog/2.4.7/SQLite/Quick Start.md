# Quick Start

The SQLite module provides a complete local database solution for Scripting.
It is designed for structured data storage, transactional operations, and efficient querying, while offering clear concurrency semantics suitable for scripting environments.

All SQLite-related operations may throw runtime errors (for example, invalid SQL, schema conflicts, or I/O failures).
**It is strongly recommended to wrap SQLite usage in `try / catch`.**

```ts
try {
  const path = Path.join(FileManager.documentsDirectory, "example.sqlite")
  const queue = SQLite.openQueue(path)

  queue.write(db => {
    db.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
    db.execute("INSERT INTO users (name) VALUES (?)", ["Alice"])
  })

  const users = queue.read(db =>
    db.fetchAll<{ id: number; name: string }>(
      "SELECT * FROM users"
    )
  )

  console.log(users)
} catch (e) {
  // Handle database errors
}
```

***

## Configuration

`Configuration` defines the global behavior of a database connection, including foreign key enforcement, journaling mode, concurrency limits, and initialization logic.

```ts
const config = new SQLite.Configuration()
config.foreignKeysEnabled = true
config.journalMode = "wal"
config.maximumReaderCount = 4

config.prepareDatabase(db => {
  db.createTable("posts", {
    columns: [
      { name: "id", type: "integer", primaryKey: true },
      { name: "title", type: "text", notNull: true }
    ],
    ifNotExists: true
  })
})
```

The `prepareDatabase` callback is intended for schema setup such as table and index creation.

***

## Opening a Database

SQLite provides two connection models:

- `openQueue` for serialized access
- `openPool` for concurrent reads and serialized writes

```ts
const queue = SQLite.openQueue(path, config)
const pool = SQLite.openPool(path, config)
```

***

## Database

`Database` represents a database execution context.
All SQL execution, queries, schema inspection, and transaction control are performed through this object.

### Executing SQL

```ts
db.execute(
  "UPDATE users SET name = ? WHERE id = ?",
  ["Bob", 1]
)
```

### Querying Data

```ts
const user = db.fetchOne<{ id: number; name: string }>(
  "SELECT * FROM users WHERE id = ?",
  [1]
)
```

### Fetching Multiple Rows

```ts
const rows = db.fetchAll<{ id: number; name: string }>(
  "SELECT * FROM users"
)
```

***

## Schema Inspection

SQLite exposes structured schema metadata APIs.

### Table Existence

```ts
if (db.tableExists("users")) {
  console.log("users table exists")
}
```

### Columns

```ts
const columns = db.columnsIn("users")
```

### Primary Key

```ts
const primaryKey = db.primaryKey("users")
```

### Foreign Keys and Indexes

```ts
const foreignKeys = db.foreignKeys("orders")
const indexes = db.indexes("users")
```

***

## Transactions and Savepoints

### Transaction

```ts
db.inTransaction(() => {
  db.execute("INSERT INTO users (name) VALUES (?)", ["Tom"])
  db.execute("INSERT INTO users (name) VALUES (?)", ["Jerry"])
  return "commit"
})
```

### Savepoint

```ts
db.inSavepoint(() => {
  db.execute("DELETE FROM users WHERE id = ?", [10])
  return "rollback"
})
```

Transactions are explicitly controlled by returning `"commit"` or `"rollback"`.

***

## Statement

`Statement` represents a prepared SQL statement that can be reused efficiently.

```ts
const stmt = db.cachedStatement(
  "INSERT INTO users (name) VALUES (:name)"
)

stmt.execute({ name: "Alice" })
stmt.execute({ name: "Bob" })
```

Arguments can be validated separately if needed:

```ts
stmt.validateArguments({ name: "Charlie" })
```

***

## Query APIs

### fetchOne

```ts
const user = db.fetchOne<{ name: string }>(
  "SELECT name FROM users WHERE id = ?",
  [1]
)
```

### fetchSet

```ts
const names = db.fetchSet<{ name: string }>(
  "SELECT DISTINCT name FROM users"
)
```

### fetchCursor

```ts
db.fetchCursor(
  "SELECT * FROM logs",
  next => {
    let result
    while ((result = next()).row) {
      console.log(result.row)
    }
    return null
  }
)
```

Cursor-based fetching is suitable for large datasets or streaming-style processing.

***

## Table and Index Management

### Creating a Table

```ts
db.createTable("tasks", {
  columns: [
    { name: "id", type: "integer", primaryKey: true },
    { name: "title", type: "text", notNull: true },
    { name: "done", type: "boolean", defaultValue: false }
  ],
  ifNotExists: true
})
```

### Creating an Index

```ts
db.createIndex("task_title_index", {
  table: "tasks",
  columns: ["title"],
  ifNotExists: true
})
```

### Dropping Tables and Indexes

```ts
db.dropTable("tasks")
db.dropIndex("task_title_index")
```

***

## DatabaseQueue

`DatabaseQueue` provides serialized access to the database and is suitable for write-heavy or order-sensitive workflows.

```ts
const queue = SQLite.openQueue(path)

queue.write(db => {
  db.execute("INSERT INTO logs (message) VALUES (?)", ["hello"])
})

const logs = queue.read(db =>
  db.fetchAll("SELECT * FROM logs")
)
```

***

## DatabasePool

`DatabasePool` supports concurrent reads and serialized writes, making it suitable for read-heavy workloads.

```ts
const pool = SQLite.openPool(path)

const items = pool.read(db =>
  db.fetchAll("SELECT * FROM items")
)

pool.write(db => {
  db.execute("DELETE FROM items WHERE expired = 1")
})
```

***

## Resource Management

### Interrupt Execution

```ts
queue.interrupt()
```

### Release SQLite Memory

```ts
queue.releaseMemory()
```

### Close Database

```ts
queue.close()
```

***

## Summary

The SQLite API in Scripting provides:

- A global, zero-import database API
- Explicit concurrency models via Queue and Pool
- Structured schema and metadata access
- Safe parameterized SQL execution
- Explicit transaction control
- Predictable lifecycle and resource management
