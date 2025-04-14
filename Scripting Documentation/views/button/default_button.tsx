import { Button, Navigation, NavigationStack, Script, VStack } from "scripting"

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"Default Button"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Button
        title={"Tap Me"}
        action={() => {
          Dialog.alert({
            message: "Button tapped."
          })
        }}
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