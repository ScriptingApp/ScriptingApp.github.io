import { useState, SecureField, VStack, Text, NavigationStack, Navigation, Script } from "scripting"

function Example() {
  const [password, setPassword] = useState('')

  return <NavigationStack>
    <VStack
      navigationTitle={"SecureField"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <SecureField
        title={"Password"}
        value={password}
        onChanged={setPassword}
        prompt={"Enter password"}
      />
      <Text>Password: {password}</Text>
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
