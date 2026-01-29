---
title: HttpResponseBody
description: This class represents an HTTP response body object returned by the server to the client.
tag: PRO
---

The `HttpResponseBody` class represents the body content of an HTTP response.
It can contain text, HTML, binary data, or other forms of content.
`HttpResponseBody` is typically used with the `HttpResponse` class to return formatted data to the client.

---

## Overview

When building custom HTTP endpoints with `HttpServer`, the **response body** defines what content the client actually receives.
`HttpResponseBody` provides convenient static factory methods to construct various types of response content:

* Plain text (`text`)
* HTML content (`html`, `htmlBody`)
* Binary data (`data`)

---

## Common Use Cases

* Returning plain text (e.g., simple API messages)
* Returning HTML pages for browser display
* Returning binary data such as images, JSON files, or downloadable archives

---

## Static Methods

### `static text(text: string): HttpResponseBody`

Creates a plain-text response body.

**Parameters:**

| Name   | Type     | Description                                       |
| ------ | -------- | ------------------------------------------------- |
| `text` | `string` | The text content to include in the response body. |

**Example:**

```ts
const body = HttpResponseBody.text("Hello, world")
return HttpResponse.ok(body)
```

Response example:

```
HTTP/1.1 200 OK
Content-Type: text/plain

Hello, world
```

---

### `static data(data: Data): HttpResponseBody`

Creates a response body containing binary data.

**Parameters:**

| Name   | Type   | Description                                          |
| ------ | ------ | ---------------------------------------------------- |
| `data` | `Data` | The binary data object to send in the response body. |

**Example:**

```ts
const content = Data.fromRawString("Binary content", "utf-8")
return HttpResponse.ok(HttpResponseBody.data(content))
```

This is useful for sending files, images, or JSON payloads as binary data.

---

### `static html(html: string): HttpResponseBody`

Creates an HTML response body (standard HTML document).

**Parameters:**

| Name   | Type     | Description                                      |
| ------ | -------- | ------------------------------------------------ |
| `html` | `string` | The HTML markup to include in the response body. |

**Example:**

```ts
const html = `
<html>
  <head><title>Hello</title></head>
  <body><h1>Welcome to Scripting Server</h1></body>
</html>
`
return HttpResponse.ok(HttpResponseBody.html(html))
```

When accessed in a browser, the response is rendered as a web page.

---

### `static htmlBody(html: string): HttpResponseBody`

Creates an HTML **body-only** response.
Similar to `html()`, but may exclude full document structure (`<html>`, `<body>`, etc.).
This method is often used for partial HTML rendering or embedded HTML fragments.

**Parameters:**

| Name   | Type     | Description                       |
| ------ | -------- | --------------------------------- |
| `html` | `string` | The HTML snippet or body content. |

**Example:**

```ts
return HttpResponse.ok(HttpResponseBody.htmlBody("<h1>Inline HTML Body</h1>"))
```

---

## Example Use Cases

### 1. Return a plain-text response

```ts
server.registerHandler("/hello", (req) => {
  return HttpResponse.ok(HttpResponseBody.text("Hello from server"))
})
```

---

### 2. Return an HTML page

```ts
server.registerHandler("/", (req) => {
  const html = `
  <html>
    <head><title>Home</title></head>
    <body>
      <h1>Welcome</h1>
      <p>This is a simple Scripting HTTP server.</p>
    </body>
  </html>`
  return HttpResponse.ok(HttpResponseBody.html(html))
})
```

---

### 3. Return a binary file (e.g., an image)

```ts
server.registerHandler("/image", (req) => {
  const fileData = FileManager.readAsData(Path.join(Script.directory, "logo.png"))
  return HttpResponse.ok(HttpResponseBody.data(fileData))
})
```

---

### 4. Return a partial HTML fragment

```ts
server.registerHandler("/partial", (req) => {
  return HttpResponse.ok(HttpResponseBody.htmlBody("<div>Partial Content</div>"))
})
```

---

## Summary

| Method       | Description                  | Typical Use Case                      |
| ------------ | ---------------------------- | ------------------------------------- |
| `text()`     | Returns plain text content   | API responses, logs                   |
| `data()`     | Returns binary data          | Files, JSON, images                   |
| `html()`     | Returns a full HTML document | Web pages                             |
| `htmlBody()` | Returns an HTML fragment     | Template rendering or partial updates |
