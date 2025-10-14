Scripting 提供了与 Web 标准兼容的 `fetch` 接口，用于执行网络请求。该接口基于 Promise 模型，支持设置请求头、请求体、取消请求、表单上传（multipart/form-data）、调试标签、超时控制、自定义重定向处理、非安全请求控制等功能。

---

## 概览

```ts
fetch(input: string | Request, init?: RequestInit): Promise<Response>
```

`fetch()` 方法向指定资源发起网络请求，并返回一个 `Promise`，该 Promise 最终解析为一个 `Response` 响应对象。

与传统的 `XMLHttpRequest` 不同，`fetch()` 使用 Promise，不会因为 HTTP 协议错误（如 404 或 500）而 reject。你需要手动检查 `Response.ok` 或 `Response.status` 来判断请求是否成功。

---

## Request（请求）

### `Request` 类

代表一个 HTTP 请求。

```ts
class Request {
  constructor(input: string | Request, init?: RequestInit)
  clone(): Request
}
```

#### 属性

| 属性名 | 类型  | 说 明  |
| ----------------------- | ------------------------------------------- | --------------------|
| `url`                   | `string`                                    | 请求的 URL                                                                      |
| `method`                | `string`                                    | HTTP 方法（如 GET、POST、PUT、DELETE 等）                                             |
| `headers`               | `Headers`                                   | 请求头对象                                                                        |
| `body?`                 | `Data \| FormData \| string \| ArrayBuffer` | 请求体 |
| `allowInsecureRequest?` | `boolean`                                   | 是否允许非安全请求（HTTP）。默认为 `false`。当 app 通过 HTTPS 加载时，如果请求是 HTTP，将被默认阻止，除非设置为 true。 |
| `shouldAllowRedirect?`  | `(newRequest: Request) => Promise<boolean>` | 当发生重定向时回调函数，接收重定向后的新请求，返回是否允许跳转。未设置时默认全部允许。                                  |
| `timeout?`              | `number`                                    | 请求超时时间（单位：秒）                                                                 |
| `connectTimeout?`       | `number`                                    | 建立连接超时时间（单位：毫秒）                                                              |
| `receiveTimeout?`       | `number`                                    | 接收响应超时时间（单位：毫秒）                                                              |
| `signal?`               | `AbortSignal`                               | 可用于中止请求的信号对象                                                                 |
| `cancelToken?`          | `CancelToken` *(已废弃)*                       | 用于取消请求的旧机制，请使用 `signal` 替代                                                   |
| `debugLabel?`           | `string`                                    | 自定义调试标签，用于日志显示                                                               |

---

## RequestInit 类型

用于 `fetch()` 或 `Request` 构造函数的第二个参数。

```ts
type RequestInit = {
  method?: string;
  headers?: HeadersInit;
  body?: Data | FormData | string | ArrayBuffer;

  allowInsecureRequest?: boolean;
  shouldAllowRedirect?: (newRequest: Request) => Promise<boolean>;
  timeout?: number;
  connectTimeout?: number;
  receiveTimeout?: number;

  signal?: AbortSignal;

  /** @deprecated 已废弃，请使用 `signal` */
  cancelToken?: CancelToken;

  debugLabel?: string;
}
```

---

## Response（响应）

### `Response` 类

表示 fetch 请求的响应结果。

```ts
class Response {
  constructor(body: ReadableStream<Data>, init?: ResponseInit)
}
```

#### 属性

| 属性名                      | 类型                     | 说明                 |
| ------------------------ | ---------------------- | ------------------ |
| `body`                   | `ReadableStream<Data>` | 响应体（数据流）           |
| `bodyUsed`               | `boolean`              | 响应体是否已被读取          |
| `cookies`                | `Cookie[]`             | 响应的 cookie 列表          |
| `status`                 | `number`               | HTTP 状态码           |
| `statusText`             | `string`               | HTTP 状态文本          |
| `headers`                | `Headers`              | 响应头                |
| `ok`                     | `boolean`              | 是否状态码在 200–299 范围内 |
| `url`                    | `string`               | 最终重定向后的 URL        |
| `mimeType?`              | `string`               | MIME 类型（如能推断）      |
| `expectedContentLength?` | `number`               | 预计内容长度（字节）         |
| `textEncodingName?`      | `string`               | 文本编码名称（如可用）        |

