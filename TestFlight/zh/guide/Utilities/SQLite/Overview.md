# 概述

SQLite 模块为 Scripting 提供了一套结构化、类型友好且可预测的数据库访问 API，用于在脚本中安全地读写 SQLite 数据库。

该模块是全局命名空间，不需要导入。它基于原生 SQLite 能力封装，支持磁盘数据库与内存数据库，覆盖常见的数据查询、事务管理、表结构管理以及 Schema 反射等需求，适用于本地数据持久化、缓存、日志记录以及中小规模结构化数据存储场景。

***

## 快速开始

### 打开数据库

```ts
const dbPath = Path.join(FileManager.appGroupDocumentsDirectory, "app.db")
const db = SQLite.open(dbPath)
```

打开一个位于脚本数据目录中的 SQLite 数据库。如果文件不存在，将自动创建。

也可以打开一个内存数据库：

```ts
const db = SQLite.openInMemory("temp")
```

***

### 执行 SQL

```ts
await db.execute(
  "CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)"
)

await db.execute(
  "INSERT INTO user (name, age) VALUES (?, ?)",
  ["Tom", 18]
)
```

支持位置参数和命名参数两种形式。

***

### 查询数据

```ts
const users = await db.fetchAll<{ name: string; age: number }>(
  "SELECT name, age FROM user"
)

const user = await db.fetchOne<{ name: string }>(
  "SELECT name FROM user WHERE age = ?",
  [18]
)
```

***

### 使用事务

```ts
await db.transcation([
  { sql: "INSERT INTO user (name, age) VALUES (?, ?)", args: ["Tom", 18] },
  { sql: "INSERT INTO user (name, age) VALUES (?, ?)", args: ["Lucy", 20] }
])
```

事务以 **步骤列表（steps）** 的形式声明，所有步骤将按顺序执行，任一步失败都会触发回滚。

***

## 核心能力概览

SQLite 模块主要提供以下能力：

- 数据库连接管理
- SQL 执行与参数绑定
- 结构化数据查询
- 显式事务管理
- 表与索引的创建与删除
- 数据库 Schema 信息查询

***

## 文档结构说明

SQLite 模块的文档按照功能拆分为多个部分，你可以根据需求查阅对应章节：

- **Database & Connection**
  打开数据库、配置选项、只读模式与并发相关说明

- **Executing SQL & Queries**
  执行 SQL、参数绑定规则、查询方法说明

- **Transactions**
  事务模型、事务类型以及设计约束说明

- **Schema Management**
  创建和管理表、索引的结构化 API

- **Schema Introspection**
  查询表结构、主键、外键和索引信息

- **Types Reference**
  SQLite 模块中使用的类型与枚举定义

***

## 适用场景

SQLite 模块适用于以下场景：

- 本地数据持久化
- 脚本级缓存与状态存储
- 中小规模结构化数据管理
- 构建基于 SQLite 的工具型脚本
- 数据迁移、分析与调试辅助工具
