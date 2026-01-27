---
title: fetch 函数

---

`fetch()` 是用于发起 HTTP/HTTPS 网络请求的通用方法，返回一个表示响应 (`Response`) 的 Promise。
它在 Scripting 中的行为与浏览器标准 Fetch API 基本一致，但进行了原生增强以更好地支持 iOS 本地运行环境（包括文件请求、Data 对象、FormData 上传、可控重定向、信号中止与调试标签等）。

---

## 方法定义

```ts
function fetch(url: string, init?: RequestInit): Promise<Response>
function fetch(request: Request): Promise<Response>
```

---

## 参数说明

### 1. `url: string`

要请求的资源地址。
可以是：

* 网络地址（例如 `"https://api.example.com/data"`）
* 本地文件 URL（例如 `"file:///var/mobile/Containers/Data/Application/..."`）

---

### 2. `init?: RequestInit`

可选配置对象，用于自定义请求方法、头部、正文、超时、信号等。
定义如下：

```ts
type RequestInit = {
  method?: string;
  headers?: HeadersInit;
  body?: Data | FormData | string | ArrayBuffer;
  allowInsecureRequest?: boolean;
  handleRedirect?: (newRequest: RedirectRequest) => Promise<RedirectRequest | null>;
  shouldAllowRedirect?: (newRequest: Request) => Promise<boolean>; // 已废弃
  timeout?: number; // 秒
  signal?: AbortSignal;
  cancelToken?: CancelToken; // 已废弃
  debugLabel?: string;
}
```

#### 参数详解：

| 参数                       | 类型                                                        | 说明                                                               |                                |
| ------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------ |
| **method**               | `string`                                                  | 请求方法，如 `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`。默认为 `"GET"`。       |                                |
| **headers**              | `HeadersInit`                                             | 请求头，可以是 `Headers` 实例、键值对象或 `[key, value]` 数组。                    |                                |
| **body**                 | `Data` \| `FormData` \| `string` \| `ArrayBuffer`            | 请求正文，仅对非 GET/HEAD 请求有效。                                          |                                |
| **allowInsecureRequest** | `boolean`                                                 | 允许通过 HTTP 发送请求。默认 `false`。如果主进程运行在 HTTPS 环境下而 URL 为 HTTP，需要显式启用。 |                                |
| **handleRedirect**       | `(newRequest: RedirectRequest) => Promise<RedirectRequest \| null>`                                                           | 自定义重定向处理逻辑。如果返回 `null`，则阻止重定向。 |
| **shouldAllowRedirect**  | `(newRequest: Request) => Promise<boolean>`               | 已废弃，用于兼容旧版重定向判断。                                                 |                                |
| **timeout**              | `number`                                                  | 请求超时时间（秒）。超时将抛出 `AbortError`。                                    |                                |
| **signal**               | `AbortSignal`                                             | 可通过 `AbortController` 控制的中止信号，用于主动取消请求。                          |                                |
| **cancelToken**          | `CancelToken`                                             | 已废弃，用于取消请求的旧机制。建议改用 `signal`。                                    |                                |
| **debugLabel**           | `string`                                                  | 调试标签，会显示在日志面板中，方便识别请求来源。                                         |                                |

---

## 返回值

返回一个 `Promise<Response>` 对象。

`Response` 表示请求的响应数据。
即使返回的 HTTP 状态码为 4xx 或 5xx，`fetch` 仍然会 **成功解析并返回 Response 对象**。
只有当请求本身出错（如网络错误、无效 URL、超时、中止）时，Promise 才会被拒绝。

---

## 异常与错误处理

以下情况会触发 `Promise` 拒绝：

| 错误类型           | 抛出条件                             |
| -------------- | -------------------------------- |
| `TypeError`    | URL 无效、协议不受支持或请求体类型不兼容。          |
| `AbortError`   | 请求被 `AbortController` 主动中止或超时触发。 |

---

## 示例

### 示例 1：基础 GET 请求

```tsx
const response = await fetch("https://api.example.com/data")
if (response.ok) {
  const json = await response.json()
  console.log(json)
} else {
  console.log("请求失败:", response.status)
}
```

---

### 示例 2：POST 请求（JSON）

```tsx
const response = await fetch("https://api.example.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello", content: "World" }),
})
const result = await response.json()
console.log(result)
```

---

### 示例 3：上传文件（FormData）

```tsx
const form = new FormData()
form.append("file", Data.fromFile("/path/to/image.png"), "image/png", "image.png")
form.append("user", "Tom")

const response = await fetch("https://api.example.com/upload", {
  method: "POST",
  body: form,
})
console.log(await response.json())
```

---

### 示例 4：带超时的请求

```tsx
try {
  const response = await fetch("https://example.com/slow", { timeout: 10 })
  const text = await response.text()
  console.log(text)
} catch (err) {
  if (err.name === "AbortError") {
    console.log("请求超时被中止")
  }
}
```

---

### 示例 5：通过 AbortController 主动中止请求

```tsx
const controller = new AbortController()

setTimeout(() => {
  controller.abort("用户取消了请求")
}, 3000)

try {
  const response = await fetch("https://example.com/large", { signal: controller.signal })
  const data = await response.text()
  console.log(data)
} catch (err) {
  if (err.name === "AbortError") {
    console.log("请求已被用户中止")
  }
}
```

---

### 示例 6：自定义重定向处理

```tsx
const response = await fetch("https://example.com/redirect", {
  handleRedirect: async (newRequest) => {
    console.log("收到重定向:", newRequest.url)
    if (newRequest.url.includes("forbidden")) {
      return null // 阻止跳转
    }
    return newRequest // 允许继续
  },
})
```

---

### 示例 7：调试标签与日志

```tsx
await fetch("https://api.example.com/status", {
  debugLabel: "Health Check",
})
// 日志面板中将显示标签 "Health Check"
```

---

## 与其他类的关系

| 类名                                    | 说明                                                   |
| ------------------------------------- | ---------------------------------------------------- |
| **`Request`**                         | 可直接创建一个请求对象并传入 `fetch(request)`。用于重复请求或在多个函数间复用请求配置。 |
| **`Response`**                        | 表示响应结果，可通过 `.json()`, `.text()`, `.data()` 等方法获取内容。  |
| **`AbortController` / `AbortSignal`** | 用于主动中止请求。                                            |
| **`FormData`**                        | 用于构造 multipart/form-data 请求体。                        |
| **`Headers`**                         | 管理请求与响应头部。                                           |
| **`Data`**                            | 表示二进制数据，可用于请求体或响应数据处理。                               |

---

## 特性说明

* **Cookie 管理**：Scripting 中的 `fetch` 默认不自动保存或携带 Cookie。响应中的 `Set-Cookie` 可通过 `response.cookies` 获取。
* **重定向行为**：默认自动跟随，除非设置了 `handleRedirect`。
* **并发安全**：多个并行请求相互独立。
* **文件支持**：可通过 `Data.fromFile()` 直接上传文件内容。

---

## 小结

`fetch()` 是 Scripting 网络请求体系的核心方法，兼容标准 Web API，同时提供更强的原生扩展能力：

* 支持本地文件访问
* 支持二进制 `Data` 类型
* 支持自定义重定向逻辑
* 支持中止与超时机制
* 支持调试标识与原生日志追踪
