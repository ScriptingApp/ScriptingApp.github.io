---
title: Example

---

```tsx
import { BarChart, BarChartProps, Button, Chart, Navigation, NavigationStack, Script, VStack, useMemo } from "scripting"

const data = [
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

function View() {
  // Access dismiss function.
  const dismiss = Navigation.useDismiss()

  const list = useMemo(() => {
    return data.map(item => ({
      label: item.type,
      value: item.count,
      positionBy: {
        value: item.color,
        axis: 'horizontal',
      },
      foregroundStyleBy: item.color,
      cornerRadius: 8,
    }) as BarChartProps["marks"][0])
  }, [])

  return <NavigationStack>
    <VStack
      navigationTitle="Page Title"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        topBarLeading: <Button
          title="Done"
          action={dismiss}
        />
      }}
    >
      <Chart
        frame={{
          height: 400
        }}
      >
        <BarChart
          marks={list}
        />
      </Chart>
    </VStack>
  </NavigationStack>
}

async function run() {
  // Present view.
  await Navigation.present({
    element: <View />
  })

  // Avoiding memory leaks.
  Script.exit()
}

run()
```