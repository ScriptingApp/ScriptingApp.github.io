# 工具栏修饰符

Scripting App 支持一系列视图修饰符，用于控制系统工具栏（包括导航栏、底部工具栏、标签栏等）的可见性、外观样式以及行为。这些修饰符参考了 SwiftUI 的设计，允许你在每个视图中以声明式方式对工具栏进行个性化配置。

***

## 可见性控制修饰符

以下修饰符用于控制系统界面中各类栏（bar）的显示与隐藏：

```ts
bottomBarVisibility?: Visibility
navigationBarVisibility?: Visibility
tabBarVisibility?: Visibility
```

### Visibility 类型定义

```ts
type Visibility = "automatic" | "hidden" | "visible"
```

- **`automatic`**：由系统自动决定是否显示。
- **`hidden`**：强制隐藏该栏。
- **`visible`**：强制显示该栏。

***

## 工具栏标题菜单

```ts
toolbarTitleMenu?: VirtualNode
```

为导航栏的标题添加一个可点击菜单。点击导航标题后，系统会展示该菜单内容。常用于展示与当前页面相关的上下文操作选项。

***

## 工具栏背景样式

```ts
toolbarBackground?: ShapeStyle | DynamicShapeStyle | {
  style: ShapeStyle | DynamicShapeStyle
  bars?: ToolbarPlacement[]
}
```

配置工具栏的背景样式。支持颜色、材质、渐变等形式，可通过 `bars` 参数限定应用到特定栏位。

### bars（可选）

```ts
type ToolbarPlacement = "automatic" | "tabBar" | "bottomBar" | "navigationBar"
```

- 若未设置 `bars`，系统会自动决定应用范围。
- 可指定应用到 `tabBar`、`bottomBar` 或 `navigationBar` 等栏位。

***

## 工具栏背景可见性（仅限 iOS 18+）

```ts
toolbarBackgroundVisibility?: Visibility | {
  visibility: Visibility
  bars?: ToolbarPlacement[]
}
```

控制工具栏背景的可见性。例如，可使导航栏背景透明、半透明或完全不显示。

- **`visibility`**：可选值包括 `"automatic"`、`"visible"`、`"hidden"`。
- **`bars`**（可选）：指定希望应用该设置的栏位。若不指定，默认作用于所有工具栏。

***

## 工具栏配色方案

```ts
toolbarColorScheme?: ColorScheme | {
  colorScheme: ColorScheme | null
  bars?: ToolbarPlacement[]
}
```

指定工具栏的配色风格（亮色或暗色），影响工具栏内容的颜色（如按钮、标题等）。

### ColorScheme 类型定义

```ts
type ColorScheme = "light" | "dark"
```

- **`light`**：使用浅色配色风格。
- **`dark`**：使用深色配色风格。
- **`null`**：恢复系统默认配色。

`bars` 参数可限制仅对特定工具栏应用该配色设置。

***

## 工具栏标题展示模式

```ts
toolbarTitleDisplayMode?: ToolbarTitleDisplayMode
```

控制导航栏中标题的展示样式。

### ToolbarTitleDisplayMode 类型定义

```ts
type ToolbarTitleDisplayMode = "automatic" | "large" | "inline" | "inlineLarge"
```

- **`automatic`**：由系统自动决定使用大标题或小标题。
- **`large`**：使用大标题样式（通常在导航栈顶显示）。
- **`inline`**：标题与导航栏控件同行显示。
- **`inlineLarge`**：使用 inline 布局，但保留大标题的视觉风格（适用于自定义标题样式）。

***

## 使用说明

- 所有修饰符可组合使用，为每个视图实现精细化的工具栏配置。
- `toolbarBackground`、`toolbarColorScheme` 和 `toolbarBackgroundVisibility` 可通过 `bars` 参数作用于特定栏位，提供精准的外观控制。
- `toolbarBackgroundVisibility` 仅在 iOS 18 及以上版本有效。
- `toolbarTitleMenu` 适用于具备导航栏的视图，用于增强导航标题的交互性。
