---
title: Selectable List
description: Implements selectable and multiselectable list features.

---

`List.selection` provides **selection state binding** for the `List` component. It enables:

* Single selection mode
* Multiple selection mode
* Integration with edit mode via `EditButton`
* Automatic synchronization with user interaction

---

## 1. API Definition

```ts
type ListProps = {
  selection?: Observable<string | null> | Observable<string[]>
  ...
}

declare const List: FunctionComponent<ListProps>
```

---

## 2. selection Type Description

The selection mode is determined by the generic type of `Observable`:

| Mode               | Observable Type        |Description  |
| ------------------ | ---------------------- | ------------|
| Single selection   | `Observable<string \| null>`| Only one item can be selected |
| Multiple selection | `Observable<string[]>` | Multiple items can be selected simultaneously |

---

## 3. Automatic Binding Rules with ForEach

When `List` is bound to `selection`, **every item inside `ForEach.data` must conform to the following structure**:

```ts
{
  id: string
}
```

Binding behavior:

1. The `id` property is automatically used as the **unique selection identifier**
2. When a list item is tapped:

   * Single selection mode: `selected.value` is automatically set to the tapped item’s `id`
   * Multiple selection mode: the `id` is automatically added to or removed from `selected.value`
3. Manual tap handling is not required
4. The `id` value must remain unique and stable; otherwise, selection behavior becomes undefined

---

## 4. Single Selection Mode

### 1. Definition

```tsx
const selected = useObservable<string | null>(null)
```

### 2. Usage Example

```tsx
function View() {
  const selected = useObservable<string | null>(null)

  const options = useObservable<{ id: string }[]>(() =>
    new Array(10).fill(0).map((_, i) => ({ 
      id: i.toString() 
    }))
  )

  return <NavigationStack>
    <List selection={selected}>
      <ForEach
        data={options}
        builder={item =>
          <Text>{item.id}</Text>
        }
      />
    </List>
  </NavigationStack>
}
```

### 3. State Description

* `null`: no item is currently selected
* `"3"`: the item whose `id` is `"3"` is selected

---

## 5. Multiple Selection Mode

### 1. Definition

```tsx
const selected = useObservable<string[]>([])
```

### 2. Usage Example

```tsx
function View() {
  const dismiss = Navigation.useDismiss()
  const selected = useObservable<string[]>([])

  const options = useObservable<{ id: string }[]>(() =>
    new Array(30).fill(0).map((_, i) => ({
      id: i.toString()
    }))
  )

  console.log(selected.value)

  return <NavigationStack>
    <List
      navigationTitle="Page Title"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        topBarLeading: <Button
          title="Done"
          action={dismiss}
        />,
        topBarTrailing: <EditButton />
      }}
      selection={selected}
    >
      <ForEach
        data={options}
        builder={item =>
          <Text>{item.id}</Text>
        }
      />
    </List>
  </NavigationStack>
}
```

### 3. State Description

`selected.value` is always an array of strings, for example:

```ts
["2", "5", "8"]
```

This indicates that three items are currently selected.

---

## 6. Interaction Between selection and EditButton

When `List` is bound to `selection`:

1. `EditButton` automatically enables list editing mode
2. While in edit mode:

   * Single selection: tapping an item replaces the current selection
   * Multiple selection: multiple items can be selected simultaneously
3. After exiting edit mode:

   * `selected.value` is **automatically reset**

     * Single selection resets to `null`
     * Multiple selection resets to an empty array `[]`

This behavior matches SwiftUI’s native edit mode behavior.

---

## 7. Programmatic Control of selection

In addition to user interaction, selection can be modified by code.

### Single Selection

```ts
selected.setValue("5")
```

### Multiple Selection

```ts
selected.setValue(["1", "3", "7"])
```

The UI will update automatically to reflect the new selection state.

---

## 8. Compatibility with NavigationStack

`List.selection` is fully compatible with `NavigationStack` and does not affect:

* Navigation behavior
* Toolbar layout
* Edit mode interactions
* Back navigation behavior

Recommended structure:

```tsx
<NavigationStack>
  <List selection={selected}>
    ...
  </List>
</NavigationStack>
```

---

## 9. Common Errors and Misuse

### 1. Incorrect selection Type

Incorrect:

```ts
const selected = useObservable<number | null>(null)
```

Correct:

```ts
const selected = useObservable<string | null>(null)
```

Currently, only `string` is supported as the selection identifier type.

---

### 2. Incorrect Initialization for Multiple Selection

Incorrect:

```ts
const selected = useObservable<string[]>(null)
```

Correct:

```ts
const selected = useObservable<string[]>([])
```

---

### 3. Missing id in ForEach.data

Incorrect:

```tsx
const options = [{ name: "A" }, { name: "B" }]
```

This will cause:

* Selection to fail
* Unstable checked state
* List reuse inconsistencies

---

## 10. Typical Use Cases

`List.selection` is suitable for:

* Single-choice settings (themes, languages, preferences)
* Batch deletion
* Batch export
* Batch sharing
* File managers
* Contact pickers
* Task lists with selection
