---
title: Symbol Style
description: These modifiers allow you to customize how SF Symbols are displayed and animated inside views.

---

These modifiers allow you to customize how **SF Symbols** are displayed and animated inside views, particularly with the `Image` component.

---

## `symbolRenderingMode`

Sets the **rendering mode** for symbol images within the view.

### Type

```ts
symbolRenderingMode?: SymbolRenderingMode
```

### Options (`SymbolRenderingMode`)

* `"monochrome"` – A single-color version using the foreground style
* `"hierarchical"` – Multiple layers with different opacities for depth (good for semantic coloring)
* `"multicolor"` – Uses the symbol's built-in colors
* `"palette"` – Allows layered tinting (like using multiple `foregroundStyle` layers)

### Example

```tsx
<Image
  systemName="star.fill"
  symbolRenderingMode="palette"
  foregroundStyle={{
    primary: "red",
    secondary: "orange",
    tertiary: "yellow"
  }}
/>
```

### Explanation:

* `symbolRenderingMode="palette"` tells the system to render the symbol in **multiple layered styles**.
* `foregroundStyle` now uses an object with `primary`, `secondary`, and optionally `tertiary` layers to color those symbol layers individually.

> This matches SwiftUI's behavior with `.symbolRenderingMode(.palette)` and `.foregroundStyle(primary, secondary, tertiary)`.

---

## `symbolVariant`

Displays the symbol with a particular **visual variant**.

### Type

```ts
symbolVariant?: SymbolVariants
```

### Options (`SymbolVariants`)

* `"none"` – Default symbol with no variant
* `"circle"` – Encapsulated in a circle
* `"square"` – Encapsulated in a square
* `"rectangle"` – Encapsulated in a rectangle
* `"fill"` – Filled symbol
* `"slash"` – Adds a slash over the symbol (often used to indicate "off" states)

### Example

```tsx
<Image
  systemName="wifi"
  symbolVariant="slash"
/>
```

---

## `symbolEffect`

Applies a **symbol animation effect** to the view. This can include transitions (appear/disappear), scale, bounce, rotation, breathing, pulsing, and wiggle effects. You can also bind the effect to a value so it animates when the value changes.

### Type

```ts
symbolEffect?: SymbolEffect
```

There are two forms of usage:

---

### 1. **Simple effects** (transition, scale, etc.)

You can directly assign a symbol effect name:

#### Examples

```tsx
<Image
  systemName="heart"
  symbolEffect="appear"
/>

<Image
  systemName="checkmark"
  symbolEffect="scaleByLayer"
/>
```

---

### 2. **Value-bound discrete effects**

These effects animate when the associated value changes.

#### Type

```ts
symbolEffect?: {
  effect: DiscreteSymbolEffect
  value: string | number | boolean
}
```

#### Example

```tsx
<Image
  systemName="star.fill"
  symbolEffect={{
    effect: "bounce",
    value: isFavorited
  }}
/>
```

In this example, each time `isFavorited` changes, the bounce animation is triggered.

---

## Available Discrete Effects (`DiscreteSymbolEffect`)

These effects can be bound to values:

| Category          | Effects                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bounce**        | `bounce`, `bounceByLayer`, `bounceDown`, `bounceUp`, `bounceWholeSymbol`                                                                                                              |
| **Breathe**       | `breathe`, `breatheByLayer`, `breathePlain`, `breathePulse`, `breatheWholeSymbol`                                                                                                     |
| **Pulse**         | `pulse`, `pulseByLayer`, `pulseWholeSymbol`                                                                                                                                           |
| **Rotate**        | `rotate`, `rotateByLayer`, `rotateClockwise`, `rotateCounterClockwise`, `rotateWholeSymbol`                                                                                           |
| **VariableColor** | `variableColor`, `variableColorCumulative`, `variableColorDimInactiveLayers`, `variableColorHideInactiveLayers`, `variableColorIterative`                                             |
| **Wiggle**        | `wiggle`, `wiggleByLayer`, `wiggleWholeSymbol`, `wiggleLeft`, `wiggleRight`, `wiggleUp`, `wiggleDown`, `wiggleForward`, `wiggleBackward`, `wiggleClockwise`, `wiggleCounterClockwise` |

---

## Full Example

```tsx
<Image
  systemName="bell.fill"
  symbolRenderingMode="hierarchical"
  symbolVariant="circle"
  symbolEffect={{
    effect: "breathePulse",
    value: isNotified
  }}
  foregroundStyle="indigo"
/>
```

This image uses:

* a hierarchical rendering mode
* a circular variant around the symbol
* a pulsing animation bound to `isNotified` state

---

## Summary

| Modifier              | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| `symbolRenderingMode` | Sets how SF Symbols are rendered (monochrome, multicolor, etc.)         |
| `symbolVariant`       | Applies a visual variant like `fill`, `circle`, or `slash`              |
| `symbolEffect`        | Adds visual animation effects; can be static or bound to a state change |
