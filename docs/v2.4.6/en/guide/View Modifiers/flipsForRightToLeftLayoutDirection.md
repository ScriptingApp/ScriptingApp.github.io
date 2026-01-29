---
title: flipsForRightToLeftLayoutDirection
description: Determines whether the view should horizontally mirror its contents when the system layout direction is right-to-left (RTL).

---

Determines whether the view should horizontally mirror its contents when the system layout direction is right-to-left (RTL), such as when the user interface is set to a right-to-left language (e.g., Arabic or Hebrew).

## Type

`flipsForRightToLeftLayoutDirection?: boolean`

## Description

When set to `true`, this modifier causes the view to flip its horizontal layout to match the RTL direction, aligning the visual appearance with the reading flow of right-to-left languages. This is especially useful for custom views or components that require explicit mirroring behavior in internationalized layouts.

When set to `false`, the view maintains its left-to-right layout regardless of the system layout direction.

## Default

`false` (The view does not flip by default unless explicitly configured.)

## Example

```tsx
<Image
  filePath="path/to/icon.png"
  flipsForRightToLeftLayoutDirection={true}
/>
```

In this example, the image will automatically flip its horizontal orientation when displayed in a right-to-left layout environment.
