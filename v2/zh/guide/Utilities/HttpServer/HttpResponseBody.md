# HttpResponseBody（HTTP 响应体）

`HttpResponseBody` 类用于构造 HTTP 响应的主体内容。
它可以表示文本内容、HTML 页面、二进制数据或任意自定义数据类型，并与 `HttpResponse` 一起使用，用于向客户端返回响应内容。

***

## 概述

在使用 `HttpServer` 创建自定义 HTTP 服务时，响应主体 (`HttpResponseBody`) 决定了客户端实际接收到的数据内容。
该类提供多种静态工厂方法用于快速生成不同类型的响应内容：

- 文本（`text`）
- HTML（`html`、`htmlBody`）
- 二进制数据（`data`）

***

## 常见用途

- 返回纯文本响应（例如 API 消息）
- 返回 HTML 页面（例如浏览器展示）
- 返回文件或二进制流（例如图片、视频、压缩包）

***

## 静态方法

### `static text(text: string): HttpResponseBody`

创建一个文本类型的响应体。

**参数：**

| 参数名    | 类型       | 说明        |
| ------ | -------- | --------- |
| `text` | `string` | 要返回的文本内容。 |

**示例：**

```ts
const body = HttpResponseBody.text("Hello, world")
return HttpResponse.ok(body)
```

返回结果：

```
HTTP/1.1 200 OK
Content-Type: text/plain

Hello, world
```

***

### `static data(data: Data): HttpResponseBody`

创建一个包含二进制数据的响应体。

**参数：**

| 参数名    | 类型     | 说明           |
| ------ | ------ | ------------ |
| `data` | `Data` | 要返回的二进制数据对象。 |

**示例：**

```ts
const content = Data.fromRawString("Binary content", "utf-8")
return HttpResponse.ok(HttpResponseBody.data(content))
```

此方法常用于返回文件下载、图片或 JSON 数据。

***

### `static html(html: string): HttpResponseBody`

创建一个 HTML 响应体（标准 HTML 文档）。

**参数：**

| 参数名    | 类型       | 说明         |
| ------ | -------- | ---------- |
| `html` | `string` | HTML 文本内容。 |

**示例：**

```ts
const html = `
<html>
  <head><title>Hello</title></head>
  <body><h1>Welcome to Scripting Server</h1></body>
</html>
`
return HttpResponse.ok(HttpResponseBody.html(html))
```

浏览器访问时将直接渲染为网页内容。

***

### `static htmlBody(html: string): HttpResponseBody`

创建一个仅包含 HTML “主体内容”的响应体。
与 `html()` 类似，但在部分实现中可能省略标准 HTML 文档结构（`<html>`、`<body>` 等标签）。
常用于模板渲染或嵌入式 HTML 内容返回。

**参数：**

| 参数名    | 类型       | 说明            |
| ------ | -------- | ------------- |
| `html` | `string` | HTML 片段或主体内容。 |

**示例：**

```ts
return HttpResponse.ok(HttpResponseBody.htmlBody("<h1>Inline HTML Body</h1>"))
```

***

## 使用场景示例

### 1. 返回纯文本响应

```ts
server.registerHandler("/hello", (req) => {
  return HttpResponse.ok(HttpResponseBody.text("Hello from server"))
})
```

### 2. 返回 HTML 页面

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

### 3. 返回二进制文件（如图片）

```ts
server.registerHandler("/image", (req) => {
  const fileData = FileManager.readAsData(Path.join(Script.directory, "logo.png"))
  return HttpResponse.ok(HttpResponseBody.data(fileData))
})
```

### 4. 返回局部 HTML 内容（用于嵌入）

```ts
server.registerHandler("/partial", (req) => {
  return HttpResponse.ok(HttpResponseBody.htmlBody("<div>Partial Content</div>"))
})
```

***

## 总结

| 方法           | 说明           | 典型用途         |
| ------------ | ------------ | ------------ |
| `text()`     | 返回纯文本内容      | API 响应、日志输出  |
| `data()`     | 返回二进制数据      | 文件下载、JSON、图片 |
| `html()`     | 返回完整 HTML 页面 | 网页展示         |
| `htmlBody()` | 返回 HTML 片段   | 模板渲染或局部更新    |
