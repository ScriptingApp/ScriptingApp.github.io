---
title: 智能助手工具
tag: PRO
---

Assistant Tool 是 Scripting 应用中为智能助手（Assistant）提供系统功能扩展的机制。通过定义和实现 Assistant Tool，开发者可以为 Assistant 提供设备能力访问、文件读写操作、数据分析处理等辅助功能，提升 Assistant 的智能性和实用性。

本文以一个示例工具「Request Current Location」为基础，介绍 Assistant Tool 的完整实现流程，包括工具创建、配置文件说明、执行逻辑实现以及各类函数的详细说明。

---

## 一、工具创建流程

1. 打开任意脚本项目，在文件管理界面点击“添加 Assistant Tool”按钮。
2. 在弹出的配置窗口中填写Assistant Tool 相关的信息。

3. 点击“保存”后，系统会自动在脚本中生成两个文件：

- `assistant_tool.json`：描述工具的元数据和参数信息。
- `assistant_tool.tsx`：实现工具的执行逻辑。

---

## 二、配置文件 assistant_tool.json

该文件用于声明工具的基本信息和行为配置。以下是示例内容及字段说明：

```json
{
  "displayName": "Request Current Location",
  "id": "request_current_location",
  "description": "This tool allows you to request the one-time delivery of the latitude and longitude of the user’s current location.",
  "icon": "location.fill",
  "color": "systemBlue",
  "parameters": [],
  "requireApproval": true,
  "autoApprove": true,
  "scriptEditorOnly": false
}
```

### 字段说明：

| 字段 | 类型 | 说明 |
|------|------|------|
| `displayName` | string | 工具在界面中显示的名称 |
| `id` | string | 工具唯一标识符，不能重复 |
| `description` | string | 工具功能描述 |
| `icon` | string | 使用的 SF Symbols 图标名 |
| `color` | string | 工具主色调 |
| `parameters` | array | 工具需要的参数（为空表示无输入） |
| `requireApproval` | boolean | 是否需要用户批准 |
| `autoApprove` | boolean | 是否支持 Assistant 自动批准 |
| `scriptEditorOnly` | boolean | 工具是否仅能在脚本编辑器中使用 |

---

## 三、执行逻辑 assistant_tool.tsx 实现示例

```tsx
type RequestCurrentLocationParams = {}

const locationApprovalRequest: AssistantToolApprovalRequestFn<RequestCurrentLocationParams> = async (
  params,
) => {
  return {
    message: "The assistant wants to request your current location.",
    primaryButtonLabel: "Allow"
  }
}

const requestCurrentLocation: AssistantToolExecuteWithApprovalFn<RequestCurrentLocationParams> = async (
  params,
  {
    primaryConfirmed,
    secondaryConfirmed,
  }
) => {
  try {
    const location = await Location.requestCurrent()
    if (location) {
      return {
        success: true,
        message: [
          "The user's current location info:",
          `<latitude>${location.latitude}</latitude>`,
          `<longitude>${location.longitude}</longitude>`
        ].join("\n")
      }
    }
    return {
      success: false,
      message: "Failed to request user's current location, ask user to check the device's location permission."
    }
  } catch {
    return {
      success: false,
      message: "Failed to request user's current location, ask user to check the device's location permission."
    }
  }
}

const testRequestLocationApprovalFn = AssistantTool.registerApprovalRequest(
  locationApprovalRequest
)

const testRequestLocationExecuteFn = AssistantTool.registerExecuteToolWithApproval(
  requestCurrentLocation
)

// 可在脚本编辑器中运行以下测试代码：
testRequestLocationApprovalFn({})
testRequestLocationExecuteFn({}, {
  primaryConfirmed: true,
  secondaryConfirmed: false
})
```

---

## 四、AssistantTool 注册函数详解

### 1. `registerApprovalRequest`

注册一个函数，在执行工具前向用户请求批准。

```ts
function registerApprovalRequest<P>(
  requestFn: AssistantToolApprovalRequestFn<P>
): AssistantToolApprovalRequestTestFn<P>
```

**参数说明**：

- `requestFn(params, scriptEditorProvider?)`：返回提示信息，包括 message、按钮文本等。
- `params`：工具执行时的输入参数。
- `scriptEditorProvider`：仅在工具设置为仅限脚本编辑器使用时可用，提供脚本文件访问能力。

**返回值说明**：

返回的测试函数可用于在脚本编辑器中模拟触发批准请求。

---

### 2. `registerExecuteToolWithApproval`

注册一个需要用户批准的执行函数。

```ts
function registerExecuteToolWithApproval<P>(
  executeFn: AssistantToolExecuteWithApprovalFn<P>
): AssistantToolExecuteWithApprovalTestFn<P>
```

**参数说明**：

- `params`：工具执行时的输入参数。
- `userAction`：用户在批准提示中选择的操作：

```ts
type UserActionForApprovalRequest = {
  primaryConfirmed: boolean
  secondaryConfirmed: boolean
}
```

- `scriptEditorProvider`：同上。

**返回值说明**：

返回一个对象：

```ts
{
  success: boolean
  message: string
}
```

- `success`: 是否执行成功。
- `message`: 返回给Assistant的执行成功或失败的信息。

---

### 3. `registerExecuteTool`

注册一个不需要用户批准的工具逻辑。

```ts
function registerExecuteTool<P>(
  executeFn: AssistantToolExecuteFn<P>
): AssistantToolExecuteTestFn<P>
```

**适用场景**：如操作无敏感性、不涉及设备权限时，可使用此方式。

---

### 4. 测试函数使用

每个注册函数会返回对应的测试函数，可在脚本中运行：

```ts
testApprovalRequestFn({ ...params })
testExecuteFn({ ...params }, {
  primaryConfirmed: true,
  secondaryConfirmed: false,
})
testExecuteToolFn({ ...params })
```

---

## 五、脚本编辑器接口说明（ScriptEditorProvider）

当工具设置为 `scriptEditorOnly: true` 时，系统提供 `ScriptEditorProvider` 接口，允许访问脚本项目的文件系统与语法信息。

接口能力包括：

- 文件读写（读取、更新、写入、插入、替换）
- 差异比较（openDiffEditor）
- 语法检查结果（getLintErrors）
- 获取项目中所有文件/文件夹列表

适用于如格式化脚本、批量修改内容等编辑类工具。

---

## 六、执行与用户体验流程

1. Assistant 在会话中判断是否需要调用某个工具。
2. 如果工具设置为需要批准，系统弹出批准对话框：
   - 显示由 `registerApprovalRequest` 返回的提示信息。
   - 用户点击“允许”后执行工具逻辑。
3. 执行结果通过 `message` 字段返回给 Assistant，并可呈现给用户。

---

## 七、无需批准的工具实现方式

当不需要显示批准提示时，可直接使用 `registerExecuteTool` 注册逻辑函数：

```ts
AssistantTool.registerExecuteTool<MyParams>(async (params) => {
  // 执行逻辑
  return {
    success: true,
    message: "Tool executed successfully."
  }
})
```

将 `assistant_tool.json` 中的 `requireApproval` 字段设置为 `false` 即可。

---

## 八、小结

Assistant Tool 是 Scripting 应用提供的可扩展能力模块，支持用户授权、文件操作、系统调用等多种场景。开发流程主要包括：

1. 在脚本项目中创建工具；
2. 配置工具元信息；
3. 实现逻辑函数并注册；
4. 使用测试函数验证行为；
5. 在 Assistant 会话中自动或主动触发执行。