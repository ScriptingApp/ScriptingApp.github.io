---
title: 示例
description: 一个将数据表示为颜色矩阵的图表，其中每种颜色代表二维空间中的一个值。

---

```tsx
import { Chart, HeatMapChart, Navigation, NavigationStack, Script, VStack } from "scripting"

const data = [
  { positive: "+", negative: "+", num: 125 },
  { positive: "+", negative: "-", num: 10 },
  { positive: "-", negative: "-", num: 80 },
  { positive: "-", negative: "+", num: 1 },
]

function Example() {

  return <NavigationStack>
    <VStack
      navigationTitle={"HeatMapChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart
        aspectRatio={{
          value: 1,
          contentMode: 'fit'
        }}
      >
        <HeatMapChart
          marks={
            data.map(item => ({
              x: item.positive,
              y: item.negative,
              value: item.num,
            }))
          }
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