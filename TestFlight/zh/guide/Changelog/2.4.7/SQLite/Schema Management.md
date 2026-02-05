# 模式管理（Schema Management）

本章节介绍如何使用 SQLite 的结构化 API 来创建、修改和删除表与索引。

与直接拼接 SQL 不同，Schema Management 提供了一套**声明式、可读性更强且更安全**的方式来管理数据库结构，适用于长期维护的数据模型。

***

## 创建表

### createTable

```ts
db.createTable(
  name: string,
  options: {
    columns: ColumnDefinition[]
    ifNotExists?: boolean
  }
): Promise<void>
```

`createTable` 用于创建一张新表。

示例：

```ts
await db.createTable("user", {
  ifNotExists: true,
  columns: [
    { name: "id", type: "INTEGER", primaryKey: true, autoIncrement: true },
    { name: "name", type: "TEXT", notNull: true },
    { name: "age", type: "INTEGER" }
  ]
})
```

***

### ColumnDefinition

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

每一列的定义包含以下常用属性：

- `name`：列名
- `type`：SQLite 列类型（如 `INTEGER`、`TEXT`）
- `primaryKey`：是否为主键
- `autoIncrement`：是否启用自增（仅适用于整数主键）
- `notNull`：是否为 NOT NULL
- `unique`：是否添加唯一约束
- `indexed`：是否为该列创建索引
- `checkSQL`：CHECK 约束表达式
- `collation`：列排序规则
- `defaultValue`：默认值（参数化形式）
- `defaultSQL`：默认值（原生 SQL 表达式）
- `references`：外键引用定义

***

### 默认值说明

`defaultValue` 与 `defaultSQL` 二者互斥，应选择其一：

```ts
{ name: "createdAt", type: "INTEGER", defaultSQL: "CURRENT_TIMESTAMP" }
```

```ts
{ name: "status", type: "TEXT", defaultValue: "active" }
```

***

### 外键引用

```ts
references?: {
  table: string
  column?: string
  onDelete?: "cascade" | "restrict" | "setNull" | "setDefault"
  onUpdate?: "cascade" | "restrict" | "setNull" | "setDefault"
  deferred?: boolean
}
```

示例：

```ts
{
  name: "userId",
  type: "INTEGER",
  references: {
    table: "user",
    column: "id",
    onDelete: "cascade"
  }
}
```

***

## 重命名表

### renameTable

```ts
db.renameTable(name: string, newName: string): Promise<void>
```

示例：

```ts
await db.renameTable("user", "users")
```

***

## 删除表

### dropTable

```ts
db.dropTable(name: string): Promise<void>
```

示例：

```ts
await db.dropTable("temp_data")
```

***

## 创建索引

### createIndex

```ts
db.createIndex(
  name: string,
  options: {
    table: string
    columns: string[]
    unique?: boolean
    ifNotExists?: boolean
    condition?: string
  }
): Promise<void>
```

示例：

```ts
await db.createIndex("idx_user_name", {
  table: "user",
  columns: ["name"],
  unique: false
})
```

***

### 条件索引

```ts
await db.createIndex("idx_active_user", {
  table: "user",
  columns: ["name"],
  condition: "age >= 18"
})
```

***

## 删除索引

### dropIndex

```ts
db.dropIndex(name: string): Promise<void>
```

示例：

```ts
await db.dropIndex("idx_user_name")
```

***

### dropIndexOn

```ts
db.dropIndexOn(tableName: string, columns: string[]): Promise<void>
```

用于删除指定表和列组合上的索引。

示例：

```ts
await db.dropIndexOn("user", ["name"])
```

***

## 设计说明

Schema Management API 的设计遵循以下原则：

- **结构优先于字符串拼接**
  提供清晰的结构定义，降低 SQL 拼写错误风险

- **声明式而非命令式**
  明确表达“表应该是什么样子”，而不是“如何拼 SQL”

- **与 SQLite 原生能力一一映射**
  不引入额外抽象，避免隐藏行为

***

## 使用建议

- 对长期存在的表结构，优先使用 `createTable`
- 使用 `ifNotExists` 避免重复创建
- 对高频查询字段显式创建索引
- 使用外键时，确保已启用 `foreignKeysEnabled`
- Schema 变更建议结合事务或迁移逻辑执行

***

## 下一步

在完成表和索引的创建后，你可能需要：

- 查询数据库中已有的表结构
- 获取列、主键、外键信息
- 分析索引和约束情况
