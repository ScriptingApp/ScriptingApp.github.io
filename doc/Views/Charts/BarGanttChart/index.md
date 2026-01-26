# BarGanttChart

The `BarGanttChart` component visualizes time intervals across multiple categories, making it ideal for illustrating schedules, timelines, or task durations. It displays bars that span from a start to an end value on a continuous axis, grouped by labeled categories.

## Usage

```tsx
<Chart frame={{ height: 400 }}>
  <BarGanttChart
    labelOnYAxis
    marks={[
      { label: "Job 1", start: 0, end: 15 },
      { label: "Job 2", start: 5, end: 25 },
      ...
    ]}
  />
</Chart>
```

## Props

### `labelOnYAxis?: boolean`

If `true`, the category labels will be displayed on the **Y-axis**, and bars will extend horizontally along the X-axis (typical Gantt chart layout).
Default is `false`, which would render a vertical layout with labels on the X-axis.

### `marks: Array<object>` **(required)**

Defines the time intervals for each bar. Each object must include:

- `label: string`
  The category label associated with the time interval (e.g., task or job name).

- `start: number`
  The starting value (usually representing time or progress) of the bar.

- `end: number`
  The ending value of the bar. The bar will visually span from `start` to `end`.

Additional `ChartMarkProps` can also be provided for customization.

## Example

```tsx
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
      <Chart frame={{ height: 400 }}>
        <BarGanttChart
          labelOnYAxis
          marks={data.map(item => ({
            label: item.job,
            start: item.start,
            end: item.end,
          }))}
        />
      </Chart>
    </VStack>
  </NavigationStack>
}
```

## Execution

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```

## Use Cases

`BarGanttChart` is ideal for:

- Project planning and task scheduling
- Visualizing task overlaps and durations
- Representing resource allocation over time
