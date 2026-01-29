---
title: Grid
description: A container view that arranges other views in a two dimensional layout.

---
        
The `Grid` component in the **Scripting app** provides a flexible container for arranging child views in a two-dimensional grid layout. It supports customizable alignment, spacing, and nested child components to create visually appealing layouts.

---

### `Grid` Component

A container view that arranges other views in a two-dimensional layout.

### Import Path
```ts
import { Grid, GridRow } from 'scripting'
```

---

### Type: `GridProps`

| Property              | Type                                                                                      | Default          | Description                                                                                                    |
|-----------------------|-------------------------------------------------------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------|
| `alignment`           | `Alignment`                                                                              | `center`         | The alignment for child views within each grid cell. Options include `leading`, `center`, or `trailing`.       |
| `horizontalSpacing`   | `number`                                                                                 | Platform-defined | The horizontal distance, in points, between each cell. Defaults to a platform-appropriate value if not set.    |
| `verticalSpacing`     | `number`                                                                                 | Platform-defined | The vertical distance, in points, between each cell. Defaults to a platform-appropriate value if not set.      |
| `children`            | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | N/A              | The child components or nodes to be arranged in the grid.                                                      |

---

### `GridRow` Component

A child component of `Grid` that represents a horizontal row in the grid layout. Use `GridRow` to group and align child views horizontally within the grid.

---

### Type: `GridRowProps`

| Property     | Type                                                                                      | Default  | Description                                                                                              |
|--------------|-------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------|
| `alignment`  | `VerticalAlignment`                                                                       | `center` | Aligns the content vertically within the row. Options include `top`, `center`, or `bottom`.             |
| `children`   | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | N/A      | The child components or nodes to be arranged horizontally in the row.                                   |

---

## Usage Example

Below is an example demonstrating how to use the `Grid` and `GridRow` components to create a layout with rows, text, images, and dividers.

```tsx
<Grid
  alignment="center"
  horizontalSpacing={10}
  verticalSpacing={15}
>
  <GridRow alignment="center">
    <Text>Hello</Text>
    <Image systemName="globe" />
  </GridRow>
  <Divider />
  <GridRow alignment="bottom">
    <Image systemName="hand.wave" />
    <Text>World</Text>
  </GridRow>
</Grid>
```

**Output Layout**

- **First Row:** Contains a `Text` element ("Hello") and an `Image` with the `globe` icon, aligned vertically to the center.
- **Divider:** Separates the two rows.
- **Second Row:** Contains an `Image` with the `wave` icon and a `Text` element ("World"), aligned vertically to the bottom.

---

### Properties in Detail

1. **Grid: Alignment**
   - Aligns the content of each cell in the grid.
   - Possible values:
     - `leading`: Aligns content to the start of the cell.
     - `center`: Centers content within the cell (default).
     - `trailing`: Aligns content to the end of the cell.
   - Example:
     ```tsx
     <Grid alignment="leading">
       <GridRow>
         <Text>Aligned to start</Text>
       </GridRow>
     </Grid>
     ```

2. **GridRow: Alignment**
   - Aligns the content vertically within each row.
   - Possible values:
     - `top`: Aligns content to the top of the row.
     - `center`: Centers content vertically within the row (default).
     - `bottom`: Aligns content to the bottom of the row.
   - Example:
     ```tsx
     <Grid>
       <GridRow alignment="top">
         <Text>Top-aligned</Text>
       </GridRow>
       <GridRow alignment="bottom">
         <Text>Bottom-aligned</Text>
       </GridRow>
     </Grid>
     ```

3. **Horizontal and Vertical Spacing**
   - Customize the spacing between cells and rows.
   - Example:
     ```tsx
     <Grid horizontalSpacing={5} verticalSpacing={20}>
       <GridRow>
         <Text>Item 1</Text>
         <Text>Item 2</Text>
       </GridRow>
     </Grid>
     ```

4. **Children**
   - Accepts any combination of `VirtualNode` components, including `Text`, `Image`, `GridRow`, and custom components.
   - Nested arrays or null values are allowed for flexibility in dynamic layouts.

---

## Nested Components

The `Grid` and `GridRow` components work seamlessly with other supported UI elements:
- **`Divider`**: Adds a visual separator between rows.
- **`Text`, `Image`, and Custom Components**: Use any supported UI components as children of `GridRow`.

---

## Rendering Example with Image

The following showcases an image of the output:

![Grid Example](https://docs-assets.developer.apple.com/published/f20954fd2b30390306220984d444d0cf/Grid-2-iOS@2x.png)

This layout corresponds to the example provided, showing two rows with a divider.

---

## Notes

- **Default Spacing:** Horizontal and vertical spacing values are optimized for iOS but can be customized for specific design needs.
- **Alignment Options:** Combine `Grid`'s cell alignment with `GridRow`'s vertical alignment for precise layout control.
- **Dynamic Layouts:** The flexibility of `Grid` and `GridRow` makes them suitable for responsive designs with varying content.

Feel free to experiment with different child components and spacing configurations to create tailored designs for your UIs!