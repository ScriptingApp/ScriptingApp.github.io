---
title: 导航视图修饰符
description: toolbar 属性允许您在视图的导航栏或工具栏区域中添加各种项目。

---

Scripting App 提供了一组用于配置导航行为的视图修饰符，允许开发者控制页面标题的展示内容与样式，并自定义返回按钮的显示与否。这些修饰符与 SwiftUI 中的导航系统高度一致，适用于导航栈中的任意视图。

---

## `navigationTitle`

```ts
navigationTitle?: string

设置当前视图在导航栏中显示的标题。

### 说明

* 在 **iOS** 中，当视图被嵌套在导航栈中时，所设置的标题将显示在导航栏中。
* 在 **iPadOS** 中，主导航目的地的标题也会在多任务切换界面中显示为窗口的标题。

---

## `navigationBarTitleDisplayMode`

```ts
navigationBarTitleDisplayMode?: NavigationBarTitleDisplayMode
```

设置导航栏标题的展示样式。

### 枚举类型：`NavigationBarTitleDisplayMode`

```ts
type NavigationBarTitleDisplayMode = "automatic" | "large" | "inline"
```

* **`automatic`**：系统根据上下文自动选择合适的标题样式。
* **`large`**：以大标题样式显示，通常用于导航栈的根视图。
* **`inline`**：将标题与导航栏控件同行显示，采用紧凑布局。

---

## `navigationBarBackButtonHidden`

```ts
navigationBarBackButtonHidden?: boolean
```

控制是否隐藏默认的导航栏返回按钮。

### 说明

* 设为 `true` 时，系统将不显示默认的返回按钮。
* 适用于需要自定义返回行为，或禁止用户返回的界面场景。

---

## 示例

```tsx
<VStack
  navigationTitle={"个人资料"}
  navigationBarTitleDisplayMode={"inline"}
  navigationBarBackButtonHidden={true}
>
  <Text>欢迎来到个人资料页面</Text>
</VStack>
```

在该示例中：

* 设置视图标题为 `"个人资料"`，并展示在导航栏中。
* 标题采用 `inline` 紧凑样式。
* 默认的返回按钮被隐藏。
