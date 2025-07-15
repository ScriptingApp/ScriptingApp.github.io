**Scripting** 应用中的 `Chart` 视图是对 SwiftUI 图表的封装，使用上有些许不同。在 **Scripting** 应用中，`Chart` 作为一个容器，用于包裹一个或多个特定的图表类型。您可以在单个 `Chart` 容器中组合多个图表。

## 一般语法

```tsx
<Chart>
  <LineChart ... />
  <BarChart ... />
</Chart>
```

每种图表类型（如 `BarChart`、`LineChart`、`PieChart`）都有自己的独特属性，但所有图表都必须嵌套在 `Chart` 视图中。

---

## 每种图表类型的示例

### **1. 折线图（Line Chart）**

```tsx
<Chart>
  <LineChart
    marks={[
      { label: "Jan", value: 50 },
      { label: "Feb", value: 75, lineStyle: { dash: [5, 2] } },
    ]}
  />
</Chart>
```

### **2. 条形图（Bar Chart）**

```tsx
<Chart>
  <BarChart
    labelOnYAxis={true}
    marks={[
      { label: "A", value: 30 },
      { label: "B", value: 50 },
    ]}
  />
</Chart>
```

---

### **3. 饼图（Pie Chart）**

```tsx
<Chart>
  <PieChart
    marks={[
      { category: "Apple", value: 40 },
      { category: "Banana", value: 60 },
    ]}
  />
</Chart>
```

---

### **4. 圆环图（Donut Chart）**

```tsx
<Chart>
  <DonutChart
    marks={[
      {
        category: "Income",
        value: 70,
        innerRadius: { type: "ratio", value: 0.6 },
        outerRadius: { type: "fixed", value: 120 },
      },
    ]}
  />
</Chart>
```

---

### **5. 热力图（Heat Map Chart）**

```tsx
<Chart>
  <HeatMapChart
    marks={[
      { x: "Monday", y: "Task A", value: 20 },
      { x: "Tuesday", y: "Task B", value: 50 },
    ]}
  />
</Chart>
```

---

### **6. 堆叠区域图（Area Stack Chart）**

```tsx
<Chart>
  <AreaStackChart
    labelOnYAxis={false}
    marks={[
      { category: "A", label: "Jan", value: 40, stacking: "relative" },
      { category: "B", label: "Jan", value: 20, stacking: "relative" },
    ]}
  />
</Chart>
```

---

### **7. 条形甘特图（Bar Gantt Chart）**

```tsx
<Chart>
  <BarGanttChart
    labelOnYAxis={true}
    marks={[
      { label: "Task A", start: 1, end: 5 },
      { label: "Task B", start: 3, end: 8 },
    ]}
  />
</Chart>
```

---

### **8. 点图（Point Chart）**

```tsx
<Chart>
  <PointChart
    marks={[
      { x: 1, y: 2, symbol: "circle", symbolSize: 10 },
      { x: 2, y: 4, symbol: "triangle", symbolSize: 15 },
    ]}
  />
</Chart>
```

---

### **9. 点类别图（Point Category Chart）**

```tsx
<Chart>
  <PointCategoryChart
    representsDataUsing="symbol"
    marks={[
      { x: 1, y: 10, category: "Group A" },
      { x: 2, y: 20, category: "Group B" },
    ]}
  />
</Chart>
```

---

### **10. 规则图（Rule Chart）**

```tsx
<Chart>
  <RuleChart
    labelOnYAxis={false}
    marks={[
      { label: "Lower Bound", start: 10, end: 15 },
      { label: "Upper Bound", start: 20, end: 25 },
    ]}
  />
</Chart>
```

---

### **11. 值的规则线图（Rule Line for Value Chart）**

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

---

### **12. 矩形区域图（Rect Area Chart）**

```tsx
<Chart>
  <RectAreaChart
    marks={[
      { xStart: 0, xEnd: 10, yStart: 0, yEnd: 20 },
      { xStart: 15, xEnd: 25, yStart: 10, yEnd: 30 },
    ]}
  />
</Chart>
```

---

### **13. 一维条形图（Bar 1D Chart）**

```tsx
<Chart>
  <Bar1DChart
    labelOnYAxis={false}
    marks={[
      { category: "Item A", value: 50 },
      { category: "Item B", value: 75 },
    ]}
  />
</Chart>
```

---

### **14. 一维点图（Point 1D Chart）**

```tsx
<Chart>
  <Point1DChart
    horizontal={true}
    marks={[
      { value: 10 },
      { value: 20 },
    ]}
  />
</Chart>
```
---

### **15. 分组柱状图**

```tsx
<Chart>
  <BarChart
    marks={[
      { value: 10, label: "A", positionBy: "yellow", foregroundStyleBy: "yellow"},
      { value: 3, label: "A", positionBy: "green", foregroundStyleBy: "green"},
      { value: 12, label: "B", positionBy: "yellow", foregroundStyleBy: "yellow" },
      { value: 20, label: "B", positionBy: "green", foregroundStyleBy: "green" },
      { value: 5, label: "C", positionBy: "yellow", foregroundStyleBy: "yellow" },
      { value: 8, label: "C", positionBy: "green", foregroundStyleBy: "green"},
    ]}
  />
</Chart>
```

---

## 组合图表示例

您可以在一个 `Chart` 容器中组合多个图表。

```tsx
<Chart>
  <LineChart
    marks={[
      { label: "Jan", value: 100 },
      { label: "Feb", value: 150 },
    ]}
  />
  <BarChart
    marks={[
      { label: "Jan", value: 50 },
      { label: "Feb", value: 75 },
    ]}
  />
</Chart>
```

---

## 注意事项
- 使用 `Chart` 作为容器，包裹所有特定的图表类型。
- 组合不同类型的图表，进行比较性的可视化展示。
- 所有图表属性都作为 props 传递给各自的图表组件。

有关详细的自定义选项，请参阅上面提供的每种图表的属性。祝您图表制作愉快！