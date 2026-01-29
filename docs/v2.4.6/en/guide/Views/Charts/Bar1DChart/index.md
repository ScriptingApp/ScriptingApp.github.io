---
title: Bar1DChart
description: A chart that displays data as a single-dimensional bar, typically used for representing a single value or category.

---
        
The `Bar1DChart` component renders a one-dimensional bar chart for comparing numerical values across discrete categories. Each bar represents a single category with its corresponding value, making it ideal for simple horizontal or vertical bar comparisons.

## Usage

```tsx
<Chart
  padding={0}
  frame={{ height: 400 }}
>
  <Bar1DChart
    marks={[
      { category: "Gadgets", value: 3800 },
      { category: "Gizmos", value: 4400 },
      { category: "Widgets", value: 6500 },
    ]}
  />
</Chart>
```

## Props

### `labelOnYAxis?: boolean`

If set to `true`, category labels will be displayed on the Y-axis and bars will be laid out horizontally.
Defaults to `false`, where labels appear on the X-axis and bars are rendered vertically.

### `marks: Array<object>` **(required)**

An array of data points defining each bar. Each mark includes:

* `category: string`
  The category label for the bar.

* `value: number`
  The numeric value represented by the bar length.

* Additional optional `ChartMarkProps`:
  Use `ChartMarkProps` to further style or annotate the bars, including:

  * `foregroundStyle`
  * `opacity`
  * `symbol`
  * `annotation`
  * `offset`
  * `zIndex`, etc.

## Example

```tsx
const data = [
  { type: "Gadgets", profit: 3800 },
  { type: "Gizmos", profit: 4400 },
  { type: "Widgets", profit: 6500 },
]

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"Bar1DChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart
        padding={0}
        frame={{ height: 400 }}
      >
        <Bar1DChart
          marks={data.map(item => ({
            category: item.type,
            value: item.profit,
          }))}
        />
      </Chart>
    </VStack>
  </NavigationStack>
}
```

## Run the Chart

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

`Bar1DChart` is best suited for:

* Comparing discrete values across categories
* Displaying ranked items or sorted values
* Visualizing simple datasets in a clear and minimal layout
