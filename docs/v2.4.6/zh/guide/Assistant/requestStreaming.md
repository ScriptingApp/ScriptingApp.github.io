---
title: 请求流式数据
description: 请求从智能助手获取流式响应。
tag: PRO
---

`requestStreaming` 用于向 Assistant 请求**流式输出（Streaming Response）**。
与一次性返回完整结果不同，该 API 会在模型生成内容的过程中**持续返回数据片段（Chunk）**，调用方可以边接收边处理，从而实现：

* 实时展示 AI 输出（打字机效果）
* 流式日志 / 分段结果处理
* 长文本生成的低延迟体验
* 在生成过程中提前终止或切换 UI 状态

该 API 返回的是一个 **`ReadableStream<StreamChunk>`**，你可以通过 `for await ... of` 逐块读取。

---

## API 定义

```ts
function requestStreaming(options: {
  systemPrompt?: string | null
  messages: MessageItem | MessageItem[]
  provider?: Provider
  modelId?: string
}): Promise<ReadableStream<StreamChunk>>
```

---

## 参数说明

### options.systemPrompt（可选）

* 类型：`string | null`
* 指定本次请求使用的 system prompt
* 若未提供：

  * 使用 Assistant 内置的默认 system prompt
* 若显式传入：

  * 将**完全替换默认 system prompt**
  * Assistant Tools 将**不可用**

适用场景：

* 构建专用角色（如代码审查、翻译、摘要）
* 严格约束模型行为或输出风格

---

### options.messages

* 类型：`MessageItem | MessageItem[]`
* 必填
* 用于描述对话上下文的消息列表

#### MessageItem 结构

```ts
type MessageItem = {
  role: "user" | "assistant"
  content: MessageContent | MessageContent[]
}
```

* `role`

  * `"user"`：用户输入
  * `"assistant"`：历史 Assistant 输出（用于上下文补全）

---

### MessageContent 类型

#### 文本内容

```ts
type MessageTextContent =
  | string
  | { type: "text"; content: string }
```

---

#### 图片内容

```ts
type MessageImageContent = {
  type: "image"
  content: string // data:image/...;base64,...
}
```

---

#### 文档内容

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

### options.provider（可选）

* 类型：`Provider`
* 指定使用的 AI Provider
* 若未指定：

  * 使用 Assistant 当前配置的默认 Provider
* 支持：

  * `"openai"`
  * `"gemini"`
  * `"anthropic"`
  * `"deepseek"`
  * `"openrouter"`
  * `{ custom: string }`

---

### options.modelId（可选）

* 类型：`string`
* 指定具体模型 ID
* 必须与 Provider 实际支持的模型匹配
* 若未指定，使用 Provider 默认模型

---

## 返回值

```ts
Promise<ReadableStream<StreamChunk>>
```

该 Promise resolve 后，你将获得一个可异步迭代的流对象。

---

## StreamChunk 类型说明

`requestStreaming` 的流中会返回以下三类 Chunk。

---

### StreamTextChunk（文本输出）

```ts
type StreamTextChunk = {
  type: "text"
  content: string
}
```

* 表示 Assistant 生成的**可展示文本**
* 多个 chunk 拼接后构成完整回复

---

### StreamReasoningChunk（推理输出）

```ts
type StreamReasoningChunk = {
  type: "reasoning"
  content: string
}
```

* 表示模型的**中间推理过程**
* 是否返回、返回粒度取决于 Provider / Model

---

### StreamUsageChunk（用量信息）

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

说明：

* 通常在流的**末尾**返回一次
* 不同 Provider 支持的字段略有差异
* `totalCost` 可能为 `null`（例如 Provider 未提供费用信息）

---

## 使用示例

### 示例一：最基本的流式请求

```ts
const stream = await Assistant.requestStreaming({
  messages: {
    role: "user",
    content: "给我讲一个简短的科幻故事"
  },
  provider: "openai"
})

let text = ""

for await (const chunk of stream) {
  if (chunk.type === "text") {
    text += chunk.content
    console.log(chunk.content)
  }
}
```

---

### 示例二：区分文本、推理和用量

```ts
const stream = await Assistant.requestStreaming({
  systemPrompt: "你是一个严谨的技术写作助手",
  messages: [
    {
      role: "user",
      content: "解释什么是 HTTP/3"
    }
  ]
})

let answer = ""
let reasoningLog = null
let usage = null

for await (const chunk of stream) {
  switch (chunk.type) {
    case "text":
      answer += chunk.content
      break

    case "reasoning":
      reasoningLog = (reasoningLog ?? "") + chunk.content
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

### 示例三：包含图片与文档的流式请求

```ts
const stream = await Assistant.requestStreaming({
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          content: "请分析这份文档的核心内容"
        },
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

## 使用建议与注意事项

* 流式结果**必须按顺序消费**，不可并发读取
* UI 场景下建议：

  * 文本 chunk 实时渲染
  * reasoning chunk 仅用于调试
  * usage chunk 延迟处理
* 若中途不再需要结果，应主动中止读取，避免无意义消耗
* 并非所有 Provider / Model 都会返回 reasoning 或 usage
* 不同 Provider 的 chunk 粒度不同，不应假设单次 chunk 是完整句子
