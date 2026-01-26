# HStack

The `HStack` component in the Scripting app provides a convenient way to arrange views horizontally with flexible alignment and spacing options. This component is essential for creating layouts that require side-by-side positioning of subviews.

***

## `HStackProps`

### Properties

1. **`alignment`** (optional)
   - **Type**: `VerticalAlignment`
   - **Description**: Specifies the vertical alignment of the subviews within the stack. Each subview is aligned according to the same vertical screen coordinate.
   - **Default Value**: `"center"`
   - **Options**:
     - `"top"`: Align subviews to the top edge.
     - `"center"`: Align subviews to the vertical center.
     - `"bottom"`: Align subviews to the bottom edge.
     - `"firstTextBaseline"`: Align subviews to the first text baseline.
     - `"lastTextBaseline"`: Align subviews to the last text baseline.
   - **Example**:
     ```tsx
     <HStack alignment="top">
       <Text>Item 1</Text>
       <Text>Item 2</Text>
     </HStack>
     ```

2. **`spacing`** (optional)
   - **Type**: `number`
   - **Description**: Specifies the distance between adjacent subviews. If not provided, the stack automatically determines the default spacing.
   - **Default Value**: `undefined` (uses default spacing)
   - **Example**:
     ```tsx
     <HStack spacing={15}>
       <Text>Item 1</Text>
       <Text>Item 2</Text>
     </HStack>
     ```

3. **`children`** (optional)
   - **Type**:
     ```ts
     (VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode | undefined
     ```
   - **Description**: Specifies the subviews to be arranged in the stack. It can accept a single child, multiple children, or nested arrays of children.
   - **Example**:
     ```tsx
     <HStack>
       <Text>Item 1</Text>
       <Text>Item 2</Text>
       <Text>Item 3</Text>
     </HStack>
     ```

***

## `VerticalAlignment`

`VerticalAlignment` is an enumerated type that specifies how subviews are aligned vertically in an `HStack`.

### Options:

- **`"top"`**: Aligns the top edge of subviews.
- **`"center"`**: Aligns subviews along the vertical center axis.
- **`"bottom"`**: Aligns the bottom edge of subviews.
- **`"firstTextBaseline"`**: Aligns subviews to the first baseline of the text content.
- **`"lastTextBaseline"`**: Aligns subviews to the last baseline of the text content.

***

## **`HStack` Component**

### Description

The `HStack` component is a layout container that arranges its subviews in a horizontal line. It provides options for aligning views vertically and specifying the spacing between them.

### Syntax

```tsx
<HStack alignment="center" spacing={10}>
  {children}
</HStack>
```

### Example 1: Basic Horizontal Stack

```tsx
function Example1() {
  return (
    <HStack>
      <Text>Item 1</Text>
      <Text>Item 2</Text>
      <Text>Item 3</Text>
    </HStack>
  )
}
```

### Example 2: Custom Spacing and Alignment

```tsx
function Example2() {
  return (
    <HStack alignment="bottom" spacing={20}>
      <Text>Aligned Bottom</Text>
      <Text>With Spacing</Text>
    </HStack>
  )
}
```

### Example 3: Complex Children

```tsx
function Example3() {
  return (
    <HStack spacing={10}>
      {[1, 2, 3].map((item) => (
        <Text key={item.toString()}>Item {item}</Text>
      ))}
    </HStack>
  )
}
```

### Notes:

- Ensure that all child components passed to `HStack` are valid `VirtualNode` elements.
- For advanced layouts, combine `HStack` with other components like `VStack` or `Spacer`.

### See Also:

- `VStack` for vertical stacking of views.
- `Spacer` to create flexible spacing in stacks.
- `Text` for rendering text content.

***

### Diagram

The following diagram shows how vertical alignments work within an `HStack`:

![Vertical Alignment](https://docs-assets.developer.apple.com/published/a63aa800a94319cd283176a8b21bb7af/VerticalAlignment-1-iOS@2x.png)
