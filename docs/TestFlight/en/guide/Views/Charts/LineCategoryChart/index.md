---
title: LineCategoryChart
description: A chart that displays data as a series of points connected by lines, with categories on the a specified axis.

---
        
The `LineCategoryChart` component displays multiple line series categorized by a secondary key, allowing you to compare trends across distinct groups (categories) along a shared axis of discrete labels.

It is ideal for grouped comparisons across labeled segments (e.g., departments, months, stages) and is especially useful for showing how each category's values evolve over the same set of labels.

---

## Example Scenario

In this example, different departments (`Production`, `Marketing`, `Finance`) are plotted along the X-axis, and each product category (`Gizmos`, `Gadgets`, `Widgets`) is represented by its own line.

---

## Usage

```tsx
<LineCategoryChart
  labelOnYAxis={false}
  marks={[
    { label: "Production", value: 4000, category: "Gizmos" },
    { label: "Marketing", value: 2000, category: "Gizmos" },
    ...
  ]}
/>
```

---

## Props

### `labelOnYAxis?: boolean`

* If `true`, the category labels (e.g., "Production", "Marketing") are displayed on the **Y-axis**, and the lines are drawn **horizontally**.
* If `false` (default), labels are on the **X-axis**, and lines are rendered **vertically**.

---

### `marks: Array<object>` **(required)**

Each item defines a data point on the chart. It must include:

* `label: string | Date`
  The shared axis label (e.g., phase, department, month) across which each line progresses.

* `value: number`
  The value to be plotted at that label for the corresponding category.

* `category: string`
  Defines the group to which this point belongs. Each `category` generates its own line.

Additional fields from `ChartMarkProps` may also be used for styling (e.g., `foregroundStyle`, `symbol`, `annotation`).

---

## Full Example

```tsx
const data = [
  { label: "Production", value: 4000, category: "Gizmos" },
  { label: "Marketing", value: 2000, category: "Gizmos" },
  { label: "Finance", value: 2000.5, category: "Gizmos" },

  { label: "Production", value: 5000, category: "Gadgets" },
  { label: "Marketing", value: 1000, category: "Gadgets" },
  { label: "Finance", value: 3000, category: "Gadgets" },

  { label: "Production", value: 6000, category: "Widgets" },
  { label: "Marketing", value: 5000.9, category: "Widgets" },
  { label: "Finance", value: 5000, category: "Widgets" },
]

<LineCategoryChart
  labelOnYAxis={labelOnYAxis}
  marks={data}
/>
```

---

## Use Cases

`LineCategoryChart` is useful for:

* Visualizing grouped comparisons across discrete stages
* Showing category trends over consistent labels
* Comparing multi-line metrics in business, finance, marketing, etc.
