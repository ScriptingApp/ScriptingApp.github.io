---
title: 需要用户批准的 Assistant Tool
description: 掌握如何实现需要用户批准的智能助手工具。
tag: PRO
---

在 Scripting 中实现 **需要用户批准（Approval）** 的 Assistant Tool。

这类工具通常涉及 **隐私、权限、数据修改或不可逆操作**，必须在执行前获得用户明确同意。

---

## 一、何时必须使用 Approval 模式

只要工具满足以下任一条件，就应使用 Approval 模式：

* 访问用户隐私数据（定位、照片、联系人、日历、健康数据等）
* 触发系统权限请求
* 修改、删除或批量写入用户文件
* 行为结果对用户具有长期或不可逆影响
* 用户有必要在执行前理解“将发生什么”

Approval 的核心目标是 **让用户知情并确认**。

---

## 二、assistant_tool.json 配置要求

需要 Approval 的工具必须在配置文件中声明：

```json
{
  "displayName": "Request Current Location",
  "id": "request_current_location",
  "description": "Requests the user's current location one time.",
  "icon": "location.fill",
  "color": "systemBlue",
  "parameters": [],
  "requireApproval": true,
  "autoApprove": true,
  "scriptEditorOnly": false
}
```

### 关键字段说明

* `requireApproval: true`
  表示工具执行前必须进入批准流程（弹出批准对话框或走自动批准逻辑）。

* `autoApprove`（重要：工具层面的自动批准许可开关）
  `autoApprove` 的含义是：**该工具是否允许被“自动批准”**。
  自动批准是否真的发生，取决于两个条件同时满足：

  * 用户在 **chat preset** 中开启了 “auto-approve tools / 自动批准工具”
  * 该工具在 `assistant_tool.json` 中配置了 `autoApprove: true`

  结论是：

  * 用户开启 auto-approve，但工具 `autoApprove: false` → **仍然必须弹窗让用户手动确认**
  * 工具 `autoApprove: true`，但用户没开启 auto-approve → **仍然必须弹窗让用户手动确认**
  * 用户开启 auto-approve 且工具 `autoApprove: true` → **工具会自动批准并直接执行**

* `scriptEditorOnly`
  决定该工具是否仅在脚本编辑器环境中可用。

---

## 三、Approval 的两阶段模型

需要 Approval 的 Assistant Tool 分为两个阶段：

1. **Approval Request 阶段**
   负责生成批准对话框内容（或用于自动批准时的“解释文本”）。

2. **Execute With Approval 阶段**
   在用户确认（或自动批准）后执行真实逻辑，并返回执行结果。

对应实现分别使用两个注册函数：

* `AssistantTool.registerApprovalRequest`
* `AssistantTool.registerExecuteToolWithApproval`

---

## 四、注册 Approval Request 函数

### 注册方式

```ts
AssistantTool.registerApprovalRequest<P>(requestFn)
```

### 函数签名

```ts
type AssistantToolApprovalRequestFn<P> = (
  params: P,
  scriptEditorProvider?: ScriptEditorProvider
) => Promise<{
  title?: string
  message: string
  previewButton?: {
    label: string
    action: () => void
  }
  primaryButtonLabel?: string
  secondaryButtonLabel?: string
}>
```

---

### Approval Request 的设计原则

* `message` 必须清晰描述“将要做什么”与“为什么需要批准”
* 文案面向用户表达，避免内部实现细节
* **此阶段不应执行任何有副作用的操作**
* 所有真实执行逻辑必须放在 execute 阶段

---

### 基本示例

```ts
const approvalRequest: AssistantToolApprovalRequestFn<{}> = async () => {
  return {
    message: "The assistant wants to request your current location.",
    primaryButtonLabel: "Allow",
    secondaryButtonLabel: "Cancel"
  }
}

AssistantTool.registerApprovalRequest(approvalRequest)
```

---

## 五、Preview Button 的使用场景

`previewButton` 用于在用户批准前展示“预期结果”，提升可预期性与信任度。

适合使用 preview 的场景：

* 文件修改（展示 diff）
* 批量编辑结果预览
* 将要导出的数据摘要

### 示例：展示文件 diff

