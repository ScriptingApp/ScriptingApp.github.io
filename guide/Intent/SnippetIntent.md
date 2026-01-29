# SnippetIntent

SnippetIntent is a special kind of AppIntent whose purpose is to render **interactive Snippet UI cards** inside the Shortcuts app (iOS 26+).

Key characteristics:

1. Must be registered in `app_intents.tsx`
2. Must specify `protocol: AppIntentProtocol.SnippetIntent`
3. `perform()` **must return a VirtualNode (TSX UI)**
4. Must be returned via `Intent.snippetIntent()`
5. Must be invoked from the Shortcuts action **“Show Snippet Intent”**
6. SnippetIntent is ideal for building interactive, step-based UI inside a Shortcut

It is not a data-returning Intent; it is exclusively for UI rendering in Shortcuts.

***

## 2. System Requirements

**SnippetIntent requires iOS 26 or later.**

On iOS versions earlier than 26:

- `Intent.snippetIntent()` is not available
- `Intent.requestConfirmation()` cannot be used
- The Shortcuts action “Show Snippet Intent” does not exist
- SnippetIntent-type AppIntents cannot be invoked by Shortcuts

***

## 3. Registering a SnippetIntent (app\_intents.tsx)

Example:

```tsx
export const PickColorIntent = AppIntentManager.register<void>({
  name: "PickColorIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async () => {
    return <PickColorView />;
  },
});
```

Another SnippetIntent:

```tsx
export const ShowResultIntent = AppIntentManager.register({
  name: "ShowResultIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async ({ content }: { content: string }) => {
    return <ResultView content={content} />;
  },
});
```

Requirements:

- `protocol` **must** be `AppIntentProtocol.SnippetIntent`
- `perform()` **must** return a TSX UI (VirtualNode)
- SnippetIntent cannot return non-UI types such as text, numbers, JSON, or file paths

***

## 4. Wrapping SnippetIntent Return Values — `Intent.snippetIntent`

A SnippetIntent cannot be passed directly to `Script.exit()`.
It must be wrapped in a `IntentSnippetIntentValue`.

```tsx
const snippetValue = Intent.snippetIntent(ShowResultIntent({ content: "Example Text" }));

Script.exit(snippetValue);
```

### Type Definition

```ts
type SnippetIntentValue = {
  value?:
    | IntentAttributedTextValue
    | IntentFileURLValue
    | IntentJsonValue
    | IntentTextValue
    | IntentURLValue
    | IntentFileValue
    | null;
  snippetIntent: AppIntent<any, VirtualNode, AppIntentProtocol.SnippetIntent>;
};

declare class IntentSnippetIntentValue extends IntentValue<"SnippetIntent", SnippetIntentValue> {
  value: SnippetIntentValue;
  type: "SnippetIntent";
}
```

This wrapper makes the return value compatible with the Shortcuts “Show Snippet Intent” action.

***

## 5. Snippet Confirmation UI — `Intent.requestConfirmation`

iOS 26 Snippet Framework provides built-in confirmation UI driven by SnippetIntent.

### API

```ts
Intent.requestConfirmation(
  actionName: ConfirmationActionName,
  intent: AppIntent<any, VirtualNode, AppIntentProtocol.SnippetIntent>,
  options?: {
    dialog?: Dialog;
    showDialogAsPrompt?: boolean;
  }
): Promise<void>
```

### ConfirmationActionName

A predefined list of semantic action names used by system UI:

```
"add" | "addData" | "book" | "buy" | "call" | "checkIn" |
"continue" | "create" | "do" | "download" | "filter" |
"find" | "get" | "go" | "log" | "open" | "order" |
"pay" | "play" | "playSound" | "post" | "request" |
"run" | "search" | "send" | "set" | "share" |
"start" | "startNavigation" | "toggle" | "turnOff" |
"turnOn" | "view"
```

### Example

```tsx
await Intent.requestConfirmation("set", PickColorIntent());
```

Execution behavior:

- Displays a Snippet UI for confirmation
- If the user confirms → Promise resolves and script continues
- If the user cancels → execution stops (system-driven behavior)

***

## 6. The “Show Snippet Intent” Action in Shortcuts (iOS 26+)

iOS 26 adds a new Shortcuts action:

**Show Snippet Intent**

This action is the only correct way to display SnippetIntent UI.

