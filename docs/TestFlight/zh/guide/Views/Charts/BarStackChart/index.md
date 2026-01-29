---
title: 堆叠柱状图（BarStackChart）
description: 一个将数据表示为堆叠条形的图表，其中每个条形代表总值，并被分割成表示子值的段。

---
        
`BarStackChart`（堆叠柱状图）组件用于将多个子分类的数据值以堆叠条形的方式展现在同一个主分类下，便于对比每组数据的总量及其组成部分。每条柱状条会被拆分为多个颜色段，每段代表一个子分类。

## 场景示例

本示例展示了按玩具形状（`Cube`、`Sphere`、`Pyramid`）分组的数据，每组下根据颜色（`Green`、`Purple`、`Pink`、`Yellow`）堆叠显示各颜色的数量占比。

## 使用示例

```tsx
<Chart frame={{ height: 400 }}>
  <BarStackChart
    labelOnYAxis={false}
    marks={[
      { label: "Cube", value: 2, category: "Green" },
      { label: "Cube", value: 1, category: "Purple" },
      ...
    ]}
  />
</Chart>
```

## 属性说明

### `labelOnYAxis?: boolean`

* 设置为 `true` 时，分类标签显示在 **Y 轴**，图表呈 **横向柱状图**。
* 设置为 `false`（默认值）时，标签显示在 **X 轴**，图表呈 **纵向柱状图**。

### `marks: Array<object>` **（必填）**

每个数据项代表堆叠柱中的一个区块，包含以下字段：

* `label: string | Date`
  主分类标签，用于将多个子分类堆叠在同一条柱状图上（例如 `"Cube"`、`"Sphere"`）。

* `category: string`
  子分类标识，用于区分堆叠条形的不同组成部分（例如颜色：`"Green"`、`"Pink"`）。

* `value: number`
  数值，决定堆叠部分的高度或长度。

* `unit?: CalendarComponent`
  （可选）用于时间序列的单位。

* 其他可选的 `ChartMarkProps` 样式属性，支持个性化设置，如：

  * `foregroundStyle`（前景样式）
  * `cornerRadius`（圆角）
  * `symbol`（标记）
  * `annotation`（注释）
  * 等其他可视化属性

## 完整示例

```tsx
const data = [
  { color: "Green", type: "Cube", count: 2 },
  { color: "Purple", type: "Cube", count: 1 },
  ...
]

<BarStackChart
  labelOnYAxis={labelOnYAxis}
  marks={data.map(item => ({
    label: item.type,
    value: item.count,
    category: item.color,
  }))}
/>
```

## 布局切换

示例中提供了 `Toggle` 开关，可动态切换柱状图的显示方向（横向或纵向），通过控制 `labelOnYAxis` 实现。

## 执行视图

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}
```

## 适用场景

`BarStackChart` 适合用于以下场景：

* 展示各分类下的组成部分及总量对比
* 可视化每组数据中子项的占比关系
* 比较多个项目中相同结构的变化趋势
