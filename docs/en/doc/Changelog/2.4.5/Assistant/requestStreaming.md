---
title: requestStreaming
tag: PRO
---

`requestStreaming` requests a **streaming response** from the Assistant.
Instead of returning a complete result at once, the Assistant emits **chunks incrementally** as the model generates output.

This enables:

* Real-time UI updates (typing effect)
* Low-latency handling of long responses
* Progressive rendering of results
* Streaming logs and intermediate output handling

The API returns a **`ReadableStream<StreamChunk>`**, which can be consumed using `for await ... of`.

---

## API Definition

```ts
function requestStreaming(options: {
  systemPrompt?: string | null
  messages: MessageItem | MessageItem[]
  provider?: Provider
  modelId?: string
}): Promise<ReadableStream<StreamChunk>>
```

---

## Parameters

### options.systemPrompt (optional)

* Type: `string | null`
* Specifies the system prompt for this request.
* If omitted:

  * The default Assistant system prompt is used.
* If provided:

  * It **fully replaces** the default system prompt.
  * Assistant Tools are **not available**.

Typical use cases:

* Defining a strict role (e.g. reviewer, translator, summarizer)
* Enforcing output tone or behavior
* Running the model without built-in tools

---

### options.messages

* Type: `MessageItem | MessageItem[]`
* Required
* Represents the conversation context sent to the model.

#### MessageItem

```ts
type MessageItem = {
  role: "user" | "assistant"
  content: MessageContent | MessageContent[]
}
```

* `role`

  * `"user"`: user input
  * `"assistant"`: previous assistant messages (for context)

---

### MessageContent Types

#### Text

```ts
type MessageTextContent =
  | string
  | { type: "text"; content: string }
```

---

#### Image

```ts
type MessageImageContent = {
  type: "image"
  content: string // data:image/...;base64,...
}
```

---

#### Document

```ts
type MessageDocumentContent = {
  type: "document"
  content: {
    mediaType: string
    data: string // base64
  }
}
```

---

### options.provider (optional)

* Type: `Provider`
* Specifies the AI provider.
* If omitted, the currently configured default provider is used.
* Supported values:

  * `"openai"`
  * `"gemini"`
  * `"anthropic"`
  * `"deepseek"`
  * `"openrouter"`
  * `{ custom: string }`

---

### options.modelId (optional)

* Type: `string`
* Specifies the model ID.
* Must match a model actually supported by the selected provider.
* If omitted, the provider’s default model is used.

---

## Return Value

```ts
Promise<ReadableStream<StreamChunk>>
```

Once resolved, you receive a stream that can be consumed asynchronously.

---

## StreamChunk Types

The stream may emit the following chunk types.

---

### StreamTextChunk

```ts
type StreamTextChunk = {
  type: "text"
  content: string
}
```

* Represents user-visible generated text.
* Multiple chunks concatenated form the final response.

---

### StreamReasoningChunk

```ts
type StreamReasoningChunk = {
  type: "reasoning"
  content: string
}
```

* Represents intermediate reasoning produced by the model.
* Availability and granularity depend on the provider and model.

---

### StreamUsageChunk

```ts
type StreamUsageChunk = {
  type: "usage"
  content: {
    totalCost: number | null
    cacheReadTokens: number | null
    cacheWriteTokens: number | null
    inputTokens: number
    outputTokens: number
  }
}
```

Notes:

* Typically emitted once near the end of the stream.
* Some providers may omit certain fields.
* `totalCost` may be `null` if the provider does not expose pricing data.

---

## Examples

### Example 1: Basic streaming request

```ts
const stream = await Assistant.requestStreaming({
  messages: {
    role: "user",
    content: "Tell me a short science fiction story."
  },
  provider: "openai"
})

let result = ""

for await (const chunk of stream) {
  if (chunk.type === "text") {
    result += chunk.content
    console.log(chunk.content)
  }
}
```

---

### Example 2: Handling text, reasoning, and usage separately

```ts
const stream = await Assistant.requestStreaming({
  systemPrompt: "You are a precise technical writing assistant.",
  messages: [
    {
      role: "user",
      content: "Explain what HTTP/3 is."
    }
  ]
})

let answer = ""
let reasoningLog = ""
let usage = null

for await (const chunk of stream) {
  switch (chunk.type) {
    case "text":
      answer += chunk.content
      break

    case "reasoning":
      reasoningLog += chunk.content
      break

    case "usage":
      usage = chunk.content
      break
  }
}

console.log(answer)
console.log(usage)
```

---

### Example 3: Streaming with document input

```ts
const stream = await Assistant.requestStreaming({
  messages: [
    {
      role: "user",
      content: [
        { type: "text", content: "Summarize the key points of this document." },
        {
          type: "document",
          content: {
            mediaType: "application/pdf",
            data: "JVBERi0xLjQKJcfs..."
          }
        }
      ]
    }
  ],
  provider: "anthropic"
})

for await (const chunk of stream) {
  if (chunk.type === "text") {
    console.log(chunk.content)
  }
}
```

---

## Usage Notes and Best Practices

* Streams must be consumed **sequentially**; do not read concurrently.
* For UI scenarios:

  * Render `text` chunks immediately.
  * Keep `reasoning` for debugging or developer modes.
  * Process `usage` after completion.
* If you no longer need the output, stop consuming the stream to avoid unnecessary cost.
* Not all providers/models emit `reasoning` or `usage`.
* Do not assume a chunk represents a complete sentence; chunk sizes vary.
