---
title: Intent.requestConfirmation
description: 此方法暂停脚本执行，请求用户通过系统管理的确认 UI 确认动作。
tag: PRO
---

`Intent.requestConfirmation` 用于在脚本执行过程中，**向用户请求确认某项操作**。
调用后，系统会暂停脚本执行，并展示一个基于 **SnippetIntent 的 UI** 作为确认界面，同时可显示提示对话内容。

确认流程行为：

- 用户 **确认** → Promise resolve，脚本继续执行
- 用户 **取消** → 当前脚本终止执行
- 确认界面通过传入的 **SnippetIntent** 的 UI 定义
- 系统自动管理此流程，无需开发者处理 UI 呈现逻辑

**该 API 仅可在 iOS 26 及以上系统使用。**

---

##API 定义

```ts
function requestConfirmation(
  actionName: ConfirmationActionName,
  snippetIntent: AppIntent<any, VirtualNode, AppIntentProtocol.SnippetIntent>,
  options?: {
    dialog?: Dialog;
    showDialogAsPrompt?: boolean;
  },
): Promise<void>;
```

---

##参数说明

## actionName: ConfirmationActionName

用于告诉系统“要确认的行为语义是什么”，系统会根据该值生成自然语言文案。例如：

- `"set"` → “确定要设置…？”
- `"buy"` → “确定要购买…？”
- `"toggle"` → “是否切换…？”

可选值如下（与苹果 AppIntents 框架一致）：

```
"add" | "addData" | "book" | "buy" | "call" | "checkIn" |
"continue" | "create" | "do" | "download" | "filter" |
"find" | "get" | "go" | "log" | "open" | "order" |
"pay" | "play" | "playSound" | "post" | "request" |
"run" | "search" | "send" | "set" | "share" |
"start" | "startNavigation" | "toggle" | "turnOff" |
"turnOn" | "view"
```

选择合适的语义有助于提高确认界面的自然体验。

---

## snippetIntent: SnippetIntent

必须是一个 **注册为 SnippetIntent 类型的 AppIntent**：

```ts
AppIntent<any, VirtualNode, AppIntentProtocol.SnippetIntent>;
```

用户在确认界面中看到的内容就是该 SnippetIntent 的 `perform()` 返回的 UI，例如选项列表、内容预览等。

---

## `options?: { dialog?: Dialog; showDialogAsPrompt?: boolean }`

### dialog?: Dialog

用于在确认 UI 上方或系统对话框中显示提示文本。
支持四种格式：

```ts
type Dialog =
  | string
  | { full: string; supporting: string }
  | { full: string; supporting: string; systemImageName: string }
  | { full: string; systemImageName: string };
```

示例：

```ts
"是否继续？";
```

更复杂的：

```ts
{
  full: "确定要设置此颜色吗？",
  supporting: "此操作将更新应用的主题颜色。",
  systemImageName: "paintpalette"
}
```

用途：

- 解释确认动作含义
- 提醒用户可能产生的影响
- 提供更友好的交互上下文

---

### showDialogAsPrompt?: boolean

默认值：`true`
决定系统是否以「提示弹窗」方式显示对话文本。

设为 `false` 时，文本可能以更沉浸的方式显示在 Snippet 卡片内部。

---

##执行流程

调用 `await Intent.requestConfirmation(...)` 时脚本执行顺序如下：

1. 脚本暂停执行
2. 系统展示确认界面（SnippetIntent UI + 可选 dialog 文案）
3. 用户进行交互：
   - **确认** → Promise resolve，脚本继续
   - **取消** → 脚本终止执行

4. 不需要开发者手动关闭 UI

此流程完全由系统管理。

---

##使用场景

以下场景推荐使用 `requestConfirmation`：

- 修改重要设置（如主题颜色、隐私设置）
- 对数据执行有副作用的操作（如删除、更新、重置）
- 流程中一步需用户明确授权
- 启动某个需要用户选择的 UI 子流程（如颜色选择器、账号切换器）

不适用场景：

- 简单数据处理，不需要用户确认
- 可以在后台无 UI 完成的操作

---

##完整示例代码

以下示例展示如何使用 `requestConfirmation` 请求用户确认一次颜色选择，并在确认后继续执行脚本。

假设你已有两个 SnippetIntent：

- `PickColorIntent`：颜色选择 UI
- `ShowResultIntent`：结果展示 UI

## intent.tsx 示例

```tsx
import { Intent, Script } from "scripting";
import { PickColorIntent, ShowResultIntent } from "./app_intents";

async function runIntent() {
  // 第一步：请求用户确认颜色选择
  await Intent.requestConfirmation("set", PickColorIntent(), {
    dialog: {
      full: "确定要设置此颜色吗？",
      supporting: "此操作将更新应用的主题颜色。",
      systemImageName: "paintpalette",
    },
  });

  // 第二步：读取来自 Shortcuts 的输入（如果有）
  const text =
    Intent.shortcutParameter?.type === "text"
      ? Intent.shortcutParameter.value
      : "No text parameter from Shortcuts";

  // 第三步：呈现最终 SnippetIntent
  const snippet = Intent.snippetIntent({
    snippetIntent: ShowResultIntent({ content: text }),
  });

  Script.exit(snippet);
}

runIntent();
```

---

##注意事项与最佳实践

- **必须运行在 iOS 26+**
  提前检查系统版本或优雅降级。

- **总是提供清晰的 dialog 文案**
  确认行为应让用户理解，不应仅依赖 Snippet UI 本身。

- **用于重要或可逆性较差的操作**
  如修改设置、启动后台任务、提交数据等。

- **与 SnippetIntent 配合使用效果最佳**
  因为确认 UI 直接展示 SnippetIntent 的视图。

- **用户取消时脚本会被系统直接终止**
  不要在后续代码中假设脚本一定会继续执行。
