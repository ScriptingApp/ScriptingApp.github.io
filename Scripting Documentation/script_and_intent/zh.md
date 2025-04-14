`Script` API 与 `Intent` 类结合，为处理脚本执行和快捷指令（Shortcuts）动作提供了强大工具。这使你能够以编程方式运行脚本、与 iOS 快捷指令 app 交互，并处理通过文本、URL 和文件等多种输入方式传递的数据。

---

## 类：`Script`

### 属性

- **`name: string`**  
  当前运行脚本的名称。

- **`directory: string`**  
  当前运行脚本所在的目录路径。

- **`widgetParameter: string`**  
  小组件配置的参数。当通过点击小组件触发脚本时可以访问此属性。

- **`queryParameters: Record<string, string>`**  
  通过 `run` URL scheme 启动脚本时传递的参数（例如 `"scripting://run/{script_name}?a=1&b=2"`）。

---

### 方法

#### **`Script.createDocumentationURLScheme(title?: string): string`**  
创建用于打开 Scripting 文档页面的 URL scheme。
- **参数**：
  - `title?: string`：文档页面的标题，如果未指定，将打开文档首页。
- **返回值**：如 `"scripting://doc?title=Quick%20Start"` 的 URL 字符串。

#### **`Script.createOpenURLScheme(scriptName: string): string`**  
创建用于打开指定脚本的 URL scheme。
- **参数**：
  - `scriptName: string`：要打开的脚本名称。
- **返回值**：如 `"scripting://open/{script_name}"` 的 URL 字符串。

#### **`Script.createRunURLScheme(scriptName: string, queryParameters?: Record<string, string>): string`**  
创建用于运行指定脚本并传入可选参数的 URL scheme。
- **参数**：
  - `scriptName: string`：要运行的脚本名称。
  - `queryParameters?: Record<string, string>`：传递的键值对参数。
- **返回值**：如 `"scripting://run/{script_name}?a=1&b=2"` 的 URL 字符串。

#### **`Script.createRunSingleURLScheme(scriptName: string, queryParameters?: Record<string, string>): string`**  
创建以“单例模式”运行指定脚本的 URL scheme。此模式下同一脚本只能同时运行一个实例。
- **参数**：
  - `scriptName: string`：要运行的脚本名称。
  - `queryParameters?: Record<string, string>`：传递的键值对参数。
- **返回值**：如 `"scripting://run_single/{script_name}?a=1&b=2"` 的 URL 字符串。

#### **`Script.run<T>(options: { name: string queryParameters?: Record<string, string> singleMode?: boolean }): Promise<T | null>`**  
以编程方式运行另一个脚本。
- **参数**：
  - `name: string`：要运行的脚本名称。
  - `queryParameters?: Record<string, string>`：传递给脚本的参数。
  - `singleMode?: boolean`：若为 `true`，表示以单例模式运行，其他实例将被终止。默认值为 `false`。
- **返回值**：通过 `Script.exit(result)` 返回的结果，若脚本不存在，则为 `null`。

**注意**：确保被调用的脚本调用了 `Script.exit()`，否则可能造成内存泄漏。

#### **`Script.exit(result?: any | IntentValue): void`**  
退出当前脚本，并可选择将结果返回给调用方或快捷指令 app。
- **参数**：
  - `result?: any | IntentValue`：要返回的结果，可为普通对象、字符串或 `IntentValue` 的实例。

---

## 类：`Intent`

### 概述

`Intent` 类提供方法和属性以处理来自快捷指令动作或分享面板的用户请求。支持接收并处理文本、URL 和文件等输入数据。

---

### 属性

- **`shortcutParameter: ShortcutParameter | undefined`**  
  来自快捷指令动作的输入参数，可能是文本字符串、JSON 对象或文件 URL。其 `type` 属性表示数据类型。

- **`textsParameter: string[] | undefined`**  
  通过分享面板或快捷指令传入的文本字符串数组。

- **`urlsParameter: string[] | undefined`**  
  通过分享面板或快捷指令传入的 URL 字符串数组。

- **`imagesParameter: UIImage[] | undefined`**  
  通过分享面板或快捷指令传入的图片文件路径数组。若为大图，建议使用“在 App 中运行”选项以避免内存问题。

- **`fileURLsParameter: string[] | undefined`**  
  通过分享面板或快捷指令传入的文件路径数组。大文件建议使用“在 App 中运行”以防止进程终止。

---

### 方法

#### **`Intent.text(value: string | number | boolean): IntentTextValue`**  
将普通文本值包装为 intent 返回值。  
- **示例**：`Script.exit(Intent.text("Hello, world!"))`

#### **`Intent.attributedText(value: string): IntentAttributedTextValue`**  
将带格式的文本包装为 intent 返回值。  
- **示例**：`Script.exit(Intent.attributedText("Styled Text"))`

#### **`Intent.url(value: string): IntentURLValue`**  
将 URL 字符串包装为 intent 返回值。  
- **示例**：`Script.exit(Intent.url("https://example.com"))`

#### **`Intent.json(value: Record<string, any> | any[]): IntentJsonValue`**  
将 JSON 对象或数组包装为 intent 返回值。  
- **示例**：`Script.exit(Intent.json({ key: "value" }))`

#### **`Intent.file(filePath: string): IntentFileValue`**  
将文件路径包装为 intent 返回值。  
- **示例**：`Script.exit(Intent.file("/path/to/file.pdf"))`

#### **`Intent.fileURL(filePath: string): IntentFileURLValue`**  
将文件 URL 包装为 intent 返回值。  
- **示例**：`Script.exit(Intent.fileURL("/path/to/file.pdf"))`

---

## 示例

### 运行一个脚本并返回结果
```ts
// 脚本 A
Script.exit(Script.queryParameters["input"] + " processed")

// 脚本 B
const result = await Script.run({
  name: "Script A",
  queryParameters: { input: "Data" },
})
console.log(result) // 输出: "Data processed"
```

---

### 处理快捷指令输入
```ts
if (Intent.shortcutParameter) {
  switch (Intent.shortcutParameter.type) {
    case "text":
      console.log("文本输入：" + Intent.shortcutParameter.value)
      break
    case "url":
      console.log("URL 输入：" + Intent.shortcutParameter.value)
      break
  }
}
```

---

### 向快捷指令返回结果
```ts
// 返回纯文本
Script.exit(Intent.text("任务已完成"))

// 返回 JSON 对象
Script.exit(Intent.json({ status: "success", data: [1, 2, 3] }))

// 返回文件 URL
Script.exit(Intent.fileURL("/path/to/exported/file.pdf"))
```

---

### 处理分享面板输入
```ts
if (Intent.urlsParameter) {
  for (const url of Intent.urlsParameter) {
    console.log("分享的 URL：" + url)
  }
}
if (Intent.fileURLsParameter) {
  for (const file of Intent.fileURLsParameter) {
    console.log("分享的文件：" + file)
  }
}
```

---

### 使用 URL Scheme
```ts
const openURL = Script.createOpenURLScheme("MyScript")
console.log(openURL) // 输出: "scripting://open/MyScript"

const runURL = Script.createRunURLScheme("MyScript", { user: "JohnDoe" })
console.log(runURL) // 输出: "scripting://run/MyScript?user=JohnDoe"
```

---

## 注意事项

- **内存管理**：始终调用 `Script.exit()` 以正确终止脚本并返回结果。
- **处理大文件**：对于大文件或大图像，请使用“在 App 中运行”以避免内存问题。
- **参数传递**：通过 `queryParameters` 可在脚本之间高效交换数据。