---
title: Text View Modifiers
description: The properties allows you to customize the layout and appearance of a text or label view.

---

The following properties allow you to style and format text-based views, such as `Text` or `Label`, in ways that closely mirror SwiftUI’s built-in modifiers. By customizing these properties, you can control the font, weight, design, spacing, and other typographic attributes of the displayed text.

## Overview

These properties are generally passed to text-related views like `Text` or `Label` components as attributes. For example, you can specify a font size, enable bold formatting, or add an underline with a custom color—all without manually calling multiple modifiers.

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

In the example above, the text uses a custom font, semibold weight, italic style, a red underline, limits to two lines, and centers the text.

---

## Font Configuration

### `font`

Defines the font and size to apply to the text.

- **Number**: When you provide a number (e.g., `14`), it applies the system font at that size.
- **Preset Font Name** (`Font` type): Use one of the built-in text styles (`"largeTitle"`, `"title"`, `"headline"`, `"subheadline"`, `"body"`, `"callout"`, `"footnote"`, `"caption"`). The system determines the size and weight based on that style.
- **Object with name and size**: Apply a custom font by specifying the `name` and `size`.

```tsx
<Text font={20}>System Font, Size 20</Text>
<Text font="headline">System Headline Font</Text>
<Text font={{ name: "CustomFontName", size: 16 }}>Custom Font</Text>
```

---

### `fontWeight`

Sets the thickness of the font’s stroke. Options range from `"ultraLight"` to `"black"`.

```tsx
<Text fontWeight="bold">Bold Text</Text>
```

---

### `fontWidth`

Specifies the width variant of the font if available. Possible values include `"compressed"`, `"condensed"`, `"expanded"`, and `"standard"`. You can also use a numeric value if supported.

```tsx
<Text fontWidth="condensed">Condensed Width Font</Text>
```

---

### `fontDesign`

Modifies the font design. Options include `"default"`, `"monospaced"`, `"rounded"`, `"serif"`.

```tsx
<Text fontDesign="rounded">Rounded Font Design</Text>
```

---

## Text Formatting

### `minScaleFactor`

A number between 0 and 1 that indicates how much the text can shrink if it doesn’t fit the available space. For example, `0.5` means the text can shrink down to 50% of its original size to fit.

```tsx
<Text minScaleFactor={0.8}>This text shrinks slightly if it doesn't fit.</Text>
```

---

### `bold`

Applies a bold font weight if `true`.

```tsx
<Text bold>This text is bold</Text>
```

---

### `baselineOffset`

Adjusts the text’s vertical position relative to its baseline. Positive values move the text up, negative values move it down.

```tsx
<Text baselineOffset={5}>Text shifted up</Text>
```

---

### `kerning`

Controls the spacing between characters. A positive value increases spacing; a negative value decreases it.

```tsx
<Text kerning={2}>Extra spaced text</Text>
```

---

### `italic`

Applies an italic style if `true`.

```tsx
<Text italic>Italic text</Text>
```

---

### `monospaced`

Forces all child text to use a monospaced variant, if available.

```tsx
<Text monospaced>Monospaced text</Text>
```

---

### `monospacedDigit`

Uses fixed-width digits while leaving other characters as they are. This helps align numbers vertically, useful for tables or timers.

```tsx
<Text monospacedDigit>Digits aligned in monospace 1234</Text>
```

---

## Text Decorations

### `strikethrough`

Applies a strikethrough (line through the text). You can provide a color, or an object specifying a pattern and color.

- **Color only**: `strikethrough="red"`
- **Object**: `strikethrough={{ pattern: 'dash', color: 'blue' }}`

```tsx
<Text strikethrough="gray">Strikethrough text in gray</Text>
<Text strikethrough={{ pattern: 'dot', color: 'red' }}>Dotted red strikethrough</Text>
```

---

### `underline`

Applies an underline in a similar way to `strikethrough`.

- **Color only**: `underline="blue"`
- **Object**: `underline={{ pattern: 'dashDot', color: 'green' }}`

```tsx
<Text underline="blue">Underlined text in blue</Text>
<Text underline={{ pattern: 'dot', color: 'pink' }}>Dotted pink underline</Text>
```

---

## Line & Layout Control

### `lineLimit`

Specifies how many lines of text can display. You can provide:

- A single number for a maximum line limit.
- An object `{ min?: number; max: number; reservesSpace?: boolean }` to specify a minimum and maximum number of lines, and whether the text should reserve space for all those lines even when not used.

```tsx
<Text lineLimit={1}>This text will be truncated if it doesn't fit on one line.</Text>
<Text lineLimit={{ min: 2, max: 4, reservesSpace: true }}>
  This text can display between 2 and 4 lines, and always reserves space for 4 lines, preventing layout shifts.
</Text>
```

---

### `lineSpacing`

Sets the spacing between lines, in pixels.

```tsx
<Text lineSpacing={5}>Line spacing set to 5 pixels</Text>
```

---

### `multilineTextAlignment`

Sets the text alignment for multi-line text: `"leading"`, `"center"`, or `"trailing"`.

```tsx
<Text multilineTextAlignment="center">
  This text is centered across multiple lines.
</Text>
```

---

### `truncationMode`

Specifies how to truncate a line of text when it is too long to fit within the available horizontal space.

#### Type

```ts
type TruncationMode = "head" | "middle" | "tail"
```

#### Description

Defines the position at which the text is truncated:

 - `"head"`: Truncates the beginning of the line, preserving the end.

 - `"middle"`: Truncates the middle of the line, preserving both the beginning and end.

 - `"tail"`: Truncates the end of the line, preserving the beginning.

```tsx
<Text
  truncationMode="middle"
>
  This is a very long piece of text that may be truncated.
</Text>
```

---

### `allowsTightening?: boolean`

Determines whether the system is allowed to reduce the spacing between characters to fit the text within a line when needed.

#### Type
`boolean`

#### Default
`false`

#### Description
When set to true, the system may compress the character spacing to avoid truncation and better fit the content. This is typically used to improve layout responsiveness in constrained environments.

```tsx
<Text
  allowsTightening={true}
>
  Condensed text if necessary
</Text>
```

---

## Summary

By combining these properties, you can fully control the typography of your text-based views without needing multiple wrapper components or modifiers. Whether you need a bold, italic headline font with custom kerning and underline, or a simple body font that truncates after two lines, these options cover a broad range of text styling needs.