# 折线图（LineChart）

`LineChart`（折线图）组件用于在一组带标签的离散点之间绘制一条连续的折线，适合用于展示简单趋势、变化过程或阶段对比。
该组件的 API 与 `BarChart` 相同，适合用于单条折线的基础可视化。

***

## 示例场景

本示例展示了三种玩具形状（`Cube`、`Sphere`、`Pyramid`）的数量变化。用户可以通过切换 `labelOnYAxis` 控制折线图的横向或纵向布局。

***

## 使用示例

```tsx
<Chart>
  <LineChart
    labelOnYAxis={false}
    marks={[
      { label: "Cube", value: 5 },
      { label: "Sphere", value: 4 },
      { label: "Pyramid", value: 4 },
    ]}
  />
</Chart>
```

***

## 属性说明

### `labelOnYAxis?: boolean`

- 设置为 `true` 时，标签显示在 **Y 轴**，折线将以 **横向** 方式绘制。
- 默认为 `false`，标签显示在 **X 轴**，折线以 **纵向** 方式绘制。

***

### `marks: Array<object>` **（必填）**

每个标记代表图上的一个数据点，包含以下字段：

- `label: string | Date`
  点所对应的标签（如分类、时间点等）。

- `value: number`
  此标签下对应的数值。

- 也支持 `ChartMarkProps` 中的其他样式字段，例如：

  - `foregroundStyle`（颜色）
  - `symbol`（标记图形）
  - `annotation`（注释）
  - `cornerRadius`（圆角）
  - `opacity` 等

***

## 完整示例

```tsx
const toysData = [
  { type: "Cube", count: 5 },
  { type: "Sphere", count: 4 },
  { type: "Pyramid", count: 4 },
]

<LineChart
  marks={toysData.map(toy => ({
    label: toy.type,
    value: toy.count,
  }))}
/>
```

***

## 适用场景

`LineChart` 适用于以下情况：

- 展示标签序列下的基本趋势或阶段变化
- 表示单一维度随时间或分类的变化
- 构建清晰、简洁的折线可视化图表
