---
title: foregroundStyle & background
description: These two properties allow you to customize the visual styling of view content and its background.

---

These two modifiers—`foregroundStyle` and `background`—allow you to customize the visual styling of view content and its background, supporting a wide range of styles including solid colors, gradients, materials, and dynamic appearances for light/dark mode.

---

## `foregroundStyle`

### Definition

```ts
foregroundStyle?: ShapeStyle | DynamicShapeStyle | {
  primary: ShapeStyle | DynamicShapeStyle
  secondary: ShapeStyle | DynamicShapeStyle
  tertiary?: ShapeStyle | DynamicShapeStyle
}
```

Sets the style of a view’s foreground content, such as the color of text, shapes, or symbols. You can pass a single style or a layered style object (`primary`, `secondary`, `tertiary`) to support multi-layered rendering, such as in SF Symbols or decorated text.

### Usage Examples

#### Basic Foreground Color

```tsx
<Text foregroundStyle="white">
  Hello World!
</Text>
```

#### Foreground with Dynamic Colors (Light/Dark Mode)

```tsx
<Text
  foregroundStyle={{
    light: "black",
    dark: "white"
  }}
>
  Adaptive Text
</Text>
```

#### Multi-layer Foreground Style

```tsx
<Text
  foregroundStyle={{
    primary: "red",
    secondary: "orange",
    tertiary: "yellow"
  }}
>
  Layered Style
</Text>
```

> Use layered styles primarily with views that support multistage rendering like system icons or stylized text.

---

## `background`

### Definition

```ts
background?: 
  | ShapeStyle 
  | DynamicShapeStyle 
  | { style: ShapeStyle | DynamicShapeStyle, shape: Shape }
  | VirtualNode 
  | { content: VirtualNode, alignment: Alignment }
```

Sets the background of a view. You can apply simple colors or gradients, or supply a custom shape or view as the background.

### Background Variants

1. **ShapeStyle**: Use a solid color, gradient, or material.
2. **DynamicShapeStyle**: Automatically switches styles between light and dark mode.
3. **Shape with Fill Style**: Use a shape (e.g., `RoundedRectangle`) with a style applied to it.
4. **VirtualNode**: Use another component as the background.
5. **Custom Alignment**: Align a background content explicitly behind the main view.

### Usage Examples

#### Solid Color Background

```tsx
<Text background="systemBlue">
  Hello
</Text>
```

#### Gradient Background

```tsx
<Text
  background={{
    gradient: [
      { color: "purple", location: 0 },
      { color: "blue", location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  }}
>
  Gradient Background
</Text>
```

#### Dynamic Background

```tsx
<Text
  background={{
    light: "white",
    dark: "black"
  }}
>
  Mode-aware Background
</Text>
```

#### Background with a Shape

```tsx
<Text
  background={
    <RoundedRectangle fill="systemBlue" />
  }
>
  Hello World!
</Text>
```

#### Background with Custom Alignment

```tsx
<Text
  background={{
    content: <Image filePath="path/to/background.jpg" />,
    alignment: "center"
  }}
>
  Overlayed Text
</Text>
```

---

## Related Types

* **`ShapeStyle`**
  A visual style that defines how a foreground or background is rendered—this can be a color, gradient, or material. Supports `"red"`, `"systemBlue"`, `"#FF0000"`, `rgba(...)`, and gradient definitions.

* **`DynamicShapeStyle`**
  A light/dark mode–aware style with separate definitions for each appearance. The system automatically applies the appropriate style based on the current UI mode.

* **`VirtualNode`**
  A component used as a background, such as `<Image />`, `<RoundedRectangle />`, or any view that returns a `JSX.Element`.

* **`Shape`**
  A predefined shape such as `RoundedRectangle`, `Circle`, or `Capsule`, used for styled background shapes.

---

## Summary

| Property          | Purpose                             | Value Types                                            |
| ----------------- | ----------------------------------- | ------------------------------------------------------ |
| `foregroundStyle` | Styles text/icons/foreground shapes | `ShapeStyle`, `DynamicShapeStyle`, layered object      |
| `background`      | Renders a styled background         | `ShapeStyle`, `DynamicShapeStyle`, shape + style, view |

These properties give you fine-grained control over visual styling and are essential for building rich, adaptive interfaces in the Scripting app.
