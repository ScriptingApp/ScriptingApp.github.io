import { Label, Navigation, NavigationStack, Script, VStack } from "scripting"

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"Label"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Label
        title={"Hello world"}
        systemImage={"globe"}
      />
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