# Request & RequestInit

The `Request` class represents a complete configuration of an HTTP request.
It can be passed directly to the `fetch()` method or used to clone, modify, or retry an existing request.

In Scripting, the `Request` API behaves similarly to the browser’s Fetch API but adds native extensions, including:

- Binary `Data` type support for request bodies
- Custom redirect handling
- Request timeout and cancellation
- Optional allowance for insecure (HTTP) requests
- Debug labels for internal logging

***

## Definition

```ts
class Request {
  url: string
  method: string
  headers: Headers
  body?: Data | FormData | string | ArrayBuffer
  allowInsecureRequest?: boolean
  handleRedirect?: (newRequest: RedirectRequest) => Promise<RedirectRequest | null>
  shouldAllowRedirect?: (newRequest: Request) => Promise<boolean> // deprecated
  timeout?: DurationInSeconds
  signal?: AbortSignal
  cancelToken?: CancelToken // deprecated
  debugLabel?: string

  constructor(input: string | Request, init?: RequestInit)
  clone(): Request
}
```

***

## Constructor

### `new Request(input: string | Request, init?: RequestInit)`

Creates a new `Request` instance from either a URL string or an existing `Request` object.

#### Parameters

| Parameter | Type          | Description                                                          |                                                  |
| --------- | ------------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| **input** | `string`      | `Request`                                                            | The target URL, or an existing request to clone. |
| **init**  | `RequestInit` | Optional configuration object defining request settings (see below). |                                                  |

***

## Properties

| Property                 | Type                                                                | Description                                                                   |
| ------------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **url**                  | `string`                                                            | The full URL of the request.                                                  |
| **method**               | `string`                                                            | The HTTP method (default is `"GET"`).                                         |
| **headers**              | `Headers`                                                           | A headers object representing the request headers.                            |
| **body**                 | `Data` \| `FormData` \| `string` \| `ArrayBuffer` \| `undefined`    | The request body, used only for non-`GET` and non-`HEAD` requests.            |
| **allowInsecureRequest** | `boolean`                                                           | Whether to allow plain HTTP requests (default `false`).                       |
| **handleRedirect**       | `(newRequest: RedirectRequest) => Promise<RedirectRequest \| null>` | Custom redirect handler. Return `null` to cancel the redirect.                |
| **shouldAllowRedirect**  | `(newRequest: Request) => Promise<boolean>`                         | Deprecated legacy redirect handler.                                           |
| **timeout**              | `number`                                                            | Timeout in seconds. The request will automatically abort after this duration. |
| **signal**               | `AbortSignal`                                                       | Abort signal from an `AbortController`, allowing manual cancellation.         |
| **cancelToken**          | `CancelToken`                                                       | Deprecated. Older cancellation mechanism; prefer `signal`.                    |
| **debugLabel**           | `string`                                                            | Optional label displayed in logs for debugging and tracking requests.         |

***

## Methods

### `clone(): Request`

Creates and returns a copy of the current request.
The cloned object can be safely modified (e.g., updating headers or timeout) without affecting the original request.

#### Example

```tsx
const req1 = new Request("https://api.example.com/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice" }),
})

const req2 = req1.clone()
console.log(req2.method) // "POST"
```

***

## Examples

### Example 1 — Creating a Simple Request

```tsx
const request = new Request("https://api.example.com/data", {
  method: "GET",
  headers: {
    "Accept": "application/json",
  },
  debugLabel: "Fetch User Data",
})

const response = await fetch(request)
const result = await response.json()
console.log(result)
```

***

### Example 2 — POST Request with a Body

```tsx
const request = new Request("https://api.example.com/upload", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fileId: "abc123" }),
  timeout: 15,
})

const response = await fetch(request)
console.log(await response.text())
```

***

### Example 3 — Cloning and Modifying a Request

```tsx
const base = new Request("https://api.example.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
})

const cloned = base.clone()
cloned.headers.set("Authorization", "Bearer token-123")
cloned.debugLabel = "Authorized Upload"

await fetch(cloned)
```

***

# RequestInit Interface

The `RequestInit` interface defines configuration options for HTTP requests.
It is used as the second argument to `fetch()` or the optional configuration object when creating a new `Request`.
Scripting extends this interface with additional native fields.

***

## Definition

```ts
type RequestInit = {
  method?: string
  headers?: HeadersInit
  body?: Data | FormData | string | ArrayBuffer
  allowInsecureRequest?: boolean
  handleRedirect?: (newRequest: RedirectRequest) => Promise<RedirectRequest | null>
  shouldAllowRedirect?: (newRequest: Request) => Promise<boolean> // deprecated
  timeout?: DurationInSeconds
  signal?: AbortSignal
  cancelToken?: CancelToken // deprecated
  debugLabel?: string
}
```

***

## Field Descriptions

| Field                    | Type                                                                | Description                                                                                                            |   |
| ------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | - |
| **method**               | `string`                                                            | The HTTP method such as `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`. Default: `"GET"`.                                      |   |
| **headers**              | `HeadersInit`                                                       | Request headers, which can be a `Headers` object, key-value object `{ key: value }`, or array of `[key, value]` pairs. |   |
| **body**                 | `Data` \| `FormData` \| `string` \| `ArrayBuffer`                   | The request body. Ignored for `GET` and `HEAD` requests.                                                               |   |
| **allowInsecureRequest** | `boolean`                                                           | Allows HTTP requests (insecure). Default: `false`.                                                                     |   |
| **handleRedirect**       | `(newRequest: RedirectRequest) => Promise<RedirectRequest \| null>` | Custom redirect handler. Return `null` to block redirection.                                                           |   |
| **shouldAllowRedirect**  | `(newRequest: Request) => Promise<boolean>`                         | Deprecated. Older redirect callback.                                                                                   |   |
| **timeout**              | `number`                                                            | Request timeout in seconds. Triggers `AbortError` if exceeded.                                                         |   |
| **signal**               | `AbortSignal`                                                       | Used to abort requests manually through an `AbortController`.                                                          |   |
| **cancelToken**          | `CancelToken`                                                       | Deprecated cancellation mechanism. Use `signal` instead.                                                               |   |
| **debugLabel**           | `string`                                                            | A label displayed in the debug log for identifying requests.                                                           |   |

