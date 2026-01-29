---
title: Toolbars
description: Provide immediate access to frequently used commands and controls.

---
        
The `toolbar` property allows you to populate the navigation bar, bottom toolbar, or keyboard accessory area with custom UI elements. This system is modeled after SwiftUI’s toolbar API and provides fine-grained placement control across various regions of the user interface.

This feature is useful for adding primary or contextual actions, organizing control groups, and enhancing keyboard interactions.

---

## Definition

```ts
toolbar?: ToolBarProps
```

### ToolBarProps

```ts
type ToolBarProps = {
  bottomBar?: VirtualNode | VirtualNode[]
  cancellationAction?: VirtualNode | VirtualNode[]
  confirmationAction?: VirtualNode | VirtualNode[]
  destructiveAction?: VirtualNode | VirtualNode[]
  keyboard?: VirtualNode | VirtualNode[]
  navigation?: VirtualNode | VirtualNode[]
  primaryAction?: VirtualNode | VirtualNode[]
  principal?: VirtualNode | VirtualNode[]
  topBarLeading?: VirtualNode | VirtualNode[]
  topBarTrailing?: VirtualNode | VirtualNode[]
}
```

---

## Placement Options

Each property of `ToolBarProps` determines where the specified items will be placed. You can use either a single `VirtualNode` or an array of nodes for each region.

* **`automatic`** *(implicit)*: Lets the system decide optimal placement based on context. Not explicitly defined as a prop.
* **`bottomBar`**: Adds items to the bottom toolbar.
* **`cancellationAction`**: Represents a cancellation action, typically used in modal contexts.
* **`confirmationAction`**: Represents a confirmation action, typically used in modal contexts.
* **`destructiveAction`**: Represents a destructive action, often styled with visual emphasis (e.g., red).
* **`keyboard`**: Displays the item in the keyboard accessory view when a text input is focused.
* **`navigation`**: Represents a navigation action (e.g., back or close).
* **`primaryAction`**: Marks an item as the primary action in the current context.
* **`principal`**: Positions the item in the center of the top navigation bar.
* **`topBarLeading`**: Places items on the leading edge (left in LTR languages) of the top navigation bar.
* **`topBarTrailing`**: Places items on the trailing edge (right in LTR languages) of the top navigation bar.

---

## Example

```tsx
<VStack
  navigationTitle={"Toolbars"}
  navigationBarTitleDisplayMode={"inline"}
  toolbar={{
    topBarTrailing: [
      <Button
        title={"Select"}
        action={() => {}}
      />,
      <ControlGroup
        label={
          <Button
            title={"Add"}
            systemImage={"plus"}
            action={() => {}}
          />
        }
        controlGroupStyle={"palette"}
      >
        <Button
          title={"New"}
          systemImage={"plus"}
          action={() => {}}
        />
        <Button
          title={"Import"}
          systemImage={"square.and.arrow.down"}
          action={() => {}}
        />
      </ControlGroup>
    ],
    bottomBar: [
      <Button
        title={"New Sub Category"}
        action={() => {}}
      />,
      <Button
        title={"Add category"}
        action={() => {}}
      />
    ],
    keyboard: <HStack padding>
      <Spacer />
      <Button
        title={"Done"}
        action={() => {
          Keyboard.hide()
        }}
      />
    </HStack>
  }}
>
  <TextField
    title={"TextField"}
    value={text}
    onChanged={setText}
    textFieldStyle={"roundedBorder"}
    prompt={"Focus to show the keyboard toolbar"}
  />
</VStack>
```

This example demonstrates:

* A **top bar** with a "Select" button and a **control group** offering "New" and "Import" options.
* A **bottom toolbar** with actions for creating categories.
* A **keyboard accessory view** with a “Done” button aligned to the right, which hides the keyboard when pressed.

---

## Notes

* All toolbar items support dynamic updates—changes in state will automatically reflect in the toolbar UI.
* Items placed in the `keyboard` section will only be visible when a text input field is focused.
* `ControlGroup` components are useful for grouping related toolbar buttons visually and functionally.