##### `Cookie` 类型

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

- `name`: cookie 名
- `value`: cookie 值
- `domain`: cookie 所属域名
- `path`: cookie 所属路径
- `isSecure`: 是否为安全 cookie
- `isHTTPOnly`: 是否为 HTTPOnly cookie
- `isSessionOnly`: 是否为会话 cookie
- `expiresDate`: cookie 过期时间，可选


#### 方法

* `json(): Promise<any>` – 将响应解析为 JSON 对象
* `text(): Promise<string>` – 解析为纯文本
* `data(): Promise<Data>` – 以 Data 对象返回数据
* `bytes(): Promise<Uint8Array>` – 返回二进制数据
* `arrayBuffer(): Promise<ArrayBuffer>` – 返回原始内存缓冲区
* `formData(): Promise<FormData>` – 解析为表单数据

---

## Headers（请求头）

### `Headers` 类

```ts
class Headers {
  constructor(init?: HeadersInit)
}
```

#### 方法

* `append(name: string, value: string): void` – 添加新字段
* `get(name: string): string | null` – 获取字段值
* `has(name: string): boolean` – 是否存在字段
* `set(name: string, value: string): void` – 设置或替换字段值
* `delete(name: string): void` – 删除字段
* `forEach(callback): void` – 遍历所有字段
* `keys(): string[]`
* `values(): string[]`
* `entries(): [string, string][]`
* `toJson(): Record<string, string>` – 转为 JSON 对象

---

## FormData（表单数据）

### `FormData` 类

表示 `multipart/form-data` 表单数据。

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

---

## 请求取消机制

### `AbortController` 与 `AbortSignal`

现代的取消请求机制：

```ts
const controller = new AbortController()
fetch('https://example.com', { signal: controller.signal })
// 取消请求
controller.abort('用户取消')
```

#### 类定义

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

---

## CancelToken（已废弃）

### `CancelToken` 类

旧版本的请求取消机制。

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

React 风格的 hook，用于函数组件：

```tsx
function App() {
  const cancelToken = useCancelToken()

  async function request() {
    cancelToken.get()?.cancel()
    const result = await fetch('https://example.com', {
      cancelToken: cancelToken.create(),
    })
  }

  return <Button title="发起请求" action={request} />
}
```

---

## 错误处理

* `fetch()` 只在网络错误或 CORS 拒绝时 reject
* HTTP 状态错误不会 reject，需手动检查 `response.ok` 或 `response.status`
* 推荐使用 `AbortController` 来中止请求
* 老代码仍可使用 `CancelToken`，但建议迁移

---

## 示例用法

### 基本 GET 请求

```ts
const response = await fetch('https://example.com/data.json')
const json = await response.json()
```

### POST JSON 请求

```ts
const response = await fetch('https://example.com/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})
```

### 上传文件表单

```ts
const form = new FormData()
form.append('file', fileData, 'image/png', 'photo.png')

const response = await fetch('https://example.com/upload', {
  method: 'POST',
  body: form
})
```

### 自定义重定向逻辑

```ts
const response = await fetch('https://example.com', {
  shouldAllowRedirect: async (newReq) => {
    console.log('跳转到', newReq.url)
    return newReq.url.startsWith('https://trusted.example.com')
  }
})
```

### 非安全请求（HTTP）

```ts
const response = await fetch('http://insecure.local', {
  allowInsecureRequest: true
})
```

### 超时取消请求

```ts
const controller = new AbortController()
setTimeout(() => controller.abort('请求超时'), 5000)

try {
  const res = await fetch('https://slowapi.com', { signal: controller.signal })
} catch (err) {
  console.error('请求被取消', err)
}
```
