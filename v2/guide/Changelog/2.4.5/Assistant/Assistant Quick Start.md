# Assistant Quick Start

The Assistant API in Scripting provides three distinct capabilities, each designed for a different type of use case: **structured data**, **streaming output**, and **interactive conversations**.

Before choosing an API, first decide **what kind of result you need**.

***

## Assistant API Overview

| Category         | Main APIs                                                        | Best For                         |
| ---------------- | ---------------------------------------------------------------- | -------------------------------- |
| Structured Data  | `requestStructuredData`                                          | Extracting predictable JSON data |
| Streaming Output | `requestStreaming`                                               | Real-time text generation        |
| Conversations    | `startConversation` / `present` / `dismiss` / `stopConversation` | Fully managed chat UI            |

***

## requestStructuredData

**Purpose**
Requests **strictly structured JSON output** that conforms to a provided schema.

**Best suited for**

- Parsing receipts, invoices, and bills
- Extracting fields from natural language
- Generating configuration or rule objects
- Any output that must be consumed by program logic

**Key characteristics**

- Stable and predictable output
- No streaming or incremental updates
- Ideal for background or headless scenarios

**In one sentence**

> If you need **data**, use `requestStructuredData`.

***

## requestStreaming

**Purpose**
Requests **streaming output**, allowing you to receive content incrementally as the model generates it.

**Best suited for**

- Typing-effect UI
- Long-form content generation
- Low-latency user feedback

**Key characteristics**

- Emits text, reasoning, and usage chunks
- Can be rendered progressively
- Output is not guaranteed to be structured

**In one sentence**

> If you need **real-time output**, use `requestStreaming`.

***

## Conversation APIs

**Related methods**

- `startConversation`
- `present`
- `dismiss`
- `stopConversation`

**Purpose**
Creates and presents a **system-hosted Assistant chat experience**.

**Best suited for**

- ChatGPT-style interactions
- Multi-turn conversations
- Scenarios where the system manages UI, streaming, and provider switching

**Key characteristics**

- Built-in chat UI
- Streaming handled automatically
- Only one active conversation at a time

**In one sentence**

> If you need a **full chat experience**, use the Conversation APIs.

***

## How to Choose the Right API

### Common Scenarios

- **Parse a receipt →** `requestStructuredData`
- **Show AI writing text live →** `requestStreaming`
- **Open a chat interface for users →** Conversation APIs
- **No UI, just results →** `requestStructuredData` or `requestStreaming`
- **Let the system manage the chat UI →** Conversation APIs

***

## Minimal Examples

### Structured Data

```ts
const result = await Assistant.requestStructuredData(...)
```

***

### Streaming Output

```ts
const stream = await Assistant.requestStreaming(...)
for await (const chunk of stream) {
  // handle chunk
}
```

***

### Conversation

```ts
await Assistant.startConversation({
  message: "Hello",
  autoStart: true
})
await Assistant.present()
```

***

## Usage Tips

- Do not mix Conversation APIs with `requestStreaming` in the same flow
- Prefer `requestStructuredData` whenever output must be consumed as data
- Use streaming or conversations for presentation-focused scenarios

***

## Next Steps

For deeper details, refer to:

- `requestStructuredData` – detailed schema-driven data extraction
- `requestStreaming` – streaming behavior and chunk handling
- Conversation APIs – lifecycle and interaction patterns
