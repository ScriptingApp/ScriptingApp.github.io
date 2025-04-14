
**Scripting** is an app that empowers developers to create interactive Intents by coding in TypeScript. The app wraps SwiftUI views, allowing you to build dynamic UIs and integrate with both the iOS share sheet and Shortcuts app.

## Overview

With **Scripting**, users can create **Intents** by writing TypeScript in `intent.tsx` files, allowing seamless integration with iOS’s share sheet and Shortcuts for a customized user experience.

All necessary APIs and views for UI creation and intent handling can be imported from the `"scripting"` package.

## Creating Intents

To create an iOS Intent:
1. **Create a New Script Project**: Start by creating a new script project within **Scripting**.
2. **Add an `intent.tsx` File**: This file will define the logic and UI for the Intent.
3. **Configure Supported Inputs**:
   - **Intent Settings**: Tap on the project title in the editor title bar to access **Intent Settings**.
   - **Supported Input Types**: Choose from texts, images, file URLs, and URLs.

### Accessing Inputs

Within `intent.tsx`, the following APIs allow access to user inputs:

- **`Intent.shortcutParameter`**：Parameter from Shortcuts app, you can check the data type by `Intent.shortcutParameter.type`, then access the value by `Intent.shortcutParameter.value`.
- **`Intent.textsParameter`**: Array of text inputs.
- **`Intent.imagesParameter`**: Array of image inputs.
- **`Intent.fileURLsParameter`**: Array of file URLs.
- **`Intent.urlsParameter`**: Array of URL inputs.

### Returning Results

To return a result to the caller:
- Use the **`Script.exit()`** method, which accepts an **IntentValue** as an argument. For example:
  ```tsx
  import { Script, Intent } from "scripting"

  Script.exit(
    Intent.text("some text")
    // Intent.json({key: "value"})
    // Intent.url("https://example.com")
    // Intent.file("/path/to/file")
  )
  ```

### Displaying UI Components

To present a UI based on the inputs before returning a result, create a function component and use **`Navigation.present()`**. Since `Navigation.present()` returns a Promise, it’s essential to handle the promise correctly to avoid memory leaks. You can wrap the function in an `async` function and call `Script.exit()` afterward.

Example:

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
  Script.exit() // returns nothing
}

run()
```

## Using Intents in the Share Sheet

When a script is configured to handle specific input types (e.g., text, images, URLs, or file URLs), **Scripting** integrates with the iOS share sheet to let users quickly process selected content:

1. **Share Sheet Access**: When a user selects content (like text in Safari) and opens the share sheet, the **Scripting** app will appear as an option if a compatible Intent exists.
2. **Running a Script from the Share Sheet**:
   - Tap **Run Script** from the share sheet options.
   - **Scripting** will present a list of scripts supporting the selected input type. For example, selecting text in Safari will display scripts that accept text inputs.
   - Select the desired script, and it will execute with the chosen input.

## Integration with Shortcuts

1. **Adding a Shortcut**: In the Shortcuts app, create a new shortcut and select **Scripting**.
2. **Choose an Action**:
   - **"Run Script"**: Executes the script without displaying a UI.
   - **"Run Script in App"**: Executes the script with UI presentation capability.
3. **Configure the Action**: In the action configuration, select the script project to run.

### Example Workflow

1. **Select "Run Script in App"** for intents that present a UI.
2. **Configure Inputs and Actions**: The shortcut will invoke `intent.tsx` and pass the defined inputs.
