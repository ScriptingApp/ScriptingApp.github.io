# overlay

`overlay` 修饰符用于在当前视图的上方叠加一个额外视图，形成层叠的视觉效果。这在添加装饰元素（如徽章）、加载指示器、半透明遮罩或交互按钮等场景中非常有用。

***

## 类型定义

```ts
overlay?: VirtualNode | {
  alignment: Alignment
  content: VirtualNode
}
```

***

## 参数说明

### 1. 简洁形式：直接传入 `VirtualNode`

直接将一个视图叠加在当前视图之上，默认对齐方式为 **居中（center）**。

```tsx
<Image
  imageUrl="https://example.com/avatar.png"
  overlay={<Circle fill="black" opacity={0.2} />}
/>
```

该例会在头像图上方添加一个半透明黑色圆形遮罩。

***

### 2. 对象形式：带对齐方式的 Overlay

提供 `content` 和 `alignment`，用于指定叠加视图的内容与对齐方式。

#### 对象结构：

```ts
{
  alignment: Alignment
  content: VirtualNode
}
```

#### `Alignment` 可选值包括：

- `"top"` | `"bottom"` | `"leading"` | `"trailing"`
- `"topLeading"` | `"topTrailing"` | `"bottomLeading"` | `"bottomTrailing"`
- `"center"`

#### 示例：右上角徽章叠加

```tsx
<Image
  imageUrl="https://example.com/avatar.png"
  overlay={{
    alignment: "topTrailing",
    content: <Circle
      fill="red"
      frame={{
        width: 10,
        height: 10
      }}
    />
  }}
/>
```

该例会在图像右上角叠加一个红色圆形小徽章。

***

## 行为说明

- `overlay` 的内容会绘制在目标视图之上。
- 叠加内容不会改变原始视图的尺寸与布局。
- 若未设置 `clip`，叠加内容可能超出边界。

***

## 常见用途

- 添加通知角标或状态徽章
- 显示加载指示器或遮罩层
- 高亮视图特定区域
- 显示动画图标或文字提示

***

## 示例：居中文字叠加

```tsx
<Rectangle
  fill="blue"
  frame={{
    width: 100,
    height: 100
  }}
  overlay={{
    alignment: "center",
    content: <Text foregroundColor="white">你好</Text>
  }}
/>
```

该示例会在一个蓝色矩形中央叠加白色文字“你好”。

***

## 总结

| 参数            | 说明               |
| ------------- | ---------------- |
| `VirtualNode` | 要叠加的视图内容（默认居中）   |
| `alignment`   | 可选。叠加视图在目标视图中的位置 |
| `content`     | 要显示的叠加内容视图       |

`overlay` 是构建多层 UI、实现状态标记、视觉效果叠加等的核心修饰符之一，可灵活组合使用，适配各种视觉需求。
