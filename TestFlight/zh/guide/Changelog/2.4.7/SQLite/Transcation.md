# 事务（Transcation）

本章节介绍 SQLite 中的事务模型、事务类型。

SQLite 的事务 API 采用\*\*基于步骤（step-based）\*\*的声明式模型，用于在脚本层面提供可预测、可控且安全的事务行为。

***

## 事务概述

事务用于将多条数据库操作组合为一个原子操作单元：

- 所有步骤成功执行时，事务提交
- 任意步骤失败时，事务回滚
- 回滚后数据库状态保持不变

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

`transcation` 用于执行一个事务，该事务由一组有序的 SQL 步骤组成。

***

## 事务步骤（TranscationStep）

```ts
type TranscationStep = {
  sql: string
  args?: Arguments | null
}
```

每一个事务步骤包含：

- `sql`：要执行的 SQL 语句
- `args`：可选的参数绑定

示例：

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

步骤会按照声明顺序依次执行。

***

## 事务类型（Transaction Kind）

事务支持三种类型，对应 SQLite 原生的事务模式。

```ts
kind?: "deferred" | "immediate" | "exclusive"
```

### deferred

默认事务类型。

- 事务开始时不立即获取锁
- 在首次读或写操作时才尝试获取锁
- 适合大多数普通事务场景

***

### immediate

- 事务开始时立即尝试获取写锁
- 如果无法获取写锁，将立即失败
- 适用于需要确保后续写操作一定能执行的场景

***

### exclusive

- 事务开始时获取排他锁
- 阻止其他读写操作
- 适用于需要完全独占数据库的特殊场景

***

## 错误与回滚行为

在事务执行过程中，如果发生以下情况：

- SQL 执行失败
- 参数绑定错误
- 违反约束（唯一键、外键等）
- 数据库锁冲突

SQLite 将自动回滚整个事务，并抛出错误。

示例：

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

## 使用建议

- 将一组必须同时成功的写操作放入同一个事务
- 优先使用默认的 `deferred` 事务类型
- 对于关键写操作，可使用 `immediate` 提前锁定
- 避免在事务中执行耗时或无关的操作
- 不要在事务中依赖条件分支来决定是否执行步骤

***

## 下一步

完成事务操作后，你可能还需要：

- 创建和管理表结构
- 定义索引和约束
- 查询数据库 Schema 信息

请继续阅读：

- **Schema Management**
- **Schema Introspection**
