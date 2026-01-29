---
title: 数据库迁移（DatabaseMigrator）
description: 它负责管理和执行数据库模式迁移。

---

`DatabaseMigrator` 用于 **管理和执行数据库结构迁移（schema migrations）**。
它提供了一套有序、可追踪、可回放的迁移机制，用于在数据库版本演进过程中安全地修改表结构、索引和其他 schema 元素。

在 Scripting 的 SQLite API 中，`DatabaseMigrator` 通常与 `DatabaseQueue` 或 `DatabasePool` 配合使用，在数据库打开或应用启动阶段执行。

---

## 设计目标

`DatabaseMigrator` 的核心设计目标包括：

* 以 **显式标识符（identifier）** 管理迁移顺序
* 保证迁移 **只执行一次**，且按注册顺序执行
* 支持在迁移过程中安全地操作 `Database`
* 提供外键检查控制能力，适配复杂迁移场景
* 提供迁移状态查询能力，便于调试和诊断

---

## 类型定义

```ts
type DatabaseMigratorForeignKeyChecks =
  | "deferred"
  | "immediate"

class DatabaseMigrator {
  eraseDatabaseOnSchemaChange: boolean
  readonly migrations: string[]

  disablingDeferredForeignKeyChecks(): void

  registerMigration(
    identifier: string,
    migration: (db: Database) => void
  ): void

  registerMigration(
    identifier: string,
    foreignKeyChecks: DatabaseMigratorForeignKeyChecks,
    migration: (db: Database) => void
  ): void

  migrate(
    writer: DatabaseQueue | DatabasePool,
    upToTargetIdentifier?: string
  ): void

  appliedMigrations(db: Database): string[]
  appliedIdentifiers(db: Database): string[]
  completedMigrations(db: Database): string[]
  hasCompletedMigrations(db: Database): boolean
  hasBeenSuperseded(db: Database): boolean
}
```

---

## 基本使用流程

一个典型的数据库迁移流程包括：

1. 创建 `DatabaseMigrator`
2. 注册一组迁移（按顺序）
3. 在数据库启动阶段执行 `migrate`

```ts
const migrator = new SQLite.DatabaseMigrator()

migrator.registerMigration("create_users", db => {
  db.createTable("users", {
    columns: [
      { name: "id", type: "integer", primaryKey: true },
      { name: "name", type: "text", notNull: true }
    ]
  })
})

migrator.registerMigration("add_email_to_users", db => {
  db.execute("ALTER TABLE users ADD COLUMN email TEXT")
})

migrator.migrate(queue)
```

---

## 迁移标识符（identifier）

每个迁移都必须有一个 **唯一的 identifier**，用于：

* 标识迁移的执行状态
* 确定迁移顺序
* 防止重复执行

迁移按注册顺序执行，而不是按 identifier 字符串排序。

**建议规则：**

* identifier 一旦发布不可修改
* 使用清晰、稳定的命名
* 避免复用或删除已发布的迁移

---

## registerMigration

### 基础注册方式

```ts
migrator.registerMigration("create_posts", db => {
  db.createTable("posts", {
    columns: [
      { name: "id", type: "integer", primaryKey: true },
      { name: "title", type: "text" }
    ]
  })
})
```

该迁移将在执行时获得一个可写的 `Database` 实例。

---

### 带外键检查策略的注册

```ts
migrator.registerMigration(
  "add_foreign_key",
  "deferred",
  db => {
    db.execute(`
      CREATE TABLE comments (
        id INTEGER PRIMARY KEY,
        postId INTEGER REFERENCES posts(id)
      )
    `)
  }
)
```

---

## 外键检查策略（DatabaseMigratorForeignKeyChecks）

### deferred

* 外键约束在事务结束时统一检查
* 适合涉及多张表、顺序复杂的迁移

### immediate

* 外键约束在每条语句执行后立即检查
* 适合结构简单、依赖清晰的迁移

---

## disablingDeferredForeignKeyChecks

禁用迁移过程中的 **延迟外键检查**。

```ts
migrator.disablingDeferredForeignKeyChecks()
```

使用场景：

* 数据库或平台不支持延迟外键
* 迁移逻辑明确不依赖外键约束
* 希望在执行过程中尽早暴露错误

---

## migrate

执行迁移。

```ts
migrator.migrate(queue)
```

或仅执行到指定迁移为止：

```ts
migrator.migrate(queue, "add_email_to_users")
```

说明：

* 使用 `DatabaseQueue` 或 `DatabasePool` 的写通道执行
* 每个迁移在事务中执行
* 已执行的迁移不会重复执行

---

## eraseDatabaseOnSchemaChange

是否在检测到 schema 不兼容变化时 **清空数据库并重新执行迁移**。

```ts
migrator.eraseDatabaseOnSchemaChange = true
```

使用建议：

* 适用于缓存类数据库
* 不适用于用户关键数据
* 一旦启用，数据可能被全部清除

---

## 迁移状态查询 API

### migrations

返回所有已注册迁移的 identifier 列表。

```ts
console.log(migrator.migrations)
```

---

### appliedMigrations / appliedIdentifiers

返回数据库中已应用的迁移。

```ts
const applied = migrator.appliedMigrations(db)
```

---

### completedMigrations

返回已成功完成的迁移列表。

```ts
const completed = migrator.completedMigrations(db)
```

---

### hasCompletedMigrations

判断数据库是否已完成所有注册的迁移。

```ts
if (migrator.hasCompletedMigrations(db)) {
  console.log("all migrations completed")
}
```

---

### hasBeenSuperseded

判断当前数据库是否被新的迁移定义“取代”。

```ts
if (migrator.hasBeenSuperseded(db)) {
  console.log("database schema is outdated")
}
```

通常表示：

* 迁移定义发生了变化
* 数据库 schema 与当前代码不匹配

---

## 使用建议与注意事项

* 迁移函数应 **只包含 schema 相关操作**
* 避免在迁移中执行大量数据写入
* 不要修改或删除已发布的迁移
* 对生产数据，谨慎使用 `eraseDatabaseOnSchemaChange`
* 迁移应保持幂等、确定性和可重复性

---

## 总结

`DatabaseMigrator` 提供了一套 **可靠、可控、可追踪的数据库迁移机制**：

* 基于 identifier 的顺序迁移
* 内置事务与外键检查支持
* 可查询的迁移状态
* 与 Queue / Pool 无缝集成

