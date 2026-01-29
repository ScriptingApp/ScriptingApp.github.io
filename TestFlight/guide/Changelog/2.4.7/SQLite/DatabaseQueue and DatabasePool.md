# DatabaseQueue and DatabasePool

`DatabaseQueue` and `DatabasePool` are the components responsible for **concurrency control and lifecycle management** in the SQLite API.

They define:

- How database access is scheduled
- Whether concurrent reads are allowed
- The lifetime boundaries of `Database` instances
- Transaction and read/write isolation behavior

Neither type executes SQL directly.
Instead, they provide a `Database` instance to user callbacks, where all database operations are performed.

***

## DatabaseQueue

`DatabaseQueue` provides a **serial database access model**.
All database operations—both reads and writes—are executed sequentially on a single queue.

### Type Definition

```ts
class DatabaseQueue {
  readonly path: string
  readonly configuration: Configuration

  read<T>(callback: (database: Database) => T): T
  write<T>(callback: (database: Database) => T): T

  inDatabase<T>(operations: (database: Database) => T): T
  inTranscation(operations: () => TransactionCompletion): void

  releaseMemory(): void
  interrupt(): void
  close(): void
}
```

***

### Concurrency Model

- All `read` and `write` calls are **serialized**
- Only one `Database` instance is active at any given time
- No concurrent access, lock contention, or read/write races

***

### Basic Usage

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

### read vs write

- `read`: semantically indicates a read-only operation
- `write`: semantically indicates a write operation

In `DatabaseQueue`:

- Both are executed serially
- The distinction mainly improves code clarity and intent

***

### inDatabase

`inDatabase` executes a block directly on the queue.

```ts
queue.inDatabase(db => {
  db.execute("VACUUM")
})
```

Typical use cases:

- Maintenance operations
- Internal logic that does not need explicit read/write separation

***

### inTranscation

Executes a transaction at the queue level.

```ts
queue.inTranscation(() => {
  // All operations are executed within a single transaction
  return "commit"
})
```

Notes:

- The transaction applies to the queue’s database connection
- Suitable for coarse-grained transactional control
- Nested concurrent usage is not supported

***

### Recommended Use Cases

Use `DatabaseQueue` when:

- Write operations are frequent
- Execution order matters
- Data volume is small to medium
- Simplicity and predictability are preferred

***

## DatabasePool

`DatabasePool` provides a **concurrent-read, serial-write** access model.
It allows multiple read operations to execute in parallel while ensuring that write operations remain safe and serialized.

### Type Definition

```ts
class DatabasePool {
  readonly path: string
  readonly configuration: Configuration

  read<T>(callback: (database: Database) => T): T
  write<T>(callback: (database: Database) => T): T

  releaseMemory(): void
  interrupt(): void
  close(): void
}
```

***

### Concurrency Model

- Multiple `read` callbacks may run concurrently
- `write` callbacks are executed serially
- Writes synchronize with all reads as required

This model is well-suited for **read-heavy workloads**.

***

### Basic Usage

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

### read vs write Semantics

In `DatabasePool`:

- `read`

  - Uses a read-only connection
  - May execute concurrently with other reads
  - Must not perform write operations

- `write`

  - Uses a writable connection
  - Executes serially
  - Blocks other write operations

***

### Recommended Use Cases

Use `DatabasePool` when:

- Reads significantly outnumber writes
- Queries are frequent (lists, searches, analytics)
- Multiple tasks or scripts access the database concurrently
- Higher throughput and responsiveness are required

***

## DatabaseQueue vs DatabasePool

### Core Differences

| Dimension         | DatabaseQueue      | DatabasePool                    |
| ----------------- | ------------------ | ------------------------------- |
| Concurrency model | Serial             | Concurrent reads, serial writes |
| Read operations   | Serial             | Concurrent                      |
| Write operations  | Serial             | Serial                          |
| Complexity        | Low                | Medium                          |
| Throughput        | Lower, predictable | Higher                          |
| Ease of use       | Simple             | Moderate                        |

***

### How to Choose

**Prefer DatabaseQueue if:**

- You are unsure whether concurrency is needed
- Writes are frequent
- You value simplicity and deterministic execution

**Choose DatabasePool if:**

- The workload is read-heavy
- Concurrent reads provide a clear benefit
- Overall performance and throughput matter

***

## Lifecycle Management

Both types expose the same lifecycle control APIs.

### releaseMemory

Releases SQLite internal caches.

```ts
queue.releaseMemory()
pool.releaseMemory()
```

***

### interrupt

Interrupts currently running database operations.

```ts
queue.interrupt()
pool.interrupt()
```

***

### close

Closes the database and releases all resources.

```ts
queue.close()
pool.close()
```

Notes:

- No database operations should be performed after `close`
- All associated `Database` and `Statement` instances become invalid

***

## Usage Notes and Pitfalls

- Do not perform write operations inside `read` callbacks (especially with `DatabasePool`)
- Do not retain `Database` instances outside their callback scope
- Do not share `Database` instances across multiple queues or pools
- Ensure transactions complete within a single callback

***

## Summary

`DatabaseQueue` and `DatabasePool` are the **primary concurrency abstractions** of the SQLite API:

- `DatabaseQueue`: simple, safe, and strictly ordered
- `DatabasePool`: high throughput and suitable for read-heavy workloads