```ts
const approvalRequest: AssistantToolApprovalRequestFn<{ path: string }> = async (
  params,
  editor
) => {
  if (!editor) {
    return { message: "This tool must be used in the script editor." }
  }

  const current = await editor.getFileContent(params.path)

  return {
    message: `The assistant wants to modify ${params.path}.`,
    primaryButtonLabel: "Apply Changes",
    secondaryButtonLabel: "Cancel",
    previewButton: {
      label: "Preview Diff",
      action: () => {
        if (current != null) {
          editor.openDiffEditor(params.path, current + "\n// New content")
        }
      }
    }
  }
}
```

---

## 六、注册 Execute With Approval 函数

### 注册方式

```ts
AssistantTool.registerExecuteToolWithApproval<P>(executeFn)
```

### 函数签名

```ts
type AssistantToolExecuteWithApprovalFn<P> = (
  params: P,
  userAction: UserActionForApprovalRequest,
  scriptEditorProvider?: ScriptEditorProvider
) => Promise<{
  success: boolean
  message: string
}>
```

---

## 七、userAction 的处理规范

```ts
type UserActionForApprovalRequest = {
  primaryConfirmed: boolean
  secondaryConfirmed: boolean
}
```

处理原则：

* 仅当 `primaryConfirmed === true` 时执行真实逻辑
* `secondaryConfirmed === true` 通常表示用户取消
* 两者都为 `false` 可视为未确认、关闭对话框或流程中断

### 示例：定位请求（含取消分支）

```ts
const executeWithApproval: AssistantToolExecuteWithApprovalFn<{}> = async (
  params,
  { primaryConfirmed }
) => {
  if (!primaryConfirmed) {
    return {
      success: false,
      message: "User cancelled the location request."
    }
  }

  try {
    const location = await Location.requestCurrent()
    return {
      success: true,
      message: [
        "User location retrieved successfully.",
        `<latitude>${location.latitude}</latitude>`,
        `<longitude>${location.longitude}</longitude>`
      ].join("\n")
    }
  } catch {
    return {
      success: false,
      message: "Failed to retrieve user location."
    }
  }
}
```

---

## 八、autoApprove 与 userAction 的关系（行为层面）

在“自动批准”真正发生时（用户 preset 开启 auto-approve 且工具 `autoApprove: true`）：

* 系统会跳过用户手动点击过程，直接进入 execute 阶段
* execute 阶段依然会收到 `userAction`，通常等价于“主按钮已确认”的语义（例如 `primaryConfirmed: true`）

因此，你的 execute 逻辑应始终以 `primaryConfirmed` 作为“是否允许执行”的唯一门槛，这样可以同时兼容：

* 用户手动点击 Allow
* 系统自动批准并执行
* 用户点击 Cancel 或未确认

---

## 九、scriptEditorProvider 在 Approval 模式下的使用

* 当 `scriptEditorOnly: true`：

  * approval request 和 execute 都会收到 `scriptEditorProvider`
  * 可用于 `openDiffEditor`、批量读写、lint 信息等

* 当 `scriptEditorOnly: false`：

  * `scriptEditorProvider` 可能为 `undefined`
  * 不应依赖编辑器能力

---

## 十、返回 message 的 UX 建议

需要 Approval 的工具，返回文案需要更明确：

* 用户取消：清晰说明已取消
* 成功：摘要 + 必要的结构化字段
* 失败：可操作建议（例如提示检查权限）

示例：

```text
Location request was cancelled by the user.
```

```text
Location retrieved successfully.
<latitude>39.9042</latitude>
<longitude>116.4074</longitude>
```

---

## 十一、测试函数的使用

注册后返回测试方法用于调试：

```ts
testApprovalFn({})
testExecuteFn({}, { primaryConfirmed: true, secondaryConfirmed: false })
```

它用于验证逻辑路径与返回值格式，不等同于真实 UI 批准流程。

---

## 十二、设计建议总结

* Approval 的本质是“知情 + 可控”
* `autoApprove` 是 **工具层面的允许自动批准开关**，必须与用户 preset 同时开启才会自动执行
* approval request 阶段只做说明与预览，不做副作用
* execute 阶段必须严格遵循 `primaryConfirmed` 才执行真实操作
* preview 对编辑器类工具非常关键：优先提供 diff/摘要预览
