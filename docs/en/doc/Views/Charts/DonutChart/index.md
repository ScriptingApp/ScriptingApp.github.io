---
title: DonutChart

---
        
The `DonutChart` component displays data as a circular ring divided into segments, where each segment’s angle represents a proportion of the whole. It is ideal for visualizing part-to-whole relationships with an inner radius that distinguishes it from a traditional pie chart.

## Props

### `marks: Array<object>` **(required)**

Each mark represents a sector (slice) of the donut chart and includes the following properties:

---

### `category: string`

A label representing the category for the segment (e.g., product name, region).

### `value: number`

Determines the angular size of the segment. The segment’s angle will be proportional to this value in relation to the total of all segments.

---

### `innerRadius?: MarkDimension`

Defines the **inner radius** of the donut.
This determines the size of the "hole" in the center.

* Format:

  ```ts
  {
    type: 'ratio' | 'inset';
    value: number;
  }
  ```

* `type: 'ratio'`
  The radius is a ratio (e.g., `0.618`) of the outer radius.

* `type: 'inset'`
  The radius is an absolute inset in points from the outer radius.

---

### `outerRadius?: MarkDimension`

Defines the **outer radius** of the segment.
Controls how far each segment extends from the center.

* Format:

  ```ts
  {
    type: 'inset';
    value: number;
  }
  ```

* `type: 'inset'`
  Specifies how much to inset the outer edge from the edge of the chart’s plot area.

---

### `angularInset?: number`

Optional gap (in degrees) between each segment.
This controls how rounded or spaced out each slice appears.

---

### Inherited from `ChartMarkProps`

You can also use all styling and behavior properties from `ChartMarkProps`, including:

* `foregroundStyle` – sets the color of each slice
* `annotation` – attaches labels or icons
* `opacity`, `cornerRadius`, `offset`, `shadow`, etc.

## Example

```tsx
<DonutChart
  marks={data.map(item => ({
    category: item.name,
    value: item.sales,
    innerRadius: {
      type: 'ratio',
      value: 0.618
    },
    outerRadius: {
      type: 'inset',
      value: 10
    },
    angularInset: 1
  }))}
/>
```

## Use Cases

* Showing sales distribution across products
* Visualizing market share or demographic segments
* Comparing multiple values as part of a total
