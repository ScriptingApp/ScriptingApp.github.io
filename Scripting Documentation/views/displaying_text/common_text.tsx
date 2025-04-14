import { Navigation, NavigationStack, Script, Text, VStack } from "scripting"

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle="Common Text"
    >
      <Text
        font={"title"}
        foregroundStyle={"systemRed"}
      >
        Title
      </Text>
      <Text
        font={"body"}
        foregroundStyle={"systemBlue"}
      >Hello Scripting!</Text>
      <Text
        foregroundStyle={"systemGreen"}
        font={"footnote"}
        italic
      >
        This is a footnote.
      </Text>
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