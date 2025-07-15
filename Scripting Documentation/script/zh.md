`Script` 模块提供了用于管理脚本执行的上下文信息与工具方法。你可以通过该接口访问当前脚本的运行信息、终止脚本并返回结果、在脚本之间调用、以及生成 URL Scheme 以打开或运行脚本。

---

## 属性

### `name: string`

当前正在运行的脚本名称。

```ts
console.log(Script.name) // 例如 "MyScript"
```

---

### `directory: string`

当前脚本所在的目录路径。

```ts
console.log(Script.directory)
// 例如 "/private/var/mobile/Containers/..."
```

---

### `widgetParameter: string`

当脚本由 Widget 启动时传入的参数。

```ts
if (Script.widgetParameter) {
  console.log("来自 Widget 的参数:", Script.widgetParameter)
}
```

---

### `queryParameters: Record<string, string>`

通过 URL Scheme 启动脚本时传入的参数键值对。

```ts
// URL: scripting://run/MyScript?user=John&id=123
console.log(Script.queryParameters.user) // "John"
console.log(Script.queryParameters.id)   // "123"
```

---

## 方法

### `Script.exit(result?: any | IntentValue): void`

结束当前脚本执行，并可选地返回一个结果。建议所有脚本执行完毕后都显式调用该方法，以释放资源。

* `result`: 可选，返回给调用方（如 Shortcuts 或另一个脚本）的结果，可以是任意值或 `IntentValue` 对象。

```ts
Script.exit("完成")

// 或返回结构化数据
Script.exit(Intent.json({ status: "ok" }))
```

---

### `Script.run<T>(options: { name: string; queryParameters?: Record<string, string>; singleMode?: boolean }): Promise<T | null>`

在当前脚本中调用并执行另一个脚本，并等待其结果。

* `name`: 要调用的脚本名称。
* `queryParameters`: 可选，传递给目标脚本的参数。
* `singleMode`: 可选，是否以单实例模式运行，默认为 false。

返回：目标脚本中通过 `Script.exit(result)` 返回的结果。如果脚本不存在，则返回 `null`。

```ts
const result = await Script.run({
  name: "ProcessData",
  queryParameters: { input: "abc" }
})

console.log(result)
```

---

### `Script.createRunURLScheme(scriptName: string, queryParameters?: Record<string, string>): string`

生成一个 `scripting://run` URL，用于运行指定脚本。

```ts
const url = Script.createRunURLScheme("MyScript", { user: "Alice" })
// "scripting://run/MyScript?user=Alice"
```

---

### `Script.createRunSingleURLScheme(scriptName: string, queryParameters?: Record<string, string>): string`

生成一个 `scripting://run_single` URL，确保指定脚本以单实例运行（仅保留一个副本）。

```ts
const url = Script.createRunSingleURLScheme("MyScript", { id: "1" })
// "scripting://run_single/MyScript?id=1"
```

---

### `Script.createOpenURLScheme(scriptName: string): string`

生成一个 `scripting://open` URL，用于在编辑器中打开指定脚本。

```ts
const url = Script.createOpenURLScheme("MyScript")
// "scripting://open/MyScript"
```

---

### `Script.createDocumentationURLScheme(title?: string): string`

生成一个用于打开 Scripting 内部文档页面的 URL。

* `title`: 可选，指定要打开的文档标题。若不传，将打开首页。

```ts
const url = Script.createDocumentationURLScheme("Widgets")
// "scripting://doc?title=Widgets"
```

---

## 注意事项

* 每个脚本都应调用 `Script.exit()` 结束运行，避免内存泄漏。
* 可通过 `Script.run()` 实现模块化脚本调用并获取返回值。
* URL Scheme 可用于从外部应用（如 Shortcuts）中调用脚本并传参。
* 建议对关键脚本使用 `singleMode` 模式，避免并发冲突。

---

通过 Script 接口，你可以实现脚本之间的数据传递、自动化执行链、以及跨场景的脚本调用逻辑，提升脚本的复用性和可维护性。
