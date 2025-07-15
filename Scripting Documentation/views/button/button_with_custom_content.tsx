import { Button, HStack, Image, Navigation, NavigationStack, Script, Text, VStack } from "scripting"

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"Button with custom content"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Button
        action={() => {
          Dialog.alert({
            message: "Custom button tapped."
          })
        }}
      >
        <HStack>
          <Image
            systemName={"plus"}
          />
          <Text>Add</Text>
        </HStack>
      </Button>
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