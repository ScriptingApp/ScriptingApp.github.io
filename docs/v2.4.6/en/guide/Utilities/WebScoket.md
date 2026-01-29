---
title: WebScoket
description: This interface allows you to create and manage WebSocket connections, allowing for real-time communication with a server.

---

The `WebSocket` class provides an interface for creating and managing WebSocket connections, allowing for real-time communication with a server. You can send and receive both text and binary data, including byte buffers, over the WebSocket connection.

---

## Overview

WebSocket is a communication protocol that allows full-duplex communication between a client and a server. This makes it ideal for real-time applications like live messaging, notifications, or streaming data.

---

## Class: `WebSocket`

### Constructor

#### `new WebSocket(url: string)`
Creates a new WebSocket connection to the specified URL and attempts to establish a connection immediately.
- **Parameters**:
  - `url: string`: The WebSocket server URL to connect to. Example: `"ws://example.com/socket"` or `"wss://example.com/socket"` for secure WebSocket connections.

- **Returns**: A `WebSocket` object representing the connection.

---

### Properties

- **`url: string`**  
  The URL to which the WebSocket is connected. This property is read-only.

- **`onopen?: () => void`**  
  Optional callback function triggered when the WebSocket connection is successfully established.

- **`onerror?: (error: Error) => void`**  
  Optional callback function triggered when an error occurs during the WebSocket connection or communication.

- **`onmessage?: (message: string | Data) => void`**  
  Optional callback function triggered when a message is received from the WebSocket server. The `message` parameter can be either a string or binary data, represented by the `Data` class.

- **`onclose?: (reason?: string) => void`**  
  Optional callback function triggered when the WebSocket connection is closed. The `reason` parameter provides an optional explanation for the closure.

---

### Methods

#### `send(message: string | Data): void`
Sends data to the server over the WebSocket connection.
- **Parameters**:
  - `message: string | Data`: The data to be sent to the server. It can be a string or an instance of the `Data` class.

- **Returns**: `void`

#### `close(code?: 1000 | 1001 | 1002 | 1003, reason?: string): void`
Closes the WebSocket connection. If the connection is already closed, this method does nothing.
- **Parameters**:
  - `code?: 1000 | 1001 | 1002 | 1003`: An optional WebSocket connection close code. Common codes include:
    - `1000`: Normal closure
    - `1001`: Going away
    - `1002`: Protocol error
    - `1003`: Unsupported data type
  - `reason?: string`: An optional reason for closing the connection. This string must be no longer than 123 bytes (UTF-8 encoded).

- **Returns**: `void`

---

### Event Handling

You can listen for WebSocket events using `addEventListener` and remove event listeners with `removeEventListener`.

#### `addEventListener(event: "open", listener: () => void): void`
Adds an event listener for the `"open"` event, triggered when the WebSocket connection is established.

#### `addEventListener(event: "error", listener: (error: Error) => void): void`
Adds an event listener for the `"error"` event, triggered when an error occurs during the WebSocket connection.

#### `addEventListener(event: "message", listener: (message: string | Data) => void): void`
Adds an event listener for the `"message"` event, triggered when a message is received from the WebSocket server.

#### `addEventListener(event: "close", listener: (reason?: string) => void): void`
Adds an event listener for the `"close"` event, triggered when the WebSocket connection is closed.

#### `removeEventListener(event: "open", listener: () => void): void`
Removes an event listener for the `"open"` event.

#### `removeEventListener(event: "error", listener: (error: Error) => void): void`
Removes an event listener for the `"error"` event.

#### `removeEventListener(event: "message", listener: (message: string | Data) => void): void`
Removes an event listener for the `"message"` event.

#### `removeEventListener(event: "close", listener: (reason?: string) => void): void`
Removes an event listener for the `"close"` event.

---

## Example Usage

### Establishing a WebSocket Connection

```ts
const ws = new WebSocket("wss://example.com/socket")

// Set up event listeners
ws.addEventListener("open", () => {
  console.log("Connection established!")
  ws.send("Hello, Server!")
})

ws.addEventListener("message", (message) => {
  console.log("Received message:", message)
})

ws.addEventListener("error", (error) => {
  console.log("WebSocket error:", error)
})

ws.addEventListener("close", (reason) => {
  console.log("Connection closed:", reason)
})
```

### Sending a String Message

```ts
const ws = new WebSocket("wss://example.com/socket")

ws.addEventListener("open", () => {
  ws.send("Hello, this is a test message!")
})
```

### Sending Binary Data Using `Data`

```ts
const ws = new WebSocket("wss://example.com/socket")

ws.addEventListener("open", () => {
  const data = Data.fromString("some message")
  ws.send(data) // Send binary data
})
```

### Handling Binary Data

```ts
const ws = new WebSocket("wss://example.com/socket")

ws.addEventListener("message", (message) => {
  if (message instanceof Data) {
    const byteArray = message.getBytes()
    if (byteArray) {
      console.log("Received binary data:", byteArray)
    }
  }
})
```

### Closing the WebSocket Connection

```ts
const ws = new WebSocket("wss://example.com/socket")

ws.addEventListener("open", () => {
  console.log("Connection established!")
  // Close the connection with a custom reason
  ws.close(1000, "Closing connection after test")
})
```

---

## Notes

- The `send()` method can handle both text and binary data. For binary data, you can use the `Data` class to handle the byte buffer.
- For binary data, ensure that your WebSocket server is capable of handling binary data, such as `ArrayBuffer` or `Uint8Array`.
- The `close()` method can take a `code` and an optional `reason` to specify how the WebSocket connection should close. 
