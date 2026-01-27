---
title: WebScoket

---

`WebSocket` 类提供了创建和管理 WebSocket 连接的接口，允许与服务器进行实时通信。你可以通过 WebSocket 连接发送和接收文本和二进制数据，包括字节缓冲区。

---

## 概述

WebSocket 是一种通信协议，允许客户端与服务器之间进行全双工通信。这使其非常适用于实时应用程序，如即时消息、通知或数据流。

---

## 类：`WebSocket`

### 构造函数

#### `new WebSocket(url: string)`
创建一个新的 WebSocket 连接到指定的 URL，并立即尝试建立连接。
- **参数**：
  - `url: string`：要连接的 WebSocket 服务器 URL。示例：`"ws://example.com/socket"` 或 `"wss://example.com/socket"`（对于安全的 WebSocket 连接）。

- **返回**：一个表示连接的 `WebSocket` 对象。

---

### 属性

- **`url: string`**  
  WebSocket 连接的 URL。此属性为只读。

- **`onopen?: () => void`**  
  可选的回调函数，当 WebSocket 连接成功建立时触发。

- **`onerror?: (error: Error) => void`**  
  可选的回调函数，当 WebSocket 连接或通信发生错误时触发。

- **`onmessage?: (message: string | Data) => void`**  
  可选的回调函数，当从 WebSocket 服务器接收到消息时触发。`message` 参数可以是字符串或二进制数据（由 `Data` 类表示）。

- **`onclose?: (reason?: string) => void`**  
  可选的回调函数，当 WebSocket 连接关闭时触发。`reason` 参数提供了关闭连接的可选解释。

---

### 方法

#### `send(message: string | Data): void`
通过 WebSocket 连接向服务器发送数据。
- **参数**：
  - `message: string | Data`：要发送到服务器的数据。可以是字符串或 `Data` 类的实例。

- **返回**：`void`

#### `close(code?: 1000 | 1001 | 1002 | 1003, reason?: string): void`
关闭 WebSocket 连接。如果连接已经关闭，则此方法不执行任何操作。
- **参数**：
  - `code?: 1000 | 1001 | 1002 | 1003`：可选的 WebSocket 连接关闭代码。常见的代码包括：
    - `1000`：正常关闭
    - `1001`：离开
    - `1002`：协议错误
    - `1003`：不支持的数据类型
  - `reason?: string`：可选的关闭连接原因。此字符串的长度不得超过 123 字节（UTF-8 编码）。

- **返回**：`void`

---

### 事件处理

你可以使用 `addEventListener` 来监听 WebSocket 事件，并使用 `removeEventListener` 来移除事件监听器。

#### `addEventListener(event: "open", listener: () => void): void`
为 `"open"` 事件添加事件监听器，该事件在 WebSocket 连接建立时触发。

#### `addEventListener(event: "error", listener: (error: Error) => void): void`
为 `"error"` 事件添加事件监听器，该事件在 WebSocket 连接发生错误时触发。

#### `addEventListener(event: "message", listener: (message: string | Data) => void): void`
为 `"message"` 事件添加事件监听器，该事件在从 WebSocket 服务器接收到消息时触发。

#### `addEventListener(event: "close", listener: (reason?: string) => void): void`
为 `"close"` 事件添加事件监听器，该事件在 WebSocket 连接关闭时触发。

#### `removeEventListener(event: "open", listener: () => void): void`
移除 `"open"` 事件的事件监听器。

#### `removeEventListener(event: "error", listener: (error: Error) => void): void`
移除 `"error"` 事件的事件监听器。

#### `removeEventListener(event: "message", listener: (message: string | Data) => void): void`
移除 `"message"` 事件的事件监听器。

#### `removeEventListener(event: "close", listener: (reason?: string) => void): void`
移除 `"close"` 事件的事件监听器。

---

## 示例使用

### 建立 WebSocket 连接

```ts
const ws = new WebSocket("wss://example.com/socket")

// 设置事件监听器
ws.addEventListener("open", () => {
  console.log("连接已建立！")
  ws.send("你好，服务器！")
})

ws.addEventListener("message", (message) => {
  console.log("接收到消息：", message)
})

ws.addEventListener("error", (error) => {
  console.log("WebSocket 错误：", error)
})

ws.addEventListener("close", (reason) => {
  console.log("连接已关闭：", reason)
})
```

### 发送字符串消息

```ts
const ws = new WebSocket("wss://example.com/socket")

ws.addEventListener("open", () => {
  ws.send("你好，这是测试消息！")
})
```

### 使用 `Data` 发送二进制数据

```ts
const ws = new WebSocket("wss://example.com/socket")

ws.addEventListener("open", () => {
  const data = Data.fromString("一些消息")
  ws.send(data) // 发送二进制数据
})
```

### 处理二进制数据

```ts
const ws = new WebSocket("wss://example.com/socket")

ws.addEventListener("message", (message) => {
  if (message instanceof Data) {
    const byteArray = message.getBytes()
    if (byteArray) {
      console.log("接收到的二进制数据：", byteArray)
    }
  }
})
```

### 关闭 WebSocket 连接

```ts
const ws = new WebSocket("wss://example.com/socket")

ws.addEventListener("open", () => {
  console.log("连接已建立！")
  // 使用自定义原因关闭连接
  ws.close(1000, "测试后关闭连接")
})
```

---

## 注意事项

- `send()` 方法可以处理文本和二进制数据。对于二进制数据，你可以使用 `Data` 类来处理字节缓冲区。
- 对于二进制数据，请确保你的 WebSocket 服务器能够处理二进制数据，例如 `ArrayBuffer` 或 `Uint8Array`。
- `close()` 方法可以接受 `code` 和可选的 `reason` 参数来指定 WebSocket 连接如何关闭。