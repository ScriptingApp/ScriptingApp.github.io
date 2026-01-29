---
title: pickerStyle
description: The pickerStyle property allows you to customize the appearance and behavior of pickers within a view hierarchy.

---


The `pickerStyle` property allows you to customize the appearance and behavior of pickers within a view hierarchy in your UI.

## Property Declaration

```tsx
pickerStyle?: PickerStyle;
```

### Description
The `pickerStyle` property sets the visual style of pickers, enabling you to adapt them to the context and desired user experience.

### Accepted Values
The `pickerStyle` property accepts the following string values:

- **`automatic`**: The default picker style, adapting to the picker’s context.
- **`inline`**: Displays each option inline with other views in the current container.
- **`menu`**: Presents the options as a menu when the user presses a button or as a submenu when nested within a larger menu.
- **`navigationLink`**: Represents a picker style where the options are presented by pushing a List-style picker view via a navigation link.
- **`palette`**: Presents the options as a row of compact elements.
- **`segmented`**: Displays the options in a segmented control.
- **`wheel`**: Displays the options in a scrollable wheel, showing the selected option and a few neighboring options.

### Default Behavior
If `pickerStyle` is not specified, the default style (`automatic`) is applied based on the picker’s context.

## Usage Example

Here’s how you can apply the `pickerStyle` property in your TypeScript code:

### Example: Inline Picker Style

```tsx
function View() {
  const [
    value,
    setValue
  ] = useState(0)

  return <Picker
    title="Picker"
    pickerStyle="inline"
    value={value}
    onChanged={(value) => {
      setValue(value)
      console.log('Selected:', value)
    }}
  >
    <Text tag={0}>Option 1</Text>
    <Text tag={1}>Option 2</Text>
    <Text tag={2}>Option 3</Text>
  </Picker>
}
```

This creates a picker with an inline style.

### Example: Segmented Picker Style

```tsx
function View() {
  const [
    value,
    setValue
  ] = useState(0)

  return <Picker
    title="Picker"
    pickerStyle="segmented"
    value={value}
    onChanged={(value) => {
      setValue(value)
      console.log('Selected:', value)
    }}
  >
    <Text tag={0}>Option 1</Text>
    <Text tag={1}>Option 2</Text>
    <Text tag={2}>Option 3</Text>
  </Picker>
}
```

This creates a picker displayed in a segmented control.

### Example: Wheel Picker Style

```tsx
function View() {
  const [
    value,
    setValue
  ] = useState(0)

  return <Picker
    title="Picker"
    pickerStyle="wheel"
    value={value}
    onChanged={(value) => {
      setValue(value)
      console.log('Selected:', value)
    }}
  >
    <Text tag={0}>Option 1</Text>
    <Text tag={1}>Option 2</Text>
    <Text tag={2}>Option 3</Text>
  </Picker>
}
```

This creates a picker with a scrollable wheel style.

## Notes
- The `pickerStyle` property directly maps to SwiftUI’s `pickerStyle` modifier.
- Ensure the string value matches one of the predefined styles listed above to avoid runtime errors.

With `pickerStyle`, you can customize the appearance of pickers to suit various contexts and provide a seamless user experience.
