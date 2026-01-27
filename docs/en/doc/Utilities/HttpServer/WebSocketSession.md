---
title: WebSocketSession
tag: PRO
---

The `WebSocketSession` class represents an active WebSocket connection session.
It is created automatically when a client connects to a WebSocket endpoint registered via `HttpServer.registerWebsocket()` and enables **bi-directional real-time communication** between the server and the client.

---

## Overview

Through a `WebSocketSession`, you can:

* Receive text or binary data from clients
* Send messages (text or binary) back to clients
* Handle connection and disconnection events
* Close the WebSocket connection gracefully

Each `WebSocketSession` instance corresponds to one client connection and can be managed individually or stored for broadcasting messages.

---

## Use Cases

* Real-time chat or collaboration systems
* Live notifications or dashboard updates
* Device control or IoT message channels
* Local WebSocket servers communicating with other devices or web clients

---

## Methods

### `writeText(text: string): void`

Sends a text message to the connected client.

**Parameters:**

| Name   | Type     | Description               |
| ------ | -------- | ------------------------- |
| `text` | `string` | The text content to send. |

**Example:**

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

Sends a binary message to the connected client.

**Parameters:**

| Name   | Type   | Description              |
| ------ | ------ | ------------------------ |
| `data` | `Data` | The binary data to send. |

**Example:**

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

Closes the WebSocket session.
After calling this method, the connection is terminated and no further messages will be received or sent.

**Example:**

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

## Integration with `HttpServer.registerWebsocket()`

`WebSocketSession` instances are passed into the event handlers defined in `registerWebsocket()`.

### Example

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
    // Broadcast message to all clients
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

## Common WebSocket Event Handlers

These handlers are defined in `HttpServer.registerWebsocket()` and receive `WebSocketSession` objects.

| Handler          | Trigger                              | Parameters                                  | Description                                     |
| ---------------- | ------------------------------------ | ------------------------------------------- | ----------------------------------------------- |
| `onConnected`    | When a new connection is established | `(session: WebSocketSession)`               | Called once when a client connects.             |
| `onDisconnected` | When the client disconnects          | `(session: WebSocketSession)`               | Called when the connection is closed.           |
| `onPong`         | When a ping/pong frame is received   | `(session: WebSocketSession)`               | Used for heartbeat or connection health checks. |
| `handleText`     | When a text message is received      | `(session: WebSocketSession, text: string)` | Handles text-based messages.                    |
| `handleBinary`   | When a binary message is received    | `(session: WebSocketSession, data: Data)`   | Handles binary data messages.                   |

---

## Example: Simple Real-Time Chat Server

```ts
const sessions: WebSocketSession[] = []

server.registerWebsocket("/chat", {
  onConnected: (session) => {
    sessions.push(session)
    session.writeText("Welcome! There are " + sessions.length + " users online.")
  },
  handleText: (session, text) => {
    for (const s of sessions) {
      s.writeText(text) // Broadcast message to all connected clients
    }
  },
  onDisconnected: (session) => {
    const index = sessions.indexOf(session)
    if (index !== -1) sessions.splice(index, 1)
  }
})
```

**Client example (JavaScript):**

```js
const ws = new WebSocket("ws://localhost:8080/chat")
ws.onmessage = e => console.log("Server:", e.data)
ws.send("Hello everyone!")
```

---

## Type Definition

```ts
class WebSocketSession {
  writeText(text: string): void
  writeData(data: Data): void
  close(): void
}
```

---

## Summary

| Method        | Description                        | Typical Use Case                   |
| ------------- | ---------------------------------- | ---------------------------------- |
| `writeText()` | Sends a text message to the client | Chat, notifications, logs          |
| `writeData()` | Sends binary data to the client    | File transfer, streaming, IoT data |
| `close()`     | Closes the WebSocket connection    | Graceful shutdown or cleanup       |
