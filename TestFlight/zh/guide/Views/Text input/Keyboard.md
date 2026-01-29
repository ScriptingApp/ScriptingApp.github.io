# 键盘

`Keyboard` API 与 `useKeyboardVisible` 钩子一起，可以在 Scripting 应用中与软件键盘交互。您可以检查键盘是否可见、隐藏键盘、监听键盘的可见性变化，并在函数组件中以响应式方式访问当前可见状态。

***

## 概述

`Keyboard` API 的功能包括：

1. 检查键盘当前是否可见。
2. 以编程方式隐藏键盘。
3. 监听键盘可见性变化。
4. 使用 `useKeyboardVisible` 钩子以响应式方式跟踪键盘的可见性。

***

## 模块：`Keyboard`

### 属性

- **`visible: boolean`**\
  一个只读属性，指示键盘当前是否可见。
  - `true`：键盘可见。
  - `false`：键盘隐藏。

***

### 方法

#### `Keyboard.hide(): void`

隐藏当前可见的键盘。

- **用法**：
  - 如果键盘已隐藏，此方法不会执行任何操作。
  - 通常用于以编程方式关闭键盘。

***

#### `Keyboard.addVisibilityListener(listener: (visible: boolean) => void): void`

添加一个监听器函数，当键盘的可见性发生变化时触发。

- **参数**：
  - `listener: (visible: boolean) => void`：一个回调函数，接收 `visible` 参数：
    - `true`：键盘变为可见。
    - `false`：键盘变为隐藏。

- **用法**：
  - 使用此方法在键盘出现或消失时执行自定义逻辑。

***

#### `Keyboard.removeVisibilityListener(listener: (visible: boolean) => void): void`

移除之前添加的可见性监听器。

- **参数**：
  - `listener: (visible: boolean) => void`：要移除的回调函数。必须与通过 `addVisibilityListener` 添加的函数一致。

***

## 钩子：`useKeyboardVisible`

### `useKeyboardVisible(): boolean`

一个钩子，用于访问当前键盘的可见状态。该钩子提供了一种响应式方式来跟踪键盘是否可见。

- **返回值**：
  - `true`：键盘当前可见。
  - `false`：键盘当前隐藏。

- **用法**：
  - 此钩子非常适合函数组件，根据键盘的可见状态有条件地渲染 UI 元素或执行逻辑。

***

## 示例用法

### 使用 `Keyboard.visible` 检查键盘可见性

```ts
if (Keyboard.visible) {
  console.log("键盘可见。")
} else {
  console.log("键盘隐藏。")
}
```

***

### 隐藏键盘

```ts
Keyboard.hide()
console.log("键盘已通过编程方式隐藏。")
```

***

### 添加和移除可见性监听器

```ts
// 定义监听器
function handleKeyboardVisibility(visible: boolean) {
  if (visible) {
    console.log("键盘现在可见。")
  } else {
    console.log("键盘现在隐藏。")
  }
}

// 添加监听器
Keyboard.addVisibilityListener(handleKeyboardVisibility)

// 移除监听器
Keyboard.removeVisibilityListener(handleKeyboardVisibility)
console.log("键盘可见性监听器已移除。")
```

***

### 在函数组件中使用 `useKeyboardVisible`

```tsx
import { useKeyboardVisible, VStack, Text } from 'scripting'

function KeyboardStatus() {
  const isKeyboardVisible = useKeyboardVisible()

  return (
    <VStack>
      {isKeyboardVisible ? (
        <Text>The keyboard is currently visible.</Text>
      ) : (
        <Text>The keyboard is currently hidden.</Text>
      )}
    </VStack>
  )
}
```

***

## 注意事项

1. **响应式状态与钩子**：在函数组件中使用 `useKeyboardVisible` 钩子，以简洁和响应式的方式跟踪键盘的可见性。
2. **静态状态与 `Keyboard.visible`**：使用 `Keyboard.visible` 属性进行快速的非响应式检查。
3. **事件监听器**：根据需要使用 `addVisibilityListener` 添加多个可见性监听器，并确保在不需要时移除它们以防止内存泄漏。
4. **以编程方式关闭键盘**：`Keyboard.hide()` 方法在提交表单或点击输入框外部以关闭键盘等场景中非常有用。
