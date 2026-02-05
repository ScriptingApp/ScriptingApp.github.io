# Executing SQL and Query

This section explains how to execute SQL statements, bind parameters, and query data using SQLite.

All operations are performed through a `Database` instance. SQLite handles connection management, threading, and scheduling internally, allowing JavaScript code to focus solely on SQL and data.

***

## Executing SQL

### execute

```ts
db.execute(sql: string, arguments?: Arguments): Promise<void>
```

`execute` runs one or multiple SQL statements that do not return result sets. It is commonly used for:

- Creating or modifying table schemas
- Inserting, updating, or deleting data
- Executing PRAGMA statements

Example:

```ts
await db.execute(
  "CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)"
)
```

```ts
await db.execute(
  "UPDATE user SET age = ? WHERE name = ?",
  [19, "Tom"]
)
```

***

## Parameter Binding

SQLite supports two parameter binding styles: **positional parameters** and **named parameters**.

***

### Positional Parameters

```ts
await db.execute(
  "INSERT INTO user (name, age) VALUES (?, ?)",
  ["Tom", 18]
)
```

Values in the argument array are bound to `?` placeholders in order.

***

### Named Parameters

```ts
await db.execute(
  "INSERT INTO user (name, age) VALUES (:name, :age)",
  { name: "Lucy", age: 20 }
)
```

Named parameters are passed as an object. The object keys must match the parameter names used in the SQL statement.

***

### DatabaseValue Types

Bound values may be of the following types:

- `string`
- `number`
- `boolean`
- `Data`
- `Date`
- `null`

`Date` and `Data` values are stored using SQLite-compatible representations.

***

## Querying Data

SQLite provides three query methods, each intended for a different use case.

***

### fetchAll

```ts
db.fetchAll<T>(sql: string, arguments?: Arguments): Promise<T[]>
```

Executes a query and returns **all result rows**.

Example:

```ts
const users = await db.fetchAll<{ name: string; age: number }>(
  "SELECT name, age FROM user"
)
```

If the query returns no rows, an empty array is returned.

***

### fetchOne

```ts
db.fetchOne<T>(sql: string, arguments?: Arguments): Promise<T>
```

Executes a query and returns **the first result row**.

Example:

```ts
const user = await db.fetchOne<{ name: string }>(
  "SELECT name FROM user WHERE age = ?",
  [18]
)
```

Typical use cases include:

- Queries expected to return exactly one row (for example, by primary key)
- Aggregate queries such as `COUNT(*)`

If the query returns no rows, this method throws an error.

***

### fetchSet

```ts
db.fetchSet<T>(sql: string, arguments?: Arguments): Promise<T[]>
```

Executes a query and returns a **deduplicated result set**.

This method is useful when:

- Querying for unique values
- Logical de-duplication is required at the result level

Example:

```ts
const names = await db.fetchSet<{ name: string }>(
  "SELECT name FROM user"
)
```

Duplicate rows are removed from the returned result.

***

## Type Mapping

Query result values are automatically mapped to JavaScript types:

- SQLite INTEGER → `number`
- SQLite REAL → `number`
- SQLite TEXT → `string`
- SQLite BLOB → `Data`
- SQLite NULL → `null`

The shape of the returned objects is determined by the SQL query. SQLite does not enforce strict matching with the generic type `T`, but keeping them aligned is recommended for clarity and type safety.

***

## Error Handling

The following situations may cause methods to throw errors:

- SQL syntax errors
- Parameter count or name mismatches
- Constraint violations (for example, unique or foreign key constraints)
- `fetchOne` returning no rows
- Database lock timeouts caused by `busyMode`

Use `try / catch` when error handling is required:

```ts
try {
  await db.execute("INSERT INTO user (name) VALUES (?)", ["Tom"])
} catch (e) {
  console.error(e)
}
```

***

## Usage Recommendations

- Use `execute` for SQL statements that do not return results
- Use `fetchAll` when multiple rows are expected
- Use `fetchOne` when exactly one row is required
- Use `fetchSet` when deduplicated results are needed
- Always prefer parameter binding over SQL string concatenation
- Wrap complex write operations in transactions

***

## Next Steps

When atomicity is required across multiple write operations, or when changes must be rolled back on failure, continue with:

- **Transactions**
