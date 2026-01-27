---
title: 图表样式

---

该组件提供了一个高度可定制的界面，用于创建和展示多种类型的图表。本文档详细说明了如何使用 `Chart` 视图的属性来配置轴、比例、标签、图例等。

---

### **1. 轴的可见性**

- **`chartXAxis`**
  - **类型**: `"automatic" | "hidden" | "visible"`
  - **描述**: 设置 X 轴的可见性。
  - **示例**:
    ```tsx
    <Chart chartXAxis="visible">
      <BarChart ... />
    </Chart>
    ```

- **`chartYAxis`**
  - **类型**: `"automatic" | "hidden" | "visible"`
  - **描述**: 设置 Y 轴的可见性。
  - **示例**:
    ```tsx
    <Chart chartYAxis="hidden">
      <LineChart ... />
    </Chart>
    ```

---

### **2. 轴标签**

- **`chartXAxisLabel`**
  - **类型**:  
    ```ts
    {
      position?: "automatic" | "bottom" | "bottomLeading" | "bottomTrailing" | "leading" | "overlay" | "top" | "topLeading" | "topTrailing" | "trailing";
      alignment?: "leading" | "center" | "trailing";
      spacing?: number;
      content: VirtualNode;
    }
    ```
  - **描述**: 为 X 轴添加标签。
  - **示例**:
    ```tsx
    <Chart
      chartXAxisLabel={{
        position: "bottom",
        alignment: "center",
        spacing: 10,
        content: <Text>X 轴标签</Text>,
      }}
    >
      <BarChart ... />
    </Chart>
    ```

- **`chartYAxisLabel`**
  - **类型**: 与 `chartXAxisLabel` 相同。
  - **描述**: 为 Y 轴添加标签。
  - **示例**:
    ```tsx
    <Chart
      chartYAxisLabel={{
        position: "leading",
        content: <Text>Y 轴标签</Text>,
      }}
    >
      <LineChart ... />
    </Chart>
    ```

---

### **3. 图例**

- **`chartLegend`**
  - **类型**:  
    ```ts
    "automatic" | "hidden" | "visible" | {
      position?: "automatic" | "bottom" | "bottomLeading" | "bottomTrailing" | "leading" | "overlay" | "top" | "topLeading" | "topTrailing" | "trailing";
      alignment?: "leading" | "center" | "trailing";
      spacing?: number;
      content?: VirtualNode;
    }
    ```
  - **描述**: 配置图例。
  - **示例**:
    ```tsx
    <Chart
      chartLegend={{
        position: "top",
        alignment: "center",
        content: <Text>图例</Text>,
      }}
    >
      <AreaChart ... />
    </Chart>
    ```

---

### **4. 比例**

- **`chartXScale` / `chartYScale`**
  - **类型**:  
    ```ts
    ClosedRange<number> | ClosedRange<Date> | string[] | "category" | "date" | "linear" | "log" | "squareRoot" | "symmetricLog" | {
      domain: ClosedRange<number> | ClosedRange<Date> | string[];
      type: "category" | "date" | "linear" | "log" | "squareRoot" | "symmetricLog";
    }
    ```
  - **描述**: 配置 X 或 Y 轴的比例。
  - **示例**:
    ```tsx
    <Chart
      chartXScale={{ domain: { from: 0, to: 100 }, type: "linear" }}
      chartYScale={["A", "B", "C"]}
    >
      <LineChart ... />
    </Chart>
    ```

---

### **5. 背景**

- **`chartBackground`**
  - **类型**:  
    ```ts
    VirtualNode | {
      alignment?: "leading" | "center" | "trailing";
      content: VirtualNode;
    }
    ```
  - **描述**: 为图表容器添加背景。
  - **示例**:
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

### **6. 前景样式**

- **`chartForegroundStyleScale`**
  - **类型**:  
    ```ts
    Record<string, ShapeStyle>;
    ```
  - **描述**: 自定义图表标记的颜色。
  - **示例**:
    ```tsx
    <Chart
      chartForegroundStyleScale={{
        "类别 1": { color: "blue" },
        "类别 2": { color: "red" },
      }}
    >
      <BarChart ... />
    </Chart>
    ```

---

### **7. 可滚动轴**

- **`chartScrollableAxes`**
  - **类型**:  
    ```ts
    "vertical" | "horizontal" | "all"
    ```
  - **描述**: 启用指定轴的滚动。
  - **示例**:
    ```tsx
    <Chart chartScrollableAxes="horizontal">
      <LineChart ... />
    </Chart>
    ```

---

### **8. 选中**

- **`chartXSelection` / `chartYSelection` / `chartAngleSelection`**
  - **类型**:  
    ```ts
    {
      value: string | number | null;
      onChanged: (newValue: string | number | null) => void;
      valueType: "string" | "number";
    }
    ```
  - **描述**: 启用指定轴的选择功能。
  - **示例**:
    ```tsx
    <Chart
      chartXSelection={{
        value: "类别 1",
        onChanged: (newValue) => console.log("已选择:", newValue),
        valueType: "string",
      }}
    >
      <BarChart ... />
    </Chart>
    ```

---

### **9. 滚动位置**

- **`chartScrollPositionX` / `chartScrollPositionY`**
  - **类型**:  
    ```ts
    number | string | {
      value: number | string;
      onChanged: (newValue: number | string) => void;
    }
    ```
  - **描述**: 设置 X 或 Y 轴的初始滚动位置。
  - **示例**:
    ```tsx
    <Chart
      chartScrollPositionX={{
        value: 0,
        onChanged: (newValue) => console.log("滚动 X:", newValue),
      }}
    >
      <BarChart ... />
    </Chart>
    ```

---

## **综合示例**

以下示例展示了如何使用多个属性来创建一个完全自定义的图表：

```tsx
<Chart
  chartXAxis="visible"
  chartYAxis="visible"
  chartXAxisLabel={{
    position: "bottom",
    alignment: "center",
    spacing: 8,
    content: <Text>X 轴标签</Text>,
  }}
  chartYAxisLabel={{
    position: "leading",
    content: <Text>Y 轴标签</Text>,
  }}
  chartLegend={{
    position: "top",
    alignment: "center",
    content: <Text>图例</Text>,
  }}
  chartXScale={{ domain: { from: 0, to: 100 }, type: "linear" }}
  chartScrollableAxes="all"
  chartForegroundStyleScale={{
    "类别 A": { color: "green" },
    "类别 B": { color: "blue" },
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

此示例在单个 `Chart` 容器中结合了轴标签、滚动、图例、比例、前景样式以及多种图表类型。可将其用作构建自定义图表的模板。