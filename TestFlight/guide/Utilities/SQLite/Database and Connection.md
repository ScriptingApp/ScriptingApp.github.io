# Database and Connection

This section describes how to open SQLite databases, configure connections, and understand connection-related behaviors in Scripting.

SQLite is exposed as a **global namespace** in Scripting and can be used directly without importing.

***

## Opening a Database

### Opening a Disk Database

```ts
const dbPath = Path.join(
  FileManager.appGroupDocumentsDirectory,
  "app.db"
)
const db = SQLite.open(dbPath)
```

`SQLite.open` opens or creates a SQLite database located in the script’s data directory.

- If the database file does not exist, it will be created automatically
- Opening the same path multiple times will internally reuse database resources
- The returned `Database` instance is used for all subsequent operations

***

### Opening an In-Memory Database

```ts
const db = SQLite.openInMemory("temp")
```

`SQLite.openInMemory` creates a database that exists only in memory.

- In-memory databases are not persisted to disk
- All data is lost when the script ends or the database is released
- Suitable for temporary computations, testing, or intermediate results

The `name` parameter is used to distinguish different in-memory database instances.

***

## Database Configuration

An optional configuration object can be provided when opening a database:

```ts
const db = SQLite.open(dbPath, {
  foreignKeysEnabled: true,
  readonly: false,
  journalMode: "wal",
  busyMode: 5,
  maximumReaderCount: 5,
  label: "main-db"
})
```

***

### foreignKeysEnabled

```ts
foreignKeysEnabled: boolean
```

Controls whether foreign key constraints are enabled.

- `true`: Enables SQLite foreign key constraints (equivalent to `PRAGMA foreign_keys = ON`)
- `false`: Disables foreign key constraints

It is recommended to explicitly enable this option when using foreign keys.

***

### readonly

```ts
readonly: boolean
```

Controls whether the database is opened in read-only mode.

- `true`: Only read operations are allowed; all write operations will fail
- `false`: Both read and write operations are allowed

Read-only mode is useful for:

- Data inspection tools
- Analysis scripts
- Preventing accidental data modification

***

### journalMode

```ts
journalMode: "wal" | "default"
```

Specifies the SQLite journal mode.

- `"wal"`: Enables Write-Ahead Logging, suitable for concurrent read/write workloads
- `"default"`: Uses SQLite’s default journal mode

In most scenarios, `"wal"` is recommended.

***

### busyMode

```ts
busyMode: "immediateError" | number
```

Controls the behavior when the database is locked.

- `"immediateError"`: Immediately throws an error if the database is busy
- `number`: Maximum time to wait for the lock to be released, in seconds

Example:

```ts
busyMode: 3
```

This configuration allows the database to wait up to 3 seconds before failing.

***

### maximumReaderCount

```ts
maximumReaderCount: number
```

Limits the maximum number of concurrent reader connections.

This option is used to control concurrency and resource usage:

- Lower values reduce resource consumption
- Higher values allow greater read concurrency

***

### label

```ts
label: string | null
```

Assigns a human-readable label to the database connection.

This label is primarily used for:

- Debugging
- Logging
- Internal diagnostics

It does not affect database behavior.

***

## Database Instance

Both `SQLite.open` and `SQLite.openInMemory` return a `Database` instance:

```ts
const db: Database
```

The `Database` instance:

- Represents a logical database connection
- Serves as the entry point for SQL execution, transactions, and schema operations
- Does not expose underlying connections, threads, or queues

Connection creation, lifecycle management, and thread scheduling are handled internally.

***

## Concurrency and Threading Model

Concurrency control and thread management are handled entirely by Scripting:

- JavaScript code does not directly interact with threads
- All database operations are executed through internal queues with controlled concurrency
- Configuration options such as `busyMode` and `maximumReaderCount` influence internal scheduling behavior

This design ensures that the SQLite API remains:

- Predictable
- Safe to use without manual locking
- Free from cross-thread access issues at the script level

***

## Usage Recommendations

- Use disk databases for persistent data storage
- Use in-memory databases for temporary or test data
- Explicitly enable `foreignKeysEnabled` when foreign key constraints are required
- Use `"wal"` journal mode for concurrent workloads
- Consider read-only mode for inspection or analysis scripts

***

## Next Steps

After opening a database, typical next steps include:

- Executing SQL statements and querying data
- Performing batch writes using transactions
- Creating and managing tables and indexes

Continue with the following sections:

- **Executing SQL & Queries**
- **Transactions**
- **Schema Management**
