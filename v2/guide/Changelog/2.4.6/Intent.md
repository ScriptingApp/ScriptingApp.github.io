# Intent

Scripting allows you to define custom iOS Intents using an `intent.tsx` file. These scripts can receive input from the iOS share sheet or the Shortcuts app and return structured results. With optional UI presentation, you can create interactive workflows that process data and deliver output dynamically.

***

## 1. Creating and Configuring an Intent

### 1.1 Create an Intent Script

1. Create a new script project in the Scripting app.
2. Add a file named `intent.tsx` to the project.
3. Define your logic and optionally a UI component inside the file.

### 1.2 Configure Supported Input Types

Tap the project title in the editor’s title bar to open **Intent Settings**, then select supported input types:

- Text
- Images
- File URLs
- URLs

This configuration enables your script to appear in the share sheet or Shortcuts when matching input is provided.

***

## 2. Accessing Input Data

Inside `intent.tsx`, use the `Intent` API to access input values.

| Property                   | Description                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `Intent.shortcutParameter` | A single parameter passed from the Shortcuts app, with `.type` and `.value` fields. |
| `Intent.textsParameter`    | Array of text strings.                                                              |
| `Intent.urlsParameter`     | Array of URL strings.                                                               |
| `Intent.imagesParameter`   | Array of image file paths (UIImage objects).                                        |
| `Intent.fileURLsParameter` | Array of local file URL paths.                                                      |

Example:

```ts
if (Intent.shortcutParameter) {
  if (Intent.shortcutParameter.type === "text") {
    console.log(Intent.shortcutParameter.value)
  }
}
```

***

## 3. Returning a Result

Use `Script.exit(result)` to return a result to the caller, such as the Shortcuts app or another script. Valid return types include:

- Plain text: `Intent.text(value)`
- Attributed text: `Intent.attributedText(value)`
- URL: `Intent.url(value)`
- JSON: `Intent.json(value)`
- File path or file URL: `Intent.file(value)` or `Intent.fileURL(value)`

Example:

```ts
import { Script, Intent } from "scripting"

Script.exit(Intent.text("Done"))
```

***

## 4. Displaying Interactive UI

Use `Navigation.present()` to show a UI before returning a result. You can render a React-style component and then call `Script.exit()` after the interaction completes.

Example:

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
  await Navigation.present({ element: <MyIntentView /> })
  Script.exit()
}

run()
```

***

## 5. Using Intents in the Share Sheet

If a script supports a specific input type (e.g., text or image), it will automatically appear as an option in the iOS share sheet:

1. Select content such as text or a file.
2. Tap the Share button.
3. Choose **Scripting** in the share sheet.
4. Scripting will list scripts that support the selected input type.

***

## 6. Using Intents in the Shortcuts App

You can call scripts from the Shortcuts app with or without UI:

- **Run Script**: Executes the script in the background.
- **Run Script in App**: Executes the script in the foreground, with UI presentation support.

Steps:

1. Open the Shortcuts app and create a new shortcut.
2. Add the **Run Script** or **Run Script in App** action from Scripting.
3. Choose the target script and pass input parameters if needed.

***

## 7. Intent API Reference

### `Intent` Properties

| Property            | Type                | Description                                     |
| ------------------- | ------------------- | ----------------------------------------------- |
| `shortcutParameter` | `ShortcutParameter` | Input from Shortcuts with `.type` and `.value`. |
| `textsParameter`    | `string[]`          | Array of input text values.                     |
| `urlsParameter`     | `string[]`          | Array of input URLs.                            |
| `imagesParameter`   | `UIImage[]`         | Array of image file paths or objects.           |
| `fileURLsParameter` | `string[]`          | Array of input file paths (local file URLs).    |

### `Intent` Methods

| Method                         | Return Type                 | Example                                |
| ------------------------------ | --------------------------- | -------------------------------------- |
| `Intent.text(value)`           | `IntentTextValue`           | `Intent.text("Hello")`                 |
| `Intent.attributedText(value)` | `IntentAttributedTextValue` | `Intent.attributedText("Styled Text")` |
| `Intent.url(value)`            | `IntentURLValue`            | `Intent.url("https://example.com")`    |
| `Intent.json(value)`           | `IntentJsonValue`           | `Intent.json({ key: "value" })`        |
| `Intent.file(path)`            | `IntentFileValue`           | `Intent.file("/path/to/file.txt")`     |
| `Intent.fileURL(path)`         | `IntentFileURLValue`        | `Intent.fileURL("/path/to/file.pdf")`  |
| `Intent.image(UIImage)`        | `IntentImageValue`          | `Intent.image(uiImage)`                |

***

## 8. Best Practices and Notes

- Always call `Script.exit()` to properly terminate the script and return a result.
- When displaying a UI, ensure `Navigation.present()` is awaited before calling `Script.exit()`.
- Use **"Run Script in App"** for large files or images to avoid process termination due to memory constraints.
- You can use `queryParameters` when launching scripts via URL scheme if additional data is needed.
