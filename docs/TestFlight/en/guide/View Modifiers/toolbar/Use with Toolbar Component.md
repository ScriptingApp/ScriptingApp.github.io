---
title: Use with Toolbar Component
description: Use the Toolbar component to populate a view’s navigation or toolbar area with various items.
---

In Scripting, views can populate their navigation bar or toolbar area using either the original `ToolBarProps` object or the declarative component-based API that mirrors SwiftUI’s toolbar system. This document explains in detail how to use the `Toolbar`, `ToolbarItem`, `ToolbarItemGroup`, `ToolbarSpacer`, and `DefaultToolbarItem` components, including parameters, types, and usage patterns.

---

## Overview

The `toolbar` property can be used in two ways:

- By passing a `ToolBarProps` object
- By passing a **VirtualNode**, which **must be a `<Toolbar>` component**

When using the component-based API, all toolbar content is declared inside a `<Toolbar>` container, and each item defines its placement explicitly. This provides clearer structure and more precise layout control, similar to SwiftUI.

```tsx
<List toolbar={<Toolbar>{/* toolbar items here */}</Toolbar>}>{/* main content */}</List>
```

---

## Toolbar

The `<Toolbar>` component serves as a container for toolbar content. It does not define placement itself; instead, `ToolbarItem` and `ToolbarItemGroup` determine where items go.

## Example

```tsx
<List
  toolbar={
    <Toolbar>
      <ToolbarItem placement="topBarLeading">
        <Button title="Close" action={dismiss} />
      </ToolbarItem>
      <ToolbarItem placement="topBarTrailing">
        <Button title="Done" action={handleDone} />
      </ToolbarItem>
    </Toolbar>
  }>
  {/* content */}
</List>
```

---

## ToolbarItem

`ToolbarItem` represents a single toolbar element placed at a specific position.

## Parameters

| Parameter   | Type                   | Default     | Description                                                                  |
| ----------- | ---------------------- | ----------- | ---------------------------------------------------------------------------- |
| `placement` | `ToolbarItemPlacement` | `automatic` | Position of the item, such as `topBarLeading`, `navigation`, `primaryAction` |
| `children`  | `VirtualNode`          | required    | The item’s content, usually a button or text                                 |

## Example

```tsx
<Toolbar>
  <ToolbarItem placement="navigation">
    <Button title="Back" action={Navigation.useDismiss()} />
  </ToolbarItem>
</Toolbar>
```

---

## ToolbarItemGroup

`ToolbarItemGroup` allows multiple toolbar items to be grouped together in a single placement.

## Parameters

| Parameter   | Type                    | Default     | Description                    |
| ----------- | ----------------------- | ----------- | ------------------------------ |
| `placement` | `ToolbarItemPlacement`  | `automatic` | Placement for the entire group |
| `children`  | multiple `VirtualNode`s | required    | The grouped toolbar items      |

## Example

```tsx
<Toolbar>
  <ToolbarItemGroup placement="topBarTrailing">
    <Button title="Refresh" action={reload} />
    <Button title="More" action={openMenu} />
  </ToolbarItemGroup>
</Toolbar>
```

---

## ToolbarSpacer

`ToolbarSpacer` inserts empty space in a toolbar. It can be used to fine-tune layout between items.

## Parameters

| Parameter   | Type                    | Default     | Description                                          |
| ----------- | ----------------------- | ----------- | ---------------------------------------------------- |
| `sizing`    | `'fixed' \| 'flexible'` | `flexible`  | Determines whether the spacer expands or stays fixed |
| `placement` | `ToolbarItemPlacement`  | `automatic` | Placement for the spacer                             |

### Behavior

- `flexible`: Expands to fill available space.
- `fixed`: Adds a fixed separation between items.

## Example

```tsx
<Toolbar>
  <ToolbarItem placement="topBarTrailing">
    <Button title="Edit" action={edit} />
  </ToolbarItem>

  <ToolbarSpacer sizing="fixed" />

  <ToolbarItem placement="topBarTrailing">
    <Button title="Save" action={save} />
  </ToolbarItem>
</Toolbar>
```

---

## DefaultToolbarItem

`DefaultToolbarItem` inserts system-provided toolbar items, such as the sidebar toggle button or search button.

## Parameters

| Parameter   | Type                                     | Default     | Description                           |
| ----------- | ---------------------------------------- | ----------- | ------------------------------------- |
| `kind`      | `"sidebarToggle" \| "search" \| "title"` | required    | Specifies which system item to insert |
| `placement` | `ToolbarItemPlacement`                   | `automatic` | Toolbar placement                     |

## Example

```tsx
<Toolbar>
  <DefaultToolbarItem kind="search" placement="topBarTrailing" />
</Toolbar>
```

---

## Complete Example

```tsx
<NavigationStack>
  <List
    toolbar={
      <Toolbar>
        {/* Navigation button */}
        <ToolbarItem placement="navigation">
          <Button title="Back" action={Navigation.useDismiss()} />
        </ToolbarItem>

        {/* Title */}
        <DefaultToolbarItem kind="title" />

        {/* Trailing group */}
        <ToolbarItem placement="topBarTrailing">
          <Button title="Edit" action={edit} />
        </ToolbarItem>
        <ToolbarSpacer sizing="fixed" />
        <ToolbarItem placement="topBarTrailing">
          <Button title="Done" action={finish} />
        </ToolbarItem>

        {/* Bottom bar item */}
        <ToolbarItem placement="bottomBar">
          <Button title="Help" action={showHelp} />
        </ToolbarItem>
      </Toolbar>
    }>
    {/* content */}
  </List>
</NavigationStack>
```

---

## Relationship with ToolBarProps

| Method                                    | Description                                              |
| ----------------------------------------- | -------------------------------------------------------- |
| `toolbar={{ topBarTrailing: <Button/> }}` | Simple and declarative for straightforward scenarios     |
| `toolbar={<Toolbar>...</Toolbar>}`        | More explicit, structured, and ideal for complex layouts |

Both approaches remain fully supported. When a `VirtualNode` is passed, it **must be a `<Toolbar>` component** to ensure proper layout interpretation.
