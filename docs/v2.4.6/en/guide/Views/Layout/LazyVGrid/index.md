---
title: LazyVGrid
description: A container view that arranges its child views in a grid that grows vertically, creating items only as needed.

---
        
The `LazyVGrid` component is part of the **Scripting** app's UI library. It arranges its children in a grid layout with columns defined by customizable sizing and alignment options. Items are created and displayed only as needed, optimizing performance for large or dynamic data sets.

---

## LazyVGrid

## Type: `FunctionComponent<LazyVGridProps>`

A `LazyVGrid` arranges its children in a grid that grows vertically. Unlike a regular grid, it loads and displays items lazily, creating them only when they are about to appear on the screen. This makes it ideal for grids with large or dynamic content.

---

## LazyVGridProps

| Property       | Type                                                                                       | Default             | Description                                                                                                                                                     |
|----------------|--------------------------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `columns`      | `GridItem[]`                                                                              | **Required**        | Defines the configuration for the columns in the grid, including their size and alignment.                                                                     |
| `alignment`    | `HorizontalAlignment`                                                                      | `undefined`         | Controls how the grid is aligned horizontally within its parent view.                                                                                           |
| `spacing`      | `number`                                                                                   | `undefined` (default spacing) | The distance between adjacent grid items. If `undefined`, the grid uses a default spacing value.                                                              |
| `pinnedViews`  | `'sectionHeaders'` \| `'sectionFooters'` \| `'sectionHeadersAndFooters'`                   | `undefined`         | Specifies which child views remain pinned to the bounds of the parent scroll view.                                                                             |
| `children`     | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | `undefined`         | The content to be displayed in the grid. Accepts one or multiple `VirtualNode` elements, including arrays and optional `null` or `undefined` values.          |

---

## GridItem

Defines the properties for a single column in the grid.

| Property       | Type                                                                                       | Default             | Description                                                                                                                                                     |
|----------------|--------------------------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alignment`    | `Alignment`                                                                               | `undefined`         | Specifies the alignment to use when placing each child view in this column.                                                                                   |
| `spacing`      | `number`                                                                                   | `undefined` (default spacing) | The spacing between items in this column and the next.                                                                                                         |
| `size`         | `GridSize`                                                                                | **Required**        | Defines the size of the column. Can be a fixed size or a flexible/adaptive size based on the content.                                                          |

---

## GridSize

Defines the size of a row or column in the grid layout.

| Type            | Properties                                                                 | Description                                                                                              |
|-----------------|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `number`        | _N/A_                                                                    | A fixed size for the row or column.                                                                      |
| `adaptive`      | `min: number`, `max?: number \| 'infinity'`                     | Specifies a flexible size that adapts to the content, with a minimum and optional maximum constraint.    |
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
import { LazyVGrid, Text } from 'scripting'

const Example = () => {
  const columns = [
    { size: 50 },
    { size: { type: 'adaptive', min: 40, max: 100 } },
    { size: { type: 'flexible', min: 30, max: 'infinity' } }
  ]

  return (
    <ScrollView>
      <LazyVGrid
        columns={columns}
        alignment="leading"
        spacing={16}
      >
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </LazyVGrid>
    </ScrollView>
  )
}
```

### Explanation:

- Defines three columns with different sizing:
  - A fixed column with a size of 50
  - An adaptive column with a minimum size of 40 and a maximum size of 100
  - A flexible column with a minimum size of 30 and no maximum size
- The grid is aligned to the leading edge of its parent view with 16 points of spacing

---

## Notes

- `LazyVGrid` is ideal for vertically growing grid layouts with large or dynamic content
- Use `GridSize` to define flexible or adaptive layouts based on the available space
- The `pinnedViews` property ensures critical views like headers or footers remain visible during scrolling

This API provides flexibility and performance optimizations for grid-based vertical layouts.