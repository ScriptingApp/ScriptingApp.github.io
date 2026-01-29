# Example

```tsx
import { useState, VStack, Toggle, Text, Navigation, Script, NavigationStack } from "scripting"

function Example() {
  const [on, setOn] = useState(false)

  return <NavigationStack>
    <VStack
      navigationTitle={"Toggle"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Toggle
        title={"Toggle Switch"}
        value={on}
        onChanged={setOn}
      />
      <Text>Current: {on ? 'on' : 'off'}</Text>
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
