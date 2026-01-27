---
title: Dialog

---
        
The `Dialog` module provides convenient methods to present various types of user interface dialogs such as alerts, confirmations, prompts, and action sheets. These dialogs are useful for requesting user input or interaction during script execution.

---

## Module: `Dialog`

### ▸ `Dialog.alert(options: { message: string, title?: string, buttonLabel?: string }): Promise<void>`

Displays a simple alert dialog with a message and an optional title and button label. The dialog shows a single button and resolves when the user dismisses it.

#### Parameters

* `message` (`string`) – The main message displayed in the alert.
* `title?` (`string`) – Optional title shown above the message.
* `buttonLabel?` (`string`) – The text for the dismiss button. Defaults to `"OK"`.

#### Returns

* A `Promise<void>` that resolves after the user taps the button.

#### Example

```ts
await Dialog.alert({
  title: 'Notice',
  message: 'This operation completed successfully.',
  buttonLabel: 'Got it'
})
```

---

### ▸ `Dialog.confirm(options: { message: string, title?: string, cancelLabel?: string, confirmLabel?: string }): Promise<boolean>`

Displays a confirmation dialog with cancel and confirm options. Resolves to `true` if the user confirms, or `false` if the user cancels.

#### Parameters

* `message` (`string`) – The confirmation message.
* `title?` (`string`) – Optional title.
* `cancelLabel?` (`string`) – Label for the cancel button. Defaults to `"Cancel"`.
* `confirmLabel?` (`string`) – Label for the confirm button. Defaults to `"OK"`.

#### Returns

* A `Promise<boolean>` indicating the user's choice.

#### Example

```ts
const confirmed = await Dialog.confirm({
  title: 'Delete File',
  message: 'Are you sure you want to delete this file?',
  cancelLabel: 'No',
  confirmLabel: 'Yes'
})

if (confirmed) {
  // Proceed with deletion
}
```

---

### ▸ `Dialog.prompt(options: {...}): Promise<string | null>`

Displays a prompt dialog where the user can enter text. The result is a string if the user confirms or `null` if the user cancels.

#### Parameters

* `title` (`string`) – Required title explaining what the prompt is for.
* `message?` (`string`) – Optional supporting message.
* `defaultValue?` (`string`) – Pre-filled text in the input field.
* `obscureText?` (`boolean`) – Whether to obscure input (e.g., for passwords).
* `selectAll?` (`boolean`) – Whether the input text should be fully selected initially.
* `placeholder?` (`string`) – Placeholder text for the input.
* `cancelLabel?` (`string`) – Text for the cancel button.
* `confirmLabel?` (`string`) – Text for the confirm button.
* `keyboardType?` (`KeyboardType`) – The type of keyboard to display (e.g., numeric, email).

#### Returns

* A `Promise<string | null>` with the user's input, or `null` if canceled.

#### Example

```ts
const name = await Dialog.prompt({
  title: 'Enter your name',
  placeholder: 'Full name',
  defaultValue: 'John Doe',
  confirmLabel: 'Submit',
  cancelLabel: 'Cancel'
})

if (name != null) {
  console.log(`Hello, ${name}`)
}
```

---

### ▸ `Dialog.actionSheet(options: {...}): Promise<number | null>`

Displays an action sheet with multiple selectable options. Resolves to the index of the selected action, or `null` if canceled.

#### Parameters

* `title` (`string`) – Title of the action sheet.
* `message?` (`string`) – Optional descriptive message.
* `cancelButton?` (`boolean`) – Whether to show a cancel button. Defaults to `true`.
* `actions` (`{ label: string, destructive?: boolean }[]`) – A list of actions. Use `destructive: true` to visually highlight a destructive action.

#### Returns

* A `Promise<number | null>` indicating the index of the selected action, or `null` if the user canceled.

#### Example

```ts
const index = await Dialog.actionSheet({
  title: 'Do you want to delete this image?',
  actions: [
    { label: 'Delete', destructive: true },
    { label: 'Keep' }
  ]
})

if (index === 0) {
  // User chose "Delete"
} else if (index === 1) {
  // User chose "Keep"
} else {
  // User canceled
}
```

---

## Summary

| Function      | Purpose                          | Return Type        |         |
| ------------- | -------------------------------- | ------------------ | ------- |
| `alert`       | Show a message with an OK button | `Promise<void>`    |         |
| `confirm`     | Ask for confirmation (Yes/No)    | `Promise<boolean>` |         |
| `prompt`      | Ask for user input               | `Promise<string  \| null>` |
| `actionSheet` | Show multiple options            | `Promise<number  \| null>` |
