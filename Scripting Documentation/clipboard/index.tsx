import { Button, List, Navigation, NavigationStack, Script, } from "scripting"

function Example() {

  return <NavigationStack>
    <List
      navigationTitle={"Clipboard"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Button
        title={"Clipboard.copyText"}
        action={async () => {
          Clipboard.copyText("Hello Scripting!")
          Dialog.alert({
            message:
              "Copied"
          })
        }}
      />

      <Button
        title={"Clipboard.getText"}
        action={async () => {
          const result = await Clipboard.getText()
          Dialog.alert({
            title: "Result from Clipboard:",
            message: result != null ? result : "null"
          })
        }}
      />
    </List>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <Example />
  })
  Script.exit()
}

run()