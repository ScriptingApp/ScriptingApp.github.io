---
title: rotationEffect
description: Rotates the view by a specified angle in degrees.

---

Rotates the view by a specified angle in degrees. You can optionally set the anchor point around which the rotation occurs.

## Type

```ts
rotationEffect?: number | {
  degrees: number
  anchor: KeywordPoint | Point
}
```

## Example

```tsx
<Text rotationEffect={45}>Rotated</Text>
```

With anchor point:

```tsx
<Text
  rotationEffect={{
    degrees: 30,
    anchor: "bottomTrailing"
  }}
>
  Custom Anchor
</Text>
```
