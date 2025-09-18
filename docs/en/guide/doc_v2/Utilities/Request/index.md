---
title: Request
---
The Scripting app provides a simulated web-based `fetch` interface that aligns with the Web Fetch API specification. This API enables performing network requests and handling responses in a modern, promise-based manner. It supports key features such as headers management, request cancellation, and form submission with `multipart/form-data`.

---

## Overview

```ts
fetch(input: string | Request, init?: RequestInit): Promise<Response>
```

The `fetch()` method initiates an HTTP request to a network resource and returns a `Promise` that resolves to a `Response` object.

Unlike traditional `XMLHttpRequest`, `fetch()` uses promises and does not reject on HTTP protocol errors such as 404 or 500. Instead, these are reflected in the `Response.ok` and `Response.status` properties.

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

* `url: string` – The request URL.
* `method: string` – HTTP method (GET, POST, PUT, DELETE, etc.).
* `headers: Headers` – HTTP headers.
* `body?: Data | FormData | string | ArrayBuffer` – The request body.
* `connectTimeout?: number` – Timeout for establishing connection (in milliseconds).
* `receiveTimeout?: number` – Timeout for receiving the response (in milliseconds).
* `signal?: AbortSignal` – Signal to abort the request.
* `cancelToken?: CancelToken` *(deprecated)* – Used for request cancellation.
* `debugLabel?: string` – Custom label shown in the debug log.

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

* `body: ReadableStream<Data>` – The response body as a stream.
* `bodyUsed: boolean` – Indicates whether the body has been read.
* `status: number` – HTTP status code.
* `statusText: string` – HTTP status text.
* `headers: Headers` – Response headers.
* `ok: boolean` – `true` if status is in the range 200–299.
* `url: string` – The final URL after redirects.
* `mimeType?: string`
* `expectedContentLength?: number`
* `textEncodingName?: string`

#### Methods

* `json(): Promise<any>` – Parses body as JSON.
* `text(): Promise<string>` – Parses body as text.
* `data(): Promise<Data>` – Returns the response body as `Data`.
* `bytes(): Promise<Uint8Array>` – Returns the body as a `Uint8Array`.
* `arrayBuffer(): Promise<ArrayBuffer>` – Returns the body as an `ArrayBuffer`.
* `formData(): Promise<FormData>` – Parses body as `FormData`.

---

## Headers

### `Headers` Class

Manages HTTP headers.

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

Represents `multipart/form-data` payloads for form submissions.

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

#### Helper

```ts
formDataToJson(formData: FormData): Record<string, any>
```

Converts a `FormData` object into a plain JSON object.

---

## Request Cancellation

### `AbortController` and `AbortSignal`

Support aborting requests using signals.

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

Use `signal` in a fetch request:

```ts
const controller = new AbortController()
fetch('https://example.com', { signal: controller.signal })
// Cancel the request
controller.abort('User aborted')
```

### `AbortError`

Thrown when an operation is aborted using `AbortSignal`.

---

## CancelToken (Deprecated)

### `CancelToken`

Legacy API for canceling requests.

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

React-style hook to manage `CancelToken` lifecycle in function components.

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
    title="Request" 
    action={request}
  />
}
```

---

## Error Handling

* `fetch()` will reject on network or CORS errors, not HTTP status errors.
* Use `response.ok` or `response.status` to inspect HTTP-level errors.
* Use `AbortController` for modern cancellation handling.

---

## Example Usage

### Basic GET Request

```ts
const response = await fetch('https://example.com/data.json')
const json = await response.json()
```

### POST Request with JSON

```ts
const response = await fetch('https://example.com/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})
```

### Upload FormData with File

```ts
const form = new FormData()
form.append('file', fileData, 'image/png', 'photo.png')

const response = await fetch('https://example.com/upload', {
  method: 'POST',
  body: form
})
```
