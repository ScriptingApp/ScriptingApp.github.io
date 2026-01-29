---
title: 快速开始
description: 快速掌握SQLite的使用

---

SQLite 模块为 Scripting 提供了一套完整的本地数据库访问能力，适用于数据持久化、结构化查询、事务处理以及高并发读取等场景。

```ts
try {
  const path = Path.join(FileManager.documentsDirectory, "example.sqlite")
  const queue = SQLite.openQueue(path)

  queue.write(db => {
    db.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
    db.execute("INSERT INTO users (name) VALUES (?)", ["Alice"])
  })

  const users = queue.read(db =>
    db.fetchAll<{ id: number; name: string }>(
      "SELECT * FROM users"
    )
  )
} catch(e) {
  // ...
}
```

---

## Configuration（数据库配置）

`Configuration` 用于定义数据库连接的全局行为，例如外键、日志模式、并发策略等。

```ts
const config = new SQLite.Configuration()
config.foreignKeysEnabled = true
config.journalMode = "wal"
config.maximumReaderCount = 4

config.prepareDatabase(db => {
  db.createTable("posts", {
    columns: [
      { name: "id", type: "integer", primaryKey: true },
      { name: "title", type: "text", notNull: true }
    ],
    ifNotExists: true
  })
})

const path = Path.join(FileManager.documentsDirectory, "example.sqlite")
const queue = SQLite.openQueue(path, config)
```

`prepareDatabase` 常用于表结构和索引的初始化。

---

## Database（数据库连接）

`Database` 表示一次具体的数据库访问上下文，所有 SQL 执行、查询、事务操作都通过它完成。

### 执行 SQL

```ts
db.execute(
  "UPDATE users SET name = ? WHERE id = ?",
  ["Bob", 1]
)
```

### 查询数据

```ts
const user = db.fetchOne<{ id: number; name: string }>(
  "SELECT * FROM users WHERE id = ?",
  [1]
)
```

### 批量查询

```ts
const rows = db.fetchAll<{ id: number; name: string }>(
  "SELECT * FROM users"
)
```

---

## 表结构与 Schema 查询

### 判断表是否存在

```ts
if (db.tableExists("users")) {
  console.log("users table exists")
}
```

### 查询列信息

```ts
const columns = db.columnsIn("users")
```

### 查询主键

```ts
const pk = db.primaryKey("users")
```

### 查询外键与索引

```ts
const foreignKeys = db.foreignKeys("orders")
const indexes = db.indexes("users")
```

---

## 事务与保存点

### 显式事务

```ts
db.inTransaction(() => {
  db.execute("INSERT INTO users (name) VALUES (?)", ["Tom"])
  db.execute("INSERT INTO users (name) VALUES (?)", ["Jerry"])
  return "commit"
})
```

### 保存点

```ts
db.inSavepoint(() => {
  db.execute("DELETE FROM users WHERE id = ?", [10])
  return "rollback"
})
```

事务通过返回 `"commit"` 或 `"rollback"` 明确控制结果。

---

## Statement（预编译语句）

`Statement` 用于复用 SQL，提高执行效率，并提供参数校验能力。

```ts
const stmt = db.cachedStatement(
  "INSERT INTO users (name) VALUES (:name)"
)

stmt.execute({ name: "Alice" })
stmt.execute({ name: "Bob" })
```

也可以单独校验参数：

```ts
stmt.validateArguments({ name: "Charlie" })
```

---

## 数据读取方式

### fetchOne

```ts
const user = db.fetchOne<{ name: string }>(
  "SELECT name FROM users WHERE id = ?",
  [1]
)
```

### fetchSet

```ts
const names = db.fetchSet<{ name: string }>(
  "SELECT DISTINCT name FROM users"
)
```

### fetchCursor（游标式读取）

```ts
db.fetchCursor(
  "SELECT * FROM logs",
  next => {
    let result
    while ((result = next()).row) {
      console.log(result.row)
    }
    return null
  }
)
```

适合大数据量或流式处理场景。

---

## 表与索引管理

### 创建表

```ts
db.createTable("tasks", {
  columns: [
    { name: "id", type: "integer", primaryKey: true },
    { name: "title", type: "text", notNull: true },
    { name: "done", type: "boolean", defaultValue: false }
  ],
  ifNotExists: true
})
```

### 创建索引

```ts
db.createIndex("task_title_index", {
  table: "tasks",
  columns: ["title"],
  ifNotExists: true
})
```

### 删除表或索引

```ts
db.dropTable("tasks")
db.dropIndex("task_title_index")
```

---

## DatabaseQueue（串行数据库）

`DatabaseQueue` 适合写操作频繁、对执行顺序敏感的场景。

```ts
const queue = SQLite.openQueue("/path/to/data.sqlite")

queue.write(db => {
  db.execute("INSERT INTO logs (message) VALUES (?)", ["hello"])
})

queue.read(db => {
  return db.fetchAll("SELECT * FROM logs")
})
```

---

## DatabasePool（并发数据库）

`DatabasePool` 适合多读少写、高并发查询的场景。

```ts
const pool = SQLite.openPool("/path/to/data.sqlite")

const items = pool.read(db =>
  db.fetchAll("SELECT * FROM items")
)

pool.write(db => {
  db.execute("DELETE FROM items WHERE expired = 1")
})
```

---

## 资源管理与控制

### 中断执行

```ts
db.interrupt()
```

### 释放缓存

```ts
db.releaseMemory()
```

### 关闭数据库

```ts
db.close()
```

---

## 总结

通过在各个 API 节点中嵌入简短示例，SQLite 模块的整体使用方式可以被快速理解：

* Configuration 负责数据库行为定义
* Database 提供所有核心能力
* Queue / Pool 明确并发模型
* Statement 用于高性能 SQL 执行
* Schema API 提供结构化数据库管理能力
