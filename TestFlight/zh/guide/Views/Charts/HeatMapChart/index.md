# 热力图（HeatMapChart）

`HeatMapChart`（热力图）组件用于以网格形式展示二维数据的分布情况，其中每个单元格的颜色深浅表示该位置对应的数值大小。非常适合用于可视化两个分类维度之间的关系、频率或强度。

## 使用示例

```tsx
<Chart
  aspectRatio={{
    value: 1,
    contentMode: 'fit'
  }}
>
  <HeatMapChart
    marks={[
      { x: "+", y: "+", value: 125 },
      { x: "+", y: "-", value: 10 },
      { x: "-", y: "-", value: 80 },
      { x: "-", y: "+", value: 1 },
    ]}
  />
</Chart>
```

## 属性说明

### `marks: Array<object>` **（必填）**

每个项表示热力图中的一个网格单元，包括其位置（X/Y 坐标）和用于计算颜色强度的数值。

#### 字段：

- `x: string`
  横轴坐标（例如某个分类或标签）。

- `y: string`
  纵轴坐标（例如另一分类或标签）。

- `value: number`
  该坐标点对应的数值，用于映射颜色的深浅。数值越大，颜色通常越深或越饱和。

- 继承自 `ChartMarkProps` 的其他样式属性：
  支持进一步的样式配置，包括：

  - `foregroundStyle`（前景颜色）
  - `opacity`（透明度）
  - `annotation`（注释）
  - `cornerRadius`（圆角）
  - `zIndex` 等

## 适用场景

`HeatMapChart` 适用于以下数据可视化需求：

- 展示相关性矩阵（correlation matrix）
- 分析两个分类维度之间的分布关系
- 可视化频率、密度或绩效指标的强弱分布

## 完整示例

```tsx
const data = [
  { positive: "+", negative: "+", num: 125 },
  { positive: "+", negative: "-", num: 10 },
  { positive: "-", negative: "-", num: 80 },
  { positive: "-", negative: "+", num: 1 },
]

<HeatMapChart
  marks={data.map(item => ({
    x: item.positive,
    y: item.negative,
    value: item.num,
  }))}
/>
```
