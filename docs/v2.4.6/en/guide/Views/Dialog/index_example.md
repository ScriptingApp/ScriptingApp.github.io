---
title: Example
description: This interface provides some shortcut methods for displaying dialog boxes.

---

```tsx
import { Button, List, Navigation, NavigationStack, Script, } from "scripting"

function Example() {

  return <NavigationStack>
    <List
      navigationTitle={"Dialog"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Button
        title={"Dialog.alert"}
        action={async () => {
          await Dialog.alert({
            message: "This is message",
            title: "Alert",
          })
          console.log("Alert dismissed")
        }}
      />

      <Button
        title={"Dialog.prompt"}
        action={async () => {
          const result = await Dialog.prompt({
            title: "Rename script",
            placeholder: "Enter script name",
          })

          Dialog.alert({
            message: result == null
              ? "You cancel the prompt"
              : "The new script name is: " + result
          })
        }}
      />

      <Button
        title={"Dialog.actionSheet"}
        action={async () => {
          const selectedIndex = await Dialog.actionSheet({
            title: "Are you sure to delete this script?",
            message: "This operation cannot be undone.",
            cancelButton: true,
            actions: [
              {
                label: "Delete",
                destructive: true,
              }
            ]
          })

          if (selectedIndex === 0) {
            Dialog.alert({
              message: "The script is deleted."
            })
          }
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
```