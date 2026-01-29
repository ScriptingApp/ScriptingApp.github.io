# 矩形图（RectChart）

`RectChart` 是一个矩形条形图组件，用于可视化基于标签的数值数据。其用法与 `BarChart` 类似，使用相同的 `BarChartProps` 接口。

***

## 示例

```tsx
<RectChart
  labelOnYAxis={false}
  marks={[
    { label: "Cube", value: 5 },
    { label: "Sphere", value: 4 },
    { label: "Pyramid", value: 4 },
  ]}
/>
```

***

## 属性说明

### `labelOnYAxis`（可选）

- **类型：** `boolean`
- **默认值：** `false`
- **说明：**
  若设置为 `true`，标签将显示在 Y 轴上，图表将以横向条形展示；若为 `false`，标签位于 X 轴，显示为纵向条形。

***

### `marks`（必填）

- **类型：**
  `Array<{ label: string | Date; value: number; unit?: CalendarComponent } & ChartMarkProps>`
- **说明：**
  指定每个矩形条的标签和值。

#### 每个 mark 对象包含：

- `label`: 类别标签（如 "Cube"），用于坐标轴显示。
- `value`: 数值，决定矩形条的高度或宽度。
- `unit`: _(可选)_ 时间单位（如为时间序列数据时使用）。

此外，还可以使用继承自 `ChartMarkProps` 的可视属性，如：

- `foregroundStyle`: 设置颜色样式
- `cornerRadius`: 设置圆角
- `annotation`: 添加标注
- `opacity`: 设置透明度

***

## 完整示例

```tsx
const toysData = [
  { type: "Cube", count: 5 },
  { type: "Sphere", count: 4 },
  { type: "Pyramid", count: 4 },
]

<RectChart
  labelOnYAxis={true}
  marks={toysData.map(toy => ({
    label: toy.type,
    value: toy.count,
  }))}
/>
```

***

## 适用场景

- 分类数据的可视化对比
- 报表或仪表盘中的数量展示
- 替代传统柱状图的简洁矩形展示风格
