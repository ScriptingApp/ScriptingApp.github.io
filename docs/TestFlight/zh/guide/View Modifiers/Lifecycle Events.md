---
title: 生命周期事件
description: 用于在视图显示或从界面中消失时执行自定义逻辑。

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
| `onAppear`    | `() => void` | 视图可见时触发。 |
| `onDisappear` | `() => void` | 视图从界面上消失时触发。                        |

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
