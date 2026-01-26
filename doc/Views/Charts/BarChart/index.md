# BarChart

The `BarChart` component renders a standard bar chart, enabling visual comparison of numeric values across different categories. Each bar corresponds to a label and represents its associated value through height (vertical layout) or length (horizontal layout).

## Example Scenario

This example displays the count of different toy shapes — `Cube`, `Sphere`, and `Pyramid`. The chart provides an optional toggle to switch between vertical and horizontal layouts using the `labelOnYAxis` property.

## Usage

```tsx
<Chart frame={{ height: 400 }}>
  <BarChart
    labelOnYAxis={false}
    marks={[
      { label: "Cube", value: 5 },
      { label: "Sphere", value: 4 },
      { label: "Pyramid", value: 4 },
    ]}
  />
</Chart>
```

## Props

### `labelOnYAxis?: boolean`

- If `true`, labels will be displayed on the **Y-axis**, and bars will be rendered **horizontally**.
- If `false` (default), labels appear on the **X-axis**, and bars are rendered **vertically**.

### `marks: Array<object>` **(required)**

Each data point defines a bar and includes:

- `label: string | Date`
  The name or identifier for the category.

- `value: number`
  The numeric value represented by the bar.

- `unit?: CalendarComponent` _(optional)_
  Used when displaying time-based values.

- Optional `ChartMarkProps`
  Provides additional customization, such as:

  - `foregroundStyle`
  - `opacity`
  - `cornerRadius`
  - `symbol`
  - `annotation`
  - etc.

## Example Code

```tsx
const toysData = [
  { type: "Cube", count: 5 },
  { type: "Sphere", count: 4 },
  { type: "Pyramid", count: 4 },
]

<BarChart
  marks={toysData.map(toy => ({
    label: toy.type,
    value: toy.count,
  }))}
/>
```

## Use Cases

The `BarChart` component is ideal for:

- Comparing values across discrete categories
- Displaying survey results, item counts, or rankings
- Switching between horizontal and vertical layouts with minimal configuration
