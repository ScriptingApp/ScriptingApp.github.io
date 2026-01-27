---
title: Markdown
---

The `Markdown` component renders styled Markdown content within your script’s user interface. It supports different visual themes and syntax highlighter styles for displaying code blocks, making it ideal for rendering documentation, previews, or custom rich-text content.

---

## Import

```ts
import { Markdown } from "scripting";
```

---

## Usage

```tsx
<Markdown content="# Hello\nThis is a **markdown** view." />
```

---

## Props

### `content: string` **(required)**

The Markdown-formatted text to display. This should follow standard Markdown syntax.

```tsx
<Markdown content="## Features\n- Supports **bold**, *italic*, and `code` blocks." />
```

---

### `theme?: 'basic' | 'github' | 'docC'`

Sets the visual theme for the Markdown content. Available options:

- `'basic'`: A simple, neutral theme.
- `'github'`: GitHub-style styling (default for code-like docs).
- `'docC'`: A theme inspired by Apple's DocC documentation style.

```tsx
<Markdown content="**Hello**" theme="docC" />
```

---

### `highlighterTheme?: 'midnight' | 'presentation' | 'sundellsColors' | 'sunset' | 'wwdc17' | 'wwdc18'`

Specifies a syntax highlighting theme for code blocks within the Markdown content. If not set, no highlighting theme is applied by default.

Available options:

- `'midnight'`
- `'presentation'`
- `'sundellsColors'`
- `'sunset'`
- `'wwdc17'`
- `'wwdc18'`

````tsx
<Markdown content="```js\nconsole.log('Hello')\n```" highlighterTheme="wwdc18" />
````

---

### `useDefaultHighlighterTheme?: boolean`

If set to `true`, the Markdown view will automatically use the default highlighter theme based on the system’s color scheme (light or dark).

> ⚠️ This has no effect if `highlighterTheme` is explicitly set.

````tsx
<Markdown
  content="```swift\nprint(\"Hello\")\n```"
  useDefaultHighlighterTheme={true}
/>
````

---

### `scrollable?: boolean`

Default: `true`

Controls whether the Markdown view is scrollable. Set to `false` to embed static Markdown content in a fixed area (e.g. inside a scrollable parent container).

```tsx
<Markdown content="# Title" scrollable={false} />
```

---

## Example

```tsx
<Markdown
  content={`
## Welcome to Scripting

Here's a quick example:

\`\`\`ts
const hello = "world"
console.log(hello)
\`\`\`
  `}
  theme="github"
  highlighterTheme="sunset"
/>
```
