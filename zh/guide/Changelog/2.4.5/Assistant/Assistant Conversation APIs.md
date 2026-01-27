# 智能助手会话 API

Conversation API 用于**启动、控制和展示一个由系统托管的 Assistant 对话会话**。
该会话对应一个**完整的聊天页面（Chat Page）**，由 Scripting App 统一管理 UI、状态和模型交互。

与 `requestStreaming` / `requestStructuredData` 的区别在于：

- Conversation API 面向**交互式聊天体验**
- 系统负责消息发送、流式输出、Provider 切换、UI 渲染
- 开发者只需关注“何时开始 / 何时结束 / 是否展示”

***

## 会话生命周期概览

一个典型的会话生命周期如下：

1. `startConversation` —— 创建会话（可选自动开始）
2. `present` —— 展示 Assistant 聊天页面
3. 用户与 Assistant 进行交互
4. `dismiss` —— 临时关闭聊天页面（会话仍存在）
5. `present` —— 再次展示会话
6. `stopConversation` —— 结束会话并释放资源

重要约束：

- **同一时间只能存在一个活动会话**
- 若已有会话在运行，再次调用 `startConversation` 会抛出错误
- 调用 `stopConversation` 会自动触发 `dismiss`

***

## startConversation

### API 定义

```ts
function startConversation(options: {
  message: string
  images?: UIImage[]
  autoStart?: boolean
  systemPrompt?: string
  modelId?: string
  provider?: Provider
}): Promise<void>
```

***

### 参数说明

#### options.message

- 类型：`string`
- 必填
- 会话的**初始用户消息**
- 相当于聊天页面中的第一条用户输入

***

#### options.images（可选）

- 类型：`UIImage[]`
- 会与 `message` 一起作为首条用户消息发送
- 适用于：

  - 图片分析
  - 拍照 / 截图后直接发起对话

***

#### options.autoStart（可选）

- 类型：`boolean`
- 默认值：`false`

行为说明：

- `true`：

  - 创建会话后立即开始生成回复
- `false`：

  - 仅创建会话，不自动发送
  - 通常配合 `present` 使用，由用户点击发送

***

#### options.systemPrompt（可选）

- 类型：`string`

说明：

- 若未提供：

  - 使用 Scripting Assistant 内置 system prompt
  - Assistant Tools 可用
- 若提供：

  - 完全替换默认 system prompt
  - **Assistant Tools 将不可用**

适用场景：

- 构建高度定制的聊天角色
- 禁用工具调用，仅使用纯模型能力

***

#### options.modelId（可选）

- 类型：`string`
- 指定本次会话使用的模型
- 用户仍可在聊天页面中手动切换模型（若 UI 允许）

***

#### options.provider（可选）

- 类型：`Provider`
- 指定默认 Provider
- 用户可在聊天页面中更改 Provider（若 UI 允许）

***

### 返回值

```ts
Promise<void>
```

- 会话创建成功即 resolve
- 若已有会话存在，将 reject

***

## present

### API 定义

```ts
function present(): Promise<void>
```

***

### 行为说明

- 展示当前会话对应的 Assistant 聊天页面
- 若页面已展示，调用不会产生额外效果
- 可在以下场景调用：

  - `startConversation` 之后首次展示
  - `dismiss` 后重新展示同一会话

***

### 返回值

```ts
Promise<void>
```

- 当聊天页面被用户关闭时 resolve

***

## dismiss

### API 定义

```ts
function dismiss(): Promise<void>
```

***

### 行为说明

- 关闭 Assistant 聊天页面
- **不会终止会话**
- 会话状态、历史消息仍保留

适用场景：

- 临时让出界面空间
- 页面跳转或多任务切换

***

### 返回值

```ts
Promise<void>
```

- 页面成功关闭后 resolve

***

## stopConversation

### API 定义

```ts
function stopConversation(): Promise<void>
```

***

### 行为说明

- 彻底终止当前会话
- 自动调用 `dismiss`
- 清理会话状态与资源
- 结束后可再次调用 `startConversation` 创建新会话

***

### 返回值

```ts
Promise<void>
```

***

## 会话状态相关常量

### Assistant.isAvailable

```ts
const isAvailable: boolean
```

- 表示当前用户是否**具备使用 Assistant 的权限**
- 若为 `false`：

  - 所有 Conversation API 均不可用

***

### Assistant.isPresented

```ts
const isPresented: boolean
```

- 表示 Assistant 聊天页面当前是否处于展示状态

***

### Assistant.hasActiveConversation

```ts
const hasActiveConversation: boolean
```

- 表示当前是否存在一个活动会话
- 常用于防止重复调用 `startConversation`

***

## 使用示例

### 示例一：最常见的使用方式

```ts
await Assistant.startConversation({
  message: "帮我总结这篇文章的要点",
  autoStart: true
})

await Assistant.present()
```

***

### 示例二：创建会话但不自动发送

```ts
await Assistant.startConversation({
  message: "我们来讨论一下系统架构设计",
  autoStart: false
})

await Assistant.present()
// 由用户在 UI 中手动点击发送
```

***

### 示例三：暂时关闭，再次展示

```ts
await Assistant.startConversation({
  message: "分析这张图片",
  images: [image],
  autoStart: true
})

await Assistant.present()

// 用户关闭页面
await Assistant.dismiss()

// 稍后再次展示同一会话
await Assistant.present()
```

***

### 示例四：结束当前会话并重新开始

```ts
if (Assistant.hasActiveConversation) {
  await Assistant.stopConversation()
}

await Assistant.startConversation({
  message: "开始一个新的话题",
  autoStart: true
})

await Assistant.present()
```

***

## 使用建议与最佳实践

- 将 Conversation API 视为“**托管聊天界面**”
- 不要在同一业务流中混用 Conversation API 与 `requestStreaming`
- 在调用 `startConversation` 前检查 `hasActiveConversation`
- 若仅需要数据或一次性输出，应使用：

  - `requestStructuredData`
  - `requestStreaming`
- 若用户需要持续交互体验，应使用 Conversation API

***

## 设计边界说明

- Conversation API 不适合无 UI 场景
- 不适合后台自动化任务
- 不适合需要完全控制 Prompt / Token / 输出格式的场景
