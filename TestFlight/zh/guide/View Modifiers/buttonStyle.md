# 按钮样式

该属性用于自定义 UI 中视图层次结构内按钮的交互行为和外观。

***

## 属性声明

```tsx
buttonStyle?: ButtonStyle;
```

### 描述

`buttonStyle` 属性为视图层次结构中的所有按钮应用特定样式，从而自定义它们的外观和交互行为。

***

### 可接受的值

`buttonStyle` 属性接受以下字符串值：

- **`automatic`**: 默认按钮样式，根据按钮的上下文进行自适应。
- **`bordered`**: 应用基于按钮上下文的标准边框样式。
- **`borderedProminent`**: 应用突出显示的边框样式，适合需要重点强调的按钮。
- **`borderless`**: 无边框样式。
- **`plain`**: 在空闲状态下不添加装饰，但会在按钮被按下、聚焦或启用时以视觉方式指示其状态。

***

### 默认行为

如果未指定 `buttonStyle`，则会根据按钮的上下文自动应用默认样式（`automatic`）。

***

## 使用示例

以下展示如何在 TypeScript 代码中使用 `buttonStyle` 属性：

### 示例：带边框的按钮样式

```tsx
<Button
  title="按下我"
  buttonStyle="bordered"
  action={() => console.log('按钮被按下！')}
/>
```

此示例创建了一个带有标准边框的按钮。

***

### 示例：无边框的按钮样式

```tsx
<Button
  title="按下我"
  buttonStyle="borderless"
  action={() => console.log('按钮被按下！')}
/>
```

此示例创建了一个无边框的按钮。

***

### 示例：纯样式按钮

```tsx
<Button
  title="按下我"
  buttonStyle="plain"
  action={() => console.log('按钮被按下！')}
/>
```

此示例创建了一个在空闲状态下不装饰内容，但在交互时会通过视觉效果指示状态的按钮。

***

## 注意事项

- `buttonStyle` 属性直接映射到 SwiftUI 的 `buttonStyle` 修饰符。
- 确保传入的字符串值与上述预定义样式之一匹配，以避免运行时错误。
