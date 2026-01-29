---
title: Example
description: A view that arranges its children in a line that grows horizontally, creating items only as needed.

---

```tsx
import { ForEach, LazyHStack, Navigation, NavigationStack, Script, ScrollView, Text, VStack } from "scripting"

function Example() {

  return <NavigationStack>
    <VStack
      navigationTitle={"LazyHStack"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <ScrollView
        axes={"horizontal"}
      >
        <LazyHStack
          alignment={"top"}
          spacing={10}
        >
          <ForEach
            count={100}
            itemBuilder={index =>
              <Text
                padding
                background={"systemIndigo"}
                key={index.toString()}
              >Column {index}</Text>
            }
          />
        </LazyHStack>
      </ScrollView>
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