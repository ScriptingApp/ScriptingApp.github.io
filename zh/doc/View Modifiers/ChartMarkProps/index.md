# 通用图表标记属性 (ChartMarkProps)

`ChartMarkProps` 用于配置图表中的每一个 mark（例如柱状图的 BarMark、折线图的 LineMark 等），提供一系列通用的修饰属性，支持设置样式、符号、位置、注解、变换等内容。该类型可用于 `BarChart`、`LineChart`、`AreaChart` 等组件的 `marks` 属性中。

***

## 一、样式修饰

### `foregroundStyle`

设置图表内容的填充颜色或样式。

- 类型：`ShapeStyle | DynamicShapeStyle`
- 示例：

  ```tsx
  foregroundStyle: "systemGreen"
  ```

***

### `opacity`

设置透明度，取值范围为 `0.0 ~ 1.0`。

- 类型：`number`
- 示例：

  ```tsx
  opacity: 0.5
  ```

***

### `cornerRadius`

设置图形的圆角半径，常用于柱状图或胶囊图。

- 类型：`number`
- 示例：

  ```tsx
  cornerRadius: 8
  ```

***

### `lineStyle`

设置线条样式，适用于折线图或路径图。

- 类型：`StrokeStyle`
- 结构：

  ```ts
  {
    lineWidth?: number
    lineCap?: 'butt' | 'round' | 'square'
    lineJoin?: 'bevel' | 'miter' | 'round'
    mitterLimit?: number
    dash?: number[]
    dashPhase?: number
  }
  ```
- 示例：

  ```tsx
  lineStyle: {
    lineWidth: 2,
    lineCap: "round",
    dash: [4, 2]
  }
  ```

***

### `interpolationMethod`

设置线图或面积图的插值方式（曲线连接方式）。

- 类型：`ChartInterpolationMethod`
- 可选值：
  `"cardinal"`、`"catmullRom"`、`"linear"`、`"monotone"`、`"stepCenter"`、`"stepEnd"`、`"stepStart"`
- 示例：

  ```tsx
  interpolationMethod: "catmullRom"
  ```

***

### `alignsMarkStylesWithPlotArea`

样式是否与绘图区对齐。

- 类型：`boolean`
- 示例：

  ```tsx
  alignsMarkStylesWithPlotArea: true
  ```

***

## 二、符号设置（用于折线图或散点图）

### `symbol`

设置标记符号的形状，或使用自定义视图作为标记。

- 类型：`ChartSymbolShape | VirtualNode`
- 可选值：
  `"circle"`、`"square"`、`"triangle"`、`"diamond"`、`"cross"`、`"plus"`、`"asterisk"`、`"pentagon"`
- 示例：

  ```tsx
  symbol: "triangle"
  ```

***

### `symbolSize`

设置符号大小，可以是单一数值或包含宽高的对象。

- 类型：`number | { width: number; height: number }`
- 示例：

  ```tsx
  symbolSize: 18
  // 或
  symbolSize: { width: 16, height: 16 }
  ```

***

## 三、注解设置

### `annotation`

为某个 mark 添加注释视图，并可设置位置、对齐、间距及溢出处理策略。

- 类型：`VirtualNode | { position?, alignment?, spacing?, overflowResolution?, content }`
- 示例：

  ```tsx
  annotation: {
    position: "top",
    alignment: "center",
    spacing: 4,
    overflowResolution: {
      x: "fit",
      y: "padScale"
    },
    content: <Text>注解</Text>
  }
  ```

#### `AnnotationPosition` 注解位置

用于控制注解视图相对于 mark 的定位位置。

- 类型：字符串
- 可选值：
  `"automatic"`、`"top"`、`"topLeading"`、`"topTrailing"`、
  `"bottom"`、`"bottomLeading"`、`"bottomTrailing"`、
  `"leading"`、`"trailing"`、`"overlay"`

***

#### `AnnotationOverflowResolutionStrategy` 溢出处理策略

用于处理注解超出图表边界时的排版策略。

