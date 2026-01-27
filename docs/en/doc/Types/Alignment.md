---
title: Alignment

---

The `Alignment` type defines how to position content within a view’s frame, mirroring the behavior of SwiftUI’s built-in alignments. By applying an `Alignment` value, you can control where elements will be placed if they have extra space or need to align in a specific way.

## Overview

`Alignment` is useful when you have containers like `VStack`, `HStack`, `ZStack`, or any layout that involves stacking, layering, or positioning multiple views. By choosing an alignment, you tell the layout system how to position these views relative to each other or their container.

For example, a `ZStack` with a `topLeading` alignment will place its content toward the top-left corner of the container, while a `bottomTrailing` alignment puts it toward the bottom-right corner.

## Available Alignments

- **Basic Alignments:**
  - **`top`**: Aligns content along the top edge.
  - **`center`**: Centers content both horizontally and vertically.
  - **`bottom`**: Aligns content along the bottom edge.
  - **`leading`**: Aligns content along the leading edge (left side in left-to-right languages).
  - **`trailing`**: Aligns content along the trailing edge (right side in left-to-right languages).

- **Compound Alignments:**
  - **`topLeading`**: Aligns content at the top and leading edges.
  - **`topTrailing`**: Aligns content at the top and trailing edges.
  - **`bottomLeading`**: Aligns content at the bottom and leading edges.
  - **`bottomTrailing`**: Aligns content at the bottom and trailing edges.

- **Text Baseline Alignments:**
  Baseline alignments are useful when arranging text-containing views so their text aligns at a common baseline.
  - **`centerFirstTextBaseline`**
  - **`centerLastTextBaseline`**
  - **`leadingFirstTextBaseline`**
  - **`leadingLastTextBaseline`**
  - **`trailingFirstTextBaseline`**
  - **`trailingLastTextBaseline`**

## Example Usage

**Center Alignment**

```tsx
<ZStack alignment="center">
  <Rectangle fill="gray" frame={{width: 100, height: 100}} />
  <Text font="title">Centered Text</Text>
</ZStack>
```

In this example, the `Text` will be centered within the `Rectangle`.

**Top Leading Alignment**

```tsx
<ZStack alignment="topLeading">
  <Rectangle fill="gray" frame={{width: 200, height: 200}} />
  <Text>I'm at the top-left!</Text>
</ZStack>
```

Here, the `Text` appears in the top-left corner of the gray rectangle.

**Baseline Alignment with HStack**

```tsx
<HStack alignment="leadingFirstTextBaseline">
  <Text font="largeTitle">Big Title</Text>
  <Text font="title">Smaller Subtitle</Text>
</HStack>
```

This aligns the two texts so that their first lines of text share a baseline, keeping them visually aligned even though they’re different sizes.

## Summary

`Alignment` gives you fine-grained control over how content is positioned within a container. By selecting the appropriate alignment—whether it’s a basic edge-based alignment or a more advanced text-baseline alignment—you ensure your UI elements look visually coherent and intuitive.