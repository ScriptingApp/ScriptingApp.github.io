# 语句（Statement）

`Statement` 表示一条 **已编译（prepared）的 SQL 语句**。
它用于提高重复执行 SQL 的性能、保证参数绑定的安全性，并为复杂场景提供更明确的参数校验机制。

在 Scripting 的 SQLite API 中，`Statement` 通常由 `Database` 创建和管理，开发者不需要也不能自行构造。

***

## 类型定义

```ts
class Statement {
  readonly sql: string
  readonly columnNames: string[]
  readonly isReadonly: boolean

  setArguments(arguments: StatementArguments): void
  setUncheckedArguments(arguments: StatementArguments): void
  validateArguments(arguments: StatementArguments): void
  execute(arguments?: StatementArguments): void
}
```

***

## StatementArguments

`StatementArguments` 定义了 **Statement 和 SQL 执行时支持的参数形式**。
它是 SQLite API 中所有参数绑定行为的统一类型。

```ts
type StatementArguments =
  | DatabaseValue[]
  | Record<string, DatabaseValue>
```

### 支持的两种形式

#### 位置参数（Positional Arguments）

使用 `?` 占位符，参数按顺序绑定。

```ts
const stmt = db.cachedStatement(
  "UPDATE users SET name = ? WHERE id = ?"
)

stmt.execute(["Alice", 1])
```

特点：

- 参数顺序必须与 SQL 中的 `?` 顺序一致
- 简单、直接
- 不适合参数较多或可读性要求高的场景

***

#### 命名参数（Named Arguments）

使用 `:name` 形式的命名占位符。

```ts
const stmt = db.cachedStatement(
  "UPDATE users SET name = :name WHERE id = :id"
)

stmt.execute({ name: "Bob", id: 2 })
```

特点：

- 参数语义清晰
- 顺序无关
- 推荐在复杂 SQL 或长期维护的代码中使用

***

### DatabaseValue 约束

`StatementArguments` 中的值必须是 `DatabaseValue` 类型：

```ts
type DatabaseValue =
  | string
  | number
  | boolean
  | Data
  | Date
  | null
```

不支持的类型（如对象、数组、函数）会导致参数校验或执行失败。

***

## 设计目标与使用场景

`Statement` 的核心目标包括：

- **复用 SQL 编译结果**，减少解析开销
- **集中管理参数绑定逻辑**
- **在执行前提供参数校验能力**
- **提升性能与稳定性**

推荐使用 `Statement` 的场景：

- 循环或批量执行相同 SQL
- 对参数完整性要求高
- 性能敏感路径
- 需要将 SQL 定义与执行逻辑解耦

对于一次性 SQL，直接使用 `Database.execute` 即可。

***

## 创建 Statement

### makeStatement

每次调用都会创建一个新的 Statement 实例。

```ts
const stmt = db.makeStatement(
  "INSERT INTO users (name) VALUES (?)"
)
```

适用于：

- 低频使用
- 生命周期短
- 不需要缓存的 SQL

***

### cachedStatement

返回一个 **可复用的缓存 Statement**，同一条 SQL 只会被编译一次。

```ts
const stmt = db.cachedStatement(
  "INSERT INTO users (name) VALUES (:name)"
)
```

适用于：

- 高频执行
- 批量写入
- 性能敏感路径

***

## 属性说明

### sql

返回 Statement 对应的原始 SQL 字符串。

```ts
console.log(stmt.sql)
```

***

### columnNames

返回查询语句的结果列名列表。

```ts
const query = db.cachedStatement(
  "SELECT id, name FROM users"
)

console.log(query.columnNames)
// ["id", "name"]
```

说明：

- 仅对 `SELECT` 语句有意义
- 常用于动态映射、调试或通用查询封装

***

### isReadonly

表示该 Statement 是否为只读语句。

```ts
if (stmt.isReadonly) {
  console.log("this statement does not modify data")
}
```

说明：

- `SELECT` 通常为只读
- `INSERT / UPDATE / DELETE` 为非只读
- 可用于权限控制或执行前检查

***

## 参数绑定与执行流程

### execute

执行 Statement，可选择是否在此时传入参数。

```ts
stmt.execute({ name: "Charlie" })
```

或在已设置参数的情况下直接执行：

```ts
stmt.setArguments({ name: "Alice" })
stmt.execute()
```

规则说明：

- 若 `execute` 传入参数，将覆盖之前设置的参数
- 若未传入参数，则使用最近一次 `setArguments` 的值

***

### setArguments

设置参数并进行 **完整校验**，但不立即执行。

```ts
stmt.setArguments({ name: "Alice" })
```

适用场景：

- 参数准备与执行分离
- 多步骤逻辑中复用同一组参数
- 希望尽早发现参数问题

***

### validateArguments

仅对参数进行校验，不执行 SQL。

```ts
stmt.validateArguments({ name: "Alice" })
```

校验内容包括：

- 是否缺少必需参数
- 命名参数是否与 SQL 匹配
- 参数数量是否正确
- 参数类型是否符合 `DatabaseValue`

常用于：

- 执行前预检查
- 构建更严格的上层 API

***

### setUncheckedArguments

设置参数但 **跳过参数校验**。

```ts
stmt.setUncheckedArguments({ name: "Alice" })
```

说明：

- 性能更高
- 错误会延迟到执行阶段才暴露
- 仅在你完全确认参数正确时使用

***

## 与 Database.execute 的关系

以下两种方式在功能上等价，但语义和使用场景不同：

```ts
db.execute(
  "INSERT INTO users (name) VALUES (?)",
  ["Alice"]
)
```

```ts
const stmt = db.cachedStatement(
  "INSERT INTO users (name) VALUES (?)"
)
stmt.execute(["Alice"])
```

推荐选择：

| 场景    | 建议                  |
| ----- | ------------------- |
| 一次性执行 | `Database.execute`  |
| 重复执行  | `Statement`         |
| 性能敏感  | `cachedStatement`   |
| 强参数校验 | `validateArguments` |

***

## 生命周期与使用约束

- `Statement` 的生命周期 **隶属于创建它的 Database**
- Database 关闭后，Statement 不可再使用
- 不可跨 Database 实例复用 Statement
- Statement 本身不是并发安全的
  应始终在其所属的 `read / write` 回调中使用

***

## 常见误用

- 在不同 Database 实例中复用同一个 Statement
- 对一次性 SQL 过度使用 Statement
- 滥用 `setUncheckedArguments`
- Database 已关闭后仍执行 Statement
- 传入非 `DatabaseValue` 类型的参数

***

## 总结

`Statement` 是 SQLite API 中用于 **高性能、强约束 SQL 执行** 的核心组件：

- 明确区分 SQL 编译与执行
- 统一参数模型（`StatementArguments`）
- 支持严格与非严格参数绑定
- 与 `Database.execute` 形成清晰职责分工

在需要性能、可维护性和参数安全性的场景中，`Statement` 是首选工具。
