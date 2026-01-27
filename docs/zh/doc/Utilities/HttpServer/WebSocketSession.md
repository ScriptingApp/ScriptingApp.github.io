---
title: WebSocketSession（WebSocket 会话）
tag: PRO
---

`WebSocketSession` 类表示一个已建立的 WebSocket 连接会话。
它由服务器端的 `HttpServer.registerWebsocket()` 注册的处理函数自动创建，用于与客户端进行双向实时通信。

---

## 概述

通过 `WebSocketSession`，你可以：

* 接收客户端发送的文本或二进制数据；
* 向客户端发送消息（文本或二进制）；
* 处理连接的建立与断开事件；
* 关闭连接会话。

`WebSocketSession` 通常由 WebSocket 事件回调函数接收，如 `onConnected`、`handleText`、`handleBinary` 等。

---

## 使用场景

* 构建实时聊天、协作或通知系统；
* 实现实时状态同步或设备控制；
* 处理自定义协议的二进制数据通信；
* 构建本地 WebSocket 服务，与其他设备或网页通信。

---

## 方法

### `writeText(text: string): void`

向客户端发送一条文本消息。

**参数：**

| 参数名    | 类型       | 说明        |
| ------ | -------- | --------- |
| `text` | `string` | 要发送的文本内容。 |

**示例：**

```ts
server.registerWebsocket("/chat", {
  onConnected: (session) => {
    session.writeText("Welcome to the chat room!")
  },
  handleText: (session, text) => {
    console.log("Client says:", text)
    session.writeText("You said: " + text)
  }
})
```

---

### `writeData(data: Data): void`

向客户端发送一条二进制消息。

**参数：**

| 参数名    | 类型     | 说明           |
| ------ | ------ | ------------ |
| `data` | `Data` | 要发送的二进制数据对象。 |

**示例：**

```ts
server.registerWebsocket("/binary", {
  onConnected: (session) => {
    const msg = Data.fromRawString("Binary hello", "utf-8")
    session.writeData(msg)
  }
})
```

---

### `close(): void`

关闭当前 WebSocket 会话连接。

调用后，连接会断开，且不再触发任何接收事件。

**示例：**

```ts
server.registerWebsocket("/ws", {
  handleText: (session, text) => {
    if (text === "bye") {
      session.writeText("Goodbye!")
      session.close()
    }
  }
})
```

---

## 与 HttpServer.registerWebsocket() 的配合使用

`WebSocketSession` 实例通过 `registerWebsocket()` 注册的事件回调函数获得。

### 注册示例

```ts
const connectedSessions: WebSocketSession[] = []

server.registerWebsocket("/ws", {
  onConnected: (session) => {
    connectedSessions.push(session)
    console.log("Client connected")
    session.writeText("Connection established!")
  },
  handleText: (session, text) => {
    console.log("Received:", text)
    // 广播消息给所有连接的客户端
    for (const s of connectedSessions) {
      s.writeText("Broadcast: " + text)
    }
  },
  handleBinary: (session, data) => {
    console.log("Received binary data:", data.length)
  },
  onDisconnected: (session) => {
    const index = connectedSessions.indexOf(session)
    if (index !== -1) connectedSessions.splice(index, 1)
    console.log("Client disconnected")
  }
})
```

---

## 常用事件回调（由 HttpServer 提供）

| 回调函数             | 触发时机                | 参数                                          | 说明          |
| ---------------- | ------------------- | ------------------------------------------- | ----------- |
| `onConnected`    | 客户端成功建立连接时          | `(session: WebSocketSession)`               | 创建新的会话对象。   |
| `onDisconnected` | 客户端断开连接时            | `(session: WebSocketSession)`               | 会话结束。       |
| `onPong`         | 收到客户端 Ping/Pong 响应时 | `(session: WebSocketSession)`               | 用于检测连接健康状态。 |
| `handleText`     | 收到文本消息时             | `(session: WebSocketSession, text: string)` | 处理文本通信。     |
| `handleBinary`   | 收到二进制数据时            | `(session: WebSocketSession, data: Data)`   | 处理二进制通信。    |

---

## 示例：构建简单的实时聊天室

```ts
const sessions: WebSocketSession[] = []

server.registerWebsocket("/chat", {
  onConnected: (session) => {
    sessions.push(session)
    session.writeText("Welcome! There are " + sessions.length + " users online.")
  },
  handleText: (session, text) => {
    for (const s of sessions) {
      s.writeText(text) // 广播消息
    }
  },
  onDisconnected: (session) => {
    const index = sessions.indexOf(session)
    if (index !== -1) sessions.splice(index, 1)
  }
})
```

客户端通过 JavaScript 连接：

```js
const ws = new WebSocket("ws://localhost:8080/chat")
ws.onmessage = e => console.log("Server:", e.data)
ws.send("Hello everyone!")
```

---

## 类型定义

```ts
class WebSocketSession {
  writeText(text: string): void
  writeData(data: Data): void
  close(): void
}
```

---

## 总结

| 方法            | 说明         | 使用场景          |
| ------------- | ---------- | ------------- |
| `writeText()` | 向客户端发送文本消息 | 聊天、通知、状态同步    |
| `writeData()` | 发送二进制数据    | 文件传输、实时流、设备数据 |
| `close()`     | 关闭连接       | 主动断开连接或清理资源   |
