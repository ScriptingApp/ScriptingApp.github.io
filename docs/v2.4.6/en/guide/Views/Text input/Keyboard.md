---
title: Keyboard
description: This interface allows you to interact with the software keyboard.

---

The `Keyboard` API, along with the `useKeyboardVisible` hook, allows you to interact with the software keyboard in the Scripting app. You can check the keyboard's visibility, hide it, listen for visibility changes, and access the current visibility state reactively in functional components.

---

## Overview

The `Keyboard` API enables:
1. Checking if the keyboard is currently visible.
2. Hiding the keyboard programmatically.
3. Listening for keyboard visibility changes.
4. Using the `useKeyboardVisible` hook for a reactive approach to track the keyboard's visibility.

---

## Module: `Keyboard`

### Properties

- **`visible: boolean`**  
  A read-only property that indicates whether the keyboard is currently visible.  
  - `true`: The keyboard is visible.
  - `false`: The keyboard is hidden.

---

### Methods

#### `Keyboard.hide(): void`  
Hides the keyboard if it is currently visible.

- **Usage**:
  - If the keyboard is already hidden, this method does nothing.
  - Typically used to programmatically dismiss the keyboard.

---

#### `Keyboard.addVisibilityListener(listener: (visible: boolean) => void): void`  
Adds a listener function that is triggered whenever the keyboard's visibility changes.

- **Parameters**:
  - `listener: (visible: boolean) => void`: A callback function that receives a `visible` parameter:
    - `true`: Keyboard becomes visible.
    - `false`: Keyboard becomes hidden.

- **Usage**:
  - Use this method to execute custom logic when the keyboard appears or disappears.

---

#### `Keyboard.removeVisibilityListener(listener: (visible: boolean) => void): void`  
Removes a previously added visibility listener.

- **Parameters**:
  - `listener: (visible: boolean) => void`: The callback function to remove. It must match a function previously added with `addVisibilityListener`.

---

## Hook: `useKeyboardVisible`

### `useKeyboardVisible(): boolean`
A hook to access the current keyboard visibility state. The hook provides a reactive way to track whether the keyboard is visible.

- **Returns**:
  - `true`: The keyboard is currently visible.
  - `false`: The keyboard is currently hidden.

- **Usage**:
  - This hook is ideal for functional components to conditionally render UI elements or execute logic based on the keyboard's visibility state.

---

## Example Usage

### Check Keyboard Visibility with `Keyboard.visible`
```ts
if (Keyboard.visible) {
  console.log("The keyboard is visible.")
} else {
  console.log("The keyboard is hidden.")
}
```

---

### Hide the Keyboard
```ts
Keyboard.hide()
console.log("Keyboard hidden programmatically.")
```

---

### Add and Remove a Visibility Listener
```ts
// Define the listener
function handleKeyboardVisibility(visible: boolean) {
  if (visible) {
    console.log("Keyboard is now visible.")
  } else {
    console.log("Keyboard is now hidden.")
  }
}

// Add the listener
Keyboard.addVisibilityListener(handleKeyboardVisibility)

// Remove the listener
Keyboard.removeVisibilityListener(handleKeyboardVisibility)
console.log("Keyboard visibility listener removed.")
```

---

### Use `useKeyboardVisible` in a Functional Component
```tsx
import { useKeyboardVisible, VStack, Text } from 'scripting'

function KeyboardStatus() {
  const isKeyboardVisible = useKeyboardVisible()

  return (
    <VStack>
      {isKeyboardVisible ? (
        <Text>The keyboard is currently visible.</Text>
      ) : (
        <Text>The keyboard is currently hidden.</Text>
      )}
    </VStack>
  )
}
```

---

## Notes

1. **Reactive State with Hook**: Use the `useKeyboardVisible` hook in functional components for a clean and reactive way to track keyboard visibility.
2. **Static State with `Keyboard.visible`**: Use the `Keyboard.visible` property for quick, non-reactive checks.
3. **Event Listeners**: Add multiple visibility listeners with `addVisibilityListener` as needed, and ensure you remove them when no longer required to prevent memory leaks.
4. **Programmatic Dismissal**: The `Keyboard.hide()` method is useful for scenarios where you want to close the keyboard, such as when submitting a form or tapping outside an input field.
