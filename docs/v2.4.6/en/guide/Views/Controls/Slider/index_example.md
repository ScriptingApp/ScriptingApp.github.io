---
title: Example
description: A control for selecting a value from a bounded linear range of values.

---

```tsx
import { useState, Slider, Text, VStack, NavigationStack, Navigation, Script } from "scripting"

function Example() {
  const [value, setValue] = useState(15)

  return <NavigationStack>
    <VStack
      navigationTitle={"Slider"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Slider
        min={0}
        max={100}
        value={value}
        onChanged={setValue}
        label={<Text>{value}</Text>}
        minValueLabel={<Text>0</Text>}
        maxValueLabel={<Text>100</Text>}
      />
      <Text>Current value: {value}</Text>
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