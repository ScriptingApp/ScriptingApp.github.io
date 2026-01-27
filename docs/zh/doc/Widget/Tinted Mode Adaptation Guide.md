---
title: 小组件染色模式适配指南

---

iOS 18 引入了一种新的小组件渲染模式，称为 **accented 模式（强调色模式）**，它会使用系统定义的强调色对小组件的内容进行统一染色。为支持该行为，**Scripting** app 提供了三个视图修饰符：

* `widgetAccentable`
* `widgetAccentedRenderingMode`
* `widgetBackground`

这些修饰符让你可以精确控制小组件中哪些部分参与系统的染色逻辑，从而创建更具层次感和适配性的界面。

---

## `widgetAccentable`

### 说明

将视图及其所有子视图标记为 **accented group（强调组）** 的一部分。当小组件处于 **accented 渲染模式** 时，系统会分别为强调组与默认组应用不同的色调。染色过程仿照模板图像的方式 —— 系统会忽略你设置的颜色，仅使用视图的 alpha（透明度）进行渲染。

这个修饰符有助于在 tinted 小组件中实现清晰的层次分离效果。

### 用法示例

```tsx
<VStack>
  <Text
    widgetAccentable
    font="caption"
  >
    MON
  </Text>
  <Text font="title">
    6
  </Text>
</VStack>
```

说明：

* 第一个 `Text` 使用了 `widgetAccentable`，将被系统染色为强调色；
* 第二个 `Text` 属于默认组，通常被染为较浅的颜色。

---

## `widgetAccentedRenderingMode`（用于 `Image` 组件）

### 说明

控制 `Image` 在 **accented 模式** 下的渲染方式。可用于调整图像在染色模式下的外观处理。

### 可用模式

* `'accented'`：将图像加入强调组，使用强调色渲染。
* `'accentedDesaturated'`：将图像亮度转为 alpha 后使用强调色染色。
* `'desaturated'`：将图像亮度转为 alpha 后使用默认组色调染色。
* `'fullColor'`：保留图像原始颜色，不进行染色（仅适用于 iOS 系统图像）。

### 用法示例

```tsx
<Image
  filePath="/path/to/image.png"
  widgetAccentedRenderingMode="fullColor"
/>
```

该设置可确保图像保留完整颜色，适合用于品牌 Logo 或需要保持清晰度的图像内容。

---

## `widgetBackground`

### 说明

`widgetBackground` 修饰符用于在小组件中设置背景样式，**并自动适配 iOS 18 的 accented 模式**。当小组件处于 accented 模式时，该背景会**自动隐藏**，避免被系统强制染色为白色。

iOS 18 会忽略背景颜色，除非设置透明度（alpha）。使用 `widgetBackground` 可以放心地定义装饰性背景，而不必担心其在染色模式下显示异常。

### 支持格式

#### 纯色背景

```tsx
<Text widgetBackground="systemGray5">
  Hello
</Text>
```

#### 浅色/深色模式适配背景

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

#### 带形状的背景

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

> 提示：可用形状包括 `'rect'`、`'circle'`、`'capsule'`、`'ellipse'`、`'buttonBorder'`、`'containerRelative'`，也支持自定义圆角矩形。

### 特性说明

* 在 **accented 模式** 下，背景会被自动隐藏；
* 在 **默认或全彩模式** 下，背景正常显示；
* 与 `widgetAccentable` 配合使用，可实现分层布局，保持视觉清晰度。

---

## 系统行为说明（适用于 iOS 18+）

* 在 **accented 模式** 中，**所有颜色（包括背景）都会被忽略**，除非设置了 `alpha < 1`。例如纯色背景会被渲染为白色。
* 通过 **设置 alpha 值** 可实现视觉层级，例如 `alpha = 1` 会获得强烈染色效果，而 `alpha = 0.3` 更加柔和。
* **不要依赖具体颜色值** 来控制样式，在 accented 模式下颜色会被系统统一替换，应通过分组和透明度控制样式。
* **推荐使用 `widgetBackground` 代替 `background`**，以确保背景在 accented 模式下能够被正确隐藏。

---

## 示例

```tsx
<VStack
  widgetBackground={{
    style: "systemGray6",
    shape: {
      type: "rect",
      cornerRadius: 12
    }
  }}
  spacing={4}
>
  <Image
    filePath="/path/to/icons/calendar.png"
    widgetAccentedRenderingMode="accentedDesaturated"
  />
  <Text widgetAccentable font="caption">
    MON
  </Text>
  <Text font="title">
    6
  </Text>
</VStack>
```

该布局：

* 设置了一个圆角灰色背景，仅在非 accented 模式下显示；
* 图标和星期标签加入了 **强调组**；
* 日期数字保留在 **默认组**；
* 即便系统进行染色，也能保持清晰的分层效果。

---

## 使用技巧

* 使用 `widgetAccentable` 精确标记需要染色的内容，避免误将整个小组件标记为强调组；
* 对于品牌图标等需要保留原色的图像，使用 `widgetAccentedRenderingMode="fullColor"`；
* 使用 `widgetBackground` 替代 `background`，以确保背景能在强调模式下正确处理；
* 为背景或视图设置透明度（如 `alpha < 1`）可保留层次感，避免全部被染为纯白。
