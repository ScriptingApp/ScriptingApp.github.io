---
title: Example
description: New networkInterfaces method.

---

```tsx
import { Button, Device, List, Navigation, NavigationStack, Script, Text, VStack } from "scripting"

 function Example() {
  const dismiss = Navigation.useDismiss()

  const details: {
    name: string
    value: string | boolean | number
  }[] = [
      {
        name: "Device.isiPhone",
        value: Device.isiPhone
      },
      {
        name: "Device.isiPad",
        value: Device.isiPad,
      },
      {
        name: "Device.systemVersion",
        value: Device.systemVersion,
      },
      {
        name: "Device.systemName",
        value: Device.systemName,
      },
      {
        name: "Device.isPortrait",
        value: Device.isPortrait,
      },
      {
        name: "Device.isLandscape",
        value: Device.isLandscape,
      },
      {
        name: "Device.isFlat",
        value: Device.isFlat,
      },
      {
        name: "Device.batteryLevel",
        value: Device.batteryLevel,
      },
      {
        name: "Device.batteryState",
        value: Device.batteryState,
      }
    ]

  return <NavigationStack>
    <List
      navigationTitle={"Device"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />
      }}
    >
      {details.map(item =>
        <VStack
          badge={item.value.toString()}
          alignment={"leading"}
        >
          <Text font={"headline"}>{item.name}</Text>
          <Text font={"caption"}>{typeof item.value}</Text>
        </VStack>
      )}
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