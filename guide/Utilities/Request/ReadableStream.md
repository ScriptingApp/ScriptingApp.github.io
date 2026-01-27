# ReadableStream

`ReadableStream` represents a **stream of data** that can be read incrementally rather than all at once.
In **Scripting**, `ReadableStream<Data>` is used in various scenarios, including:

- Handling **streaming HTTP responses** (e.g., `Response.body`)
- **Chunked file downloads** or large data transfers
- **Real-time data streams** such as logs, AI model output, or event streams

It follows the same behavior as the standard **Web Streams API**, allowing asynchronous iteration (`for await...of`) and manual reading via a `ReadableStreamDefaultReader`.

***

## Definition

```ts
class ReadableStream<T = any> {
  constructor(underlyingSource?: UnderlyingSource<T>)

  get locked(): boolean
  cancel(reason?: any): Promise<void>
  getReader(): ReadableStreamDefaultReader<T>
  tee(): [ReadableStream<T>, ReadableStream<T>]
}
```

***

## Overview

- A `ReadableStream` represents a **data source that can be consumed asynchronously**.
- Instead of loading the entire payload into memory, data is read **in chunks** as it becomes available.
- Only one active reader can consume a stream at a time. When locked (`locked = true`), no other consumer can access it until released or canceled.

***

## Properties

### `locked: boolean`

Indicates whether the stream is currently locked to a reader.
If `true`, you must release the lock or cancel the stream before another reader can be created.

#### Example

```tsx
const reader = response.body.getReader()
console.log(response.body.locked) // true
```

***

## Methods

### `getReader(): ReadableStreamDefaultReader<T>`

Returns a `ReadableStreamDefaultReader` that allows manual, incremental reading of stream data.
Each call to `reader.read()` returns a Promise resolving to an object `{ value, done }`.

#### Example

```tsx
const reader = response.body.getReader()

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  console.log("Received chunk:", value)
}
```

***

### `cancel(reason?: any): Promise<void>`

Cancels reading from the stream.
Optionally provide a `reason` describing why the operation was aborted.

#### Example

```tsx
const reader = response.body.getReader()
await response.body.cancel("User canceled reading")
```

***

### `tee(): [ReadableStream<T>, ReadableStream<T>]`

Splits a stream into two identical branches that can be consumed independently.

#### Example

```tsx
const [stream1, stream2] = response.body.tee()

const reader1 = stream1.getReader()
const reader2 = stream2.getReader()
```

***

## ReadableStreamDefaultReader

When you obtain a reader using `getReader()`, you can manually control the reading process.

### Definition

```ts
interface ReadableStreamDefaultReader<T> {
  read(): Promise<{ value: T; done: boolean }>
  releaseLock(): void
  cancel(reason?: any): Promise<void>
}
```

#### Method Descriptions

| Method              | Description                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| **read()**          | Reads the next data chunk. Resolves with `{ value, done }`. When `done = true`, the stream has ended. |
| **releaseLock()**   | Releases the lock so the stream can be read again by another consumer.                                |
| **cancel(reason?)** | Cancels reading from the stream.                                                                      |

#### Example — Reading Stream Data

```tsx
const reader = response.body.getReader()

while (true) {
  const { done, value } = await reader.read()
  if (done) break

  // Each chunk is a Data instance
  const text = value.toRawString()
  console.log("Chunk:", text)
}

reader.releaseLock()
```

***

## Integration with Response

The `Response.body` property is a `ReadableStream<Data>` that allows streaming response content.

#### Example — Handling Streaming Network Response

```tsx
const response = await fetch("https://example.com/stream")

const reader = response.body.getReader()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  console.log("Received:", value.toRawString())
}
```

This method enables real-time data processing **before the full response is received**, ideal for:

- Real-time log streaming
- Progressive file downloads
- AI or LLM text generation (token streaming)

***

## Integration with Data

In Scripting, each stream chunk (`value`) is a `Data` object.
You can use the `Data` APIs such as `.toRawString()` or `.toUint8Array()` to inspect or transform the content.

#### Example — Save Stream Data to a File

```tsx
const reader = response.body.getReader()
const chunks: Data[] = []

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  chunks.push(value)
}

const fileData = Data.combine(chunks)
FileManager.write(fileData, "/local/download.bin")
```

***

## Using Async Iteration

`ReadableStream` supports async iteration (`for await...of`), simplifying data consumption syntax:

```tsx
for await (const chunk of response.body) {
  console.log("Chunk size:", chunk.size)
}
```

This approach automatically handles the `done` condition for you, resulting in cleaner code.

***

## Common Use Cases

| Use Case                         | Example                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------- |
| **Large File Download**          | Stream file chunks from the network and save locally without high memory usage. |
| **AI Output Streaming**          | Display real-time model output as it’s generated.                               |
| **Incremental Local Processing** | Process local files or streams incrementally.                                   |

***

## Notes

- **Single-reader rule:** Only one reader can consume a `ReadableStream` at a time.
- **Memory efficiency:** Streaming avoids loading large payloads entirely into memory.
- **Error handling:** Reading may reject on errors (e.g., network failure). Use `try...catch` to handle exceptions safely.
- **Chunk type:** For `Response.body`, each chunk is a `Data` object — not plain text or byte arrays.

***

## Summary

`ReadableStream` is a **core component of Scripting’s streaming data architecture**, providing efficient and flexible data handling capabilities.

### Key Features

- Asynchronous, incremental data reading
- Seamless integration with `fetch()`, `Response`, and `Data`
- Supports real-time processing and large data transfers
- Fully compatible with the standard **Web Streams API**
