---
title: DynamicShapeStyle
description: This type allows you to define two distinct styles for a shape—one for light mode and another for dark mode. The system automatically applies the appropriate style based on the current color scheme (light or dark) of the user’s device.

---

The `DynamicShapeStyle` type allows you to define two distinct styles for a shape—one for light mode and another for dark mode. The system automatically applies the appropriate style based on the current color scheme (light or dark) of the user’s device.

## Overview

Dynamic styling is a critical aspect of creating adaptive and visually appealing user interfaces. With `DynamicShapeStyle`, you can ensure that your shapes blend seamlessly with the user's preferred color scheme by defining separate styles for light and dark modes.

**Key points:**

- Define a style for **light mode** using the `light` property.
- Define a style for **dark mode** using the `dark` property.
- The system will automatically apply the appropriate style based on the user's current settings.

## Declaration

```tsx
type DynamicShapeStyle = {
    light: ShapeStyle;
    dark: ShapeStyle;
};
```

- **`light: ShapeStyle`**  
  The style to apply when the system is in light mode.

- **`dark: ShapeStyle`**  
  The style to apply when the system is in dark mode.

### Supported `ShapeStyle`

The `ShapeStyle` can be a color, gradient, or material. For example:

- **Colors**: Solid colors like `"red"`, hex values like `"#FF0000"`, or CSS-like RGBA strings like `"rgba(255, 0, 0, 1)"`.
- **Gradients**: Linear or radial gradients.
- **Materials**: System materials like `"regularMaterial"`, `"thickMaterial"`.

## Example Usage

### Using Dynamic Colors

```tsx
const dynamicStyle: DynamicShapeStyle = {
  light: "blue",
  dark: "gray"
}

<Text
  foregroundStyle={dynamicStyle}
/>
```

In this example, the shape appears **blue** in light mode and **gray** in dark mode.

### Using Dynamic Gradients

```tsx
const dynamicStyle: DynamicShapeStyle = {
  light: {
    gradient: [
      { color: "lightblue", location: 0 },
      { color: "white", location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  },
  dark: {
    gradient: [
      { color: "darkblue", location: 0 },
      { color: "black", location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  }
}

<Circle
  fill={dynamicStyle}
/>
```

Here, the shape uses a **light blue to white gradient** in light mode and a **dark blue to black gradient** in dark mode.

### Using Materials

```tsx
const dynamicStyle: DynamicShapeStyle = {
  light: "regularMaterial",
  dark: "ultraThickMaterial"
}

<HStack
  background={dynamicStyle}
></HStack>
```

This configuration applies a **regular material** in light mode and an **ultra-thick material** in dark mode.

## Why Use `DynamicShapeStyle`?

Dynamic styling helps create a better user experience by ensuring:

1. **Visual Harmony**: Your shapes adapt to the user's color scheme, maintaining aesthetic coherence.
2. **Accessibility**: Adjusting styles for dark mode improves readability and usability in low-light environments.
3. **Consistency**: Aligns your app's appearance with system-wide preferences, making it feel more integrated.

## Summary

With `DynamicShapeStyle`, you can create flexible and adaptive styles for shapes that seamlessly respond to the user's color scheme. By defining separate styles for light and dark modes, your app will look great in any environment, ensuring a consistent and user-friendly experience.