---
title: PieChart

---
        
The `PieChart` component displays part-to-whole relationships using circular slices. Each slice represents a category, and its angle is proportional to the numeric value it contributes to the total.

This chart is well-suited for visualizing distribution, market share, or proportions across categories.

---

## Usage Example

```tsx
<PieChart
  marks={[
    { category: "Cachapa", value: 9631 },
    { category: "Crêpe", value: 6959 },
    { category: "Injera", value: 4891 },
    ...
  ]}
/>
```

---

## Props

### `marks: Array<object>` **(required)**

Defines the segments (slices) of the pie chart.

Each mark must include:

* `category: string`
  A label for the slice. It identifies the category the value belongs to.

* `value: number`
  The numeric value used to determine the slice’s angle. All values are summed and each slice’s angle is proportional to its fraction of the total.

* Inherits additional properties from `ChartMarkProps` for styling:

  * `foregroundStyle` – set color per category
  * `annotation` – attach labels or icons
  * `opacity`, `cornerRadius`, `zIndex`, etc.

---

## Full Example

```tsx
const data = [
  { name: "Cachapa", sales: 9631 },
  { name: "Crêpe", sales: 6959 },
  { name: "Injera", sales: 4891 },
  { name: "Jian Bing", sales: 2506 },
  { name: "American", sales: 1777 },
  { name: "Dosa", sales: 625 },
]

<PieChart
  marks={data.map(item => ({
    category: item.name,
    value: item.sales
  }))}
/>
```

---

## Use Cases

`PieChart` is suitable for:

* Displaying proportions across a fixed set of categories
* Visualizing market share, vote distribution, or sales ratios
* Representing totals broken down by labeled segments
