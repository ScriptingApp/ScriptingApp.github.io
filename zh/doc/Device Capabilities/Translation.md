# 翻译 PRO

`Translation` API 提供了将文本在不同语言之间翻译的能力，支持单条文本和批量文本的翻译，适用于 **iOS 18.0 及以上系统**。

## 概览

此 API 通过 `Translation` 类提供，包含以下功能：

- 共享的全局翻译实例 `Translation.shared`
- 翻译单条文本
- 翻译多条文本（批量翻译）
- 支持自动检测源语言并根据设备偏好选择目标语言

***

## 类：`Translation`

### `Translation.shared: Translation`

提供一个共享的 `Translation` 实例，适用于无界面脚本或需要复用统一翻译主机的场景。

#### 示例

```ts
const translated = await Translation.shared.translate({
  text: "Hello, world!",
  source: "en",
  target: "es"
})

console.log(translated) // 输出: "¡Hola, mundo!"
```

***

### 方法：`translate(options): Promise<string>`

将一段文本从源语言翻译为目标语言。

#### 参数

- `options.text: string`
  要翻译的文本内容。

- `options.source?: string`
  源语言代码，例如 `"en"` 表示英语。如果省略或为 `null`，系统将自动尝试识别源语言，并在不确定时提示用户选择。

- `options.target?: string`
  目标语言代码，例如 `"es"` 表示西班牙语。如果省略或为 `null`，系统将根据设备的 `Device.preferredLanguages` 和源语言自动选择目标语言。

#### 返回值

- `Promise<string>` — 返回一个 Promise，解析为翻译后的文本字符串。

#### 异常

- 翻译失败时会抛出错误（例如网络问题、不支持的语言等）。

#### 示例

```ts
const translated = await Translation.shared.translate({
  text: "Good morning",
  target: "fr"
})

console.log(translated) // 输出: "Bonjour"
```

***

### 方法：`translateBatch(options): Promise<string[]>`

将多个文本条目从源语言翻译为目标语言，支持批量处理。

#### 参数

- `options.texts: string[]`
  要翻译的文本数组。返回的翻译结果与输入顺序一一对应。

- `options.source?: string`
  源语言代码，作用同 `translate` 方法。

- `options.target?: string`
  目标语言代码，作用同 `translate` 方法。

#### 返回值

- `Promise<string[]>` — 返回一个 Promise，解析为翻译后的文本数组。

#### 异常

- 如果翻译过程中出现任何错误，会抛出异常。

#### 示例

```ts
const results = await Translation.shared.translateBatch({
  texts: ["Hello", "Good night", "Thank you"],
  source: "en",
  target: "ja"
})

console.log(results)
// 输出: ["こんにちは", "おやすみなさい", "ありがとう"]
```

***

## 注意事项

- 语言代码应使用 [ISO 639-1](https://zh.wikipedia.org/wiki/ISO_639-1) 标准（如 `"en"` 表示英语，`"zh"` 表示中文，`"de"` 表示德语）。

- API 使用系统级翻译服务，部分情况下可能弹出语言选择提示。

- 在以下场景中应使用 `translationHost` 视图修饰符：
  - **在用户界面中进行翻译操作**
    当你的脚本包含用户界面（例如使用 `<VStack>`、`<List>` 等）并使用自定义的 `Translation` 实例（例如通过 `new Translation()` 创建）执行翻译时，**必须**将 `translationHost` 应用于根视图，以便系统能够弹出权限请求、语言下载提示或源语言选择对话框。

  - **未指定源语言（`source` 为 `null`）**
    如果在翻译请求中省略了 `source` 字段，依赖系统自动检测语言，当检测失败时，`translationHost` 可确保系统能够提示用户手动选择源语言。

  - **可能需要下载语言包**
    如果设备未安装所需的源语言或目标语言，`translationHost` 允许系统向用户弹出下载提示，从而完成翻译任务。

- 如果你使用的是预设绑定的 `Translation.shared` 实例，并且脚本不涉及任何界面（如后台运行的脚本），则**不需要**设置 `translationHost`。
