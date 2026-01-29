---
title: 示例
description: 一个将数据表示为矩形条形，其长度与所代表的值成比例的图表。

---

```tsx
import { BarChart, Chart, List, Navigation, NavigationStack, Script, Section, Toggle, useState, } from "scripting"

type ToyShape = {
  type: string
  count: number
}

const toysData: ToyShape[] = [
  {
    type: "Cube",
    count: 5,
  },
  {
    type: "Sphere",
    count: 4,
  },
  {
    type: "Pyramid",
    count: 4
  }
]

function Example() {
  const [labelOnYAxis, setLabelOnYAxis] = useState(false)

  return <NavigationStack>
    <List
      navigationTitle={"BarChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section>
        <Toggle
          title={"labelOnYAxis"}
          value={labelOnYAxis}
          onChanged={setLabelOnYAxis}
        />
      </Section>
      <Chart
        chartXVisibleDomain={10}
        frame={{
          height: 400
        }}
      >
        <BarChart
          labelOnYAxis={labelOnYAxis}
          marks={toysData.map(toy => ({
            label: toy.type,
            value: toy.count,
          }))}
        />
      </Chart>
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