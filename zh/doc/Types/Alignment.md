# 对齐

通过 `Alignment`，你可以指定内容在视图框架（frame）中的位置，与 SwiftUI 内置对齐方式的行为相对应。当组件有额外空间或需要在布局中按特定方式对齐时，可使用 `Alignment` 来控制元素在容器中的位置。

***

## 概述

当你使用像 `VStack`、`HStack`、`ZStack` 等需要堆叠、分层或定位多个视图的容器时，`Alignment` 非常有用。\
选择一个对齐方式就意味着告诉布局系统如何将这些视图相互对齐或在其容器中对齐。

举例来说，如果一个 `ZStack` 的对齐方式为 `topLeading`，它会把内容放置在容器的左上方；若对齐方式为 `bottomTrailing`，则会把内容放置在容器的右下方。

***

## 可用的对齐方式

- **基础对齐 (Basic Alignments)**:
  - **`top`**：沿视图顶部对齐。
  - **`center`**：在水平和垂直方向上同时居中。
  - **`bottom`**：沿视图底部对齐。
  - **`leading`**：沿主阅读方向的起始边对齐（在从左到右语言环境下为左侧）。
  - **`trailing`**：沿主阅读方向的末尾边对齐（在从左到右语言环境下为右侧）。

- **复合对齐 (Compound Alignments)**:
  - **`topLeading`**：同时沿顶部和起始边对齐。
  - **`topTrailing`**：同时沿顶部和末尾边对齐。
  - **`bottomLeading`**：同时沿底部和起始边对齐。
  - **`bottomTrailing`**：同时沿底部和末尾边对齐。

- **文本基线对齐 (Text Baseline Alignments)**:
  当视图包含文本时，可以用基线对齐保证文本在同一基线上对齐。以下值可用于使文本在特定基线上对齐：
  - **`centerFirstTextBaseline`**
  - **`centerLastTextBaseline`**
  - **`leadingFirstTextBaseline`**
  - **`leadingLastTextBaseline`**
  - **`trailingFirstTextBaseline`**
  - **`trailingLastTextBaseline`**

***

## 使用示例

### **居中对齐 (Center Alignment)**

```tsx
<ZStack alignment="center">
  <Rectangle fill="gray" frame={{width: 100, height: 100}} />
  <Text font="title">Centered Text</Text>
</ZStack>
```

在此示例中，`Text` 会在 `Rectangle` 中居中显示。

***

### **顶部靠左对齐 (Top Leading Alignment)**

```tsx
<ZStack alignment="topLeading">
  <Rectangle fill="gray" frame={{width: 200, height: 200}} />
  <Text>I'm at the top-left!</Text>
</ZStack>
```

在这里，`Text` 会出现在灰色矩形的左上角。

***

### **基线对齐 (Baseline Alignment)**

```tsx
<HStack alignment="leadingFirstTextBaseline">
  <Text font="largeTitle">Big Title</Text>
  <Text font="title">Smaller Subtitle</Text>
</HStack>
```

此示例中，两个文本的首行基线对齐，即使它们的字号不同，也能让第一行文字在视觉上保持整齐。

***

## 小结

`Alignment` 让你能够细粒度地控制内容在容器内部的定位方式。无论是使用基础的边缘对齐，还是更为高级的文本基线对齐，都能确保你的 UI 元素在视觉上呈现一致且直观的效果。
