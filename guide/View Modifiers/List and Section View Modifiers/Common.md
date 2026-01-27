# Common

These modifiers allow you to customize how rows and sections behave and appear inside a `<List>` component.

## Applies To:

- Individual **rows** (e.g., `<Text>`, `<HStack>`, etc. inside `<List>`)
- Entire **sections** (e.g., `<Section>`)
- Or directly on the `<List>` component itself

***

## `listItemTint`

Sets the **tint color** applied to the row or its accessories (e.g., icons, buttons).

### Type

```ts
listItemTint?: Color
```

### Description

- Use this to override the inherited tint color for a row or its content.
- Use `null` to avoid overriding the inherited tint.

### Example

```tsx
<Text
  listItemTint="green"
>
  Tinted Row
</Text>
```

***

## `listRowInsets`

Applies **padding (insets)** to a row in a list.

### Type

```ts
listRowInsets?: number | EdgeInsets
```

### Description

- Use a single `number` to apply uniform padding.
- Use an `EdgeInsets` object to apply individual insets for top, bottom, leading, and trailing.

### Example

```tsx
<Text
  listRowInsets={{
    top: 10,
    bottom: 10,
    leading: 20,
    trailing: 20
  }}
>
  Custom Insets Row
</Text>
```

***

## `listRowSpacing`

Controls the **vertical spacing** between adjacent rows.

### Type

```ts
listRowSpacing?: number
```

### Example

```tsx
<List listRowSpacing={12}>
  <Text>Row 1</Text>
  <Text>Row 2</Text>
</List>
```

***

## `listRowSeparator`

Sets the **visibility of the separator line** for a specific row.

### Type

```ts
listRowSeparator?: Visibility | {
  visibility: Visibility
  edges: VerticalEdgeSet
}
```

### `Visibility` options:

- `"visible"` – Always show the separator
- `"hidden"` – Hide the separator
- `"automatic"` – System default behavior

### `VerticalEdgeSet` options:

- `"top"` | `"bottom"` | `"all"`

### Example

```tsx
<Text
  listRowSeparator={{
    visibility: "hidden",
    edges: "bottom"
  }}
>
  No Bottom Separator
</Text>
```

***

## `listRowSeparatorTint`

Sets the **tint color of the separator** for a specific row.

### Type

```ts
listRowSeparatorTint?: Color | {
  color: Color
  edges: VerticalEdgeSet
}
```

### Example

```tsx
<Text
  listRowSeparatorTint={{
    color: "rgba(255,0,0,0.5)",
    edges: "bottom"
  }}
>
  Colored Separator
</Text>
```

***

## `listRowBackground`

Places a **custom background** behind a list row.

### Type

```ts
listRowBackground?: VirtualNode
```

### Example

```tsx
<Text
  listRowBackground={
    <Rectangle fill="#f0f0f0" cornerRadius={10} />
  }
>
  Row with background
</Text>
```

***

## `listSectionSpacing`

Controls the **spacing between adjacent list sections**.

### Type

```ts
listSectionSpacing?: ListSectionSpacing
```

### `ListSectionSpacing` options:

- `"default"` – System default spacing
- `"compact"` – Smaller spacing
- A `number` – Custom spacing in points

### Example

```tsx
<List listSectionSpacing="compact">
  <Section>...</Section>
  <Section>...</Section>
</List>
```

***

## `listSectionSeparator`

Controls the **visibility of the separator** between list sections.

### Type

```ts
listSectionSeparator?: Visibility | {
  visibility: Visibility
  edges: VerticalEdgeSet
}
```

### Example

```tsx
<Section
  listSectionSeparator={{
    visibility: "hidden",
    edges: "top"
  }}
>
  <Text>Section Content</Text>
</Section>
```

***

## `listSectionSeparatorTint`

Sets the **separator tint color** for a section.

### Type

```ts
listSectionSeparatorTint?: Color | {
  color: Color
  edges: VerticalEdgeSet
}
```

### Example

```tsx
<Section
  listSectionSeparatorTint={{
    color: "#cccccc",
    edges: "bottom"
  }}
>
  <Text>Styled Section</Text>
</Section>
```

***

## Supporting Types

## `EdgeInsets`

```ts
{
  top: number
  bottom: number
  leading: number
  trailing: number
}
```

## `Visibility`

```ts
"automatic" | "visible" | "hidden"
```

## `VerticalEdgeSet`

```ts
"top" | "bottom" | "all"
```

## `Color` formats

You can define color in three ways:

- Named keyword: `"green"`, `"label"`, etc.
- Hex: `"#ff0000"`
- RGBA: `"rgba(255,0,0,1)"`

***

## Summary Table

| Modifier                   | Scope   | Description                       |
| -------------------------- | ------- | --------------------------------- |
| `listItemTint`             | Row     | Sets tint color for row content   |
| `listRowInsets`            | Row     | Custom padding for row            |
| `listRowSpacing`           | List    | Vertical spacing between rows     |
| `listRowSeparator`         | Row     | Controls row separator visibility |
| `listRowSeparatorTint`     | Row     | Tint color of row separator       |
| `listRowBackground`        | Row     | Background behind a specific row  |
| `listSectionSpacing`       | List    | Spacing between sections          |
| `listSectionSeparator`     | Section | Visibility of section separator   |
| `listSectionSeparatorTint` | Section | Tint color of section separator   |
