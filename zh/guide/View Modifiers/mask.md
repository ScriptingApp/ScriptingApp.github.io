# 遮罩

`mask` 修饰符使用另一个视图的 **透明度（alpha 通道）** 作为遮罩，将目标视图按形状进行裁剪。遮罩中不透明的区域会显示目标视图，透明区域则被隐藏。

该修饰符常用于图像裁剪、聚光灯效果、遮挡与图形渐显等视觉表现中。

***

## 类型定义

```ts
mask?: VirtualNode | {
  alignment: Alignment
  content: VirtualNode
}
```

***

## 使用方式

## 1. 简洁形式（默认居中遮罩）

直接传入一个视图作为遮罩，系统默认使用居中对齐。

```tsx
<Image
  filePath="path/to/photo.png"
  frame={{ width: 100, height: 100 }}
  mask={<Circle />}
/>
```

上例中，图像将被裁剪成一个圆形，仅圆形区域可见，其他部分被遮罩隐藏。

***

## 2. 对象形式（带对齐方式）

如果需要控制遮罩的位置，可使用对象形式指定对齐方式。

### 对象结构：

```ts
{
  alignment: Alignment
  content: VirtualNode
}
```

### 可选对齐方式（`Alignment`）：

- `"top"` | `"bottom"` | `"leading"` | `"trailing"`
- `"topLeading"` | `"topTrailing"` | `"bottomLeading"` | `"bottomTrailing"`
- `"center"`

### 示例：顶部对齐的矩形遮罩

```tsx
<Rectangle
  fill="blue"
  frame={{ width: 100, height: 100 }}
  mask={{
    alignment: "top",
    content: <Rectangle frame={{ width: 100, height: 50 }} />
  }}
/>
```

上述示例中，蓝色矩形的顶部一半区域可见，底部部分被遮罩隐藏。

***

## 行为说明

- 遮罩视图的 **透明度** 决定了显示区域：

  - 完全不透明（alpha = 1）区域将显示原始内容；
  - 完全透明（alpha = 0）区域将被遮挡。
- 遮罩不会影响布局，仅影响视图渲染效果；
- 为了确保遮罩尺寸与对齐正确，建议对遮罩和目标视图都设置 `frame={{ width, height }}`。

***

## 常见用途

- 图像裁剪（如圆形头像）
- 创建局部显示或聚焦效果
- 与动画结合实现遮罩揭示
- 仅显示特定形状区域内容

***

## 总结

| 字段                  | 说明                |
| ------------------- | ----------------- |
| `mask`（VirtualNode） | 遮罩视图，默认居中叠加在当前视图上 |
| `alignment`         | 可选，控制遮罩相对于当前视图的位置 |
| `content`           | 遮罩内容视图，用于控制可见区域   |
