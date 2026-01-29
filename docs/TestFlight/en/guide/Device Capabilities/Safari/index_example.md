---
title: Example
description: Present a website either in-app or leaving the app and opening the system default browser.

---

```tsx
import { Button, List, Navigation, NavigationStack, Script, } from "scripting"

function Example() {
  return <NavigationStack>
    <List
      navigationTitle={"Safari"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Button
        title={"Open URL in system default browser"}
        action={() => {
          Safari.openURL("https://github.com")
        }}
      />

      <Button
        title={"Open URL in-app browser"}
        action={async () => {
          await Safari.present("https://github.com", false)
          console.log("Dismissed")
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