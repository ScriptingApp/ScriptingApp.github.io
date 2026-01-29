---
title: 示例
description: 一个按照水平方向扩展，并在需要时才创建子视图的容器视图。

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