---
title: Charts Style
description: The properties allows you to customize the appearance of the chart view.

---

The Chart component in the Scripting app provides a highly customizable interface for creating and displaying various types of charts. This documentation explains how to use the properties of the Chart view to configure axes, scales, labels, legends, and more.

### **1. Axis Visibility**
- **`chartXAxis`**
  - **Type**: `"automatic" | "hidden" | "visible"`
  - **Description**: Sets the visibility of the X-axis.
  - **Example**:
    ```tsx
    <Chart chartXAxis="visible">
      <BarChart ... />
    </Chart>
    ```

- **`chartYAxis`**
  - **Type**: `"automatic" | "hidden" | "visible"`
  - **Description**: Sets the visibility of the Y-axis.
  - **Example**:
    ```tsx
    <Chart chartYAxis="hidden">
      <LineChart ... />
    </Chart>
    ```

---

### **2. Axis Labels**
- **`chartXAxisLabel`**
  - **Type**:  
    ```ts
    {
      position?: "automatic" | "bottom" | "bottomLeading" | "bottomTrailing" | "leading" | "overlay" | "top" | "topLeading" | "topTrailing" | "trailing";
      alignment?: "leading" | "center" | "trailing";
      spacing?: number;
      content: VirtualNode;
    }
    ```
  - **Description**: Adds a label to the X-axis.
  - **Example**:
    ```tsx
    <Chart
      chartXAxisLabel={{
        position: "bottom",
        alignment: "center",
        spacing: 10,
        content: <Text>X Axis Label</Text>,
      }}
    >
      <BarChart ... />
    </Chart>
    ```

- **`chartYAxisLabel`**
  - **Type**: Same as `chartXAxisLabel`.
  - **Description**: Adds a label to the Y-axis.
  - **Example**:
    ```tsx
    <Chart
      chartYAxisLabel={{
        position: "leading",
        content: <Text>Y Axis Label</Text>,
      }}
    >
      <LineChart ... />
    </Chart>
    ```

---

### **3. Legend**
- **`chartLegend`**
  - **Type**:  
    ```ts
    "automatic" | "hidden" | "visible" | {
      position?: "automatic" | "bottom" | "bottomLeading" | "bottomTrailing" | "leading" | "overlay" | "top" | "topLeading" | "topTrailing" | "trailing";
      alignment?: "leading" | "center" | "trailing";
      spacing?: number;
      content?: VirtualNode;
    }
    ```
  - **Description**: Configures the chart legend.
  - **Example**:
    ```tsx
    <Chart
      chartLegend={{
        position: "top",
        alignment: "center",
        content: <Text>Legend</Text>,
      }}
    >
      <AreaChart ... />
    </Chart>
    ```

---

### **4. Scales**
- **`chartXScale` / `chartYScale`**
  - **Type**:  
    ```ts
    ClosedRange<number> | ClosedRange<Date> | string[] | "category" | "date" | "linear" | "log" | "squareRoot" | "symmetricLog" | {
      domain: ClosedRange<number> | ClosedRange<Date> | string[];
      type: "category" | "date" | "linear" | "log" | "squareRoot" | "symmetricLog";
    }
    ```
  - **Description**: Configures the X or Y-axis scale.
  - **Example**:
    ```tsx
    <Chart
      chartXScale={{ domain: { from: 0, to: 100 }, type: "linear" }}
      chartYScale={["A", "B", "C"]}
    >
      <LineChart ... />
    </Chart>
    ```

---

### **5. Background**
- **`chartBackground`**
  - **Type**:  
    ```ts
    VirtualNode | {
      alignment?: "leading" | "center" | "trailing";
      content: VirtualNode;
    }
    ```
  - **Description**: Adds a background to the chart container.
  - **Example**:
    ```tsx
    <Chart
      chartBackground={{
        alignment: "center",
        content: <Rectangle fill="gray" />,
      }}
    >
      <PieChart ... />
    </Chart>
    ```

---

### **6. Foreground Style**
- **`chartForegroundStyleScale`**
  - **Type**:  
    ```ts
    Record<string, ShapeStyle>;
    ```
  - **Description**: Customizes colors for marks in the chart.
  - **Example**:
    ```tsx
    <Chart
      chartForegroundStyleScale={{
        "Category 1": { color: "blue" },
        "Category 2": { color: "red" },
      }}
    >
      <BarChart ... />
    </Chart>
    ```

---

### **7. Scrollable Axes**
- **`chartScrollableAxes`**
  - **Type**:  
    ```ts
    "vertical" | "horizontal" | "all"
    ```
  - **Description**: Enables scrolling for the specified axes.
  - **Example**:
    ```tsx
    <Chart chartScrollableAxes="horizontal">
      <LineChart ... />
    </Chart>
    ```

---

### **8. Selection**
- **`chartXSelection` / `chartYSelection` / `chartAngleSelection`**
  - **Type**:  
    ```ts
    {
      value: string | number | null;
      onChanged: (newValue: string | number | null) => void;
      valueType: "string" | "number";
    }
    ```
  - **Description**: Enables selection for the specified axis.
  - **Example**:
    ```tsx
    <Chart
      chartXSelection={{
        value: "Category 1",
        onChanged: (newValue) => console.log("Selected:", newValue),
        valueType: "string",
      }}
    >
      <BarChart ... />
    </Chart>
    ```

---

### **9. Scroll Position**
- **`chartScrollPositionX` / `chartScrollPositionY`**
  - **Type**:  
    ```ts
    number | string | {
      value: number | string;
      onChanged: (newValue: number | string) => void;
    }
    ```
  - **Description**: Sets the initial scroll position along the X or Y-axis.
  - **Example**:
    ```tsx
    <Chart
      chartScrollPositionX={{
        value: 0,
        onChanged: (newValue) => console.log("Scroll X:", newValue),
      }}
    >
      <BarChart ... />
    </Chart>
    ```

---

## **Comprehensive Example**

The following example demonstrates the usage of multiple properties to create a fully customized chart:

```tsx
<Chart
  chartXAxis="visible"
  chartYAxis="visible"
  chartXAxisLabel={{
    position: "bottom",
    alignment: "center",
    spacing: 8,
    content: <Text>X Axis Label</Text>,
  }}
  chartYAxisLabel={{
    position: "leading",
    content: <Text>Y Axis Label</Text>,
  }}
  chartLegend={{
    position: "top",
    alignment: "center",
    content: <Text>Chart Legend</Text>,
  }}
  chartXScale={{ domain: { from: 0, to: 100 }, type: "linear" }}
  chartScrollableAxes="all"
  chartForegroundStyleScale={{
    "Category A": { color: "green" },
    "Category B": { color: "blue" },
  }}
  chartBackground={{
    content: <Rectangle fill="lightgray" />,
  }}
>
  <BarChart
    marks={[
      { label: "A", value: 30, foregroundStyle: { color: "red" } },
      { label: "B", value: 70 },
    ]}
  />
  <LineChart
    marks={[
      { label: "A", value: 40 },
      { label: "B", value: 80 },
    ]}
  />
</Chart>
```

This example combines axis labels, scrolling, legend, scales, foreground styles, and multiple chart types in a single `Chart` container. Use it as a template for building your own charts.