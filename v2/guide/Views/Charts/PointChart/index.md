# PointChart

The `PointChart` component renders a basic 2D scatter plot, plotting individual points on an X-Y coordinate system. Each point is defined by a pair of numeric values and can be customized using standard mark styling properties.

This chart is ideal for visualizing correlations, distributions, or individual measurements across two continuous dimensions.

***

## Usage Example

```tsx
<PointChart
  marks={[
    { x: 0, y: 2 },
    { x: 1, y: 3 },
    { x: 2, y: 4 },
    { x: 3, y: 3 },
    { x: 4, y: 6 },
  ]}
/>
```

***

## Props

### `marks: Array<object>` **(required)**

Defines the set of points to render. Each point must include:

- `x: number`
  The X-axis coordinate.

- `y: number`
  The Y-axis coordinate.

You may also use additional `ChartMarkProps` to customize the appearance of each point:

- `symbol` – the shape of the plotted point (e.g., circle, square)
- `foregroundStyle` – sets the color of the point
- `symbolSize` – adjusts the size of each point
- `opacity`, `annotation`, `offset`, `zIndex`, etc.

***

## Full Example

```tsx
const data = [
  { x: 0, y: 2 },
  { x: 1, y: 3 },
  { x: 2, y: 4 },
  { x: 3, y: 3 },
  { x: 4, y: 6 },
]

<PointChart marks={data} />
```

The above example plots five points on a chart, creating a simple scatter plot.

***

## Use Cases

`PointChart` is suitable for:

- Plotting relationships between two continuous variables
- Displaying experimental measurements, coordinates, or trends
- Creating simple scatter plots with optional visual annotations
