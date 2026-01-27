---
title: Shapes

---
        
Scripting provides a suite of shape components for creating scalable, vector-based UI elements such as rectangles, circles, capsules, ellipses, and rounded rectangles. These shapes support customizable fill, stroke, trimming, and sizing, making them ideal for dashboards, decorative elements, and interactive visuals.

---

## Common `ShapeProps`

All shape components support the following properties for visual customization:

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
  strokeLineWidth?: number // Deprecated
}
```

### Property Descriptions

| Property          | Type                                                                 | Description                                                                                              |
| ----------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `trim`            | `{ from: number; to: number }`                                       | Renders only a portion of the shape’s path. Both `from` and `to` are fractions between `0.0` and `1.0`.  |
| `fill`            | `ShapeStyle` \| `DynamicShapeStyle`                                  | Fills the shape with a solid color or gradient.                                                          |
| `stroke`          | `ShapeStyle` \| `DynamicShapeStyle` \| `{ shapeStyle, strokeStyle }` | Outlines the shape with a customizable stroke. Supports color, gradient, and stroke style configuration. |
| `strokeLineWidth` | `number` (Deprecated)                                                | Sets the stroke width. Prefer `strokeStyle.lineWidth` for more control.                                  |

---

## StrokeStyle

To define the appearance of a shape’s stroke, you can use the `strokeStyle` object:

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

### StrokeStyle Options

| Property      | Description                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------- |
| `lineWidth`   | Width of the stroke line in points.                                                         |
| `lineCap`     | Shape of the endpoints: `"butt"` (flat), `"round"` (rounded), or `"square"` (square-ended). |
| `lineJoin`    | Join style for corners: `"miter"`, `"round"`, or `"bevel"`.                                 |
| `mitterLimit` | Limit for miter joins. Used when `lineJoin` is `"miter"`.                                   |
| `dash`        | Array of numbers that define the lengths of painted and unpainted segments.                 |
| `dashPhase`   | How far into the dash pattern to start the drawing.                                         |

---

## Supported Shape Components

### `Rectangle`

A basic rectangle.

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

---

### `RoundedRectangle`

A rectangle with uniformly or dimensionally rounded corners.

```tsx
<RoundedRectangle
  fill="blue"
  cornerRadius={16}
  frame={{ width: 100, height: 100 }}
/>
```

---

### `UnevenRoundedRectangle`

A rectangle with individually configurable corner radii.

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

---

### `Circle`

A circle centered within its frame.

```tsx
<Circle
  stroke="purple"
  strokeLineWidth={4}
  frame={{ width: 100, height: 100 }}
/>
```

---

### `Capsule`

An elongated shape with fully rounded ends.

```tsx
<Capsule
  fill="systemIndigo"
  frame={{ width: 100, height: 40 }}
/>
```

---

### `Ellipse`

An oval shape fitted inside a rectangular frame.

```tsx
<Ellipse
  fill="green"
  frame={{ width: 40, height: 100 }}
/>
```

---

## Notes

* To apply advanced stroke customization (e.g. dashed outlines), use the `strokeStyle` object.
* The `strokeLineWidth` property is deprecated and should be replaced with `stroke.strokeStyle.lineWidth`.
* The `trim` modifier is particularly useful for animations (e.g., animated drawing of progress rings).
* All shapes are compatible with layout modifiers like `frame`, `padding`, and `background`.
