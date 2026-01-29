---
title: Multiple Charts Example
description: An example that demonstrates how to use multiple charts in a single view.

---
        
This example demonstrates how to combine multiple chart types in a single chart context, dynamically display annotations based on user interaction, and customize appearance and interactivity using chart overlays.


## Example Code

```tsx
const data = [
  { sales: 1200, year: '2020', growth: 0.14, },
  { sales: 1400, year: '2021', growth: 0.16, },
  { sales: 2000, year: '2022', growth: 0.42, },
  { sales: 2500, year: '2023', growth: 0.25, },
  { sales: 3600, year: '2024', growth: 0.44, },
]

function Example() {
  const [chartSelection, setChartSelection] = useState<string | null>()
  const selectedItem = useMemo(() => {
    if (chartSelection == null) {
      return null
    }
    return data.find(item => item.year === chartSelection)
  }, [chartSelection])

  return <NavigationStack>
    <VStack
      navigationTitle={"Multiple Charts"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Text>
        Press and move on the chart to view the details.
      </Text>
      <Chart
        frame={{
          height: 300,
        }}
        chartXSelection={{
          value: chartSelection,
          onChanged: setChartSelection,
          valueType: "string"
        }}
      >
        <LineChart
          marks={data.map(item => ({
            label: item.year,
            value: item.sales,
            interpolationMethod: "catmullRom",
            symbol: "circle",
          }))}
        />
        <AreaChart
          marks={data.map(item => ({
            label: item.year,
            value: item.sales,
            interpolationMethod: "catmullRom",
            foregroundStyle: ["rgba(255,100,0,1)", "rgba(255,100,0,0.2)"]
          }))}
        />
        {selectedItem != null
          ? <RuleLineForLabelChart
            marks={[{
              label: selectedItem.year,
              foregroundStyle: { color: "gray", opacity: 0.5 },
              annotation: {
                position: "top",
                overflowResolution: {
                  x: "fit",
                  y: "disabled"
                },
                content: <ZStack
                  padding
                  background={
                    <RoundedRectangle
                      cornerRadius={4}
                      fill={"regularMaterial"}
                    />
                  }
                >
                  <Text
                    foregroundStyle={"white"}
                  >Sales: {selectedItem.sales}</Text>
                </ZStack>
              }
            }]}
          />
          : null}
      </Chart>
    </VStack>
  </NavigationStack>
}
```

## Overview

The example uses the following components together:

* [`LineChart`](#linechart): Plots discrete points and connects them with curved lines.
* [`AreaChart`](#areachart): Fills the area under a line graph, visually indicating magnitude.
* [`RuleLineForLabelChart`](#rulelineforlabelchart): Draws a reference line at the selected label and overlays a custom annotation.
* `chartXSelection`: Enables user interaction by tracking X-axis selection.

---

## Data Format

The dataset used represents yearly sales performance:

```ts
const data = [
  { sales: 1200, year: '2020', growth: 0.14 },
  { sales: 1400, year: '2021', growth: 0.16 },
  { sales: 2000, year: '2022', growth: 0.42 },
  { sales: 2500, year: '2023', growth: 0.25 },
  { sales: 3600, year: '2024', growth: 0.44 },
]
```

Each entry includes:

* `sales`: Numeric value to be plotted
* `year`: Used as the label on the X-axis
* `growth`: Additional metric (not directly visualized here)

---

## Key Features

### Chart Selection

```tsx
chartXSelection={{
  value: chartSelection,
  onChanged: setChartSelection,
  valueType: "string"
}}
```

* Enables users to tap or drag on the chart to select a point based on its label (`year`).
* Triggers the `setChartSelection` callback to update the selected year.

### LineChart

```tsx
<LineChart
  marks={data.map(item => ({
    label: item.year,
    value: item.sales,
    interpolationMethod: "catmullRom",
    symbol: "circle",
  }))}
/>
```

* Plots sales values with labeled X-axis.
* Uses `"catmullRom"` for smooth curves between points.
* Displays circular symbols for each point.

### AreaChart

```tsx
<AreaChart
  marks={data.map(item => ({
    label: item.year,
    value: item.sales,
    interpolationMethod: "catmullRom",
    foregroundStyle: ["rgba(255,100,0,1)", "rgba(255,100,0,0.2)"]
  }))}
/>
```

* Overlays a filled area beneath the line, enhancing visual weight.
* Uses a two-stop gradient from solid to transparent orange.

### RuleLineForLabelChart (Dynamic Annotation)

```tsx
<RuleLineForLabelChart
  marks={[{
    label: selectedItem.year,
    foregroundStyle: { color: "gray", opacity: 0.5 },
    annotation: {
      position: "top",
      overflowResolution: { x: "fit", y: "disabled" },
      content: <ZStack
        padding
        background={<RoundedRectangle cornerRadius={4} fill={"regularMaterial"} />}
      >
        <Text foregroundStyle={"white"}>Sales: {selectedItem.sales}</Text>
      </ZStack>
    }
  }]}
/>
```

* Shows a vertical gray reference line at the selected year.
* Displays a floating tooltip with the `sales` value in a styled background.
* Uses `ZStack` and `RoundedRectangle` to build a custom annotation view.

---

## User Interaction Flow

1. The user touches the chart.
2. The closest label (`year`) is selected and passed to `chartSelection`.
3. `selectedItem` is computed using `useMemo`.
4. A rule line is rendered at the selected label.
5. A floating annotation displays detailed data (e.g., `Sales: 2500`).

---

## Conclusion

This example demonstrates how to:

* Combine multiple charts (`LineChart`, `AreaChart`, `RuleLineForLabelChart`) within a single `<Chart>` container.
* Use `chartXSelection` to enable touch-based exploration.
* Render contextual annotations that enhance data storytelling.
* Apply modern styling using gradient fills, translucent overlays, and SwiftUI-inspired layout components.

This pattern is ideal for dashboards and interactive reports where data insight and responsiveness are key.
