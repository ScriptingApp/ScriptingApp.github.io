---
title: 数据库（Database）
description: SQLite API 的核心对象：所有 SQL 执行、查询、模式检查、事务处理以及保存点管理都通过 Database 进行。

---

`Database` 表示一次 **具体的数据库访问上下文**。
它是 SQLite API 中的核心对象，所有 SQL 执行、数据查询、Schema 读取、事务与保存点操作，最终都通过 `Database` 完成。

在 Scripting 中，`Database` **不会被直接创建**，而是由 `DatabaseQueue` 或 `DatabasePool` 在 `read` / `write` 回调中提供。

---

## 类型定义

```ts
class Database {
  readonly changesCount: number
  readonly totalChangesCount: number
  readonly isInsideTransaction: boolean
  readonly lastErrorMessage: string | null
  readonly lastInsertedRowID: number

  schemaVersion(): number

  tableExists(tableName: string, schemaName?: string): boolean
  isTableHasUniqueKeys(tableName: string, uniqueKeys: string[]): boolean

  columnsIn(tableName: string, schemaName?: string): ColumnInfo[]

  primaryKey(tableName: string, schemaName?: string): PrimaryKeyInfo
  foreignKeys(tableName: string, schemaName?: string): ForeignKeyInfo[]
  indexes(tableName: string, schemaName?: string): IndexInfo[]

  makeStatement(sql: string): Statement
  cachedStatement(sql: string): Statement

  inTransaction(operations: () => TransactionCompletion): void
  inSavepoint(operations: () => TransactionCompletion): void

  execute(sql: string, arguments?: StatementArguments): void

  createTable(name: string, options: {
    columns: ColumnDefinition[]
    ifNotExists?: boolean
  }): void
  renameTable(name: string, newName: string): void
  dropTable(name: string): void

  createIndex(name: string, options: {
    table: string
    columns: string[]
    unique?: boolean
    ifNotExists?: boolean
    condition?: string
  }): void
  dropIndex(name: string): void
  dropIndexOn(tableName: string, columns: string[]): void

  fetchAll<T>(sql: string, arguments?: StatementArguments): T[]
  fetchSet<T>(sql: string, arguments?: StatementArguments): T[]
  fetchOne<T>(sql: string, arguments?: StatementArguments): T
  fetchCursor<T>(
    sql: string,
    perform: (next: () => {
      row: T | null
      error: string | null
    }) => void,
    arguments?: StatementArguments
  ): void
}
```

---

## Database 的角色与边界

`Database` 的职责包括：

* 执行 SQL（DDL / DML）
* 创建与管理 Statement
* 查询和读取数据
* 提供 Schema 元信息
* 管理事务和保存点

但它 **不负责**：

* 并发调度（由 Queue / Pool 负责）
* 生命周期管理（由 Queue / Pool 控制）
* 跨线程或跨回调复用

---

## Database 的获取方式

`Database` 只能在 `DatabaseQueue` 或 `DatabasePool` 的回调中使用：

```ts
queue.write(db => {
  db.execute("INSERT INTO users (name) VALUES (?)", ["Alice"])
})

const users = queue.read(db =>
  db.fetchAll("SELECT * FROM users")
)
```

---

## 状态属性

### changesCount

返回 **最近一次 SQL 操作** 影响的行数。

```ts
db.execute("DELETE FROM logs")
console.log(db.changesCount)
```

---

### totalChangesCount

返回自数据库连接建立以来 **累计影响的行数**。

```ts
console.log(db.totalChangesCount)
```

---

### isInsideTransaction

指示当前是否处于事务或保存点中。

```ts
if (db.isInsideTransaction) {
  console.log("inside transaction")
}
```

---

### lastErrorMessage

返回最近一次 SQLite 错误信息（若有）。

```ts
if (db.lastErrorMessage) {
  console.error(db.lastErrorMessage)
}
```

---

### lastInsertedRowID

返回最近一次插入操作生成的 RowID。

```ts
db.execute("INSERT INTO users (name) VALUES (?)", ["Bob"])
console.log(db.lastInsertedRowID)
```

---

## Schema 版本

### schemaVersion

返回数据库当前的 schema 版本。

```ts
const version = db.schemaVersion()
```

常用于迁移逻辑：

```ts
if (db.schemaVersion() < 2) {
  // 执行迁移
}
```

