---
title: Lifecycle Events
description: The lifecycle hooks to execute custom logic when a view becomes visible or is removed from the visible interface.

---

Scripting supports SwiftUI-style lifecycle hooks `onAppear` and `onDisappear` to execute custom logic when a view becomes visible or is removed from the visible interface. These hooks allow you to trigger animations, start data loading, update state, or perform cleanup when views enter or exit the screen.

---

## Property Definitions

```ts
onAppear?: () => void
onDisappear?: () => void
```

### Property Descriptions

| Property      | Type         | Description                                                                                                                                                                                                   |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onAppear`    | `() => void` | Called when the view becomes visible. |
| `onDisappear` | `() => void` | Called when the view is no longer visible on screen. |

---

## Example

```tsx
import { VStack, Text, useState } from "scripting"

function Example() {
  const [message, setMessage] = useState("")

  return <VStack
    onAppear={() => setMessage("View is visible")}
    onDisappear={() => setMessage("View is hidden")}
    padding
  >
    <Text>{message}</Text>
  </VStack>
}
```
