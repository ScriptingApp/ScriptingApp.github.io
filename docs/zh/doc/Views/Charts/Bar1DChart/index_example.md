---
title: 示例

---

```tsx
import { Bar1DChart, Chart, Navigation, NavigationStack, Script, VStack } from "scripting"

const data = [
  { type: "Gadgets", profit: 3800 },
  { type: "Gizmos", profit: 4400 },
  { type: "Widgets", profit: 6500 },
]

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"Bar1DChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart
        padding={0}
        frame={{
          height: 400
        }}
      >
        <Bar1DChart
          marks={data.map(item => ({
            category: item.type,
            value: item.profit,
          }))}
        />
      </Chart>
    </VStack>
  </NavigationStack >
}

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```