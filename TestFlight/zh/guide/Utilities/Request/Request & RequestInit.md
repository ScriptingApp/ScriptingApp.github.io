# Request 和 RequestInit

`Request` 类表示一次 HTTP 请求的完整配置。
它可作为 `fetch()` 方法的参数使用，也可用于克隆、修改或重试请求。

在 Scripting 中，`Request` 的行为与浏览器 Fetch API 中的同名接口一致，但额外支持了原生扩展功能，包括：

- 支持二进制 `Data` 类型作为请求体
- 支持自定义重定向处理
- 支持请求超时、取消、与调试标签
- 支持允许不安全请求（HTTP 请求）

***

## 类定义

```ts
class Request {
  url: string;
  method: string;
  headers: Headers;
  body?: Data | FormData | string | ArrayBuffer;
  allowInsecureRequest?: boolean;
  handleRedirect?: (newRequest: RedirectRequest) => Promise<RedirectRequest | null>;
  shouldAllowRedirect?: (newRequest: Request) => Promise<boolean>; // 已废弃
  timeout?: DurationInSeconds;
  signal?: AbortSignal;
  cancelToken?: CancelToken; // 已废弃
  debugLabel?: string;

  constructor(input: string | Request, init?: RequestInit);
  clone(): Request;
}
```

***

## 构造函数

### `new Request(input: string | Request, init?: RequestInit)`

创建一个新的 `Request` 实例。
可通过字符串 URL 或现有的 `Request` 对象来构造。

#### 参数

\| 参数      | 类型          | 说明                                             |
\| --------- | ------------- | ------------------------------------------------ | ------------------------------------------------- |
\| **input** | `string`      | `Request`                                        | 要请求的 URL，或一个现有的 Request 对象用于克隆。 |
\| **init**  | `RequestInit` | 可选的初始化参数，用于配置请求的行为（见下文）。 |

***

## 属性

| 属性名                      | 类型                                                                  | 说明                                              |
| ------------------------ | ------------------------------------------------------------------- | ----------------------------------------------- |
| **url**                  | `string`                                                            | 请求的完整 URL。                                      |
| **method**               | `string`                                                            | 请求方法（默认 `"GET"`）。                               |
| **headers**              | `Headers`                                                           | 请求头部对象，可通过 `.get()`、`.set()`、`.append()` 等方法操作。 |
| **body**                 | `Data` \| `FormData` \| `string` \| `ArrayBuffer` \| `undefined`    | 请求体，仅用于非 `GET` 或 `HEAD` 请求。                     |
| **allowInsecureRequest** | `boolean`                                                           | 是否允许使用 HTTP 明文请求（默认 `false`）。                   |
| **handleRedirect**       | `(newRequest: RedirectRequest) => Promise<RedirectRequest \| null>` | 自定义重定向逻辑；返回 `null` 表示阻止重定向。                     |
| **shouldAllowRedirect**  | `(newRequest: Request) => Promise<boolean>`                         | 已废弃。旧版重定向控制回调。                                  |
| **timeout**              | `number`                                                            | 请求超时时间（单位：秒）。超时会自动中止请求。                         |
| **signal**               | `AbortSignal`                                                       | 用于中止请求的信号，由 `AbortController` 创建。               |
| **cancelToken**          | `CancelToken`                                                       | 已废弃。旧版取消机制，请改用 `signal`。                        |
| **debugLabel**           | `string`                                                            | 调试标签，会在日志面板中显示以方便追踪。                            |

***

## 方法

### `clone(): Request`

创建并返回当前请求对象的副本。
克隆后的对象可安全修改其属性（如 headers、body）而不影响原始请求。

#### 示例

```tsx
const req1 = new Request("https://api.example.com/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice" }),
});

const req2 = req1.clone();
console.log(req2.method); // "POST"
```

***

## 使用示例

### 示例 1：创建一个简单的 Request 对象

```tsx
const request = new Request("https://api.example.com/data", {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
  debugLabel: "Fetch User Data",
});

const response = await fetch(request);
const result = await response.json();
console.log(result);
```

***

### 示例 2：带请求体的 POST 请求

