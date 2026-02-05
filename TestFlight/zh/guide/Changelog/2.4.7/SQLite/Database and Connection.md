# 数据库和连接

本章节介绍 SQLite 数据库的打开方式、连接配置以及与连接生命周期相关的行为说明。

SQLite 在 Scripting 中以**全局命名空间**的形式提供，无需导入即可直接使用。

***

## 打开数据库

### 打开磁盘数据库

```ts
const dbPath = Path.join(
  FileManager.appGroupDocumentsDirectory,
  "app.db"
)
const db = SQLite.open(dbPath)
```

`SQLite.open` 用于打开或创建一个位于脚本数据目录中的 SQLite 数据库。

- 如果数据库文件不存在，将自动创建
- 多次调用 `open` 打开同一路径，内部会复用数据库资源
- 返回的 `Database` 实例用于后续所有数据库操作

***

### 打开内存数据库

```ts
const db = SQLite.openInMemory("temp")
```

`SQLite.openInMemory` 用于创建一个仅存在于内存中的数据库。

- 内存数据库不会写入磁盘
- 当脚本结束或数据库被释放时，数据将全部丢失
- 适用于临时计算、测试或中间结果处理场景

`name` 参数用于区分不同的内存数据库实例。

***

## 数据库配置（Configuration）

在打开数据库时，可以传入可选的配置对象：

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

### foreignKeysEnabled

```ts
foreignKeysEnabled: boolean
```

是否启用外键约束。

- `true`：启用 SQLite 外键约束（等同于 `PRAGMA foreign_keys = ON`）
- `false`：禁用外键约束

建议在需要使用外键约束时显式开启。

***

### readonly

```ts
readonly: boolean
```

是否以只读模式打开数据库。

- `true`：数据库仅允许查询操作，所有写操作将失败
- `false`：允许读写操作

只读模式适用于：

- 数据浏览工具
- 只读分析脚本
- 防止意外修改数据的场景

***

### journalMode

```ts
journalMode: "wal" | "default"
```

设置数据库的日志模式。

- `"wal"`：启用 Write-Ahead Logging，适合并发读写场景
- `"default"`：使用 SQLite 默认日志模式

在多数应用场景下，推荐使用 `"wal"`。

***

### busyMode

```ts
busyMode: "immediateError" | number
```

控制数据库被锁定时的行为。

- `"immediateError"`：如果数据库被占用，立即抛出错误
- `number`：表示等待锁释放的最长时间（单位：秒）

示例：

```ts
busyMode: 3
```

表示在数据库被锁定时，最多等待 3 秒。

***

### maximumReaderCount

```ts
maximumReaderCount: number
```

限制同时存在的最大读取连接数量。

该配置用于控制并发读取行为，防止在高并发场景下占用过多系统资源。

- 较小的值可以减少资源占用
- 较大的值可以提高并发读取能力

***

### label

```ts
label: string | null
```

为数据库连接指定一个可读标签。

该标签主要用于：

- 调试
- 日志输出
- 内部诊断

对数据库行为本身没有影响。

***

## Database 实例说明

`SQLite.open` 和 `SQLite.openInMemory` 返回一个 `Database` 实例。

```ts
const db: Database
```

该实例：

- 表示一个逻辑数据库连接
- 是所有 SQL 执行、事务和 Schema 操作的入口
- 不暴露底层连接、线程或队列细节

开发者无需关心数据库连接的创建、销毁或线程调度。

***

## 并发与线程模型说明

SQLite 的并发控制和线程调度由 Scripting 内部处理：

- JavaScript 侧不会直接接触多线程
- 所有数据库操作通过内部队列串行或受控并发执行
- 配置项（如 `busyMode`、`maximumReaderCount`）用于影响内部调度策略

这使得 SQLite API 在脚本层面具备以下特性：

- 行为可预测
- 不需要手动加锁
- 不会出现跨线程访问问题

***

## 使用建议

- 需要长期持久化数据时，使用磁盘数据库
- 临时计算或测试场景，使用内存数据库
- 有外键依赖时，显式开启 `foreignKeysEnabled`
- 并发读写较多时，启用 `"wal"` 日志模式
- 工具型脚本或分析脚本可考虑只读模式

***

## 下一步

完成数据库连接后，通常会继续以下操作：

- 执行 SQL 与查询数据
- 使用事务批量写入数据
- 创建或管理表和索引

请继续阅读后续文档：

- **Executing SQL & Queries**
- **Transactions**
- **Schema Management**
