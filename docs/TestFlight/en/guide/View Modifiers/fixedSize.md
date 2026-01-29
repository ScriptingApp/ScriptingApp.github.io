---
title: fixedSize
description: Fixes the size of a view to its ideal dimensions.

---

Fixes the size of a view to its ideal dimensions, preventing the view from being compressed or expanded beyond its natural size.

## Type

```ts
fixedSize?: boolean | {
  horizontal: boolean
  vertical: boolean
}
```

## Overview

The `fixedSize` modifier tells the layout system to size a view according to its ideal content size, rather than allowing it to stretch or shrink to fit the parent’s constraints. This is especially useful when you want text or other content to fully display without being truncated, or to prevent the view from being resized to fill available space.

This modifier behaves similarly to SwiftUI’s [`fixedSize()`](https://developer.apple.com/documentation/swiftui/view/fixedsize%28%29).

## Usage

You can apply `fixedSize` in one of two ways:

### 1. Boolean Form

```tsx
<Text fixedSize>
  This text won't be truncated or compressed.
</Text>
```

This is equivalent to:

```tsx
<Text fixedSize={{ horizontal: true, vertical: true }}>
  This text won't be truncated or compressed.
</Text>
```

### 2. Object Form

Use this to fix only the horizontal or vertical dimensions:

```tsx
<Text fixedSize={{ horizontal: true, vertical: false }}>
  This text won't compress horizontally, but can grow or shrink vertically.
</Text>
```

## Behavior

* `horizontal: true`: Prevents the view from compressing or expanding horizontally. Ideal for avoiding text truncation.
* `vertical: true`: Prevents the view from compressing or expanding vertically.
* When both are `false`, the modifier has no effect.
* If a parent container attempts to resize the view, the fixed dimensions take precedence, and the view will remain at its ideal size in those axes.

## Example

```tsx
<VStack>
  <Text fixedSize>
    Long text that should wrap and never be truncated or compressed.
  </Text>
  <Text fixedSize={{ horizontal: true, vertical: false }}>
    This text can grow vertically but keeps its natural width.
  </Text>
</VStack>
```

## Notes

* Common use cases include making sure `Text` views don’t get truncated or `HStack`/`VStack` layouts don’t force views to resize.
* When using this modifier, be mindful of the parent layout, as it may cause content to overflow if not handled properly.