```tsx
const request = new Request("https://api.example.com/upload", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fileId: "abc123" }),
  timeout: 15,
});

const response = await fetch(request);
console.log(await response.text());
```

***

### 示例 3：克隆并修改请求

```tsx
const base = new Request("https://api.example.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
});

const cloned = base.clone();
cloned.headers.set("Authorization", "Bearer token-123");
cloned.debugLabel = "Authorized Upload";

await fetch(cloned);
```

***

## RequestInit 类型

`RequestInit` 是一个用于配置请求参数的对象类型，常用于 `fetch()` 或 `Request` 构造函数中。
它与浏览器的标准 Fetch API 相同，但 Scripting 扩展了若干字段。

***

## 类型定义

```ts
type RequestInit = {
  method?: string;
  headers?: HeadersInit;
  body?: Data | FormData | string | ArrayBuffer;
  allowInsecureRequest?: boolean;
  handleRedirect?: (newRequest: RedirectRequest) => Promise<RedirectRequest | null>;
  shouldAllowRedirect?: (newRequest: Request) => Promise<boolean>; // 已废弃
  timeout?: DurationInSeconds;
  signal?: AbortSignal;
  cancelToken?: CancelToken; // 已废弃
  debugLabel?: string;
};
```

***

## 字段说明

| 字段名                      | 类型                                                                  | 说明                                                                 |   |
| ------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------ | - |
| **method**               | `string`                                                            | HTTP 方法，如 `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`，默认 `"GET"`。       |   |
| **headers**              | `HeadersInit`                                                       | 请求头部信息，可以是：`Headers` 对象、普通对象 `{key: value}`、或 `[key, value][]` 数组。 |   |
| **body**                 | `Data` \| `FormData` \| `string` \| `ArrayBuffer`                   | 请求体，仅在非 `GET` / `HEAD` 请求中使用。                                      |   |
| **allowInsecureRequest** | `boolean`                                                           | 是否允许发送 HTTP 请求。默认 `false`。                                         |   |
| **handleRedirect**       | `(newRequest: RedirectRequest) => Promise<RedirectRequest \| null>` | 自定义重定向回调。返回新的请求对象以继续，返回 `null` 以阻止跳转。                              |   |
| **shouldAllowRedirect**  | `(newRequest: Request) => Promise<boolean>`                         | 已废弃。旧的布尔型重定向控制回调。                                                  |   |
| **timeout**              | `number`                                                            | 请求超时时间（秒），超时后会自动中止请求。                                              |   |
| **signal**               | `AbortSignal`                                                       | 中止信号，可由 `AbortController` 触发，用于主动取消请求。                             |   |
| **cancelToken**          | `CancelToken`                                                       | 已废弃。旧版取消机制，请使用 `signal` 替代。                                        |   |
| **debugLabel**           | `string`                                                            | 调试标签，在日志面板中显示，用于标识请求。                                              |   |

***

## 与 `fetch()` 的关系

`RequestInit` 是 `fetch()` 的第二个参数，用于定义请求配置：

```tsx
const response = await fetch("https://example.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: 123 }),
  timeout: 10,
  debugLabel: "Upload JSON",
});
```

***

## 与其他类的关系

| 类名                                    | 用途                                           |
| ------------------------------------- | -------------------------------------------- |
| **`Headers`**                         | 管理请求头部的集合，可与 `headers` 字段一起使用。               |
| **`Data`**                            | 表示二进制数据，可作为请求体（body）上传文件或原始字节数据。             |
| **`FormData`**                        | 用于构造 multipart/form-data 表单请求。               |
| **`AbortController` / `AbortSignal`** | 用于在请求过程中主动取消网络操作。                            |
| **`CancelToken`**                     | 旧版取消机制，仅为兼容保留。                               |
| **`RedirectRequest`**                 | 当发生重定向时传入 `handleRedirect` 回调的参数，包含新请求的详细信息。 |

***

## 示例

### 示例 1：使用自定义重定向回调

```tsx
const response = await fetch("https://example.com/start", {
  handleRedirect: async (newRequest) => {
    console.log("收到重定向:", newRequest.url);
    if (newRequest.url.includes("blocked")) return null;
    return newRequest;
  },
});
```

***

### 示例 2：允许不安全请求