### Comparison with Other Scripting Actions

| Shortcuts Action              | UI Shown                       | Supports SnippetIntent | Usage               |
| ----------------------------- | ------------------------------ | ---------------------- | ------------------- |
| Run Script                    | None                           | No                     | Background logic    |
| Run Script in App             | Fullscreen UI inside Scripting | No                     | Rich app-level UI   |
| Show Snippet Intent (iOS 26+) | Snippet card UI                | Yes                    | SnippetIntent flows |

### Usage

1. Add “Show Snippet Intent” in Shortcuts
2. Select a Scripting script project
3. The script must return `Intent.snippetIntent(...)`
4. Shortcuts renders the UI in a Snippet card

***

## 7. IntentMemoryStorage — Cross-Intent State Store

## Why It Exists

Every AppIntent execution runs in an isolated environment:

- After an AppIntent `perform()` completes → its execution context is destroyed
- After a script calls `Script.exit()` → the JS context is destroyed

This means local variables **cannot persist between AppIntent calls**.

Snippet flows commonly involve:
PickColor → SetColor → ShowResult

Therefore a cross-Intent state mechanism is required.

***

## IntentMemoryStorage API

```ts
namespace IntentMemoryStorage {
  function get<T>(key: string): T | null;
  function set(key: string, value: any): void;
  function remove(key: string): void;
  function contains(key: string): boolean;
  function clear(): void;
  function keys(): string[];
}
```

### Purpose

- Store small pieces of shared data across multiple AppIntents
- Works during the entire Shortcut flow
- Ideal for selections, temporary configuration, or intent-to-intent handoff

### Example

```ts
IntentMemoryStorage.set("color", "systemBlue");

const color = IntentMemoryStorage.get<Color>("color");
```

### Guidelines

Not recommended for large data.
For large data:

- Use `Storage` (persistent key-value store)
- Or save files via `FileManager` in `appGroupDocumentsDirectory`

IntentMemoryStorage should be treated as **temporary, lightweight state**.

***

## 8. Full Example Combining All Features (iOS 26+)

## app\_intents.tsx

```tsx
export const SetColorIntent = AppIntentManager.register({
  name: "SetColorIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async (color: Color) => {
    IntentMemoryStorage.set("color", color);
  },
});

export const PickColorIntent = AppIntentManager.register<void>({
  name: "PickColorIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async () => {
    return <PickColorView />;
  },
});

export const ShowResultIntent = AppIntentManager.register({
  name: "ShowResultIntent",
  protocol: AppIntentProtocol.SnippetIntent,
  perform: async ({ content }: { content: string }) => {
    const color = IntentMemoryStorage.get<Color>("color") ?? "systemBlue";
    return <ResultView content={content} color={color} />;
  },
});
```

## intent.tsx

```tsx
async function runIntent() {
  // 1. Ask the user to confirm setting the color via Snippet
  await Intent.requestConfirmation("set", PickColorIntent());

  // 2. Read Shortcuts input
  const textContent =
    Intent.shortcutParameter?.type === "text"
      ? Intent.shortcutParameter.value
      : "No text parameter from Shortcuts";

  // 3. Create final SnippetIntent UI
  const snippetIntentValue = Intent.snippetIntent({
    snippetIntent: ShowResultIntent({ content: textContent }),
  });

  Script.exit(snippetIntentValue);
}

runIntent();
```

## Shortcuts Flow

1. User provides text
2. “Show Snippet Intent” runs the script
3. Script displays PickColorIntent confirmation UI via requestConfirmation
4. After confirmation, displays ShowResultIntent Snippet UI
5. Uses IntentMemoryStorage to persist the selected color

***

## 9. Summary

This document introduces all **new** Scripting features added for iOS 26+:

1. **SnippetIntent**
   - Registered using `AppIntentManager`
   - Returns TSX UI
   - Requires iOS 26+

2. **Intent.snippetIntent**
   - Wraps a SnippetIntent for Script.exit

3. **Intent.requestConfirmation**
   - Presents a confirmation Snippet UI
   - Requires SnippetIntent

4. **“Show Snippet Intent” action in Shortcuts**
   - Required to display SnippetIntent UI

5. **IntentMemoryStorage**
   - Lightweight cross-AppIntent storage
   - Not suitable for large binary/content data
   - Complements multi-step Snippet flows
