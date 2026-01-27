---
title: shadow

---

Applies a shadow behind the view. You can control color, blur radius, and x/y offset.

## Type

```ts
shadow?: {
  color: Color
  radius: number
  x?: number
  y?: number
}
```

## Example

```tsx
<Text
  shadow={{
    color: "black",
    radius: 5,
    x: 2,
    y: 4
  }}
>
  Shadowed Text
</Text>
```
