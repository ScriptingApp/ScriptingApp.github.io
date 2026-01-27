---
title: blur

---

Applies a Gaussian blur effect to the view.

## Type

```ts
blur?: number | {
  radius: number
  opaque: boolean
}
```

## Example

Simple blur:

```tsx
<Image blur={10} />
```

Custom blur:

```tsx
<Image
  blur={{
    radius: 12,
    opaque: false
  }}
/>
```