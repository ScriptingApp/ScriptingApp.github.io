---
title: RangeAreaChart
description: A chart that displays data as areas between two lines, representing a range of values.

---
        
The `RangeAreaChart` component displays a shaded area between a range of values for each data point, typically between a `start` and `end` value. It is ideal for visualizing value intervals, such as temperature ranges, confidence intervals, or min/max ranges over time.

---

## Usage Example

```tsx
<RangeAreaChart
  marks={[
    { label: "Jan", start: 0, end: 4 },
    { label: "Feb", start: 2, end: 6 },
    ...
  ]}
/>
```

---

## Props

### `marks: Array<object>` **(required)**

Each `mark` defines the area range for one category.

* `label: string | Date`
  The X-axis label (e.g., month, category name, time).

* `start: number`
  The lower boundary of the range.

* `end: number`
  The upper boundary of the range.

* *(Optional)* properties from `ChartMarkProps`:

  * `foregroundStyle` – fill color of the area
  * `opacity`, `interpolationMethod`, `annotation`, etc.

---

### `interpolationMethod?: string`

Specifies how the area curve is drawn between points.
For example, `'catmullRom'` produces a smooth, curved shape between ranges.

---

## Full Example

```tsx
const weatherData = [
  { month: "Jan", min: 0, max: 4 },
  { month: "Feb", min: 2, max: 6 },
  ...
]

<RangeAreaChart
  marks={weatherData.map(item => ({
    label: item.month,
    start: item.min,
    end: item.max,
    interpolationMethod: "catmullRom"
  }))}
/>
```

This example plots monthly temperature ranges using a smooth interpolated area chart.

---

## Use Cases

`RangeAreaChart` is well-suited for:

* Temperature ranges over time
* Visualizing confidence intervals in statistics
* Min/max stock prices, performance bands, or uncertainty areas
