# 执行 SQL 和查询

本章节介绍如何在 SQLite 中执行 SQL 语句、绑定参数以及查询数据。

所有操作均通过 `Database` 实例完成，SQLite 会在内部处理连接、线程与调度细节，JavaScript 侧只需关注 SQL 与数据本身。

***

## 执行 SQL

### execute

```ts
db.execute(sql: string, arguments?: Arguments): Promise<void>
```

`execute` 用于执行不返回结果集的 一个或多个 SQL 语句，常用于：

- 创建或修改表结构
- 插入、更新、删除数据
- 执行 PRAGMA 语句

示例：

```ts
await db.execute(
  "CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)"
)
```

```ts
await db.execute(
  "UPDATE user SET age = ? WHERE name = ?",
  [19, "Tom"]
)
```

***

## 参数绑定（Arguments）

SQLite 支持两种参数绑定方式：**位置参数** 和 **命名参数**。

### 位置参数

```ts
await db.execute(
  "INSERT INTO user (name, age) VALUES (?, ?)",
  ["Tom", 18]
)
```

参数数组中的值会按顺序绑定到 SQL 中的 `?` 占位符。

***

### 命名参数

```ts
await db.execute(
  "INSERT INTO user (name, age) VALUES (:name, :age)",
  { name: "Lucy", age: 20 }
)
```

命名参数通过对象形式传入，键名需与 SQL 中的参数名一致。

***

### DatabaseValue 类型

参数值支持以下类型：

- `string`
- `number`
- `boolean`
- `Data`
- `Date`
- `null`

`Date` 和 `Data` 会按照 SQLite 约定方式进行转换和存储。

***

## 查询数据

SQLite 提供三种查询方法，适用于不同的使用场景。

***

### fetchAll

```ts
db.fetchAll<T>(sql: string, arguments?: Arguments): Promise<T[]>
```

执行查询并返回**所有结果行**。

示例：

```ts
const users = await db.fetchAll<{ name: string; age: number }>(
  "SELECT name, age FROM user"
)
```

当查询没有返回任何结果时，返回空数组。

***

### fetchOne

```ts
db.fetchOne<T>(sql: string, arguments?: Arguments): Promise<T>
```

执行查询并返回**第一行结果**。

示例：

```ts
const user = await db.fetchOne<{ name: string }>(
  "SELECT name FROM user WHERE age = ?",
  [18]
)
```

使用场景：

- 明确只期望一条结果（如按主键查询）
- 查询聚合结果（如 `COUNT(*)`）

如果查询未返回任何结果，该方法将抛出错误。

***

### fetchSet

```ts
db.fetchSet<T>(sql: string, arguments?: Arguments): Promise<T[]>
```

执行查询并返回去重后的结果集合。

该方法适用于以下场景：

- 查询某一列的唯一值集合
- 需要在逻辑层面消除重复结果

示例：

```ts
const names = await db.fetchSet<{ name: string }>(
  "SELECT name FROM user"
)
```

返回结果中不会包含重复记录。

***

## 类型映射说明

查询结果中的字段值会自动映射为 JavaScript 类型：

- SQLite INTEGER → `number`
- SQLite REAL → `number`
- SQLite TEXT → `string`
- SQLite BLOB → `Data`
- SQLite NULL → `null`

返回对象的结构由查询语句决定，SQLite 不会强制要求与泛型 `T` 完全匹配，但建议保持一致以提高可读性与类型安全。

***

## 错误处理

以下情况会导致方法抛出错误：

- SQL 语法错误
- 参数数量或名称不匹配
- 违反约束（如唯一键、外键）
- `fetchOne` 查询未返回结果
- 数据库被锁定且 `busyMode` 超时

建议在需要时使用 `try / catch` 捕获错误：

```ts
try {
  await db.execute("INSERT INTO user (name) VALUES (?)", ["Tom"])
} catch (e) {
  console.error(e)
}
```

***

## 使用建议

- 使用 `execute` 执行无返回结果的 SQL
- 查询多行数据时使用 `fetchAll`
- 明确只需要一行结果时使用 `fetchOne`
- 需要去重结果时使用 `fetchSet`
- 优先使用参数绑定，避免字符串拼接 SQL
- 复杂写操作应放入事务中执行

***

## 下一步

当需要保证多条写操作的原子性，或在失败时自动回滚，请继续阅读：

- **Transactions**
