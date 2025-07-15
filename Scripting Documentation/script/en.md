The `Script` module provides context and utility functions for managing script execution in the Scripting app. It enables you to access runtime metadata, terminate scripts with results, run other scripts programmatically, and construct URL schemes to launch or open scripts.

---

## Properties

### `name: string`

The name of the currently running script.

```ts
console.log(Script.name) // e.g., "MyScript"
```

---

### `directory: string`

The directory path where the script is located.

```ts
console.log(Script.directory) // e.g., "/private/var/mobile/Containers/..."
```

---

### `widgetParameter: string`

The parameter passed when the script is launched from a widget.

```ts
if (Script.widgetParameter) {
  console.log("Widget input:", Script.widgetParameter)
}
```

---

### `queryParameters: Record<string, string>`

Key-value pairs parsed from a `run` URL scheme.

```ts
// URL: scripting://run/MyScript?user=John&id=123
console.log(Script.queryParameters.user) // "John"
console.log(Script.queryParameters.id)   // "123"
```

---

## Methods

### `Script.exit(result?: any | IntentValue): void`

Ends the script and optionally returns a result. This is required to release resources properly.

* `result`: Any value or `IntentValue` object to return to the caller (e.g., Shortcuts or another script).

```ts
Script.exit("Done")

// or return structured value
Script.exit(Intent.json({ status: "ok" }))
```

---

### `Script.run<T>(options: { name: string; queryParameters?: Record<string, string>; singleMode?: boolean }): Promise<T | null>`

Runs another script programmatically and waits for its result.

* `name`: The name of the script to run.
* `queryParameters`: Optional data to pass.
* `singleMode`: If `true`, ensures only one instance of the script runs.

Returns: the value passed from `Script.exit(result)` in the target script.

```ts
const result = await Script.run({
  name: "ProcessData",
  queryParameters: { input: "abc" }
})

console.log(result)
```

---

### `Script.createRunURLScheme(scriptName: string, queryParameters?: Record<string, string>): string`

Creates a `scripting://run` URL to launch and execute a script.

```ts
const url = Script.createRunURLScheme("MyScript", { user: "Alice" })
// "scripting://run/MyScript?user=Alice"
```

---

### `Script.createRunSingleURLScheme(scriptName: string, queryParameters?: Record<string, string>): string`

Creates a `scripting://run_single` URL that ensures only one instance of the script runs.

```ts
const url = Script.createRunSingleURLScheme("MyScript", { id: "1" })
// "scripting://run_single/MyScript?id=1"
```

---

### `Script.createOpenURLScheme(scriptName: string): string`

Creates a `scripting://open` URL to open a script in the editor.

```ts
const url = Script.createOpenURLScheme("MyScript")
// "scripting://open/MyScript"
```

---

### `Script.createDocumentationURLScheme(title?: string): string`

Generates a URL to open the documentation page in the Scripting app.

* `title`: Optional. If provided, opens a specific documentation topic.

```ts
const url = Script.createDocumentationURLScheme("Widgets")
// "scripting://doc?title=Widgets"
```

---

## Notes

* Always call `Script.exit()` to properly terminate a script and free memory.
* Use `Script.run()` to chain or modularize scripts and retrieve structured results.
* URL schemes can be used in external apps (like Shortcuts) to trigger scripts with parameters.
* `singleMode` is recommended for scripts that must not run in parallel.

---

This API allows you to build reusable script logic, trigger automation via custom URL schemes, and manage inter-script communication in a structured and efficient manner.