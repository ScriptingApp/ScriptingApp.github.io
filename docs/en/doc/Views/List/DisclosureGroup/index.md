---
title: DisclosureGroup

---
        
The `DisclosureGroup` component allows you to organize related content into collapsible sections. This is useful for grouping items in a list, especially when dealing with hierarchical or optional content.

This example demonstrates how to create a top-level disclosure group that can be toggled open or closed, and how to nest additional `DisclosureGroup` components for sub-sections.

---

## Overview

You will learn how to:

* Use `DisclosureGroup` to create expandable sections
* Bind the expanded state to local component state
* Nest disclosure groups to represent hierarchical content
* Combine with other controls such as `Toggle`, `Text`, and `Button`

---

## Example Code

### 1. Import Dependencies

```tsx
import { Button, DisclosureGroup, List, Navigation, NavigationStack, Script, Text, Toggle, useState } from "scripting"
```

### 2. Define Component State

Manage the expanded state and toggle values using `useState`:

```tsx
const [topExpanded, setTopExpanded] = useState(true)
const [oneIsOn, setOneIsOn] = useState(false)
const [twoIsOn, setTwoIsOn] = useState(true)
```

### 3. Layout UI with Disclosure Groups

The main layout includes a `List` within a `NavigationStack`. A `Button` is provided to toggle the top-level group manually. The `DisclosureGroup` itself contains multiple child views and a nested `DisclosureGroup`:

```tsx
return <NavigationStack>
  <List
    navigationTitle={"DislcosureGroup"}
    navigationBarTitleDisplayMode={"inline"}
  >
    <Button
      title={"Toggle expanded"}
      action={() => setTopExpanded(!topExpanded)}
    />
    <DisclosureGroup
      title={"Items"}
      isExpanded={topExpanded}
      onChanged={setTopExpanded}
    >
      <Toggle
        title={"Toggle 1"}
        value={oneIsOn}
        onChanged={setOneIsOn}
      />
      <Toggle
        title={"Toggle 2"}
        value={twoIsOn}
        onChanged={setTwoIsOn}
      />
      <DisclosureGroup
        title={"Sub-items"}
      >
        <Text>Sub-item 1</Text>
      </DisclosureGroup>
    </DisclosureGroup>
  </List>
</NavigationStack>
```

### 4. Present the View and Exit

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```

---

## Key Concepts

* **DisclosureGroup**: An expandable view that reveals or hides its content.
* **isExpanded**: Binds the expanded/collapsed state to a Boolean value.
* **onChanged**: Callback that triggers when the user expands or collapses the group.
* **Nested Groups**: You can include one `DisclosureGroup` inside another to create a hierarchy.
* **Integration**: Works seamlessly with controls such as `Toggle`, `Text`, `Button`, etc.

---

## Use Cases

* Grouping settings into categories
* Creating collapsible FAQs or toolboxes
* Displaying nested data like folders, sections, or filters

This pattern provides a clean and user-friendly way to organize complex or optional content within a scrollable list.
