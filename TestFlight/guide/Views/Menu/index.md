# Menu

The `Menu` component in Scripting is a user interface control that presents a list of actions or nested submenus. It functions as a container for contextual actions and supports both text-based and custom visual labels. Inspired by SwiftUI’s `Menu`, this component is especially useful in toolbars, context menus, and compact UI layouts.

***

## Purpose

Use `Menu` to group multiple related actions under a single interaction point. A menu can include `Button` components and even other nested `Menu` components for hierarchical command structures.

***

## Props

```ts
type MenuProps = {
  primaryAction?: () => void
  children?: VirtualNode | (VirtualNode | undefined | null)[] 
} & (
  | {
      title: string
      systemImage?: string
    }
  | {
      label: VirtualNode
    }
)
```

### Base Properties

| Property        | Type                             | Description                                                                                                    |
| --------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `primaryAction` | `() => void` (optional)          | An action that executes when the menu is tapped directly, without expanding it. Useful for a default behavior. |
| `children`      | `VirtualNode` \| `VirtualNode[]` | The menu’s content—usually a list of `Button` components or nested `Menu` components.                          |

### Label Configuration (choose one of the following)

You must specify **either** a text-based `title` or a custom `label`.

#### Option 1: `title` with optional system image

| Property      | Type                | Description                                                     |
| ------------- | ------------------- | --------------------------------------------------------------- |
| `title`       | `string`            | A text string describing the menu’s purpose.                    |
| `systemImage` | `string` (optional) | The name of a system SF Symbol image to display with the title. |

#### Option 2: `label` (custom view)

| Property | Type          | Description                                                                      |
| -------- | ------------- | -------------------------------------------------------------------------------- |
| `label`  | `VirtualNode` | A custom view node (e.g., `Text`, `Image`, `HStack`) to use as the menu’s label. |

***

## Example

```tsx
<Menu title="Actions">
  <Button title="Rename" action={rename} />
  <Button title="Delete" action={delete} />
  <Menu title="Copy">
    <Button title="Copy" action={copy} />
    <Button title="Copy Formatted" action={copyFormatted} />
  </Menu>
</Menu>
```

In this example:

- A top-level menu labeled **"Actions"** contains:

  - A "Rename" button
  - A "Delete" button
  - A nested **"Copy"** submenu with two more buttons

***

## Example with `primaryAction` and `systemImage`

```tsx
<Menu
  title="More"
  systemImage="ellipsis"
  primaryAction={() => console.log("Menu tapped")}
>
  <Button title="Settings" action={openSettings} />
  <Button title="Help" action={openHelp} />
</Menu>
```

- If the user taps the menu directly, `primaryAction` is executed.
- If the user long-presses or clicks to expand, the menu shows its child items.

***

## Example with Custom Label

```tsx
<Menu
  label={
    <HStack>
      <Image systemName="gear" />
      <Text>Options</Text>
    </HStack>
  }
>
  <Button title="Configure" action={configure} />
</Menu>
```

This example uses a custom label combining an icon and text.

***

## Notes

- Menus are often used inside `toolbar`, `contextMenu`, or as part of compact user interfaces.
- Menus can be nested without restriction to create multi-level action hierarchies.
- Use `primaryAction` for lightweight actions that don't require expansion.
