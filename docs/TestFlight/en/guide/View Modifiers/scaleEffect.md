---
title: scaleEffect
description: Scales the view horizontally and vertically.

---

Scales the view horizontally and vertically. You can specify a common value or separate values, and optionally provide an anchor point.

## Type

```ts
scaleEffect?: number | {
  x: number
  y: number
  anchor?: KeywordPoint | Point
}
```

## Example

```tsx
<Text scaleEffect={1.5}>Scaled</Text>
```

Custom scale:

```tsx
<Text
  scaleEffect={{
    x: 1.2,
    y: 0.8,
    anchor: "center"
  }}
>
  Non-uniform Scale
</Text>
```