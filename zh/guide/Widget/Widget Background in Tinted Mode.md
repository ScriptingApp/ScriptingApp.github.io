# 小组件色调模式背景

`widgetBackground` 是一个专用于**小组件**的视图修饰符，用于在不同的渲染模式下设置背景样式，特别是为适配 **iOS 18 的 tinted（强调色）模式**而设计。

## 功能说明

在 **tinted 模式**下，iOS 会将所有视图颜色（包括背景）渲染为白色，除非该视图使用了 `widgetAccentable` 标记。这可能会导致背景显示异常或视觉效果失真。

使用 `widgetBackground` 可以避免这种问题：

- **在 accented 模式下自动隐藏背景**，避免被系统渲染为纯白色；
- **在默认模式或全彩模式下正常显示背景**。

这样可以确保你的小组件在不同系统渲染环境下都具有良好的视觉一致性。

***

## 支持的背景设置方式

`widgetBackground` 支持以下几种格式：

### 1. **纯色背景（ShapeStyle）**

使用简单颜色作为背景：

```tsx
<Text widgetBackground="systemBlue">
  Hello
</Text>
```

***

### 2. **动态背景（DynamicShapeStyle）**

根据系统的浅色/深色模式动态切换背景样式：

```tsx
<Text
  widgetBackground={{
    light: "white",
    dark: "black"
  }}
>
  模式感知背景
</Text>
```

***

### 3. **带形状的背景样式**

使用指定的\*\*形状（Shape）\*\*配合填充样式，实现结构化的背景设计：

```tsx
<Text
  widgetBackground={{
    style: "systemGray6",
    shape: {
      type: "rect",
      cornerRadius: 12,
      style: "continuous"
    }
  }}
>
  圆角背景
</Text>
```

支持的形状包括：

- 预设形状：`'rect'`、`'circle'`、`'capsule'`、`'ellipse'`、`'buttonBorder'`、`'containerRelative'`
- 自定义圆角矩形：支持统一圆角、椭圆角尺寸、每个角独立设定

***

## 在 accented 模式下的行为

- **在 iOS 的 accented（tinted）模式下**：背景会被自动隐藏，以避免出现纯白色遮盖问题；
- **在默认或全彩渲染模式下**：背景将按设定正常显示。

此行为可有效避免系统渲染方式对 UI 布局和层级的干扰。

***

## 使用建议

- 仅在小组件中使用 `widgetBackground`，以避免在普通视图中出现不必要的隐藏行为；
- 不要使用背景传达重要信息，因为在 accented 模式下它可能会被隐藏；
- 搭配 `widgetAccentable` 使用，以精确控制哪些内容应参与系统色彩渲染，哪些内容应独立呈现。
