---
title: RectChart

---
        
The `RectChart` component renders a bar-like rectangular chart that visualizes value-based data associated with labels. It is similar in usage to `BarChart` and uses the same `BarChartProps` interface.

---

## Example

```tsx
<RectChart
  labelOnYAxis={false}
  marks={[
    { label: "Cube", value: 5 },
    { label: "Sphere", value: 4 },
    { label: "Pyramid", value: 4 },
  ]}
/>
```

---

## Props

### `labelOnYAxis` (optional)

* **Type:** `boolean`
* **Default:** `false`
* **Description:**
  If `true`, the labels will appear along the Y-axis and the chart will display as horizontal bars. If `false`, labels are on the X-axis with vertical bars.

---

### `marks` (required)

* **Type:** `Array<{ label: string | Date; value: number; unit?: CalendarComponent } & ChartMarkProps>`
* **Description:**
  Defines each data point to render as a rectangle in the chart.

#### `mark` object fields:

* `label`: The category label shown on the axis (e.g., “Cube”).
* `value`: The numeric value determining the height or width of the rectangle.
* `unit`: *(Optional)* A calendar unit used for time-based data.

You may also use optional visual properties inherited from `ChartMarkProps`, such as:

* `foregroundStyle`
* `cornerRadius`
* `annotation`
* `opacity`

---

## Full Example

```tsx
const toysData = [
  { type: "Cube", count: 5 },
  { type: "Sphere", count: 4 },
  { type: "Pyramid", count: 4 },
]

<RectChart
  labelOnYAxis={true}
  marks={toysData.map(toy => ({
    label: toy.type,
    value: toy.count,
  }))}
/>
```

---

## Use Cases

* Comparing categorical quantities visually.
* Displaying metrics in dashboards or reports.
* Alternative to traditional bar charts with customizable rendering.
