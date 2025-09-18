---
title: 生命周期事件
---
Scripting 支持 SwiftUI 风格的生命周期钩子 `onAppear` 与 `onDisappear`，用于在视图显示或从界面中消失时执行自定义逻辑。你可以使用这些钩子执行动画、加载数据、初始化状态或在视图不再可见时清理资源。

---

## 属性定义

```ts
onAppear?: () => void
onDisappear?: () => void
```

### 属性说明

| 属性名           | 类型           | 说明                                                          |
| ------------- | ------------ | ----------------------------------------------------------- |
| `onAppear`    | `() => void` | 每次视图变为可见时触发，包括首次显示以及从被遮挡状态（如关闭一个 sheet 后）重新显示时。该回调在首帧渲染前执行。 |
| `onDisappear` | `() => void` | 每次视图从界面上消失时触发，包括被临时遮挡（如展示一个 sheet）时。                        |

---

## 示例

```tsx
import { VStack, Text, useState } from "scripting"

function Example() {
  const [message, setMessage] = useState("")

  return <VStack
    onAppear={() => setMessage("视图已显示")}
    onDisappear={() => setMessage("视图已隐藏")}
    padding
  >
    <Text>{message}</Text>
  </VStack>
}
```

---

## 行为说明

* 与 UIKit 中的 `viewDidAppear` 和 `viewDidDisappear` 不同，**Scripting 的 `onAppear` 和 `onDisappear` 每次视图显示与隐藏时都会触发**，而不仅仅是首次进入或离开。
* 例如：

  * 当你**打开一个 sheet** 时，当前页面会触发 `onDisappear`。
  * 当你**关闭该 sheet** 时，当前页面会再次触发 `onAppear`。
* 这些事件**并非只触发一次**，而是**每当视图可见状态发生变化时都会触发**，非常适合跟踪视图在界面上的真实可见性。

---

## 使用场景

| 钩子名           | 典型用途               |
| ------------- | ------------------ |
| `onAppear`    | 初始化数据、启动动画、恢复状态等   |
| `onDisappear` | 停止计时器、取消请求、保存输入内容等 |
