import { Image, Navigation, NavigationStack, Script, VStack } from "scripting"

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"SFSymbol"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Image
        systemName={"phone"}
        resizable
        scaleToFit
        frame={{
          width: 32,
          height: 32,
        }}
        foregroundStyle={"systemGreen"}
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