---
title: overlay
description: This view modifier places a view on top of the modified view, creating a layered composition.

---

The `overlay` modifier places a view on top of the modified view, creating a layered composition. This is useful for adding decorations, badges, shadows, visual indicators, or interactive elements such as buttons or loading spinners.

---

## Type

```ts
overlay?: VirtualNode | {
  alignment: Alignment
  content: VirtualNode
}
```

---

## Parameters

### 1. `VirtualNode` (Simple Form)

Directly specifies the overlay view to be layered on top of the current view. The overlay is aligned to the center by default.

```tsx
<Image
  imageUrl="https://example.com/avatar.png"
  overlay={<Circle fill="black" opacity={0.2} />}
/>
```

### 2. Object Form with Alignment

Provides both the overlay content and a custom alignment for positioning.

#### Structure

```ts
{
  alignment: Alignment
  content: VirtualNode
}
```

#### `Alignment` options:

* `"top"` | `"bottom"` | `"leading"` | `"trailing"`
* `"topLeading"` | `"topTrailing"`
* `"bottomLeading"` | `"bottomTrailing"`
* `"center"`

#### Example – badge overlay in top trailing corner:

```tsx
<Image
  imageUrl="https://example.com/avatar.png"
  overlay={{
    alignment: "topTrailing",
    content: <Circle 
      fill="red"
      frame={{
        width: 10,
        height: 10
      }}
   />
  }}
/>
```

---

## Behavior

* The overlay is drawn **in front** of the base view.
* The overlay respects the bounds of the base view unless clipped.
* Layout and size of the base view are unaffected by the overlay.

---

## Common Use Cases

* Adding notification badges
* Overlaying loading indicators
* Adding visual highlights or status icons
* Layering semi-transparent effects

---

## Example – Overlay with Text

```tsx
<Rectangle
  fill="blue"
  frame={{
    width: 100,
    height: 100
  }}
  overlay={{
    alignment: "center",
    content: <Text foregroundColor="white">Hello</Text>
  }}
/>
```

This renders a white "Hello" text centered on top of a blue rectangle.

---

## Summary

| Parameter     | Description                                             |
| ------------- | ------------------------------------------------------- |
| `VirtualNode` | A view to layer on top (centered by default)            |
| `alignment`   | (Optional) Position of the overlay within the base view |
| `content`     | The overlay content to display                          |
