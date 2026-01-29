---
title: 示例
description: 一个将数据表示为单个点的图表，通常用于散点图或离散数据。

---

```tsx
import { Chart, Navigation, NavigationStack, PointChart, Script, VStack } from "scripting"

const data = [
  { x: 0, y: 2 },
  { x: 1, y: 3 },
  { x: 2, y: 4 },
  { x: 3, y: 3 },
  { x: 4, y: 6 },
]

function Example() {

  return <NavigationStack>
    <VStack
      navigationTitle={"PointChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart
        frame={{
          height: 300
        }}>
        <PointChart
          marks={data}
        />
      </Chart>
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