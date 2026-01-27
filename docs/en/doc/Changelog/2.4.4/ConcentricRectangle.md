---
title: ConcentricRectangle

---

`ConcentricRectangle` is a **concentric rectangle shape view** introduced in iOS 26+. It is designed to create rectangles with **progressively inset (concentric) corner geometry**, which adapts naturally to modern UI designs.

It is especially suitable for:

* Glass-style buttons
* Card backgrounds
* Interactive clipping regions
* Glass transition masks
* Layered container UI

In Scripting, `ConcentricRectangle` can be used both as:

* A **standalone Shape view**
* A **specialized shape inside**:

  * `clipShape`
  * `background`
  * `contentShape`

---

## 1. ConcentricRectangle Core Definition

```ts
type ConcentricRectangleProps = ShapeProps & ConcentricRectangleShape

/**
 * A concentric rectangle aligned inside the frame of the view containing it.
 * @available iOS 26+.
 */
declare const ConcentricRectangle: FunctionComponent<ConcentricRectangleProps>
```

### Description

* `ConcentricRectangle` is a standard **Shape component**
* Supports:

  * Fill
  * Stroke
  * Trimmed paths
  * Advanced corner distribution via `ConcentricRectangleShape`
* Always renders **inside the parent view’s frame**
* Available on **iOS 26 and later only**

---

## 2. Corner Style System: EdgeCornerStyle

The core visual behavior of `ConcentricRectangle` is controlled through `EdgeCornerStyle`, which defines how each corner behaves.

```ts
type EdgeCornerStyle =
  | {
      style: "fixed"
      radius: number
    }
  | {
      style: "concentric"
      minimum: number
    }
  | "concentric"
```

---

### 2.1 Fixed Corner Style

```ts
{
  style: "fixed"
  radius: number
}
```

Used to create traditional fixed-radius rounded corners.

| Property | Description                   |
| -------- | ----------------------------- |
| `radius` | Fixed corner radius in points |

This mode is appropriate for classic static cards and buttons.

---

### 2.2 Concentric Corner Style

```ts
{
  style: "concentric"
  minimum: number
}
```

Creates a dynamically inset **concentric corner effect**.

| Property  | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| `minimum` | The minimum inner corner radius used as the base for automatic progression |

Recommended for:

* Glass-style controls
* Dynamic cards
* Layered UI surfaces
* Animated masking effects

---

### 2.3 Shorthand Mode

```ts
"concentric"
```

Equivalent to:

```ts
{
  style: "concentric"
  minimum: systemDefault
}
```

---

## 3. ConcentricRectangleShape (Corner Distribution Rules)

`ConcentricRectangleShape` defines **how corner styles are distributed** across all four corners.
It supports **seven structural configuration patterns**.

---

### 3.1 Uniform Corners (Most Common)

```ts
{
  corners: EdgeCornerStyle
  isUniform?: boolean
}
```

| Property    | Description                                  |
| ----------- | -------------------------------------------- |
| `corners`   | Corner style applied to all four corners     |
| `isUniform` | Forces strict uniformity, default is `false` |

Example:

```tsx
<ConcentricRectangle
  corners={{
    style: "concentric",
    minimum: 8
  }}
  fill="red"
/>
```

---

### 3.2 Fully Independent Corners

```ts
{
  topLeadingCorner?: EdgeCornerStyle
  topTrailingCorner?: EdgeCornerStyle
  bottomLeadingCorner?: EdgeCornerStyle
  bottomTrailingCorner?: EdgeCornerStyle
}
```

Used for:

* Asymmetric cards
* Special edge treatments
* Adaptive container layouts

---

### 3.3 Uniform Bottom Corners

```ts
{
  uniformBottomCorners?: EdgeCornerStyle
  topLeadingCorner?: EdgeCornerStyle
  topTrailingCorner?: EdgeCornerStyle
}
```

Typical for bottom sheets and lifted panels.

---

