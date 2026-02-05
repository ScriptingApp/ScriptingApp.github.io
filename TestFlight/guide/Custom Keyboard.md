# Custom Keyboard

The `CustomKeyboard` namespace provides a comprehensive API for building fully custom keyboard UIs in the Scripting app. It allows you to create JSX-based keyboards, insert or modify text, query input state, respond to user interaction, and control keyboard layout or navigation.

***

## 1. Environment & Setup

### Requirements

- You must define your keyboard interface in a file named `**keyboard.tsx**` inside your script project.
- The `CustomKeyboard` API is **only available in the keyboard extension environment**.
- It is **not available** in App scripts, Intents (`intent.tsx`), or Widgets (`widget.tsx`).
- You must enable the keyboard in iOS settings:

  ```
  Settings > General > Keyboard > Keyboards > Add New Keyboard > Scripting
  ```

  Then tap the **Scripting Keyboard** and enable **Allow Full Access** to unlock clipboard and network features.

***

## 2. Presentation

### `present(node: VirtualNode): void`

Renders your custom keyboard UI using the given JSX node. This function **must be called once** in `keyboard.tsx`.

```tsx
function MyKeyboard() {
  return <Text>Hello from keyboard</Text>
}

CustomKeyboard.present(<MyKeyboard />)
```

***

## 3. Text Input State

| Property           | Type             | Description                              |
| ------------------ | ---------------- | ---------------------------------------- |
| `textBeforeCursor` | `string \| null` | Text before the cursor                   |
| `textAfterCursor`  | `string \| null` | Text after the cursor                    |
| `selectedText`     | `string \| null` | Currently selected text                  |
| `allText`          | `string`         | Currently entered text                   |
| `hasText`          | `boolean`        | Whether the text input contains any text |

***

## 4. Input Traits

### `useTraits(): TextInputTraits`

Hook to retrieve the current input traits (e.g., keyboard type, return key style). It automatically updates when `textDidChange` or `selectionDidChange` events occur.

### `traits: TextInputTraits`

A snapshot of the traits at the last change. Prefer `useTraits()` in JSX components for reactivity.

#### Example fields:

- `keyboardType`: `'default'`, `'numberPad'`, `'emailAddress'`...
- `returnKeyType`: `'go'`, `'search'`, `'done'`...
- `autocapitalizationType`: `'none'`, `'sentences'`, etc.
- `textContentType`: semantic input hints like `'username'`, `'oneTimeCode'`, etc.
- `keyboardAppearance`: `'light'`, `'dark'`, etc.

***

## 5. Text Manipulation

### `insertText(text: string): void`

Insert text at the current cursor position.

### `deleteBackward(): void`

Delete one character before the cursor.

### `moveCursor(offset: number): void`

Move the cursor by a number of characters. Negative = left; Positive = right.

### `setMarkedText(text, location, length): void`

Mark a portion of inserted text (used in composition scenarios like Pinyin input).

### `unmarkText(): void`

Clear any currently marked text.

***

## 6. Keyboard Behavior Control

### `dismiss(): void`

Dismiss the keyboard view.

### `nextKeyboard(): void`

Switch to the next system keyboard.

### `requestHeight(height: number): void`

Request a new keyboard height in points. Recommended range is **216–360pt**.

### `setHasDictationKey(value: boolean): void`

Control whether the dictation (microphone) key is shown.

### `setToolbarVisible(visible: boolean): void`

Show or hide the custom keyboard toolbar. Useful for debugging.

***

## 7. Navigation

### `dismissToHome(): void`

Dismisses the currently active keyboard script and returns to the **Scripting keyboard home screen** (script list). Useful for letting users choose another script.

```ts
CustomKeyboard.dismissToHome()
```

***

## 8. User Feedback

### `playInputClick(): void`

Play the standard system keyboard click sound. Useful when simulating real key taps.

```ts
CustomKeyboard.playInputClick()
```

***

## 9. Event Listeners

### `addListener(event, callback): void`

Register a listener for keyboard or text input changes.

| Event                 | Callback Signature                  | Description                     |
| --------------------- | ----------------------------------- | ------------------------------- |
| `textWillChange`      | `() => void`                        | Before text changes             |
| `textDidChange`       | `(traits: TextInputTraits) => void` | After text changes              |
| `selectionWillChange` | `() => void`                        | Before cursor/selection changes |
| `selectionDidChange`  | `(traits: TextInputTraits) => void` | After cursor/selection changes  |

### `removeListener(event, callback): void`

Remove a specific listener.

### `removeAllListeners(event): void`

Remove all listeners for a given event type.

***

## 10. Full Example

```tsx
function MyKeyboard() {
  const traits = CustomKeyboard.useTraits()

  const insert = async (text: string) => {
    CustomKeyboard.playInputClick()
    CustomKeyboard.insertText(text)
  }

  return (
    <VStack spacing={12}>
      <Text>Input type: {traits.keyboardType}</Text>
      <HStack spacing={10}>
        <Button title="你" action={() => insert("你")} />
        <Button title="好" action={() => insert("好")} />
        <Button title="←" action={() => CustomKeyboard.deleteBackward()} />
        <Button title="Back" action={() => CustomKeyboard.dismissToHome()} />
      </HStack>
    </VStack>
  )
}

CustomKeyboard.present(<MyKeyboard />)
```

***

## 11. Best Practices

- **Call `present()` only once** in your `keyboard.tsx` file.
- Use `requestHeight()` to ensure appropriate layout on different screen sizes.
- Prefer `useTraits()` for reactive input context access in JSX.
- Use `dismissToHome()` instead of `dismiss()` if you want to return to the script list.
- Call `playInputClick()` when simulating key taps for user feedback.
- Always check for `hasText` before calling `deleteBackward()`.