---

## Schema 查询 API

### tableExists

判断表是否存在。

```ts
if (db.tableExists("users")) {
  // ...
}
```

---

### isTableHasUniqueKeys

判断表是否具有指定的唯一键组合。

```ts
const exists = db.isTableHasUniqueKeys(
  "users",
  ["email"]
)
```

---

### columnsIn

查询表中所有列的信息。

```ts
const columns = db.columnsIn("users")
```

---

### primaryKey / foreignKeys / indexes

获取主键、外键与索引信息。

```ts
const pk = db.primaryKey("users")
const fks = db.foreignKeys("orders")
const indexes = db.indexes("users")
```

---

## Statement 创建

### makeStatement

创建一个新的 Statement。

```ts
const stmt = db.makeStatement(
  "SELECT * FROM users WHERE id = ?"
)
```

---

### cachedStatement

创建或获取一个缓存的 Statement。

```ts
const stmt = db.cachedStatement(
  "SELECT * FROM users WHERE id = ?"
)
```

---

## 事务与保存点

### inTransaction

在事务中执行一组操作。

```ts
db.inTransaction(() => {
  db.execute("INSERT INTO users (name) VALUES (?)", ["Tom"])
  db.execute("INSERT INTO users (name) VALUES (?)", ["Jerry"])
  return "commit"
})
```

---

### inSavepoint

在保存点中执行操作，支持嵌套。

```ts
db.inSavepoint(() => {
  db.execute("DELETE FROM cache")
  return "rollback"
})
```

说明：

* 返回 `"commit"` 提交
* 返回 `"rollback"` 回滚
* 抛出异常将自动回滚

---

## 执行 SQL

### execute

执行任意 SQL（不返回结果）。

```ts
db.execute(
  "UPDATE users SET name = ? WHERE id = ?",
  ["Alice", 1]
)
```

适合：

* DDL
* INSERT / UPDATE / DELETE
* 不关心返回结果的语句

---

## 表与索引管理

### createTable

使用结构化方式创建表。

```ts
db.createTable("tasks", {
  ifNotExists: true,
  columns: [
    { name: "id", type: "integer", primaryKey: true },
    { name: "title", type: "text", notNull: true },
    { name: "done", type: "boolean", defaultValue: false }
  ]
})
```

---

### renameTable / dropTable

```ts
db.renameTable("tasks", "todos")
db.dropTable("todos")
```

---

### createIndex

```ts
db.createIndex("tasks_title_idx", {
  table: "tasks",
  columns: ["title"],
  ifNotExists: true
})
```

---

### dropIndex / dropIndexOn

```ts
db.dropIndex("tasks_title_idx")
db.dropIndexOn("tasks", ["title"])
```

---

## 数据查询 API

### fetchAll

返回所有结果行。

```ts
const users = db.fetchAll<{ id: number; name: string }>(
  "SELECT * FROM users"
)
```

---

### fetchSet

以 Set 形式返回结果（自动去重）。

```ts
const names = db.fetchSet<{ name: string }>(
  "SELECT name FROM users"
)
```

---

### fetchOne

返回单条结果。

```ts
const user = db.fetchOne<{ id: number; name: string }>(
  "SELECT * FROM users WHERE id = ?",
  [1]
)
```

---

### fetchCursor

使用游标逐条读取结果。

```ts
db.fetchCursor(
  "SELECT * FROM logs",
  next => {
    let result
    while ((result = next()).row) {
      console.log(result.row)
    }
  }
)
```

适合：

* 大数据量查询
* 流式处理
* 避免一次性加载全部数据

---

## 使用约束与注意事项

* `Database` 只能在其所属的 `read / write` 回调中使用
* 不可跨回调保存或传递 Database 实例
* 不可跨线程使用
* 事务必须在同一个 Database 上完成

---

## 常见误用

* 在回调外部持有 Database 引用
* 在事务外执行依赖事务状态的逻辑
* 对一次性查询过度使用 `fetchCursor`
* 混用 Queue / Pool 的并发语义

---

## 总结

`Database` 是 SQLite API 的**核心执行单元**：

* 提供完整的 SQL 执行与查询能力
* 管理 Statement、事务和 Schema
* 明确并发和生命周期边界
* 与 Queue / Pool 形成清晰分工

