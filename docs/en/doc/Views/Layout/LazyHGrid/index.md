---
title: LazyHGrid

---
        
The `LazyHGrid` component is part of the **Scripting** app's UI library. It arranges its children in a grid layout with rows defined by customizable sizing and alignment options. Items are created and displayed only as needed, optimizing performance for large or dynamic data sets.

---

## LazyHGrid

## Type: `FunctionComponent<LazyHGridProps>`

A `LazyHGrid` arranges its children in a grid that grows horizontally. Unlike a regular grid, it loads and displays items lazily, creating them only when they are about to appear on the screen. This makes it ideal for grids with large or dynamic content.

---

## LazyHGridProps

| Property       | Type                                                                                       | Default             | Description                                                                                                                                                     |
|----------------|--------------------------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `rows`         | `GridItem[]`                                                                              | **Required**        | Defines the configuration for the rows in the grid, including their size and alignment.                                                                        |
| `alignment`    | `VerticalAlignment`                                                                        | `undefined`         | Controls how the grid is aligned vertically within its parent view.                                                                                            |
| `spacing`      | `number`                                                                                   | `undefined` (default spacing) | The spacing between the grid and the next item in its parent view.                                                                                             |
| `pinnedViews`  | `'sectionHeaders'` \| `'sectionFooters'` \| `'sectionHeadersAndFooters'`                   | `undefined`         | Specifies which child views remain pinned to the bounds of the parent scroll view.                                                                             |
| `children`     | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | `undefined`         | The content to be displayed in the grid. Accepts one or multiple `VirtualNode` elements, including arrays and optional `null` or `undefined` values.          |

---

## GridItem

Defines the properties for a single row in the grid.

| Property       | Type                                                                                       | Default             | Description                                                                                                                                                     |
|----------------|--------------------------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alignment`    | `Alignment`                                                                               | `undefined`         | Specifies the alignment to use when placing each child view in this row.                                                                                       |
| `spacing`      | `number`                                                                                   | `undefined` (default spacing) | The spacing between items in this row and the next.                                                                                                           |
| `size`         | `GridSize`                                                                                | **Required**        | Defines the size of the row. Can be a fixed size or a flexible/adaptive size based on the content.                                                             |

---

## GridSize

Defines the size of a row or column in the grid layout.

| Type            | Properties                                                                 | Description                                                                                              |
|-----------------|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `number`        | _N/A_                                                                    | A fixed size for the row or column.                                                                      |
| `adaptive`      | `min: number`, `max?: number \|'infinity'`                     | Specifies a flexible size that adapts to the content, with a minimum and optional maximum constraint.    |
| `flexible`      | `min?: number`, `max?: number \| 'infinity'`                    | Specifies a single flexible size that adjusts dynamically, constrained by optional min and max values.   |

---

## PinnedScrollViews

Defines which views in the grid remain pinned to the parent scroll view's bounds as it scrolls:

- `'sectionHeaders'`: Pins only the section headers
- `'sectionFooters'`: Pins only the section footers
- `'sectionHeadersAndFooters'`: Pins both section headers and footers

---

## Example Usage

```tsx
import { LazyHGrid, Text } from 'scripting'

const Example = () => {
  const rows = [
    { size: 50 },
    { size: { type: 'adaptive', min: 30, max: 80 } },
    { size: { type: 'flexible', min: 20, max: 'infinity' } }
  ]
  
  return (
    <ScrollView
      axes="horizontal"
    >
      <LazyHGrid 
        rows={rows} 
        alignment="center" 
        spacing={12} 
      >
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </LazyHGrid>
    </ScrollView>
  )
}
```

### Explanation:

- Defines three rows with different sizing:
  - A fixed row with a size of 50
  - An adaptive row with a minimum size of 30 and a maximum size of 80
  - A flexible row with a minimum size of 20 and no maximum size
- The grid is centered vertically in its parent view with 12 points of spacing

---

## Notes

- `LazyHGrid` is ideal for horizontally growing grid layouts with large or dynamic content
- Use `GridSize` to define flexible or adaptive layouts based on the available space
- The `pinnedViews` property ensures critical views like headers or footers remain visible during scrolling

This API provides flexibility and performance optimizations for grid-based horizontal layouts.