***

## Relationship with `fetch()`

`RequestInit` is typically passed as the second parameter to `fetch()` to configure a network request.

```tsx
const response = await fetch("https://example.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: 123 }),
  timeout: 10,
  debugLabel: "Upload JSON",
})
```

***

## Relationships with Other Classes

| Class                                 | Description                                                                            |
| ------------------------------------- | -------------------------------------------------------------------------------------- |
| **`Headers`**                         | Manages request headers, used with the `headers` field.                                |
| **`Data`**                            | Represents binary data. Can be used as the request body for file uploads or raw bytes. |
| **`FormData`**                        | Builds `multipart/form-data` bodies for form or file submissions.                      |
| **`AbortController` / `AbortSignal`** | Enables manual request cancellation.                                                   |
| **`CancelToken`**                     | Deprecated cancellation mechanism retained for backward compatibility.                 |
| **`RedirectRequest`**                 | Represents the redirected request passed to `handleRedirect`.                          |

***

## Examples

### Example 1 — Custom Redirect Handling

```tsx
const response = await fetch("https://example.com/start", {
  handleRedirect: async (newRequest) => {
    console.log("Redirect detected:", newRequest.url)
    if (newRequest.url.includes("blocked")) return null
    return newRequest
  },
})
```

***

### Example 2 — Allowing Insecure Requests

```tsx
const response = await fetch("http://insecure.example.com/data", {
  allowInsecureRequest: true,
})
console.log(await response.text())
```

***

### Example 3 — Using a Debug Label

```tsx
await fetch("https://example.com/api/ping", {
  debugLabel: "Ping Request",
})
// The log panel will display the label "Ping Request"
```

***

## RedirectRequest Interface

When a request encounters an **HTTP redirect**, and a `handleRedirect` callback is defined in the `Request` or `RequestInit` object, the system will invoke that callback before following the redirect.
The callback receives a `RedirectRequest` object, which describes the full details of the redirect request.
You can inspect or modify this object to control whether and how the redirect should proceed.

***

### Interface Definition

```ts
interface RedirectRequest {
  method: string
  url: string
  headers: Record<string, string>
  cookies: Cookie[]
  body?: Data
  timeout?: number
}
```

***

### Field Descriptions

| Field       | Type                     | Description                                                                                    |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| **method**  | `string`                 | The HTTP method for the redirected request (e.g., `"GET"`, `"POST"`).                          |
| **url**     | `string`                 | The full target URL of the redirect.                                                           |
| **headers** | `Record<string, string>` | The HTTP headers to be sent with the redirect request. You can modify these before proceeding. |
| **cookies** | `Cookie[]`               | The list of cookies available for the redirected request (same format as `Response.cookies`).  |
| **body**    | `Data` _(optional)_      | The body of the redirect request, if applicable (e.g., for non-GET methods).                   |
| **timeout** | `number` _(optional)_    | The request timeout in seconds.                                                                |

***

### Use Cases

The `handleRedirect` callback allows you to:

- Inspect and validate redirect destinations for security or logic reasons.
- Modify redirect requests (add headers, update method, or include authorization tokens).
- Block unwanted or unsafe redirects.

When the callback returns:

- A modified `RedirectRequest` → The redirect proceeds using your modified configuration.
- `null` → The redirect is **canceled**, and the `fetch()` call resolves with the current response.

***

### Example: Intercepting and Controlling Redirects

```tsx
const response = await fetch("https://example.com/start", {
  handleRedirect: async (redirect) => {
    console.log("Redirecting to:", redirect.url)

    // Block redirects to external domains
    if (!redirect.url.startsWith("https://example.com")) {
      console.warn("Blocked external redirect:", redirect.url)
      return null
    }

    // Add authorization header to redirected request
    redirect.headers["Authorization"] = "Bearer my-token"
    return redirect
  },
})
```

***

### Example: Modifying Redirect Method and Body

```tsx
const response = await fetch("https://api.example.com/login", {
  handleRedirect: async (redirect) => {
    // Keep the request body when redirecting to a confirmation endpoint
    if (redirect.url.includes("/finalize")) {
      redirect.method = "POST"
      redirect.body = Data.fromRawString("action=confirm", "utf-8")
    }
    return redirect
  },
})
```

***

### Notes

- If `handleRedirect` is **not defined**, all redirects are automatically followed by default.
- Returning `null` from the callback prevents further redirection.
- Cookies are **not automatically forwarded**; you can manually inspect and decide whether to reuse cookies from `redirect.cookies`.
- Any modifications made to the `RedirectRequest` (such as headers or method) will be applied before the next request is executed.

***

## Summary

`Request` and `RequestInit` form the **foundation of Scripting’s networking system**:

- `Request` encapsulates a complete HTTP request and can be reused or cloned.
- `RequestInit` defines configuration options for flexible initialization.
- Together, they integrate tightly with `fetch()`, `Response`, `Headers`, `Data`, and `FormData`.
