---
title: 旋转效果

---

将视图绕指定锚点旋转指定角度。默认锚点为 `center`。

## 类型

```ts
rotationEffect?: number | {
  degrees: number
  anchor: KeywordPoint | Point
}
```

## 示例

默认锚点：

```tsx
<Text rotationEffect={45}>旋转内容</Text>
```

自定义锚点：

```tsx
<Text
  rotationEffect={{
    degrees: 30,
    anchor: "bottomTrailing"
  }}
>
  自定义锚点旋转
</Text>
```
