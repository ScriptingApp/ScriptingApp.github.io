# Scroll views

The `ScrollView` component displays its content within a scrollable region. As the user performs scroll gestures, the visible portion of the content is updated accordingly. You can scroll vertically, horizontally, or in both directions using the `axes` prop.

## Type

```ts
type ScrollViewProps = {
  axes?: AxisSet
  children?: VirtualNode | VirtualNode[] | (VirtualNode | undefined | null)[]
}
```

## Overview

- Scroll direction is controlled by the `axes` property.
- Contents are placed inside children, typically using layouts like `<VStack>` or `<HStack>`.
- Zooming is not supported.

## Default Behavior

- The default scroll axis is **vertical**.
- Scroll indicators are shown based on platform conventions unless configured via modifiers.

## Example

```tsx
<ScrollView>
  <VStack>
    {new Array(100).fill('').map((_, index) => (
      <Text>Row {index}</Text>
    ))}
  </VStack>
</ScrollView>
```

***

## ScrollView Modifiers

You can apply the following view modifiers to configure scroll-related behavior.

***

## `scrollIndicator`

Controls the visibility of scroll indicators.

### Type

```ts
scrollIndicator?: ScrollScrollIndicatorVisibility | {
  visibility: ScrollScrollIndicatorVisibility
  axes: AxisSet
}
```

### `ScrollScrollIndicatorVisibility` options:

- `"automatic"`: Follows platform default behavior.
- `"visible"`: Indicators appear but may auto-hide based on OS behavior.
- `"hidden"`: Hidden unless overridden by system behavior.
- `"never"`: Never show indicators.

### Example

```tsx
<ScrollView scrollIndicator="never">
  <VStack>{/* content */}</VStack>
</ScrollView>
```

With axis-specific visibility:

```tsx
<ScrollView
  scrollIndicator={{
    visibility: "hidden",
    axes: "vertical"
  }}
>
  <VStack>{/* content */}</VStack>
</ScrollView>
```

***

## `scrollDisabled`

Enables or disables scrolling behavior entirely.

### Type

```ts
scrollDisabled?: boolean
```

### Example

```tsx
<ScrollView scrollDisabled>
  <Text>This scroll view is locked.</Text>
</ScrollView>
```

***

## `scrollClipDisabled`

Controls whether the scroll view clips content that extends beyond its bounds.

### Type

```ts
scrollClipDisabled?: boolean
```

### Example

```tsx
<ScrollView scrollClipDisabled>
  {/* Content may overflow scroll bounds visually */}
</ScrollView>
```

***

## `scrollDismissesKeyboard`

Determines how the scroll interaction affects the software keyboard.

### Type

```ts
scrollDismissesKeyboard?: ScrollDismissesKeyboardMode
```

### Options

- `"automatic"`: Default behavior based on context.
- `"immediately"`: Dismiss keyboard as soon as scrolling starts.
- `"interactively"`: Allow user to drag to dismiss keyboard.
- `"never"`: Scrolling will not dismiss the keyboard.

### Example

```tsx
<ScrollView scrollDismissesKeyboard="interactively">
  {/* Content with text input */}
</ScrollView>
```

***

## `defaultScrollAnchor`

Defines which point in the content should be visible initially or stay anchored when content size changes.

### Type

```ts
defaultScrollAnchor?: KeywordPoint | Point
```

### `KeywordPoint` values

- `"top"`, `"bottom"`, `"leading"`, `"trailing"`, `"center"`, `"topLeading"`, `"bottomTrailing"` etc.

### Example

```tsx
<ScrollView defaultScrollAnchor="bottom">
  <VStack>
    {/* New content will appear anchored to the bottom */}
  </VStack>
</ScrollView>
```

***

## `AxisSet`

Defines the scrollable directions for a scroll view.

### Type

```ts
type AxisSet = 'vertical' | 'horizontal' | 'all'
```

### Usage

```tsx
<ScrollView axes="horizontal">
  <HStack>{/* horizontally scrollable content */}</HStack>
</ScrollView>
```

