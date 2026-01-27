---
title: Example

---

```tsx
import { Chart, LineCategoryChart, List, Navigation, NavigationStack, Script, Section, Toggle, useState } from "scripting"

const data = [
  { label: "Production", value: 4000, category: "Gizmos" },
  { label: "Production", value: 5000, category: "Gadgets" },
  { label: "Production", value: 6000, category: "Widgets" },
  { label: "Marketing", value: 2000, category: "Gizmos" },
  { label: "Marketing", value: 1000, category: "Gadgets" },
  { label: "Marketing", value: 5000.9, category: "Widgets" },
  { label: "Finance", value: 2000.5, category: "Gizmos" },
  { label: "Finance", value: 3000, category: "Gadgets" },
  { label: "Finance", value: 5000, category: "Widgets" },
]

function Example() {
  const [labelOnYAxis, setLabelOnYAxis] = useState(false)

  return <NavigationStack>
    <List
      navigationTitle={"LineCategoryChart"}
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
          height: 300
        }}
      >
        <LineCategoryChart
          labelOnYAxis={labelOnYAxis}
          marks={data}
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