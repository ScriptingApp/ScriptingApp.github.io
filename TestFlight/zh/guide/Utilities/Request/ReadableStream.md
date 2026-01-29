# 可读流

`ReadableStream` 表示一个 **可读的数据流（data stream）**，用于逐步读取数据而不是一次性加载全部内容。
在 **Scripting app** 中，`ReadableStream<Data>` 通常用于：

- 处理网络响应中的流式数据（如 `Response.body`）
- 实现大文件的分块读取或实时下载
- 支持长连接或持续推送的数据（如 SSE、分块 JSON、日志流）

与标准 Web API 一致，Scripting 的 `ReadableStream` 允许异步迭代（`for await...of`）以及通过读取器 (`ReadableStreamDefaultReader`) 手动读取流内容。

***

## 定义

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

## 基本概念

- `ReadableStream` 代表一个“流式可消费的数据源”。
- 它不会立即持有全部数据，而是按需从源（网络、文件、生成器等）获取。
- 每个流只能由一个读取器（reader）读取，一旦被锁定 (`locked = true`)，必须释放或取消后才能再次读取。

***

## 属性说明

### `locked: boolean`

指示当前流是否已被读取器（reader）锁定。
若为 `true`，则其他代码无法再调用 `getReader()` 或消费该流。

#### 示例

```tsx
const reader = response.body.getReader()
console.log(response.body.locked) // true
```

***

## 方法说明

### `getReader(): ReadableStreamDefaultReader<T>`

返回一个 `ReadableStreamDefaultReader` 实例，用于逐步读取流中的数据块（chunk）。
每次调用 `reader.read()` 会返回一个 Promise，解析为 `{ value, done }` 对象。

#### 示例

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

取消流的读取操作。
传入的 `reason` 可用于描述取消原因。

#### 示例

```tsx
const reader = response.body.getReader()
await response.body.cancel("User aborted reading")
```

***

### `tee(): [ReadableStream<T>, ReadableStream<T>]`

将当前流复制成两个新的流。
每个分支都可独立消费数据，但需注意内存开销。

#### 示例

```tsx
const [stream1, stream2] = response.body.tee()

const reader1 = stream1.getReader()
const reader2 = stream2.getReader()
```

***

## ReadableStreamDefaultReader（读取器）

当通过 `getReader()` 获取读取器后，你可以手动控制数据的读取过程。

### 读取器定义

```ts
interface ReadableStreamDefaultReader<T> {
  read(): Promise<{ value: T; done: boolean }>
  releaseLock(): void
  cancel(reason?: any): Promise<void>
}
```

#### 方法说明：

| 方法                  | 说明                                                           |
| ------------------- | ------------------------------------------------------------ |
| **read()**          | 读取下一个数据块（chunk），返回 `{ value, done }`。当 `done = true` 时，流已结束。 |
| **releaseLock()**   | 释放读取器，使流可被其他消费者重新读取。                                         |
| **cancel(reason?)** | 取消流读取。                                                       |

#### 示例：读取响应流数据

```tsx
const reader = response.body.getReader()

while (true) {
  const { done, value } = await reader.read()
  if (done) break

  // 处理每个 Data 对象（chunk）
  const text = value.toRawString()
  console.log("Chunk:", text)
}

reader.releaseLock()
```

***

## 与 `Response` 的关系

`Response.body` 属性是一个 `ReadableStream<Data>`，可用于流式读取响应内容。

### 示例：实时处理网络响应

```tsx
const response = await fetch("https://example.com/stream")

const reader = response.body.getReader()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  console.log("Received:", value.toRawString())
}
```

这种方式可在 **响应尚未完全结束时** 实时处理部分数据，非常适合：

- 实时日志输出
- 大文件下载进度控制
- AI/LLM 流式生成内容（如 ChatGPT 的逐字输出）

***

## 与 `Data` 的关系

在 `Scripting` 中，流的每个块（chunk）通常是一个 `Data` 实例。
你可以使用 `Data` 提供的方法（如 `.toRawString()`、`.toUint8Array()`）读取或转换二进制内容。

#### 示例：将流数据保存到文件

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

## 示例：使用异步迭代器读取流

`ReadableStream` 支持异步迭代 (`for await...of`)，可简化读取逻辑：

```tsx
for await (const chunk of response.body) {
  console.log("Chunk size:", chunk.size)
}
```

此语法会自动处理 `done` 状态，代码更简洁直观。

***

## 使用场景

| 场景           | 示例                            |
| ------------ | ----------------------------- |
| **大文件下载**    | 按块读取网络响应并写入本地文件，避免内存占用过大。     |
| **AI 输出流接收** | 实时接收服务器的推送内容（如 ChatGPT 流式响应）。 |
| **本地流式处理**   | 对本地文件或输入流实现增量读取或实时处理。         |

***

## 注意事项

- **单次锁定**：一个 `ReadableStream` 在被读取器锁定后，不能被多个消费者同时读取。
- **内存管理**：流式处理有助于降低内存占用，但应及时释放或取消读取器以防资源泄漏。
- **错误处理**：读取过程中出现错误（如网络断开）会导致 `read()` Promise 拒绝，应使用 `try...catch` 捕获。
- **Data 类型约定**：在 `Response.body` 中，流的每个块类型为 `Data`，而不是普通字符串或字节数组。

***

## 小结

`ReadableStream` 是 **Scripting 数据流架构的核心组件**，为开发者提供了高效的流式数据读取方式：

- 支持异步逐块读取
- 可与 `fetch()`、`Response`、`Data` 无缝集成
- 适用于实时处理、分块下载、长连接流等高级场景
- 完全兼容 Web 标准的 Streams API
