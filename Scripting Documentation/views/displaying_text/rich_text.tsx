import { Navigation, NavigationStack, Script, Text, VStack, } from "scripting"

function Example() {

  return <NavigationStack>
    <VStack
      navigationTitle={"RichText"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Text
        font={16}
        styledText={{
          content: [
            "I agree the ",
            {
              content: "Terms",
              foregroundColor: "systemOrange",
              underlineColor: "systemBlue",
              bold: true,
              onTapGesture: () => {
                Dialog.alert({
                  message: "OK!"
                })
              }
            }
          ]
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