***

## `scrollTargetLayout`

Applies this modifier to layout containers such as LazyHStack, LazyVStack, HStack, or VStack that represent the main repeating content inside a ScrollView.

### Type

```ts
scrollTargetLayout?: boolean
```

### Usage

When set to `true`, this modifier designates the associated layout container as a scroll target region within the `ScrollView`. It allows the scroll behavior system to determine how scrolling should align to elements within the container.

```tsx
<ScrollView axes="horizontal">
  <LazyHStack scrollTargetLayout>
    {items.map(item => <Text>{item.title}</Text>)}
  </LazyHStack>
</ScrollView>
```

***

## `scrollTargetBehavior`

Defines how scrollable views behave when aligning content to scroll targets.

### Type

```ts
scrollTargetBehavior?: ScrollTargetBehavior
```

```ts
type ScrollTargetBehavior =
  | "paging"
  | "viewAligned"
  | "viewAlignedLimitAutomatic"
  | "viewAlignedLimitAlways"
  | "viewAlignedLimitNever"
  | "viewAlignedLimitAlwaysByFew"
  | "viewAlignedLimitAlwaysByOne"
```

#### Description of Variants

- **`"paging"`**: Scrolls one page at a time, aligned to the container’s dimensions.
- **`"viewAligned"`**: Scrolls to align views directly, based on view frames.
- **`"viewAlignedLimitAutomatic"`**: Limits scrolling in compact horizontal size classes, but allows full scrolling otherwise.
- **`"viewAlignedLimitAlways"`**: Always restricts scrolling to a limited number of items.
- **`"viewAlignedLimitNever"`**: Allows unrestricted scrolling without view-based limitations.
- **`"viewAlignedLimitAlwaysByFew"`** _(iOS 18.0+)_: Limits scrolling to a small number of views per gesture, automatically determined.
- **`"viewAlignedLimitAlwaysByOne"`** _(iOS 18.0+)_: Restricts each scroll gesture to advance exactly one view at a time.

### Description

This modifier configures the scroll behavior, such as paging and alignment strategy, for views within a scrollable container.

***

## `scrollContentBackground`

Specifies the visibility of the background for scrollable views, such as `ScrollView`, within the current view context.

### Type

```ts
scrollContentBackground?: Visibility
```

### Description

This modifier controls whether the default background behind scrollable content (typically a system-provided background) is shown, hidden, or determined automatically based on system behavior.

It is commonly used when customizing the appearance of scrollable views or when layering custom backgrounds behind scroll content.

### Visibility Options

- **`'automatic'`**
  The system decides whether the background should be visible based on the current context and platform conventions.

- **`'hidden'`**
  Hides the scroll view’s default background, allowing custom background layers or transparent effects.

- **`'visible'`**
  Forces the default scroll content background to be shown, even if a custom background is present.

### Example: Hiding Scroll Background

```tsx
<List scrollContentBackground="hidden">
  <Text>No background here</Text>
</List>
```

This example removes the default background from the scroll view, making it fully transparent or allowing underlying views to show through.

***

## Summary

| Modifier / Prop           | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| `axes`                    | Defines scroll direction (`vertical`, `horizontal`, or `all`)            |
| `scrollIndicator`         | Controls scroll indicator visibility and supports axis-specific config   |
| `scrollDisabled`          | Disables scrolling entirely when set to `true`                           |
| `scrollClipDisabled`      | Prevents clipping of content that overflows the scroll bounds            |
| `scrollDismissesKeyboard` | Configures how scrolling interacts with the software keyboard            |
| `defaultScrollAnchor`     | Sets the initial or persistent scroll anchor point in the content        |
| `scrollTargetLayout`      | Marks a container (like `LazyHStack`) as the scroll target for alignment |
| `scrollTargetBehavior`    | Determines how content aligns and scrolls within the scroll view         |
| `scrollContentBackground` | Sets the visibility of the scroll view’s default background              |
