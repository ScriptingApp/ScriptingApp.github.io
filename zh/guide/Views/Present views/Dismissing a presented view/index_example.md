# 示例

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
