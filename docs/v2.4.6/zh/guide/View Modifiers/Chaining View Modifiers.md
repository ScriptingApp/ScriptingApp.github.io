---
title: 可链式调用的修饰符
description: 该修饰符可用于连续调用多个修饰符，支持同一个修饰符在同一个视图中多次使用。

---

`modifiers` 是一个支持链式调用的视图修饰器集合，允许你为同一个视图应用多个修饰器，并以严格的顺序依次执行。

与传统 TSX 中每个视图只能通过一个 `modifier` 属性传入单个修饰器不同，`modifiers` 支持：

* 同一种修饰器的重复使用（例如多个 `padding()`、`background()`）
* 明确控制修饰器的应用顺序
* 更贴近 SwiftUI 的声明方式和效果

---

## 类型定义

```ts
declare function modifiers(): ViewModifiers;

declare class ViewModifiers {
  padding(value): this;
  background(value): this;
  opacity(value): this;
  frame(value): this;
  font(value): this;
  // ... 还有更多方法（同 `CommonViewProps` 的属性）
}
```

`ViewModifiers` 是一个可链式调用的类，内部方法对应 SwiftUI 中的各类 View Modifier。每个方法返回自身（`this`），以支持流式调用。

---

## 使用优势

* **支持多次使用相同修饰器**
  如：连续嵌套多个 `.padding()` 或 `.background()`，可表达更加丰富的 UI 层级。

* **明确的顺序控制**
  修饰器按调用顺序依次生效，结果与 SwiftUI 一致。

* **更好的结构化与复用**
  可将复杂的修饰器链提取为变量或函数，增强可维护性与复用性。

* **更贴近 SwiftUI**
  如果你熟悉 SwiftUI，会发现 `modifiers()` 的调用方式几乎一模一样。

---

## 使用示例

### 示例 1：多层背景与内边距嵌套

```tsx
<VStack
  modifiers={
    modifiers()
      .padding()
      .background("red")
      .padding()
      .background("blue")
  }
>
  <Text>Hello</Text>
</VStack>
```

等价于 SwiftUI：

```swift
Text("Hello")
  .padding()
  .background(Color.red)
  .padding()
  .background(Color.blue)
```

### 示例 2：提取并复用修饰器链

```ts
const cardStyle = modifiers()
  .padding(12)
  .background("gray")
  .cornerRadius(8)
  .opacity(0.9)

<List modifiers={cardStyle}>
  <Text>Item 1</Text>
</List>
```

### 示例 3：根据条件动态生成修饰器

```ts
const base = modifiers().padding()

if (isDarkMode) {
  base.background("black")
} else {
  base.background("white")
}

return <HStack modifiers={base}>...</HStack>
```

---

## 使用建议

在以下情况中建议使用 `modifiers`：

* 需要对视图多次使用同一个修饰器（如 `padding()`）
* 希望拆分 UI 样式并复用一套完整的样式链
* 需要控制修饰器的执行顺序
* 需要在运行时根据条件动态组装修饰器

---

## 支持的修饰器方法

`ViewModifiers` 提供了超过 200 个修饰器方法，覆盖：

* **布局类**：`padding`、`frame`、`offset`、`position`、`zIndex` 等
* **样式类**：`background`、`foregroundStyle`、`opacity`、`shadow`、`clipShape` 等
* **文本字体类**：`font`、`bold`、`italic`、`kerning`、`underline` 等
* **交互事件类**：`onTapGesture`、`onAppear`、`contextMenu` 等
* **图表类**：`chartXAxis`、`chartYAxisLabel`、`chartSymbolScale` 等
* **组件专属类**：如 `widgetURL`、`widgetBackground` 等

> 可查阅完整的 `ViewModifiers` 类型定义以获取所有支持的方法。

---

## 注意事项

* 每次调用 `modifiers()` 会创建一个新的实例，不会与其他实例合并。
* 修饰器的执行顺序完全依赖于调用顺序。
* 当需要同一个修饰器在同一个视图上多次使用时，可以使用 `modifiers` 进行链式调用。

---

通过 `modifiers`，你可以实现更灵活、结构化、可复用的 UI 风格配置，构建贴近 SwiftUI 的声明式体验。适合构建复杂布局、响应式风格以及脚本组件样式抽象。
