# HttpServer PRO

The `HttpServer` class provides a lightweight local HTTP server that can handle HTTP requests, serve static files, and manage WebSocket connections. It is commonly used for local debugging, communication between devices, and serving simple web APIs inside scripts.

***

## Overview

`HttpServer` supports:

- Handling custom HTTP routes with programmable handlers
- Serving static files or directories
- Managing WebSocket connections for real-time communication
- Listening on both IPv4 and IPv6
- Configurable ports (including automatic random ports)
- Server state tracking

***

## Properties

### `state: HttpServerState`

The current state of the server.

| State        | Description             |
| ------------ | ----------------------- |
| `"starting"` | The server is starting. |
| `"running"`  | The server is running.  |
| `"stopping"` | The server is stopping. |
| `"stopped"`  | The server is stopped.  |

***

### `port: number | null`

The port number the server is listening on.
If the server is not running, this value is `null`.

***

### `isIPv4: boolean`

Indicates whether the server is listening on an IPv4 address.
If `false`, the server may be using IPv6.

***

### `listenAddressIPv4: string | null`

The IPv4 address to listen on.
Only used when `forceIPv4` is set to `true`.

***

### `listenAddressIPv6: string | null`

The IPv6 address to listen on.
Only used when `forceIPv6` is set to `true`.

***

## Methods

### `registerHandler(path: string, handler: (request: HttpRequest) => HttpResponse): void`

Registers a handler for a specific request path.

**Parameters:**

| Name      | Type                                     | Description                                                             |
| --------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `path`    | `string`                                 | The route path (supports parameters, e.g., `/user/:id`).                |
| `handler` | `(request: HttpRequest) => HttpResponse` | The handler function that processes the request and returns a response. |

**Example:**

```ts
const server = new HttpServer()

server.registerHandler("/hello", (req) => {
  return HttpResponse.ok(HttpResponseBody.text("Hello, world!"))
})
```

***

### `registerFile(path: string, filePath: string): void`

Registers a single static file for a specific path.

**Parameters:**

| Name       | Type     | Description                   |
| ---------- | -------- | ----------------------------- |
| `path`     | `string` | The HTTP request path.        |
| `filePath` | `string` | The local file path to serve. |

**Example:**

```ts
server.registerFile("/readme", Path.join(Script.directory, "README.md"))
```

Accessing `/readme` in the browser returns the file content.

***

### `registerFilesFromDirectory(path: string, directory: string, options?: { defaults?: string[] }): void`

Registers a directory of static files to serve.

**Parameters:**

| Name               | Type       | Description                                                                                    |
| ------------------ | ---------- | ---------------------------------------------------------------------------------------------- |
| `path`             | `string`   | The URL path template, e.g., `/static/:file`.                                                  |
| `directory`        | `string`   | The directory path to serve from.                                                              |
| `options.defaults` | `string[]` | Default files to serve if no filename is provided (default: `["index.html", "default.html"]`). |

**Example:**

```ts
server.registerFilesFromDirectory("/static/:file", Path.join(Script.directory, "html"), {
  defaults: ["index.html", "index.htm"]
})
```

When accessing `/static/`, the server automatically serves the default index file.

***

### `registerWebsocket(path: string, handlers: WebSocketHandlers): void`

Registers a WebSocket handler for the specified path.

**Parameters:**

| Name       | Type                | Description                            |
| ---------- | ------------------- | -------------------------------------- |
| `path`     | `string`            | The WebSocket endpoint path.           |
| `handlers` | `WebSocketHandlers` | The WebSocket event handler functions. |

**WebSocketHandlers type definition:**

```ts
interface WebSocketHandlers {
  onPong?: (session: WebSocketSession) => void
  onConnected?: (session: WebSocketSession) => void
  onDisconnected?: (session: WebSocketSession) => void
  handleText?: (session: WebSocketSession, text: string) => void
  handleBinary?: (session: WebSocketSession, data: Data) => void
}
```

**Example:**

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

***

### `start(options?: { port?: number; forceIPv4?: boolean }): string | null`

Starts the HTTP server.

**Parameters:**

| Name                | Type      | Description                                                                                      |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------ |
| `options.port`      | `number`  | The port to listen on (default: `8080`). If `0` is specified, a random available port is chosen. |
| `options.forceIPv4` | `boolean` | Whether to force IPv4 listening (default: `false`).                                              |

**Returns:**

- Returns `null` if the server starts successfully.
- Returns an error message string if the server fails to start.

**Example:**

```ts
const error = server.start({ port: 8080 })
if (error) {
  console.error("Failed to start:", error)
} else {
  console.log("Server running on port:", server.port)
}
```

***

### `stop(): void`

Stops the HTTP server and releases its resources.

**Example:**

```ts
server.stop()
console.log("Server stopped")
```

***

## Type Definitions

### `HttpServerState`

```ts
type HttpServerState = "starting" | "running" | "stopping" | "stopped"
```

***

### `WebSocketSession`

Represents a live WebSocket connection.

**Methods:**

| Method                    | Description                           |
| ------------------------- | ------------------------------------- |
| `writeText(text: string)` | Sends a text message to the client.   |
| `writeData(data: Data)`   | Sends a binary message to the client. |
| `close()`                 | Closes the connection.                |

***

## Full Example

Below is a complete example of a working HTTP + WebSocket server:

```ts
const server = new HttpServer()

// Register a simple HTTP route
server.registerHandler("/api/hello", (req) => {
  return HttpResponse.ok(HttpResponseBody.text("Hello from Scripting Server"))
})

// Serve static files from a directory
server.registerFilesFromDirectory("/public/:file", Path.join(Script.directory, "html"))

// WebSocket chat example
server.registerWebsocket("/chat", {
  onConnected: (session) => {
    console.log("Client connected")
    session.writeText("Welcome to the chat")
  },
  handleText: (session, text) => {
    console.log("Received:", text)
    session.writeText("You said: " + text)
  }
})

// Start the server
const error = server.start({ port: 8080 })
if (error) {
  console.error("Server failed to start:", error)
} else {
  console.log("HTTP Server started on port:", server.port)
}
```
