---
title: 裁剪形状
description: 将视图裁剪为其矩形边界

---

将视图裁剪为其矩形边界。若为 `true`，启用裁剪；否则忽略该修饰符。可用于避免内容超出布局。

## 类型

```ts
clipped?: boolean
```

## 示例

```tsx
<Text
  fixedSize
  frame={{
    width: 175,
    height: 100
  }}
  clipped={true}
  border={{
    style: "gray"
  }}
>This long text string is clipped</Text>
```
