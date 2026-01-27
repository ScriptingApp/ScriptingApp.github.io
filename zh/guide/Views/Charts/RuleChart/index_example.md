# 示例

```tsx
import { Chart, Navigation, NavigationStack, RuleChart, Script, VStack } from "scripting"

const data = [
  { startMonth: 1, numMonths: 9, source: "Trees" },
  { startMonth: 12, numMonths: 1, source: "Trees" },
  { startMonth: 3, numMonths: 8, source: "Grass" },
  { startMonth: 4, numMonths: 8, source: "Weeds" },
]

function Example() {

  return <NavigationStack>
    <VStack
      navigationTitle={"RuleChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart
        frame={{
          height: 300
        }}
      >
        <RuleChart
          labelOnYAxis
          marks={
            data.map(item => ({
              start: item.startMonth,
              end: item.startMonth + item.numMonths,
              label: item.source,
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
