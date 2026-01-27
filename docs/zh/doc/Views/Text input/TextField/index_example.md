---
title: 示例

---

```tsx
import { useState, TextField, VStack, Text, NavigationStack, Navigation, Script } from "scripting"

function Example() {
  const [username, setUsername] = useState('')

  return <NavigationStack>
    <VStack
      navigationTitle={"TextField"}
    >
      <TextField
        title={"Username"}
        value={username}
        onChanged={setUsername}
        prompt={"Enter username"}
      />
      <Text>Username: {username}</Text>
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