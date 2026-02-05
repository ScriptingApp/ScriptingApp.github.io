# Transcation

This section describes the transaction model, transaction types.

The SQLite transaction API uses a **step-based, declarative model** to provide predictable, controlled, and safe transaction behavior at the scripting level.

***

## Transaction Overview

A transaction groups multiple database operations into a single atomic unit:

- All steps succeed → the transaction is committed
- Any step fails → the transaction is rolled back
- After rollback, the database remains unchanged

SQLite guarantees consistency and isolation internally. JavaScript code does not need to manually handle rollback logic.

***

## transcation

```ts
db.transcation(
  steps: TranscationStep[],
  options?: {
    kind?: "deferred" | "immediate" | "exclusive"
  }
): Promise<void>
```

`transcation` executes a transaction defined by an ordered list of SQL steps.

***

## Transaction Steps

```ts
type TranscationStep = {
  sql: string
  args?: Arguments | null
}
```

Each transaction step consists of:

- `sql`: the SQL statement to execute
- `args`: optional bound parameters

Example:

```ts
await db.transcation([
  {
    sql: "INSERT INTO user (name, age) VALUES (?, ?)",
    args: ["Tom", 18]
  },
  {
    sql: "INSERT INTO user (name, age) VALUES (?, ?)",
    args: ["Lucy", 20]
  }
])
```

Steps are executed sequentially in the order they are declared.

***

## Transaction Kinds

Transactions support three kinds, corresponding to SQLite’s native transaction modes:

```ts
kind?: "deferred" | "immediate" | "exclusive"
```

***

### deferred

The default transaction kind.

- No locks are acquired when the transaction begins
- Locks are obtained only when the first read or write occurs
- Suitable for most general-purpose transaction scenarios

***

### immediate

- Attempts to acquire a write lock immediately when the transaction begins
- Fails immediately if the write lock cannot be acquired
- Useful when subsequent write operations must be guaranteed to proceed

***

### exclusive

- Acquires an exclusive lock when the transaction begins
- Blocks all other read and write operations
- Intended for scenarios that require full database exclusivity

***

## Error Handling and Rollback

A transaction will be rolled back automatically if any of the following occur:

- SQL execution errors
- Parameter binding errors
- Constraint violations (unique, foreign key, etc.)
- Database lock conflicts

Example:

```ts
try {
  await db.transcation([
    { sql: "INSERT INTO user (id, name) VALUES (1, 'Tom')" },
    { sql: "INSERT INTO user (id, name) VALUES (1, 'Lucy')" }
  ])
} catch (e) {
  console.error("Transaction failed:", e)
}
```

***

## Usage Recommendations

- Group operations that must succeed together into a single transaction
- Prefer the default `deferred` transaction kind
- Use `immediate` when early write-lock acquisition is required
- Avoid long-running or unrelated work inside transactions
- Do not rely on conditional logic to determine transaction steps

***

## Next Steps

After working with transactions, you may want to:

- Create and manage table schemas
- Define indexes and constraints
- Inspect database schema information

Continue with:

- **Schema Management**
- **Schema Introspection**
