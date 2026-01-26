# Example

```tsx
import { Chart, Navigation, NavigationStack, PointChart, RectAreaChart, Script, VStack } from "scripting"

const data = [
  { x: 5, y: 5 },
  { x: 2.5, y: 2.5 },
  { x: 3, y: 3 },
]

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"RectAreaChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart
        frame={{
          height: 300
        }}
      >
        <RectAreaChart
          marks={
            data.map(item => ({
              xStart: item.x - 0.25,
              xEnd: item.x + 0.25,
              yStart: item.y - 0.25,
              yEnd: item.y + 0.25,
              opacity: 0.2,
            }))
          }
        />

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
