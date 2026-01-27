---
title: SVG

---

The `SVG` component is used to display SVG (Scalable Vector Graphics) images. It supports loading SVG content from the following sources:

* A **remote URL**
* A **local file path**
* **Inline SVG code**

SVGs are rendered as bitmap images. You can choose to render them in **template mode** to apply tint colors using `foregroundColor`.

---

## Import

```tsx
import { SVG } from 'scripting'
```

---

## Props

### Image Source (choose exactly one)

| Prop       | Type                                   | Description                            |
| ---------- | -------------------------------------- | -------------------------------------- |
| `url`      | `string \| DynamicImageSource<string>` | Displays an SVG from a network URL     |
| `filePath` | `string \| DynamicImageSource<string>` | Displays an SVG from a local file path |
| `code`     | `string \| DynamicImageSource<string>` | Displays an SVG from inline SVG code   |

> These three props are mutually exclusive — only one should be provided.

---

### Rendering Behavior (`ImageRenderingBehaviorProps`)

| Prop                          | Type                                        | Default      | Description                                                     |
| ----------------------------- | ------------------------------------------- | ------------ | --------------------------------------------------------------- |
| `resizable`                   | `boolean \| object`                         | `false`      | Controls whether the image resizes to fit its frame (see below) |
| `renderingMode`               | `'original' \| 'template'`                  | `'original'` | Use `"template"` to allow tinting via `foregroundColor`         |
| `interpolation`               | `'none' \| 'low' \| 'medium' \| 'high'`     | `'medium'`   | Sets interpolation quality when scaling the image               |
| `antialiased`                 | `boolean`                                   | `false`      | Whether the image should use anti-aliasing                      |
| `widgetAccentedRenderingMode` | `WidgetAccentedRenderingMode` (Widget-only) | —            | Defines how the image renders in Widget accented mode           |

---

### `resizable` Prop Details

| Type                          | Meaning                                                                    |
| ----------------------------- | -------------------------------------------------------------------------- |
| `true`                        | Image resizes to fit its container (stretch)                               |
| `false`                       | Image maintains original size                                              |
| `{ capInsets, resizingMode }` | Allows defining cap insets and resizing mode (for 9-patch or tiled images) |

---

## Examples

### Display SVG from a local file (template mode with tint)

```tsx
<SVG
  filePath="/path/to/local/image.svg"
  resizable
  frame={{ width: 50, height: 50 }}
  renderingMode="template"
  foregroundColor="red"
/>
```

---

### Display SVG from inline code

```tsx
<SVG
  code={`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  </svg>`}
  frame={{ width: 100, height: 100 }}
/>
```

---

## Notes

* SVGs are now rendered **as bitmap images** only.
* The `vectorDrawing` prop has been removed and is no longer supported.
* To apply tinting, use `renderingMode="template"` along with `foregroundColor`.
* Only one of `url`, `filePath`, or `code` may be specified at a time.