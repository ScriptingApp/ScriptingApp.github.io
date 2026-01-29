# 响应 （Response）

`Response` 类表示通过 `fetch()` 方法发起的网络请求返回的响应结果。
它提供了访问响应体（body）、头部（headers）、状态码、MIME 类型、以及服务器返回的 Cookies 的接口。

在 **Scripting app** 中，`Response` 的设计基于标准 Fetch API，但进行了原生扩展，支持：

- 原生级 **Cookie 访问与解析**
- **二进制数据 (`Data`)** 支持
- **流式响应 (`ReadableStream<Data>`)** 读取
- 响应的 MIME 类型、编码信息与预期长度
- 完整兼容标准 Web Fetch 行为

***

## 定义

```ts
class Response {
  readonly body: ReadableStream<Data>
  
  constructor(body: ReadableStream<Data>, init?: ResponseInit)

  get bodyUsed(): boolean
  get cookies(): Cookie[]
  json(): Promise<any>
  text(): Promise<string>
  data(): Promise<Data>
  bytes(): Promise<Uint8Array>
  arrayBuffer(): Promise<ArrayBuffer>
  formData(): Promise<FormData>
  get status(): number
  get statusText(): string
  get headers(): Headers
  get ok(): boolean
  get url(): string
  get mimeType(): string | undefined
  get expectedContentLength(): number | undefined
  get textEncodingName(): string | undefined
}
```

***

## 属性说明

| 属性                        | 类型                     | 说明                                   |
| ------------------------- | ---------------------- | ------------------------------------ |
| **body**                  | `ReadableStream<Data>` | 响应体数据的可读流。                           |
| **bodyUsed**              | `boolean`              | 指示响应体是否已被读取。                         |
| **cookies**               | `Cookie[]`             | 服务器通过 `Set-Cookie` 返回的 Cookie 列表。    |
| **status**                | `number`               | HTTP 状态码（如 `200`、`404`、`500`）。       |
| **statusText**            | `string`               | 状态描述（如 `"OK"`、`"Not Found"`）。        |
| **headers**               | `Headers`              | 响应头对象。                               |
| **ok**                    | `boolean`              | 当状态码在 200–299 范围内时为 `true`。          |
| **url**                   | `string`               | 响应的最终 URL（可能经过重定向）。                  |
| **mimeType**              | `string \| undefined`  | 响应的 MIME 类型（如 `"application/json"`）。 |
| **expectedContentLength** | `number \| undefined`  | 响应体的预期长度（字节），由服务器提供。                 |
| **textEncodingName**      | `string \| undefined`  | 文本编码方式（如 `"utf-8"`）。                 |

***

## 方法说明

### `json(): Promise<any>`

将响应体解析为 JSON 对象。

#### 示例

```tsx
const response = await fetch("https://api.example.com/user")
const data = await response.json()
console.log(data.name)
```

***

### `text(): Promise<string>`

将响应体读取为字符串。
默认使用 UTF-8 编码，若服务器返回了编码信息则自动识别。

#### 示例

```tsx
const response = await fetch("https://example.com/message.txt")
const text = await response.text()
console.log(text)
```

***

### `data(): Promise<Data>`

将响应体读取为二进制数据对象 `Data`，适合文件下载、图片处理、或转换为 Base64。

#### 示例

```tsx
const response = await fetch("https://example.com/image.png")
const imageData = await response.data()
FileManager.write(imageData, "/local/image.png")
```

***

### `bytes(): Promise<Uint8Array>`

将响应体读取为字节数组。

#### 示例

```tsx
const response = await fetch("https://example.com/file.bin")
const bytes = await response.bytes()
console.log("Received", bytes.length, "bytes")
```

***

### `arrayBuffer(): Promise<ArrayBuffer>`

将响应体读取为 `ArrayBuffer`，适合进行底层二进制操作。

#### 示例

```tsx
const response = await fetch("https://example.com/file")
const buffer = await response.arrayBuffer()
console.log(buffer.byteLength)
```

***

### `formData(): Promise<FormData>`

将响应体解析为 `FormData`（适用于 `multipart/form-data` 类型的响应）。

#### 示例

```tsx
const response = await fetch("https://example.com/form")
const form = await response.formData()
console.log(form.get("username"))
```

***

## Cookies 支持

### `cookies: Cookie[]`

