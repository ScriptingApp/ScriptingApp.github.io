# Example

```tsx
import { BarStackChart, Chart, List, Navigation, NavigationStack, Script, Section, Toggle, useState, } from "scripting"

type ToyShape = {
  color: string
  type: string
  count: number
}

const toyWithColorData: ToyShape[] = [
  { color: "Green", type: "Cube", count: 2 },
  { color: "Green", type: "Sphere", count: 0 },
  { color: "Green", type: "Pyramid", count: 1 },
  { color: "Purple", type: "Cube", count: 1 },
  { color: "Purple", type: "Sphere", count: 1 },
  { color: "Purple", type: "Pyramid", count: 1 },
  { color: "Pink", type: "Cube", count: 1 },
  { color: "Pink", type: "Sphere", count: 2 },
  { color: "Pink", type: "Pyramid", count: 0 },
  { color: "Yellow", type: "Cube", count: 1 },
  { color: "Yellow", type: "Sphere", count: 1 },
  { color: "Yellow", type: "Pyramid", count: 2 },
]

function Example() {
  const [labelOnYAxis, setLabelOnYAxis] = useState(false)

  return <NavigationStack>
    <List
      navigationTitle={"BarStackChart"}
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
        frame={{
          height: 400
        }}
      >
        <BarStackChart
          labelOnYAxis={labelOnYAxis}
          marks={toyWithColorData.map(toy => ({
            label: toy.type,
            value: toy.count,
            category: toy.color,
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
