# Editable List

This example demonstrates how to build an **editable list** in the Scripting app using `List`, `ForEach`, and `EditButton` components. The list supports item deletion and reordering with built-in editing controls.

***

## Overview

You will learn how to:

- Display a list of items using `ForEach`
- Enable deletion and reordering of items
- Use `EditButton` to toggle editing mode
- Handle state updates using `useState`

***

## Example Code

### 1. Import Required Modules

```tsx
import { Color, EditButton, ForEach, List, Navigation, NavigationStack, Script, Text, useState } from "scripting"
```

### 2. Define Component State

The list is initialized with an array of `Color` strings:

```tsx
const [colors, setColors] = useState<Color[]>([
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
])
```

### 3. Handle Item Deletion

The `onDelete` function removes items from the list based on selected indices:

```tsx
function onDelete(indices: number[]) {
  setColors(colors.filter((_, index) => !indices.includes(index)))
}
```

### 4. Handle Item Reordering

The `onMove` function repositions selected items to a new offset in the list:

```tsx
function onMove(indices: number[], newOffset: number) {
  const movingItems = indices.map(index => colors[index])
  const newColors = colors.filter((_, index) => !indices.includes(index))
  newColors.splice(newOffset, 0, ...movingItems)
  setColors(newColors)
}
```

### 5. Build the Editable List

The main UI is constructed using a `NavigationStack` and a `List` containing a `ForEach` loop. The `EditButton` is added to the toolbar to enable editing mode:

```tsx
return <NavigationStack>
  <List
    navigationTitle={"Editable List"}
    navigationBarTitleDisplayMode={"inline"}
    toolbar={{
      confirmationAction: [
        <EditButton />,
      ]
    }}
  >
    <ForEach
      count={colors.length}
      itemBuilder={index =>
        <Text
          key={colors[index]} // A unique key is required!
        >{colors[index]}</Text>
      }
      onDelete={onDelete}
      onMove={onMove}
    />
  </List>
</NavigationStack>
```

### 6. Launch the View

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```

***

## Key Components

- **List**: Displays a scrollable, editable list of items.
- **ForEach**: Dynamically generates views based on item count.
- **EditButton**: Automatically enables editing mode in the list when tapped.
- **onDelete / onMove**: Callback functions triggered during item removal or reordering.
- **useState**: Tracks the current array of items in the list.

***

## Notes

- Always provide a unique `key` for each item in `ForEach` to ensure correct rendering.
- Reordering and deletion are only available while in editing mode, which is toggled using `EditButton`.

***

## Use Cases

- Reorderable lists (e.g., task prioritization)
- Editable collections (e.g., color palette, items, settings)
- Dynamic UI that responds to user input

This example provides a flexible foundation for interactive lists in your custom scripts or tools.
