The Scripting app provides a simulated web-based `fetch` interface that aligns with the Web Fetch API specification. This API enables performing network requests and handling responses in a modern, promise-based manner. It supports key features such as headers management, request cancellation, redirects, timeout controls, and form submission with `multipart/form-data`.

---

## Overview

```ts
fetch(input: string | Request, init?: RequestInit): Promise<Response>
```

The `fetch()` method initiates an HTTP request to a network resource and returns a `Promise` that resolves to a `Response` object.

Unlike traditional `XMLHttpRequest`, `fetch()` uses promises and does **not** reject on HTTP protocol errors such as 404 or 500. Instead, these are reflected in the `Response.ok` and `Response.status` properties.

---

## Request

### `Request` Class

Represents an HTTP request.

```ts
class Request {
  constructor(input: string | Request, init?: RequestInit)
  clone(): Request
}
```

#### Properties

| Property                | Type                                        | Description                                                                             |
| ----------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------- |
| `url`                   | `string`                                    | The request URL.                                                                        |
| `method`                | `string`                                    | HTTP method (GET, POST, PUT, DELETE, etc.).                                             |
| `headers`               | `Headers`                                   | HTTP headers.                                                                           |
| `body?`                 | `Data \| FormData \| string \| ArrayBuffer` | The request body.                                                                       |
| `allowInsecureRequest?` | `boolean`                                   | Whether to allow HTTP requests even when app is served over HTTPS. Defaults to `false`. |
| `shouldAllowRedirect?`  | `(newRequest: Request) => Promise<boolean>` | Optional callback to dynamically approve or block redirects. Defaults to always allow.  |
| `timeout?`              | `number`                                    | Request timeout in **seconds**.                                                         |
| `connectTimeout?`       | `number`                                    | Timeout for establishing connection (in **milliseconds**).                              |
| `receiveTimeout?`       | `number`                                    | Timeout for receiving response (in **milliseconds**).                                   |
| `signal?`               | `AbortSignal`                               | Signal used to cancel the request.                                                      |
| `cancelToken?`          | `CancelToken` *(deprecated)*                | Legacy cancellation mechanism.                                                          |
| `debugLabel?`           | `string`                                    | Custom label shown in debug logs.                                                       |

---

## RequestInit

Used as the second parameter of `fetch()` or the constructor of `Request`.

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

  /** @deprecated Use `signal` instead. */
  cancelToken?: CancelToken;

  debugLabel?: string;
}
```

---

## Response

### `Response` Class

Represents the response to a `fetch()` request.

```ts
class Response {
  constructor(body: ReadableStream<Data>, init?: ResponseInit)
}
```

#### Properties

| Property                 | Type                   | Description                                     |
| ------------------------ | ---------------------- | ----------------------------------------------- |
| `body`                   | `ReadableStream<Data>` | The response body as a stream.                  |
| `bodyUsed`               | `boolean`              | Whether the body has been consumed.             |
| `cookies`                | `Cookie[]`             | Response cookies.                              |
| `status`                 | `number`               | HTTP status code.                               |
| `statusText`             | `string`               | HTTP status text.                               |
| `headers`                | `Headers`              | Response headers.                               |
| `ok`                     | `boolean`              | `true` if status is in the range 200–299.       |
| `url`                    | `string`               | The final resolved URL after any redirects.     |
| `mimeType?`              | `string`               | Inferred MIME type, if available.               |
| `expectedContentLength?` | `number`               | Expected content length in bytes, if available. |
| `textEncodingName?`      | `string`               | Encoding of the response body, if specified.    |

##### `Cookie` Type

```ts
interface Cookie {
  name: string
  value: string
  attributes: Record<string, string | boolean>
}
```

- `name`: cookie name
- `value`: cookie value
- `attributes`: cookie attributes, including `path`, `domain`, `expires`, etc.

#### Methods

* `json(): Promise<any>`
* `text(): Promise<string>`
* `data(): Promise<Data>`
* `bytes(): Promise<Uint8Array>`
* `arrayBuffer(): Promise<ArrayBuffer>`
* `formData(): Promise<FormData>`

---

## Headers

### `Headers` Class

```ts
class Headers {
  constructor(init?: HeadersInit)
}
```

#### Methods

* `append(name: string, value: string): void`
* `get(name: string): string | null`
* `has(name: string): boolean`
* `set(name: string, value: string): void`
* `delete(name: string): void`
* `forEach(callback: (value: string, name: string) => void): void`
* `keys(): string[]`
* `values(): string[]`
* `entries(): [string, string][]`
* `toJson(): Record<string, string>`

---

## Form Data

### `FormData` Class

Represents a `multipart/form-data` payload.

```ts
class FormData { }
```

#### Methods

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

## Request Cancellation

### `AbortController` and `AbortSignal`

```ts
class AbortController {
  readonly signal: AbortSignal
  abort(reason?: any): void
}
```

```ts
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

#### Usage

```ts
const controller = new AbortController()
fetch('https://example.com', { signal: controller.signal })
// Cancel the request
controller.abort('User aborted')
```

---

## CancelToken (Deprecated)

### `CancelToken`

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

React-style hook for functional components.

```tsx
function App() {
  const cancelToken = useCancelToken()

  async function request() {
    cancelToken.get()?.cancel()
    const result = await fetch('https://example.com', {
      cancelToken: cancelToken.create(),
    })
  }

  return <Button title="Request" action={request} />
}
```

---

## Error Handling

* `fetch()` only rejects on **network** or **CORS** errors.
* Use `response.ok` or `response.status` to handle HTTP errors.
* Use `AbortController` for modern cancellation.
* Legacy: use `CancelToken` where `AbortSignal` is unavailable.

---

## Example Usage

### Basic GET Request

```ts
import {fetch} from 'scripting'

const response = await fetch('https://example.com/data.json')
const json = await response.json()
```

### POST Request with JSON

```ts
import {fetch} from 'scripting'

const response = await fetch('https://example.com/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})
```

### Upload File with FormData

```ts
const form = new FormData()
form.append('file', fileData, 'image/png', 'photo.png')

const response = await fetch('https://example.com/upload', {
  method: 'POST',
  body: form
})
```

### Custom Redirect Handling

```ts
const response = await fetch('https://example.com', {
  shouldAllowRedirect: async (newReq) => {
    console.log('Redirecting to', newReq.url)
    return newReq.url.startsWith('https://trusted.example.com')
  }
})
```

### Insecure Request

```ts
const response = await fetch('http://insecure.local', {
  allowInsecureRequest: true
})
```

### Abort After Timeout

```ts
const controller = new AbortController()
setTimeout(() => controller.abort('Timeout!'), 5000)

try {
  const res = await fetch('https://slowapi.com', { signal: controller.signal })
} catch (err) {
  console.error('Request was aborted', err)
}
```
