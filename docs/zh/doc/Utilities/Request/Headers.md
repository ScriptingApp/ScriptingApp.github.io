---
title: 请求头（Headers）

---

`Headers` 类用于管理 HTTP 请求与响应的头部信息。
它与浏览器 Fetch API 中的同名类保持一致，但在 **Scripting** 环境中提供了更友好的接口方法和 JSON 化能力，以方便脚本中对网络请求进行调试与序列化。

`Headers` 对象可以在以下场景中使用：

* 构造请求时，通过 `RequestInit.headers` 设置请求头
* 从 `Response.headers` 中读取响应头
* 在脚本逻辑中动态添加、修改或删除头部字段

---

## 定义

```ts
class Headers {
  constructor(init?: HeadersInit)
  append(name: string, value: string): void
  get(name: string): string | null
  has(name: string): boolean
  set(name: string, value: string): void
  delete(name: string): void
  forEach(callback: (value: string, name: string) => void): void
  keys(): string[]
  values(): string[]
  entries(): [string, string][]
  toJson(): Record<string, string>
}
```

---

## HeadersInit 类型

`Headers` 的构造函数支持多种初始化格式：

```ts
type HeadersInit = [string, string][] | Record<string, string> | Headers
```

你可以使用以下任意形式创建头部对象：

```tsx
new Headers([["Content-Type", "application/json"]])
new Headers({ "Authorization": "Bearer token" })
new Headers(existingHeaders)
```

---

## 构造函数

### `new Headers(init?: HeadersInit)`

创建一个新的 `Headers` 对象。
可选参数 `init` 用于以已有的头部结构初始化实例。

#### 参数说明

| 参数       | 类型            | 说明                               |
| -------- | ------------- | -------------------------------- |
| **init** | `HeadersInit` | 初始头部数据，可为对象、数组或另一个 `Headers` 实例。 |

---

## 方法说明

### `append(name: string, value: string): void`

向头部中添加一个字段。如果该字段已存在，则追加新的值（不会覆盖旧值）。

#### 示例

```tsx
const headers = new Headers()
headers.append("Accept", "application/json")
headers.append("Accept", "text/plain") // 此时 Accept 拥有两个值
```

---

### `set(name: string, value: string): void`

设置一个头部字段。如果该字段已存在，则会覆盖旧值。

#### 示例

```tsx
const headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Authorization", "Bearer token-123")
```

---

### `get(name: string): string | null`

获取指定头部字段的值。
若字段不存在，返回 `null`。

#### 示例

```tsx
const headers = new Headers({ "Content-Type": "application/json" })
console.log(headers.get("Content-Type")) // 输出: application/json
```

---

### `has(name: string): boolean`

判断指定字段是否存在。

#### 示例

```tsx
const headers = new Headers({ "Accept": "application/json" })
console.log(headers.has("Accept")) // true
console.log(headers.has("Authorization")) // false
```

---

### `delete(name: string): void`

删除指定的头部字段。

#### 示例

```tsx
const headers = new Headers({ "Accept": "application/json", "Cache-Control": "no-cache" })
headers.delete("Cache-Control")
```

---

### `forEach(callback: (value: string, name: string) => void): void`

遍历所有头部字段并执行回调。

#### 示例

```tsx
const headers = new Headers({
  "Accept": "application/json",
  "User-Agent": "ScriptingApp/1.0"
})

headers.forEach((value, name) => {
  console.log(`${name}: ${value}`)
})
```

---

### `keys(): string[]`

返回所有头部名称的数组。

```tsx
const headers = new Headers({ "Accept": "application/json", "User-Agent": "Scripting" })
console.log(headers.keys()) // ["accept", "user-agent"]
```

> 注意：头部字段名不区分大小写，返回的名称将被标准化为小写。

---

### `values(): string[]`

返回所有头部字段的值数组。

```tsx
const headers = new Headers({ "Accept": "application/json", "User-Agent": "Scripting" })
console.log(headers.values()) // ["application/json", "Scripting"]
```

---

### `entries(): [string, string][]`

以键值对数组形式返回所有头部字段。

#### 示例

```tsx
const headers = new Headers({ "Accept": "application/json", "Cache-Control": "no-cache" })
console.log(headers.entries())
// [["accept", "application/json"], ["cache-control", "no-cache"]]
```

---

### `toJson(): Record<string, string>`

将所有头部字段转换为普通对象格式，方便序列化或调试输出。

#### 示例

```tsx
const headers = new Headers({
  "Content-Type": "application/json",
  "Authorization": "Bearer token"
})

console.log(headers.toJson())
// { "content-type": "application/json", "authorization": "Bearer token" }
```

---

## 使用示例

### 示例 1：在请求中设置自定义 Headers

```tsx
const headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Authorization", "Bearer token-xyz")

const response = await fetch("https://api.example.com/user", {
  method: "POST",
  headers,
  body: JSON.stringify({ name: "Tom" })
})
```

---

### 示例 2：读取响应头部信息

```tsx
const response = await fetch("https://example.com/data")
console.log("Content-Type:", response.headers.get("Content-Type"))
console.log("Server:", response.headers.get("Server"))
```

---

### 示例 3：转换为 JSON 用于日志或持久化

```tsx
const response = await fetch("https://example.com/api")
console.log("Response Headers:", response.headers.toJson())
```

---

### 示例 4：判断响应是否包含特定字段

```tsx
const response = await fetch("https://example.com/info")
if (response.headers.has("Set-Cookie")) {
  console.log("响应包含 Cookie 设置")
}
```

---

## 与其他类的关系

| 类名             | 说明                                               |
| -------------- | ------------------------------------------------ |
| **`Request`**  | 通过 `RequestInit.headers` 设置请求头。                  |
| **`Response`** | 可通过 `response.headers` 访问响应头。                    |
| **`fetch()`**  | 请求与响应过程都会使用 `Headers` 实例来封装头部数据。                 |
| **`Cookie`**   | 与 `Set-Cookie` 头对应的解析结果在 `response.cookies` 中访问。 |

---

## 注意事项

* **字段名大小写不敏感**：所有头部名称在内部会被标准化为小写形式。
* **多值字段处理**：使用 `append()` 方法可以为同一字段添加多个值，例如用于 `Accept` 或 `Cookie` 等字段。
* **安全性**：某些系统保留字段（如 `Host`、`Connection`）可能会被 iOS 网络层忽略或重写。
* **序列化输出**：使用 `toJson()` 可便于调试或日志记录，不影响实际请求头发送。

---

## 小结

`Headers` 是 **Scripting 网络请求体系** 中的基础组件之一，提供了灵活的接口来：

* 添加、修改或删除 HTTP 头部
* 以多种方式读取与遍历响应头
* 在脚本环境中实现与 Web 标准一致的行为
* 支持 JSON 化与日志输出
