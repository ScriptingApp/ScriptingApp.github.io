---
title: flipsForRightToLeftLayoutDirection
description: 设置当系统使用从右到左（Right-to-Left, RTL）布局方向时，当前视图是否应水平镜像其内容。

---

设置当系统使用从右到左（Right-to-Left, RTL）布局方向时，当前视图是否应水平镜像其内容。

## 类型

`flipsForRightToLeftLayoutDirection?: boolean`

## 描述

当设为 `true` 时，视图会在 RTL 布局环境下水平翻转其内容，以符合阿拉伯语、希伯来语等从右到左语言的阅读方向。这在需要手动控制视图镜像行为的自定义组件中尤为有用。

若设为 `false`，则视图无论当前系统布局方向如何，都会保持从左到右的默认布局。

## 默认值

`false`（默认不会自动翻转视图）

## 示例

```tsx
<Image
  filePath="path/to/icon.png"
  flipsForRightToLeftLayoutDirection={true}
/>
```

在上述示例中，当界面处于 RTL 布局时，图像会自动进行水平翻转。
