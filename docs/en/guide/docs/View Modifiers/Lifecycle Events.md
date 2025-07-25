---
title: Lifecycle Events
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
| `onAppear`    | `() => void` | Called every time the view becomes visible. This includes the initial appearance and reappearance after being temporarily obscured (e.g., when dismissing a sheet). Executed before the first rendered frame. |
| `onDisappear` | `() => void` | Called every time the view is no longer visible on screen. This includes temporary disappearance (e.g., when presenting a sheet over the view).                                                               |

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

---

## Behavior Notes

* Unlike UIKit’s `viewDidAppear` and `viewDidDisappear`, which are tied to the navigation stack or full-screen view controller lifecycle, **Scripting's `onAppear` and `onDisappear` are called every time the view appears or disappears from the screen**.
* For example:

  * If you **present a sheet**, the background view’s `onDisappear` is triggered.
  * When the **sheet is dismissed**, the background view’s `onAppear` is triggered again.
* These events are **not called only once**, but **every time visibility changes**, making them well-suited for observing the view’s active presence in the UI.

---

## Use Cases

* `onAppear`:

  * Start loading data
  * Begin animations
  * Reset UI state when shown
* `onDisappear`:

  * Stop timers
  * Cancel requests
  * Save form data
