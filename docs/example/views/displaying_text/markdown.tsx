import { Markdown, Navigation, NavigationStack, Script, VStack } from "scripting"

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"Markdown"}
    >
      <Markdown
        content={`
# Scripting App
Run your *ideas* quickly **with** scripts.
      `}
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