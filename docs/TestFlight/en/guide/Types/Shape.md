---
title: Shape
description: This property defines a visual clipping or background shape used in view modifiers such as clipShape, background, or border.

---

The `Shape` type defines a visual clipping or background shape used in view modifiers such as `clipShape`, `background`, or `border`. It mirrors SwiftUI's `Shape` protocol and supports standard system shapes and custom rounded rectangle configurations.

---

## Overview

A `Shape` can be:

* A **named shape keyword** (`'circle'`, `'rect'`, etc.)
* A **custom shape object** that defines corner radius or per-corner rounding.

These shapes are aligned within the frame of the containing view and are commonly used for clipping, masking, or background styling.

---

## Built-in Shapes

### `'rect'`

A standard rectangle. Can be customized with corner radius via the object form.

```tsx
clipShape="rect"
```

---

### `'circle'`

A perfect circle centered within the view’s frame. Its radius is half the length of the frame's shortest side.

```tsx
clipShape="circle"
```

---

### `'capsule'`

An elongated oval shape that spans the full width or height of the frame. Equivalent to a rounded rectangle with a corner radius equal to half of the shorter side.

```tsx
clipShape="capsule"
```

---

### `'ellipse'`

An ellipse that fills the frame.

```tsx
clipShape="ellipse"
```

---

### `'buttonBorder'`

A system-resolved shape for button borders. It automatically adapts based on platform and system context.

```tsx
clipShape="buttonBorder"
```

---

### `'containerRelative'`

A container-adaptive shape. If a container shape is defined in the view hierarchy, this resolves to a version of that shape. Otherwise, it defaults to a rectangle.

```tsx
clipShape="containerRelative"
```

---

## Custom Rectangle Shapes

To customize corner appearance on a rectangle, use one of the following object forms:

---

### Rounded Rectangle with Uniform Corner Radius

```ts
{
  type: 'rect',
  cornerRadius: number,
  style?: RoundedCornerStyle
}
```

* `cornerRadius`: Radius applied uniformly to all corners.
* `style` (optional): Corner style, such as `'circular'` or `'continuous'`.

#### Example

```tsx
clipShape={{
  type: 'rect',
  cornerRadius: 12,
  style: 'continuous'
}}
```

---

### Rounded Rectangle with Corner Size

```ts
{
  type: 'rect',
  cornerSize: {
    width: number
    height: number
  },
  style?: RoundedCornerStyle
}
```

* Allows specifying an elliptical radius with different width and height.

#### Example

```tsx
clipShape={{
  type: 'rect',
  cornerSize: { width: 10, height: 20 }
}}
```

---

### Rounded Rectangle with Per-Corner Radii

```ts
{
  type: 'rect',
  cornerRadii: {
    topLeading: number,
    topTrailing: number,
    bottomLeading: number,
    bottomTrailing: number
  },
  style?: RoundedCornerStyle
}
```

* Gives precise control over the rounding of each corner individually.

#### Example

```tsx
clipShape={{
  type: 'rect',
  cornerRadii: {
    topLeading: 10,
    topTrailing: 20,
    bottomLeading: 0,
    bottomTrailing: 30
  }
}}
```

---

## `RoundedCornerStyle`

Optional style that affects the curvature:

* `"circular"`: Traditional iOS-style round corners.
* `"continuous"` (default): Smooth and adaptive curves, typically used in modern UI designs.

---

## Summary Table

| Shape Type            | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| `'rect'`              | Plain rectangle                                                     |
| `'circle'`            | Circle inside the smallest side of the frame                        |
| `'capsule'`           | Rounded shape spanning width or height                              |
| `'ellipse'`           | Ellipse stretched to frame                                          |
| `'buttonBorder'`      | Adaptive button outline shape                                       |
| `'containerRelative'` | Depends on parent container shape; falls back to rectangle          |
| `custom rect`         | Rectangles with specific corner radius or per-corner configurations |
