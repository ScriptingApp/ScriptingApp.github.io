---
title: DatabaseQueue 和 DatabasePool
description: DatabaseQueue 和 DatabasePool 用于支持并发数据库访问。

---

`DatabaseQueue` 和 `DatabasePool` 是 SQLite API 中**负责数据库并发模型和生命周期管理**的组件。
它们决定了：

* 数据库如何被调度访问
* 是否支持并发读取
* Database 实例的生命周期边界
* 事务与读写隔离行为

两者都不直接执行 SQL，而是通过向回调中提供 `Database` 实例来完成实际操作。

---

## DatabaseQueue

`DatabaseQueue` 提供 **串行（Serial）数据库访问模型**。
所有数据库操作（读和写）都会在同一队列中顺序执行。

### 类型定义

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

---

### 并发模型

* 所有 `read` 和 `write` 调用 **串行执行**
* 任意时刻只有一个 `Database` 实例在工作
* 不存在并发访问、锁竞争或读写冲突问题

---

### 基本用法

```ts
const queue = SQLite.openQueue(path)

queue.write(db => {
  db.execute("INSERT INTO logs (message) VALUES (?)", ["hello"])
})

const logs = queue.read(db =>
  db.fetchAll("SELECT * FROM logs")
)
```

---

### read 与 write

* `read`：语义上表示只读操作
* `write`：语义上表示写操作

在 `DatabaseQueue` 中：

* 两者在行为上 **没有并发差异**
* 主要用于提高代码可读性和表达意图

---

### inDatabase

`inDatabase` 允许直接在队列中执行一段数据库逻辑。

```ts
queue.inDatabase(db => {
  db.execute("VACUUM")
})
```

通常用于：

* 管理类操作
* 不区分读写的内部逻辑

---

### inTranscation

在队列级别开启事务。

```ts
queue.inTranscation(() => {
  // 所有操作在一个事务中执行
  return "commit"
})
```

说明：

* 该方法作用于队列关联的 Database
* 适合整体事务控制
* 不支持并发嵌套

---

### 使用场景

推荐使用 `DatabaseQueue` 的情况：

* 写操作频繁
* 业务逻辑依赖严格执行顺序
* 脚本简单，数据量中小
* 希望避免并发带来的复杂性

---

## DatabasePool

`DatabasePool` 提供 **并发读取 + 串行写入** 的访问模型。
它允许多个只读操作并发执行，同时保证写操作的安全性。

### 类型定义

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

---

### 并发模型

* 多个 `read` 回调可并发执行
* `write` 回调 **串行执行**
* 写操作会与所有读操作进行必要的同步

这种模型非常适合 **读多写少** 的场景。

---

### 基本用法

```ts
const pool = SQLite.openPool(path)

const items = pool.read(db =>
  db.fetchAll("SELECT * FROM items")
)

pool.write(db => {
  db.execute("DELETE FROM items WHERE expired = 1")
})
```

---

### read 与 write 的语义差异

在 `DatabasePool` 中：

* `read`

  * 使用只读连接
  * 可并发执行
  * 不允许写操作

* `write`

  * 使用写连接
  * 串行执行
  * 会阻塞其他写操作

---

### 使用场景

推荐使用 `DatabasePool` 的情况：

* 查询频繁、写入较少
* 大量列表、搜索、统计类查询
* 多个脚本或任务同时读取同一数据库
* 对吞吐量和响应性能有要求

---

## DatabaseQueue vs DatabasePool

### 核心区别对比

| 维度    | DatabaseQueue | DatabasePool |
| ----- | ------------- | ------------ |
| 并发模型  | 串行            | 多读并发，写入串行    |
| 读操作   | 串行            | 并发           |
| 写操作   | 串行            | 串行           |
| 实现复杂度 | 低             | 较高           |
| 性能    | 稳定但吞吐量较低      | 高吞吐量         |
| 使用难度  | 简单            | 中等           |

---

### 如何选择

**优先选择 DatabaseQueue，如果：**

* 你不确定是否需要并发
* 写操作较多
* 更看重逻辑简单和稳定性

**选择 DatabasePool，如果：**

* 数据库以查询为主
* 有明显的并发读取需求
* 希望提高整体性能

---

## 生命周期管理

两者都提供相同的生命周期管理方法：

### releaseMemory

释放 SQLite 内部缓存。

```ts
queue.releaseMemory()
pool.releaseMemory()
```

---

### interrupt

中断当前正在执行的数据库操作。

```ts
queue.interrupt()
pool.interrupt()
```

---

### close

关闭数据库连接，释放资源。

```ts
queue.close()
pool.close()
```

说明：

* 调用 `close` 后，不应再执行任何数据库操作
* 关闭后相关的 `Database` 和 `Statement` 都将失效

---

## 使用注意事项

* 不要在 `read` 回调中执行写操作（尤其是 DatabasePool）
* 不要在回调外部保存 `Database` 实例
* 不要在多个 Queue / Pool 之间混用同一个 Database
* 确保所有事务在同一个回调内完成

---

## 总结

`DatabaseQueue` 和 `DatabasePool` 是 SQLite API 中**最关键的并发抽象层**：

* `DatabaseQueue`：简单、安全、顺序明确
* `DatabasePool`：高性能、适合读密集型场景

