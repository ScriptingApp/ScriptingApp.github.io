---
title: BarStackChart
description: A chart that displays data as stacked bars, where each bar represents a total and is divided into segments representing sub-values.

---
        
The `BarStackChart` component renders grouped values as stacked bars, enabling visual comparison of cumulative totals and their individual components across categories. Each bar is split into colored segments that represent different subcategories within a shared label.

## Example Scenario

This example visualizes toy counts grouped by **type** (`Cube`, `Sphere`, `Pyramid`) and stacked by **color** (`Green`, `Purple`, `Pink`, `Yellow`). The stacked bar chart shows how each color contributes to the total count per shape.

## Usage

```tsx
<Chart frame={{ height: 400 }}>
  <BarStackChart
    labelOnYAxis={false}
    marks={[
      { label: "Cube", value: 2, category: "Green" },
      { label: "Cube", value: 1, category: "Purple" },
      ...
    ]}
  />
</Chart>
```

## Props

### `labelOnYAxis?: boolean`

* If `true`, category labels will be displayed on the **Y-axis**, rendering the bars horizontally.
* If `false` (default), labels appear on the **X-axis**, and bars are drawn vertically.

### `marks: Array<object>` **(required)**

Each mark represents a segment in the stacked bar and includes the following fields:

* `label: string | Date`
  The shared label used to group segments into one bar (e.g., "Cube", "Sphere").

* `category: string`
  The subcategory used to split the bar into segments (e.g., color groups like "Green", "Pink").

* `value: number`
  The numeric value for this segment.

* `unit?: CalendarComponent`
  *(Optional)* Used when rendering time-based charts.

* Additional optional `ChartMarkProps`
  For customizing appearance, including:

  * `foregroundStyle`
  * `cornerRadius`
  * `symbol`
  * `annotation`
  * etc.

## Full Example

```tsx
const data = [
  { color: "Green", type: "Cube", count: 2 },
  { color: "Purple", type: "Cube", count: 1 },
  ...
]

<BarStackChart
  labelOnYAxis={labelOnYAxis}
  marks={data.map(item => ({
    label: item.type,
    value: item.count,
    category: item.color,
  }))}
/>
```

## Dynamic Layout Toggle

The example also includes a toggle to switch between vertical and horizontal layouts using `labelOnYAxis`.

## Execution

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}
```

## Use Cases

`BarStackChart` is ideal for:

* Showing composition of totals across categories
* Comparing group contributions visually
* Displaying part-to-whole relationships over multiple items
