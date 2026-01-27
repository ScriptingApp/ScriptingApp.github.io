---
title: 展示一个简单视图

---
        
本示例展示了如何使用 `Navigation.present` 在 Scripting 中展示一个基本的 UI 页面，同时演示了如何使用 `NavigationStack` 和 `navigationTitle` 设置导航标题。

---

## 示例功能

你将学习如何：

* 使用 `Navigation.present` 展示一个自定义页面
* 使用 `NavigationStack` 和 `VStack` 构建页面结构
* 设置导航栏标题（`navigationTitle`）

---

## 示例代码

```tsx
import { Navigation, NavigationStack, Script, Text, VStack } from "scripting"

function View() {

  return <NavigationStack>
    <VStack
      navigationTitle={"Present a simple view"}
    >
      <Text>Hello Scripting!</Text>
    </VStack>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <View />
  })

  Script.exit()
}

run()
```

---

## 关键组件说明

### `Navigation.present(options)`

该方法用于展示一个完整页面的 UI 视图。它接收一个 `element` 参数，该参数是要展示的根组件。

```ts
await Navigation.present({
  element: <View />
})
```

### `NavigationStack`

导航堆栈容器组件，支持页面标题、导航栏按钮等功能。它必须作为页面结构的最外层容器使用，以启用导航行为。

### `VStack`

垂直方向布局容器，用于将子视图从上到下堆叠排列。在本例中，它包含一个 `Text` 组件。

### `navigationTitle`

在 `VStack` 上设置该属性可以设置页面的导航栏标题。

---

## 页面效果

该示例会展示一个标题为 **“Present a simple view”** 的页面，并在中央显示文本 **“Hello Scripting!”**。

---

## 注意事项

* 如果你的页面需要导航栏、标题、返回按钮等功能，请务必使用 `NavigationStack` 包裹视图。
* `Navigation.present` 弹出页面后，需在其完成后调用 `Script.exit()` 来确保资源正确释放，避免内存泄漏。
