---
title: 水平布局（HStack）
description: 一个在水平方向排列子视图的视图。

---
        
在Scripting应用中，`HStack` 组件提供了一种方便的方法，用于以灵活的对齐和间距选项水平排列视图。此组件是创建需要子视图并排布局的关键工具。

---

## `HStackProps`

### 属性

1. **`alignment`** (可选)
   - **类型**: `VerticalAlignment`
   - **描述**: 指定堆栈中子视图的垂直对齐方式。每个子视图都会根据相同的垂直屏幕坐标对齐。
   - **默认值**: `"center"`
   - **可选值**:
     - `"top"`: 将子视图对齐到顶部边缘。
     - `"center"`: 将子视图对齐到垂直中心。
     - `"bottom"`: 将子视图对齐到底部边缘。
     - `"firstTextBaseline"`: 根据文本的第一个基线对齐子视图。
     - `"lastTextBaseline"`: 根据文本的最后一个基线对齐子视图。
   - **示例**:
     ```tsx
     <HStack alignment="top">
       <Text>Item 1</Text>
       <Text>Item 2</Text>
     </HStack>
     ```

2. **`spacing`** (可选)
   - **类型**: `number`
   - **描述**: 指定相邻子视图之间的间距。如果未提供，堆栈将自动使用默认间距。
   - **默认值**: `undefined`（使用默认间距）
   - **示例**:
     ```tsx
     <HStack spacing={15}>
       <Text>Item 1</Text>
       <Text>Item 2</Text>
     </HStack>
     ```

3. **`children`** (可选)
   - **类型**: 
     ```ts
     (VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode | undefined
     ```
   - **描述**: 指定要排列在堆栈中的子视图。可以接受单个子视图、多个子视图或嵌套数组的子视图。
   - **示例**:
     ```tsx
     <HStack>
       <Text>Item 1</Text>
       <Text>Item 2</Text>
       <Text>Item 3</Text>
     </HStack>
     ```

---

## `VerticalAlignment`

`VerticalAlignment` 是一个枚举类型，用于指定子视图在 `HStack` 中的垂直对齐方式。

### 可选值：
- **`"top"`**: 将子视图对齐到顶部边缘。
- **`"center"`**: 将子视图对齐到垂直中心轴。
- **`"bottom"`**: 将子视图对齐到底部边缘。
- **`"firstTextBaseline"`**: 根据文本内容的第一个基线对齐子视图。
- **`"lastTextBaseline"`**: 根据文本内容的最后一个基线对齐子视图。

---

## **`HStack` 组件**

### 描述

`HStack` 组件是一个布局容器，用于将其子视图排列成一条水平线。它提供了垂直对齐选项以及指定子视图之间间距的功能。

### 语法
```tsx
<HStack alignment="center" spacing={10}>
  {children}
</HStack>
```

### 示例 1：基础水平堆栈
```tsx
function Example1() {
  return (
    <HStack>
      <Text>Item 1</Text>
      <Text>Item 2</Text>
      <Text>Item 3</Text>
    </HStack>
  )
}
```

### 示例 2：自定义间距和对齐方式
```tsx
function Example2() {
  return (
    <HStack alignment="bottom" spacing={20}>
      <Text>Aligned Bottom</Text>
      <Text>With Spacing</Text>
    </HStack>
  )
}
```

### 示例 3：复杂的子视图
```tsx
function Example3() {
  return (
    <HStack spacing={10}>
      {[1, 2, 3].map((item) => (
        <Text key={item.toString()}>Item {item}</Text>
      ))}
    </HStack>
  )
}
```

### 注意事项:
- 确保传递给 `HStack` 的所有子组件都是有效的 `VirtualNode` 元素。
- 对于更复杂的布局，可以将 `HStack` 与其他组件如 `VStack` 或 `Spacer` 结合使用。

### 参见：
- `VStack` 用于垂直堆叠视图。
- `Spacer` 用于在堆栈中创建灵活的间距。
- `Text` 用于渲染文本内容。

---

### 图示
以下图示显示了在 `HStack` 中垂直对齐的效果：

![垂直对齐](https://docs-assets.developer.apple.com/published/a63aa800a94319cd283176a8b21bb7af/VerticalAlignment-1-iOS@2x.png)