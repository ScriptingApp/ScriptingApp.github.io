import { Navigation, NavigationStack, Script, Text, VStack } from "scripting"

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle="Attributed String Text"
    >
      <Text
        attributedString={`This is regular text.
* This is **bold** text, this is *italic* text, and this is ***bold, italic*** text.
~~A strikethrough example~~
\`Monospaced works too\`
Visit Apple: [click here](https://apple.com)`}
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