**Scripting** 让您可通过 TypeScript 脚本创建交互式 **Intents**。该应用封装了 SwiftUI 视图，允许用户构建动态 UI，并与 iOS 分享面板（share sheet）和 Shortcuts 应用进行集成。

## 概览

使用 **Scripting**，用户可以通过在 `intent.tsx` 文件中编写 TypeScript 来创建 **Intents**，从而与 iOS 的分享面板（share sheet）和 Shortcuts 无缝集成，为用户提供自定义体验。

创建 UI 并处理 Intent 所需的所有 API 和视图都可以从 `"scripting"` 包中导入。

## 创建 Intents

要创建一个 iOS Intent：
1. **创建新的 Script Project**：在 **Scripting** 中创建一个新的脚本项目（Script Project）。
2. **添加 `intent.tsx` 文件**：在此文件中定义该 Intent 的逻辑和 UI。
3. **配置 Supported Inputs（支持的输入）**：
   - **Intent Settings**：在编辑器标题栏中点击项目名称，进入 **Intent Settings**。
   - **Supported Input Types**：可选择 text、image、file URL 和 URL 等作为输入类型。

### 访问输入

在 `intent.tsx` 中，可使用以下 API 访问用户传递的输入：

- **`Intent.shortcutParameter`**：快捷指令传递过来的参数，你可以通过`Intent.shortcutParameter.type`来检测数据类型，并通过`Intent.shortcutParameter.value`访问数据
- **`Intent.textsParameter`**：文本输入的数组
- **`Intent.imagesParameter`**：图片输入的数组
- **`Intent.fileURLsParameter`**：文件 URL 的数组
- **`Intent.urlsParameter`**：URL 输入的数组

### 返回结果

要向调用方返回结果：
- 使用 **`Script.exit()`** 方法，并传入一个 **IntentValue** 作为参数。例如：

  ```tsx
  import { Script, Intent } from "scripting"

  Script.exit(
    Intent.text("some text")
    // Intent.json({key: "value"})
    // Intent.url("https://example.com")
    // Intent.file("/path/to/file")
  )
  ```

### 显示 UI 组件

若需在返回结果之前基于输入展示 UI，可创建一个 function component 并使用 **`Navigation.present()`**。由于 `Navigation.present()` 返回一个 Promise，为避免内存泄漏，需妥善处理该 Promise。可将功能包装在一个 `async` 函数中，并在最后调用 `Script.exit()`。

示例：

```tsx
import { Intent, Script, Navigation, VStack, Text } from "scripting"

function MyIntentView() {
  return (
    <VStack>
      <Text>{Intent.textsParameter[0]}</Text>
    </VStack>
  )
}

async function run() {
  await Navigation.present({
    element: <MyIntentView />
  })
  Script.exit() // 不返回任何内容
}

run()
```

## 在分享面板（Share Sheet）中使用 Intents

当脚本配置为支持特定输入类型（如 text、image、URL 或 file URL）后，**Scripting** 将与 iOS 分享面板（share sheet）集成，让用户可快速处理选定内容：

1. **Share Sheet 访问**：当用户在 Safari 等应用中选定文本并打开分享面板，如果存在可处理该类型输入的 Intent，**Scripting** 会出现在可选操作中。
2. **从分享面板运行脚本**：
   - 在分享面板中点击 **Run Script**（运行脚本）。
   - **Scripting** 会列出支持所选输入类型的脚本项目，例如在 Safari 中选择文本时，会展示所有可接收文本输入的脚本。
   - 选择所需的脚本，脚本将使用所选输入运行。

## 与 Shortcuts 集成

1. **添加一个 Shortcut**：在 Shortcuts 应用中，新建一个快捷指令（Shortcut），然后选择 **Scripting**。
2. **选择一个 Action**：
   - **"Run Script"**：执行脚本但不显示 UI。
   - **"Run Script in App"**：执行脚本并可显示 UI。
3. **配置该 Action**：在 Action 的配置界面中，选择要运行的脚本项目。

### 示例工作流程

1. 对需要展示 UI 的 Intents，选择 **"Run Script in App"**。
2. **配置 Inputs 和 Actions**：快捷指令会调用 `intent.tsx` 并传入定义好的输入。