```tsx
const response = await fetch("http://insecure.example.com/data", {
  allowInsecureRequest: true,
});
console.log(await response.text());
```

***

### 示例 3：带调试标签的请求

```tsx
await fetch("https://example.com/api/ping", {
  debugLabel: "Ping Request",
});
// 调试面板中将显示标签 “Ping Request”
```

***

以下是 **`handleRedirect` 回调中 `RedirectRequest` 接口的中文说明文档**，可直接插入至 `Request` 类文档的相关部分，用于解释自定义重定向逻辑的参数结构和用法。

***

## RedirectRequest 接口说明

当请求发生 **重定向 (Redirect)** 时，若在 `Request` 或 `RequestInit` 中设置了 `handleRedirect` 回调函数，系统会在跳转前调用该回调。
`handleRedirect` 的参数类型为 `RedirectRequest`，用于描述即将执行的重定向请求的完整信息。
你可以在回调中检查该对象的属性，并决定是否允许继续重定向，或修改请求后再继续。

***

### 接口定义

```ts
interface RedirectRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  cookies: Cookie[];
  body?: Data;
  timeout?: number;
}
```

***

### 字段说明

| 字段          | 类型                       | 说明                                            |
| ----------- | ------------------------ | --------------------------------------------- |
| **method**  | `string`                 | 即将执行的重定向请求方法（例如 `"GET"`、`"POST"`）。            |
| **url**     | `string`                 | 重定向目标的完整 URL。                                 |
| **headers** | `Record<string, string>` | 该重定向请求的 HTTP 头部信息。你可以根据需要修改或记录这些头部。           |
| **cookies** | `Cookie[]`               | 当前请求中携带的 Cookie 列表，类型与 `Response.cookies` 一致。 |
| **body**    | `Data`（可选）               | 若为非 `GET` 请求，则包含请求体数据（例如表单或二进制数据）。            |
| **timeout** | `number`（可选）             | 请求的超时时间（单位：秒）。                                |

***

### 使用场景

通过 `handleRedirect` 回调，你可以：

- 检查重定向目标地址是否安全或符合业务逻辑。
- 修改重定向请求（如添加自定义头部、调整方法或携带 Token）。
- 阻止不必要或可疑的重定向。

当回调返回：

- 一个 `RedirectRequest` 对象 → 表示允许重定向，并使用你返回的对象继续请求。
- `null` → 表示阻止此次重定向，`fetch()` 将在当前响应结束。

***

### 示例：拦截与控制重定向请求

```tsx
const response = await fetch("https://example.com/start", {
  handleRedirect: async (redirect) => {
    console.log("即将重定向至:", redirect.url);

    // 如果跳转到外部域名，则阻止
    if (!redirect.url.startsWith("https://example.com")) {
      console.warn("阻止外部重定向:", redirect.url);
      return null;
    }

    // 向重定向请求添加授权头
    redirect.headers["Authorization"] = "Bearer my-token";
    return redirect;
  },
});
```

***

### 示例：修改重定向请求方法与体

```tsx
const response = await fetch("https://api.example.com/login", {
  handleRedirect: async (redirect) => {
    // 如果重定向目标为 POST 接口，则保持原始请求体
    if (redirect.url.includes("/finalize")) {
      redirect.method = "POST";
      redirect.body = Data.fromRawString("action=confirm", "utf-8");
    }
    return redirect;
  },
});
```

***

### 注意事项

- 若未设置 `handleRedirect`，所有重定向将默认自动执行。
- 若设置了 `handleRedirect` 且返回 `null`，`fetch()` 不会继续跳转。
- 该机制不会自动携带 Cookie，需要手动在 `RedirectRequest.cookies` 中读取并决定是否传递。
- 修改 `RedirectRequest` 返回后，系统会基于修改后的内容重新发起请求。

***

## 小结

`Request` 与 `RequestInit` 是 **Scripting 网络请求系统的核心基础**：

- `Request` 封装了完整的 HTTP 请求对象，可复用、克隆与传递。
- `RequestInit` 定义请求参数，提供灵活的初始化方式。
- 二者与 `fetch()`、`Response`、`Headers`、`Data`、`FormData` 等类型紧密配合。
