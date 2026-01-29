---
title: 分组柱状图（BarGroupChart）
description: 一个将数据表示为分组条形的图表，其中每个组代表一个类别，组内的条形代表子类别。

---
        
本示例演示如何在 `BarChart` 中使用 `positionBy` 属性将柱状图按子分类（如颜色）进行分组，并使用 `foregroundStyleBy` 对每组数据应用不同的颜色样式。此方式适用于在主分类下对多个子类进行对比展示。

## 场景说明

数据包含了不同颜色（如 `Green`, `Purple`, `Pink`, `Yellow`）下的三种物体类型（`Cube`, `Sphere`, `Pyramid`）及其数量（`count`）。图表展示了每种颜色下各类型物体的数量，按颜色分组并以不同颜色区分。

## 核心概念说明

### `positionBy`

```ts
positionBy: {
  value: item.color,
  axis: 'horizontal',
}
```

* 将柱状图按照 `value`（此处为颜色）进行分组。
* `axis` 指定分组的方向：

  * `'horizontal'`：按 Y 轴进行分组（即按颜色垂直堆叠或排列）。
  * `'vertical'`：按 X 轴分组（通常用于横向柱状图）。

### `foregroundStyleBy`

```ts
foregroundStyleBy: item.color
```

* 根据指定的字段值（颜色）为每个柱状条应用前景样式（颜色）。
* 有助于在图表中清晰地区分不同的分组。

## 代码摘要

```tsx
const data = [
  { color: "Green", type: "Cube", count: 2 },
  { color: "Purple", type: "Sphere", count: 1 },
  ...
]

const list = data.map(item => ({
  label: item.type,              // 主标签（如 Cube、Sphere）
  value: item.count,             // 数值高度
  positionBy: {
    value: item.color,           // 分组依据（颜色）
    axis: 'horizontal',
  },
  foregroundStyleBy: item.color, // 应用不同颜色
  cornerRadius: 8,
}))
```

## 完整示例

```tsx
<Chart frame={{ height: 400 }}>
  <BarChart marks={list} />
</Chart>
```

该图表将以颜色为分组单位，每组包含三种类型（Cube、Sphere、Pyramid）的柱状条，每种颜色对应一组条，并应用统一的颜色样式。

## 适用场景

此类分组柱状图适用于：

* 展示主分类下的子分类对比（例如不同行业中不同岗位数量对比）。
* 展示结构化数据的分布情况。
* 强调多个子类在各分组中的占比和数量。
