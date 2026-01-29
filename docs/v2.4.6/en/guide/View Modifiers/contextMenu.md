---
title: contextMenu
description: This property allows a view to present a contextual menu when the user performs a long-press or right-click gesture.

---

The `contextMenu` property allows a view to present a contextual menu when the user performs a long-press or right-click gesture. This behavior is consistent with the system-provided context menus in iOS and iPadOS. Developers can define menu items and optionally include a preview view that appears alongside the menu.

---

## Definition

```ts
contextMenu?: {
  menuItems: VirtualNode
  preview?: VirtualNode
}
```

---

## Properties

* **`menuItems`**: A `VirtualNode` that defines the contents of the context menu. This typically consists of one or more `Button` components grouped within a `Group` element.

* **`preview`** (optional): A `VirtualNode` representing a preview view. This preview is displayed adjacent to the context menu, giving users a visual hint of the item or action being contextualized.

---

## Behavior

When applied to a view, the `contextMenu` modifier activates when the user performs a long press (on touch devices) or right-click (on pointer-based devices). The system then displays the defined `menuItems`, and if provided, renders the `preview` view.

---

## Example

```tsx
function View() {
  return <Text
    contextMenu={{
      menuItems: <Group>
        <Button
          title="Add"
          action={() => {
            // Handle add action
          }}
        />
        <Button
          title="Delete"
          role="destructive"
          action={() => {
            // Handle delete action
          }}
        />
      </Group>
    }}
  >
    Long Press to Open Context Menu
  </Text>
}
```

In this example, the `Text` view is enhanced with a context menu that appears on long press. The menu presents two actions: "Add" and "Delete", with the "Delete" button styled as destructive.

---

## Notes

* The context menu is automatically styled by the system and adapts to platform conventions.
* If the `preview` property is not provided, only the menu items will be displayed.
* The `menuItems` should be structured within a `Group` to ensure proper layout and interaction handling.
