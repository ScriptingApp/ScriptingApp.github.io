# HttpRequest（HTTP 请求） PRO

`HttpRequest` 类表示一个由客户端发往服务器的 HTTP 请求对象。它封装了请求的路径、方法、头部、请求体、来源地址以及解析后的参数信息，可在服务器的路由处理函数中使用。

***

## 概述

`HttpRequest` 通常作为参数传入由 `HttpServer.registerHandler()` 注册的处理函数中，用于：

- 读取请求路径、方法、头部与请求体；
- 访问 URL 参数与查询参数；
- 解析表单数据（包括 `application/x-www-form-urlencoded` 与 `multipart/form-data`）；
- 校验身份令牌或自定义 header。

***

## 属性

### `path: string`

请求的路径部分，不包含查询参数。

**示例：**

```ts
console.log(request.path) 
// 输出: "/api/user"
```

***

### `method: string`

请求的 HTTP 方法，例如 `"GET"`, `"POST"`, `"PUT"`, `"DELETE"` 等。

**示例：**

```ts
console.log(request.method)
// 输出: "POST"
```

***

### `headers: Record<string, string>`

包含请求头部的键值对对象。

**示例：**

```ts
console.log(request.headers["content-type"])
// 输出: "application/json"
```

***

### `body: Data`

请求体内容，封装为 `Data` 对象。
可通过 `Data.toRawString("utf-8")` 等方法将其转换为文本。

**示例：**

```ts
const text = request.body.toRawString("utf-8")
console.log("请求体内容:", text)
```

***

### `address: string | null`

请求来源的客户端 IP 地址。
若无法识别来源，则为 `null`。

**示例：**

```ts
console.log("来自地址:", request.address)
```

***

### `params: Record<string, string>`

路径参数对象，用于访问定义在路由路径中的占位符。

**示例：**

```ts
// 路由注册时定义
server.registerHandler("/user/:id", (req) => {
  const userId = req.params["id"]
  return HttpResponse.ok(HttpResponseBody.text(`User ID: ${userId}`))
})
```

访问 `/user/123` 时输出：

```
User ID: 123
```

***

### `queryParams: Array<{ key: string; value: string }>`

URL 查询参数数组，每项包含 `key` 与 `value`。
可用于读取 `?key=value` 形式的参数。

**示例：**

```ts
// 请求 URL: /search?keyword=apple&page=2
for (const param of request.queryParams) {
  console.log(param.key, "=", param.value)
}
// 输出：
// keyword = apple
// page = 2
```

***

## 方法

### `hasTokenForHeader(headerName: string, token: string): boolean`

检查指定请求头中是否包含给定的令牌（通常用于 `Authorization` 或自定义安全验证）。

**参数：**

| 参数名          | 类型       | 说明                 |
| ------------ | -------- | ------------------ |
| `headerName` | `string` | 要检查的请求头名称（不区分大小写）。 |
| `token`      | `string` | 期望匹配的令牌字符串。        |

**返回值：**

- `true`：请求头中包含该令牌；
- `false`：不包含。

**示例：**

```ts
if (!request.hasTokenForHeader("Authorization", "Bearer my-secret-token")) {
  return HttpResponse.unauthorized()
}
```

***

### `parseUrlencodedForm(): Array<{ key: string; value: string }>`

解析 `application/x-www-form-urlencoded` 格式的表单请求体。
通常用于处理 HTML 表单的 POST 请求。

**返回值：**
返回一个数组，每个元素包含 `key` 与 `value`。

**示例：**

```ts
const form = request.parseUrlencodedForm()
for (const field of form) {
  console.log(field.key, "=", field.value)
}
```

假设请求体为：

```
username=thom&password=1234
```

则输出：

```
username = thom
password = 1234
```

***

### `parseMultiPartFormData(): Array<{ name: string | null; filename: string | null; headers: Record<string, string>; data: Data }>`

解析 `multipart/form-data` 格式的表单请求（通常用于文件上传）。

**返回值：**
返回一个数组，每个元素代表一个表单字段或文件项，包含以下属性：

| 属性         | 类型                       | 说明                         |
| ---------- | ------------------------ | -------------------------- |
| `name`     | `string \| null`         | 表单字段名称。                    |
| `filename` | `string \| null`         | 如果是文件上传项，则为文件名；否则为 `null`。 |
| `headers`  | `Record<string, string>` | 文件或字段的头部信息。                |
| `data`     | `Data`                   | 字段或文件内容数据。                 |

**示例：**

```ts
const parts = request.parseMultiPartFormData()
for (const part of parts) {
  if (part.filename) {
    console.log("上传文件:", part.filename)
    FileManager.writeAsDataSync(Path.join(Script.directory, part.filename), part.data)
  } else {
    console.log("字段:", part.name, "=", part.data.toRawString("utf-8"))
  }
}
```

***

## 综合示例

以下示例展示了如何读取请求信息并返回响应：

```ts
server.registerHandler("/upload", (req) => {
  if (req.method === "POST") {
    const parts = req.parseMultiPartFormData()
    for (const part of parts) {
      if (part.filename) {
        console.log("Received file:", part.filename)
      } else {
        console.log("Field:", part.name)
      }
    }
    return HttpResponse.ok(HttpResponseBody.text("Upload successful"))
  } else {
    return HttpResponse.badRequest(HttpResponseBody.text("POST required"))
  }
})
```
