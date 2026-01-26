# Script

`Script` 模块为 Scripting App 中的脚本执行提供上下文和实用函数。它允许你访问运行时元数据、通过结果终止脚本、以编程方式运行其他脚本，并构造 URL Scheme 启动或打开脚本。

***

## 属性（Properties）

### `name: string`

当前正在运行的脚本名称。

```ts
console.log(Script.name) // 示例: "MyScript"
```

***

### `directory: string`

当前脚本所在的目录路径。

```ts
console.log(Script.directory) // 示例: "/private/var/mobile/Containers/..."
```

***

### `env: string`

表示当前脚本运行的环境类型，用于根据上下文动态调整脚本行为，例如判断是否处于主应用、组件、通知或扩展中。

### 可选值说明：

| 值                  | 说明                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `"index"`          | 主应用环境中运行，入口文件为 `index.tsx`。用于普通应用逻辑和界面展示。                                                   |
| `"widget"`         | 小组件中运行，入口文件为 `widget.tsx`。用于生成主屏幕组件内容。                                                      |
| `"control_widget"` | 控制中心小组件中运行，入口文件为 `control_widget_button.tsx`或`control_widget_toggle.tsx`。用于控制中心小组件的按钮或开关控件。 |
| `"notification"`   | 富通知扩展中运行，入口文件为 `notification.tsx`。用于自定义通知界面。                                                |
| `"intent"`         | 通过快捷指令或分享面板触发的脚本，入口文件为 `intent.tsx`。                                                        |
| `"app_intents"`    | App Intents 扩展中运行，入口文件为 `app_intents.tsx`。用于原生快捷指令集成。                                       |
| `"assistant_tool"` | Assistant Tool 工具模式中运行，入口文件为 `assistant_tool.tsx`。                                          |
| `"keyboard"`       | 自定义键盘扩展中运行，入口文件为 `keyboard.tsx`。用于实现个性化键盘逻辑。                                                |
| `"live_activity"`  | LiveActivity 扩展中运行，入口文件为 `live_activity.tsx`。用于实现实时活动逻辑。                                    |

### 示例：

```ts
if (Script.env === "widget") {
  Widget.present(<MyWidget />)
} else if (Script.env === "index") {
  Navigation.present({ element: <MainPage /> })
}
```

***

### `widgetParameter: string`

从小组件启动脚本时传入的参数。

```ts
if (Script.widgetParameter) {
  console.log("Widget input:", Script.widgetParameter)
}
```

***

### `queryParameters: Record<string, string>`

通过 `run` URL Scheme 传入的键值对参数。

```ts
// URL: scripting://run/MyScript?user=John&id=123
console.log(Script.queryParameters.user) // "John"
console.log(Script.queryParameters.id)   // "123"
```

***

### `metadata: { ... }`

当前脚本的元数据信息。

- `icon`: 脚本图标，可以是系统图标(SFSymbol)名称
- `color`: 脚本颜色，可以是十六进制颜色字符串（如 `#FF0000`）或 CSS 颜色名称（如 `"red"`）
- `localizedName`: 当前系统语言下的脚本本地化名称
- `localizedNames`: 不同语言下的本地化名称，键为语言代码，值为对应的名称
- `description`: 脚本的英文描述
- `localizedDescription`: 当前系统语言下的本地化描述
- `localizedDescriptions`: 不同语言下的本地化描述，键为语言代码，值为对应描述
- `version`: 脚本的版本字符串
- `author`: 作者信息对象：

  - `name`: 作者姓名
  - `email`: 作者电子邮箱
  - `homepage`: 作者个人主页（可选）
- `contributors`: 贡献者信息数组，每项结构同 `author`
- `remoteResource`: 远程资源信息：

  - `url`: 远程资源地址（可以是 zip 文件或 Git 仓库）
  - `autoUpdateInterval`: 自动更新间隔时间（单位：秒），若未设置则不自动更新

```ts
console.log(Script.metadata.localizedName) // 示例: "天气助手"
console.log(Script.metadata.version)       // 示例: "1.2.0"
```

***

## 方法（Methods）

### `Script.exit(result?): void`

终止当前脚本，并可选地返回一个结果。**必须调用该方法来正确释放资源。**

- `result?: any | IntentValue`: 要返回的值，可以是任意类型，也可以是 `IntentValue` 对象（例如返回给快捷指令或其他脚本）

```ts
Script.exit("Done")

// 或返回结构化数据
Script.exit(Intent.json({ status: "ok" }))
```

***

### `Script.run<T>(options): Promise<T | null>`

以编程方式运行另一个脚本，并等待其结果。

- `options.name`: 要运行的脚本名称
- `options.queryParameters`: 可选参数，作为 URL 参数传递
- `options.singleMode`: 若为 `true`，确保同一脚本只能同时运行一个实例

返回目标脚本中 `Script.exit(result)` 返回的值。

```ts
const result = await Script.run({
  name: "ProcessData",
  queryParameters: { input: "abc" }
})

console.log(result)
```

***

### `Script.createRunURLScheme(scriptName, queryParameters?): string`

生成一个 `scripting://run` URL，可用于启动并执行脚本。

```ts
const url = Script.createRunURLScheme("MyScript", { user: "Alice" })
// "scripting://run/MyScript?user=Alice"
```

***

### `Script.createRunSingleURLScheme(scriptName, queryParameters?): string`

生成一个 `scripting://run_single` URL，确保脚本不会并行运行多个实例。

```ts
const url = Script.createRunSingleURLScheme("MyScript", { id: "1" })
// "scripting://run_single/MyScript?id=1"
```

***

### `Script.createOpenURLScheme(scriptName): string`

生成一个 `scripting://open` URL，用于在编辑器中打开脚本。

```ts
const url = Script.createOpenURLScheme("MyScript")
// "scripting://open/MyScript"
```

***

### `Script.createDocumentationURLScheme(title?): string`

生成用于打开 Scripting App 内文档页面的 URL。

- `title`: （可选）若传入标题，将直接打开该文档主题页面。

```ts
const url = Script.createDocumentationURLScheme("Widgets")
// "scripting://doc?title=Widgets"
```

***

### `createImportScriptsURLScheme(urls): string`

根据提供的 URL 数组生成导入脚本的 URL Scheme。

- `urls: string[]`: 要导入的脚本资源 URL 列表（支持 zip 或单文件）

```ts
const urlScheme = Script.createImportScriptsURLScheme([
  "https://github.com/schl3ck/scripting-app-lib",
  "https://example.com/my-script.zip",
])
// "scripting://import_scripts?urls=..."
```

***

### `hasFullAccess(): boolean`

判断用户是否具有完整的 Scripting PRO 访问权限。

返回:`true` 如果用户具有完整的 Scripting PRO 访问权限，否则返回 `false`。

```ts
if (Script.hasFullAccess()) {
  // 有完整的 Scripting PRO 访问权限
  Assistant.requestStructedData(...)
}
```

***

## 注意事项（Notes）

- 请务必调用 `Script.exit()` 正确终止脚本并释放内存资源
- 使用 `Script.run()` 可以实现脚本的模块化和调用链，获取结构化返回值
- URL Scheme 可用于从外部应用（如快捷指令）触发脚本执行
- 对于需要避免并发执行的脚本，建议使用 `singleMode` 或 `run_single` URL Scheme
