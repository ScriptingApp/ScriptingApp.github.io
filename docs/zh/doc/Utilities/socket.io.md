---
title: socket.io

---

`Socket.IO` API 提供强大的工具，用于管理客户端与服务器之间的实时双向通信。它包括 `SocketManager`（用于管理多个命名空间）和 `SocketIOClient`（用于单个 socket 连接）。以下是该 API 的详细使用指南，包括设置、配置和常见用例。

---

## 入门

通过 `SocketManager` 创建和管理 WebSocket 连接。每个 `SocketManager` 可以管理多个命名空间和配置。

### 示例：

```typescript
// 创建一个 SocketManager 实例
const manager = new SocketManager("http://localhost:8080", {
    reconnects: true,
    reconnectAttempts: 5,
    compress: true
})

// 获取默认命名空间的 socket
const defaultSocket = manager.defaultSocket

// 创建特定命名空间的 socket
const roomASocket = manager.socket("/roomA")
```

---

## API 参考

### `SocketManager`

#### 构造函数

**`constructor(url: string, config?: SocketManagerConfig)`**

- **`url`**：Socket.IO 服务器的 URL。
- **`config`**：可选的配置对象。

#### 属性

- **`socketURL: string`**：服务器 URL。
- **`status: SocketIOStatus`**：连接状态（如 `connected`、`connecting`、`disconnected` 等）。
- **`defaultSocket: SocketIOClient`**：默认命名空间（`"/"`）的 socket。

#### 方法

- **`socket(namespace: string): SocketIOClient`**  
  返回指定命名空间的 `SocketIOClient`。

- **`setConfigs(config: SocketManagerConfig): void`**  
  更新管理器配置。

- **`disconnect(): void`**  
  断开所有由此实例管理的 socket 连接。

- **`reconnect(): void`**  
  尝试重新连接服务器。

---

### `SocketIOClient`

#### 属性

- **`id: string | null`**：socket 连接的唯一标识符。
- **`status: SocketIOStatus`**：客户端连接状态（如 `connected`、`connecting` 等）。

#### 方法

- **`connect(): void`**  
  发起连接。

- **`disconnect(): void`**  
  断开连接。

- **`emit(event: string, data: any): void`**  
  向服务器发送带有数据的事件。

- **`on(event: string, callback: (data: any[], ack: (value?: any) => void) => void): void`**  
  注册事件监听器。

---

## 配置

通过 `SocketManagerConfig` 对象自定义连接行为。

### 关键选项：

- **`compress`**：启用 WebSocket 传输的压缩。
- **`connectParams`**：连接 URL 中包含的 GET 参数。
- **`cookies`**：在初始连接中发送的 cookies。
- **`forceNew`**：确保每次连接都创建一个新的引擎实例。
- **`reconnects`**：启用自动重连。
- **`reconnectAttempts`**：最大重连次数。
- **`reconnectWait`**：重连尝试之间的最小时间（秒）。

### 示例：

```typescript
const config: SocketManagerConfig = {
    compress: true,
    reconnects: true,
    reconnectAttempts: 5,
    reconnectWait: 2,
    extraHeaders: {
        Authorization: "Bearer token"
    }
}
const manager = new SocketManager("http://example.com", config)
```

---

## 常见用例

### 发送和监听事件

```typescript
const socket = manager.defaultSocket

socket.on("connect", () => {
    console.log("成功连接服务器")
    socket.emit("joinRoom", { room: "roomA" })
})

socket.on("message", (data) => {
    console.log("收到消息：", data)
})
```

### 处理重连

```typescript
manager.setConfigs({ reconnects: true, reconnectAttempts: 10 })

manager.defaultSocket.on("reconnect", () => {
    console.log("已重新连接服务器")
})
```

### 使用命名空间

```typescript
const chatSocket = manager.socket("/chat")

chatSocket.on("newMessage", (data) => {
    console.log("聊天中收到新消息：", data)
})
```

---

## 最佳实践

1. **生命周期管理**：不再需要时调用 `disconnect()`。
2. **命名空间隔离**：为逻辑上不同的通信通道使用独立命名空间。
3. **重连策略**：根据应用需求配置重连参数。
4. **错误处理**：注册 `on("error")` 监听器以优雅地处理连接问题。
5. **安全连接**：对于敏感数据，使用安全 WebSocket（WSS），并配置 `secure: true`。

---

## 完整示例

```typescript
// 创建一个带配置的 SocketManager
const manager = new SocketManager("https://example.com", {
    reconnects: true,
    reconnectAttempts: -1,
    reconnectWait: 1
})

// 获取默认命名空间
const socket = manager.defaultSocket

// 注册事件处理器
socket.on("connect", () => {
    console.log("已连接到服务器")
    socket.emit("join", { room: "lobby" })
})

socket.on("message", (data) => {
    console.log("收到消息：", data)
})

socket.on("disconnect", () => {
    console.log("已断开连接")
})

// 发送自定义事件
socket.emit("sendMessage", { text: "你好，世界！" })

// 完成后断开连接
setTimeout(() => {
    manager.disconnect()
}, 60000)
```