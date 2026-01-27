---
title: ZStack

---
        
`ZStack` 组件在 Scripting 应用中用于将子视图以层叠堆栈的形式排列。它支持通过预定义的对齐指南，在 x 和 y 轴上灵活地对齐这些图层。

---

## `ZStackProps`

`ZStack` 组件接受以下属性：

| 属性            | 类型                                                                 | 默认值         | 描述                                                                                                      |
|----------------|----------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------------|
| `alignment`    | `Alignment`（可选）                                                 | `"center"`    | 决定子视图在 x 轴和 y 轴上的对齐方式。                                                                      |
| `children`     | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | `undefined`   | 要在堆栈中显示的子组件。可以是单个节点或节点数组。                                                          |

---

## `Alignment`

`Alignment` 类型定义了一组常用的对齐方式，用于堆叠视图。这些对齐方式结合了水平和垂直方向的对齐指南。下图展示了这些对齐方式：

![Alignment](https://docs-assets.developer.apple.com/published/09693fd98ab76356519a900fd33d9e7f/Alignment-1-iOS@2x.png)

### 支持的值：

| 值                          | 描述                                                                                     |
|----------------------------|----------------------------------------------------------------------------------------|
| `"top"`                   | 将视图对齐到堆栈的顶部边缘。                                                              |
| `"center"`                | 在水平和垂直轴上将视图居中对齐。                                                           |
| `"bottom"`                | 将视图对齐到堆栈的底部边缘。                                                              |
| `"leading"`               | 将视图对齐到主边缘（在从左到右布局中为左侧）。                                             |
| `"trailing"`              | 将视图对齐到尾边缘（在从左到右布局中为右侧）。                                             |
| `"bottomLeading"`         | 将视图对齐到左下角。                                                                      |
| `"bottomTrailing"`        | 将视图对齐到右下角。                                                                      |
| `"centerFirstTextBaseline"` | 使用第一个文本基线在中心对齐视图。                                                         |
| `"centerLastTextBaseline"` | 使用最后一个文本基线在中心对齐视图。                                                         |
| `"leadingFirstTextBaseline"` | 使用第一个文本基线对齐到主边缘。                                                         |
| `"leadingLastTextBaseline"` | 使用最后一个文本基线对齐到主边缘。                                                         |
| `"topLeading"`            | 将视图对齐到左上角。                                                                      |
| `"topTrailing"`           | 将视图对齐到右上角。                                                                      |
| `"trailingFirstTextBaseline"` | 使用第一个文本基线对齐到尾边缘。                                                         |
| `"trailingLastTextBaseline"` | 使用最后一个文本基线对齐到尾边缘。                                                         |

---

## `ZStack` 组件

`ZStack` 是一个函数组件，用于将其子元素以层叠堆栈的形式排列。每个子元素的位置相对于 `alignment` 属性中定义的对齐方式。

### 导入组件

要使用 `ZStack` 组件，请确保从 Scripting 应用的 `scripting` 包中导入它：

```tsx
import { ZStack } from 'scripting'
```

---

## 示例用法

### 1. 基础示例
将子视图对齐到顶部：
```tsx
<ZStack alignment="top">
  <Image systemName="globe" />
  <Text>
    Hello world.
  </Text>
</ZStack>
```

### 2. 高级对齐
使用复杂的对齐方式（如 `bottomLeading`）定位子元素：
```tsx
<ZStack alignment="bottomLeading">
  <Rectangle fill="gray" />
  <Text>
    Bottom Leading Text
  </Text>
</ZStack>
```

### 3. 嵌套 `ZStack` 示例
将 `ZStack` 与其他布局组件结合以实现复杂布局：
```tsx
<ZStack alignment="center">
  <Rectangle fill="blue" />
  <ZStack alignment="topTrailing">
    <Image systemName="star" />
    <Text>
      Nested ZStack
    </Text>
  </ZStack>
</ZStack>
```

---

## 注意事项

- **性能考虑**：避免向 `ZStack` 添加过多的子视图，以免在复杂布局中导致潜在的性能瓶颈。
- **组合布局**：将 `ZStack` 与其他组件（如 `VStack` 和 `HStack`）结合使用，以创建灵活动态的用户界面。