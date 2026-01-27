---
title: 折叠分栏视图

---

```tsx
import { Navigation, NavigationSplitView, NavigationSplitViewColumn, Script, Text, useState, VStack } from "scripting"

function Example() {
  const [preferredColumn, setPreferredColumn] = useState<NavigationSplitViewColumn>("detail")

  return <NavigationSplitView
    preferredCompactColumn={{
      value: preferredColumn,
      onChanged: (value) => {
        console.log("preferredCompactColumn changed to", value)
        setPreferredColumn(value)
      }
    }}
    sidebar={
      <VStack
        navigationContainerBackground={"yellow"}
        frame={{
          maxWidth: "infinity",
          maxHeight: "infinity",
        }}
      >
        <Text>Yellow</Text>
      </VStack>
    }
  >
    <VStack
      navigationContainerBackground={"blue"}
      frame={{
        maxWidth: "infinity",
        maxHeight: "infinity",
      }}
    >
      <Text>Blue</Text>
    </VStack>
  </NavigationSplitView>
}

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```