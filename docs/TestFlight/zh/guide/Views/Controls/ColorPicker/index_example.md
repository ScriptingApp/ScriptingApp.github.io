---
title: 示例
description: 一个从系统颜色选择器界面中选取颜色的控件。

---

```tsx
import { Color, ColorPicker, Navigation, NavigationStack, Script, Text, useState, VStack } from "scripting"

function Example() {
  const [value, setValue] = useState<Color>('blue')

  return <NavigationStack>
    <VStack
      navigationTitle={"Color Picker"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <ColorPicker
        value={value}
        onChanged={setValue}
      >
        <Text>Current color: {value}</Text>
      </ColorPicker>
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

```