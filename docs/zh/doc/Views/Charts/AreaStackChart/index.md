---
title: 堆叠面积图（AreaStackChart）

---
        
`AreaStackChart` 是用于展示堆叠区域图的组件，可将一系列数值以堆叠区域的方式呈现在共享坐标轴上，适用于展示各分类数据在一段时间内的变化趋势及其组合占比。

## 使用示例

```tsx
<Chart frame={{ height: 300 }}>
  <AreaStackChart
    marks={[
      {
        category: "Cheese",
        label: "2020",
        value: 0.26,
        stacking: "standard"
      },
      ...
    ]}
  />
</Chart>
```

## 属性说明

### `marks: Array<object>` **(必填)**

用于定义图表数据的数组。每一项表示一个图表标记，支持以下字段：

* `category: string`
  数据所属的分类名称，用于堆叠图中分组。

* `label: string | Date`
  图表横轴的标签，可为字符串或日期，常用于表示时间（如年份）。

* `value: number`
  对应的数值，用于绘制堆叠区域的高度。

* `unit?: CalendarComponent`
  指定时间单位，如 `"year"`、`"month"`、`"day"` 等。用于基于时间的标记。

* `stacking?: ChartMarkStackingMethod`
  设置堆叠方式，可选值包括：

  * `"standard"`：从基线开始正常堆叠（默认）。
  * `"normalized"`：将每组值归一化为总值的百分比。
  * `"center"`：以中心轴为基线对称堆叠。
  * `"unstacked"`：不进行堆叠，单独绘制。

* 其他可选的 `ChartMarkProps` 属性：
  支持丰富的样式和行为配置，如：

  * `foregroundStyle`（前景样式）
  * `opacity`（透明度）
  * `cornerRadius`（圆角）
  * `interpolationMethod`（插值方式）
  * `symbol`、`symbolSize`、`annotation`（注释）、`clipShape`、`shadow`、`blur`、`zIndex`、`offset` 等

详细配置请参考 `ChartMarkProps` 定义。

### `labelOnYAxis?: boolean`

是否将 `label` 值显示在 Y 轴上（默认在 X 轴）。默认为 `false`。

## 示例

```tsx
<AreaStackChart
  labelOnYAxis={false}
  marks={[
    {
      category: "Burger",
      label: 2020,
      value: 0.6,
      stacking: "standard"
    },
    {
      category: "Cheese",
      label: 2020,
      value: 0.26,
      stacking: "standard"
    },
    {
      category: "Bun",
      label: 2020,
      value: 0.24,
      stacking: "standard"
    }
  ]}
/>
```
