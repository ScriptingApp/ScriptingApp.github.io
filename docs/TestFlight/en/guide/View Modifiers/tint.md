---
title: tint
description: Overrides the default accent color for a specific view using a given style.

---

The `tint` property overrides the default accent color for a specific view using a given style. Unlike the global app accent color (which may be modified by user settings), `tint` is always respected and should be used to convey semantic meaning or visual emphasis at the component level.

## Definition

```ts
tint?: ShapeStyle | DynamicShapeStyle
```

## Supported Values

* **`ShapeStyle`**: A solid color, gradient, or material.
* **`DynamicShapeStyle`**: A color or gradient that adapts to light/dark mode.

## Common Use Cases

* Apply a local accent color to controls like `Toggle`, `Slider`, `Button`, or `ProgressView`.
* Visually differentiate elements in lists, forms, or modal components.
* Ensure consistent behavior regardless of system or user theme overrides.

## Example: Basic Tint

```tsx
<Toggle 
  tint="systemGreen"
  // ...
/>
```

## Example: Gradient Tint

```tsx
<ProgressView
  value={0.6}
  tint={{
    gradient: [
      { color: "red", location: 0 },
      { color: "orange", location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  }}
/>
```

## Example: Dynamic Tint

```tsx
<Slider
  tint={{
    light: "blue",
    dark: "purple"
  }}
  // ...
/>
```
