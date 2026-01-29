---
title: mask
description: This view modifier clips the visual rendering of a view using the **alpha channel** of another view.

---

The `mask` modifier clips the visual rendering of a view using the **alpha channel** of another view. Only the parts of the original view that align with the opaque (non-transparent) portions of the mask remain visible; the rest is hidden.

This is commonly used to apply custom shapes, spotlight effects, or partial reveals.

---

## Type

```ts
mask?: VirtualNode | {
  alignment: Alignment
  content: VirtualNode
}
```

---

## Usage

## 1. Simple Form

Apply a mask view directly. The mask is centered on the base view by default.

```tsx
<Image
  filePath="path/to/photo.png"
  frame={{ width: 100, height: 100 }}
  mask={<Circle />}
 />
```

In this example, the image is clipped to a circular shape using a `Circle` as the mask. Only the circular portion of the image is visible.

---

## 2. Object Form (with Alignment)

Use this form when you want to position the mask relative to the base view.

### Structure:

```ts
{
  alignment: Alignment
  content: VirtualNode
}
```

### `Alignment` values:

* `"top"` | `"bottom"` | `"leading"` | `"trailing"`
* `"topLeading"` | `"topTrailing"` | `"bottomLeading"` | `"bottomTrailing"`
* `"center"`

### Example – apply a top-aligned rectangular mask:

```tsx
<Rectangle
  fill="blue"
  frame={{ width: 100, height: 100 }}
  mask={{
    alignment: "top",
    content: <Rectangle frame={{ width: 100, height: 50 }} />
  }}
/>
```

Only the top half of the blue rectangle will be visible, defined by the opaque rectangle used as the mask.

---

## Behavior

* The **mask view’s opacity** determines the visibility of the base view.

  * Opaque areas (alpha = 1) show the base view.
  * Transparent areas (alpha = 0) hide it.
* The mask does **not affect layout**, only how the content is rendered.
* Use `frame={{ width, height }}` on both base and mask views to ensure proper alignment and coverage.

---

## Common Use Cases

* Cropping images into non-rectangular shapes (e.g., circle, capsule)
* Creating spotlight or reveal effects
* Masking decorative or semantic content

---

## Summary

| Field                | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `mask` (VirtualNode) | A view that defines the clipping mask; centered by default |
| `alignment`          | Optional. Aligns the mask view relative to the base view   |
| `content`            | The actual masking content used to clip rendering          |

