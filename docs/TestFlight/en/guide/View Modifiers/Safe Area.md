---
title: Safe Area
description: These properties allow you to adjust layout behavior relative to the system-defined safe areas.

---

Safe area modifiers in **Scripting** allow you to **adjust layout behavior relative to the system-defined safe areas**, such as the areas around notches, toolbars, or the on-screen keyboard.

---

## `safeAreaPadding`

Adds custom padding inside the safe area of a view. This modifier adjusts the visible content region by extending or inseting from the edges defined by the system’s safe area (e.g., accounting for the notch, home indicator, or rounded corners).

### Type

```ts
safeAreaPadding?: 
  true | 
  number | 
  {
    horizontal?: number | true
    vertical?: number | true
    leading?: number | true
    trailing?: number | true
    top?: number | true
    bottom?: number | true
  }
```

---

### Description

This modifier gives fine-grained control over how much padding should be added inside the safe area for specific edges or directions. You can either apply:

* **A default system padding** by passing `true`
* **A uniform padding** value by passing a `number`
* **Directional padding** for each edge using a detailed configuration object

This modifier is particularly useful when you want the view to respect or override the system safe area while maintaining proper layout spacing.

---

### Usage Options

* `true`: Applies default system padding on all safe area edges
* `number`: Applies the specified number of points as uniform padding on all edges
* `object`: Specifies padding per edge or direction

---

### Object Properties

* `horizontal`: Padding for both `leading` and `trailing` edges
* `vertical`: Padding for both `top` and `bottom` edges
* `leading`, `trailing`, `top`, `bottom`: Individual edge-specific padding
* Values can be a `number` or `true` to apply system default padding for that edge

---

### Example: Default Padding

```tsx
<VStack safeAreaPadding={true}>
  <Text>Hello</Text>
</VStack>
```

Applies system default padding on all safe area edges.

---

### Example: Custom Padding

```tsx
<VStack
  safeAreaPadding={{
    top: 20,
    bottom: true,
    horizontal: 12
  }}
>
  <Text>Content</Text>
</VStack>
```

Adds 20 points of padding at the top, system default padding at the bottom, and 12 points on both horizontal edges.

---

## `safeAreaInset`

Inserts a custom view into the safe area edge of another view.

### Type

```ts
safeAreaInset?: {
  top?: {
    alignment?: HorizontalAlignment
    spacing?: number
    content: VirtualNode
  },
  bottom?: {
    alignment?: HorizontalAlignment
    spacing?: number
    content: VirtualNode
  },
  leading?: {
    alignment?: VerticalAlignment
    spacing?: number
    content: VirtualNode
  },
  trailing?: {
    alignment?: VerticalAlignment
    spacing?: number
    content: VirtualNode
  }
}
```

---

### Description

* Adds content (such as toolbars, controls, or info bars) to the specified safe area edge: `top`, `bottom`, `leading`, or `trailing`.
* You can control **alignment** (horizontal or vertical) and **spacing** between the original view and the inserted content.
* Typically used in scrollable or full-screen layouts where you want to place persistent UI elements without obstructing core content.

---

### Example

```tsx
<ScrollView
  safeAreaInset={{
    bottom: {
      alignment: "center",
      spacing: 8,
      content: <Text>Toolbar here</Text>
    }
  }}
>
  <VStack>
    <Text>Scrollable content</Text>
  </VStack>
</ScrollView>
```

---

### Alignment Options

* **Horizontal** (for `top` and `bottom`): `"leading"`, `"center"`, `"trailing"`
* **Vertical** (for `leading` and `trailing`): `"top"`, `"center"`, `"bottom"`

### Notes

* `spacing` is optional. If omitted, a default system spacing will be applied.
* The `spacing` typo in the `leading`/`trailing` definition should be interpreted as `spacing`.

---

## `ignoresSafeArea`

Expands a view’s content to extend into one or more safe area regions.

### Type

```ts
ignoresSafeArea?: boolean | {
  regions?: SafeAreaRegions
  edges?: EdgeSet
}
```

---

### Description

* Allows a view to "ignore" the system-defined safe areas and occupy the full screen or extend under system UI.
* Useful for immersive layouts like full-screen images, maps, or background layers.

### Boolean Usage

```tsx
<Image
  imageUrl="https://example.com/background.jpg"
  ignoresSafeArea
/>
```

> This will ignore all safe area regions on all edges.

### Object Usage

```tsx
<VStack
  ignoresSafeArea={{
    regions: "all",
    edges: "bottom"
  }}
>
  <Text>Bottom edge extends under home indicator</Text>
</VStack>
```

### `regions` (optional)

| Value         | Description                                    |
| ------------- | ---------------------------------------------- |
| `"all"`       | Ignores all regions (default)                  |
| `"container"` | Ignores container padding (e.g., nav/tab bars) |
| `"keyboard"`  | Ignores the software keyboard area             |

### `edges` (optional)

| Value          | Description                            |
| -------------- | -------------------------------------- |
| `"top"`        | Ignores the top safe area              |
| `"bottom"`     | Ignores the bottom safe area           |
| `"leading"`    | Ignores the leading (left) safe area   |
| `"trailing"`   | Ignores the trailing (right) safe area |
| `"vertical"`   | Ignores top + bottom                   |
| `"horizontal"` | Ignores leading + trailing             |
| `"all"`        | Ignores all edges (default if omitted) |
