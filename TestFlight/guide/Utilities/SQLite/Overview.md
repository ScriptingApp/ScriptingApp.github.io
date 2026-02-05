# Overview

The SQLite module provides a structured, type-friendly, and predictable API for working with SQLite databases in Scripting.

SQLite is exposed as a **global namespace** and does not require importing. It supports both disk-based and in-memory databases, and covers common use cases such as executing SQL statements, performing queries, managing transactions, defining schemas, and inspecting database structures.

***

## Getting Started

### Opening a Database

```ts
const dbPath = Path.join(FileManager.appGroupDocumentsDirectory, "app.db")
const db = SQLite.open(dbPath)
```

Opens a SQLite database located in the script’s data directory. If the file does not exist, it will be created automatically.

To open an in-memory database:

```ts
const db = SQLite.openInMemory("temp")
```

***

### Executing SQL

```ts
await db.execute(
  "CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)"
)

await db.execute(
  "INSERT INTO user (name, age) VALUES (?, ?)",
  ["Tom", 18]
)
```

Both positional parameters and named parameters are supported.

***

### Querying Data

```ts
const users = await db.fetchAll<{ name: string; age: number }>(
  "SELECT name, age FROM user"
)

const user = await db.fetchOne<{ name: string }>(
  "SELECT name FROM user WHERE age = ?",
  [18]
)
```

***

### Using Transactions

```ts
await db.transcation([
  { sql: "INSERT INTO user (name, age) VALUES (?, ?)", args: ["Tom", 18] },
  { sql: "INSERT INTO user (name, age) VALUES (?, ?)", args: ["Lucy", 20] }
])
```

Transactions are declared as an ordered list of steps. All steps are executed sequentially, and any failure will cause the entire transaction to roll back.

***

## Core Capabilities

The SQLite module provides the following core capabilities:

- Database connection management
- SQL execution with parameter binding
- Structured data querying
- Explicit transaction control
- Table and index creation and removal
- Database schema inspection

***

## Documentation Structure

The SQLite documentation is organized by functional areas. Refer to the following sections based on your needs:

- **Database & Connection**
  Opening databases, configuration options, read-only mode, and concurrency behavior

- **Executing SQL & Queries**
  Executing SQL statements, parameter binding rules, and query APIs

- **Transactions**
  Transaction model, transaction kinds, and design constraints

- **Schema Management**
  Creating and managing tables and indexes using structured APIs

- **Schema Introspection**
  Inspecting tables, columns, primary keys, foreign keys, and indexes

- **Types Reference**
  Type definitions and enums used throughout the SQLite module

***

## Use Cases

The SQLite module is suitable for the following scenarios:

- Local data persistence
- Script-level caching and state storage
- Managing small to medium-sized structured datasets
- Building SQLite-based utility scripts
- Data migration, inspection, and debugging tools
