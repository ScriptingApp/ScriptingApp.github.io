import { Image, Navigation, NavigationStack, ProgressView, Script, VStack } from "scripting"

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"NetworkImage"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Image
        imageUrl={'https://developer.apple.com/assets/elements/icons/swiftui/swiftui-96x96_2x.png'}
        resizable
        scaleToFit
        placeholder={<ProgressView
          progressViewStyle={'circular'}
        />}
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