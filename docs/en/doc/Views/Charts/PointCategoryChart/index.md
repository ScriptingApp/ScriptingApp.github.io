---
title: PointCategoryChart

---
        
The `PointCategoryChart` component displays categorized points on a 2D plane, allowing for flexible visual encoding using color, symbol type, or symbol size. It is ideal for representing multi-category scatter plots, surveys, or segmented data comparisons.

---

## Usage Example

```tsx
<PointCategoryChart
  representsDataUsing="foregroundStyle"
  marks={[
    { category: "Apple", x: 10, y: 42 },
    { category: "Apple", x: 20, y: 37 },
    { category: "Orange", x: 30, y: 62 },
    ...
  ]}
/>
```

---

## Props

### `marks: Array<object>` **(required)**

Each mark defines a data point on the chart and must include:

* `x: number`
  The value on the horizontal axis (e.g., age, time, score).

* `y: number`
  The value on the vertical axis (e.g., quantity, percentage).

* `category: string`
  A grouping key. Each category may be visually differentiated using color, symbol, or size.

* Additional optional properties from `ChartMarkProps` can be used for further customization:

  * `foregroundStyle`
  * `symbol`
  * `symbolSize`
  * `annotation`
  * `opacity`, etc.

---

### `representsDataUsing?: "foregroundStyle" | "symbol" | "symbolSize"`

Controls how the chart visually distinguishes different categories:

* `"foregroundStyle"` – uses different colors per category.
* `"symbol"` – uses different shapes (e.g., circles, squares) per category.
* `"symbolSize"` – varies the size of symbols based on the category (or data magnitude).

> This is an alternative to setting `foregroundStyleBy`, `symbolBy`, or `symbolSizeBy` manually.

---

## Full Example

```tsx
const favoriteFruitsData = [
  { fruit: "Apple", age: 10, count: 42 },
  { fruit: "Apple", age: 20, count: 37 },
  ...
]

<PointCategoryChart
  representsDataUsing="symbol"
  marks={favoriteFruitsData.map(item => ({
    category: item.fruit,
    x: item.age,
    y: item.count,
  }))}
/>
```

You can dynamically switch how data is represented using a `<Picker>` and bind it to the `representsDataUsing` prop.

---

## Use Cases

`PointCategoryChart` is suitable for:

* Comparing multiple categories over time or value ranges
* Visualizing multivariate distributions
* Highlighting categorical distinctions within scatter plots
