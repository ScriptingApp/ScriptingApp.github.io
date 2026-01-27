# 形状

Scripting 提供了一套形状组件，用于绘制可缩放的矢量图形元素，包括矩形、圆形、椭圆、胶囊形、圆角矩形等。这些图形支持填充、描边、裁剪路径和尺寸控制，可广泛应用于信息展示、装饰背景、自定义进度视图等界面场景。

***

## 通用属性：`ShapeProps`

所有形状组件均支持以下属性，用于控制外观：

```ts
type ShapeProps = {
  trim?: {
    from: number
    to: number
  }
  fill?: ShapeStyle | DynamicShapeStyle
  stroke?: ShapeStyle | DynamicShapeStyle | {
    shapeStyle: ShapeStyle | DynamicShapeStyle
    strokeStyle: StrokeStyle
  }
  strokeLineWidth?: number // 已废弃
}
```

### 属性说明

| 属性名               | 类型                                 | 说明                                             |
| ----------------- | ---------------------------------- | ---------------------------------------------- |
| `trim`            | `{ from: number; to: number }`     | 裁剪图形路径，仅绘制部分路径。`from` 与 `to` 为 0～1 的小数。        |
| `fill`            | `ShapeStyle` 或 `DynamicShapeStyle` | 设置填充颜色或渐变。                                     |
| `stroke`          | 同 `fill`，或带 `strokeStyle` 的对象      | 设置描边颜色或渐变，支持自定义描边样式。                           |
| `strokeLineWidth` | `number`（已废弃）                      | 设置描边宽度。建议使用 `stroke.strokeStyle.lineWidth` 替代。 |

***

## 描边样式：`StrokeStyle`

你可以通过 `strokeStyle` 对象来自定义描边的线条细节：

```ts
type StrokeStyle = {
  lineWidth?: number
  lineCap?: 'butt' | 'round' | 'square'
  lineJoin?: 'bevel' | 'miter' | 'round'
  mitterLimit?: number
  dash?: number[]
  dashPhase?: number
}
```

### 描边样式参数说明

| 参数名           | 说明                                                   |
| ------------- | ---------------------------------------------------- |
| `lineWidth`   | 描边线条的宽度（单位：pt）。                                      |
| `lineCap`     | 线条端点样式，可选 `"butt"`（平头）、`"round"`（圆头）、`"square"`（方头）。 |
| `lineJoin`    | 拐角连接样式，可选 `"miter"`、`"round"`、`"bevel"`。             |
| `mitterLimit` | miter 样式拐角的最小限制（用于防止尖角过长）。                           |
| `dash`        | 虚线样式数组，定义实线和空白的交替长度。                                 |
| `dashPhase`   | 从虚线图案中的哪个位置开始绘制（偏移量）。                                |

***

## 支持的形状组件

### `Rectangle` 矩形

```tsx
<Rectangle
  fill="orange"
  stroke={{
    shapeStyle: "red",
    strokeStyle: {
      lineWidth: 3,
      lineJoin: "round"
    }
  }}
  frame={{ width: 100, height: 100 }}
/>
```

***

### `RoundedRectangle` 圆角矩形

```tsx
<RoundedRectangle
  fill="blue"
  cornerRadius={16}
  frame={{ width: 100, height: 100 }}
/>
```

支持统一圆角半径或尺寸：

```ts
type RoundedRectangleProps = ShapeProps & (
  | { cornerRadius: number }
  | { cornerSize: { width: number, height: number } }
) & {
  style?: RoundedCornerStyle // 默认为 continuous
}
```

***

### `UnevenRoundedRectangle` 不规则圆角矩形

支持为每个角设置不同的圆角半径：

```tsx
<UnevenRoundedRectangle
  fill="brown"
  topLeadingRadius={16}
  topTrailingRadius={0}
  bottomLeadingRadius={0}
  bottomTrailingRadius={16}
  frame={{ width: 100, height: 50 }}
/>
```

***

### `Circle` 圆形

```tsx
<Circle
  stroke="purple"
  strokeLineWidth={4}
  frame={{ width: 100, height: 100 }}
/>
```

***

### `Capsule` 胶囊形

```tsx
<Capsule
  fill="systemIndigo"
  frame={{ width: 100, height: 40 }}
/>
```

***

### `Ellipse` 椭圆

```tsx
<Ellipse
  fill="green"
  frame={{ width: 40, height: 100 }}
/>
```

***

## 使用建议

- 使用 `fill` 和 `stroke` 可分别设置填充与描边样式，支持纯色与渐变；
- 若需自定义描边样式（如虚线、线头、线角），应使用 `stroke.strokeStyle`；
- `strokeLineWidth` 已废弃，建议统一使用 `strokeStyle.lineWidth`；
- `trim` 属性可用于实现动画绘图、进度展示等场景；
- 所有形状组件均支持 `frame`、`padding`、`background` 等布局修饰符，适合与其他组件组合使用。
