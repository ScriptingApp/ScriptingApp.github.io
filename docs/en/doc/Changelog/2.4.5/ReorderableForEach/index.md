---
title: ReorderableForEach

---
        
`ReorderableForEach` is a high-level component in Scripting that provides **built-in drag-to-reorder capability**.
It preserves the familiar usage pattern of `ForEach` while adding native support for:

* Drag gesture recognition
* Active item tracking
* Manual reorder callbacks

This allows developers to implement **sortable lists and grids with minimal effort**.

Typical use cases include:

* Draggable card layouts
* Reorderable grids (`LazyVGrid`, `LazyHGrid`)
* User-defined module arrangements

---

## 1. Component Definition

```ts
type ReorderableForEachProps<T extends {
  id: string
}> = {
  active: Observable<T | null>
  data: T[]
  builder: (item: T, index: number) => VirtualNode
  onMove: (indices: number[], newOffset: number) => void
}

interface ReorderableForEachComponent {
  <T extends {
    id: string
  }>(props: ReorderableForEachProps<T>): VirtualNode
}

declare const ReorderableForEach: ReorderableForEachComponent
```

---

## 2. Generic Constraint

### `id` Is Required and Must Be Stable

The generic type `T` must satisfy:

```ts
T extends { id: string }
```

This means:

* Every item **must contain a unique and stable `id`**
* The `id` is used to:

  * Identify the dragged element
  * Maintain drag consistency
  * Calculate reorder positions correctly

If `id` values are duplicated or change during runtime, drag behavior will become unstable.

---

## 3. Props Reference

### 3.1 `active`

```ts
active: Observable<T | null>
```

Tracks the **currently dragged item**.

Behavior:

* When dragging starts, the active item is assigned to `active.value`
* When dragging ends, `active.value` is automatically reset to `null`

Typical use cases:

* Highlighting the active item
* Adjusting opacity or scale
* Driving linked animations
* Displaying drag helper UI

---

### 3.2 `data`

```ts
data: T[]
```

The current sortable data source.

Important notes:

* `ReorderableForEach` **does NOT mutate this array automatically**
* You **must update the order manually inside `onMove`**
* It is strongly recommended to use an observable source:

```ts
const data = useObservable<T[]>(...)
```

---

### 3.3 `builder`

```ts
builder: (item: T, index: number) => VirtualNode
```

Defines how each item is rendered.

Parameters:

| Parameter | Description                                   |
| --------- | --------------------------------------------- |
| `item`    | The current data item                         |
| `index`   | The **live index** within the reordered array |

The return value must be a valid `VirtualNode`.

Important:

* `index` reflects the reordered position
* Do not rely on previous fixed indices for logic safety inside `builder`

---

### 3.4 `onMove`

```ts
onMove: (indices: number[], newOffset: number) => void
```

Triggered when a drag reorder operation completes.

Parameter reference:

| Parameter   | Type       | Description                         |
| ----------- | ---------- | ----------------------------------- |
| `indices`   | `number[]` | Original indices of the moved items |
| `newOffset` | `number`   | Target insertion start index        |

You must perform the full reorder update manually:

1. Extract the moving items
2. Remove them from the original array
3. Insert them at `newOffset`
4. Call `Observable.setValue` with the new array

Standard implementation:

```ts
const onMove = (indices: number[], newOffset: number) => {
  const movingItems = indices.map(index => data.value[index])
  const newValue = data.value.filter((_, index) => !indices.includes(index))
  newValue.splice(newOffset, 0, ...movingItems)
  data.setValue(newValue)
}
```

---

## 4. Real Purpose of `contentShape` (Drag Preview Consistency)

From your example:

```tsx
.contentShape({
  kind: 'dragPreview',
  shape: {
    type: 'rect',
    cornerRadius: 16
  }
})
```

The **primary purpose of this configuration is**:

> To define the **drag preview shape**, ensuring that the appearance during dragging **matches the non-drag state**, such as preserving the `RoundedRectangle` corner radius.

It is used for:

* Defining the drag hit-testing region
* Synchronizing the visual shape during dragging
* Preventing the drag preview from degrading into a default rectangular mask

If this is omitted:

* The drag preview may revert to a plain rectangle
* Visual consistency with custom rounded backgrounds may be lost

---

## 5. Full Usage Flow Overview

### 5.1 Data Model

```ts
type Item = {
  id: string
  color: Color
}
```

---

### 5.2 Observable Data Source

```ts
const data = useObservable<Item[]>(() => {
  return new Array(30)
    .fill(0)
    .map((_, index) => ({
      id: String(index),
      color: colors[index % colors.length]
    }))
})
```

---

### 5.3 Active Drag State

```ts
const active = useObservable<Item | null>(null)
```

---

### 5.4 Item View with Consistent Drag Preview Shape

```tsx
<VStack
  modifiers={
    modifiers()
      .frame({ height: 80 })
      .frame({ maxWidth: 'infinity' })
      .background(
        <RoundedRectangle
          cornerRadius={16}
          fill={item.color}
        />
      )
      .contentShape({
        kind: 'dragPreview',
        shape: {
          type: 'rect',
          cornerRadius: 16
        }
      })
  }
>
```

---

### 5.5 Usage Inside `LazyVGrid`

```tsx
<ReorderableForEach
  active={active}
  data={data.value}
  builder={(item) =>
    <ItemView item={item} />
  }
  onMove={onMove}
/>
```

---

## 6. Why `ReorderableForEach` Is **Not Recommended Inside `List`**

Although technically it can be placed inside a `List`, it is **generally discouraged**, because `List` applies a strong set of built-in system behaviors:

* Automatic separators
* Fixed row height management
* Native selection system
* Built-in swipe gestures
* System editing mode
* Cell reuse logic

These behaviors often **conflict with custom drag reordering**, causing:

* Drag jumping or snapping
* Incorrect hit-testing
* Unwanted system edit mode activation
* Visual desynchronization

### Recommended Containers

* `ScrollView`
* `LazyVGrid`
* `LazyHGrid`
* Fully custom layout containers

### Not Recommended

* `List`

---

## 7. Internal Behavior Summary

`ReorderableForEach` follows this internal workflow:

1. Builds drag-enabled child nodes from `data`
2. Uses `dragPreview contentShape` to define the drag hit area and preview shape
3. During dragging:

   * Automatically updates `active`
   * Continuously recalculates the target insertion index
4. On drag completion:

   * Calls `onMove`
   * The developer applies the final reorder

---

## 8. Typical Use Cases

* Custom tool layout sorting
* Draggable dashboard modules
* Reorderable widgets
* Visual task priority organization
* Card-based grid layouts
