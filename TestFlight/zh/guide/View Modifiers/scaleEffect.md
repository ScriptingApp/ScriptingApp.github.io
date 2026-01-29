# 缩放效果

按指定倍数缩放视图的渲染结果。支持统一缩放值，或分别设置横向与纵向缩放，并可指定锚点。

## 类型

```ts
scaleEffect?: number | {
  x: number
  y: number
  anchor?: KeywordPoint | Point
}
```

## 示例

统一缩放：

```tsx
<Text scaleEffect={1.5}>放大内容</Text>
```

非等比缩放：

```tsx
<Text
  scaleEffect={{
    x: 1.2,
    y: 0.8,
    anchor: "center"
  }}
>
  非等比缩放
</Text>
```
