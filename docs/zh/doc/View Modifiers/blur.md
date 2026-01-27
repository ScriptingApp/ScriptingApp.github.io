---
title: 模糊

---

对视图应用高斯模糊效果。

## 类型

```ts
blur?: number | {
  radius: number
  opaque: boolean
}
```

## 示例

简单模糊：

```tsx
<Image blur={10} />
```

自定义模糊：

```tsx
<Image
  blur={{
    radius: 12,
    opaque: false
  }}
/>
```