Scripting 的 `Response` 支持直接访问服务器返回的 `Set-Cookie` 信息。
返回值为一个 `Cookie` 对象数组，每个元素包含完整的 Cookie 元数据。

#### Cookie 类型定义

```ts
interface Cookie {
  name: string
  value: string
  domain: string
  path: string
  isSecure: boolean
  isHTTPOnly: boolean
  isSessionOnly: boolean
  expiresDate?: Date | null
}
```

| 字段                | 类型             | 说明                     |
| ----------------- | -------------- | ---------------------- |
| **name**          | `string`       | Cookie 名称。             |
| **value**         | `string`       | Cookie 值。              |
| **domain**        | `string`       | 所属域名。                  |
| **path**          | `string`       | 作用路径。                  |
| **isSecure**      | `boolean`      | 是否仅通过 HTTPS 发送。        |
| **isHTTPOnly**    | `boolean`      | 是否为 HTTP-only，无法被脚本访问。 |
| **isSessionOnly** | `boolean`      | 是否为会话 Cookie（无过期时间）。   |
| **expiresDate**   | `Date \| null` | 过期时间（若有设置）。            |

***

### 示例：读取响应中的 Cookies

```tsx
const response = await fetch("https://example.com/login")
for (const cookie of response.cookies) {
  console.log(`${cookie.name} = ${cookie.value}`)
}
```

***

### 示例：手动管理 Cookie（跨请求复用）

默认情况下，**Scripting 的 `fetch()` 不会自动存储或携带 Cookie**。
如果希望在多次请求中复用 Cookie，可以手动拼接 `Cookie` 头：

```tsx
const response = await fetch("https://example.com/login")
const cookies = response.cookies
const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join("; ")

const next = await fetch("https://example.com/dashboard", {
  headers: { "Cookie": cookieHeader },
})
```

这种方式让开发者能够像浏览器开发者工具一样 **完全掌控 Cookie 的发送与存储**。

***

## 与其他类的关系

| 类名             | 说明                                |
| -------------- | --------------------------------- |
| **`Request`**  | 表示生成此响应的请求对象。                     |
| **`Headers`**  | 用于访问响应头部信息。                       |
| **`Data`**     | 表示响应体的二进制数据。                      |
| **`FormData`** | 表示 `multipart/form-data` 格式的表单响应。 |
| **`Cookie`**   | 表示服务器返回的单个 Cookie 对象。             |

***

## 使用示例

### 示例 1：处理 JSON API 响应

```tsx
const response = await fetch("https://api.example.com/profile")
if (response.ok) {
  const user = await response.json()
  console.log(user.email)
} else {
  console.log("请求失败:", response.status, response.statusText)
}
```

***

### 示例 2：下载文件并保存

```tsx
const response = await fetch("https://example.com/photo.jpg")
const fileData = await response.data()
FileManager.write(fileData, "/local/photo.jpg")
```

***

### 示例 3：读取服务器返回的 Cookies

```tsx
const response = await fetch("https://example.com/login")
for (const cookie of response.cookies) {
  console.log(`Cookie: ${cookie.name} = ${cookie.value}`)
}
```

***

### 示例 4：跨请求手动复用 Cookies

```tsx
const loginResponse = await fetch("https://example.com/login", {
  method: "POST",
  body: JSON.stringify({ username: "Tom", password: "1234" }),
  headers: { "Content-Type": "application/json" },
})

// 读取 Cookie 并拼接成请求头
const cookieHeader = loginResponse.cookies.map(c => `${c.name}=${c.value}`).join("; ")

// 携带 Cookie 发起新请求
const dashboard = await fetch("https://example.com/dashboard", {
  headers: { "Cookie": cookieHeader },
})
console.log(await dashboard.text())
```

***

### 示例 5：读取响应的元信息

```tsx
const response = await fetch("https://example.com/video.mp4")
console.log("MIME 类型:", response.mimeType)
console.log("预期长度:", response.expectedContentLength)
```

***

## 小结

`Response` 是 Scripting 网络请求体系中最核心的组成部分之一，具有以下特性：

- 完整兼容标准 Fetch API 行为
- 新增 **原生 Cookie 访问与控制** 能力
- 支持 `Data` 类型的 **二进制数据处理**
- 支持响应流式读取、MIME 类型、编码与长度信息
- 可与 `Request`、`Headers`、`FormData`、`AbortController` 等类型无缝配合
