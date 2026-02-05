# AssistantTool 总览与工作流

Assistant Tool 是 Scripting 中提供给 Assistant 的“可扩展工具机制”。它让脚本作者把某些能力封装成结构化工具，由 Assistant 在对话中按需调用，并把执行结果以文本 `message` 的形式回传给 Assistant 继续推理和回复用户。

AssistantTool 的设计目标是两点：

- 让 Assistant 获得额外能力（例如定位、文件处理、项目内批量编辑、数据处理），但仍保持可控与可审计（尤其是敏感能力要走用户批准）。
- 让工具具备明确输入、明确输出和可测试性（注册函数返回 testFn）。

***

## AssistantTool 的两种执行类型

从实现角度，AssistantTool 有两条主路径，对应你 API 里的两个注册函数：

### 不需要用户批准（No Approval）

- `assistant_tool.json`：`requireApproval: false`
- 代码侧注册：

  - `AssistantTool.registerExecuteTool<P>(executeFn)`

适合：

- 不涉及隐私/权限/破坏性操作
- 纯计算、纯格式化、纯解析、纯生成内容
- 对用户设备状态没有敏感读取

### 需要用户批准（With Approval）

- `assistant_tool.json`：`requireApproval: true`
- 代码侧注册：

  - `AssistantTool.registerApprovalRequest<P>(requestFn)` 生成批准弹窗内容
  - `AssistantTool.registerExecuteToolWithApproval<P>(executeFn)` 在用户点按钮后执行

适合：

- 任何可能涉及隐私/权限（定位、照片、联系人、日历等）
- 可能修改用户数据、文件、或产生副作用的操作
- 希望用户先看预览再决定（`previewButton`）

> `autoApprove`：该工具是否允许被“自动批准”

***

## ScriptEditorOnly 模式（是否只在脚本编辑器可用）

`assistant_tool.json` 的 `scriptEditorOnly` 控制这个工具是否“仅限脚本编辑器环境”。

- `scriptEditorOnly: false`

  - 工具可在普通对话环境中被调用（面向终端用户）
  - `scriptEditorProvider` 通常不会提供

- `scriptEditorOnly: true`

  - 工具只在脚本编辑器里可用（面向脚本作者/开发者）
  - 执行函数会额外拿到 `scriptEditorProvider?: ScriptEditorProvider`
  - 用于“编辑器内工具”：批量修改文件、插入/替换内容、打开 diff、读取 lint 错误等

***

## 工具创建与文件结构

创建工具后，会生成两个核心文件：

- `assistant_tool.json`

  - 定义工具元信息、参数结构、是否需要批准、是否仅编辑器可用等
- `assistant_tool.tsx`

  - 编写工具逻辑，并用 `AssistantTool.register...` 系列函数注册

### assistant\_tool.json（元信息的职责边界）

`assistant_tool.json` 的职责是：

- 给 UI 展示用（displayName/icon/color/description）
- 给工具路由用（id 唯一标识）
- 给调用约束用（parameters/requireApproval/autoApprove/scriptEditorOnly）

它不承载执行逻辑，执行逻辑永远在 `assistant_tool.tsx` 里。

***

## 参数输入与类型约定

工具入参来自 `assistant_tool.json` 的 `parameters`，最终会以 `params: P` 传给：

- `AssistantToolApprovalRequestFn<P>(params, scriptEditorProvider?)`
- `AssistantToolExecuteWithApprovalFn<P>(params, userAction, scriptEditorProvider?)`
- `AssistantToolExecuteFn<P>(params, scriptEditorProvider?)`

这里的关键约定是：

- `P` 是你在 `assistant_tool.tsx` 里声明的参数类型（例如 `type MyParams = { ... }`）
- 实际运行时系统负责把 JSON 参数映射成 `params`
- 如果工具没有参数，则 `P = {}`

***

## Assistant 调用工具的典型流程

下面用“运行期”的视角描述一次完整链路（不包含 testFn）：

### A. Assistant 决定调用哪个工具

Assistant 在对话中基于目标任务和可用工具列表，选择某个 `id` 的工具，并构造参数 `params`。

### B. 如果 requireApproval = true

1. 系统调用 `registerApprovalRequest` 注册的 `requestFn(params, scriptEditorProvider?)`
2. requestFn 返回对话框内容：

   - `message`
   - 可选 `title`
   - 可选 `previewButton`（用于展示预期输出、diff、或摘要）
   - 可选按钮文案（primary/secondary）
3. 用户点击按钮后，系统得到 `UserActionForApprovalRequest`：

   - `primaryConfirmed`
   - `secondaryConfirmed`
4. 系统调用 `registerExecuteToolWithApproval` 注册的 `executeFn(params, userAction, scriptEditorProvider?)`
5. executeFn 返回 `{ success, message }` 给 Assistant

### C. 如果 requireApproval = false

1. 系统直接调用 `registerExecuteTool` 注册的 `executeFn(params, scriptEditorProvider?)`
2. executeFn 返回 `{ success, message }` 给 Assistant

***

## message 的返回约定（给 Assistant 的“工具输出协议”）

执行函数统一返回：

```ts
{
  success: boolean
  message: string
}
```

建议把 `message` 当成“可被 Assistant 继续消费的结构化文本”，常见策略：

- 简单场景：直接自然语言描述结果
- 需要结构化：用轻量标记（你示例里用 `<latitude>...</latitude>`）
- 需要多段信息：用换行拼接，第一行做摘要，后续提供字段

不建议在 `message` 返回超长原始内容（例如整项目所有文件内容），更推荐返回摘要 + 指引（或让用户在 UI 中通过 diff/preview 看）。

***

## 测试函数（testFn）的用途与边界

每个注册函数都会返回一个 testFn，用于“在脚本编辑器中模拟调用”：

- `registerApprovalRequest` → `AssistantToolApprovalRequestTestFn<P>`
- `registerExecuteToolWithApproval` → `AssistantToolExecuteWithApprovalTestFn<P>`
- `registerExecuteTool` → `AssistantToolExecuteTestFn<P>`

testFn 的价值：

- 快速验证参数映射是否正确
- 验证工具逻辑是否按预期返回 `success/message`
- 在开发阶段不依赖真实 Assistant 对话触发

***

## report(message) 的定位

`AssistantTool.report(message: string, id?: string)` 用于在工具执行期间上报过程信息（例如“正在读取文件…/正在生成 diff…/正在请求定位…”）。`id`参数用于更新已有的报告，如果你的报告是流式生成的，这个参数很有用。

建议用法：

- 长耗时任务：阶段性 report，提升可感知性
- 与 UI/日志结合：便于调试与回溯
- 不要高频刷屏：只在关键阶段上报
