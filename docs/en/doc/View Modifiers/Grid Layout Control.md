---
title: Grid Layout Control

---

These view modifiers are used to control the layout behavior of individual views placed inside a `Grid` structure. They provide fine-grained control over cell spanning, alignment, and sizing, consistent with SwiftUI’s grid system.

---

### `gridCellColumns`

Tells a view in a grid to span across multiple columns.

#### Type

```ts
gridCellColumns?: number
```

#### Description

Use this modifier to expand a single view across two or more columns. This is typically used for headers or wide content rows.

#### Example

```tsx
<Grid>
  <GridRow>
    <Text gridCellColumns={2}>This spans 2 columns</Text>
  </GridRow>
  <GridRow>
    <Text>Cell A</Text>
    <Text>Cell B</Text>
  </GridRow>
</Grid>
```

---

### `gridCellAnchor`

Specifies a custom alignment anchor within the grid cell.

#### Type

```ts
gridCellAnchor?: KeywordPoint | Point
```

#### Description

Use this modifier to align the content of a cell to a specific anchor point, either using a named keyword (such as `"center"` or `"topLeading"`) or a custom `{ x, y }` point.

#### Example

```tsx
<Grid>
  <GridRow>
    <Text gridCellAnchor="topLeading">Anchored to top leading</Text>
  </GridRow>
</Grid>
```

---

### `gridCellUnsizedAxes`

Prevents the view from expanding in the specified directions when placed in a grid cell.

#### Type

```ts
gridCellUnsizedAxes?: AxisSet
```

#### Description

This modifier tells the grid not to assign extra size to the view along specified axes, allowing the view to tightly wrap its content.

#### Options

* `"horizontal"` – Prevent horizontal expansion
* `"vertical"` – Prevent vertical expansion
* `"all"` – Prevent expansion in both directions

#### Example

```tsx
<Grid>
  <GridRow>
    <Image
      gridCellUnsizedAxes="horizontal"
      imageUrl="https://example.com/icon.png"
    />
    <Text>Description</Text>
  </GridRow>
</Grid>
```

---

### `gridColumnAlignment`

Overrides the default horizontal alignment of the column the view appears in.

#### Type

```ts
gridColumnAlignment?: "leading" | "center" | "trailing"
```

#### Description

Affects how all cells in the column are aligned horizontally. Only one view in a column needs to specify this to affect the whole column.

#### Example

```tsx
<Grid>
  <GridRow>
    <Text gridColumnAlignment="trailing">Right-aligned column</Text>
    <Text>Next Cell</Text>
  </GridRow>
</Grid>
```

---

## Grid and GridRow Structure

These modifiers are only applicable within the context of the `Grid` and `GridRow` components.

### `Grid`

A container that lays out content in a two-dimensional grid.

#### Props

* `alignment?: Alignment` – Alignment of child views in grid cells
* `horizontalSpacing?: number` – Spacing between columns
* `verticalSpacing?: number` – Spacing between rows

#### Example

```tsx
<Grid>
  <GridRow>
    <Text>Hello</Text>
    <Image systemName="globe" />
  </GridRow>
  <Divider />
  <GridRow>
    <Image systemName="hand.wave" />
    <Text>World</Text>
  </GridRow>
</Grid>
```

### `GridRow`

Represents a horizontal row of views inside a `Grid`.

#### Props

* `alignment?: VerticalAlignment` – Vertical alignment for cells in the row

---

## Summary

| Modifier              | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `gridCellColumns`     | Allows a view to span multiple columns in the grid          |
| `gridCellAnchor`      | Sets a specific anchor point for the view within its cell   |
| `gridCellUnsizedAxes` | Prevents the view from expanding along specified axes       |
| `gridColumnAlignment` | Overrides the horizontal alignment of the containing column |
