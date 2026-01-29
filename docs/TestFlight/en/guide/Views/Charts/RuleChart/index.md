---
title: RuleChart
description: A chart that displays data as a series of rules, which can be used to represent thresholds or limits.
---

## `RuleChart`

The `RuleChart` component displays a range or duration for each labeled item as a horizontal or vertical rule. It is suitable for visualizing time spans, data ranges, or active periods across categories.

---

## Example

```tsx
<RuleChart
  labelOnYAxis
  marks={[
    { label: "Trees", start: 1, end: 10 },
    { label: "Grass", start: 3, end: 11 },
    { label: "Weeds", start: 4, end: 12 },
  ]}
/>
```

---

## Props

### `labelOnYAxis` (optional)

- **Type:** `boolean`
- **Default:** `false`
- **Description:**
  When set to `true`, the chart switches to horizontal mode and displays category labels along the Y-axis. Otherwise, labels appear on the X-axis with vertical rules.

---

### `marks` (required)

- **Type:**

  ```ts
  Array<
    {
      label: string | Date;
      start: number;
      end: number;
      unit?: CalendarComponent;
    } & ChartMarkProps
  >;
  ```

- **Description:**
  Defines the rules (lines or spans) to be drawn on the chart.

#### Each mark includes:

- `label`: The category label or time unit (e.g., `"Trees"` or a `Date`).
- `start`: The numeric starting value of the rule.
- `end`: The numeric ending value of the rule.
- `unit`: _(optional)_ The time unit, useful when the chart represents calendar-based data (e.g., `.month`, `.day`).

Additional `ChartMarkProps` can be applied to customize visual styling:

- `foregroundStyle` — Controls color or style
- `annotation` — Adds annotation labels
- `opacity` — Adjusts transparency

---

## Full Example

```tsx
const data = [
  { startMonth: 1, numMonths: 9, source: "Trees" },
  { startMonth: 12, numMonths: 1, source: "Trees" },
  { startMonth: 3, numMonths: 8, source: "Grass" },
  { startMonth: 4, numMonths: 8, source: "Weeds" },
]

<RuleChart
  labelOnYAxis
  marks={data.map(item => ({
    start: item.startMonth,
    end: item.startMonth + item.numMonths,
    label: item.source,
  }))}
/>
```

---

## Use Cases

- Displaying periods of activity or growth (e.g., pollen seasons)
- Showing task durations or project phases
- Visualizing ranges in data for different categories
