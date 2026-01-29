---
title: 颜色选择器
description: 一个从系统颜色选择器界面中选取颜色的控件。

---
        
`ColorPicker` 组件提供了一个系统颜色选择器 UI，允许用户选择颜色，并通过 `onChanged` 事件将选择的颜色传递回应用。该组件支持以下格式的颜色：
- 关键字颜色（例如：`green`, `red`, `blue` 等）
- 十六进制颜色字符串（例如：`#FF5733` 或 `#333`）
- CSS rgba 字符串（例如：`rgba(255,0,0,1)`）

---

## `ColorPickerProps`

`ColorPickerProps` 是 `ColorPicker` 组件的属性类型，它可以通过以下两种方式定义：

### 1. 使用 `title` 属性
- **`title`** (`string`): 为颜色选择器提供一个标题，描述颜色选择器的用途或提供指导信息。

### 2. 使用 `children` 属性
- **`children`** (`VirtualNode | undefined | null | (VirtualNode | undefined | null)[]` | `VirtualNode`): 提供一个自定义视图来描述所选颜色的用途。系统的颜色选择器 UI 会根据此视图的文本来设置标题。如果不使用 `children`，则可以仅使用 `title`。

### 其他属性

- **`value`** (`Color`): 当前选定的颜色值。可以是关键字颜色、十六进制颜色字符串或 RGBA 字符串。
  
- **`onChanged`** (`(value: Color) => void`): 颜色变化时的回调函数。当用户选择颜色时会调用此回调，并传递新的颜色值。

- **`supportsOpacity`** (`boolean`, 可选): 如果设置为 `true`，则允许调整选定颜色的透明度。默认为 `true`。

### 示例代码

```tsx
import { ColorPicker, useState } from 'scripting'

const MyComponent = () => {
  const [color, setColor] = useState<Color>('#FF5733')

  return (
    <ColorPicker
      title="Pick a Color"
      value={color}
      onChanged={setColor}
    />
  )
}
```

### 说明
在上面的示例中：
- `ColorPicker` 组件的 `title` 被设置为 `"Pick a Color"`，提示用户选择颜色。
- 初始颜色值是 `#FF5733`。
- `onChanged` 回调会在颜色更改时触发，更新 `color` 状态。

### 可选的透明度支持

如果你希望支持调整颜色的透明度，可以通过设置 `supportsOpacity` 属性来启用此功能：

```tsx
<ColorPicker
  title="Pick a Color"
  value={color}
  onChanged={setColor}
  supportsOpacity={true}
/>
```

## `Color` 类型

`Color` 类型用于定义颜色的各种格式，包括：
- **关键字颜色**: 如 `"red"`, `"green"`, `"blue"` 等。
- **十六进制字符串**: 如 `"#FF5733"`。
- **CSS rgba 字符串**: 如 `rgba(255, 0, 0, 0.5)`。

### 示例

```tsx
const color: Color = 'rgba(255, 0, 0, 0.5)'
```