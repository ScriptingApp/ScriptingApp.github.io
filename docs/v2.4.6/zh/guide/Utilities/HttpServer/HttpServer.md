---
title: HttpServer（HTTP 服务器）
description: 该接口提供了在本地或局域网中启动一个轻量级 HTTP 服务器的能力，可用于处理 HTTP 请求、静态文件服务、WebSocket 通信等场景。
tag: PRO
---

`HttpServer` 类提供了在本地或局域网中启动一个轻量级 HTTP 服务器的能力，可用于处理 HTTP 请求、静态文件服务、WebSocket 通信等场景。该类在脚本中常用于本地 Web 调试、远程控制、设备通信等。

---

## 概述

`HttpServer` 支持以下功能：

* 处理自定义路径的 HTTP 请求。
* 提供静态文件或目录的访问。
* 注册 WebSocket 服务端，实现实时通信。
* 支持 IPv4 与 IPv6 地址。
* 可选择端口号（支持随机端口）。
* 支持服务器状态查询。

---

## 属性

### `state: HttpServerState`

服务器当前状态。
可能值包括：

| 状态           | 说明       |
| ------------ | -------- |
| `"starting"` | 正在启动服务器。 |
| `"running"`  | 服务器运行中。  |
| `"stopping"` | 正在停止服务器。 |
| `"stopped"`  | 服务器已停止。  |

---

### `port: number | null`

服务器监听的端口号。
如果服务器未运行，则为 `null`。

---

### `isIPv4: boolean`

指示服务器是否在 IPv4 地址上监听。若为 `false`，则可能监听 IPv6 地址。

---

### `listenAddressIPv4: string | null`

IPv4 监听地址，仅当 `forceIPv4` 为 `true` 时使用。

---

### `listenAddressIPv6: string | null`

IPv6 监听地址，仅当 `forceIPv6` 为 `true` 时使用。

---

## 方法

### `registerHandler(path: string, handler: (request: HttpRequest) => HttpResponse): void`

为指定路径注册一个 HTTP 请求处理器。

**参数：**

| 参数        | 类型                                       | 说明                           |
| --------- | ---------------------------------------- | ---------------------------- |
| `path`    | `string`                                 | 请求路径（支持动态参数，例如 `/user/:id`）。 |
| `handler` | `(request: HttpRequest) => HttpResponse` | 处理函数，接收请求对象并返回响应对象。          |

**示例：**

```ts
const server = new HttpServer()

server.registerHandler("/hello", (req) => {
  return HttpResponse.ok(HttpResponseBody.text("Hello, world!"))
})
```

---

### `registerFile(path: string, filePath: string): void`

为指定路径注册一个静态文件响应。

**参数：**

| 参数         | 类型       | 说明        |
| ---------- | -------- | --------- |
| `path`     | `string` | 请求路径。     |
| `filePath` | `string` | 要响应的文件路径。 |

**示例：**

```ts
server.registerFile("/readme", Path.join(Script.directory, "README.md"))
```

当访问 `/readme` 时，服务器将返回该文件的内容。

---

### `registerFilesFromDirectory(path: string, directory: string, options?: { defaults?: string[] }): void`

注册指定目录下的所有文件，使其可通过 HTTP 访问。

**参数：**

| 参数                 | 类型         | 说明                                                             |
| ------------------ | ---------- | -------------------------------------------------------------- |
| `path`             | `string`   | 路径模板，例如 `/static/:file`。                                       |
| `directory`        | `string`   | 目录路径。                                                          |
| `options.defaults` | `string[]` | 默认文件名，若未指定文件则尝试加载此列表中的文件（默认：`["index.html", "default.html"]`）。 |

**示例：**

```ts
server.registerFilesFromDirectory("/static/:file", Path.join(Script.directory, "html"), {
  defaults: ["index.html", "index.htm"]
})
```

当访问 `/static/` 时，会返回该目录下的默认首页文件。

---

### `registerWebsocket(path: string, handlers: WebSocketHandlers): void`

注册 WebSocket 服务端处理程序，用于实时通信。

**参数：**

| 参数         | 类型                  | 说明                |
| ---------- | ------------------- | ----------------- |
| `path`     | `string`            | WebSocket 路径。     |
| `handlers` | `WebSocketHandlers` | WebSocket 事件处理函数。 |

**WebSocketHandlers 类型定义：**

```ts
interface WebSocketHandlers {
  onPong?: (session: WebSocketSession) => void
  onConnected?: (session: WebSocketSession) => void
  onDisconnected?: (session: WebSocketSession) => void
  handleText?: (session: WebSocketSession, text: string) => void
  handleBinary?: (session: WebSocketSession, data: Data) => void
}
```

**示例：**

```ts
const connectedSessions: WebSocketSession[] = []

server.registerWebsocket("/ws", {
  onConnected: (session) => {
    connectedSessions.push(session)
  },
  onDisconnected: (session) => {
    connectedSessions.splice(connectedSessions.indexOf(session), 1)
  },
  handleText: (session, text) => {
    session.writeText("Echo: " + text)
  }
})
```

---

### `start(options?: { port?: number; forceIPv4?: boolean }): string | null`

启动服务器。

**参数：**

| 参数                  | 类型        | 说明                                    |
| ------------------- | --------- | ------------------------------------- |
| `options.port`      | `number`  | 指定监听端口，默认为 `8080`。如果设为 `0`，则自动选择可用端口。 |
| `options.forceIPv4` | `boolean` | 是否强制使用 IPv4 地址，默认 `false`。            |

**返回值：**

* 若启动失败，返回错误消息字符串。
* 若成功，返回 `null`。

**示例：**

```ts
const error = server.start({ port: 8080 })
if (error) {
  console.error("启动失败:", error)
} else {
  console.log("服务器运行在端口:", server.port)
}
```

---

### `stop(): void`

停止服务器并释放资源。

**示例：**

```ts
server.stop()
console.log("服务器已停止")
```

---

## 类型定义

### `HttpServerState`

```ts
type HttpServerState = "starting" | "running" | "stopping" | "stopped"
```

### `WebSocketSession`

表示一个 WebSocket 连接。

**常用方法：**

| 方法                        | 说明       |
| ------------------------- | -------- |
| `writeText(text: string)` | 发送文本消息。  |
| `writeData(data: Data)`   | 发送二进制消息。 |
| `close()`                 | 关闭连接。    |

---

## 综合示例

以下示例展示了一个完整的 HTTP 与 WebSocket 服务器：

```ts
const server = new HttpServer()

// 注册简单的 HTTP 处理
server.registerHandler("/api/hello", (req) => {
  return HttpResponse.ok(HttpResponseBody.text("Hello from Scripting Server"))
})

// 注册静态目录
server.registerFilesFromDirectory("/public/:file", Path.join(Script.directory, "html"))

// 注册 WebSocket 服务
server.registerWebsocket("/chat", {
  onConnected: (session) => {
    console.log("新连接")
    session.writeText("欢迎加入聊天")
  },
  handleText: (session, text) => {
    console.log("收到:", text)
    session.writeText("你说: " + text)
  }
})

// 启动服务器
const error = server.start({ port: 8080 })
if (error) {
  console.error("启动失败:", error)
} else {
  console.log("HTTP服务器已启动，端口:", server.port)
}
```
