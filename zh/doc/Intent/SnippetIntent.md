# SnippetIntent PRO

SnippetIntent 是一种特殊类型的 AppIntent，可在 Shortcuts 中生成原生的 Snippet UI 卡片。它适用于：

- 多步骤表单式交互
- 从 Shortcuts 中获取用户输入
- 键值选择、确认、展示结果等轻量级交互
- 在 Shortcuts 工作流中内嵌 UI 组件

SnippetIntent 特点如下：

1. 在 Scripting 中必须通过 `AppIntentManager.register` 注册
2. `protocol` 必须为 `AppIntentProtocol.SnippetIntent`
3. `perform()` 必须返回一个 `VirtualNode`（TSX UI）
4. 在脚本中必须以 `Intent.snippetIntent()` 封装后返回
5. Shortcuts 必须使用「Show Snippet Intent」动作才能显示 Snippet UI

***

# 系统要求

**SnippetIntent 只能在 iOS 26 及以上系统运行。**

在 iOS 26 以下环境：

- 无法调用 `Intent.snippetIntent`
- 无法使用 `Intent.requestConfirmation`
- Shortcuts 中不存在「Show Snippet Intent」动作
- SnippetIntent 类型的 AppIntent 不会被 Shortcuts 正常识别

***

# 注册 SnippetIntent（app\_intents.tsx）

在 `app_intents.tsx` 中声明 SnippetIntent：

```tsx
export const PickColorIntent = AppIntentManager.register<void>({
  name: "PickColorIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async () => {
    return <PickColorView />
  }
})
```

再例如：

```tsx
export const ShowResultIntent = AppIntentManager.register({
  name: "ShowResultIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async ({ content }: { content: string }) => {
    return <ResultView content={content} />
  }
})
```

要求：

- `protocol` 必须为 `AppIntentProtocol.SnippetIntent`
- `perform()` 必须返回 `VirtualNode`
- 与普通 AppIntent 区别在于返回的是 UI，而非数据

***

# SnippetIntent 返回值封装：Intent.snippetIntent

SnippetIntent 不能直接作为 JS 返回值，必须通过 `Intent.snippetIntent()` 包装成 `IntentSnippetIntentValue`。

```tsx
const snippetValue = Intent.snippetIntent({
  value: Intent.text("Some value returning for Shortcuts"),
  snippetIntent: ShowResultIntent({
    content: "Example Text"
  })
})

Script.exit(snippetValue)
```

### 类型定义

```ts
type SnippetIntentValue = {
  value?: IntentAttributedTextValue | IntentFileURLValue | IntentJsonValue | IntentTextValue | IntentURLValue | IntentFileValue | null
  snippetIntent: AppIntent<any, VirtualNode, AppIntentProtocol.SnippetIntent>
}

declare class IntentSnippetIntentValue extends IntentValue<
  'SnippetIntent',
  SnippetIntentValue
> {
  value: SnippetIntentValue
  type: 'SnippetIntent'
}
```

封装的返回值可被 Shortcuts 的「Show Snippet Intent」动作识别并展示 UI。

***

# Snippet 确认界面：Intent.requestConfirmation

SnippetIntent 支持在执行逻辑中先请求用户确认某个操作。此能力同样基于 iOS 26。

```ts
Intent.requestConfirmation(
  actionName: ConfirmationActionName,
  intent: AppIntent<any, VirtualNode, AppIntentProtocol.SnippetIntent>,
  options?: {
    dialog?: Dialog;
    showDialogAsPrompt?: boolean;
  }
): Promise<void>
```

### ConfirmationActionName

这些名称会影响 Shortcuts UI 中呈现的文案，例如 “Set …”、“Add …”、“Toggle …” 等。

示例值：

```
"add" | "addData" | "book" | "buy" | "call" | "checkIn" | 
"continue" | "create" | "do" | "download" | "filter" |
"find" | "get" | "go" | "log" | "open" | "order" |
"pay" | "play" | "playSound" | "post" | "request" |
"run" | "search" | "send" | "set" | "share" |
"start" | "startNavigation" | "toggle" | "turnOff" |
"turnOn" | "view"
```

### 示例

