import { Navigation, NavigationStack, QRImage, Script, Text, VStack } from "scripting"

function Example() {

  const url = "https://github.com"

  return <NavigationStack>
    <VStack
      navigationTitle={"QRImage"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Text>URL: {url}</Text>
      <QRImage
        data={url}
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