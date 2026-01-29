---
title: Statement
description: It is designed to improve performance for repeated execution, ensure safe parameter binding, and provide explicit argument validation for complex workflows.

---

`Statement` represents a **prepared SQL statement**.
It is designed to improve performance for repeated execution, ensure safe parameter binding, and provide explicit argument validation for complex workflows.

In the Scripting SQLite API, `Statement` instances are created and managed by `Database`.
They cannot be constructed directly by users.

---

## Type Definition

```ts
class Statement {
  readonly sql: string
  readonly columnNames: string[]
  readonly isReadonly: boolean

  setArguments(arguments: StatementArguments): void
  setUncheckedArguments(arguments: StatementArguments): void
  validateArguments(arguments: StatementArguments): void
  execute(arguments?: StatementArguments): void
}
```

---

## StatementArguments

`StatementArguments` defines the **supported parameter binding formats** for `Statement` and SQL execution.
It is the unified argument model used throughout the SQLite API.

```ts
type StatementArguments =
  | DatabaseValue[]
  | Record<string, DatabaseValue>
```

### Supported Forms

#### Positional Arguments

Use `?` placeholders, with values bound by position.

```ts
const stmt = db.cachedStatement(
  "UPDATE users SET name = ? WHERE id = ?"
)

stmt.execute(["Alice", 1])
```

Characteristics:

* Argument order must match the order of `?` placeholders
* Simple and compact
* Less suitable for complex or long-lived SQL

---

#### Named Arguments

Use named placeholders such as `:name`.

```ts
const stmt = db.cachedStatement(
  "UPDATE users SET name = :name WHERE id = :id"
)

stmt.execute({ name: "Bob", id: 2 })
```

Characteristics:

* Clear semantics
* Order-independent
* Recommended for complex or maintainable SQL

---

### DatabaseValue Constraints

All values in `StatementArguments` must conform to `DatabaseValue`:

```ts
type DatabaseValue =
  | string
  | number
  | boolean
  | Data
  | Date
  | null
```

Unsupported types (for example objects, arrays, or functions) will cause validation or execution failures.

---

## Design Goals and Use Cases

The core goals of `Statement` are:

* **Reuse compiled SQL** to reduce parsing overhead
* **Centralize argument binding logic**
* **Provide pre-execution argument validation**
* **Improve performance and reliability**

Recommended use cases:

* Repeated execution of the same SQL
* Batch or loop-based operations
* Performance-critical paths
* APIs that require strict argument correctness

For one-off SQL execution, `Database.execute` is usually sufficient.

---

## Creating Statements

### makeStatement

Creates a new `Statement` instance on each call.

```ts
const stmt = db.makeStatement(
  "INSERT INTO users (name) VALUES (?)"
)
```

Use when:

* Execution frequency is low
* Statement lifetime is short
* Caching is unnecessary

---

### cachedStatement

Returns a **cached and reusable Statement**.
The same SQL is compiled only once per database instance.

```ts
const stmt = db.cachedStatement(
  "INSERT INTO users (name) VALUES (:name)"
)
```

Use when:

* SQL is executed frequently
* Batch inserts or updates are performed
* Performance is important

---

## Properties

### sql

Returns the original SQL string associated with the statement.

```ts
console.log(stmt.sql)
```

---

### columnNames

Returns the column names of the result set.

```ts
const query = db.cachedStatement(
  "SELECT id, name FROM users"
)

console.log(query.columnNames)
// ["id", "name"]
```

Notes:

* Only meaningful for `SELECT` statements
* Useful for dynamic mapping, debugging, or generic query helpers

---

### isReadonly

Indicates whether the statement is read-only.

```ts
if (stmt.isReadonly) {
  console.log("This statement does not modify data")
}
```

Notes:

* `SELECT` statements are typically read-only
* `INSERT`, `UPDATE`, and `DELETE` are not
* Can be used for permission checks or pre-execution validation

---

## Argument Binding and Execution Flow

### execute

Executes the statement, optionally binding arguments at execution time.

```ts
stmt.execute({ name: "Charlie" })
```

Or execute using previously bound arguments:

```ts
stmt.setArguments({ name: "Alice" })
stmt.execute()
```

Rules:

* Arguments passed to `execute` override previously set arguments
* If no arguments are passed, the most recent `setArguments` value is used

---

### setArguments

Binds arguments to the statement **with full validation**, without executing it.

```ts
stmt.setArguments({ name: "Alice" })
```

Use when:

* Argument preparation and execution are separated
* The same arguments are reused across multiple steps
* Early validation is desirable

---

### validateArguments

Validates arguments without executing the statement.

```ts
stmt.validateArguments({ name: "Alice" })
```

Validation includes:

* Missing required arguments
* Mismatch between named placeholders and keys
* Incorrect argument count
* Invalid `DatabaseValue` types

Common use cases:

* Pre-flight validation
* Building stricter higher-level APIs
* Providing clearer error messages before execution

---

### setUncheckedArguments

Binds arguments **without validation**.

```ts
stmt.setUncheckedArguments({ name: "Alice" })
```

Notes:

* Faster than validated binding
* Errors surface only during execution
* Use only when argument correctness is guaranteed

---

## Relationship to Database.execute

The following approaches are functionally equivalent but serve different purposes:

```ts
db.execute(
  "INSERT INTO users (name) VALUES (?)",
  ["Alice"]
)
```

```ts
const stmt = db.cachedStatement(
  "INSERT INTO users (name) VALUES (?)"
)
stmt.execute(["Alice"])
```

Guidelines:

| Scenario                   | Recommendation      |
| -------------------------- | ------------------- |
| One-off execution          | `Database.execute`  |
| Repeated execution         | `Statement`         |
| Performance-sensitive code | `cachedStatement`   |
| Strict argument checking   | `validateArguments` |

---

## Lifecycle and Usage Constraints

* A `Statement` is owned by the `Database` that created it
* Statements must not be used after the database is closed
* Statements must not be shared across different databases
* Statements are not thread-safe
  They must be used within their owning `read` / `write` callback

---

## Common Mistakes

* Reusing a statement across multiple databases
* Overusing `Statement` for one-off SQL
* Excessive use of `setUncheckedArguments`
* Executing statements after the database has been closed
* Passing values that are not valid `DatabaseValue` types

---

## Summary

`Statement` is a core component of the SQLite API for **high-performance, strongly constrained SQL execution**:

* Clear separation between SQL compilation and execution
* Unified argument model via `StatementArguments`
* Strict and non-strict argument binding options
* Well-defined responsibilities alongside `Database.execute`

For scenarios that require performance, maintainability, and argument safety, `Statement` is the preferred tool.
