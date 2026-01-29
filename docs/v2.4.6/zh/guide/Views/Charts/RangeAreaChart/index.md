---
title: 范围面积图（RangeAreaChart）
description: 一个将数据表示为两条线之间的面积的图表，表示一系列值。

---
        
`RangeAreaChart` 是一种范围区域图表组件，用于展示每个数据点的值区间，通常包括 `start` 和 `end` 值。它适合用来可视化温度范围、置信区间、最大值与最小值等。

---

## 使用示例

```tsx
<RangeAreaChart
  marks={[
    { label: "Jan", start: 0, end: 4 },
    { label: "Feb", start: 2, end: 6 },
    ...
  ]}
/>
```

---

## 属性（Props）

### `marks: Array<object>` **(必填)**

每个 `mark` 定义一个范围区间。

* `label: string | Date`
  对应 X 轴的标签，例如月份、类别名称或时间点。

* `start: number`
  范围的起始值（下界）。

* `end: number`
  范围的结束值（上界）。

* *(可选)* 支持 `ChartMarkProps` 中的通用属性：

  * `foregroundStyle` – 区域的填充颜色
  * `opacity`、`interpolationMethod`、`annotation` 等

---

### `interpolationMethod?: string`

指定图表区域在点之间的插值方式。
例如，`'catmullRom'` 会生成光滑的曲线。

---

## 完整示例

```tsx
const weatherData = [
  { month: "Jan", min: 0, max: 4 },
  { month: "Feb", min: 2, max: 6 },
  ...
]

<RangeAreaChart
  marks={weatherData.map(item => ({
    label: item.month,
    start: item.min,
    end: item.max,
    interpolationMethod: "catmullRom"
  }))}
/>
```

这个示例以平滑曲线的形式绘制了每个月的温度范围。

---

## 适用场景

`RangeAreaChart` 特别适用于以下场景：

* 显示温度等物理量的时间范围变化
* 可视化统计中的置信区间
* 展示股票价格的最小/最大波动区间
* 表达预测结果的不确定性范围等
