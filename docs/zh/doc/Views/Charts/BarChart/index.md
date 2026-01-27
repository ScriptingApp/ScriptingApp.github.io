---
title: 柱状图（BarChart）

---
        
`BarChart`（柱状图）组件用于以条形的形式直观比较不同分类的数值大小。每个柱形条对应一个标签，并通过其高度（纵向布局）或长度（横向布局）表示具体数值。

## 场景示例

本示例展示了三种玩具形状（`Cube`、`Sphere`、`Pyramid`）的数量，并提供一个开关用于切换柱状图的展示方向（横向或纵向），通过 `labelOnYAxis` 属性控制。

## 使用示例

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

## 属性说明

### `labelOnYAxis?: boolean`

* 设置为 `true` 时，标签显示在 **Y 轴**，图表将以 **横向柱状图** 的形式展示。
* 设置为 `false`（默认），标签显示在 **X 轴**，图表将以 **纵向柱状图** 的形式展示。

### `marks: Array<object>` **（必填）**

每个数据点定义一个柱状条，包含以下字段：

* `label: string | Date`
  分类的标签或标识。

* `value: number`
  柱状条对应的数值。

* `unit?: CalendarComponent`（可选）
  用于表示时间单位的字段，在处理时间数据时可设置。

* 可选的 `ChartMarkProps` 属性
  用于进一步自定义柱状条的样式，例如：

  * `foregroundStyle`（前景颜色）
  * `opacity`（透明度）
  * `cornerRadius`（圆角）
  * `symbol`（图形标记）
  * `annotation`（注释）等

## 示例代码

```tsx
const toysData = [
  { type: "Cube", count: 5 },
  { type: "Sphere", count: 4 },
  { type: "Pyramid", count: 4 },
]

<BarChart
  labelOnYAxis={labelOnYAxis}
  marks={toysData.map(toy => ({
    label: toy.type,
    value: toy.count,
  }))}
/>
```

## 支持动态布局切换

示例中使用 `Toggle` 实现横向 / 纵向图表的切换：

```tsx
<Toggle
  title="labelOnYAxis"
  value={labelOnYAxis}
  onChanged={setLabelOnYAxis}
/>
```

## 使用场景

`BarChart` 非常适用于：

* 对比多个分类的数值差异
* 展示调查结果、数量统计或排行榜数据
* 需要根据布局场景自由切换方向的图表展示
