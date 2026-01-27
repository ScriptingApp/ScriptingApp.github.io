---
title: 标尺图（RuleChart）

---
        
`RuleChart` 用于展示每个分类项的数值范围或持续时间。每条规则表示一个起始值和结束值的跨度，适用于展示周期、持续时间或数值范围的可视化数据。

---

## 示例

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

## 属性（Props）

### `labelOnYAxis`（可选）

* **类型：** `boolean`
* **默认值：** `false`
* **说明：**
  若设置为 `true`，图表会将分类标签放置在 Y 轴，并以横向方式展示每条规则（水平规则）。若为 `false`，则标签在 X 轴，规则为垂直方向。

---

### `marks`（必填）

* **类型：**

  ```ts
  Array<{
    label: string | Date;
    start: number;
    end: number;
    unit?: CalendarComponent;
  } & ChartMarkProps>
  ```
* **说明：**
  用于定义每条规则的起止范围。

#### 每项 mark 包含以下字段：

* `label`：分类标签或时间单位（如 `"Trees"` 或一个 `Date`）。
* `start`：规则的起始数值。
* `end`：规则的结束数值。
* `unit`：（可选）时间单位，如 `.month`、`.day`，用于表示基于时间的规则范围。

也可结合 `ChartMarkProps` 使用，支持以下自定义样式：

* `foregroundStyle` — 设置颜色或样式
* `annotation` — 添加标注标签
* `opacity` — 控制透明度

---

## 完整示例

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

## 适用场景

* 展示活动周期或生长季节（如花粉季）
* 显示任务或项目的起止时间
* 比较不同类别的数据范围
