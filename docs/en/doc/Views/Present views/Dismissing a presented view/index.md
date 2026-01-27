---
title: Dismissing a presented view

---
        
This example demonstrates how to **programmatically dismiss a presented view** using the `Navigation.useDismiss` hook. It is useful when you want to close a custom view in response to user interaction, such as tapping a button or a text label.

---

## Purpose

You will learn how to:

* Access the dismiss function via `Navigation.useDismiss`
* Call the dismiss function to close the currently presented view
* Safely exit the script using `Script.exit` to avoid memory leaks

---

## Example Code

```tsx
import { Navigation, NavigationStack, Script, Text, VStack } from "scripting"

function View() {
  // Access the `dismiss` function of the context.
  const dismiss = Navigation.useDismiss()

  return <NavigationStack>
    <VStack
      navigationTitle={"Dismiss a view"}
    >
      <Text
        foregroundStyle={'link'}
        onTapGesture={() => {
          dismiss()
        }}
      >Tap and dismiss</Text>
    </VStack>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <View />
  })

  // Avoiding memory leaks.
  Script.exit()
}

run()
```

---

## Key Concepts

### `Navigation.useDismiss()`

This hook returns the `dismiss` function from the current view context. When called, it dismisses the view presented via `Navigation.present()`.

### When to use it

* To manually close a presented UI view
* As part of form submission, cancellation, or navigation control logic

### Example usage

In the example, a tappable `Text` is rendered:

```tsx
<Text
  foregroundStyle={'link'}
  onTapGesture={() => {
    dismiss()
  }}
>
  Tap and dismiss
</Text>
```

Tapping the text triggers `dismiss()`, closing the view.

---

## Best Practices

* Always call `Script.exit()` after `Navigation.present()` completes to avoid memory leaks.
* Wrap your view in `NavigationStack` to support title bars and navigation behavior.
* Ensure `useDismiss` is only used inside the component tree presented via `Navigation.present()`.

---

## Result

This script will present a simple view with a link-style text labeled **“Tap and dismiss”**. When the user taps it, the view will close.
