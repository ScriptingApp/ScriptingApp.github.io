---
title: 快速开始

---

Scripting 支持通过 `intent.tsx` 文件创建 iOS Intents，实现脚本与系统分享扩展（Share Sheet）和快捷指令（Shortcuts）的深度集成。你可以接收来自用户的文本、图片、文件和 URL 等输入，并返回结果供调用方使用。通过 UI 展示、数据处理与结果返回，可构建灵活且强大的自动化流程。

---

## 一、创建和配置 Intent

### 1. 创建 Intent 脚本

1. 在 Scripting 中新建一个脚本项目。
2. 添加名为 `intent.tsx` 的文件，并编写处理逻辑和可选的 UI 组件。

### 2. 配置支持的输入类型

点击编辑器顶部标题栏中的项目名称，打开 **Intent 设置页面**，选择该脚本支持的输入类型，如：

* 文本（Text）
* 图片（Image）
* 文件路径（File URL）
* URL

配置后，该脚本就能在分享扩展或 Shortcuts 中处理相应类型的数据。

---

## 二、处理输入数据

在 `intent.tsx` 中，可通过以下 API 访问用户传入的数据：

| 属性名                        | 说明                                       |
| -------------------------- | ---------------------------------------- |
| `Intent.shortcutParameter` | Shortcuts 中传入的单个参数，包含 `.type` 和 `.value` |
| `Intent.textsParameter`    | 文本字符串数组                                  |
| `Intent.urlsParameter`     | URL 字符串数组                                |
| `Intent.imagesParameter`   | 图片数组（UIImage 实例）                         |
| `Intent.fileURLsParameter` | 文件路径数组（本地 URL）                           |

示例：

```ts
if (Intent.shortcutParameter) {
  if (Intent.shortcutParameter.type === "text") {
    console.log(Intent.shortcutParameter.value)
  }
}
```

---

## 三、返回结果

使用 `Script.exit(result)` 结束脚本执行并返回结果给调用方，例如 Shortcuts 或另一个脚本。支持的返回类型包括：

* 文本：`Intent.text(value)`
* 富文本：`Intent.attributedText(value)`
* URL：`Intent.url(value)`
* JSON 数据：`Intent.json(value)`
* 文件路径：`Intent.file(value)` 或 `Intent.fileURL(value)`

示例：

```ts
import { Script, Intent } from "scripting"

Script.exit(Intent.text("处理完成"))
```

---

## 四、展示交互式 UI

你可以使用 `Navigation.present()` 呈现一个自定义界面，展示输入信息或收集用户反馈。在 UI 交互结束后调用 `Script.exit()` 返回结果。

示例：

```ts
import { Intent, Script, Navigation, VStack, Text } from "scripting"

function MyIntentView() {
  return (
    <VStack>
      <Text>{Intent.textsParameter?.[0]}</Text>
    </VStack>
  )
}

async function run() {
  await Navigation.present(<MyIntentView />)
  Script.exit()
}

run()
```

---

## 五、在分享扩展中使用

当脚本项目启用了对应类型的输入支持，Scripting 会自动集成到系统分享菜单：

1. 用户选中内容（如 Safari 中的文字或图片），点击分享按钮。
2. 分享列表中选择 **Scripting**。
3. 显示支持当前输入类型的脚本列表，供用户执行。

---

## 六、与 Shortcuts 集成

你可以在 Shortcuts 应用中调用 Scripting 脚本：

* **运行脚本（Run Script）**：后台执行，无 UI。
* **在 App 中运行脚本（Run Script in App）**：前台执行，支持 UI 展示。

操作步骤：

1. 在 Shortcuts 中添加 “Run Script” 或 “Run Script in App” 操作。
2. 选择目标脚本。
3. 配置参数，执行脚本。

---

## 七、Intent API 参考

### `Intent` 类属性

| 属性                  | 类型                  | 说明                                    |
| ------------------- | ------------------- | ------------------------------------- |
| `shortcutParameter` | `ShortcutParameter` | Shortcuts 传入的参数对象，包含 `type` 和 `value` |
| `textsParameter`    | `string[]`          | 文本输入数组                                |
| `urlsParameter`     | `string[]`          | URL 字符串数组                             |
| `imagesParameter`   | `UIImage[]`         | 图片数组（路径或图片对象）                         |
| `fileURLsParameter` | `string[]`          | 文件路径数组（本地 URL）                        |

### `Intent` 类方法

| 方法                             | 返回类型                        | 示例                                    |
| ------------------------------ | --------------------------- | ------------------------------------- |
| `Intent.text(value)`           | `IntentTextValue`           | `Intent.text("内容")`                   |
| `Intent.attributedText(value)` | `IntentAttributedTextValue` | `Intent.attributedText("富文本")`        |
| `Intent.url(value)`            | `IntentURLValue`            | `Intent.url("https://example.com")`   |
| `Intent.json(value)`           | `IntentJsonValue`           | `Intent.json({ key: "value" })`       |
| `Intent.file(filePath)`        | `IntentFileValue`           | `Intent.file("/path/to/file.txt")`    |
| `Intent.fileURL(filePath)`     | `IntentFileURLValue`        | `Intent.fileURL("/path/to/file.pdf")` |
| `Intent.image(UIImage)`        | `IntentImageValue`          | `Intent.image(uiImage)` |

---

## 八、最佳实践与注意事项

* 所有脚本应显式调用 `Script.exit()` 以确保内存安全。
* 推荐在 UI 脚本中使用 `await Navigation.present()` 之后再调用 `Script.exit()`。
* 对于大文件或图像，建议使用 “Run Script in App” 模式，以避免系统内存限制导致的崩溃。
* 如果脚本需要共享数据，可通过 URL Scheme 或 `queryParameters` 实现。
