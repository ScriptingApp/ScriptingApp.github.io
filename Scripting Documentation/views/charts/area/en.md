The `AreaChart` component displays data as a filled line chart, with areas under the curve shaded to emphasize magnitude over time or across categories. It is suitable for visualizing trends and cumulative values in a continuous dataset.

## Usage

```tsx
<Chart>
  <AreaChart
    labelOnYAxis={false}
    marks={[
      { label: "jan/22", value: 5 },
      { label: "feb/22", value: 4 },
      ...
    ]}
  />
</Chart>
```

## Props

### `labelOnYAxis?: boolean`

If set to `true`, the labels will be displayed along the **Y-axis**, and the chart will render horizontally.
Defaults to `false`, rendering a vertical area chart with labels on the X-axis.

### `marks: Array<object>` **(required)**

An array of data points to render on the chart. Each mark accepts:

* `label: string | Date`
  A label representing the horizontal or vertical axis position, depending on `labelOnYAxis`.

* `value: number`
  The numeric value for the data point.

* `unit?: CalendarComponent`
  (Optional) A time unit for time-based axes, such as `"month"`, `"year"`, etc.

* Additional `ChartMarkProps`
  The `AreaChart` also supports optional styling and customization properties inherited from `ChartMarkProps`, such as:

  * `foregroundStyle`
  * `opacity`
  * `symbol`
  * `annotation`
  * `offset`
  * and more.

## Example

```tsx
function Example() {
  const [labelOnYAxis, setLabelOnYAxis] = useState(false)

  return <NavigationStack>
    <VStack
      navigationTitle={"AreaChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Toggle
        title={"labelOnYAxis"}
        value={labelOnYAxis}
        onChanged={setLabelOnYAxis}
      />
      <Divider />
      <Chart>
        <AreaChart
          labelOnYAxis={labelOnYAxis}
          marks={[
            { label: "jan/22", value: 5 },
            { label: "feb/22", value: 4 },
            { label: "mar/22", value: 7 },
            { label: "apr/22", value: 15 },
            { label: "may/22", value: 14 },
            { label: "jun/22", value: 27 },
            { label: "jul/22", value: 27 },
          ]}
        />
      </Chart>
    </VStack>
  </NavigationStack>
}
```

## Run the Example

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```

## Use Case

The `AreaChart` is well-suited for:

* Visualizing trends over time (e.g., monthly values)
* Showing cumulative growth or decay
* Emphasizing magnitude using filled areas
