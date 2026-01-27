---
title: ForEach
---

The `ForEach` component renders a dynamic list of child views. It is used to display collections, create editable lists, and enable system-standard interactions such as swipe-to-delete. It is fully integrated with the Scripting app’s `Observable` state system and mirrors the design of SwiftUI’s `ForEach`.

`ForEach` supports two usage modes:

1. **Deprecated mode**: `count + itemBuilder`
2. **Recommended mode**: `data: Observable<T[]> + builder`

---

## 1. Type Definitions

## ForEachDeprecatedProps (Not Recommended)

```ts
type ForEachDeprecatedProps = {
  count: number;
  itemBuilder: (index: number) => VirtualNode;
  onDelete?: (indices: number[]) => void;
  onMove?: (indices: number[], newOffset: number) => void;
};
```

### Property Details

#### count: number

Specifies how many items to render. The `itemBuilder` function will be called for indices from 0 to `count - 1`.

#### itemBuilder(index)

Builds a `VirtualNode` for each index.

#### onDelete(indices)

Enables system-standard swipe-to-delete when the ForEach is placed inside a `List`.
This callback is invoked after the row has already been removed from the list UI.
You must manually delete the corresponding items from your data source inside this callback.

#### onMove(indices, newOffset)

Enables drag-to-reorder behavior.
To disable item movement, pass `null`.

---

## 2. ForEachProps (Recommended)

```ts
type ForEachProps<T extends { id: string }> =
  | ForEachDeprecatedProps
  | {
      data: Observable<T[]>;
      builder: (item: T, index: number) => VirtualNode;
      editActions?: "delete" | "move" | "all" | null;
    };
```

### Property Details

#### data: Observable\<T[]\>

An observable array of items.
Each item **must** contain a unique `id: string`.

Benefits of using `Observable<T[]>`:

- Automatic refresh when the collection changes
- Supports animation
- Behavior closer to SwiftUI’s `ForEach($items)`
- Integrates cleanly with `List`, `NavigationStack`, and other components

#### builder(item, index)

Builds a VirtualNode for the element at the given index.

**Important: You must provide a unique `key` (usually `item.id`) on the returned node.**

#### editActions: "delete" | "move" | "all" | null

Defines the editing capabilities of the ForEach component.

| Value      | Description                        |
| ---------- | ---------------------------------- |
| `"delete"` | Enables deletion only              |
| `"move"`   | Enables reordering only            |
| `"all"`    | Enables both deletion and movement |
| `null`     | No editing actions (default)       |

When used inside a `List`, these actions automatically map to system-standard interactions.

---

## 3. ForEachComponent Interface

```ts
interface ForEachComponent {
  <T extends { id: string }>(props: ForEachProps<T>): VirtualNode;
}
```

The component is generic and supports any item type containing an `id`.

---

## 4. Enabling System-Standard Deletion (Example)

When `ForEach` is placed inside a `List`, using `data` and `builder` will automatically activate swipe-to-delete. The only requirement is that each item has a unique `id`.

### Example

```tsx
function View() {
  const fruits = useObservable(() =>
    ["Apple", "Bananer", "Papaya", "Mango"].map((name, index) => ({
      id: index.toString(),
      name,
    })),
  );

  return (
    <NavigationStack>
      <List
        navigationTitle="Fruits"
        toolbar={{
          topBarTrailing: <EditButton />,
        }}>
        <ForEach data={fruits} builder={(item, index) => <Text key={item.id}>{item.name}</Text>} />
      </List>
    </NavigationStack>
  );
}
```

---

## 5. Best Practices and Usage Guidelines

### 1. Prefer the `data: Observable<T[]>` API

This mode provides:

- Better performance
- Full type inference
- Proper list diffing and animations
- Consistent behavior with SwiftUI

### 2. Every item must have a unique `id: string`

This ensures:

- Correct diff computation
- Smooth animations
- Accurate deletion and movement behavior

### 3. Always define `key={item.id}` in the builder

Failing to do so may result in:

- Broken animations
- Incorrect row updates
- Misaligned delete/move behavior

### 4. To support editing, place ForEach inside a `List`

And optionally add an `EditButton`, for example:

```tsx
toolbar={{
  topBarTrailing: <EditButton />
}}
```
