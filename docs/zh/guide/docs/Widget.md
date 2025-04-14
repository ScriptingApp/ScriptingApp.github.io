---
title: 小组件
---
欢迎使用 **Scripting**！这款应用允许您使用 TypeScript 和类 React 的 TSX 语法为 iOS 创建自定义小组件。通过 **Scripting**，您可以结合熟悉的 TypeScript 代码和 SwiftUI 组件，快速构建复杂的 UI。以下是快速上手指南：

---

### 1. 创建您的第一个小组件

要为 iOS 主屏幕创建小组件，请按照以下步骤操作：

#### 步骤 1：创建新的脚本项目
1. 打开 **Scripting** 应用。
2. 点击右上角创建一个新的脚本项目，并根据您的小组件设计命名和选择图标。

#### 步骤 2：设置 `widget.tsx`
1. 点击小组件右上角的更多按钮，打开代码编辑器
2. 点击左上角的文件夹图标，在项目目录中创建一个名为 `widget.tsx` 的新文件。
2. 使用函数定义小组件的主视图组件，就像在 React 中一样。
3. 在你编程过程中，需要用到的API只需要在弹出提示的时候点击需要导入的API或者点击回车，该API会自动导入。

#### 示例
```typescript
// widget.tsx
import { VStack, Text, Widget } from 'scripting'

function MyWidgetView() {
  return (
    <VStack>
      <Text>Hello world</Text>
    </VStack>
  )
}

// 展示小组件
Widget.present(<MyWidgetView />)
```

在这个示例中：
- `MyWidgetView` 是一个函数组件，使用 SwiftUI 风格的组件（如 `VStack` 和 `Text`）来构建和设计 UI。
- `Widget.present(<MyWidgetView />)` 将您的组件渲染为主屏幕上的小组件视图。

---

### 2. 访问小组件的上下文属性

为了让小组件的内容适应不同的上下文，您可以使用以下通过 `Widget` API 提供的属性：

- **`Widget.displaySize`**：提供当前小组件的显示尺寸，方便根据小组件的尺寸调整布局。
- **`Widget.family`**：返回小组件的类别（例如，小、中、大），以帮助您为每种小组件尺寸定制 UI。
- **`Widget.parameter`**：允许您在 iOS 主屏幕的小组件配置面板中设置自定义参数。您可以在组件中使用这些参数，根据用户输入或偏好定制小组件。

---

### 3. 将小组件添加到主屏幕

1. 在设置好小组件组件并调用 `Widget.present` 后，在 iOS 主屏幕上添加一个 **Scripting 小组件**。
2. 长按小组件，然后选择 **编辑小组件**。
3. 在小组件的配置中，选择您刚刚创建的脚本，并根据需要设置 **参数**（该参数可以通过`Widget.parameter`访问）。

完成后，小组件将直接在主屏幕上渲染您指定的 `MyWidgetView`（或其他组件）。

---

### 4. 封装 SwiftUI 视图

**Scripting** 应用允许您在 TypeScript 代码中封装和使用 **SwiftUI** 视图。这种灵活性让您可以访问强大的原生 iOS UI 组件，同时与 TypeScript 的逻辑和类 React 的 TSX 语法无缝集成。

使用 **Scripting** 提供的 SwiftUI 风格组件（如 `VStack`、`Text` 等），以实现您想要的外观和设计。

---

### 补充说明

- **组件结构：** 您可以通过模块化的方式，在 `widget.tsx` 文件中组合多个组件，或者在多个文件中创建组件，然后通过 `import { OtherComponent } from "./other_component"` 导入它们。
- **小组件更新：** 将小组件添加到主屏幕后，您可以通过调用 `Widget.reloadAll()` 立即刷新。当您更新 `widget.tsx` 代码时，可以通过点击右下角的 **刷新小组件** 按钮重新加载小组件，从而快速开发和测试。
- **视图文档：** 请参考 **视图** 文档，以了解 `scripting` 包中所有可用视图和 API 的详细信息。

---

**祝您在 Scripting 中愉快地创建自定义小组件！** 欢迎探索和尝试不同的布局和组件，打造适合您需求的完美主屏幕小组件。