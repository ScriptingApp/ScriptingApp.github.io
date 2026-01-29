---
title: 设置位置
description: 将视图的中心点定位到父视图坐标空间中的指定位置。

---

将视图的**中心点**定位到父视图坐标空间中的指定位置。

## 类型

```ts
position?: {
  x: number
  y: number
}
```

## 示例

```tsx
<Text
  position={{ 
    x: 100,
    y: 200 
  }}
>Positioned Text</Text>
```