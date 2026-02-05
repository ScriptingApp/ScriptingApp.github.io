# 处理用户主动取消智能助手工具

为提升长时间运行工具的用户体验，AssistantTool 新增了 **用户主动取消（Cancel）** 支持。
当用户在工具执行过程中点击“取消”时，开发者可以选择性地通过 `onCancel` 回调返回已完成的部分结果；如果未实现该回调，系统会自动处理取消逻辑，开发者无需额外处理。

该机制适用于搜索、分析、爬取、批处理、流式生成等耗时或多阶段工具。

***

## 能力概述

新增能力包含以下 API：

```ts
type OnCancel = () => string | null | undefined

var onCancel: OnCancel | null | undefined

const isCancelled: boolean
```

***

## 核心语义说明

### onCancel 是可选实现

- 开发者可以选择实现 `onCancel`
- 不实现 `onCancel` 也是完全正确、被官方支持的用法

当开发者没有设置 `onCancel` 时：

- 用户点击“取消”
- 工具会被系统标记为已取消
- 执行函数后续返回的任何结果都会被系统忽略
- Assistant 不会消费这些返回值

结论是，开发者无需为“用户取消”编写任何额外逻辑，也不会产生错误行为。

***

### 实现 onCancel 的目的

实现 `onCancel` 的唯一目的，是在用户取消时主动返回“已经完成的部分结果”，以提升用户体验。

这是一种增强能力，而不是强制要求。

***

## isCancelled 的语义

- `AssistantTool.isCancelled` 在用户取消后立即变为 `true`
- 该值在执行函数内随时可读取
- 用于控制是否继续执行后续步骤、循环或资源占用操作

***

## onCancel 的注册时机

`onCancel` 必须在工具的执行函数内部注册。

原因包括：

- 工具执行完成后，系统会自动将 `onCancel` 设为 `null`
- 每次执行都是独立的生命周期
- 在执行函数外注册不会生效

可注册的位置包括：

- `registerExecuteTool`
- `registerExecuteToolWithApproval`

***

## 不实现 onCancel 的最小示例

```ts
const executeTool = async () => {
  await doSomethingSlow()

  return {
    success: true,
    message: "Operation completed."
  }
}
```

行为说明：

- 用户点击取消后，工具被系统判定为已取消
- 上述返回结果会被自动忽略
- 不需要额外判断或清理逻辑

***

## 实现 onCancel 并返回部分结果的示例

```ts
const executeTool = async () => {
  const partialResults: string[] = []

  AssistantTool.onCancel = () => {
    return [
      "Operation was cancelled by the user.",
      "Partial results:",
      ...partialResults
    ].join("\n")
  }

  for (const item of items) {
    if (AssistantTool.isCancelled) break
    const result = await process(item)
    partialResults.push(result)
  }

  return {
    success: true,
    message: partialResults.join("\n")
  }
}
```

行为说明：

- 用户取消时，`onCancel` 会被立即调用
- 已完成的 `partialResults` 会作为 message 返回给 Assistant
- 后续执行通过 `isCancelled` 判断及时停止

***

## 典型使用场景

适合实现 `onCancel` 的工具类型包括：

- 多源搜索与聚合
- 多篇文章抓取与解析
- 项目级扫描与分析
- 批量计算或生成任务
- 长时间运行的推理流程

不适合或不需要实现 `onCancel` 的场景包括：

- 瞬时完成的工具
- 没有中间结果的操作
- 取消后没有任何可返回内容的任务

***

## onCancel 的返回值规范

`onCancel` 的返回值含义如下：

- 返回 `string`
  该字符串会作为工具被取消时返回给 Assistant 的 `message`

- 返回 `null` 或 `undefined`
  表示不返回任何消息，属于合法行为，但通常不推荐

推荐的实践是：

- 明确说明工具已被用户取消
- 若返回部分结果，清楚标注为“Partial results / 已完成部分”

***

## 与 Approval 流程的关系

- `onCancel` 发生在执行阶段
- 不影响 Approval Request 阶段
- 适用于手动批准与 autoApprove 自动批准后的执行过程

需要区分的两个概念：

- `secondaryConfirmed`
  表示用户在批准阶段拒绝或取消执行

- `onCancel`
  表示用户在执行过程中中途取消

***

## 常见错误与注意事项

### 在执行函数外注册 onCancel

这是无效的用法，因为执行上下文已经结束。

***

### 在 onCancel 中执行耗时或副作用操作

`onCancel` 应快速返回，不应发起网络请求、文件写入或其他副作用操作。

***

### 忽略 isCancelled 继续执行

即使实现了 `onCancel`，也应在长流程中显式检查 `isCancelled`，避免在取消后继续消耗资源。

***

## 推荐的执行结构

```ts
const executeTool = async () => {
  const partial = []

  AssistantTool.onCancel = () => {
    return formatPartialResult(partial)
  }

  for (const item of items) {
    if (AssistantTool.isCancelled) break
    const r = await process(item)
    partial.push(r)
  }

  return {
    success: true,
    message: formatFinalResult(partial)
  }
}
```

***

## 总结

- 用户取消是一种正常的用户行为，而不是异常
- `onCancel` 是一种可选的体验增强能力
- 不实现 `onCancel` 不会破坏工具行为
- 系统会自动忽略取消后的执行结果
- 实现 `onCancel` 只是为了更优雅地收尾
