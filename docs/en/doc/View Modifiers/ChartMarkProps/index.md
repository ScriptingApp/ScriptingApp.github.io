---
title: ChartMarkProps

---
        
`ChartMarkProps` defines a set of visual and behavioral modifiers applicable to individual chart marks such as bars, lines, or areas. These modifiers allow developers to customize the appearance, layout, and dynamic behavior of chart elements in `BarChart`, `LineChart`, `AreaChart`, and other mark-based components.

---

## 1. Style Modifiers

### `foregroundStyle`

Specifies the fill style of the chart content.

* Type: `ShapeStyle | DynamicShapeStyle`
* Example:

  ```tsx
  foregroundStyle: "systemGreen"
  ```

### `opacity`

Sets the opacity of the mark, ranging from `0.0` (fully transparent) to `1.0` (fully opaque).

* Type: `number`
* Example:

  ```tsx
  opacity: 0.6
  ```

### `cornerRadius`

Sets the corner radius for shapes such as bars or capsules.

* Type: `number`
* Example:

  ```tsx
  cornerRadius: 8
  ```

### `lineStyle`

Applies stroke styles for line marks.

* Type: `StrokeStyle`
* Structure:

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
* Example:

  ```tsx
  lineStyle: {
    lineWidth: 2,
    lineCap: "round",
    dash: [4, 2]
  }
  ```

### `interpolationMethod`

Controls how lines or areas interpolate between data points.

* Type: `ChartInterpolationMethod`
* Options:
  `"cardinal"`, `"catmullRom"`, `"linear"`, `"monotone"`, `"stepCenter"`, `"stepEnd"`, `"stepStart"`
* Example:

  ```tsx
  interpolationMethod: "catmullRom"
  ```

### `alignsMarkStylesWithPlotArea`

Determines whether styles align with the chart’s plot area.

* Type: `boolean`
* Example:

  ```tsx
  alignsMarkStylesWithPlotArea: true
  ```

---

## 2. Symbol Configuration (for Line/Scatter Charts)

### `symbol`

Sets a symbol type or a custom view as the plotting symbol.

* Type: `ChartSymbolShape | VirtualNode`
* Options:
  `"circle"`, `"square"`, `"triangle"`, `"diamond"`, `"cross"`, `"plus"`, `"asterisk"`, `"pentagon"`
* Example:

  ```tsx
  symbol: "triangle"
  ```

### `symbolSize`

Controls the symbol’s size.

* Type: `number | { width: number; height: number }`
* Example:

  ```tsx
  symbolSize: 18
  // or
  symbolSize: { width: 16, height: 16 }
  ```

---

## 3. Annotations

### `annotation`

Adds an annotation view positioned relative to a mark.

* Type: `VirtualNode | { position?, alignment?, spacing?, overflowResolution?, content }`
* Structure:

  ```ts
  {
    position?: AnnotationPosition
    alignment?: Alignment
    spacing?: number
    overflowResolution?: {
      x?: AnnotationOverflowResolutionStrategy
      y?: AnnotationOverflowResolutionStrategy
    }
    content: VirtualNode
  }
  ```
* Example:

  ```tsx
  annotation: {
    position: "top",
    alignment: "center",
    spacing: 4,
    overflowResolution: {
      x: "fit",
      y: "padScale"
    },
    content: <Text>Label</Text>
  }
  ```

#### `AnnotationPosition`

Defines where the annotation is placed relative to the mark.

* Type: string
* Values:

  * `"automatic"`
  * `"top"`, `"topLeading"`, `"topTrailing"`
  * `"bottom"`, `"bottomLeading"`, `"bottomTrailing"`
  * `"leading"`, `"trailing"`
  * `"overlay"` (overlay the mark itself)

#### `AnnotationOverflowResolutionStrategy`

Specifies how to handle annotation layout overflow.

* Type: string
* Values:

  * `"automatic"`: Selects the best resolution strategy automatically
  * `"fit"`: Adjusts the annotation to stay within the boundary
  * `"fitToPlot"`: Fits annotation within the plot area
  * `"fitToChart"`: Fits within the full chart bounds
  * `"fitToAutomatic"`: Automatically chooses between chart and plot bounds
  * `"padScale"`: Extends the chart scale to fit the annotation
  * `"disabled"`: Disables overflow resolution (allows clipping)

---

## 4. Shape Effects

### `clipShape`

Applies a clipping shape to the mark.

* Type: `'rect' | 'circle' | 'capsule' | 'ellipse' | 'buttonBorder' | 'containerRelative'`
* Example:

  ```tsx
  clipShape: "capsule"
  ```

### `shadow`

Adds a drop shadow to the mark.

* Type:

  ```ts
  {
    color?: string // e.g. "systemGray"
    radius: number
    x?: number
    y?: number
  }
  ```
* Example:

  ```tsx
  shadow: {
    color: "systemGray",
    radius: 5,
    x: 2,
    y: 2
  }
  ```

### `blur`

Applies a Gaussian blur effect.

* Type: `number`
* Example:

  ```tsx
  blur: 6
  ```

### `zIndex`

Controls the rendering order of the mark relative to others.

* Type: `number`
* Example:

  ```tsx
  zIndex: 2
  ```

### `offset`

Offsets the mark in one or more dimensions.

* Supported formats:

  * `{ x, y }`
  * `{ x, yStart, yEnd }`
  * `{ xStart, xEnd, y }`
  * `{ xStart, xEnd, yStart, yEnd }`
* Example:

  ```tsx
  offset: { x: 10, y: -5 }
  ```

---

## 5. Dynamic Data Mapping (`xxxBy`)

These properties dynamically bind mark appearance or position to data fields. They should not be used in combination with their corresponding static properties (e.g. `foregroundStyleBy` vs. `foregroundStyle`).

### `foregroundStyleBy`

Maps a data field to a foreground style.

* Type: `string | number | Date | { value, label }`
* Example:

  ```tsx
  foregroundStyleBy: {
    value: item.color,
    label: "Color"
  }
  ```

### `lineStyleBy`

Maps a data field to a line style.

* Example:

  ```tsx
  lineStyleBy: {
    value: item.pattern,
    label: "Line Style"
  }
  ```

### `positionBy`

Maps a data field to mark position and axis alignment.

* Type:

  ```ts
  {
    value: string | number | Date
    label?: string
    axis: 'horizontal' | 'vertical'
    span?: MarkDimension
  }
  ```
* Example:

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

#### `MarkDimension`

Controls the spacing or sizing behavior of the mark within its axis.

* Type: `"automatic"` or an object:

  ```ts
  {
    type: "inset" | "fixed" | "ratio"
    value: number
  }
  ```
* Explanation:

  * `"automatic"`: Lets the system determine the size
  * `"inset"`: Shrinks the size by an inset margin
  * `"fixed"`: Fixed screen-space size (in points)
  * `"ratio"`: Relative to available axis spacing (0 to 1)

### `symbolBy`

Maps a field to different symbol shapes.

* Example:

  ```tsx
  symbolBy: {
    value: item.category,
    label: "Type"
  }
  ```

### `symbolSizeBy`

Maps a field to symbol size.

* Example:

  ```tsx
  symbolSizeBy: {
    value: item.score,
    label: "Score"
  }
  ```

---

## Example: Grouped Bar Chart

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