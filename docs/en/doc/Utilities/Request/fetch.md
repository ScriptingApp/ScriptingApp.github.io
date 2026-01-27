---
title: fetch

---

The `fetch()` method initiates an HTTP/HTTPS network request and returns a `Promise` that resolves to a `Response` object.
It behaves similarly to the standard **Fetch API** available in browsers but includes **native extensions** optimized for Scripting’s iOS runtime environment — such as local file access, `Data` integration, custom redirect handling, abort control, and debugging labels.

---

## Definition

```ts
function fetch(url: string, init?: RequestInit): Promise<Response>
function fetch(request: Request): Promise<Response>
```

---

## Parameters

### 1. `url: string`

The URL to request.
It can be:

* A **network resource**, e.g. `"https://api.example.com/data"`
* A **local file URL**, e.g. `"file:///var/mobile/Containers/Data/Application/..."`

---

### 2. `init?: RequestInit`

An optional configuration object used to customize the request’s method, headers, body, timeout, abort signal, and other options.

```ts
type RequestInit = {
  method?: string;
  headers?: HeadersInit;
  body?: Data | FormData | string | ArrayBuffer;
  allowInsecureRequest?: boolean;
  handleRedirect?: (newRequest: RedirectRequest) => Promise<RedirectRequest | null>;
  shouldAllowRedirect?: (newRequest: Request) => Promise<boolean>; // deprecated
  timeout?: number; // seconds
  signal?: AbortSignal;
  cancelToken?: CancelToken; // deprecated
  debugLabel?: string;
}
```

#### Parameter Details

| Property                 | Type                                                      | Description                                                                                              |                                                                |
| ------------------------ | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **method**               | `string`                                                  | The HTTP method, such as `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`. Defaults to `"GET"`.                    |                                                                |
| **headers**              | `HeadersInit`                                             | The request headers. Can be a `Headers` object, a key-value object, or an array of `[key, value]` pairs. |                                                                |
| **body**                 | `Data` \| `FormData` \| `string` \| `ArrayBuffer`            | The request body. Only used for methods other than `GET` or `HEAD`.                                      |                                                                |
| **allowInsecureRequest** | `boolean`                                                 | Whether to allow HTTP requests when running in an HTTPS context. Defaults to `false`.                    |                                                                |
| **handleRedirect**       | `(newRequest: RedirectRequest) => Promise<RedirectRequest \| null>`                                                                                                   | Custom redirect handler. Return `null` to cancel the redirect. |
| **shouldAllowRedirect**  | `(newRequest: Request) => Promise<boolean>`               | Deprecated. Use `handleRedirect` instead.                                                                |                                                                |
| **timeout**              | `number`                                                  | Timeout duration in seconds. Throws an `AbortError` when exceeded.                                       |                                                                |
| **signal**               | `AbortSignal`                                             | A signal object from `AbortController` that can abort the request.                                       |                                                                |
| **cancelToken**          | `CancelToken`                                             | Deprecated. Use `signal` instead.                                                                        |                                                                |
| **debugLabel**           | `string`                                                  | A label shown in the log panel for debugging and tracing requests.                                       |                                                                |

---

## Return Value

Returns a `Promise<Response>`.

The `Response` object represents the result of the request.
Even when the HTTP status code indicates failure (e.g., 404 or 500), `fetch` **resolves** successfully with a `Response`.
The Promise is **rejected** only when:

* The request cannot be completed (e.g., network error)
* The URL is malformed
* The request is aborted or times out

---

## Error Handling

| Error Type         | Trigger Condition                                                |
| ------------------ | ---------------------------------------------------------------- |
| **`TypeError`**    | Invalid URL, unsupported protocol, or incompatible request body. |
| **`AbortError`**   | The request was aborted via `AbortController` or timed out.      |

---

## Examples

### Example 1 — Basic GET Request

```tsx
const response = await fetch("https://api.example.com/data")
if (response.ok) {
  const json = await response.json()
  console.log(json)
} else {
  console.log("Request failed:", response.status)
}
```

---

### Example 2 — POST Request with JSON Body

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

### Example 3 — Uploading Files via `FormData`

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

### Example 4 — Timeout Handling

```tsx
try {
  const response = await fetch("https://example.com/slow", { timeout: 10 })
  const text = await response.text()
  console.log(text)
} catch (err) {
  if (err.name === "AbortError") {
    console.log("Request aborted due to timeout")
  }
}
```

---

### Example 5 — Aborting Requests with `AbortController`

```tsx
const controller = new AbortController()

setTimeout(() => {
  controller.abort("User cancelled the request")
}, 3000)

try {
  const response = await fetch("https://example.com/large", { signal: controller.signal })
  const data = await response.text()
  console.log(data)
} catch (err) {
  if (err.name === "AbortError") {
    console.log("Request was manually aborted")
  }
}
```

---

### Example 6 — Custom Redirect Handling

```tsx
const response = await fetch("https://example.com/redirect", {
  handleRedirect: async (newRequest) => {
    console.log("Redirect detected:", newRequest.url)
    if (newRequest.url.includes("forbidden")) {
      return null // Cancel redirect
    }
    return newRequest // Allow redirect
  },
})
```

---

### Example 7 — Debug Label for Logging

```tsx
await fetch("https://api.example.com/status", {
  debugLabel: "Health Check",
})
// The request will be labeled "Health Check" in the log panel
```

---

## Relationship with Other Classes

| Class                                 | Description                                                                                                |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`Request`**                         | Represents a network request. You can pass a `Request` object to `fetch(request)` to reuse configuration.  |
| **`Response`**                        | Represents the result of a network operation, with helper methods such as `.json()`, `.text()`, `.data()`. |
| **`AbortController` / `AbortSignal`** | Provides a way to abort requests programmatically.                                                         |
| **`FormData`**                        | Builds multipart/form-data bodies for file uploads and form submissions.                                   |
| **`Headers`**                         | Manages HTTP request and response headers.                                                                 |
| **`Data`**                            | Represents binary data and supports conversion to multiple formats (e.g., Base64, hex).                    |

---

## Additional Details

* **Cookie Management**:
  `fetch` does **not automatically store or send cookies**.
  Cookies from responses can be accessed via `response.cookies`.

* **Redirects**:
  Redirects are automatically followed unless overridden by `handleRedirect`.

* **Concurrency**:
  Each request runs independently and safely in parallel.

* **File Support**:
  You can upload local files using `Data.fromFile()` as the request body.

---

## Summary

The `fetch()` API in Scripting extends the standard web Fetch interface with native capabilities:

* Full iOS-native networking integration
* Support for `Data` binary objects
* File upload and download handling
* Timeout and abort control
* Custom redirect interception
* Local logging with `debugLabel`
