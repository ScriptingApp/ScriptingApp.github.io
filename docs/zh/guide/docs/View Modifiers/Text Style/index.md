---
title: 文本样式
---
通过这些属性，你可以灵活地控制诸如 `Text` 或 `Label` 组件的样式和格式，包括字体、粗细、设计、间距等排版特性。

---

## 概述

这些属性通常作为文本相关视图（例如 `Text` 或 `Label` 组件）的参数传递。例如，你可以指定字体大小、启用加粗格式或添加带颜色的下划线，而无需手动调用多个修饰符。

```tsx
<Text
  font={{ name: 'SystemFontName', size: 18 }}
  fontWeight="semibold"
  italic
  underline="red"
  lineLimit={2}
  multilineTextAlignment="center"
>
  这里是样式化文本
</Text>
```

在上面的示例中，该文本使用了自定义字体、半粗体、斜体样式、红色下划线，限制为两行，并居中对齐。

---

## 字体配置

### `font`

定义应用于文本的字体和大小。

- **数字**：当提供一个数字（例如 `14`）时，会使用系统字体并应用指定的大小。
- **预设字体名称**（`Font` 类型）：使用内置的文本样式（如 `"largeTitle"`、`"headline"`）。系统会根据样式确定字体大小和粗细。
- **对象**：通过指定 `name` 和 `size` 应用自定义字体。

```tsx
<Text font={20}>系统字体，大小 20</Text>
<Text font="headline">系统标题字体</Text>
<Text font={{ name: "CustomFontName", size: 16 }}>自定义字体</Text>
```

---

### `fontWeight`

设置字体笔画的粗细。选项从 `"ultraLight"` 到 `"black"`。

```tsx
<Text fontWeight="bold">加粗文本</Text>
```

---

### `fontWidth`

指定字体的宽度变体（如果可用）。可能的值包括 `"compressed"`、`"condensed"`、`"expanded"` 和 `"standard"`。也可以使用数字值（若支持）。

```tsx
<Text fontWidth="condensed">窄版字体</Text>
```

---

### `fontDesign`

修改字体的设计样式。选项包括 `"default"`、`"monospaced"`、`"rounded"`、`"serif"`。

```tsx
<Text fontDesign="rounded">圆角字体设计</Text>
```

---

## 文本格式化

### `minScaleFactor`

设置文本缩小比例的下限（0 到 1）。例如，`0.5` 表示文本可以缩小到原始大小的 50% 以适应显示空间。

```tsx
<Text minScaleFactor={0.8}>如果不适合显示，此文本会稍微缩小。</Text>
```

---

### `bold`

若为 `true`，应用加粗字体。

```tsx
<Text bold>加粗文本</Text>
```

---

### `baselineOffset`

调整文本相对于基线的垂直位置。正值上移，负值下移。

```tsx
<Text baselineOffset={5}>向上移动的文本</Text>
```

---

### `kerning`

控制字符间距。正值增加间距，负值减少间距。

```tsx
<Text kerning={2}>字符间距较大的文本</Text>
```

---

### `italic`

若为 `true`，应用斜体样式。

```tsx
<Text italic>斜体文本</Text>
```

---

### `monospaced`

将所有子文本强制为等宽字体（若支持）。

```tsx
<Text monospaced>等宽字体文本</Text>
```

---

### `monospacedDigit`

使用固定宽度的数字，同时保持其他字符不变。适合用于对齐数字的场景，例如表格或计时器。

```tsx
<Text monospacedDigit>右边的数字将是等宽的1234</Text>
```

---

## 文本装饰

### `strikethrough`

应用删除线（划过文本）。可以指定颜色或包含模式和颜色的对象。

- **仅颜色**：`strikethrough="red"`
- **对象**：`strikethrough={{ pattern: 'dash', color: 'blue' }}`

```tsx
<Text strikethrough="gray">灰色删除线文本</Text>
<Text strikethrough={{ pattern: 'dot', color: 'red' }}>红色点状删除线</Text>
```

---

### `underline`

以类似 `strikethrough` 的方式应用下划线。

- **仅颜色**：`underline="blue"`
- **对象**：`underline={{ pattern: 'dashDot', color: 'green' }}`

```tsx
<Text underline="blue">蓝色下划线文本</Text>
<Text underline={{ pattern: 'dot', color: 'pink' }}>粉色点状下划线</Text>
```

---

## 行与布局控制

### `lineLimit`

指定文本显示的行数。可以提供：

- 一个数字，表示最大行数。
- 一个对象 `{ min?: number; max: number; reservesSpace?: boolean }`，用于指定最小和最大行数，以及是否为未使用的行数保留空间。

```tsx
<Text lineLimit={1}>如果不适合显示，这段文字会被截断。</Text>
<Text lineLimit={{ min: 2, max: 4, reservesSpace: true }}>
  此文本最多显示 4 行，最少显示 2 行，并始终为 4 行保留空间，避免布局变化。
</Text>
```

---

### `multilineTextAlignment`

设置多行文本的对齐方式：`"leading"`（左对齐）、`"center"`（居中对齐）、`"trailing"`（右对齐）。

```tsx
<Text multilineTextAlignment="center">
  此文本多行居中显示。
</Text>
```

---

## 总结

通过组合这些属性，你可以全面控制文本视图的排版，无需多余的包裹组件或修饰符。无论是需要带有自定义字符间距和下划线的加粗斜体标题，还是仅显示两行的简单正文字体，这些选项都能满足广泛的文本样式需求。