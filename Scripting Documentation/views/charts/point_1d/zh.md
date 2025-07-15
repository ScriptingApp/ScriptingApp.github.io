`Point1DChart`（一维点图）组件用于在单一轴线上展示一组数值点。每个点仅具有一个数值维度，常用于可视化分布、聚类、离群值等简单的一维数据。

与常见的二维图表不同，`Point1DChart` 没有 X/Y 坐标轴对，而是仅在一个方向上（水平或垂直）排列点，适合用于呈现紧凑且极简的数据可视化。

---

## 使用示例

```tsx
<Point1DChart
  horizontal={false}
  marks={[
    { value: 0.3 },
    { value: 0.6 },
    { value: 0.9 },
    ...
  ]}
/>
```

---

## 属性说明

### `horizontal?: boolean`

* 设置为 `true` 时，图表在 **横向轴** 上展示，点沿 **纵向方向** 排列。
* 设置为 `false`（默认）时，图表在 **纵向轴** 上展示，点沿 **横向方向** 排列。

---

### `marks: Array<object>` **（必填）**

每个标记代表图表上的一个点，包含以下字段：

* `value: number`
  点在主轴（X 轴或 Y 轴）上的数值位置。

* 可继承 `ChartMarkProps` 中的样式属性，例如：

  * `symbol`（自定义形状）
  * `foregroundStyle`（点的颜色）
  * `opacity`（透明度）
  * `annotation`（注释）
  * `offset`、`zIndex` 等

---

## 完整示例

```tsx
const data = [
  { value: 0.3 }, { value: 0.6 }, { value: 0.9 },
  { value: 1.3 }, { value: 1.7 }, { value: 1.9 },
  { value: 2 },   { value: 2.2 }, { value: 3 },
  { value: 4 },   { value: 5 },   { value: 5.2 },
  { value: 5.5 }, { value: 6 },
]

<Point1DChart
  horizontal={horizontal}
  marks={data}
/>
```

可通过 `Toggle` 控件动态切换 `horizontal` 属性以改变图表布局方向。

---

## 适用场景

`Point1DChart` 适合以下用途：

* 可视化单变量数值的分布（类似条状分布图或 rug plot）
* 表示事件时间点、测量值或数量分布
* 突出展示异常值（outliers）或集中区（clusters）
