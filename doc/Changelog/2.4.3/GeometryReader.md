`GeometryReader` in Scripting is the equivalent of SwiftUI’s GeometryReader. It provides layout information about the container in which its content is placed, including size, safe-area insets, and (on supported systems) container corner insets.

This component is essential for building responsive layouts that depend on the parent container’s geometry.

***

# GeometryProxy

When `GeometryReader` constructs its child content, it injects a `GeometryProxy` instance into the `children` callback. This proxy exposes real-time layout information about the container.

```ts
interface GeometryProxy {
  readonly size: Size;
  readonly safeAreaInsets: {
    leading: number;
    top: number;
    trailing: number;
    bottom: number;
  };
  /**
   * Requires iOS 26.0+.
   */
  readonly containerCornerInsets: {
    bottomLeading: Size;
    bottomTrailing: Size;
    topLeading: Size;
    topTrailing: Size;
  } | null;
}
```

***

# GeometryProxy Properties

## 1. size

```ts
readonly size: Size
```

The actual size of the container during layout.

### Size structure

```ts
type Size = {
  width: number
  height: number
}
```

Use this property when calculating adaptive layout behavior, such as scaling, alignment, or proportional spacing.

***

## 2. safeAreaInsets

```ts
readonly safeAreaInsets: {
  leading: number
  top: number
  trailing: number
  bottom: number
}
```

Represents the safe-area insets of the current container.
This ensures content does not overlap with the device notch, home indicator, or other system UI elements.

### Common use cases

- Adjusting content away from the screen edges
- Implementing custom navigation bars or toolbars
- Ensuring layout compatibility across devices

***

## 3. containerCornerInsets (iOS 26.0+)

```ts
readonly containerCornerInsets: {
  bottomLeading: Size
  bottomTrailing: Size
  topLeading: Size
  topTrailing: Size
} | null
```

Available only on **iOS 26+**.
Provides layout insets corresponding to the physical or visual rounded corners of the container.

### Use cases

- Adapting UI for windowed environments
- Handling rounded container corners (Stage Manager, split view, floating scenes)
- Performing precision layout aligned to dynamic corner geometry

If the platform does not support it, the value will be `null`.

***

# GeometryReader Component

```ts
type GeometryReaderProps = {
  children: (proxy: GeometryProxy) => VirtualNode;
};
declare const GeometryReader: FunctionComponent<GeometryReaderProps>;
```

## Props

| Name     | Type                                    | Required | Description                                                               |
| -------- | --------------------------------------- | -------- | ------------------------------------------------------------------------- |
| children | `(proxy: GeometryProxy) => VirtualNode` | Yes      | A callback that receives the geometry proxy and returns the view content. |

***

# Behavior

1. GeometryReader occupies the available space in its parent.
2. During layout, it computes size, safe-area insets, and corner insets.
3. It passes these values to the `children(proxy)` callback.
4. The returned VirtualNode content is laid out using these values.

This behavior matches SwiftUI’s GeometryReader model.

***

# Example: Centered Content

```tsx
import { GeometryReader, Text, VStack } from "scripting"

function View() {
  return <GeometryReader>
    {(proxy) => {
      return <VStack
        frame={{
          width: proxy.size.width,
          height: proxy.size.height,
          alignment: "center"
        }}
      >
        <Text>Hello Geometry</Text>
        <Text>
          width: {proxy.size.width}
        </Text>
        <Text>
          height: {proxy.size.height}
        </Text>
      </VStack>
    }}
  </GeometryReader>
}
```

***

# Example: Adjusting Layout by Safe Area

```tsx
<GeometryReader>
  {(proxy) => {
    return <VStack
      padding={{
        top: proxy.safeAreaInsets.top,
        bottom: proxy.safeAreaInsets.bottom
      }}
    >
      <Text>Content inside safe area.</Text>
    </VStack>
  }}
</GeometryReader>
```

***

# Example (iOS 26+): Using containerCornerInsets

```tsx
<GeometryReader>
  {(proxy) => {
    const corners = proxy.containerCornerInsets
    return <Text>
      {corners == null
        ? "Corner insets not available"
        : `Top Leading Corner: ${corners.topLeading.width}, ${corners.topLeading.height}`
      }
    </Text>
  }}
</GeometryReader>
```

***

# Best Practices

- Use GeometryReader only when needed, as it creates a flexible layout container.
- Prefer using it for adaptive, responsive layouts where container size matters.
- Avoid placing complex or deeply nested views inside GeometryReader unless required.
