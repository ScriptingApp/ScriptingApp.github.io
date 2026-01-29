---
title: AreaStackChart
description: A chart that displays data as stacked areas, where each area represents a total and is divided into segments representing sub-values.

---
        
The `AreaStackChart` component displays a series of values as stacked areas over a shared axis, allowing for a clear comparison of data parts and totals across categories or time.

## Usage

```tsx
<Chart frame={{ height: 300 }}>
  <AreaStackChart
    marks={[
      {
        category: "Cheese",
        label: "2020",
        value: 0.26,
        stacking: "standard"
      },
      ...
    ]}
  />
</Chart>
```

## Props

### `marks: Array<object>` **(required)**

An array of data points to render on the chart.

Each mark supports the following properties:

* `category: string`
  A category label for the mark, typically used to group data in the stacked chart.

* `label: string | Date`
  The x-axis label for this mark. Can be a year, date, or other descriptor.

* `value: number`
  The numeric value to be represented by the mark.

* `unit?: CalendarComponent`
  Specifies the calendar component for time-based values (e.g., `"year"`, `"month"`, `"day"`). Useful when rendering time series.

* `stacking?: ChartMarkStackingMethod`
  Controls how marks are stacked:

  * `"standard"`: Stack values from a common baseline (default).
  * `"normalized"`: Normalize all values to represent a percentage of the total.
  * `"center"`: Stack around a central axis for symmetrical data.
  * `"unstacked"`: Render without stacking.

* Other optional `ChartMarkProps`:
  Includes extensive styling and behavior options such as:

  * `foregroundStyle`
  * `opacity`
  * `cornerRadius`
  * `interpolationMethod`
  * `symbol`, `symbolSize`, `annotation`, `clipShape`, `shadow`, `blur`, `zIndex`, `offset`, etc.

Refer to `ChartMarkProps` for detailed mark customization.

### `labelOnYAxis?: boolean`

Whether to display the `label` values on the Y-axis instead of the default X-axis.
Defaults to `false`.

## Example

```tsx
<AreaStackChart
  labelOnYAxis={false}
  marks={[
    {
      category: "Burger",
      label: 2020,
      value: 0.6,
      stacking: "standard"
    },
    {
      category: "Cheese",
      label: 2020,
      value: 0.26,
      stacking: "standard"
    },
    {
      category: "Bun",
      label: 2020,
      value: 0.24,
      stacking: "standard"
    }
  ]}
/>
```