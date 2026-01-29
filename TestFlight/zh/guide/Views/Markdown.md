# Markdown

`Markdown` 是一个用于渲染 Markdown 格式文本的视图组件，可在脚本的用户界面中显示富文本内容、代码块、文档说明等。它支持多种显示主题以及代码语法高亮样式，非常适合展示格式化文档、日志、开发说明等信息。

***

## 导入方式

```ts
import { Markdown } from "scripting";
```

***

## 基本用法

```tsx
<Markdown content="# 你好\n这是一个 **Markdown** 视图。" />
```

***

## 参数说明（Props）

### `content: string` **(必填)**

要显示的 Markdown 格式文本内容。支持标准 Markdown 语法。

```tsx
<Markdown content="## 特性\n- 支持 **加粗**、*斜体* 和 `代码块`。" />
```

***

### `theme?: 'basic' | 'github' | 'docC'`

设置 Markdown 内容的整体主题风格，可选值包括：

- `'basic'`：简洁、通用的默认样式。
- `'github'`：GitHub 风格，适合开发文档或代码说明。
- `'docC'`：仿照 Apple DocC 的文档风格。

```tsx
<Markdown content="**Hello**" theme="docC" />
```

***

### `highlighterTheme?: 'midnight' | 'presentation' | 'sundellsColors' | 'sunset' | 'wwdc17' | 'wwdc18'`

设置 Markdown 中代码块的语法高亮主题。如果未设置，默认不使用高亮主题。

可选值包括：

- `'midnight'`
- `'presentation'`
- `'sundellsColors'`
- `'sunset'`
- `'wwdc17'`
- `'wwdc18'`

````tsx
<Markdown content="```js\nconsole.log('Hello')\n```" highlighterTheme="wwdc18" />
````

***

### `useDefaultHighlighterTheme?: boolean`

是否使用系统默认的语法高亮主题。启用后，系统会根据当前的浅色或深色模式自动切换主题。

> ⚠️ 如果设置了 `highlighterTheme`，此配置将被忽略。

````tsx
<Markdown
  content="```swift\nprint(\"你好\")\n```"
  useDefaultHighlighterTheme={true}
/>
````

***

### `scrollable?: boolean`

默认值：`true`

控制 Markdown 视图是否可滚动。如果希望将其嵌入到其他可滚动容器中，可设置为 `false`。

```tsx
<Markdown content="# 标题" scrollable={false} />
```

***

## 示例

```tsx
<Markdown
  content={`
## 欢迎使用 Scripting

以下是一个简单的示例：

\`\`\`ts
const hello = "world"
console.log(hello)
\`\`\`
  `}
  theme="github"
  highlighterTheme="sunset"
/>
```
