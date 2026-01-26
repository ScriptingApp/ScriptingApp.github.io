# 阴影

为视图添加阴影效果。可设置颜色、模糊半径以及偏移量。

## 类型

```ts
shadow?: {
  color: Color
  radius: number
  x?: number
  y?: number
}
```

## 示例

```tsx
<Text
  shadow={{
    color: "black",
    radius: 5,
    x: 2,
    y: 4
  }}
>
  有阴影的文字
</Text>
```
