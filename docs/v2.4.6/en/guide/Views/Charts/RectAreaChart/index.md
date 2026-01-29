---
title: RectAreaChart
description: A chart that displays data as rectangular areas, where the size and color of each rectangle represent different data values.

---
        
The `RectAreaChart` component renders rectangular areas over a 2D chart coordinate space. It is useful for highlighting regions, data clusters, or ranges of interest on a chart. You can combine it with other charts like `PointChart` for layered visualizations.

---

## Usage Example

```tsx
<RectAreaChart
  marks={[
    { xStart: 2.5, xEnd: 3.5, yStart: 4.5, yEnd: 5.5 },
    { xStart: 1.0, xEnd: 2.0, yStart: 1.0, yEnd: 2.0 },
  ]}
/>
```

---

## Props

### `marks: Array<object>` **(required)**

Each `mark` defines a rectangular area with the following fields:

* `xStart: number`
  The starting X-axis value of the rectangle.

* `xEnd: number`
  The ending X-axis value of the rectangle.

* `yStart: number`
  The starting Y-axis value of the rectangle.

* `yEnd: number`
  The ending Y-axis value of the rectangle.

#### Optional from `ChartMarkProps`:

* `opacity` – Controls the transparency of the rectangle.
* `foregroundStyle` – Fill color or style of the rectangle.
* `annotation` – Optional label or annotation on the mark.

---

## Full Example

```tsx
const data = [
  { x: 5, y: 5 },
  { x: 2.5, y: 2.5 },
  { x: 3, y: 3 },
]

<RectAreaChart
  marks={data.map(item => ({
    xStart: item.x - 0.25,
    xEnd: item.x + 0.25,
    yStart: item.y - 0.25,
    yEnd: item.y + 0.25,
    opacity: 0.2,
  }))}
/>

<PointChart marks={data} />
```

This example overlays transparent rectangles centered around each data point, providing a visual range or margin around them.

---

## Use Cases

* Highlight clusters of points or zones on a scatter plot.
* Visualize regions of interest or acceptable ranges.
* Represent uncertainty or tolerance around data values.
