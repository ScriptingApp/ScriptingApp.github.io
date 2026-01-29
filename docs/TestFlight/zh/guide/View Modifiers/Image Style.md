---
title: 图片样式
description: 这些修饰符专门用于控制图像视图的缩放、布局与渲染方式。

---

这些修饰符专门用于控制图像视图的缩放、布局与渲染方式。

---

## `scaleToFit`

### 定义

```ts
scaleToFit?: boolean
```

### 描述

将图像按比例缩放，使其完整地**适配容器尺寸**，保持原始宽高比例，不进行裁剪。

等效于 SwiftUI 的：

```swift
.aspectRatio(contentMode: .fit)
```

### 行为说明

* 保留图像的原始宽高比
* 图像完全显示在容器内
* 如果图像比例与容器不一致，可能会留白

### 示例

```tsx
<Image
  filePath="path/to/photo.jpg"
  scaleToFit={true}
/>
```

---

## `scaleToFill`

### 定义

```ts
scaleToFill?: boolean
```

### 描述

将图像按比例缩放，使其**填满整个容器**，保持宽高比，但图像可能会被**裁剪**以适配。

等效于 SwiftUI 的：

```swift
.aspectRatio(contentMode: .fill)
```

### 行为说明

* 图像完全填充容器
* 保持原始宽高比
* 如果比例不同，图像边缘可能会被截断

### 示例

```tsx
<Image
  imageUrl="https://example.com/banner.jpg"
  scaleToFill={true}
/>
```

---

## `aspectRatio`

### 定义

```ts
aspectRatio?: {
  value?: number | null
  contentMode: "fit" | "fill"
}
```

### 描述

强制视图按照指定的**宽高比例**进行布局，可以选择使用 `fit` 或 `fill` 模式控制适配方式。

* `value`: 设置具体的宽高比，例如 `16 / 9`；设为 `null` 表示保持图像原始比例。
* `contentMode`：`"fit"` 表示缩放适配容器但完整显示，`"fill"` 表示缩放填满容器可能被裁剪。

### 示例：设置 3:2 比例并适配显示

```tsx
<Image
  filePath="path/to/photo.jpg"
  aspectRatio={{
    value: 3 / 2,
    contentMode: "fit"
  }}
/>
```

### 示例：保持原始比例并填满容器

```tsx
<Image
  systemName="photo"
  aspectRatio={{
    value: null,
    contentMode: "fill"
  }}
/>
```

---

## `imageScale`

### 定义

```ts
imageScale?: "small" | "medium" | "large"
```

### 描述

设置 SF Symbols 图像的**渲染缩放级别**，不会影响视图的实际布局大小，仅影响图像本身的显示尺寸。

* `"small"`：较小尺寸
* `"medium"`：默认尺寸
* `"large"`：较大尺寸

> 仅适用于通过 `systemName` 创建的系统图标图像。

### 示例

```tsx
<Image
  systemName="bolt.fill"
  imageScale="large"
/>
```

---

## 总结对比

| 修饰符名称         | 功能说明             | 是否影响布局 | 是否裁剪图像 | 是否仅用于符号图像        |
| ------------- | ---------------- | ------ | ------ | ---------------- |
| `scaleToFit`  | 保持比例缩放，完整显示图像    | 是      | 否      | 否                |
| `scaleToFill` | 保持比例缩放，填满容器，可能裁剪 | 是      | 是      | 否                |
| `aspectRatio` | 设置具体宽高比，适配或填充容器  | 是      | 可选     | 否                |
| `imageScale`  | 设置符号图像的渲染尺寸      | 否      | 否      | ✅ 仅用于 SF Symbols |
