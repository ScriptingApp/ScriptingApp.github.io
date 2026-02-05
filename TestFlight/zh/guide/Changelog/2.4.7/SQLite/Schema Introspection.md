下面是 **Schema Introspection** 的中文说明文档，作为 SQLite 模块中**数据库结构查询与反射能力**的章节，重点介绍如何获取表、列、主键、外键和索引信息，适用于调试、迁移、工具脚本等场景，风格与前文保持一致，可直接发布。

***

# Schema Introspection

本章节介绍如何使用 SQLite 提供的 Schema Introspection API 来查询和分析数据库结构。

Schema Introspection 允许脚本在运行时获取数据库的结构信息，包括表是否存在、列定义、主键、外键以及索引情况。这些能力通常用于：

- 数据迁移与版本管理
- 工具型脚本（如数据库浏览器、分析工具）
- 运行时结构校验
- 调试与诊断

***

## 获取 Schema 版本

### schemaVersion

```ts
db.schemaVersion(): Promise<number>
```

返回当前数据库的 schema 版本号。

该值通常用于：

- 判断数据库是否需要迁移
- 与外部版本管理逻辑配合使用

示例：

```ts
const version = await db.schemaVersion()
```

***

## 检查表是否存在

### tableExists

```ts
db.tableExists(tableName: string, schemaName?: string): Promise<boolean>
```

判断指定表是否存在。

- `schemaName` 默认为主 schema
- 返回 `true` 表示表存在

示例：

```ts
const exists = await db.tableExists("user")
```

***

## 查询列信息

### columnsIn

```ts
db.columnsIn(tableName: string, schemaName?: string): Promise<ColumnInfo[]>
```

返回指定表中所有列的结构信息。

***

### ColumnInfo

```ts
type ColumnInfo = {
  name: string
  type: string
  defaultValueSQL: string | null
  isNotNull: boolean
  primaryKeyIndex: number
}
```

字段说明：

- `name`：列名
- `type`：列类型
- `defaultValueSQL`：默认值的 SQL 表达式
- `isNotNull`：是否为 NOT NULL
- `primaryKeyIndex`：主键中的顺序（非主键为 0）

示例：

```ts
const columns = await db.columnsIn("user")
```

***

## 查询主键信息

### primaryKey

```ts
db.primaryKey(tableName: string, schemaName?: string): Promise<PrimaryKeyInfo>
```

返回指定表的主键信息。

***

### PrimaryKeyInfo

```ts
type PrimaryKeyInfo = {
  columns: string[]
  rowIDColumn: string | null
  isRowID: boolean
}
```

字段说明：

- `columns`：主键列名数组
- `rowIDColumn`：对应的 rowid 列名（如果存在）
- `isRowID`：是否使用 SQLite 隐式 rowid 作为主键

示例：

```ts
const pk = await db.primaryKey("user")
```

***

## 查询外键信息

### foreignKeys

```ts
db.foreignKeys(tableName: string, schemaName?: string): Promise<ForeignKeyInfo[]>
```

返回指定表中定义的所有外键信息。

***

### ForeignKeyInfo

```ts
type ForeignKeyInfo = {
  id: number
  originColumns: string[]
  destinationTable: string
  destinationColumns: string[]
  mapping: {
    origin: string
    destination: string
  }[]
}
```

字段说明：

- `id`：外键 ID
- `originColumns`：本表中的外键列
- `destinationTable`：引用的目标表
- `destinationColumns`：目标表中的列
- `mapping`：列之间的一一映射关系

示例：

```ts
const fks = await db.foreignKeys("order")
```

***

## 查询索引信息

### indexes

```ts
db.indexes(tableName: string, schemaName?: string): Promise<IndexInfo[]>
```

返回指定表上的所有索引信息。

***

### IndexInfo

```ts
type IndexInfo = {
  name: string
  columns: string[]
  isUnique: boolean
  origin: "createIndex" | "primaryKeyConstraint" | "uniqueConstraint"
}
```

字段说明：

- `name`：索引名称
- `columns`：索引包含的列
- `isUnique`：是否为唯一索引
- `origin`：索引来源

  - `"createIndex"`：通过 `createIndex` 创建
  - `"primaryKeyConstraint"`：主键约束生成
  - `"uniqueConstraint"`：唯一约束生成

示例：

```ts
const indexes = await db.indexes("user")
```

***

## 检查唯一键组合

### isTableHasUniqueKeys

```ts
db.isTableHasUniqueKeys(
  tableName: string,
  uniqueKeys: string[]
): Promise<boolean>
```

判断指定表是否存在**完全匹配**给定列组合的唯一约束或唯一索引。

示例：

```ts
const hasUnique = await db.isTableHasUniqueKeys(
  "user",
  ["email"]
)
```

该方法常用于：

- 判断是否需要创建唯一索引
- 在迁移或初始化阶段避免重复定义约束

***

## 使用建议

- 在执行结构变更前，先使用 introspection API 判断当前状态
- 数据迁移逻辑中优先使用结构判断而非假设
- 工具型脚本可以结合 Schema Introspection 构建可视化或分析能力
- 不要在高频业务路径中频繁调用结构查询 API

***

## 总结

Schema Introspection 为 SQLite 提供了运行时结构反射能力，使脚本可以安全、可靠地感知数据库当前状态。

它通常与以下能力配合使用：

- **Schema Management**：定义和修改结构
- **Transactions**：保证结构变更的原子性
- **Executing SQL & Queries**：在已知结构基础上操作数据
