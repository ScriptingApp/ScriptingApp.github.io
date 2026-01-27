---
title: RuleLineForValueChart

---

The `RuleLineForValueChart` component is used to draw one or more horizontal or vertical reference lines on a chart, based on numeric values. This is useful for highlighting thresholds, targets, or reference levels in your data visualization.

---

## Usage Example

```tsx
<Chart>
  <RuleLineForValueChart
    marks={[
      { value: 50 },
      { value: 75, lineStyle: { dash: [2, 4] } },
    ]}
  />
</Chart>
```

This example renders two rule lines:

* A solid line at value `50`
* A dashed line at value `75`, with a dash pattern of 2-point dash and 4-point gap

---

## Props

### `labelOnYAxis` (optional)

* **Type:** `boolean`
* **Default:** `false`
* **Description:**
  When set to `true`, the chart displays value labels on the **Y Axis**, and rule lines are rendered **vertically**.
  When `false`, labels appear on the X Axis and lines are **horizontal**.

---

### `marks` (required)

* **Type:**

  ```ts
  Array<{
    value: number;
  } & ChartMarkProps>
  ```
* **Description:**
  Each item in the `marks` array defines a rule line at a specific `value`.

#### `value`

* The coordinate value at which the rule line should appear.

#### `ChartMarkProps` (optional extensions)

You can also customize each line using standard chart mark properties:

* `foregroundStyle`: Set color or gradient
* `opacity`: Set line transparency
* `lineStyle`: Customize the stroke pattern (e.g., dashed lines)

---

## Use Cases

* Indicating statistical thresholds (e.g., average, median)
* Highlighting min/max limits or control boundaries
* Marking goals or performance targets

---

## Summary

`RuleLineForValueChart` is a minimal yet powerful overlay chart component that enables enhanced readability and interpretation by visually marking important numerical values on your chart. It can be used alongside other chart types such as `BarChart`, `LineChart`, or `PointChart` to enrich data visualization.
