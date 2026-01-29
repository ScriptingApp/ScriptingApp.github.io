---
title: frame
description: This property defines the size and alignment of a view.

---

The `frame` property defines the size and alignment of a view. You can specify it in one of two formats:

---

#### 1. Fixed Width and Height

```ts
frame?: {
  width?: number
  height?: number
  alignment?: Alignment
}
```

This format allows you to specify a fixed width and/or height for the view, as well as how it is aligned within that frame.

##### Example

```tsx
<VStack
  frame={{
    width: 100,
    height: 100,
    alignment: 'center'
  }}
>
  <Text>Fixed size</Text>
</VStack>
```

---

#### 2. Flexible Frame Constraints

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

This format gives more control over layout by specifying minimum, maximum, and ideal dimensions for the frame. These values can be numeric or `'infinity'`, which instructs the view to expand to fill available space.

##### Example

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
  <Text>Expandable width</Text>
</HStack>
```

---

## Alignment

The `alignment` property determines how the view is positioned within the frame. Common alignment values include:

* `'center'`
* `'top'`
* `'bottom'`
* `'leading'`
* `'trailing'`
* `'topLeading'`
* `'topTrailing'`
* `'bottomLeading'`
* `'bottomTrailing'`

> **Note**: Alignment only affects layout when the frame size exceeds the view’s natural size.

##### Example

```tsx
<Text
  frame={{
    width: 200,
    height: 100,
    alignment: 'bottomTrailing'
  }}
>
  Aligned Text
</Text>
```

---

## Best Practices

* Use the fixed `width` and `height` format when you want precise dimensions.
* Use the flexible format with `min` / `max` / `ideal` values when working with responsive layouts.
* Avoid specifying both `width`/`height` and `minWidth`/`maxWidth`, etc., in the same frame object — choose one format to avoid conflicts.

---

## Summary

The `frame` property in `CommonViewProps` allows fine-grained control over layout sizing and alignment, closely mirroring SwiftUI’s native `frame` modifier. Use it to design clean and adaptable interfaces across different screen sizes.
