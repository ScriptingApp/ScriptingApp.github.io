---
title: 配置
description: SQLite 模块的配置参数。

---

`SQLite.Configuration` 用于定义数据库在打开和运行期间的全局行为。
它控制 SQLite 的核心参数，例如外键约束、日志模式、忙等待策略、只读模式以及并发读取数量，并提供一个用于数据库初始化和结构准备的回调入口。

SQLite 在 Scripting 中是**全局 API**，无需导入。
在实际使用中，**所有 SQLite 相关操作都应放在 `try / catch` 中**，以便捕获运行时错误（如 SQL 错误、I/O 错误或结构冲突）。

```ts
try {
  const path = Path.join(FileManager.documentsDirectory, "example.sqlite")

  const config = new SQLite.Configuration()
  config.foreignKeysEnabled = true
  config.journalMode = "wal"
  config.busyMode = 2
  config.maximumReaderCount = 4
  config.label = "main-db"

  config.prepareDatabase(db => {
    db.createTable("users", {
      ifNotExists: true,
      columns: [
        { name: "id", type: "integer", primaryKey: true, autoIncrement: true },
        { name: "name", type: "text", notNull: true }
      ]
    })

    db.createIndex("users_name_idx", {
      table: "users",
      columns: ["name"],
      ifNotExists: true
    })
  })

  const queue = SQLite.openQueue(path, config)
} catch (e) {
  // 处理数据库相关错误
}
```

---

## 类型定义

```ts
class Configuration {
  foreignKeysEnabled: boolean
  readonly: boolean
  label: string | null
  busyMode: "immediateError" | DurationInSeconds
  journalMode: "wal" | "default"
  maximumReaderCount: number

  prepareDatabase(setup: (db: Database) => void): void
}
```

---

## 属性说明

### foreignKeysEnabled

是否启用 SQLite 的外键约束。

启用后，SQLite 将强制执行 `REFERENCES` 定义，并应用 `ON DELETE` / `ON UPDATE` 规则。

```ts
const config = new SQLite.Configuration()
config.foreignKeysEnabled = true
```

使用建议：

* 当表结构中使用了外键时，应开启该选项以保证数据一致性
* 若关闭，该外键声明仍存在于表结构中，但不会被实际约束

---

### readonly

以只读模式打开数据库。

```ts
const config = new SQLite.Configuration()
config.readonly = true

const pool = SQLite.openPool(path, config)
```

使用建议：

* 适用于只读分析、统计或安全查看数据的场景
* 所有写入操作（包括 DDL / DML）都会失败

---

### label

用于标识数据库连接的可选标签，一般用于调试、日志或内部诊断。

```ts
const config = new SQLite.Configuration()
config.label = "cache-db"
```

---

### busyMode

用于控制数据库被锁定（busy）时的行为。

可选值：

* `"immediateError"`：当数据库被占用时立即失败
* `DurationInSeconds`：等待指定秒数后仍无法获取锁则失败

```ts
const config = new SQLite.Configuration()
config.busyMode = "immediateError"
```

```ts
const config = new SQLite.Configuration()
config.busyMode = 2
```

使用建议：

* 对延迟敏感的脚本或 UI 相关逻辑，可使用 `"immediateError"`
* 一般业务场景建议设置 1～3 秒的等待时间

---

### journalMode

控制 SQLite 的日志模式。

* `"default"`：使用系统默认日志模式
* `"wal"`：启用 Write-Ahead Logging（预写日志）

```ts
const config = new SQLite.Configuration()
config.journalMode = "wal"
```

使用建议：

* 推荐在需要并发读取的场景下使用 `wal`
* 如需最大兼容性或行为与系统保持一致，可使用 `default`

---

### maximumReaderCount

设置最大并发读连接数量（主要影响 `DatabasePool`）。

```ts
const config = new SQLite.Configuration()
config.maximumReaderCount = 4

const pool = SQLite.openPool(path, config)
```

使用建议：

* 适用于读多写少的场景
* 不宜设置过大，以免增加资源消耗

---

## 方法说明

### prepareDatabase(setup)

注册一个数据库初始化回调，用于在数据库准备阶段执行结构性操作。

常见用途包括：

* 创建表和索引
* 执行 schema 初始化或迁移
* 设置 PRAGMA 参数

```ts
const config = new SQLite.Configuration()

config.prepareDatabase(db => {
  db.execute("PRAGMA user_version = 1")

  db.createTable("events", {
    ifNotExists: true,
    columns: [
      { name: "id", type: "integer", primaryKey: true },
      { name: "createdAt", type: "date", notNull: true, indexed: true },
      { name: "payload", type: "text" }
    ]
  })
})
```

注意事项：

* 该回调应保持**确定性和快速执行**
* 不建议在此进行大批量数据写入
* 如需数据库迁移，可结合 `db.schemaVersion()` 或自定义版本号判断

---

## 推荐使用模式

### 基础配置模板

```ts
function makeConfig() {
  const config = new SQLite.Configuration()
  config.foreignKeysEnabled = true
  config.journalMode = "wal"
  config.busyMode = 2
  config.maximumReaderCount = 4
  return config
}
```

---

### 配合 Queue 或 Pool 使用

```ts
try {
  const path = Path.join(FileManager.documentsDirectory, "app.sqlite")
  const config = makeConfig()

  const queue = SQLite.openQueue(path, config)
  // 或
  const pool = SQLite.openPool(path, config)
} catch (e) {
  // 处理错误
}
```

---

## 常见问题与误用

* 使用外键但未开启 `foreignKeysEnabled`
* 将 `maximumReaderCount` 设置得过大
* 在高并发写入场景下使用 `"immediateError"`
* 在 `prepareDatabase` 中执行耗时或大量数据写入逻辑
