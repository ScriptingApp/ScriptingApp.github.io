---
title: TextField

---
        
The `TextField` component in the Scripting app provides a declarative way to create a text input field, similar to SwiftUI’s `TextField`. It supports both single-line and multiline input, custom labels, placeholder prompts, scroll direction, focus handling, and line constraints.

This component is ideal for collecting short inputs like usernames or longer inputs like messages, with seamless integration into reactive view hierarchies.

---

## Props

```ts
type TextFieldProps = (
  | { title: string }
  | { label: VirtualNode }
) & {
  value: string
  onChanged: (value: string) => void
  prompt?: string
  axis?: Axis
  autofocus?: boolean
  onFocus?: () => void
  onBlur?: () => void
}
```

### Property Details

| Property    | Type                                                                            | Description                                                                              |
| ----------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `title`     | `string`                                                                        | A simple string label displayed alongside the field. *(Required if `label` is not used)* |
| `label`     | `VirtualNode`                                                                   | A custom node-based label. *(Use instead of `title`)*                                    |
| `value`     | `string`                                                                        | The current text input value.                                                            |
| `onChanged` | `(value: string) => void`                                                       | Callback triggered whenever the input text changes.                                      |
| `prompt`    | `string` (optional)                                                             | A hint or placeholder to guide the user’s input.                                         |
| `axis`      | `"horizontal"` \| `"vertical"` (optional)                                       | Scroll direction when content exceeds bounds. Use `"vertical"` for multiline support.    |
| `autofocus` | `boolean` (optional)                                                            | If `true`, the field receives focus on mount. Default is `false`.                        |
| `onFocus`   | `() => void` (optional)                                                         | Called when the field gains focus.                                                       |
| `onBlur`    | `() => void` (optional)                                                         | Called when the field loses focus.                                                       |

---

## Example: Multiline, Vertically Scrollable TextField

```tsx
import { useState, VStack, TextField } from "scripting"

function ScrollableTextInput() {
  const [text, setText] = useState("")

  return <VStack padding>
    <TextField
      title="Message"
      value={text}
      onChanged={setText}
      prompt="Enter your message"
      axis="vertical"
      lineLimit={{ min: 3, max: 8 }}
    />
  </VStack>
}
```

### Behavior

* The field grows from 3 to 8 lines in height as text is entered.
* When content exceeds 8 lines, it becomes scrollable.
* The `prompt` is shown as placeholder text until input is provided.

---

## Example: Basic Single-Line TextField

```tsx
import { useState, VStack, TextField, Text } from "scripting"

function UsernameInput() {
  const [username, setUsername] = useState("")

  return <VStack padding>
    <TextField
      title="Username"
      value={username}
      onChanged={setUsername}
      prompt="Enter your username"
    />
    <Text>Username: {username}</Text>
  </VStack>
}
```

---

## Notes

* You must provide either `title` or `label`, not both.
* For multiline input, set `axis="vertical"` and define a `lineLimit`.
* `TextField` integrates seamlessly with state hooks like `useState` to enable real-time reactivity.
* Focus and blur events are helpful for validating or tracking input behavior.
