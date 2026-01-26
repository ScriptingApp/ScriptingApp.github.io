# Use with ToolbarProps

The `toolbar` property allows you to populate a view’s navigation or toolbar area with various items, mirroring the functionality of SwiftUI's `toolbar` view modifier. By setting `toolbar` on a component, you can place items in the navigation bar or bottom toolbar, and specify their semantic roles.

## Overview

The `toolbar` property accepts a `ToolBarProps` object. Each key within `ToolBarProps` corresponds to a specific toolbar placement or action type. The values you provide should be either a single `VirtualNode` or an array of `VirtualNode` elements, which represent your custom UI items.

**In SwiftUI (for reference):**

```swift
// SwiftUI code example
YourView()
    .toolbar {
        ToolbarItem(placement: .confirmationAction) {
            Button("Save") {
                // Handle save
            }
        }
    }
```

**In Scripting (TypeScript/TSX):**

```tsx
<NavigationStack>
  <List
    toolbar={{
      confirmationAction: <Button title="Save" action={() => handleSave()} />,
      cancellationAction: <Button title="Cancel" action={() => handleCancel()} />,
      topBarLeading: [
        <Button title="Edit" action={() => handleEdit()} />,
        <Button title="Refresh" action={() => handleRefresh()} />
      ]
    }}
  >
    {/* Your main content here */}
  </List>
</NavigationStack>
```

## Toolbar Placements

The following keys can be used within `ToolBarProps` to specify where and how an item is placed:

- **automatic**: Automatically determines placement based on context and platform.
- **bottomBar**: Places the item in a bottom toolbar.
- **cancellationAction**: Represents a cancellation action in a modal interface.
- **confirmationAction**: Represents a confirmation action in a modal interface (e.g., "Save").
- **destructiveAction**: Represents an action that performs a destructive task (e.g., "Delete").
- **keyboard**: Places the item in a toolbar associated with the keyboard.
- **navigation**: Represents a navigation-related action (e.g., "Back", "Close").
- **primaryAction**: Represents the primary action of the interface.
- **principal**: Places the item in the principal item section of the toolbar (often centered in the navigation bar).
- **topBarLeading**: Places the item on the leading edge (e.g., left side) of the top bar.
- **topBarTrailing**: Places the item on the trailing edge (e.g., right side) of the top bar.

## Example Usage

### Single Item

If you want to add a single `confirmationAction` button to the toolbar:

```tsx
<NavigationStack>
  <VStack
    toolbar={{
      confirmationAction: <Button
        title="Save"
        action={() => console.log('Saving...')}
      />
    }}
  >
    {/* Main content */}
  </Vstack>
</NavigationStack>
```

### Multiple Items

You can also pass an array of nodes to a single placement, allowing multiple items in the same area:

```tsx
<NavigationStack>
  <VStack
    toolbar={{
      topBarLeading: [
        <Button title="Edit" action={() => console.log('Edit pressed')} />,
        <Button title="Settings" action={() => console.log('Settings pressed')} />
      ],
      topBarTrailing: <Button title="Done" action={() => console.log('Done pressed')} />
    }}
  >
    {/* Main content */}
  </Vstack>
</NavigationStack>
```

### Combining Multiple Toolbar Placements

You can mix and match different toolbar placements as needed:

```tsx
<NavigationStack>
  <List
    toolbar={{
      navigation: <Button title="Back" action={() => console.log('Back pressed')} />,
      principal: <Text fontWeight={"bold"}>Title</Text>,
      primaryAction: <Button title="Share" action={() => console.log('Share pressed')} />,
      bottomBar: <Button title="Help" action={() => console.log('Help pressed')} />
    }}
  >
    {/* Main content */}
  </List>
</NavigationStack>
```

## Summary

By using the `toolbar` property, you can easily replicate the behavior of SwiftUI’s `toolbar` modifier in your Scripting app. Assigning `VirtualNode` elements to the appropriate keys in `ToolBarProps` allows you to build rich, contextual toolbars and navigation bars for your pages.
