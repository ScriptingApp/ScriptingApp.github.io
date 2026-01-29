---
title: 设置偏移
description: 将视图从其默认位置沿 x 和 y 方向偏移指定的距离。

---

将视图从其默认位置沿 x 和 y 方向偏移指定的距离。

## 类型

```ts
offset?: {
  x: number
  y: number
}
```

## 示例

```tsx
<Text 
  offset={{
    x: 10,
    y: -20
  }}
>偏移内容</Text>
```
