---
title: 矩形面积图（RectAreaChart）

---
        
`RectAreaChart` 组件用于在二维图表中绘制矩形区域，适合用来突出显示特定区域、数据分布、容差区间或标注感兴趣的范围。可与其他图表（如 `PointChart`）叠加使用以增强可视化效果。

---

## 使用示例

```tsx
<RectAreaChart
  marks={[
    { xStart: 2.5, xEnd: 3.5, yStart: 4.5, yEnd: 5.5 },
    { xStart: 1.0, xEnd: 2.0, yStart: 1.0, yEnd: 2.0 },
  ]}
/>
```

---

## 属性（Props）

### `marks: Array<object>` **(必填)**

每个 `mark` 定义一个矩形区域，包含以下字段：

* `xStart: number`
  矩形在 X 轴上的起始值。

* `xEnd: number`
  矩形在 X 轴上的结束值。

* `yStart: number`
  矩形在 Y 轴上的起始值。

* `yEnd: number`
  矩形在 Y 轴上的结束值。

#### 可选通用属性（继承自 `ChartMarkProps`）：

* `opacity` – 设置矩形的透明度。
* `foregroundStyle` – 设置矩形的填充颜色或样式。
* `annotation` – 为该区域添加注释或标签。

---

## 完整示例

```tsx
const data = [
  { x: 5, y: 5 },
  { x: 2.5, y: 2.5 },
  { x: 3, y: 3 },
]

<RectAreaChart
  marks={data.map(item => ({
    xStart: item.x - 0.25,
    xEnd: item.x + 0.25,
    yStart: item.y - 0.25,
    yEnd: item.y + 0.25,
    opacity: 0.2,
  }))}
//>

<PointChart marks={data} />
```

此示例在每个点的周围绘制了一个半透明的矩形区域，表示误差范围或聚集区。

---

## 应用场景

* 在散点图上突出显示数据密集区域。
* 可视化特定值域范围或容差带。
* 表示测量误差或预测区间。
* 叠加图层展示用户关注区域。
