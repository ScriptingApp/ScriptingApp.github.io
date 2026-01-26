# controlGroupStyle

The `controlGroupStyle` property allows you to set the visual and interactive style for control groups within your view, reflecting the look and feel found in SwiftUI. By defining a `ControlGroupStyle`, you can influence how related controls—such as buttons, toggles, or other interactable elements—are grouped and presented to the user.

## Overview

In SwiftUI, you might set a `controlGroupStyle` like this:

```swift
ControlGroup {
    Button("Action 1") { ... }
    Button("Action 2") { ... }
}
.controlGroupStyle(.navigation)
```

**In Scripting (TypeScript/TSX),** you can achieve similar styling by using the `controlGroupStyle` property on a view that contains control group components:

```tsx
<ControlGroup
  title="Text Formatting"
  controlGroupStyle="navigation"
>
  <Button title="Bold" action={() => console.log('Bold pressed')} />
  <Button title="Italic" action={() => console.log('Italic pressed')} />
  <Button title="Underline" action={() => console.log('Underline pressed')} />
</ControlGroup>
```

## Available Styles

You can assign any of the following string values to `controlGroupStyle` to define how the control group is displayed:

- **`automatic`**: Let the system decide an appropriate style based on the context.
- **`compactMenu`**: Presents the controls as a compact menu when tapped, or as a submenu if nested within a larger menu.
- **`menu`**: Displays the controls in a menu format when pressed, or as a submenu when nested.
- **`navigation`**: Styles the controls to fit within a navigation context, often aligning with platform-specific navigation styles.
- **`palette`**: Presents the controls in a palette-like grouping, often showing multiple actions at once.

## Example Usage

### Setting the `controlGroupStyle` to a Menu

```tsx
<ControlGroup
  controlGroupStyle="menu"
>
  {/* Your content here, possibly a set of controls */}
</ControlGroup>
```

In this example, the controls will appear as a menu. Tapping or interacting with the group will present the items in a menu-like interface.

### Using a Palette Style

```tsx
<ControlGroup
  title="Text Formatting"
  controlGroupStyle="palette"
>
  <Button title="Bold" action={() => console.log('Bold pressed')} />
  <Button title="Italic" action={() => console.log('Italic pressed')} />
  <Button title="Underline" action={() => console.log('Underline pressed')} />
</ControlGroup>
```

Here, the controls may be displayed together in a palette, which could show multiple styling options together for quick selection.

### Automatic Style

If you’re unsure which style is best, or want to let the system pick a suitable style, you can choose `automatic`:

```tsx
<ControlGroup
  title="Media Controls"
  controlGroupStyle="automatic"
>
  <Button title="Action A" action={() => console.log('Action A')} />
  <Button title="Action B" action={() => console.log('Action B')} />
</ControlGroup>
```

## Summary

By setting `controlGroupStyle`, you guide how your set of controls are displayed and interacted with. Whether you choose a `menu`, `compactMenu`, `navigation`, `palette`, or rely on `automatic`, this property helps ensure that your script’s controls feel naturally integrated with the platform’s UI conventions and user expectations.
