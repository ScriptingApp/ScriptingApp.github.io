---
title: Example
description: A view that arranges its subviews in a vertical line.

---

```tsx
import { Navigation, NavigationStack, Script, Text, VStack } from "scripting"

function Example() {
  const list = [0, 1, 2, 3, 4]

  return <NavigationStack>
    <VStack
      navigationTitle={"VStack"}
      alignment={"leading"}
      spacing={10}
    >
      {list.map((_, index) =>
        <Text>Item{index + 1}</Text>
      )}
    </VStack>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <Example />
  })
  Script.exit()
}

run()
```