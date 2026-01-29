---
title: 分类点状图（PointCategoryChart）
description: 一个将数据表示为按特定轴分类的点的图表，适用于可视化具有类别的离散数据。

---
        
`PointCategoryChart`（分类点图）组件用于在二维平面上绘制带有分类信息的数据点，并支持通过颜色、图形符号或符号大小来区分不同分类。适用于展示分组散点图、调查数据、或多分类指标对比等可视化场景。

---

## 使用示例

```tsx
<PointCategoryChart
  representsDataUsing="foregroundStyle"
  marks={[
    { category: "Apple", x: 10, y: 42 },
    { category: "Apple", x: 20, y: 37 },
    { category: "Orange", x: 30, y: 62 },
    ...
  ]}
/>
```

---

## 属性说明

### `marks: Array<object>` **（必填）**

每个标记表示图表上的一个数据点，需包含以下字段：

* `x: number`
  横轴数值（例如年龄、时间、评分等）。

* `y: number`
  纵轴数值（例如数量、比例、次数等）。

* `category: string`
  分类标识。不同分类的数据点会通过图形、颜色或大小加以区分。

* 支持继承 `ChartMarkProps` 的其他样式属性，包括：

  * `foregroundStyle`（颜色）
  * `symbol`（点形状）
  * `symbolSize`（点大小）
  * `annotation`（注释）
  * `opacity`、`offset`、`zIndex` 等

---

### `representsDataUsing?: "foregroundStyle" | "symbol" | "symbolSize"`

用于控制图表如何视觉区分不同分类的数据点：

* `"foregroundStyle"`：通过颜色区分分类
* `"symbol"`：通过不同形状的符号（如圆形、方形）区分分类
* `"symbolSize"`：通过符号大小表现分类或数值差异

> 该属性是 `foregroundStyleBy`、`symbolBy` 或 `symbolSizeBy` 的简化替代方案。

---

## 完整示例

```tsx
const favoriteFruitsData = [
  { fruit: "Apple", age: 10, count: 42 },
  { fruit: "Apple", age: 20, count: 37 },
  ...
]

<PointCategoryChart
  representsDataUsing="symbol"
  marks={favoriteFruitsData.map(item => ({
    category: item.fruit,
    x: item.age,
    y: item.count,
  }))}
/>
```

你可以通过 `<Picker>` 控件动态选择 `representsDataUsing` 的显示方式，以改变分类的可视化方式。

---

## 适用场景

`PointCategoryChart` 适合用于以下场景：

* 多分类数据在二维坐标中的对比展示
* 可视化多维调查数据或打分结果
* 通过符号特征突出分类差异性
* 构建具有视觉分组效果的散点图
