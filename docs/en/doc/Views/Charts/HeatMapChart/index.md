---
title: HeatMapChart

---
        
The `HeatMapChart` component displays data values as a grid of cells, where the color intensity of each cell represents the magnitude of a numeric value. It is ideal for visualizing bivariate data distributions or correlations across two categorical dimensions.

## Usage Example

```tsx
<Chart
  aspectRatio={{
    value: 1,
    contentMode: 'fit'
  }}
>
  <HeatMapChart
    marks={[
      { x: "+", y: "+", value: 125 },
      { x: "+", y: "-", value: 10 },
      { x: "-", y: "-", value: 80 },
      { x: "-", y: "+", value: 1 },
    ]}
  />
</Chart>
```

## Props

### `marks: Array<object>` **(required)**

Each item in the array represents a single cell in the heatmap, defined by its X/Y coordinates and a value that determines the cell's color intensity.

#### Fields:

* `x: string`
  The horizontal coordinate (e.g., category or label on the X-axis).

* `y: string`
  The vertical coordinate (e.g., category or label on the Y-axis).

* `value: number`
  A numeric value used to determine the color intensity of the cell. Higher values typically produce darker or more saturated colors.

* Inherits all `ChartMarkProps` for styling and customization, such as:

  * `foregroundStyle`
  * `opacity`
  * `annotation`
  * `cornerRadius`
  * `zIndex`, etc.

## Use Cases

`HeatMapChart` is suitable for:

* Displaying correlation matrices
* Analyzing two-dimensional categorical data
* Visualizing frequency, density, or performance across paired factors

## Full Example

```tsx
const data = [
  { positive: "+", negative: "+", num: 125 },
  { positive: "+", negative: "-", num: 10 },
  { positive: "-", negative: "-", num: 80 },
  { positive: "-", negative: "+", num: 1 },
]

<HeatMapChart
  marks={data.map(item => ({
    x: item.positive,
    y: item.negative,
    value: item.num,
  }))}
/>
```
