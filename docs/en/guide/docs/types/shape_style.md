The `ShapeStyle` type defines how colors, gradients, and materials can be applied to a view’s foreground or background, mirroring the styling capabilities found in SwiftUI. It encompasses a wide range of styling options, including simple colors, system materials, and complex gradients.

## Overview

When using modifiers like `foregroundStyle` or `background`, you can supply a `ShapeStyle` to determine the visual appearance. For example, a solid red background, a system material blur, or a linear gradient can all be represented using `ShapeStyle`.

**In SwiftUI (for reference):**
```swift
Text("Hello")
    .foregroundStyle(.red)
    .background(
        LinearGradient(
            colors: [.green, .blue],
            startPoint: .top,
            endPoint: .bottom
        )
    )
```

**In Scripting (TypeScript/TSX):**
```tsx
<Text
  foregroundStyle="red"
  background={{
    gradient: [
      { color: 'green', location: 0 },
      { color: 'blue', location: 1 }
    ],
    startPoint: { x: 0.5, y: 0 },
    endPoint: { x: 0.5, y: 1 }
  }}
>
  Hello
</Text>
```

## ShapeStyle Variants

The `ShapeStyle` type can be one of the following:

1. **Material**: System-defined materials that create layered effects, often adding blur or translucency.
2. **Color**: A solid color, which can be defined using keywords, hex strings, or RGBA strings.
3. **Gradient**: A collection of colors or gradient stops that produce a smooth color transition.
4. **LinearGradient**: A gradient that progresses linearly from a start point to an end point.
5. **RadialGradient**: A gradient that radiates outward from a center point.
6. **ColorWithGradientOrOpacity**: A combination of a base color that can produce a standard gradient automatically or have an adjusted opacity.

### Materials

**Material** refers to system blur effects like `regular`, `thin`, and so forth. They give your UI the distinctive “frosted” look often seen in native iOS apps.

**Example:**
```tsx
<HStack background="regular">
  {/* Content here */}
</HStack>
```

### Colors

**Colors** can be defined in three ways:

- **Keyword Colors**: System and named colors (e.g. `"systemBlue"`, `"red"`, `"label"`).
- **Hex Strings**: Like CSS hex (`"#FF0000"` or `"#F00"` for red).
- **RGBA Strings**: CSS rgba notation (`"rgba(255,0,0,1)"` for opaque red).

**Example:**
```tsx
<Text foregroundStyle="blue">Blue Text</Text>
<HStack background="#00FF00">Green Background</HStack>
<HStack background="rgba(255,255,255,0.5)">Semi-transparent White Background</HStack>
```

### Gradients

**Gradient** is defined as either an array of `Color` values or an array of `GradientStop` objects, where each `GradientStop` includes a `color` and a `location` (0 to 1) to define the transition.

**Example:**
```tsx
<HStack
  background={{
    gradient: [
      { color: 'red', location: 0 },
      { color: 'orange', location: 0.5 },
      { color: 'yellow', location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  }}
>
  {/* Content */}
</HStack>
```

### LinearGradient

**LinearGradient** lets you define a gradient that moves along a straight line between two points. You specify colors or stops, and the start/end points either as keywords (`'top'`, `'bottom'`, `'leading'`, `'trailing'`) or as `Point` objects (`{x: number, y: number}`).

**Example:**
```tsx
<HStack
  background={{
    colors: ['green', 'blue'],
    startPoint: 'top',
    endPoint: 'bottom'
  }}
>
  {/* Content */}
</HStack>
```

Or, using gradient stops with custom coordinates:

```tsx
<HStack
  background={{
    stops: [
      { color: 'green', location: 0 },
      { color: 'blue', location: 1 }
    ],
    startPoint: { x: 0.5, y: 0 },
    endPoint: { x: 0.5, y: 1 }
  }}
>
  {/* Content */}
</HStack>
```

### RadialGradient

**RadialGradient** spreads out colors from a central point, defined by a `center` coordinate, and transitions from a `startRadius` to an `endRadius`.

**Example:**
```tsx
<HStack
  background={{
    colors: ['red', 'yellow'],
    center: { x: 0.5, y: 0.5 },
    startRadius: 0,
    endRadius: 100
  }}
>
  {/* Content */}
</HStack>
```

### ColorWithGradientOrOpacity

With `ColorWithGradientOrOpacity`, you start with a `color` and then can specify a `gradient: true` property to use its standard gradient variation, or apply an `opacity` factor to make it translucent.

**Example:**
```tsx
<HStack
  background={{
    color: 'blue',
    gradient: true,
    opacity: 0.8
  }}
>
  {/* Content */}
</HStack>
```

This would create a gradient variation of the base color and apply an 80% opacity.

## Summary

- Use **Materials** for system blur effects.
- Use **Colors** for solid fills.
- Use **Gradients**, **LinearGradient**, or **RadialGradient** for smooth transitions between multiple colors.
- Use **ColorWithGradientOrOpacity** to adjust color opacity or use a standard color-derived gradient.

By choosing the appropriate variant of `ShapeStyle`, you can easily style elements with the desired appearance in your UI—whether you need a simple color fill, a dynamic gradient, or a polished material effect.