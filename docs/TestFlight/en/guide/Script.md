---
title: Script
description: This API allows you to build reusable script logic, trigger automation via custom URL schemes, and manage inter-script communication in a structured and efficient manner.

---

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

### `env: string`

Indicates the environment in which the current script is running. This allows the script to adapt its behavior based on the runtime context—whether it’s running in the main app, a widget, a notification, or an extension.

### Possible Values:

| Value              | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| `"index"`          | Running in the main app. Entry point is `index.tsx`. Used for normal UI logic.    |
| `"widget"`         | Running in a widget. Entry point is `widget.tsx`. Used for home screen widgets.   |
| `"control_widget"` | Running in a control widget. Entry point is `contrl_widget_button.tsx` or `control_widget_toggle.tsx`. Used for control center widgets.   |
| `"notification"`   | Running in the rich notification extension. Entry point is `notification.tsx`.    |
| `"intent"`         | Running as a share sheet or shortcut intent handler. Entry point is `intent.tsx`. |
| `"app_intents"`    | Running in the App Intents extension. Entry point is `app_intents.tsx`.           |
| `"assistant_tool"` | Running in the Assistant Tool context. Entry point is `assistant_tool.tsx`.       |
| `"keyboard"`       | Running in the custom keyboard extension. Entry point is `keyboard.tsx`.          |
| `"live_activity"`  | Running in the Live Activity extension. Entry point is `live_activity.tsx`.       |

### Example:

```ts
if (Script.env === "widget") {
  Widget.present(<MyWidget />)
} else if (Script.env === "index") {
  Navigation.present({ element: <MainPage /> })
}
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

### `metadata: { ... }`

Metadata of the current script.

* `icon`: The icon of the script. Can be a SFSymbol name.
* `color`: The color of the script. Can be a hex color string like `#FF0000` or a CSS color name like `"red"`.
* `localizedName`: The localized name of the script in the current system language.
* `localizedNames`: A record of localized names for different languages. Keys are language codes (e.g., `"en"`, `"zh"`), and values are the localized names.
* `description`: The description of the script in English.
* `localizedDescription`: The localized description in the current system language.
* `localizedDescriptions`: A record of localized descriptions for different languages.
* `version`: The version string of the script.
* `author`: The script author's metadata:

  * `name`: The author's name
  * `email`: The author's email address
  * `homepage`: (optional) The author’s homepage
* `contributors`: An array of contributor objects with the same structure as `author`
* `remoteResource`: Information about a remote resource for this script:

  * `url`: The URL of the remote resource (e.g., a `.zip` or Git repository)
  * `autoUpdateInterval`: (optional) The auto-update interval in seconds. If not provided, auto-update is disabled.

```ts
console.log(Script.metadata.localizedName) // e.g., "天气助手"
console.log(Script.metadata.version)       // e.g., "1.2.0"
```

---

## Methods

### `Script.exit(result?): void`

Ends the script and optionally returns a result. This is required to release resources properly.

* `result?: any | IntentValue`: Any value or `IntentValue` object to return to the caller (e.g., Shortcuts or another script).

```ts
Script.exit("Done")

// or return structured value
Script.exit(Intent.json({ status: "ok" }))
```

---

### `Script.run<T>(options:): Promise<T | null>`

Runs another script programmatically and waits for its result.

* `options.name`: The name of the script to run.
* `options.queryParameters`: Optional data to pass.
* `options.singleMode`: If `true`, ensures only one instance of the script runs.

Returns: the value passed from `Script.exit(result)` in the target script.

```ts
const result = await Script.run({
  name: "ProcessData",
  queryParameters: { input: "abc" }
})

console.log(result)
```

---

### `Script.createRunURLScheme(scriptName, queryParameters?): string`

Creates a `scripting://run` URL to launch and execute a script.

```ts
const url = Script.createRunURLScheme("MyScript", { user: "Alice" })
// "scripting://run/MyScript?user=Alice"
```

---

### `Script.createRunSingleURLScheme(scriptName, queryParameters?): string`

Creates a `scripting://run_single` URL that ensures only one instance of the script runs.

```ts
const url = Script.createRunSingleURLScheme("MyScript", { id: "1" })
// "scripting://run_single/MyScript?id=1"
```

---

### `Script.createOpenURLScheme(scriptName): string`

Creates a `scripting://open` URL to open a script in the editor.

```ts
const url = Script.createOpenURLScheme("MyScript")
// "scripting://open/MyScript"
```

---

### `Script.createDocumentationURLScheme(title?): string`

Generates a URL to open the documentation page in the Scripting app.

* `title`: Optional. If provided, opens a specific documentation topic.

```ts
const url = Script.createDocumentationURLScheme("Widgets")
// "scripting://doc?title=Widgets"
```

---

### `createImportScriptsURLScheme(urls): string`

Generates a URL scheme for importing scripts from the specified URLs.

* `urls: string[]`: An array of URLs to import scripts from.

```ts
const urlScheme = Script.createImportScriptsURLScheme([
  "https://github.com/schl3ck/scripting-app-lib",
  "https://example.com/my-script.zip",
])
// "scripting://import_scripts?urls=..."
```

---

### `hasFullAccess(): boolean`

Determine whether user has full access to the Scripting PRO features.

Returns: `true` if the user has full access to the Scripting PRO features, otherwise `false`.

```ts
if (Script.hasFullAccess()) {
  // use Scripting PRO features
  Assistant.requestStructedData(...)
}
```

---

## Notes

* Always call `Script.exit()` to properly terminate a script and free memory.
* Use `Script.run()` to chain or modularize scripts and retrieve structured results.
* URL schemes can be used in external apps (like Shortcuts) to trigger scripts with parameters.
* `singleMode` is recommended for scripts that must not run in parallel.
