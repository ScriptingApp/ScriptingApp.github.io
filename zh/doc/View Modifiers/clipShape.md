# 裁剪形状

将视图裁剪为指定形状，并保持内容比例。

### 类型

```ts
clipShape?: Shape
```

### 示例

```tsx
<Image 
  filePath="path/to/photo.jpg"
  clipShape="Circle"
/>

<Image 
  filePath="path/to/photo.jpg"
  clipShape={
    type: "rect",
    cornerRadius: 12
  }
/>
```
