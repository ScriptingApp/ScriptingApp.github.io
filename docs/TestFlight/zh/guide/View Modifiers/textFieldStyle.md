---
title: 文本输入框样式
description: textFieldStyle 属性允许您自定义 TextField 视图的外观和交互。

---

通过该属性，你可以定义文本框的视觉样式，从而影响其边框、背景和布局的外观。不同的样式可以帮助文本框在各种 UI 设计中无缝融合，或提供功能上的提示。

---

## 概述

`TextField` 为用户提供了一个输入文本的方式。通过选择 `textFieldStyle`，你可以决定文本框是以简洁、无边框的样式呈现，还是以更加明显的圆角边框显示，从而突出输入区域。

---

## 可用样式

- **`automatic`**：  
  让系统根据平台和上下文选择合适的样式。如果没有明确的样式偏好，这是一个方便的默认选择。

- **`plain`**：  
  以最少的装饰显示文本框。这种样式通常看起来像纯文本，适合不希望输入框过于显眼的布局。

- **`roundedBorder`**：  
  为文本框添加一个圆角矩形边框。这种样式能让输入区域更加突出，清楚地表明用户可以在其中输入内容。适合用于表单或需要用户进行主要操作的场景。

---

## 基本用法

以下示例展示了如何使用具有特定样式的 `TextField`：

```tsx
<TextField
  title="用户名"
  value={username}
  onChanged={newVal => setUsername(newVal)}
  textFieldStyle="roundedBorder"
  prompt="输入您的用户名"
/>
```

在此示例中，`textFieldStyle="roundedBorder"` 会用视觉效果突出输入框，让用户明确知道可以点击并输入。

---

## 其他常用属性

- **`value: string`**：  
  文本框当前的内容。用户输入时更新该值以保持显示内容同步。

- **`onChanged: (value: string) => void`**：  
  每当文本框内容更改时调用的回调函数，可用于响应用户输入。

- **`prompt?: string`**：  
  提示或占位符文本，用于指导用户输入内容。

- **`axis?: Axis`**：  
  决定当文本超出显示范围时的滚动方向。如果预期用户输入的内容较长，可以使用此属性。

- **`autofocus?: boolean`** *(默认值: false)*：  
  如果设置为 `true`，文本框会在显示时自动获得焦点，方便用户立即输入。

- **`onFocus?: () => void` 和 `onBlur?: () => void`**：  
  分别在文本框获得或失去焦点时调用的回调函数，可用于提供视觉反馈、执行验证或更新其他 UI 部分。

---

## 示例

```tsx
<TextField
  label={<Text style={{fontWeight: 'bold'}}>邮箱：</Text>}
  value={email}
  onChanged={setEmail}
  prompt="you@example.com"
  textFieldStyle="plain"
  autofocus={true}
  onFocus={() => console.log('获得焦点')}
  onBlur={() => console.log('失去焦点')}
/>
```

在此示例中，文本框被设置为 `plain` 样式，与周围内容更融为一体。`autofocus` 属性确保用户在进入此视图后可以立即开始输入。

---

## 总结

通过 `textFieldStyle`，你可以根据不同的上下文调整输入框的外观。无论是选择低调的 `plain` 样式，还是选择更加结构化的 `roundedBorder` 样式，合适的样式能够帮助创建清晰、直观的用户体验。如果不确定样式选择，可以使用 `automatic` 让系统决定最合适的外观。