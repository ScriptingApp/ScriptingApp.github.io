# Example

```tsx
import { Chart, Navigation, NavigationStack, RangeAreaChart, Script, VStack } from "scripting"

const weatherData = [
  { month: 'Jan', min: 0, max: 4 },
  { month: 'Feb', min: 2, max: 6 },
  { month: 'Mar', min: 3, max: 8 },
  { month: 'Apr', min: 5, max: 10 },
  { month: 'May', min: 7, max: 14 },
  { month: 'Jun', min: 10, max: 25 },
  { month: 'Jul', min: 15, max: 30 },
  { month: 'Aug', min: 20, max: 33 },
  { month: 'Sep', min: 24, max: 35 },
  { month: 'Oct', min: 18, max: 30 },
  { month: 'Nov', min: 10, max: 23 },
  { month: 'Dec', min: 5, max: 10 },
]

function Example() {

  return <NavigationStack>
    <VStack
      navigationTitle={"RangeAreaChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart
        frame={{
          height: 300
        }}
      >
        <RangeAreaChart
          marks={weatherData.map(item => ({
            label: item.month,
            start: item.min,
            end: item.max,
            interpolationMethod: 'catmullRom'
          }))}
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
