---
title: 二维码

---

```tsx
import { Button, List, Navigation, NavigationStack, Script, Section, Text } from "scripting"

function Example() {
  return <NavigationStack>
    <List
      navigationTitle={"QRCode"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section
        footer={
          <Text>Open the QRCode scan page and scan.</Text>
        }
      >
        <Button
          title={"QRCode.scan"}
          action={async () => {
            const result = await QRCode.scan()
            if (result) {
              Dialog.alert({
                message: "Result: " + result
              })
            } else {
              Dialog.alert({
                message: "Cancelled"
              })
            }
          }}
        />
      </Section>

      <Section
        footer={
          <Text>Parse QRCode file to a string.</Text>
        }
      >
        <Button
          title={"QRCode.parse"}
          action={async () => {
            const result = await DocumentPicker.pickFiles({
              allowsMultipleSelection: false
            })
            if (result.length) {
              const code = await QRCode.parse(result[0])
              Dialog.alert({
                message: "Parse reuslt: " + code
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