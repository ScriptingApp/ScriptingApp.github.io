# Response

The `Response` class represents the result of an HTTP request made using the `fetch()` API.
It provides access to the response body, headers, cookies, and metadata such as the status code and MIME type.

In the **Scripting app**, the `Response` API extends the standard Fetch API behavior to provide **native-level enhancements**, including:

- Access to structured cookie data
- Binary data handling via the `Data` type
- Support for response streaming (`ReadableStream<Data>`)
- Access to expected content length, MIME type, and text encoding

***

## Definition

```ts
class Response {
  readonly body: ReadableStream<Data>

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

## Properties

| Property                  | Type                   | Description                                                             |                                                                             |
| ------------------------- | ---------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **body**                  | `ReadableStream<Data>` | The response body as a readable stream of `Data` chunks.                |                                                                             |
| **bodyUsed**              | `boolean`              | Indicates whether the response body has been read.                      |                                                                             |
| **cookies**               | `Cookie[]`             | A list of cookies sent by the server via the `Set-Cookie` header.       |                                                                             |
| **status**                | `number`               | The HTTP status code of the response (e.g. `200`, `404`, `500`).        |                                                                             |
| **statusText**            | `string`               | The status message returned by the server (e.g. `"OK"`, `"Not Found"`). |                                                                             |
| **headers**               | `Headers`              | A `Headers` object representing response headers.                       |                                                                             |
| **ok**                    | `boolean`              | `true` if the status code is between 200 and 299, otherwise `false`.    |                                                                             |
| **url**                   | `string`               | The final URL of the response after any redirects.                      |                                                                             |
| **mimeType**              | `string`               | `undefined`                                                             | The MIME type inferred from headers (e.g. `"application/json"`).            |
| **expectedContentLength** | `number`               | `undefined`                                                             | The expected size of the response body in bytes, if provided by the server. |
| **textEncodingName**      | `string`               | `undefined`                                                             | The encoding used for text responses (e.g. `"utf-8"`).                      |

***

## Methods

### `json(): Promise<any>`

Parses the response body as JSON.

#### Example

```tsx
const response = await fetch("https://api.example.com/user")
const data = await response.json()
console.log(data.name)
```

***

### `text(): Promise<string>`

Reads the response body as a UTF-8 string (or using `textEncodingName` if available).

#### Example

```tsx
const response = await fetch("https://example.com/message.txt")
const text = await response.text()
console.log(text)
```

***

### `data(): Promise<Data>`

Reads the response body as a binary `Data` object, which can be used for file saving, image decoding, or Base64 conversion.

#### Example

```tsx
const response = await fetch("https://example.com/image.png")
const imageData = await response.data()
FileManager.write(imageData, "/local/image.png")
```

***

### `bytes(): Promise<Uint8Array>`

Reads the response as a byte array (`Uint8Array`).

#### Example

```tsx
const response = await fetch("https://example.com/file.bin")
const bytes = await response.bytes()
console.log("Received", bytes.length, "bytes")
```

***

### `arrayBuffer(): Promise<ArrayBuffer>`

Reads the response as an `ArrayBuffer`, useful for low-level binary operations.

#### Example

```tsx
const response = await fetch("https://example.com/file")
const buffer = await response.arrayBuffer()
console.log(buffer.byteLength)
```

***

### `formData(): Promise<FormData>`

Parses the response body as form data (for responses with `multipart/form-data` content).

#### Example

```tsx
const response = await fetch("https://example.com/form")
const form = await response.formData()
console.log(form.get("username"))
```

***

### `cookies: Cookie[]`

The `cookies` property provides direct access to the cookies set by the server via `Set-Cookie` headers.
Each cookie is represented by a `Cookie` object with structured metadata.

#### Cookie Type Definition

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

| Field             | Type           | Description                                                   |
| ----------------- | -------------- | ------------------------------------------------------------- |
| **name**          | `string`       | Cookie name.                                                  |
| **value**         | `string`       | Cookie value.                                                 |
| **domain**        | `string`       | Domain to which the cookie belongs.                           |
| **path**          | `string`       | Path scope of the cookie.                                     |
| **isSecure**      | `boolean`      | `true` if the cookie is sent only over HTTPS.                 |
| **isHTTPOnly**    | `boolean`      | `true` if inaccessible to JavaScript.                         |
| **isSessionOnly** | `boolean`      | `true` if the cookie is temporary and expires at session end. |
| **expiresDate**   | `Date \| null` | Expiration date of the cookie, if specified.                  |

#### Example — Reading Cookies

```tsx
const response = await fetch("https://example.com/login")
for (const cookie of response.cookies) {
  console.log(`${cookie.name} = ${cookie.value}`)
}
```

#### Example — Manual Cookie Management

By default, **Scripting’s `fetch()` does not automatically store or send cookies**.
To reuse cookies across multiple requests, you can manually include them:

```tsx
const response = await fetch("https://example.com/login")
const cookies = response.cookies
const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join("; ")

const next = await fetch("https://example.com/dashboard", {
  headers: { "Cookie": cookieHeader },
})
```

This gives you **explicit cookie control** similar to browser developer tools.

***

## Relationship with Other Classes

| Class          | Description                                              |
| -------------- | -------------------------------------------------------- |
| **`Request`**  | Represents the HTTP request that produced this response. |
| **`Headers`**  | Manages response headers.                                |
| **`Data`**     | Represents binary data returned from the response body.  |
| **`FormData`** | Used when the response contains `multipart/form-data`.   |
| **`Cookie`**   | Represents a parsed HTTP cookie object.                  |

***

## Examples

### Example 1 — Handling JSON API Responses

```tsx
const response = await fetch("https://api.example.com/profile")
if (response.ok) {
  const user = await response.json()
  console.log(user.email)
} else {
  console.log("Error:", response.status, response.statusText)
}
```

***

### Example 2 — Downloading Binary Data

```tsx
const response = await fetch("https://example.com/photo.jpg")
const fileData = await response.data()
FileManager.write(fileData, "/local/photo.jpg")
```

***

### Example 3 — Reading Cookies from a Response

```tsx
const response = await fetch("https://example.com/login")
for (const cookie of response.cookies) {
  console.log(`Cookie: ${cookie.name} = ${cookie.value}`)
}
```

***

### Example 4 — Manual Cookie Persistence Between Requests

```tsx
const loginResponse = await fetch("https://example.com/login", {
  method: "POST",
  body: JSON.stringify({ username: "Tom", password: "1234" }),
  headers: { "Content-Type": "application/json" },
})

// Build a cookie header manually
const cookieHeader = loginResponse.cookies.map(c => `${c.name}=${c.value}`).join("; ")

// Use cookies in a new request
const dashboard = await fetch("https://example.com/dashboard", {
  headers: { "Cookie": cookieHeader },
})
console.log(await dashboard.text())
```

***

### Example 5 — Inspecting Metadata

```tsx
const response = await fetch("https://example.com/video.mp4")
console.log("MIME Type:", response.mimeType)
console.log("Expected Length:", response.expectedContentLength)
```

***

## Summary

The `Response` class in **Scripting** offers a rich and extensible interface for handling HTTP responses:

- Compatible with the standard Fetch API
- Adds native **cookie parsing** and management
- Supports **binary data streams** via the `Data` type
- Provides full access to headers, MIME type, and encoding
- Allows seamless use with `FormData` and `ReadableStream`
