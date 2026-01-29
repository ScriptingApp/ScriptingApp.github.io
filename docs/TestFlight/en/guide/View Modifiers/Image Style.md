---
title: Image Style
description: These modifiers are specifically designed for views that render images.

---

These modifiers are specifically designed for views that render images (e.g., system symbols, local or remote images). They control layout behavior, scaling, and rendering characteristics of the image content.

---

## `scaleToFit`

### Definition

```ts
scaleToFit?: boolean
```

### Description

Scales the image **proportionally** to fit within its parent container. The image's **aspect ratio is preserved**, and the entire image will be visible. Any remaining space in the container is left empty.

Equivalent to:

```swift
.aspectRatio(contentMode: .fit)
```

### Behavior

* Resizes the image without cropping
* Preserves the original width-to-height ratio
* May introduce padding if aspect ratios do not match

### Example

```tsx
<Image
  filePath="path/to/local.jpg"
  scaleToFit={true}
/>
```

---

## `scaleToFill`

### Definition

```ts
scaleToFill?: boolean
```

### Description

Scales the image **proportionally** to completely fill its parent container. The image's **aspect ratio is preserved**, but the image may be **cropped** to fit.

Equivalent to:

```swift
.aspectRatio(contentMode: .fill)
```

### Behavior

* Image fills the entire container
* Maintains aspect ratio
* Portions of the image may be clipped

### Example

```tsx
<Image
  imageUrl="https://example.com/banner.jpg"
  scaleToFill={true}
/>
```

---

## `aspectRatio`

### Definition

```ts
aspectRatio?: {
  value?: number | null
  contentMode: "fit" | "fill"
}
```

### Description

Constrains the view’s dimensions to a specific **width-to-height ratio**, and determines how the image should be resized (`fit` or `fill`).

* `value`: A numeric aspect ratio (e.g. `16 / 9`) or `null` to preserve the original image’s ratio.
* `contentMode`: `"fit"` ensures the entire image fits within the view; `"fill"` ensures the view is fully filled, potentially cropping the image.

### Example: Set aspect ratio to 3:2 and fit

```tsx
<Image
  filePath="path/to/photo.jpg"
  aspectRatio={{
    value: 3 / 2,
    contentMode: "fit"
  }}
/>
```

### Example: Use original aspect ratio and fill the space

```tsx
<Image
  systemName="photo"
  aspectRatio={{
    value: null,
    contentMode: "fill"
  }}
/>
```

---

## `imageScale`

### Definition

```ts
imageScale?: "small" | "medium" | "large"
```

### Description

Sets the rendering size of **symbol-based images** (SF Symbols). This modifier does **not affect the layout size**, only the visual scale of the symbol image.

* `"small"`: Reduced symbol size
* `"medium"`: Default scale
* `"large"`: Enlarged symbol rendering

> Note: This modifier only applies to system symbol images created with `systemName`.

### Example

```tsx
<Image
  systemName="bolt.fill"
  imageScale="large"
/>
```

---

## Summary

| Modifier      | Purpose                                   | Affects Layout? | Cropping? | Symbol Only? |
| ------------- | ----------------------------------------- | --------------- | --------- | ------------ |
| `scaleToFit`  | Fit image proportionally within container | Yes             | No        | No           |
| `scaleToFill` | Fill container with proportional scaling  | Yes             | Yes       | No           |
| `aspectRatio` | Constrain view to a specific aspect ratio | Yes             | Optional  | No           |
| `imageScale`  | Adjust rendering size of symbol images    | No              | No        | **Yes**      |
