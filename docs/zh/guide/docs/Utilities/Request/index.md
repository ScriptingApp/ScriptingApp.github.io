---
title: 请求
---
Scripting 提供了一个符合 Web 标准的 `fetch` 网络请求接口，支持常见的 HTTP 操作，包括请求头设置、表单数据上传、响应解析、请求取消等功能。该 API 模拟了浏览器环境下的 Fetch API 行为，使你可以使用熟悉的方式进行网络通信。

---

## 总览

```ts
fetch(input: string | Request, init?: RequestInit): Promise<Response>
```

`fetch()` 方法用于发起 HTTP 请求，并返回一个 `Promise`，该 Promise 解析为 `Response` 对象。

与传统的 `XMLHttpRequest` 不同，`fetch()` 使用 Promise 机制，且不会因为 HTTP 错误状态码（如 404 或 500）而 reject。你需要通过 `Response.ok` 或 `Response.status` 判断响应状态。

---

## 请求类

### `Request` 类

表示一个 HTTP 请求。

```ts
class Request {
  constructor(input: string | Request, init?: RequestInit)
  clone(): Request
}
```

#### 属性

* `url: string` – 请求的地址。
* `method: string` – 请求方法（GET、POST、PUT、DELETE 等）。
* `headers: Headers` – 请求头。
* `body?: Data | FormData | string | ArrayBuffer` – 请求体内容。
* `connectTimeout?: number` – 连接超时时间（毫秒）。
* `receiveTimeout?: number` – 响应超时时间（毫秒）。
* `signal?: AbortSignal` – 用于中止请求的信号对象。
* `cancelToken?: CancelToken` *(已废弃)* – 用于请求取消。
* `debugLabel?: string` – 调试标签，可显示在日志面板中。

---

## 响应类

### `Response` 类

表示 `fetch()` 请求返回的响应。

```ts
class Response {
  constructor(body: ReadableStream<Data>, init?: ResponseInit)
}
```

#### 属性

* `body: ReadableStream<Data>` – 响应体的可读数据流。
* `bodyUsed: boolean` – 是否已经读取过响应体。
* `status: number` – HTTP 状态码。
* `statusText: string` – 状态描述文本。
* `headers: Headers` – 响应头。
* `ok: boolean` – 状态码是否在 200–299 范围内。
* `url: string` – 最终的响应 URL（可能包含重定向）。
* `mimeType?: string`
* `expectedContentLength?: number`
* `textEncodingName?: string`

#### 方法

* `json(): Promise<any>` – 以 JSON 格式解析响应体。
* `text(): Promise<string>` – 以字符串格式解析响应体。
* `data(): Promise<Data>` – 获取响应体的原始 `Data` 对象。
* `bytes(): Promise<Uint8Array>` – 获取响应体的二进制数组。
* `arrayBuffer(): Promise<ArrayBuffer>` – 获取响应体的 `ArrayBuffer`。
* `formData(): Promise<FormData>` – 解析为表单数据对象。

---

## 请求头

### `Headers` 类

用于设置和读取 HTTP 请求/响应头。

```ts
class Headers {
  constructor(init?: HeadersInit)
}
```

#### 方法

* `append(name: string, value: string): void` – 添加一个新的 header 项。
* `get(name: string): string | null` – 获取某个 header 的值。
* `has(name: string): boolean` – 判断是否包含指定 header。
* `set(name: string, value: string): void` – 设置或覆盖 header。
* `delete(name: string): void` – 删除指定 header。
* `forEach(callback: (value: string, name: string) => void): void`
* `keys(): string[]`
* `values(): string[]`
* `entries(): [string, string][]`
* `toJson(): Record<string, string>` – 转换为普通对象格式。

---

## 表单数据

### `FormData` 类

用于构建 `multipart/form-data` 格式的表单数据，通常用于文件上传或模拟表单提交。

```ts
class FormData { }
```

#### 方法

* `append(name: string, value: string): void`
* `append(name: string, value: Data, mimeType: string, filename?: string): void`
* `get(name: string): string | Data | null`
* `getAll(name: string): any[]`
* `has(name: string): boolean`
* `delete(name: string): void`
* `set(name: string, value: string | Data, filename?: string): void`
* `forEach(callback: (value: any, name: string, parent: FormData) => void): void`
* `entries(): [string, any][]`

#### 辅助方法

```ts
formDataToJson(formData: FormData): Record<string, any>
```

将 `FormData` 对象转换为普通 JSON 对象。

---

## 请求取消

### `AbortController` 和 `AbortSignal`

现代方式的请求中止机制。

```ts
const controller = new AbortController()
fetch('https://example.com', { signal: controller.signal })
// 取消请求
controller.abort('用户手动中止')
```

```ts
class AbortController {
  readonly signal: AbortSignal
  abort(reason?: any): void
}

class AbortSignal {
  readonly aborted: boolean
  readonly reason: any
  addEventListener(type: 'abort', listener: AbortEventListener): void
  removeEventListener(type: 'abort', listener: AbortEventListener): void
  throwIfAborted(): void

  static abort(reason?: any): AbortSignal
  static timeout(delay: number): AbortSignal
  static any(signals: AbortSignal[]): AbortSignal
}
```

### `AbortError`

在请求已被中止时抛出的异常。

---

## CancelToken（已废弃）

### `CancelToken` 类

旧版请求取消方式，已被 `AbortController` 替代。

```ts
class CancelToken {
  readonly token: string
  readonly isCancelled: boolean
  cancel(reason?: any): void
  addEventListener(type: 'cancel', listener: CancelEventListener): void
  removeEventListener(type: 'cancel', listener: CancelEventListener): void
}
```

### `useCancelToken()`

在函数组件中使用 `CancelToken` 的 Hook。

```tsx
function App() {
  const cancelToken = useCancelToken()

  async function request() {
    cancelToken.get()?.cancel()
    const result = await fetch('https://example.com', {
      cancelToken: cancelToken.create(),
    })
  }

  return <Button
    title="请求"
    action={request}
  />
}
```

---

## 错误处理

* `fetch()` 只有在请求本身失败（如网络断开、URL 无效）时才会 reject。
* HTTP 状态错误（如 404、500）不会引发异常，需通过 `response.ok` 或 `response.status` 判断。
* 推荐使用 `AbortController` 实现请求取消。

---

## 使用示例

### 基础 GET 请求

```ts
const response = await fetch('https://example.com/data.json')
const json = await response.json()
```

### POST 请求发送 JSON 数据

```ts
const response = await fetch('https://example.com/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})
```

### 上传文件（使用 FormData）

```ts
const form = new FormData()
form.append('file', fileData, 'image/png', 'photo.png')

const response = await fetch('https://example.com/upload', {
  method: 'POST',
  body: form
})
```