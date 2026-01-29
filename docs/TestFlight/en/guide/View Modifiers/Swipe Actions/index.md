---
title: Swipe Actions
description: You can attach swipe actions to views used as rows in a <List> (such as <HStack>) to support contextual interactions like deleting, editing, marking favorites, etc.

---
        
In the **Scripting** app, you can attach swipe actions to views used as rows in a `<List>` (such as `<HStack>`) to support contextual interactions like deleting, editing, marking favorites, etc.

To improve clarity and ease of use in TypeScript, the SwiftUI `swipeActions` modifier is split into two separate modifiers:

* `leadingSwipeActions`: For swipe gestures from left to right.
* `trailingSwipeActions`: For swipe gestures from right to left.

---

## `leadingSwipeActions`

Adds swipe actions to the **leading** (left) edge of a list row.

### Type

```ts
leadingSwipeActions?: {
  allowsFullSwipe?: boolean
  actions: VirtualNode[]
}
```

### Description

* `actions`: An array of `<Button>` elements that will appear when the user swipes right on the row.
* `allowsFullSwipe`: If `true` (default), a full swipe will automatically invoke the **first action** in the list.

---

## `trailingSwipeActions`

Adds swipe actions to the **trailing** (right) edge of a list row.

### Type

```ts
trailingSwipeActions?: {
  allowsFullSwipe?: boolean
  actions: VirtualNode[]
}
```

### Description

* `actions`: An array of `<Button>` elements that appear when the user swipes left on the row.
* `allowsFullSwipe`: If `true` (default), a full swipe will automatically trigger the **first action**.

---

## Example Usage

```tsx
<List>
  {list.map(item => 
    <HStack
      trailingSwipeActions={{
        allowsFullSwipe: true,
        actions: [
          <Button
            title="Delete"
            role="destructive"
            action={() => deleteItem(item)}
          />,
          <Button
            title="Edit"
            tint="accentColor"
            action={() => editItem(item)}
          />
        ]
      }}
    >
      <Image systemName={item.icon} />
      <Text>{item.title}</Text>
    </HStack>
  )}
</List>
```

You can also add leading actions:

```tsx
<HStack
  leadingSwipeActions={{
    actions: [
      <Button
        title="Favorite"
        tint="orange"
        action={() => markAsFavorite(item)}
      />
    ]
  }}
>
  <Text>{item.title}</Text>
</HStack>
```

---

## Button Roles and Styling

Each swipe action must be a `<Button>` component. You can customize buttons with:

* `title`: Text label for the button.
* `action`: The function to execute when tapped.
* `role` (optional): `"destructive"` for delete-like actions.
* `tint` (optional): Use system color names like `"accentColor"` or any custom color string.

---

## Notes

* You can use both `leadingSwipeActions` and `trailingSwipeActions` on the same row.
* Only views used within a scrollable list (like `<List>`) support swipe actions.
* If `allowsFullSwipe` is disabled, the user must tap the button rather than relying on a full swipe gesture.
