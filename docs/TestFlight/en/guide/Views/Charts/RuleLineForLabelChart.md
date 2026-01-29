---
title: RuleLineForLabelChart
description: A chart that displays data as a series of lines, with labels indicating specific values or thresholds.

---

`RuleLineForLabelChart` overlays vertical or horizontal reference lines based on label (or date) positions in a chart. It is commonly used to highlight specific categories or time points in combination with other chart types, such as `BarChart` or `LineChart`.

---

## Declaration

```ts
declare const RuleLineForLabelChart: FunctionComponent<{
  /**
   * If specified as true, the chart will display labels on the Y-axis, causing rule lines to be drawn horizontally. Defaults to false (vertical lines).
   */
  labelOnYAxis?: boolean;

  /**
   * An array of rule marks, each specifying the label or date to draw a reference line at.
   */
  marks: Array<{
    /**
     * The label (string or Date) where the rule line should be placed.
     */
    label: string | Date;

    /**
     * Optional calendar component (e.g., 'month', 'day') if using a Date label.
     */
    unit?: CalendarComponent;
  } & ChartMarkProps>;
}>;
```

---

## Properties

| Property       | Type      | Description                                                                                         |
| -------------- | --------- | --------------------------------------------------------------------------------------------------- |
| `labelOnYAxis` | `boolean` | If `true`, rule lines are drawn **horizontally** using Y-axis label positions. Default is vertical. |
| `marks`        | `Array`   | An array of labeled rule definitions. Each mark can include styling options from `ChartMarkProps`.  |

Each item in `marks` can include:

* `label`: The string or date at which to draw the rule.
* `unit`: Optional, only relevant for date-based axes.
* `foregroundStyle`: Optional. Controls the color.
* `opacity`: Optional. Controls line transparency.
* `lineStyle`: Optional. Allows custom dashing (e.g., `[3, 2]`).

---

## Example: Marking Categories in a Bar Chart

```tsx
import {
  Chart,
  RuleLineForLabelChart,
  BarChart,
  Navigation,
  NavigationStack,
  Script,
  VStack
} from "scripting"

const data = [
  { label: "Q1", value: 1500 },
  { label: "Q2", value: 2300 },
  { label: "Q3", value: 1800 },
  { label: "Q4", value: 2700 },
]

const referenceLines = [
  { label: "Q2", foregroundStyle: "blue", lineStyle: { dash: [3, 2] } },
  { label: "Q4", foregroundStyle: "red", opacity: 0.5 },
]

function Example() {
  return (
    <NavigationStack>
      <VStack
        navigationTitle="BarChart with Reference Lines"
        navigationBarTitleDisplayMode="inline"
      >
        <Chart frame={{ height: 300 }}>
          <BarChart marks={data} />
          <RuleLineForLabelChart marks={referenceLines} />
        </Chart>
      </VStack>
    </NavigationStack>
  )
}

async function run() {
  await Navigation.present({ element: <Example /> })
  Script.exit()
}

run()
```

---

## Use Cases

* Highlight important events or milestones in a timeline.
* Visually separate regions in a categorical chart.
* Indicate thresholds or labels of significance.
