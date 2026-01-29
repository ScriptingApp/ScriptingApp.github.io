# 关闭一个视图

此示例演示了如何使用 `Navigation.useDismiss` 钩子**以编程方式关闭已呈现的视图**。当你希望在用户交互（如点击按钮或文本标签）后关闭自定义视图时，这个方法非常有用。

***

## 目的

你将学会：

- 通过 `Navigation.useDismiss` 获取关闭视图的函数
- 调用该函数以关闭当前已呈现的视图
- 使用 `Script.exit` 安全退出脚本，以避免内存泄漏

***

## 示例代码

```tsx
import { Navigation, NavigationStack, Script, Text, VStack } from "scripting"

function View() {
  // 获取上下文中的 `dismiss` 函数
  const dismiss = Navigation.useDismiss()

  return <NavigationStack>
    <VStack
      navigationTitle={"关闭视图"}
    >
      <Text
        foregroundStyle={'link'}
        onTapGesture={() => {
          dismiss()
        }}
      >点击关闭视图</Text>
    </VStack>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <View />
  })

  // 避免内存泄漏
  Script.exit()
}

run()
```

***

## 关键概念

### `Navigation.useDismiss()`

该钩子返回当前视图上下文中的 `dismiss` 函数。调用它会关闭通过 `Navigation.present()` 呈现的视图。

### 使用场景

- 手动关闭一个已呈现的 UI 视图
- 用于表单提交、取消或导航控制逻辑中

### 示例用法

在示例中，渲染了一个可点击的 `Text`：

```tsx
<Text
  foregroundStyle={'link'}
  onTapGesture={() => {
    dismiss()
  }}
>
  点击关闭视图
</Text>
```

点击该文本会触发 `dismiss()`，从而关闭视图。

***

## 最佳实践

- 在 `Navigation.present()` 执行完成后，始终调用 `Script.exit()` 以避免内存泄漏
- 将视图包装在 `NavigationStack` 中，以支持标题栏和导航行为
- 确保 `useDismiss` 只在通过 `Navigation.present()` 呈现的组件树中使用

***

## 运行效果

此脚本会呈现一个简单视图，视图中包含一个链接样式的文本“**点击关闭视图**”。当用户点击该文本时，视图将被关闭。
