# Schema & Value Types

Schema & Value Types

***

## ColumnInfo

`ColumnInfo` describes the structure of a single column in a table.
It is typically used for **schema inspection, debugging, and migration logic**.

This type is returned by `Database.columnsIn()`.

```ts
type ColumnInfo = {
  name: string
  type: string
  defaultValueSQL: string | null
  isNotNull: boolean
  primaryKeyIndex: number
}
```

### Fields

- `name`
  The column name.

- `type`
  The declared SQLite column type (for example `integer`, `text`, `real`).

- `defaultValueSQL`
  The SQL expression used as the default value, or `null` if none is defined.

- `isNotNull`
  Whether the column is declared as `NOT NULL`.

- `primaryKeyIndex`
  The position of this column in the primary key:

  - `0` means the column is not part of the primary key
  - `>= 1` indicates the order within a composite primary key

### Example

```ts
const columns = db.columnsIn("users")

for (const column of columns) {
  console.log(column.name, column.type)
}
```

***

## PrimaryKeyInfo

`PrimaryKeyInfo` describes the primary key definition of a table.

This type is returned by `Database.primaryKey()`.

```ts
type PrimaryKeyInfo = {
  columns: string[]
  rowIDColumn: string | null
  isRowID: boolean
}
```

### Fields

- `columns`
  The list of column names that form the primary key (supports composite keys).

- `rowIDColumn`
  The column name mapped to SQLite’s internal `rowid`, or `null` if not applicable.

- `isRowID`
  Indicates whether the table uses SQLite’s implicit `rowid` as its primary key.

### Example

```ts
const pk = db.primaryKey("users")

if (pk.isRowID) {
  console.log("Table uses rowid as primary key")
} else {
  console.log("Primary key columns:", pk.columns)
}
```

***

## ForeignKeyInfo

`ForeignKeyInfo` describes a foreign key constraint defined on a table.

This type is returned by `Database.foreignKeys()`.

```ts
type ForeignKeyInfo = {
  id: number
  originColumns: string[]
  destinationTable: string
  destinationColumns: string[]
  mapping: {
    origin: string
    destination: string
  }[]
}
```

### Fields

- `id`
  Internal identifier of the foreign key constraint.

- `originColumns`
  Columns in the current table that form the foreign key.

- `destinationTable`
  The referenced table name.

- `destinationColumns`
  Columns in the referenced table.

- `mapping`
  One-to-one mapping between origin and destination columns.

### Example

```ts
const foreignKeys = db.foreignKeys("orders")

for (const fk of foreignKeys) {
  console.log(
    fk.originColumns,
    "->",
    fk.destinationTable,
    fk.destinationColumns
  )
}
```

***

## IndexInfo

`IndexInfo` describes an index defined on a table.

This type is returned by `Database.indexes()`.

```ts
type IndexInfo = {
  name: string
  columns: string[]
  isUnique: boolean
  origin: "createIndex" | "primaryKeyConstraint" | "uniqueConstraint"
}
```

### Fields

- `name`
  The index name.

- `columns`
  Columns included in the index.

- `isUnique`
  Whether the index enforces uniqueness.

- `origin`
  Indicates how the index was created:

  - `createIndex`: created via `CREATE INDEX`
  - `primaryKeyConstraint`: generated from a primary key
  - `uniqueConstraint`: generated from a unique constraint

### Example

```ts
const indexes = db.indexes("users")

for (const index of indexes) {
  console.log(index.name, index.columns)
}
```

***

## DatabaseValue

`DatabaseValue` represents all value types supported by SQLite parameter binding and default values.

```ts
type DatabaseValue =
  | string
  | number
  | boolean
  | Data
  | Date
  | null
```

### Typical Usage

- SQL parameter binding
- `ColumnDefinition.defaultValue`
- `StatementArguments`

### Example

```ts
db.execute(
  "INSERT INTO logs (message, createdAt) VALUES (?, ?)",
  ["hello", new Date()]
)
```

***

## StatementArguments

`StatementArguments` defines the supported argument formats for SQL statements.

```ts
type StatementArguments =
  | DatabaseValue[]
  | Record<string, DatabaseValue>
```

### Examples

Positional arguments:

```ts
db.execute(
  "UPDATE users SET name = ? WHERE id = ?",
  ["Alice", 1]
)
```

Named arguments:

```ts
db.execute(
  "UPDATE users SET name = :name WHERE id = :id",
  { name: "Bob", id: 1 }
)
```

***

## TransactionCompletion

`TransactionCompletion` controls the final outcome of a transaction or savepoint.

```ts
type TransactionCompletion = "commit" | "rollback"
```

### Example

```ts
db.inTransaction(() => {
  db.execute("DELETE FROM cache")
  return "commit"
})
```

***

## DatabaseCollation

`DatabaseCollation` defines string comparison and sorting rules.

```ts
type DatabaseCollation =
  | "binary"
  | "rtrim"
  | "nocase"
  | "caseInsensitiveCompare"
  | "localizedCaseInsensitiveCompare"
  | "localizedCompare"
  | "localizedStandardCompare"
  | "unicodeCompare"
```

### Example

```ts
db.createTable("users", {
  columns: [
    {
      name: "name",
      type: "text",
      collation: "localizedCaseInsensitiveCompare"
    }
  ]
})
```

***

## ForeignKeyAction

`ForeignKeyAction` defines how foreign keys behave on update or delete.

```ts
type ForeignKeyAction =
  | "cascade"
  | "restrict"
  | "setNull"
  | "setDefault"
```

### Example

```ts
{
  name: "userId",
  type: "integer",
  references: {
    table: "users",
    column: "id",
    onDelete: "cascade"
  }
}
```

***

## ColumnReferences

`ColumnReferences` describes a column-level foreign key reference.

```ts
type ColumnReferences = {
  table: string
  column?: string
  onDelete?: ForeignKeyAction
  onUpdate?: ForeignKeyAction
  deferred?: boolean
}
```

***

## ColumnDefinition

`ColumnDefinition` defines a column when creating or altering a table.

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

### Example

```ts
{
  name: "email",
  type: "text",
  notNull: true,
  unique: true
}
```

***

## Summary

These basic types form the **structural foundation** of the SQLite API:

- `ColumnInfo`, `PrimaryKeyInfo`, `ForeignKeyInfo`, `IndexInfo`
  For **inspecting and understanding database schema**

- `ColumnDefinition`, `ColumnReferences`, `ForeignKeyAction`
  For **declaring and creating schema**

- `DatabaseValue`, `StatementArguments`
  For **safe and explicit data binding**
