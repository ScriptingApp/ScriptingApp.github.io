---
title: VStack

---
        
The `VStack` component in the Scripting app is a layout view that arranges its child views vertically. It provides flexible options for aligning its subviews and controlling the spacing between them.

---

## **`VStack` Component**

### **Type Declaration**

```ts
declare const VStack: FunctionComponent<VStackProps>
```

### **Description**

The `VStack` component arranges its child views in a vertical line, making it ideal for creating vertically stacked layouts. You can customize the alignment of subviews and the spacing between them to suit your design needs.

---

## **Properties**

### `alignment` (Optional)

- **Type**: `HorizontalAlignment`
- **Default**: `"center"`
- **Description**: Determines the horizontal alignment of the subviews within the stack. The alignment specifies how views are positioned relative to each other horizontally when placed vertically in the `VStack`.
- **Accepted Values**:
  - `"leading"`: Aligns views to the left.
  - `"center"`: Centers views horizontally.
  - `"trailing"`: Aligns views to the right.

#### **Example**
```tsx
<VStack alignment="leading">
  <Text>Leading Aligned</Text>
  <Text>Another Item</Text>
</VStack>
```

---

### `spacing` (Optional)

- **Type**: `number | undefined`
- **Default**: Automatically calculated based on the child views if not specified.
- **Description**: Sets the distance in pixels between adjacent subviews. Use `undefined` to let the stack automatically determine the optimal spacing.

#### **Example**
```tsx
<VStack spacing={10}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</VStack>
```

---

### `children` (Optional)

- **Type**:
  ```ts
  (VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode | undefined
  ```
- **Description**: The child elements to display within the stack. You can pass individual elements, arrays of elements, or `undefined`/`null` values. Nullish values are ignored, allowing for dynamic layouts.

#### **Example**
```tsx
<VStack>
  <Text>First Item</Text>
  <Image systemName="star" />
</VStack>
```

---

## **`HorizontalAlignment` Type**

Horizontal alignment guides control how views are positioned relative to each other when placed vertically in a `VStack`.

### **Type Declaration**

```ts
type HorizontalAlignment = 'leading' | 'center' | 'trailing'
```

### **Alignment Options**

- **`leading`**: Aligns all subviews to the left edge of the stack.
- **`center`**: Centers all subviews horizontally.
- **`trailing`**: Aligns all subviews to the right edge of the stack.

### **Visual Guide**
Below is an illustration of the three alignment options:

![Horizontal Alignment](https://docs-assets.developer.apple.com/published/cb8ad6030a1ebcfee545d02f406500ee/HorizontalAlignment-1-iOS@2x.png)

---

## **Usage Example**

```tsx
<VStack alignment="leading" spacing={10}>
  <Image systemName="globe" />
  <Text>Leading Aligned Item</Text>
  <Text>Another Item</Text>
</VStack>
```

### **Explanation**
1. **`alignment="leading"`**: Aligns all subviews to the left.
2. **`spacing={10}`**: Adds 10 pixels of space between each subview.
3. Contains two child views:
   - An `Image` view displaying a system icon.
   - Two `Text` views displaying labeled items.

---

## **Best Practices**

1. Use `alignment` to control horizontal positioning when stacking text and icons for better visual consistency.
2. Leverage `spacing` to create breathable and aesthetically pleasing layouts.
3. Pass dynamic or conditional children without worrying about `null` or `undefined` values.

This documentation ensures you can confidently use the `VStack` component to create clean, vertically stacked layouts in your Scripting app projects.