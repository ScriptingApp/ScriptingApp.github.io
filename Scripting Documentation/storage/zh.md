`Storage` API 提供了一个简单高效的接口，用于存储和检索持久化数据，支持基础数据类型和 JSON。

---

## 概述

`Storage` API 被设计用于异步将简单数据类型持久化到磁盘。适合存储设置、用户偏好或需要在应用启动间保留的轻量级数据。

### 主要特性：
- 简单的接口，可用于存储、检索和移除数据。
- 支持基础数据类型和 JSON。
- 数据在应用多次启动之间持久化。

---

## 支持的数据类型

`Storage` 支持以下数据类型：

- `string`
- `number`
- `boolean`
- JSON 对象（`Record<string, any>` 或数组）

---

## API 参考

### 方法

#### `Storage.set<T>(key: string, value: T): boolean`

在后台将 `value` 保存到持久化存储中。

- **参数:**
  - `key`: 数据的唯一标识符。
  - `value`: 要存储的数据，必须是支持的数据类型之一。
- **返回值:**
  - 一个布尔值，指示操作是否成功。

#### 示例:

```typescript
const success = Storage.set("username", "JohnDoe")
console.log("保存成功:", success)
```

---

#### `Storage.get<T>(key: string): T | null`

从持久化存储中读取一个值。如果 `key` 不存在，返回 `null`。

- **参数:**
  - `key`: 要检索的数据的唯一标识符。
- **返回值:**
  - 已存储的值，或 `null` 如果 `key` 不存在。

#### 示例:

```typescript
const username = Storage.get<string>("username")
console.log("存储的用户名:", username)
```

---

#### `Storage.remove(key: string): void`

从持久化存储中移除一个条目。

- **参数:**
  - `key`: 要移除的数据的唯一标识符。

#### 示例:

```typescript
Storage.remove("username")
console.log("用户名已从存储中移除")
```

---

#### `Storage.contains(key: string): boolean`

检查持久化存储中是否包含给定的 `key`。

- **参数:**
  - `key`: 数据的唯一标识符。
- **返回值:**
  - 如果 `key` 存在，返回 `true`；否则返回 `false`。

#### 示例:

```typescript
const hasKey = Storage.contains("username")
console.log("存储中是否存在用户名:", hasKey)
```

---

## 常见用例

### 保存并检索用户设置

```typescript
Storage.set("theme", "dark")
const theme = Storage.get<string>("theme")
console.log("当前主题:", theme)
```

### 检查并移除一个键

```typescript
if (Storage.contains("theme")) {
  Storage.remove("theme")
  console.log("主题偏好已移除")
}
```

### 存储 JSON 数据

```typescript
const userData = { name: "John Doe", age: 30 }
Storage.set("user", userData)

const storedUser = Storage.get<Record<string, any>>("user")
console.log("用户数据:", storedUser)
```

---

## 最佳实践

1. **键管理:** 使用一致且描述性的键以避免冲突，并使代码更易维护。
2. **数据验证:** 在检索存储的 JSON 对象时，始终验证其数据类型和结构。
3. **错误处理:** 检查 `Storage.set` 的返回值以确保操作成功。
4. **优化访问:** 最小化频繁的读写操作以避免不必要的开销。

---

## 完整示例

```typescript
async function main() {
  // 保存用户偏好
  const saveSuccess = Storage.set("language", "English")
  if (saveSuccess) {
    console.log("语言偏好保存成功")
  }

  // 检索用户偏好
  const language = Storage.get<string>("language")
  console.log("首选语言:", language)

  // 保存 JSON 数据
  const profile = { name: "Jane Doe", age: 28 }
  Storage.set("profile", profile)

  // 检索 JSON 数据
  const storedProfile = Storage.get<Record<string, any>>("profile")
  console.log("存储的个人信息:", storedProfile)

  // 移除一个键
  if (Storage.contains("language")) {
    Storage.remove("language")
    console.log("语言偏好已移除")
  }
}

main()
```