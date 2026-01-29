# Text Field

The following modifiers customize the behavior and appearance of `TextField` components. These allow you to control keyboard behavior, input handling, and submission logic.

***

## `onSubmit`

Adds an action to perform when the user submits a value from the text field.

### Type

```ts
onSubmit?: (() => void) | {
  triggers: SubmitTriggers
  action: () => void
}
```

### Behavior

- If provided as a function:

  ```tsx
  <TextField onSubmit={() => console.log('Submitted')} />
  ```

  This is equivalent to:

  ```tsx
  <TextField
    onSubmit={{
      triggers: 'text',
      action: () => console.log('Submitted')
    }}
  />
  ```

- You can explicitly define what kind of submission should trigger the action using the `triggers` option:

  ```tsx
  <TextField
    onSubmit={{
      triggers: 'search',
      action: () => console.log('Search submitted')
    }}
  />
  ```

### `SubmitTriggers` values:

- `"text"`: Triggered by text input views like `TextField`, `SecureField`, etc.
- `"search"`: Triggered by search fields (e.g., those using the `searchable` modifier).

***

## `keyboardType`

Specifies the type of keyboard to display when the text field is focused.

### Type

```ts
keyboardType?: KeyboardType
```

### Options

- `'default'`
- `'numberPad'`
- `'phonePad'`
- `'namePhonePad'`
- `'URL'`
- `'decimalPad'`
- `'asciiCapable'`
- `'asciiCapableNumberPad'`
- `'emailAddress'`
- `'numbersAndPunctuation'`
- `'twitter'`
- `'webSearch'`

### Example

```tsx
<TextField keyboardType="emailAddress" />
```

***

## `autocorrectionDisabled`

Controls whether the system autocorrection is enabled.

### Type

```ts
autocorrectionDisabled?: boolean
```

### Default

- `true` — autocorrection is disabled by default.

### Example

```tsx
<TextField autocorrectionDisabled={false} />
```

***

## `textInputAutocapitalization`

Sets how the text input system should automatically capitalize text.

### Type

```ts
textInputAutocapitalization?: TextInputAutocapitalization
```

### Options

- `"never"` – No capitalization.
- `"characters"` – All letters capitalized.
- `"sentences"` – First letter of each sentence capitalized.
- `"words"` – First letter of each word capitalized.

### Example

```tsx
<TextField textInputAutocapitalization="words" />
```

***

## `submitScope`

Prevents submission triggers from this view from propagating upward to parent views with submission handlers.

### Type

```ts
submitScope?: boolean
```

### Default

- `false` — submission actions bubble up by default.

### Example

```tsx
<TextField submitScope />
```

This ensures that `onSubmit` handlers defined higher up in the view hierarchy won’t be called when this field is submitted.

## `submitLabel`

Sets the label for the submit button.

### Type

```ts
submitLabel?: "continue" | "return" | "send" | "go" | "search" | "join" | "done" | "next" | "route"
```

### Example

```tsx
<TextField submitLabel="search" />
```
