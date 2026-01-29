# 文本修饰符

以下属性可用于为基于文本的视图（如 `Text` 或 `Label`）设置样式和格式，其功能与 SwiftUI 的内建修饰符类似。通过自定义这些属性，您可以控制文本的字体、字重、设计、间距及其他排版特性。

## 概览

这些属性通常作为属性传递给与文本相关的组件，如 `Text` 或 `Label`。例如，您可以设置字体大小、启用加粗格式，或添加自定义颜色的下划线——无需手动调用多个修饰符。

```tsx
<Text
  font={{ name: 'SystemFontName', size: 18 }}
  fontWeight="semibold"
  italic
  underline="red"
  lineLimit={2}
  multilineTextAlignment="center"
>
  Stylish Text Here
</Text>
```

在上面的示例中，文本使用了自定义字体、半粗体、斜体风格、红色下划线，限制为两行，并居中对齐。

***

## 字体配置

### `font`

定义文本的字体和大小。

- **数字**：提供一个数字（例如 `14`）时，将应用该大小的系统字体。
- **预设字体名称**（`Font` 类型）：使用内建的文本样式之一（如 `"largeTitle"`、`"title"`、`"headline"`、`"subheadline"`、`"body"`、`"callout"`、`"footnote"`、`"caption"`）。系统会根据样式决定大小和字重。
- **包含名称和大小的对象**：指定 `name` 和 `size` 来应用自定义字体。

```tsx
<Text font={20}>系统字体，大小为 20</Text>
<Text font="headline">系统标题字体</Text>
<Text font={{ name: "CustomFontName", size: 16 }}>自定义字体</Text>
```

***

### `fontWeight`

设置字体的粗细程度。可选值包括从 `"ultraLight"` 到 `"black"`。

```tsx
<Text fontWeight="bold">加粗文本</Text>
```

***

### `fontWidth`

指定字体的宽度变体（如果可用）。可选值有 `"compressed"`、`"condensed"`、`"expanded"` 和 `"standard"`，也可以使用数字（如果支持）。

```tsx
<Text fontWidth="condensed">压缩宽度字体</Text>
```

***

### `fontDesign`

修改字体设计风格。可选值包括 `"default"`、`"monospaced"`、`"rounded"`、`"serif"`。

```tsx
<Text fontDesign="rounded">圆角字体设计</Text>
```

***

## 文本格式

### `minScaleFactor`

一个介于 0 到 1 之间的数字，表示当文本超出空间限制时最多可以缩小到原始大小的多少。例如，`0.5` 表示文本可以缩小到 50%。

```tsx
<Text minScaleFactor={0.8}>当文本超出时会稍微缩小。</Text>
```

***

### `bold`

如果为 `true`，应用加粗字体。

```tsx
<Text bold>这是加粗文本</Text>
```

***

### `baselineOffset`

调整文本相对于基线的垂直位置。正值向上移动，负值向下移动。

```tsx
<Text baselineOffset={5}>文本向上偏移</Text>
```

***

### `kerning`

控制字符间距。正值增加间距，负值减小间距。

```tsx
<Text kerning={2}>字符间距增加</Text>
```

***

### `italic`

如果为 `true`，应用斜体样式。

```tsx
<Text italic>斜体文本</Text>
```

***

### `monospaced`

强制所有子文本使用等宽字体（如果可用）。

```tsx
<Text monospaced>等宽字体文本</Text>
```

***

### `monospacedDigit`

使用固定宽度数字，而其他字符保持原样。适用于表格或计时器中的数字对齐。

```tsx
<Text monospacedDigit>数字等宽对齐 1234</Text>
```

***

## 文本装饰

### `strikethrough`

应用删除线（贯穿文本）。可以提供颜色，或一个包含样式和颜色的对象。

- **仅颜色**：`strikethrough="red"`
- **对象**：`strikethrough={{ pattern: 'dash', color: 'blue' }}`

```tsx
<Text strikethrough="gray">灰色删除线文本</Text>
<Text strikethrough={{ pattern: 'dot', color: 'red' }}>红色点状删除线</Text>
```

***

### `underline`

以下划线方式装饰文本，使用方式与 `strikethrough` 类似。

- **仅颜色**：`underline="blue"`
- **对象**：`underline={{ pattern: 'dashDot', color: 'green' }}`

```tsx
<Text underline="blue">蓝色下划线文本</Text>
<Text underline={{ pattern: 'dot', color: 'pink' }}>粉色点状下划线</Text>
```

***

## 行数、行间距与布局控制

### `lineLimit`

指定文本最多显示的行数。可以：

- 提供一个数字来设置最大行数；
- 或提供一个对象 `{ min?: number; max: number; reservesSpace?: boolean }`，来指定最小和最大行数，并选择是否预留最大行数空间以避免布局跳动。

```tsx
<Text lineLimit={1}>如果超出一行将被截断。</Text>
<Text lineLimit={{ min: 2, max: 4, reservesSpace: true }}>
  可显示 2 到 4 行文本，并始终预留 4 行空间，避免布局变化。
</Text>
```

***

### `lineSpacing`

设置行间距，单位为像素。

```tsx
<Text lineSpacing={5}>设置行间距为 5 像素</Text>
```

***

### `multilineTextAlignment`

设置多行文本的对齐方式：`"leading"`（左对齐）、`"center"`（居中）或 `"trailing"`（右对齐）。

```tsx
<Text multilineTextAlignment="center">
  多行文本居中显示。
</Text>
```

***

### `truncationMode`

指定文本太长时的截断方式。

#### 类型

```ts
type TruncationMode = "head" | "middle" | "tail"
```

#### 描述

定义截断的位置：

- `"head"`：截断行首，保留末尾。
- `"middle"`：截断中间，保留首尾。
- `"tail"`：截断尾部，保留开头。

```tsx
<Text truncationMode="middle">
  这是一段可能会被截断的很长文本。
</Text>
```

***

### `allowsTightening?: boolean`

是否允许系统在必要时压缩字符间距以适应一行内显示。

#### 类型

`boolean`

#### 默认值

`false`

#### 描述

设置为 `true` 时，系统可以压缩字距以避免截断，并改善在受限空间下的布局适应性。

```tsx
<Text allowsTightening={true}>
  在需要时压缩的文本
</Text>
```

***

## 总结

通过组合这些属性，您可以完全掌控文本视图的排版，而无需多个包装组件或修饰符。无论您需要加粗、斜体、带自定义字符间距和下划线的标题，还是仅限两行显示的正文文本，这些选项都能满足广泛的文本样式需求。
