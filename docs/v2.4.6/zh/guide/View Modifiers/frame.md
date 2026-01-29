---
title: frame
description: 该属性用于设置视图的尺寸（固定或弹性）以及在容器中的对齐方式。

---

`frame` 属性用于设置视图的尺寸（固定或弹性）以及在容器中的对齐方式。支持两种不同的配置格式：

---

### 1. 固定尺寸格式

```ts
frame?: {
  width?: number
  height?: number
  alignment?: Alignment
}
```

用于指定固定的宽度和高度，并设置在该区域内的对齐方式。

#### 示例

```tsx
<VStack
  frame={{
    width: 100,
    height: 100,
    alignment: 'center'
  }}
>
  <Text>固定尺寸</Text>
</VStack>
```

---

### 2. 弹性尺寸格式

```ts
frame?: {
  alignment?: Alignment
  minWidth?: number
  minHeight?: number
  maxWidth?: number | 'infinity'
  maxHeight?: number | 'infinity'
  idealWidth?: number | 'infinity'
  idealHeight?: number | 'infinity'
}
```

用于设置最小、最大和理想尺寸。数值可以为具体数值或字符串 `'infinity'`，表示尽可能占满可用空间。

#### 示例

```tsx
<HStack
  frame={{
    minWidth: 100,
    maxWidth: 'infinity',
    minHeight: 50,
    idealHeight: 100,
    alignment: 'leading'
  }}
>
  <Text>可扩展宽度</Text>
</HStack>
```

---

## 对齐方式（Alignment）

`alignment` 决定视图在其 frame 内的布局位置。支持的值包括：

* `'center'`（居中）
* `'top'`（顶部对齐）
* `'bottom'`（底部对齐）
* `'leading'`（前导边对齐，LTR 中为左）
* `'trailing'`（尾部边对齐，LTR 中为右）
* `'topLeading'`（左上角）
* `'topTrailing'`（右上角）
* `'bottomLeading'`（左下角）
* `'bottomTrailing'`（右下角）

> **注意**：仅当 frame 的尺寸大于内容视图的自然尺寸时，对齐方式才会起作用。

#### 示例

```tsx
<Text
  frame={{
    width: 200,
    height: 100,
    alignment: 'bottomTrailing'
  }}
>
  对齐文本
</Text>
```

---

## 使用建议

* 如果需要精确控制尺寸，建议使用固定格式的 `width` 和 `height`。
* 如果希望布局适应不同屏幕或内容，推荐使用弹性尺寸的 `min` / `max` / `ideal` 格式。
* 请勿在同一个 `frame` 对象中混合使用 `width` / `height` 与 `minWidth` / `maxWidth` 等，以避免冲突。

---

## 总结

`frame` 属性是布局控制的基础工具，可用于设定视图尺寸和定位方式。借助 `CommonViewProps`，你可以灵活地构建适配性强、结构清晰的界面布局。
