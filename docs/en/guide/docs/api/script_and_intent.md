The `Script` API, along with the `Intent` class, provides powerful tools for handling script execution and Shortcuts app intent actions. This allows you to run scripts programmatically, interact with the iOS Shortcuts app, and handle data passed through various input methods like text, URLs, and files.

---

## Class: `Script`

### Properties

- **`name: string`**  
  The name of the currently running script.

- **`directory: string`**  
  The directory path of the currently running script.

- **`widgetParameter: string`**  
  The parameter configured for a widget. This property is accessible when a script is triggered by interacting with the widget.

- **`queryParameters: Record<string, string>`**  
  Parameters passed to the script when launched via a `run` URL scheme (e.g., `"scripting://run/{script_name}?a=1&b=2"`).

---

### Methods

#### **`Script.createDocumentationURLScheme(title?: string): string`**  
Creates a URL scheme for opening the Scripting's documentation page.
- **Parameters**:
  - `title?: string`: The title of the documentation page, if not specified, it will open the documentation homepage.
- **Returns**: A URL string like `"scripting://doc?title=Quick%20Start"`.

#### **`Script.createOpenURLScheme(scriptName: string): string`**  
Creates a URL scheme to open a specified script.  
- **Parameters**:
  - `scriptName: string`: The name of the script to open.
- **Returns**: A URL string like `"scripting://open/{script_name}"`.

#### **`Script.createRunURLScheme(scriptName: string, queryParameters?: Record<string, string>): string`**  
Creates a URL scheme to run a specified script with optional query parameters.  
- **Parameters**:
  - `scriptName: string`: The name of the script to run.
  - `queryParameters?: Record<string, string>`: Key-value pairs passed as parameters.
- **Returns**: A URL string like `"scripting://run/{script_name}?a=1&b=2"`.

#### **`Script.createRunSingleURLScheme(scriptName: string, queryParameters?: Record<string, string>): string`**  
Create a URL scheme for running a specified script in single mode. Only one instance of the script can be run at the same time.
- **Parameters**:
  - `scriptName: string`: The name of the script to run.
  - `queryParameters?: Record<string, string>`: Key-value pairs passed as parameters.
- **Returns**: A URL string like `"scripting://run_single/{script_name}?a=1&b=2"`.

#### **`Script.run<T>(options: { name: string queryParameters?: Record<string, string> singleMode?: boolean }): Promise<T | null>`**  
Runs another script programmatically.  
- **Parameters**:
  - `name: string`: The name of the script to run.
  - `queryParameters?: Record<string, string>`: Parameters passed to the script.
  - `singleMode?: boolean`: If `true`, only one instance of the script can be run at the same time, so other script instances will be terminated. Defaults to `false`.
- **Returns**: The result returned by the script via `Script.exit(result)`, or `null` if the script does not exist.

**Caution**: Ensure the called script uses `Script.exit()` to avoid memory leaks.

#### **`Script.exit(result?: any | IntentValue): void`**  
Exits the current script and optionally returns a result to the caller or Shortcuts app.  
- **Parameters**:
  - `result?: any | IntentValue`: The result to deliver back to the initiator. Acceptable types include plain objects, strings, or instances of `IntentValue`.

---

## Class: `Intent`

### Overview

The `Intent` class provides methods and properties to handle user requests through Shortcuts app intent actions or share sheet inputs. It supports receiving and processing input data like text, URLs, and files.

---

### Properties

- **`shortcutParameter: ShortcutParameter | undefined`**  
  The input parameter passed from a Shortcuts app action. This can be a text string, JSON object, or file URL. The `type` property of `ShortcutParameter` indicates the data type.

- **`textsParameter: string[] | undefined`**  
  An array of text strings passed via the share sheet or a Shortcuts action.

- **`urlsParameter: string[] | undefined`**  
  An array of URL strings passed via the share sheet or a Shortcuts action.

- **`imagesParameter: UIImage[] | undefined`**  
  An array of image file paths passed via the share sheet or a Shortcuts action. For large images, use the "Run in App" option to avoid memory issues.

- **`fileURLsParameter: string[] | undefined`**  
  An array of file paths passed via the share sheet or a Shortcuts action. For large files, use the "Run in App" option to prevent process termination.

---

### Methods

#### **`Intent.text(value: string | number | boolean): IntentTextValue`**  
Wraps a plain text value for an intent result.  
- **Example**: `Script.exit(Intent.text("Hello, world!"))`

#### **`Intent.attributedText(value: string): IntentAttributedTextValue`**  
Wraps attributed text for an intent result.  
- **Example**: `Script.exit(Intent.attributedText("Styled Text"))`

#### **`Intent.url(value: string): IntentURLValue`**  
Wraps a URL string for an intent result.  
- **Example**: `Script.exit(Intent.url("https://example.com"))`

#### **`Intent.json(value: Record<string, any> | any[]): IntentJsonValue`**  
Wraps a JSON object or array for an intent result.  
- **Example**: `Script.exit(Intent.json({ key: "value" }))`

#### **`Intent.file(filePath: string): IntentFileValue`**  
Wraps a file path for an intent result.  
- **Example**: `Script.exit(Intent.file("/path/to/file.pdf"))`

#### **`Intent.fileURL(filePath: string): IntentFileURLValue`**  
Wraps a file URL for an intent result.  
- **Example**: `Script.exit(Intent.fileURL("/path/to/file.pdf"))`

---

## Examples

### Run a Script and Return a Result
```ts
// Script A
Script.exit(Script.queryParameters["input"] + " processed")

// Script B
const result = await Script.run({
  name: "Script A",
  queryParameters: { input: "Data" },
})
console.log(result) // Output: "Data processed"
```

---

### Process Shortcuts Input
```ts
if (Intent.shortcutParameter) {
  switch (Intent.shortcutParameter.type) {
    case "text":
      console.log("Text Input: " + Intent.shortcutParameter.value)
      break
    case "url":
      console.log("URL Input: " + Intent.shortcutParameter.value)
      break
  }
}
```

---

### Return a Result to Shortcuts
```ts
// Return plain text
Script.exit(Intent.text("Task completed"))

// Return a JSON object
Script.exit(Intent.json({ status: "success", data: [1, 2, 3] }))

// Return a file URL
Script.exit(Intent.fileURL("/path/to/exported/file.pdf"))
```

---

### Handle Share Sheet Input
```ts
if (Intent.urlsParameter) {
  for (const url of Intent.urlsParameter) {
    console.log("Shared URL: " + url)
  }
}
if (Intent.fileURLsParameter) {
  for (const file of Intent.fileURLsParameter) {
    console.log("Shared File: " + file)
  }
}
```

---

### Use URL Schemes
```ts
const openURL = Script.createOpenURLScheme("MyScript")
console.log(openURL) // Output: "scripting://open/MyScript"

const runURL = Script.createRunURLScheme("MyScript", { user: "JohnDoe" })
console.log(runURL) // Output: "scripting://run/MyScript?user=JohnDoe"
```

---

## Notes

- **Memory Management**: Always call `Script.exit()` to properly terminate scripts and return results.
- **Handling Large Files**: Use "Run in App" for large files or images to prevent memory issues.
- **Query Parameters**: Use `queryParameters` to exchange data between scripts effectively.
