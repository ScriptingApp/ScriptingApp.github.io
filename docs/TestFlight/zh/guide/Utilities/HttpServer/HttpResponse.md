---
title: HttpResponse（HTTP 响应）
description: 该类表示一个由服务器发往客户端的 HTTP 响应对象。
tag: PRO
---

`HttpResponse` 类表示服务器对客户端请求的响应对象。
它定义了 HTTP 响应的状态码、响应体及头部信息，并提供多种便捷方法生成常见的标准响应（如 `ok`、`notFound`、`internalServerError` 等）。

此类通常与 `HttpResponseBody` 搭配使用，用于在服务器端返回文本、HTML、二进制数据或文件内容。

---

## 概述

`HttpResponse` 的主要功能包括：

* 构造标准 HTTP 响应（200、404、500 等）；
* 返回自定义状态码与原因短语；
* 返回文本、数据、HTML 或文件；
* 设置自定义响应头；
* 支持从 `FileEntity` 或 `Data` 对象直接构建响应体。

---

## 属性

### `statusCode: number`

HTTP 响应状态码。

**示例：**

```ts
const res = HttpResponse.ok(HttpResponseBody.text("OK"))
console.log(res.statusCode)
// 输出: 200
```

---

### `reasonPhrase: string`

状态码对应的原因短语（例如 `"OK"`, `"Not Found"`, `"Internal Server Error"` 等）。

**示例：**

```ts
console.log(res.reasonPhrase)
// 输出: "OK"
```

---

## 方法

### `headers(): Record<string, string>`

返回响应头的键值对对象。

**示例：**

```ts
const res = HttpResponse.ok(HttpResponseBody.text("hello"))
console.log(res.headers())
```

---

### `static ok(body: HttpResponseBody): HttpResponse`

创建一个状态码为 `200 OK` 的响应。

**参数：**

| 参数名    | 类型                 | 说明                                                        |
| ------ | ------------------ | --------------------------------------------------------- |
| `body` | `HttpResponseBody` | 响应体对象，可通过 `HttpResponseBody.text()`、`data()`、`html()` 创建。 |

**示例：**

```ts
return HttpResponse.ok(HttpResponseBody.text("Hello, world!"))
```

---

### `static created(): HttpResponse`

返回 `201 Created` 响应，表示资源已成功创建。

**示例：**

```ts
return HttpResponse.created()
```

---

### `static accepted(): HttpResponse`

返回 `202 Accepted` 响应，表示请求已被接受但尚未处理完成。

**示例：**

```ts
return HttpResponse.accepted()
```

---

### `static movedPermanently(url: string): HttpResponse`

返回 `301 Moved Permanently` 响应，用于永久重定向。

**参数：**

| 参数名   | 类型       | 说明         |
| ----- | -------- | ---------- |
| `url` | `string` | 重定向目标 URL。 |

**示例：**

```ts
return HttpResponse.movedPermanently("https://example.com/new-page")
```

---

### `static movedTemporarily(url: string): HttpResponse`

返回 `302 Moved Temporarily` 响应，用于临时重定向。

**参数：**

| 参数名   | 类型       | 说明         |
| ----- | -------- | ---------- |
| `url` | `string` | 重定向目标 URL。 |

**示例：**

```ts
return HttpResponse.movedTemporarily("https://example.com/login")
```

---

### `static badRequest(body?: HttpResponseBody | null): HttpResponse`

返回 `400 Bad Request` 响应，表示请求格式错误或参数无效。

**参数：**

| 参数名    | 类型                  | 说明         |
| ------ | ------------------- | ---------- |
| `body` | `HttpResponseBody?` | 可选的错误消息内容。 |

**示例：**

```ts
return HttpResponse.badRequest(HttpResponseBody.text("Invalid parameters"))
```

---

### `static unauthorized(): HttpResponse`

返回 `401 Unauthorized` 响应，表示需要身份验证。

**示例：**

```ts
return HttpResponse.unauthorized()
```

---

### `static forbidden(): HttpResponse`

返回 `403 Forbidden` 响应，表示禁止访问。

**示例：**

```ts
return HttpResponse.forbidden()
```

---

### `static notFound(): HttpResponse`

返回 `404 Not Found` 响应，表示请求的资源不存在。

**示例：**

```ts
return HttpResponse.notFound()
```

---

### `static notAcceptable(): HttpResponse`

返回 `406 Not Acceptable` 响应，表示请求的内容类型不被支持。

**示例：**

```ts
return HttpResponse.notAcceptable()
```

---

### `static tooManyRequests(): HttpResponse`

返回 `429 Too Many Requests` 响应，表示请求过于频繁。

**示例：**

```ts
return HttpResponse.tooManyRequests()
```

---

### `static internalServerError(): HttpResponse`

返回 `500 Internal Server Error` 响应，表示服务器内部错误。

**示例：**

```ts
return HttpResponse.internalServerError()
```

---

### `static raw(statusCode: number, phrase: string, options?: { headers?: Record<string, string>; body?: Data | FileEntity } | null): HttpResponse`

创建一个自定义状态码与内容的原始响应。

**参数：**

| 参数名               | 类型                       | 说明                 |
| ----------------- | ------------------------ | ------------------ |
| `statusCode`      | `number`                 | HTTP 状态码。          |
| `phrase`          | `string`                 | 原因短语。              |
| `options.headers` | `Record<string, string>` | 自定义响应头。            |
| `options.body`    | `Data \| FileEntity`     | 响应体，可以是二进制数据或文件对象。 |

**示例：**

```ts
const file = FileEntity.openForReading(Path.join(Script.directory, "image.png"))
return HttpResponse.raw(200, "OK", {
  headers: { "Content-Type": "image/png" },
  body: file
})
```

---

## 与 HttpResponseBody 搭配使用

### `HttpResponseBody.text(text: string)`

返回文本响应体。

```ts
HttpResponse.ok(HttpResponseBody.text("Hello, world"))
```

### `HttpResponseBody.html(html: string)`

返回 HTML 响应体。

```ts
HttpResponse.ok(HttpResponseBody.html("<h1>Welcome</h1>"))
```

### `HttpResponseBody.data(data: Data)`

返回二进制响应体。

```ts
const data = Data.fromRawString("Binary content", "utf-8")
HttpResponse.ok(HttpResponseBody.data(data))
```

---

## 综合示例

### 1. 返回 JSON 响应

```ts
server.registerHandler("/user", (req) => {
  const json = JSON.stringify({ name: "Alice", age: 25 })
  const data = Data.fromRawString(json, "utf-8")
  return HttpResponse.ok(HttpResponseBody.data(data))
})
```

### 2. 返回文件下载

```ts
server.registerHandler("/download", (req) => {
  const file = FileEntity.openForReading(Path.join(Script.directory, "example.zip"))
  return HttpResponse.raw(200, "OK", {
    headers: { "Content-Type": "application/zip" },
    body: file
  })
})
```

### 3. 处理错误响应

```ts
server.registerHandler("/api", (req) => {
  if (req.method !== "POST") {
    return HttpResponse.badRequest(HttpResponseBody.text("POST method required"))
  }
  return HttpResponse.ok(HttpResponseBody.text("Success"))
})
```
