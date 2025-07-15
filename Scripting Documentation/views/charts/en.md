The `Chart` view in the Scripting app is a wrapper for SwiftUI charts, with slight differences in usage. In the Scripting app, `Chart` acts as a container for one or more specific chart types. You can combine multiple charts in a single `Chart` container.

## General Syntax

```tsx
<Chart>
  <LineChart ... />
  <BarChart ... />
</Chart>
```

Each chart type (e.g., `BarChart`, `LineChart`, `PieChart`) has its own unique properties, but all must be nested within a `Chart` view.

---

## Examples for Each Chart Type

### **1. Line Chart**

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

### **2. Bar Chart**

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

### **3. Pie Chart**

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

### **4. Donut Chart**

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

### **5. Heat Map Chart**

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

### **6. Area Stack Chart**

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

### **7. Bar Gantt Chart**

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

### **8. Point Chart**

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

### **9. Point Category Chart**

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

### **10. Rule Chart**

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

### **11. Rule Line for Value Chart**

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

### **12. Rect Area Chart**

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

### **13. Bar 1D Chart**

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

### **14. Point 1D Chart**

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

### **15. Bar Group Chart**

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

## Combined Chart Example

You can combine multiple charts in a single `Chart` container.

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

## Notes
- Use `Chart` as a container to wrap all specific chart types.
- Combine different chart types for comparative visualizations.
- All chart properties are passed as props to the individual chart components.

For detailed customization options, refer to the specific chart properties above. Happy charting!