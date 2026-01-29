---
title: 基础类型（Schema & Value Types）
description: SQLite 基础类型。

---

基础类型（Schema & Value Types）

---

## ColumnInfo

`ColumnInfo` 描述一张表中某一列的结构信息，通常用于 **schema 检查、调试、迁移逻辑**。

该类型由 `Database.columnsIn()` 返回。

```ts
type ColumnInfo = {
  name: string
  type: string
  defaultValueSQL: string | null
  isNotNull: boolean
  primaryKeyIndex: number
}
```

### 字段说明

* `name`
  列名

* `type`
  SQLite 声明的列类型（如 `integer`、`text`、`real`）

* `defaultValueSQL`
  列的默认值 SQL 表达式，若无默认值则为 `null`

* `isNotNull`
  是否声明为 `NOT NULL`

* `primaryKeyIndex`
  该列在主键中的顺序

  * `0` 表示不是主键
  * `>= 1` 表示联合主键中的位置

### 示例

```ts
const columns = db.columnsIn("users")

for (const column of columns) {
  console.log(column.name, column.type)
}
```

---

## PrimaryKeyInfo

`PrimaryKeyInfo` 描述一张表的主键信息。

该类型由 `Database.primaryKey()` 返回。

```ts
type PrimaryKeyInfo = {
  columns: string[]
  rowIDColumn: string | null
  isRowID: boolean
}
```

### 字段说明

* `columns`
  主键列名列表（支持联合主键）

* `rowIDColumn`
  若主键映射到 SQLite 的 `rowid`，则为对应列名，否则为 `null`

* `isRowID`
  是否使用 SQLite 隐式的 `rowid` 作为主键

### 示例

```ts
const pk = db.primaryKey("users")

if (pk.isRowID) {
  console.log("table uses rowid as primary key")
} else {
  console.log("primary key columns:", pk.columns)
}
```

---

## ForeignKeyInfo

`ForeignKeyInfo` 描述一条外键约束的信息。

该类型由 `Database.foreignKeys()` 返回。

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

### 字段说明

* `id`
  外键约束的内部标识

* `originColumns`
  当前表中的外键列

* `destinationTable`
  被引用的目标表名

* `destinationColumns`
  目标表中被引用的列

* `mapping`
  外键列与目标列的一一映射关系

### 示例

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

---

## IndexInfo

`IndexInfo` 描述表中索引的结构信息。

该类型由 `Database.indexes()` 返回。

```ts
type IndexInfo = {
  name: string
  columns: string[]
  isUnique: boolean
  origin: "createIndex" | "primaryKeyConstraint" | "uniqueConstraint"
}
```

### 字段说明

* `name`
  索引名称

* `columns`
  索引包含的列

* `isUnique`
  是否为唯一索引

* `origin`
  索引的来源：

  * `createIndex`：通过 `CREATE INDEX` 创建
  * `primaryKeyConstraint`：主键自动生成
  * `uniqueConstraint`：唯一约束生成

### 示例

```ts
const indexes = db.indexes("users")

for (const index of indexes) {
  console.log(index.name, index.columns)
}
```

---

## DatabaseValue

`DatabaseValue` 表示 SQLite 支持的值类型集合，用于参数绑定和默认值声明。

```ts
type DatabaseValue =
  | string
  | number
  | boolean
  | Data
  | Date
  | null
```

### 使用场景

* SQL 参数绑定
* `ColumnDefinition.defaultValue`
* `StatementArguments`

### 示例

```ts
db.execute(
  "INSERT INTO logs (message, createdAt) VALUES (?, ?)",
  ["hello", new Date()]
)
```

---

## StatementArguments

`StatementArguments` 定义 SQL 语句支持的参数形式。

```ts
type StatementArguments =
  | DatabaseValue[]
  | Record<string, DatabaseValue>
```

### 示例

位置参数：

```ts
db.execute(
  "UPDATE users SET name = ? WHERE id = ?",
  ["Alice", 1]
)
```

命名参数：

```ts
db.execute(
  "UPDATE users SET name = :name WHERE id = :id",
  { name: "Bob", id: 1 }
)
```

---

## TransactionCompletion

`TransactionCompletion` 用于控制事务或保存点的最终结果。

```ts
type TransactionCompletion = "commit" | "rollback"
```

### 示例

```ts
db.inTransaction(() => {
  db.execute("DELETE FROM cache")
  return "commit"
})
```

---

## DatabaseCollation

`DatabaseCollation` 表示字符串排序和比较规则。

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

### 示例

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

---

## ForeignKeyAction

`ForeignKeyAction` 定义外键在更新或删除时的行为。

```ts
type ForeignKeyAction =
  | "cascade"
  | "restrict"
  | "setNull"
  | "setDefault"
```

### 示例

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

---

## ColumnReferences

`ColumnReferences` 描述列级别的外键引用关系。

```ts
type ColumnReferences = {
  table: string
  column?: string
  onDelete?: ForeignKeyAction
  onUpdate?: ForeignKeyAction
  deferred?: boolean
}
```

---

## ColumnDefinition

`ColumnDefinition` 用于声明表结构中的列定义。

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

### 示例

```ts
{
  name: "email",
  type: "text",
  notNull: true,
  unique: true
}
```

---

## 总结

这些基础类型构成了 SQLite 模块的**结构化基础**：

* `ColumnInfo / PrimaryKeyInfo / ForeignKeyInfo / IndexInfo`
  用于**读取和理解数据库结构**

* `ColumnDefinition / ColumnReferences / ForeignKeyAction`
  用于**声明和创建表结构**

* `DatabaseValue / StatementArguments`
  用于**安全地传递数据**

