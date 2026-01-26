# 示例

```tsx
import { Chart, List, Navigation, NavigationStack, RectChart, Script, Section, Toggle, useState } from "scripting"

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
      navigationTitle={"RectChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section>
        <Toggle
          title={"labelOnYAxis"}
          value={labelOnYAxis}
          onChanged={setLabelOnYAxis}
        />
      </Section>
      <Chart>
        <RectChart
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
