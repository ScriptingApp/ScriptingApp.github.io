---
title: Example

---

```tsx
import { BarGanttChart, Chart, Navigation, NavigationStack, Script, VStack } from "scripting"

const data = [
  { job: "Job 1", start: 0, end: 15 },
  { job: "Job 2", start: 5, end: 25 },
  { job: "Job 1", start: 20, end: 35 },
  { job: "Job 1", start: 40, end: 55 },
  { job: "Job 2", start: 30, end: 60 },
  { job: "Job 2", start: 30, end: 60 },
]

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"BarGanttChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart
        frame={{
          height: 400
        }}
      >
        <BarGanttChart
          labelOnYAxis
          marks={data.map(item => ({
            label: item.job,
            start: item.start,
            end: item.end
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