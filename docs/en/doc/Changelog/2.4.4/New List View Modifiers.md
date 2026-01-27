---
title: New List View Modifiers
---

## Overview of Properties

| Property                     | Type                                                        | Availability | Description                                                        |     |     |
| ---------------------------- | ----------------------------------------------------------- | ------------ | ------------------------------------------------------------------ | --- | --- |
| `listSectionIndexVisibility` | `Visibility`                                                | iOS 26.0+    | Controls the visibility of the List's right-side section index     |     |     |
| `listSectionMargins`         | `number \| EdgeSets \| { edges: EdgeSets; length: number }` | iOS 26.0+    | Customizes section margins, replacing SwiftUI’s automatic defaults |
| `sectionIndexLabel`          | `string`                                                    | iOS 26.0+    | Sets the character displayed in the section index                  |     |     |
| `sectionActions`             | `VirtualNode`                                               | iOS 18.0+    | Adds custom actions to the section header area                     |     |     |

---

## 1. listSectionIndexVisibility

```ts
/**
 * Sets the visibility of the list section index.
 * @available iOS 26.0+.
 */
listSectionIndexVisibility?: Visibility
```

### Description

Controls whether the List shows the right-side section index (commonly used for A–Z navigation in contact lists).

Possible values:

- `"visible"`
- `"hidden"`
- `"automatic"` (default system behavior)

### Example

```tsx
<List listSectionIndexVisibility="visible">
  <ForEach
    data={groups}
    builder={(group) => (
      <Section header={<Text>{group.title}</Text>} sectionIndexLabel={group.title}>
        {group.items.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Section>
    )}
  />
</List>
```

---

## 2. listSectionMargins

```ts
/**
 * Set the section margins for the specific edges.
 * @available iOS 26.0+.
 */
listSectionMargins?: number | EdgeSets | {
  edges: EdgeSets
  length: number
}
```

### Description

Customizes the margins of a section. When set, it **fully replaces** SwiftUI’s default section margin rules.

### Supported Formats

### 2.1 Single number

Applies the same margin to all edges.

```tsx
listSectionMargins={12}
```

### 2.2 EdgeSets

Applies the specified edges with the default margin.

```tsx
listSectionMargins={["horizontal", "top"]}
```

### 2.3 Specific edges with length

Applies a margin of `length` only to the specified edges.

```tsx
listSectionMargins={{
  edges: "horizontal",
  length: 20
}}
```

Equivalent to SwiftUI:

```swift
.listSectionMargins(.horizontal, 20)
```

### Example

```tsx
<Section
  header={<Text>Favorites</Text>}
  listSectionMargins={{
    edges: "horizontal",
    length: 20,
  }}>
  <Text>Item A</Text>
  <Text>Item B</Text>
</Section>
```

---

## 3. sectionIndexLabel

```ts
/**
 * Sets the label that is used in a section index.
 * @available iOS 26.0+.
 */
sectionIndexLabel?: string
```

### Description

Sets the character or text displayed in the right-side section index for this section. Typically a single letter.

### Example

```tsx
<Section header={<Text>A</Text>} sectionIndexLabel="A">
  <Text>Adam</Text>
  <Text>Ana</Text>
</Section>
```

---

## 4. sectionActions

```ts
/**
 * Adds custom actions to a section.
 * @available iOS 18.0+
 */
sectionActions?: VirtualNode
```

### Description

Adds custom UI elements such as buttons or menus to the section header’s trailing (accessory) area.

### Example: Refresh button

```tsx
<Section
  header={<Text>Downloads</Text>}
  sectionActions={<Button title="Refresh" action={() => doRefresh()} />}>
  <Text>File 1</Text>
  <Text>File 2</Text>
</Section>
```

### Example: Menu with multiple actions

```tsx
<Section
  header={<Text>Photos</Text>}
  sectionActions={
    <Menu title="Actions">
      <Button title="Upload All" action={() => uploadAll()} />
      <Button title="Delete All" action={() => deleteAll()} />
    </Menu>
  }>
  {photos.map((photo) => (
    <Text key={photo.id}>{photo.name}</Text>
  ))}
</Section>
```

---

## Full Example

```tsx
<List listSectionIndexVisibility="visible">
  <ForEach
    data={groups}
    builder={(group) => (
      <Section
        header={<Text>{group.title}</Text>}
        sectionIndexLabel={group.title}
        listSectionMargins={12}
        sectionActions={<Button title="Refresh" action={() => refreshGroup(group)} />}>
        {group.items.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Section>
    )}
  />
</List>
```
