---
title: 示例
description: 在应用内或跳转至系统默认浏览器来展示网站。

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