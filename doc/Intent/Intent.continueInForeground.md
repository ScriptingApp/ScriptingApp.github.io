`Intent.continueInForeground` is an API that leverages the **iOS 26+ AppIntents framework** to request the system to bring the **Scripting app** to the foreground while a Shortcut is running.

This method is used when a script—invoked from Shortcuts—requires full UI interaction within the Scripting app (for example: presenting a form, editing content, picking files, showing a full screen navigation flow, etc.).

When invoked:

- The system displays a dialog asking the user to continue the workflow in the app.
- If the user **confirms**, the system opens Scripting in the foreground and the script continues.
- If the user **cancels**, the script terminates immediately.

Because this is a system-level capability of AppIntents:

**This API requires iOS 26 or later.**

***

# API Definition

```ts
function continueInForeground(
  dialog?: Dialog | null,
  options?: {
    alwaysConfirm?: boolean;
  }
): Promise<void>;
```

## Parameters

### `dialog?: Dialog | null`

An optional message explaining why the workflow needs to continue in the foreground.

`Dialog` supports four formats:

```ts
type Dialog =
  | string
  | { full: string; supporting: string }
  | { full: string; supporting: string; systemImageName: string }
  | { full: string; systemImageName: string }
```

Examples:

```ts
"Do you want to continue in the app?"
```

```ts
{
  full: "Continue in the Scripting app?",
  supporting: "The next step requires full UI interaction.",
  systemImageName: "app"
}
```

Passing `null` will suppress the dialog entirely (not recommended unless you fully understand the UX implications).

***

### `options?: { alwaysConfirm?: boolean }`

Controls whether the system should always ask for confirmation:

- `alwaysConfirm: false` _(default)_
  The system may decide whether confirmation is needed based on context.

- `alwaysConfirm: true`
  The system always presents the confirmation dialog.

***

# Execution Behavior

When called inside `intent.tsx`:

1. The Shortcut pauses execution.
2. The system presents a confirmation dialog.
3. If the user accepts:

   - The Scripting app opens in the foreground.
   - The script continues executing after the `await`.
4. If the user cancels:

   - The entire script is terminated immediately.

This mirrors the behavior of Apple’s AppIntents `continueInApp()` functionality for system apps.

***

# Common Use Cases

Use `continueInForeground` when the next step **cannot** run in the background, including:

- Presenting a full-screen UI (`Navigation.present`)
- Editing content in a custom form or navigation stack
- Selecting files or interacting with UI components
- Scenarios requiring user input or multi-step flows
- Showing UI unavailable to background extensions

It should **not** be used for simple data processing or non-interactive tasks.

***

# Full Code Example

Below is the full working example demonstrating how `continueInForeground` enables a Shortcut to transfer execution into the Scripting app and then return UI input back to Shortcuts.

```tsx
// intent.tsx
import {
  Button,
  Intent,
  List,
  Navigation,
  NavigationStack,
  Script,
  Section,
  TextField,
  useState
} from "scripting"

function View() {
  const dismiss = Navigation.useDismiss()
  const [text, setText] = useState("")

  return <NavigationStack>

    <List navigationTitle="Intent Demo">

      <TextField
        title="Enter a text"
        value={text}
        onChanged={setText}
      />

      <Section>
        <Button
          title="Return Text"
          action={() => {
            dismiss(text)
          }}
          disabled={!/\S+/.test(text)}
        />
      </Section>

    </List>

  </NavigationStack>
}

async function runIntent() {

  // Step 1: Ask the user to continue in the foreground app
  await Intent.continueInForeground(
    "Do you want to open the app and continue?"
  )

  // Step 2: Present UI inside the Scripting app
  const text = await Navigation.present<string | null>(
    <View />
  )

  // Step 3: Optionally go back to Shortcuts
  Safari.openURL("shortcuts://")

  // Step 4: Return the result to Shortcuts
  Script.exit(
    Intent.text(
      text ?? "No text return"
    )
  )
}

runIntent()
```

***

# Notes and Recommendations

1. **Requires iOS 26+**
   Do not call this API on older systems.

2. **Use dialogs to explain why foreground interaction is required**
   This improves user trust and Shortcuts clarity.

3. **Always handle the cancellation case**
   If the user cancels, your script stops. Avoid assuming foreground UI will always appear.

4. **Foreground UI must be meaningful**
   Only use this API when the upcoming step truly requires UI.

5. **Can be combined with SnippetIntent (iOS 26+)**
   For workflows that mix in-Shortcut Snippet UI with in-app full UI.

***

# Summary

`Intent.continueInForeground` enables scripts invoked from Shortcuts to request foreground execution when UI interaction is required. It is:

- Based on iOS 26 AppIntents capabilities
- A system-confirmed context switch
- Essential for workflows involving full UI interactions
- Safely integrated via a structured `Dialog` system

This method allows Scripting to support advanced automation flows that seamlessly transition between Shortcuts and the full Scripting app UI.
