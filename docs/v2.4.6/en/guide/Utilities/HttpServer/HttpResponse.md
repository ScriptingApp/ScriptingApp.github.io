---
title: HttpResponse
description: This class represents an HTTP response object returned by the server to the client.
tag: PRO
---

The `HttpResponse` class represents an HTTP response object returned by the server to the client.
It defines the response’s status code, headers, and body, and provides convenient factory methods for creating common HTTP responses (e.g., `ok`, `notFound`, `internalServerError`).

`HttpResponse` is typically used together with `HttpResponseBody` to send text, HTML, binary data, or files back to the client.

---

## Overview

`HttpResponse` provides:

* Easy creation of standard HTTP responses (200, 404, 500, etc.)
* Support for custom status codes and reason phrases
* Ability to return text, binary, HTML, or file data
* Custom response headers
* Integration with `FileEntity` and `Data` for flexible body content

---

## Properties

### `statusCode: number`

The numeric HTTP status code.

**Example:**

```ts
const res = HttpResponse.ok(HttpResponseBody.text("OK"))
console.log(res.statusCode)
// Output: 200
```

---

### `reasonPhrase: string`

The reason phrase associated with the status code (e.g., `"OK"`, `"Not Found"`, `"Internal Server Error"`).

**Example:**

```ts
console.log(res.reasonPhrase)
// Output: "OK"
```

---

## Methods

### `headers(): Record<string, string>`

Returns the headers of the response as a key–value object.

**Example:**

```ts
const res = HttpResponse.ok(HttpResponseBody.text("Hello"))
console.log(res.headers())
```

---

### `static ok(body: HttpResponseBody): HttpResponse`

Creates a `200 OK` response.

**Parameters:**

| Name   | Type               | Description                                                               |
| ------ | ------------------ | ------------------------------------------------------------------------- |
| `body` | `HttpResponseBody` | The response body (use `HttpResponseBody.text()`, `data()`, or `html()`). |

**Example:**

```ts
return HttpResponse.ok(HttpResponseBody.text("Hello, world!"))
```

---

### `static created(): HttpResponse`

Returns a `201 Created` response, indicating that a new resource was successfully created.

**Example:**

```ts
return HttpResponse.created()
```

---

### `static accepted(): HttpResponse`

Returns a `202 Accepted` response, indicating the request was accepted but not yet processed.

**Example:**

```ts
return HttpResponse.accepted()
```

---

### `static movedPermanently(url: string): HttpResponse`

Returns a `301 Moved Permanently` redirect response.

**Parameters:**

| Name  | Type     | Description                    |
| ----- | -------- | ------------------------------ |
| `url` | `string` | The target URL to redirect to. |

**Example:**

```ts
return HttpResponse.movedPermanently("https://example.com/new-page")
```

---

### `static movedTemporarily(url: string): HttpResponse`

Returns a `302 Moved Temporarily` redirect response.

**Parameters:**

| Name  | Type     | Description                        |
| ----- | -------- | ---------------------------------- |
| `url` | `string` | The temporary redirect target URL. |

**Example:**

```ts
return HttpResponse.movedTemporarily("https://example.com/login")
```

---

### `static badRequest(body?: HttpResponseBody | null): HttpResponse`

Returns a `400 Bad Request` response, indicating invalid parameters or malformed input.

**Parameters:**

| Name   | Type                | Description                               |
| ------ | ------------------- | ----------------------------------------- |
| `body` | `HttpResponseBody?` | Optional error body describing the issue. |

**Example:**

```ts
return HttpResponse.badRequest(HttpResponseBody.text("Invalid parameters"))
```

---

### `static unauthorized(): HttpResponse`

Returns a `401 Unauthorized` response, indicating authentication is required.

**Example:**

```ts
return HttpResponse.unauthorized()
```

---

### `static forbidden(): HttpResponse`

Returns a `403 Forbidden` response, indicating the request is understood but not allowed.

**Example:**

```ts
return HttpResponse.forbidden()
```

---

### `static notFound(): HttpResponse`

Returns a `404 Not Found` response when the requested resource does not exist.

**Example:**

```ts
return HttpResponse.notFound()
```

---

### `static notAcceptable(): HttpResponse`

Returns a `406 Not Acceptable` response, indicating the request’s content type is unsupported.

**Example:**

```ts
return HttpResponse.notAcceptable()
```

---

### `static tooManyRequests(): HttpResponse`

Returns a `429 Too Many Requests` response, indicating the client is sending requests too quickly.

**Example:**

```ts
return HttpResponse.tooManyRequests()
```

---

### `static internalServerError(): HttpResponse`

Returns a `500 Internal Server Error` response, indicating an unexpected server error occurred.

**Example:**

```ts
return HttpResponse.internalServerError()
```

---

### `static raw(statusCode: number, phrase: string, options?: { headers?: Record<string, string>; body?: Data | FileEntity } | null): HttpResponse`

Creates a fully custom response with a specific status code, reason phrase, headers, and body.

**Parameters:**

| Name              | Type                     | Description                                   |
| ----------------- | ------------------------ | --------------------------------------------- |
| `statusCode`      | `number`                 | The HTTP status code.                         |
| `phrase`          | `string`                 | The reason phrase.                            |
| `options.headers` | `Record<string, string>` | Optional custom headers.                      |
| `options.body`    | `Data \| FileEntity`     | Optional response body (binary data or file). |

**Example:**

```ts
const file = FileEntity.openForReading(Path.join(Script.directory, "image.png"))
return HttpResponse.raw(200, "OK", {
  headers: { "Content-Type": "image/png" },
  body: file
})
```

---

## Usage with HttpResponseBody

### `HttpResponseBody.text(text: string)`

Returns a plain-text response body.

```ts
HttpResponse.ok(HttpResponseBody.text("Hello, world"))
```

### `HttpResponseBody.html(html: string)`

Returns an HTML response body.

```ts
HttpResponse.ok(HttpResponseBody.html("<h1>Welcome</h1>"))
```

### `HttpResponseBody.data(data: Data)`

Returns a binary data response body.

```ts
const data = Data.fromRawString("Binary content", "utf-8")
HttpResponse.ok(HttpResponseBody.data(data))
```

---

## Full Examples

### 1. Returning a JSON response

```ts
server.registerHandler("/user", (req) => {
  const json = JSON.stringify({ name: "Alice", age: 25 })
  const data = Data.fromRawString(json, "utf-8")
  return HttpResponse.ok(HttpResponseBody.data(data))
})
```

### 2. File download response

```ts
server.registerHandler("/download", (req) => {
  const file = FileEntity.openForReading(Path.join(Script.directory, "example.zip"))
  return HttpResponse.raw(200, "OK", {
    headers: { "Content-Type": "application/zip" },
    body: file
  })
})
```

### 3. Error handling response

```ts
server.registerHandler("/api", (req) => {
  if (req.method !== "POST") {
    return HttpResponse.badRequest(HttpResponseBody.text("POST method required"))
  }
  return HttpResponse.ok(HttpResponseBody.text("Success"))
})
```