- 可选值：

  - `"automatic"`：自动选择合适的策略
  - `"fit"`：自动调整位置以适配边界
  - `"fitToPlot"`：限制在绘图区范围内
  - `"fitToChart"`：限制在整个图表范围内
  - `"fitToAutomatic"`：自动选择图表或绘图区
  - `"padScale"`：扩展坐标范围为注解留出空间
  - `"disabled"`：不处理溢出，允许剪裁

***

## 四、图形变换效果

### `clipShape`

设置图形裁剪区域的形状。

- 类型：`"rect"`、`"circle"`、`"capsule"`、`"ellipse"`、`"buttonBorder"`、`"containerRelative"`
- 示例：

  ```tsx
  clipShape: "capsule"
  ```

***

### `shadow`

为 mark 添加阴影。

- 类型：

  ```ts
  {
    color?: string
    radius: number
    x?: number
    y?: number
  }
  ```
- 示例：

  ```tsx
  shadow: {
    color: "systemGray",
    radius: 4,
    x: 2,
    y: 2
  }
  ```

***

### `blur`

添加模糊效果，数值越大模糊越强。

- 类型：`number`
- 示例：

  ```tsx
  blur: 5
  ```

***

### `zIndex`

控制 mark 在图层中的显示顺序。

- 类型：`number`
- 示例：

  ```tsx
  zIndex: 10
  ```

***

### `offset`

为 mark 设置偏移量，可控制其在 X/Y 轴上的位置偏移。

- 类型支持以下形式：

  - `{ x, y }`
  - `{ x, yStart, yEnd }`
  - `{ xStart, xEnd, y }`
  - `{ xStart, xEnd, yStart, yEnd }`
- 示例：

  ```tsx
  offset: { x: 10, y: -5 }
  ```

***

## 五、数据绑定修饰（`xxxBy`）

通过绑定数据字段实现动态设置样式或位置，不能与相同功能的静态属性同时使用。

***

### `foregroundStyleBy`

根据数据字段动态设置填充样式。

- 类型：`string | number | Date | { value, label }`
- 示例：

  ```tsx
  foregroundStyleBy: {
    value: item.color,
    label: "颜色"
  }
  ```

***

### `lineStyleBy`

根据数据字段动态设置线条样式。

- 示例：

  ```tsx
  lineStyleBy: {
    value: item.type,
    label: "线型"
  }
  ```

***

### `positionBy`

设置 mark 的位置和在图表坐标轴上的作用方向。

- 类型：

  ```ts
  {
    value: string | number | Date
    label?: string
    axis: 'horizontal' | 'vertical'
    span?: MarkDimension
  }
  ```
- 示例：

  ```tsx
  positionBy: {
    value: item.category,
    axis: "horizontal",
    span: {
      type: "ratio",
      value: 0.8
    }
  }
  ```

#### `MarkDimension` 标记尺寸控制

用于控制 mark 在轴向上的占用空间或尺寸。

- 类型：`"automatic"` 或：

  ```ts
  {
    type: "inset" | "fixed" | "ratio"
    value: number
  }
  ```
- 含义说明：

  - `"automatic"`：系统自动决定尺寸
  - `"inset"`：根据设定的边距减少宽度或高度
  - `"fixed"`：固定的像素尺寸
  - `"ratio"`：根据比例占据坐标轴步长（范围 0\~1）

***

### `symbolBy`

根据数据字段动态设置符号形状。

- 示例：

  ```tsx
  symbolBy: {
    value: item.category,
    label: "类型"
  }
  ```

***

### `symbolSizeBy`

根据数据字段动态设置符号大小。

- 示例：

  ```tsx
  symbolSizeBy: {
    value: item.count,
    label: "数量"
  }
  ```

***

## 示例：分组柱状图

```tsx
<BarChart
  marks={data.map(item => ({
    label: item.type,
    value: item.count,
    positionBy: {
      value: item.color,
      axis: "horizontal"
    },
    foregroundStyleBy: item.color,
    cornerRadius: 8
  }))}
/>
```
