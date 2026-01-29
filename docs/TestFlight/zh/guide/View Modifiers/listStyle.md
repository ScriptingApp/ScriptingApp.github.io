---
title: 列表样式
description: listStyle 属性允许您在使用 List 视图时自定义列表的行为和外观。

---

通过该属性，你可以自定义 `List` 视图在 UI 中的行为和外观。

---

## 属性声明

```tsx
listStyle?: ListStyle;
```

### 描述

`listStyle` 属性定义了列表的视觉样式，允许你从多种预定义样式中选择合适的样式。

---

### 可接受的值

`listStyle` 属性接受以下字符串值：

- **`automatic`**：使用平台的默认列表行为和外观。
- **`bordered`**：以标准边框显示列表。
- **`carousel`**：将列表设置为类似于旋转木马的外观。
- **`elliptical`**：为列表提供椭圆形的样式。
- **`grouped`**：以分组格式显示列表。
- **`inset`**：为列表应用内嵌外观。
- **`insetGroup`**：结合内嵌和分组样式。
- **`plain`**：以简单样式显示列表，不添加额外的装饰。
- **`sidebar`**：将列表呈现为类似侧边栏的外观。

---

### 默认行为

如果未指定 `listStyle`，系统会根据平台选择默认样式。

---

## 使用示例

以下展示了如何在 TypeScript 代码中应用 `listStyle` 属性：

### 示例 1：简单列表样式 (Plain Style)

```tsx
<List
  listStyle="plain"
>
  <Text>项目 1</Text>
  <Text>项目 2</Text>
  <Text>项目 3</Text>
</List>
```

此示例创建了一个简单样式的列表。

---

### 示例 2：分组列表样式 (Grouped Style)

```tsx
<List
  listStyle="grouped"
>
  <Section header={
    <Text>水果</Text>
  }>
    <Text>苹果</Text>
    <Text>香蕉</Text>
  </Section>
  <Section header={
    <Text>蔬菜</Text>
  }>
    <Text>胡萝卜</Text>
    <Text>西兰花</Text>
  </Section>
</List>
```

此示例创建了一个分组样式的列表，每个分组有一个标题。

---

### 示例 3：侧边栏列表样式 (Sidebar Style)

```tsx
<List
  listStyle="sidebar"
>
  <Text>主页</Text>
  <Text>设置</Text>
  <Text>个人资料</Text>
</List>
```

此示例创建了一个类似于侧边栏的列表。

---

## 注意事项

- `listStyle` 属性直接映射到 SwiftUI 的 `listStyle` 修饰符。
- 确保传入的字符串值与上述预定义样式之一匹配，以避免运行时错误。

通过选择合适的 `listStyle`，你可以根据设计需求调整列表的外观，从而为用户提供更符合场景的视觉体验。