# Intent.requestConfirmation PRO

`Intent.requestConfirmation` pauses script execution and asks the user to confirm an action through a **system-managed confirmation UI**.
The confirmation interface consists of:

- A **SnippetIntent UI** (provided by you)
- Optional dialog text (system-generated or developer-defined)

Behavior:

- If the user **confirms**, the script continues (Promise resolves).
- If the user **cancels**, the script terminates immediately.
- The UI is fully managed by the system.
- The presented UI is defined by the provided SnippetIntent’s `perform()` return.

**This API is only available on iOS 26 or later.**

***

# API Definition

```ts
Intent.requestConfirmation(
  actionName: ConfirmationActionName,
  snippetIntent: AppIntent<any, VirtualNode, AppIntentProtocol.SnippetIntent>,
  options?: {
    dialog?: Dialog;
    showDialogAsPrompt?: boolean;
  }
): Promise<void>
```

***

# Parameter Details

## actionName: ConfirmationActionName

A semantic keyword describing the type of action being confirmed.
Apple uses this value to generate natural language around the confirmation UI.

Accepted values include:

```
"add" | "addData" | "book" | "buy" | "call" | "checkIn" |
"continue" | "create" | "do" | "download" | "filter" |
"find" | "get" | "go" | "log" | "open" | "order" |
"pay" | "play" | "playSound" | "post" | "request" |
"run" | "search" | "send" | "set" | "share" |
"start" | "startNavigation" | "toggle" | "turnOff" |
"turnOn" | "view"
```

Examples:

- `"set"` → “Do you want to set…?”
- `"buy"` → “Do you want to buy…?”
- `"toggle"` → “Do you want to toggle…?”

Choosing the correct semantic verb improves the clarity of the user-facing dialog.

***

## snippetIntent: SnippetIntent

This must be an AppIntent registered with:

```ts
protocol: AppIntentProtocol.SnippetIntent;
```

The UI displayed in the confirmation step **comes from this SnippetIntent’s `perform()` return**, which must be a TSX-based `VirtualNode`.

This is what the user sees and interacts with during confirmation.

***

## `options?: { dialog?: Dialog; showDialogAsPrompt?: boolean }`

### dialog?: Dialog

Optional text describing the confirmation request.
Supports four formats:

```ts
type Dialog =
  | string
  | { full: string; supporting: string }
  | { full: string; supporting: string; systemImageName: string }
  | { full: string; systemImageName: string };
```

Examples:

```ts
"Are you sure you want to continue?";
```

More structured version:

```ts
{
  full: "Set this color?",
  supporting: "This will update the theme color used across the app.",
  systemImageName: "paintpalette"
}
```

Use this to clearly explain what the user is confirming.

***

### showDialogAsPrompt?: boolean

- Default: `true`
  The system shows the dialog as a modal prompt.

- `false`
  The dialog may be integrated directly inside the Snippet card instead of a separate prompt.

***

# Execution Flow

When the script executes:

```ts
await Intent.requestConfirmation(...)
```

The following occurs:

1. Script execution is paused.

2. The system displays:

   - The SnippetIntent UI
   - Optional dialog text

3. The user chooses:

   - **Confirm** → Promise resolves → script continues
   - **Cancel** → script stops immediately

4. The system handles UI presentation and dismissal automatically.

There is no need to manually manage the UI lifecycle.

***

# Usage Scenarios

Recommended for:

- Confirming important changes (colors, appearance, configurations)
- Confirming destructive or irreversible actions
- Steps requiring explicit user approval
- Initiating subflows requiring UI preview or choice (e.g., color picker, item selector)
- Sensitive operations (e.g., updating settings, performing actions with side effects)

Not recommended for:

- Actions that do not require user approval
- Simple background data processing

***

# Complete Example

Below is a full working example demonstrating how to request user confirmation using a SnippetIntent.

It assumes you have two SnippetIntent AppIntents:

- `PickColorIntent` — allows user to select a color
- `ShowResultIntent` — displays the final result

## intent.tsx

```tsx
import { Intent, Script } from "scripting";
import { PickColorIntent, ShowResultIntent } from "./app_intents";

async function runIntent() {
  // Step 1: Ask the user to confirm the action via a Snippet UI
  await Intent.requestConfirmation("set", PickColorIntent(), {
    dialog: {
      full: "Are you sure you want to set this color?",
      supporting: "This will update the theme color used by your app.",
      systemImageName: "paintpalette",
    },
  });

  // Step 2: Read input from Shortcuts
  const text =
    Intent.shortcutParameter?.type === "text"
      ? Intent.shortcutParameter.value
      : "No text parameter from Shortcuts";

  // Step 3: Return another SnippetIntent result
  const snippet = Intent.snippetIntent({
    snippetIntent: ShowResultIntent({ content: text }),
  });

  Script.exit(snippet);
}

runIntent();
```

***

# Notes & Best Practices

- **Requires iOS 26+** — do not call this API on earlier versions.
- Always include a clear **dialog** message to improve user understanding.
- Use for actions that require explicit approval or confirmation.
- When possible, combine with SnippetIntent to provide a richer preview UI.
- Scripts terminate automatically when the user cancels; do not rely on cleanup code afterward.
- Avoid calling it unnecessarily; only use when confirmation is truly meaningful.
