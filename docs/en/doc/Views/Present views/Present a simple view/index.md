---
title: Present a simple view

---
        
This example demonstrates how to display a basic UI screen in the Scripting app using the `Navigation.present` API. It also shows how to set up navigation-related features such as the navigation stack and page title.

---

## Overview

You will learn how to:

* Present a custom view using `Navigation.present`
* Create a structured layout using `NavigationStack` and `VStack`
* Set the navigation bar title using `navigationTitle`

---

## Example Code

```tsx
import { Navigation, NavigationStack, Script, Text, VStack } from "scripting"

function View() {

  return <NavigationStack>
    <VStack
      navigationTitle={"Present a simple view"}
    >
      <Text>Hello Scripting!</Text>
    </VStack>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <View />
  })

  Script.exit()
}

run()
```

---

## Key Components

### `Navigation.present(options)`

This function displays the given UI element modally as a full screen page. It takes an `element` property that defines the root view to show.

```ts
await Navigation.present({
  element: <View />
})
```

### `NavigationStack`

This component provides a navigation container that supports title display, navigation bar buttons, and structured transitions. It must be the outermost wrapper for views that use navigation features.

### `VStack`

A vertical layout container that stacks children in a top-to-bottom arrangement. In this example, it holds a single `Text` component.

### `navigationTitle`

Set on `VStack`, this prop sets the title shown in the navigation bar.

---

## Output

This example displays a simple page with the title **"Present a simple view"** and a message reading **"Hello Scripting!"** in the center of the screen.

---

## Notes

* Always wrap your views in `NavigationStack` if you want navigation behavior like back buttons, titles, or toolbars.
* Don’t forget to call `Script.exit()` after `Navigation.present()` resolves to avoid memory leaks.
