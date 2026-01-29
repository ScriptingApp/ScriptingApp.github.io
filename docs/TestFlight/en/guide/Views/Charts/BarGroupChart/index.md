---
title: BarGroupChart
description: A chart that displays data as groups of bars, where each group represents a category and the bars within the group represent sub-categories.

---
        
This example demonstrates how to create grouped bars in a `BarChart` by using the `positionBy` property to segment bars by a secondary dimension (e.g., "color") and `foregroundStyleBy` to apply distinct colors to each group. This pattern is useful when comparing subcategories within a larger category.

## Example Scenario

The dataset includes different object types (`Cube`, `Sphere`, `Pyramid`) grouped by color (`Green`, `Purple`, `Pink`, `Yellow`). The chart displays the count of each shape per color, with grouped and color-coded bars.

## Key Concepts

### `positionBy`

```ts
positionBy: {
  value: item.color,
  axis: 'horizontal',
}
```

* Groups bars by the specified `value` (e.g., color).
* The `axis` indicates how the bars are positioned:

  * `'horizontal'`: groups by Y-axis (stacked vertically within each color group).
  * `'vertical'`: groups by X-axis (used for transposed layouts).

### `foregroundStyleBy`

```ts
foregroundStyleBy: item.color
```

* Applies a unique foreground color to each bar based on the color group.
* This helps visually distinguish between grouped items.

## Code Summary

```tsx
const data = [
  { color: "Green", type: "Cube", count: 2 },
  { color: "Purple", type: "Sphere", count: 1 },
  ...
]

const list = data.map(item => ({
  label: item.type,              // Primary label (e.g., Cube, Sphere)
  value: item.count,             // Numeric value
  positionBy: {
    value: item.color,           // Grouping key
    axis: 'horizontal',
  },
  foregroundStyleBy: item.color, // Color grouping
  cornerRadius: 8,
}))
```

## Full Example

```tsx
<Chart frame={{ height: 400 }}>
  <BarChart marks={list} />
</Chart>
```

This chart will render vertical groups of bars by color (e.g., Green, Purple...), and each group will contain the respective shapes (Cube, Sphere, Pyramid) with the appropriate height and color.

## Use Cases

This grouped bar layout is ideal for:

* Comparing subcategories within grouped categories (e.g., survey responses by demographic).
* Visualizing segmented data distributions.
* Highlighting clusters of related values in a compact chart.