```tsx
await Intent.requestConfirmation(
  "set",
  PickColorIntent()
)
```

效果：

- Shortcuts 弹出 PickColorIntent 对应的 Snippet UI
- 用户点击确认后 Promise resolve
- 用户取消时脚本执行终止

***

# Shortcuts 的「Show Snippet Intent」动作（iOS 26+）

Shortcuts 在 iOS 26 新增动作：

**Show Snippet Intent**

用于展示 SnippetIntent 返回的 Snippet UI。

### 与其他动作对比

| Shortcuts 动作                 | 显示界面                 | 支持 SnippetIntent | 场景               |
| ---------------------------- | -------------------- | ---------------- | ---------------- |
| Run Script                   | 无 UI                 | 否                | 纯数据处理            |
| Run Script in App            | Scripting App UI（前台） | 否                | 大型 UI、文件选择等      |
| Show Snippet Intent（iOS 26+） | Snippet 卡片 UI        | 是                | SnippetIntent 场景 |

使用方式：

1. 在 Shortcuts 中添加「Show Snippet Intent」
2. 选择脚本项目（需包含 intent.tsx）
3. 脚本返回 `Intent.snippetIntent(...)`
4. Shortcuts 显示 Snippet UI

***

# IntentMemoryStorage — 跨 AppIntent 状态共享

## 1. 为什么需要 IntentMemoryStorage

由于系统行为，每次 Intent 执行后：

- AppIntent 的 `perform()` 执行完毕后立即销毁上下文
- `intent.tsx` 执行完并调用 `Script.exit()` 后脚本上下文也会完全释放

因此无法依赖 JS 变量在多个 Intent 之间保持状态。

例如：

- PickColorIntent（选择颜色）
- SetColorIntent（设置颜色）
- ShowResultIntent（展示颜色结果）

在这些 Intent 之间共享状态必须依赖持久化存储。

## 2. IntentMemoryStorage 提供轻量级、跨 Intent 的共享存储

API 定义：

```ts
namespace IntentMemoryStorage {
  function get<T>(key: string): T | null
  function set(key: string, value: any): void
  function remove(key: string): void
  function contains(key: string): boolean
  function clear(): void
  function keys(): string[]
}
```

用途：

- 存储小量状态，例如当前颜色、当前步骤、临时选项
- 在多个 AppIntent 之间共享数据
- 生命周期跨 Intent 调用，但随脚本生命周期管理

### 示例：存储用户颜色选择

```ts
IntentMemoryStorage.set("color", "systemBlue")

const color = IntentMemoryStorage.get<Color>("color")
```

### 建议

- 不要存储大型数据（如大图像、长文本）
- 大型数据请使用：

  - `Storage`（持久键值存储）
  - `FileManager` 写入 appGroupDocumentsDirectory

IntentMemoryStorage 适合作为临时状态共享，不适合当作数据库使用。

***

# 完整示例（iOS 26+）

## app\_intents.tsx

```tsx
export const SetColorIntent = AppIntentManager.register({
  name: "SetColorIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async (color: Color) => {
    IntentMemoryStorage.set("color", color)
  }
})

export const PickColorIntent = AppIntentManager.register<void>({
  name: "PickColorIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async () => {
    return <PickColorView />
  }
})

export const ShowResultIntent = AppIntentManager.register({
  name: "ShowResultIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async ({ content }: { content: string }) => {
    const color = IntentMemoryStorage.get<Color>("color") ?? "systemBlue"
    return <ResultView content={content} color={color} />
  }
})
```

## intent.tsx

```tsx
async function runIntent() {

  // 1. 通过 Snippet 请求用户确认颜色
  await Intent.requestConfirmation(
    "set",
    PickColorIntent()
  )

  // 2. 从 Shortcuts 输入中读取文本
  const textContent =
    Intent.shortcutParameter?.type === "text"
      ? Intent.shortcutParameter.value
      : "No text parameter from Shortcuts"

  // 3. 创建 SnippetIntent 返回结果
  const snippetIntentValue = Intent.snippetIntent({
    snippetIntent: ShowResultIntent({ content: textContent })
  })

  Script.exit(snippetIntentValue)
}

runIntent()
```
