# socket.io

The `Socket.IO` API provides robust tools for managing real-time, bidirectional communication between clients and servers. It includes a `SocketManager` for handling multiple namespaces and a `SocketIOClient` for individual socket connections. This document provides an overview of the API, including setup, configuration, and usage.

***

## Getting Started

The `Socket.IO` API allows you to create and manage WebSocket connections using a `SocketManager`. Each `SocketManager` can handle multiple namespaces and configurations.

### Example:

```typescript
// Create a SocketManager instance
const manager = new SocketManager("http://localhost:8080", {
    reconnects: true,
    reconnectAttempts: 5,
    compress: true
})

// Access the default namespace socket
const defaultSocket = manager.defaultSocket

// Create a socket for a specific namespace
const roomASocket = manager.socket("/roomA")
```

***

## API Reference

### SocketManager

#### Constructor

**`constructor(url: string, config?: SocketManagerConfig)`**

- **`url`**: The URL of the Socket.IO server.
- **`config`**: Optional configuration object.

#### Properties

- **`socketURL: string`**: The server URL.
- **`status: SocketIOStatus`**: The manager's connection status (`connected`, `connecting`, `disconnected`, etc.).
- **`defaultSocket: SocketIOClient`**: The socket for the default namespace (`"/"`).

#### Methods

- **`socket(namespace: string): SocketIOClient`**
  - Returns a `SocketIOClient` for the specified namespace.

- **`setConfigs(config: SocketManagerConfig): void`**
  - Updates the manager's configuration.

- **`disconnect(): void`**
  - Disconnects all sockets managed by this instance.

- **`reconnect(): void`**
  - Attempts to reconnect to the server.

### SocketIOClient

#### Properties

- **`id: string | null`**: The unique identifier for the socket connection.
- **`status: SocketIOStatus`**: The client's connection status (`connected`, `connecting`, etc.).

#### Methods

- **`connect(): void`**
  - Initiates a connection.

- **`disconnect(): void`**
  - Disconnects the socket.

- **`emit(event: string, data: any): void`**
  - Sends an event to the server with associated data.

- **`on(event: string, callback: (data: any[], ack: (value?: any) => void) => void): void`**
  - Registers an event listener.

***

## Configuration

The `SocketManagerConfig` object allows you to customize connection behavior.

### Key Options:

- **`compress`**: Enables compression for WebSocket transport.
- **`connectParams`**: A dictionary of GET parameters included in the connection URL.
- **`cookies`**: An array of cookies to send during the initial connection.
- **`forceNew`**: Ensures a new engine is created for every connection.
- **`reconnects`**: Enables automatic reconnection.
- **`reconnectAttempts`**: Sets the maximum number of reconnection attempts.
- **`reconnectWait`**: Minimum time (in seconds) between reconnection attempts.

### Example:

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

***

## Common Use Cases

### Emit and Listen to Events

```typescript
const socket = manager.defaultSocket

socket.on("connect", () => {
    console.log("Connected to server")
    socket.emit("joinRoom", { room: "roomA" })
})

socket.on("message", (data) => {
    console.log("Message received:", data)
})
```

### Handle Reconnection

```typescript
manager.setConfigs({ reconnects: true, reconnectAttempts: 10 })

manager.defaultSocket.on("reconnect", () => {
    console.log("Reconnected to server")
})
```

### Use Namespaces

```typescript
const chatSocket = manager.socket("/chat")

chatSocket.on("newMessage", (data) => {
    console.log("New message in chat:", data)
})
```

***

## Best Practices

1. **Manage Lifecycles:** Always call `disconnect()` when sockets are no longer needed.
2. **Namespace Isolation:** Use separate namespaces for logically distinct communication channels.
3. **Reconnection Strategies:** Configure reconnection parameters based on your app's requirements.
4. **Error Handling:** Register an `on("error")` handler to gracefully handle connection issues.
5. **Secure Connections:** Use secure WebSocket (WSS) for sensitive data and configure `secure: true`.

***

## Full Example

```typescript
// Create a SocketManager with configuration
const manager = new SocketManager("https://example.com", {
    reconnects: true,
    reconnectAttempts: -1,
    reconnectWait: 1
})

// Access the default namespace
const socket = manager.defaultSocket

// Register event handlers
socket.on("connect", () => {
    console.log("Connected to server")
    socket.emit("join", { room: "lobby" })
})

socket.on("message", (data) => {
    console.log("Message received:", data)
})

socket.on("disconnect", () => {
    console.log("Disconnected from server")
})

// Emit a custom event
socket.emit("sendMessage", { text: "Hello, world!" })

// Disconnect when done
setTimeout(() => {
    manager.disconnect()
}, 60000)
```
