# Schema Management

This section explains how to create, modify, and remove tables and indexes using SQLite’s structured schema APIs.

Instead of relying solely on raw SQL strings, Schema Management provides a **declarative, readable, and safer** approach to defining database structures, making it suitable for long-term, maintainable data models.

***

## Creating Tables

### createTable

```ts
db.createTable(
  name: string,
  options: {
    columns: ColumnDefinition[]
    ifNotExists?: boolean
  }
): Promise<void>
```

`createTable` creates a new table.

Example:

```ts
await db.createTable("user", {
  ifNotExists: true,
  columns: [
    { name: "id", type: "INTEGER", primaryKey: true, autoIncrement: true },
    { name: "name", type: "TEXT", notNull: true },
    { name: "age", type: "INTEGER" }
  ]
})
```

***

### ColumnDefinition

```ts
type ColumnDefinition = {
  name: string
  type: string
  primaryKey?: boolean
  autoIncrement?: boolean
  notNull?: boolean
  unique?: boolean
  indexed?: boolean
  checkSQL?: string
  collation?: DatabaseCollation
  defaultValue?: DatabaseValue
  defaultSQL?: string
  references?: ColumnReferences
}
```

Common column attributes include:

- `name`: column name
- `type`: SQLite column type (for example, `INTEGER`, `TEXT`)
- `primaryKey`: whether the column is a primary key
- `autoIncrement`: enables auto-increment (only valid for integer primary keys)
- `notNull`: applies a NOT NULL constraint
- `unique`: applies a UNIQUE constraint
- `indexed`: creates an index on the column
- `checkSQL`: CHECK constraint expression
- `collation`: column collation rule
- `defaultValue`: default value (parameterized form)
- `defaultSQL`: default value (raw SQL expression)
- `references`: foreign key reference definition

***

### Default Values

`defaultValue` and `defaultSQL` are mutually exclusive. Use one or the other.

```ts
{ name: "createdAt", type: "INTEGER", defaultSQL: "CURRENT_TIMESTAMP" }
```

```ts
{ name: "status", type: "TEXT", defaultValue: "active" }
```

***

### Foreign Key References

```ts
references?: {
  table: string
  column?: string
  onDelete?: "cascade" | "restrict" | "setNull" | "setDefault"
  onUpdate?: "cascade" | "restrict" | "setNull" | "setDefault"
  deferred?: boolean
}
```

Example:

```ts
{
  name: "userId",
  type: "INTEGER",
  references: {
    table: "user",
    column: "id",
    onDelete: "cascade"
  }
}
```

***

## Renaming Tables

### renameTable

```ts
db.renameTable(name: string, newName: string): Promise<void>
```

Example:

```ts
await db.renameTable("user", "users")
```

***

## Dropping Tables

### dropTable

```ts
db.dropTable(name: string): Promise<void>
```

Example:

```ts
await db.dropTable("temp_data")
```

***

## Creating Indexes

### createIndex

```ts
db.createIndex(
  name: string,
  options: {
    table: string
    columns: string[]
    unique?: boolean
    ifNotExists?: boolean
    condition?: string
  }
): Promise<void>
```

Example:

```ts
await db.createIndex("idx_user_name", {
  table: "user",
  columns: ["name"],
  unique: false
})
```

***

### Partial Indexes

```ts
await db.createIndex("idx_active_user", {
  table: "user",
  columns: ["name"],
  condition: "age >= 18"
})
```

***

## Dropping Indexes

### dropIndex

```ts
db.dropIndex(name: string): Promise<void>
```

Example:

```ts
await db.dropIndex("idx_user_name")
```

***

### dropIndexOn

```ts
db.dropIndexOn(tableName: string, columns: string[]): Promise<void>
```

Drops the index associated with the specified table and column combination.

Example:

```ts
await db.dropIndexOn("user", ["name"])
```

***

## Design Principles

The Schema Management API follows these principles:

- **Structure over string concatenation**
  Reduces the risk of SQL syntax errors and improves readability

- **Declarative over imperative**
  Clearly describes what the schema should be, not how to assemble SQL

- **One-to-one mapping with SQLite capabilities**
  Avoids hidden behavior or unexpected abstractions

***

## Usage Recommendations

- Prefer `createTable` for long-lived schemas
- Use `ifNotExists` to avoid duplicate creation
- Create indexes explicitly for frequently queried columns
- Ensure `foreignKeysEnabled` is enabled when using foreign keys
- Perform schema changes within transactions or migration logic

***

## Next Steps

After creating and managing schemas, you may want to:

- Inspect existing database structures
- Retrieve column, primary key, and foreign key information
- Analyze indexes and constraints

Continue with:

- **Schema Introspection**
