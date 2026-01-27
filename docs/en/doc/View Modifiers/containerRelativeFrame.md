---
title: containerRelativeFrame

---

Positions the view within an invisible frame whose size and position are relative to its nearest container. This modifier is especially useful when working with container views like `ScrollView`, `Grid`, or layout stacks to achieve proportional layout behavior.

## Type

```ts
containerRelativeFrame?: {
  axes: AxisSet
  alignment?: Alignment
  count: never
  span: never
  spacing: never
} | {
  axes: AxisSet
  alignment?: Alignment
  count: number
  span?: number
  spacing: number
}
```

---

## Description

This modifier allows a view to size and position itself based on its container’s dimensions. It is often used to create layouts where the view should occupy a specific fraction of the available space or follow container-aligned scrolling behavior.

---

## Properties

* **`axes`** (`AxisSet`, required)
  The axes (`horizontal`, `vertical`, or `all`) along which to apply the relative sizing and positioning.

* **`alignment`** (`Alignment`, optional, default: `"center"`)
  The alignment of the view within its container-relative frame.

* **`count`** (`number`, optional in second form)
  The number of equal-sized segments to divide the container's space into.

* **`span`** (`number`, optional, default: `1`)
  The number of segments the view should span within the container.

* **`spacing`** (`number`, required in second form)
  The spacing between views laid out using this modifier.

---

## Behavior

There are two configuration modes:

1. **Auto-Sizing Mode**
   The view positions itself within a relative container frame without defining how the space is divided.

   ```tsx
   containerRelativeFrame={{
     axes: 'horizontal',
     alignment: 'leading'
   }}
   ```

2. **Grid-Like Division Mode**
   The container is divided into equal parts, and each view can occupy one or more spans with spacing.

   ```tsx
   containerRelativeFrame={{
     axes: 'horizontal',
     count: 4,
     span: 2,
     spacing: 10
   }}
   ```

---

## Example

```tsx
<HStack>
  <Text
    containerRelativeFrame={{
      axes: 'horizontal',
      count: 3,
      span: 1,
      spacing: 8,
      alignment: 'center'
    }}
  >
    One Third
  </Text>
</HStack>
```

This example places the text in a frame that takes up one-third of the container’s width with spacing of 8 points between items.

---

## See Also

* [Apple Documentation](https://developer.apple.com/documentation/swiftui/view/containerrelativeframe%28_:alignment:%29)
* [Hacking with Swift: containerRelativeFrame](https://www.hackingwithswift.com/quick-start/swiftui/how-to-adjust-the-size-of-a-view-relative-to-its-container)