### 3.4 Uniform Top Corners

```ts
{
  uniformTopCorners?: EdgeCornerStyle
  bottomLeadingCorner?: EdgeCornerStyle
  bottomTrailingCorner?: EdgeCornerStyle
}
```

Typical for modal headers and floating top panels.

---

### 3.5 Uniform Top and Bottom

```ts
{
  uniformTopCorners?: EdgeCornerStyle
  uniformBottomCorners?: EdgeCornerStyle
}
```

---

### 3.6 Uniform Leading Corners

```ts
{
  uniformLeadingCorners?: EdgeCornerStyle
  topTrailingCorner?: EdgeCornerStyle
  bottomTrailingCorner?: EdgeCornerStyle
}
```

---

### 3.7 Uniform Leading and Trailing

```ts
{
  uniformLeadingCorners?: EdgeCornerStyle
  uniformTrailingCorners?: EdgeCornerStyle
}
```

---

## 4. Shared Shape Properties (ShapeProps)

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
}
```

---

### 4.1 trim (Path Trimming)

```ts
trim={{
  from: 0.0,
  to: 0.5
}}
```

Used for:

* Progressive path animations
* Partial rendering effects
* Stroke-only transitions

---

### 4.2 fill (Shape Fill)

```ts
fill="red"
fill="ultraThinMaterial"
```

Supports:

* Solid colors
* System materials
* Gradient styles

---

### 4.3 stroke (Outline Rendering)

```ts
stroke="blue"

stroke={{
  shapeStyle: "blue",
  strokeStyle: {
    lineWidth: 2
  }
}}
```

---

## 5. Using ConcentricRectangle in View Modifiers

### 5.1 As clipShape

```ts
clipShape?: Shape | "concentricRect" | ({
  type: "concentricRect"
} & ConcentricRectangleShape)
```

Example:

```tsx
<VStack
  clipShape={{
    type: "concentricRect",
    corners: {
      style: "concentric",
      minimum: 10
    }
  }}
/>
```

Used for:

* Actual visual clipping
* Glass transition masking
* Blur boundary control

---

### 5.2 As background

```ts
background?: ShapeStyle | DynamicShapeStyle | {
  style: ShapeStyle | DynamicShapeStyle
  shape: Shape | "concentricRect" | ({
    type: "concentricRect"
  } & ConcentricRectangleShape)
} | VirtualNode | {
  content: VirtualNode
  alignment: Alignment
}
```

Example:

```tsx
<VStack
  background={{
    style: "ultraThinMaterial",
    shape: {
      type: "concentricRect",
      corners: "concentric"
    }
  }}
/>
```

---

### 5.3 As contentShape (Hit Testing Area)

```ts
contentShape?: Shape | {
  kind: ContentShapeKinds
  shape: Shape | "concentricRect" | ({
    type: "concentricRect"
  } & ConcentricRectangleShape)
}
```

Defines the interactive region for:

* Taps
* Gestures
* Hover detection
* Drag operations

---

## 6. Full Example Breakdown

```tsx
<ZStack
  frame={{
    width: 300,
    height: 200
  }}
  containerShape={{
    type: "rect",
    cornerRadius: 32
  }}
>
  <ConcentricRectangle
    corners={{
      style: "concentric",
      minimum: 8
    }}
    fill="red"
  />
</ZStack>
```

This configuration produces:

* A fixed-radius outer container
* A concentric inner rectangle
* A layered depth effect between the two shapes
* A visually emphasized inner hierarchy via red fill

---

## 7. Design and Implementation Notes

1. `minimum` should never exceed half of the smallest side of the container.
2. Concentric corner styles work best when combined with:

   * Glass material
   * Blur
   * Opacity layering
3. When used as `contentShape`, it only affects hit-testing, not rendering.
4. When used as `clipShape`, it physically clips the rendered content.
5. Nested `ConcentricRectangle` layers create stronger depth cues than uniform rounded rectangles.
