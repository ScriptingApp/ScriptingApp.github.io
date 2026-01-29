# ShareSheet

```tsx
import { Button, List, Navigation, NavigationStack, Script, Section, Text } from "scripting"

function Example() {

  return <NavigationStack>
    <List
      navigationTitle={"ShareSheet"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section
        footer={
          <Text>Present a ShareSheet UI.</Text>
        }
      >
        <Button
          title={"ShareSheet.present"}
          action={async () => {
            // const image = await Photos.getLatestPhotos(1)
            // await ShareSheet.present([image])
            if (await ShareSheet.present(["Hello Scripting!"])) {
              Dialog.alert({
                message: "Share successfully."
              })
            } else {
              Dialog.alert({
                message: "Cancelled"
              })
            }
          }}
        />
      </Section>
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
```
