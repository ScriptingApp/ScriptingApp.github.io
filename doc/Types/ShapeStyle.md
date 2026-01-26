# ShapeStyle

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
6. **AngularGradient**: An angular gradient is also known as a “conic” gradient. This gradient applies the color function as the angle changes, relative to a center point and defined start and end angles.
7. **MeshGradient**: A two-dimensional gradient defined by a 2D grid of positioned colors.
8. **ColorWithGradientOrOpacity**: A combination of a base color that can produce a standard gradient automatically or have an adjusted opacity.

### Materials

**Material** refers to system blur effects like `regularMaterial`, `thinMaterial`, and so forth. They give your UI the distinctive “frosted” look often seen in native iOS apps.

**Example:**

```tsx
<HStack background="regularMaterial">
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
  background={
    gradient([
      { color: 'red', location: 0 },
      { color: 'orange', location: 0.5 },
      { color: 'yellow', location: 1 }
    ])
  }
>
  {/* Content */}
</HStack>
```

### LinearGradient

**LinearGradient** lets you define a gradient that moves along a straight line between two points. You specify colors or stops, and the start/end points either as keywords (`'top'`, `'bottom'`, `'leading'`, `'trailing'`) or as `Point` objects (`{x: number, y: number}`).

**Example:**

```tsx
<HStack
  background={
    gradient("linear", {
      colors: ['green', 'blue'],
      startPoint: 'top',
      endPoint: 'bottom'
    })
  }
>
  {/* Content */}
</HStack>
```

Or, using gradient stops with custom coordinates:

```tsx
<HStack
  background={
    gradient("linear", {
      stops: [
        { color: 'green', location: 0 },
        { color: 'blue', location: 1 }
      ],
      startPoint: { x: 0.5, y: 0 },
      endPoint: { x: 0.5, y: 1 }
    })
  }
>
  {/* Content */}
</HStack>
```

### RadialGradient

**RadialGradient** spreads out colors from a central point, defined by a `center` coordinate, and transitions from a `startRadius` to an `endRadius`.

**Example:**

```tsx
<HStack
  background={
    gradient("radial", {
      colors: ['red', 'yellow'],
      center: { x: 0.5, y: 0.5 },
      startRadius: 0,
      endRadius: 100
    })
  }
>
  {/* Content */}
</HStack>
```

### AngularGradient

An `AngularGradient` defines a color gradient that sweeps around a center point in an angular (circular) fashion. It is useful for creating effects such as progress rings or circular transitions.

#### Definition

An `AngularGradient` can be defined in one of several ways:

```ts
type AngularGradient =
  | { stops: GradientStop[], center: KeywordPoint | Point, startAngle: Angle, endAngle: Angle }
  | { colors: Color[], center: KeywordPoint | Point, startAngle: Angle, endAngle: Angle }
  | { gradient: Gradient, center: KeywordPoint | Point, startAngle: Angle, endAngle: Angle }
  | { stops: GradientStop[], center: KeywordPoint | Point, angle: Angle }
  | { colors: Color[], center: KeywordPoint | Point, angle: Angle }
  | { gradient: Gradient, center: KeywordPoint | Point, angle: Angle }
```

#### Parameters

- **`colors`** or **`stops`**: Specifies the colors or color stops used in the gradient.
- **`center`**: The point around which the angular sweep is performed. Can be a named keyword (e.g., `"center"`, `"top"`) or a custom `Point`.
- **`startAngle`** and **`endAngle`**: Defines the angular sweep range.
- **`angle`** (optional alternative): A single angle that defines the full sweep extent.

#### Example

```tsx
<Circle
  fill={gradient("angular", {
    colors: ["blue", "purple", "pink"],
    center: "center",
    startAngle: 0,
    endAngle: 360
  })}
/>
```

In this example, a circular gradient fills a shape, sweeping clockwise from blue to pink around the center.

### MeshGradient (iOS 18.0+)

A `MeshGradient` is a two-dimensional gradient composed of a grid of colored control points. It offers fine-grained control over both color and shape, allowing for complex, dynamic gradient effects.

#### Definition

```ts
type MeshGradient = {
  width: number
  height: number
  points: Point[]
  colors: Color[]
  background?: Color
  smoothsColors?: boolean
}
```

#### Parameters

- **`width`**: Number of vertices per row.
- **`height`**: Number of vertices per column.
- **`points`**: The control points of the mesh (must match `width × height`).
- **`colors`**: The color assigned to each point (must also match `width × height`).
- **`background`** (optional): Color for the area outside the mesh. Defaults to `"clear"`.
- **`smoothsColors`** (optional): Whether color interpolation should be smooth (defaults to `true`).

> Note: Mesh gradients are supported on **iOS 18.0 and above**.

#### Example

```tsx
<Rectangle
  fill={gradient("mesh", {
    width: 2,
    height: 2,
    points: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ],
    colors: ["red", "yellow", "blue", "green"]
  })}
/>
```

This example defines a 2x2 mesh grid with color transitions across four control points in a rectangle.

### `gradient()` Utility Function

The `gradient()` helper function makes the code more readable and expressive. It supports all gradient types.

#### Signature

```ts
function gradient(gradient: Gradient): Gradient
function gradient(type: "linear", gradient: LinearGradient): LinearGradient
function gradient(type: "radial", gradient: RadialGradient): RadialGradient
function gradient(type: "angular", gradient: AngularGradient): AngularGradient
function gradient(type: "mesh", gradient: MeshGradient): MeshGradient
```

#### Description

- When used with one argument: `gradient(Gradient)` returns the input gradient as-is.
- When used with two arguments: the first argument specifies the type, and the second provides the gradient configuration.

#### Example

```tsx
<Text
  foregroundStyle={
    gradient("linear", {
      colors: ["red", "orange"],
      startPoint: "leading",
      endPoint: "trailing"
    })
  }
>
  Hello World!
</Text>
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
- Use **Gradients**, **LinearGradient**, **RadialGradient**, **AngularGradient** or **MeshGradient** for smooth transitions between multiple colors.
- Use **ColorWithGradientOrOpacity** to adjust color opacity or use a standard color-derived gradient.

By choosing the appropriate variant of `ShapeStyle`, you can easily style elements with the desired appearance in your UI—whether you need a simple color fill, a dynamic gradient, or a polished material effect.
