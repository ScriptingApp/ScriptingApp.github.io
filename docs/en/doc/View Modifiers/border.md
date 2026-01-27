---
title: border

---

The `border` property adds a border around the view using the specified `style` and optional `width`. This allows you to visually outline views with solid colors, gradients, or system materials, and support light/dark mode adaptations.

## Definition

```ts
border?: {
  style: ShapeStyle | DynamicShapeStyle
  width?: number
}
```

* **`style`**: Required. Defines the visual appearance of the border. Accepts `ShapeStyle` or `DynamicShapeStyle`.
* **`width`**: Optional. Specifies the thickness of the border in pixels. Defaults to `1`.

## Usage Examples

### Basic Solid Color Border

```tsx
<Text
  border={{
    style: "systemRed",
    width: 2
  }}
>
  Bordered Text
</Text>
```

### Default Width Border (1px)

```tsx
<HStack
  border={{
    style: "#000000"
  }}
>
  ...
</HStack>
```

### Gradient Border

```tsx
<Text
  border={{
    style: {
      gradient: [
        { color: "red", location: 0 },
        { color: "blue", location: 1 }
      ],
      startPoint: { x: 0, y: 0 },
      endPoint: { x: 1, y: 1 }
    },
    width: 3
  }}
>
  Gradient Border
</Text>
```

### Dynamic Border Style (Light/Dark Mode)

```tsx
<Text
  border={{
    style: {
      light: "gray",
      dark: "white"
    },
    width: 1.5
  }}
>
  Adaptive Border
</Text>
```

## Notes

* The border surrounds the entire view, respecting its layout and frame.
* You can use any `ShapeStyle`, including material blur styles like `"regularMaterial"` or `"ultraThinMaterial"` for a more iOS-native look.
