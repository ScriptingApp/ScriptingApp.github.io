---
title: 快速了解智能助手
description: 快速掌握智能助手的使用。
tag: PRO
---

Scripting 的 Assistant API 提供了三类能力，分别面向 **数据处理**、**流式输出** 和 **交互式聊天** 三种不同使用场景。
在使用之前，建议先明确你的需求属于哪一类。

---

## Assistant API 分类总览

| API 分类 | 主要方法                                                             | 适用场景                   |
| ------ | ---------------------------------------------------------------- | ---------------------- |
| 结构化数据  | `requestStructuredData`                                          | 从文本 / 图片中提取结构化 JSON 数据 |
| 流式生成   | `requestStreaming`                                               | 实时展示 AI 输出内容           |
| 会话聊天   | `startConversation` / `present` / `dismiss` / `stopConversation` | 托管式聊天体验                |

---

## requestStructuredData

**用途**
用于请求**严格符合 JSON Schema 的结构化结果**。

**适合场景**

* 解析票据、发票、账单
* 从自然语言中提取字段
* 生成配置、规则、表单数据
* 需要直接用于程序逻辑的数据

**特点**

* 返回值稳定、可预测
* 不适合长文本或展示型输出
* 适合后台或无 UI 场景

**一句话总结**

> 需要“数据”，用 `requestStructuredData`

---

## requestStreaming

**用途**
用于获取**流式输出**，在模型生成过程中持续接收内容。

**适合场景**

* 聊天气泡逐字显示
* 长文本生成（文章、说明、分析）
* 需要低延迟反馈的 UI

**特点**

* 支持文本、推理、用量等多种 Chunk
* 可边生成边渲染
* 不保证输出结构

**一句话总结**

> 需要“过程”和“实时展示”，用 `requestStreaming`

---

## Conversation API（会话聊天）

**相关方法**

* `startConversation`
* `present`
* `dismiss`
* `stopConversation`

**用途**
用于创建并展示一个**系统托管的 Assistant 聊天页面**。

**适合场景**

* 类 ChatGPT 的交互体验
* 用户需要多轮对话
* 希望系统管理 UI、Provider 切换、消息状态

**特点**

* 内置完整聊天 UI
* 自动处理流式输出
* 同一时间仅支持一个会话

**一句话总结**

> 需要“完整聊天体验”，用 Conversation API

---

## 如何选择合适的 API

### 常见选择指南

* **我要解析一张账单 →** `requestStructuredData`
* **我要展示 AI 写文章的过程 →** `requestStreaming`
* **我要打开一个聊天页面让用户和 AI 对话 →** Conversation API
* **我不需要 UI，只要结果 →** `requestStructuredData` 或 `requestStreaming`
* **我希望系统帮我处理聊天 UI →** Conversation API

---

## 简单示例

### 结构化数据

```ts
const data = await Assistant.requestStructuredData(...)
```

---

### 流式输出

```ts
const stream = await Assistant.requestStreaming(...)
for await (const chunk of stream) {
  // handle chunk
}
```

---

### 聊天会话

```ts
await Assistant.startConversation({ message: "你好", autoStart: true })
await Assistant.present()
```

---

## 使用建议

* 不要在同一业务流程中混用 Conversation API 和 `requestStreaming`
* 有明确数据结构需求时，优先选择 `requestStructuredData`
* 展示型输出和交互体验优先考虑 `requestStreaming` 或 Conversation API

---

## 下一步

如果你需要更深入的内容，可以继续阅读：

* `requestStructuredData` 详细文档
* `requestStreaming` 详细文档
* Conversation API 生命周期说明
