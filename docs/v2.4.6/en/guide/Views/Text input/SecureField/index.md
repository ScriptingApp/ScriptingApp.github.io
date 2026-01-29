---
title: SecureField
description: A control into which people securely enter private text.

---
        
The `SecureField` component in Scripting provides a secure, private text input field intended for entering sensitive information such as passwords. The entered text is visually obscured and not displayed in plain text, mirroring the behavior of SwiftUI’s `SecureField`.

This component is useful in authentication forms, PIN inputs, or any context where user privacy is essential.

---

## Props

```ts
type SecureFieldProps = (
  | { title: string }
  | { label: VirtualNode }
) & {
  value: string
  onChanged: (value: string) => void
  prompt?: string
  autofocus?: boolean
  onFocus?: () => void
  onBlur?: () => void
}
```

### Property Descriptions

| Property    | Type                      | Description                                                                       |
| ----------- | ------------------------- | --------------------------------------------------------------------------------- |
| `title`     | `string`                  | A simple string label displayed with the field. *(Use either `title` or `label`)* |
| `label`     | `VirtualNode`             | A custom view node label. *(Use instead of `title`)*                              |
| `value`     | `string`                  | The current value of the secure text field.                                       |
| `onChanged` | `(value: string) => void` | Callback function invoked when the value changes.                                 |
| `prompt`    | `string` (optional)       | A placeholder prompt shown when the field is empty.                               |
| `autofocus` | `boolean` (optional)      | Automatically focuses the field on mount. Defaults to `false`.                    |
| `onFocus`   | `() => void` (optional)   | Callback triggered when the field receives focus.                                 |
| `onBlur`    | `() => void` (optional)   | Callback triggered when the field loses focus.                                    |

---

## Example

```tsx
import { useState, VStack, SecureField } from "scripting"

function LoginForm() {
  const [password, setPassword] = useState("")

  return <VStack padding>
    <SecureField
      title="Password"
      value={password}
      onChanged={setPassword}
      prompt="Enter your password"
    />
  </VStack>
}
```

In this example:

* A secure input field is used to capture a password.
* The input is visually hidden to ensure privacy.
* The `prompt` guides the user when no text is entered.

---

## Notes

* Either `title` or `label` must be provided (but not both).
* The field behaves similarly to `TextField`, with added security features for sensitive input.
* This component is suitable for use in login, signup, and settings forms where password entry is required.
