---
title: 示例

---

```tsx
import { HStack, Navigation, NavigationStack, Script, Text } from "scripting"

function Example() {
  const list = [0, 1, 2, 3, 4]

  return <NavigationStack>
    <HStack
      navigationTitle={"HStack"}
      alignment={"top"}
      spacing={10}
    >
      {list.map((_, index) =>
        <Text>Item{index + 1}</Text>
      )}
    </HStack>
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