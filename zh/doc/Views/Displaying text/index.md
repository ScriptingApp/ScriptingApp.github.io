# 显示文本

`Text` 组件用于在 Scripting 应用中显示一行或多行只读文本。它支持纯文本、富文本（Markdown）以及丰富的文本样式。

***

## **类型定义**

### `TextProps`

定义了可传递给 `Text` 组件的属性。`TextProps` 类型有三种可能的结构：

1. **纯文本属性**
   - `children`（可选）：
     - 类型：`null | string | number | boolean | Array<string | number | boolean | undefined | null>`
     - 描述：以纯文本形式渲染的内容，可以是单个值或值的数组。
   - 示例：
     ```tsx
     <Text>简单的纯文本</Text>
     ```

2. **Markdown 文本属性**
   - `attributedString`（可选）：
     - 类型：`string`
     - 描述：指定 Markdown 格式的文本内容。
   - 示例：
     ```tsx
     <Text attributedString="**加粗** _斜体_ [链接](https://example.com)" />
     ```

3. **富文本属性**
   - `styledText`（可选）：
     - 类型：`StyledText`
     - 描述：指定具有自定义样式和属性的富文本内容。
   - 示例：
     ```tsx
     const richText: StyledText = {
       font: "title",
       bold: true,
       underlineStyle: "single",
       underlineColor: "#0000FF",
       content: "丰富样式的文本"
     }
     <Text styledText={richText} />
     ```

***

### `UnderlineStyle`

定义了富文本可用的下划线样式：

- `"byWord"`：逐字下划线。
- `"double"`：双线下划线。
- `"patternDash"`：虚线下划线。
- `"patternDashDot"`：点划线下划线。
- `"patternDashDotDot"`：双点划线下划线。
- `"patternDot"`：点状下划线。
- `"single"`：单线下划线。
- `"thick"`：加粗下划线。

***

### `StyledText`

定义了富文本样式的结构：

- `font`（可选）：指定字体名称，例如：`"title"`、`"body"`。
- `fontDesign`（可选）：自定义字体设计，例如：`"serif"`、`"monospaced"`。
- `fontWeight`（可选）：调整字体粗细，例如：`"light"`、`"bold"`。
- `italic`（可选）：添加斜体样式，类型：`boolean`。
- `bold`（可选）：添加加粗样式，类型：`boolean`。
- `baselineOffset`（可选）：调整文本基线位置，类型：`number`。
- `kerning`（可选）：调整字符间距，类型：`number`。
- `monospaced`（可选）：使用等宽字体，类型：`boolean`。
- `monospacedDigit`（可选）：确保数字字符宽度一致，类型：`boolean`。
- `underlineColor`（可选）：下划线颜色，类型：`Color`。
- `underlineStyle`（可选）：下划线样式，类型：`UnderlineStyle`。
- `strokeColor`（可选）：文本描边颜色，类型：`Color`。
- `strokeWidth`（可选）：文本描边宽度，类型：`number`。
- `strikethroughColor`（可选）：删除线颜色，类型：`Color`。
- `strikethroughStyle`（可选）：删除线样式，类型：`UnderlineStyle`。
- `foregroundColor`（可选）：文本颜色，类型：`Color`。
- `backgroundColor`（可选）：文本背景颜色，类型：`Color`。
- `content`（必填）：指定文本内容，可以是字符串或字符串与 `StyledText` 对象的数组。
- `link`（可选）：为文本添加超链接，类型：`string`。
- `onTapGesture`（可选）：文本被点击时执行的函数，类型：`() => void`。

***

## **`Text` 组件**

### **描述**

一个视图组件，用于显示一行或多行只读文本。内容可以通过 `TextProps` 中的属性进行样式化。

### **示例用法**

1. **纯文本**
   ```tsx
   <Text font="title">
     你好，世界！
   </Text>
   ```

2. **Markdown 文本**
   ```tsx
   <Text attributedString="这是 **加粗**、_斜体_ 和一个 [链接](https://example.com)。" />
   ```

3. **富文本**
   ```tsx
   const richText: StyledText = {
     font: "body",
     bold: true,
     underlineStyle: "single",
     underlineColor: "#00FF00",
     foregroundColor: "#FF0000",
     content: [
       "部分 1，",
       {
         content: "样式",
         italic: true,
         strokeColor: "#0000FF",
         strokeWidth: 2
       },
       "，部分 2"
     ]
   }

   <Text styledText={richText} />
   ```

***

## 注意事项

- **默认字体**：如果未指定 `font` 属性，将使用系统默认字体。
- **性能**：对于动态或频繁更新的内容，确保 `styledText` 对象是不可变的，以避免不必要的重新渲染。
- **点击手势**：在 `StyledText` 中使用 `onTapGesture` 属性为文本添加交互功能。
