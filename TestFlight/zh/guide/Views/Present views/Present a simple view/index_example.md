# 示例

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
