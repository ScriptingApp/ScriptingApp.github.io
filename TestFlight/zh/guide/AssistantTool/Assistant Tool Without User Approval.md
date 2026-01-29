# 无需用户批准的 Assistant Tool

无需 Approval 的 Assistant Tool 通常用于**低风险、无副作用或纯逻辑处理类能力**，可被 Assistant 直接调用并立即执行。

***

## 一、适用场景与设计边界

在选择“无需 Approval”实现方式前，应明确以下设计原则。

### 适合使用无需 Approval 的场景

- 不涉及任何系统权限或隐私数据
- 不读取或修改用户的敏感信息
- 不会对用户产生不可逆的影响
- 纯计算、纯解析、纯生成类任务

常见示例包括：

- 文本或代码格式化
- 结构化数据解析（JSON / YAML / CSV 等）
- 根据输入参数生成模板代码
- 在脚本编辑器中做安全、可预测的文件修改（如补全注释）

***

### 不适合使用无需 Approval 的场景

- 访问定位、照片、联系人、日历等隐私能力
- 写入或覆盖用户文件，且无法回滚
- 会触发系统弹窗或权限请求
- 行为结果不易被用户预期

上述场景应使用 **需要 Approval 的 Assistant Tool**（见文档3）。

***

## 二、assistant\_tool.json 配置

无需 Approval 的工具在配置文件中必须明确声明：

```json
{
  "displayName": "Format Script",
  "id": "format_script",
  "description": "Formats the current script files according to the project style.",
  "icon": "wand.and.stars",
  "color": "systemIndigo",
  "parameters": [],
  "requireApproval": false,
  "autoApprove": false,
  "scriptEditorOnly": true
}
```

### 关键字段说明

- `requireApproval: false`
  表示该工具执行时不会弹出用户批准对话框。

- `autoApprove`
  在此模式下通常无实际意义，可设置为 `false`。

- `scriptEditorOnly`
  决定该工具是否仅在脚本编辑器中可用。
  若为 `true`，执行函数将接收到 `ScriptEditorProvider`。

***

## 三、执行函数注册方式

无需 Approval 的工具只需要注册一个执行函数：

```ts
AssistantTool.registerExecuteTool<P>(executeFn)
```

对应的函数类型为：

```ts
type AssistantToolExecuteFn<P> = (
  params: P,
  scriptEditorProvider?: ScriptEditorProvider
) => Promise<{
  success: boolean
  message: string
}>
```

***

## 四、最小实现示例（无参数）

```ts
type FormatParams = {}

const formatScript: AssistantToolExecuteFn<FormatParams> = async (
  params,
  scriptEditorProvider
) => {
  if (!scriptEditorProvider) {
    return {
      success: false,
      message: "This tool can only be used inside the script editor."
    }
  }

  const files = scriptEditorProvider.getAllFiles()

  for (const file of files) {
    const content = await scriptEditorProvider.getFileContent(file)
    if (!content) continue

    const formatted = content.trim()
    await scriptEditorProvider.updateFileContent(file, formatted)
  }

  return {
    success: true,
    message: "All script files have been formatted successfully."
  }
}

const testFormatTool = AssistantTool.registerExecuteTool(formatScript)
```

***

## 五、带参数的实现示例

### 参数定义

```ts
type ReplaceParams = {
  searchText: string
  replaceText: string
}
```

### 执行逻辑

```ts
const replaceInScripts: AssistantToolExecuteFn<ReplaceParams> = async (
  params,
  scriptEditorProvider
) => {
  if (!scriptEditorProvider) {
    return {
      success: false,
      message: "Script editor context is required."
    }
  }

  const files = scriptEditorProvider.getAllFiles()
  let affectedFiles = 0

  for (const file of files) {
    const content = await scriptEditorProvider.getFileContent(file)
    if (!content) continue

    if (!content.includes(params.searchText)) continue

    const updated = content.replaceAll(
      params.searchText,
      params.replaceText
    )

    await scriptEditorProvider.updateFileContent(file, updated)
    affectedFiles++
  }

  return {
    success: true,
    message: `Replaced text in ${affectedFiles} file(s).`
  }
}

AssistantTool.registerExecuteTool(replaceInScripts)
```

***

## 六、返回结果（message）的设计规范

执行函数返回的 `message` 是 **Assistant 后续推理与回复的输入**，应遵循以下建议：

- 第一行给出明确的结果摘要
- 避免返回冗长、未结构化的内容
- 必要时用多行文本或轻量标签结构化信息

推荐模式：

```text
Operation completed successfully.
Affected files: 3
```

或：

```text
Replaced content summary:
<files>3</files>
<search>foo</search>
<replace>bar</replace>
```

***

## 七、错误处理建议

- 所有可预期错误应转化为 `{ success: false, message }`
- 不要抛出未捕获异常
- 错误信息应可读、可定位问题，但避免泄露内部实现细节

示例：

```ts
return {
  success: false,
  message: "Invalid parameters: searchText cannot be empty."
}
```

***

## 八、进度反馈（可选）

对于耗时较长的工具，可使用：

```ts
AssistantTool.report("Formatting file: index.tsx")
```

建议仅在关键阶段调用，避免频繁上报。

***

## 九、测试函数的使用

`registerExecuteTool` 返回的测试函数可直接在脚本编辑器中运行：

```ts
testFormatTool({})
```

测试函数的作用包括：

- 验证参数是否正确映射
- 验证逻辑执行是否符合预期
- 在无需 Assistant 会话的情况下调试工具

***

## 十、最佳实践总结

- 无需 Approval ≠ 无风险，谨慎评估工具影响
- 尽量让工具行为**可预测、可重复**
- 避免隐式副作用和隐藏修改
- 返回信息应服务于 Assistant 的下一步决策
