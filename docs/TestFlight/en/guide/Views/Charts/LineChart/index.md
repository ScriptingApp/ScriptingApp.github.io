---
title: LineChart
description: A chart that displays data as a series of points connected by straight lines.

---
        
The `LineChart` component renders a single continuous line across discrete labeled points. It is useful for visualizing simple trends or progressions where each data point is mapped to a category or label.

It shares the same API as `BarChart` and is ideal for basic one-line comparisons over labeled axes.

---

## Example Scenario

This example visualizes the count of different toy shapes (`Cube`, `Sphere`, `Pyramid`) using a single line. The user can toggle between horizontal and vertical layouts using `labelOnYAxis`.

---

## Usage

```tsx
<Chart>
  <LineChart
    labelOnYAxis={false}
    marks={[
      { label: "Cube", value: 5 },
      { label: "Sphere", value: 4 },
      { label: "Pyramid", value: 4 },
    ]}
  />
</Chart>
```

---

## Props

### `labelOnYAxis?: boolean`

* When `true`, category labels are shown on the **Y-axis**, and the line is plotted **horizontally**.
* When `false` (default), labels appear on the **X-axis**, and the line is plotted **vertically**.

---

### `marks: Array<object>` **(required)**

Each item defines a point on the line:

* `label: string | Date`
  The axis label corresponding to the point (e.g., category, time, name).

* `value: number`
  The numeric value for this point.

* Optional fields from `ChartMarkProps` can also be applied:

  * `foregroundStyle`
  * `symbol`
  * `annotation`
  * `cornerRadius`
  * `opacity`, etc.

---

## Full Example

```tsx
const toysData = [
  { type: "Cube", count: 5 },
  { type: "Sphere", count: 4 },
  { type: "Pyramid", count: 4 },
]

<LineChart
  marks={toysData.map(toy => ({
    label: toy.type,
    value: toy.count,
  }))}
/>
```

---

## Use Cases

`LineChart` is useful for:

* Showing a basic trend or progression over a labeled axis
* Comparing changes across a single dimension
* Minimal visualizations with one continuous line
