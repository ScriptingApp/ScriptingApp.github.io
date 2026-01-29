---
title: Picker
description: A control for selecting from a set of mutually exclusive values.

---
        
The `Picker` component is used to select a single value from a set of mutually exclusive options. It supports various display styles and allows users to choose a single value. The selected value and the change event can be managed using the `value` and `onChanged` properties.

## Type Definitions

- `PickerValue`: The type of the selected value, which can be either `number` or `string`.
- `PickerProps<T extends PickerValue>`: The property type for the `Picker` component, which includes:
  - `value`: The current selected value, which can be a `number` or `string` (optional).
  - `onChanged`: A callback function triggered when the selected value changes, with the new value (`T`) as the parameter.
  - `children`: The option views, where each child must have a `tag` property to indicate its value. This can be a `JSX.Element` or an array of `JSX.Element`s.
  - `title`: A string describing the option's purpose, used in certain cases.
  - `systemImage`: The name of the system image resource, used in certain cases.
  - `label`: A `JSX.Element` that describes the purpose of the selection, used in certain cases.

## Component Functionality

The `Picker` component manages the user's selection through the `value` and `onChanged` properties. The `value` is the current selected value, and the `onChanged` is a callback function that is invoked when the user changes the selection. The `children` property defines the options' views, allowing multiple layouts to be used for displaying the options. Each `children` element must have a `tag` property to mark its value, for example, `<Text tag={1}>Option 1</Text>`.

## Picker Styles

The `Picker` component supports the following styles to adjust how the component is displayed:

- `automatic`: The default style, automatically determined based on the picker’s context.
- `inline`: Displays each option inline with other views in the current container.
- `menu`: Displays the options in a menu that opens when the user presses a button or as a submenu within a larger menu.
- `navigationLink`: Displays a navigation link that presents the options in a List-style picker view when clicked.
- `palette`: Displays the options as a row of compact elements.
- `segmented`: Displays the options in a segmented control style.
- `wheel`: Displays the options in a scrollable wheel, showing the selected option and a few neighboring options.

## Example Usage

Below are examples of how to use the `Picker` component:

### Example 1: Picker with Numeric Values

```tsx
import { Picker, Text, useState } from 'scripting'

const MyPicker = () => {
  const [selectedValue, setSelectedValue] = useState<number>(1)

  return (
    <Picker
      value={selectedValue}
      onChanged={(newValue) => setSelectedValue(newValue)}
      pickerStyle="inline"
    >
      <Text tag={1}>Option 1</Text>
      <Text tag={2}>Option 2</Text>
      <Text tag={3}>Option 3</Text>
    </Picker>
  )
}
```

### Example 2: Picker with String Values

```tsx
import { Picker, Text, useState } from 'scripting'

const MyPicker = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Option 1")

  return (
    <Picker
      value={selectedValue}
      onChanged={(newValue) => setSelectedValue(newValue)}
      pickerStyle="segmented"
    >
      <Text tag="Option 1">Option 1</Text>
      <Text tag="Option 2">Option 2</Text>
      <Text tag="Option 3">Option 3</Text>
    </Picker>
  )
}
```

### Example 3: Picker with Title and System Image

```tsx
import { Picker, Text, useState } from 'scripting'

const MyPicker = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Option 1")

  return (
    <Picker
      value={selectedValue}
      onChanged={(newValue) => setSelectedValue(newValue)}
      pickerStyle="menu"
      title="Choose an option"
      systemImage="star"
    >
      <Text tag="Option 1">Option 1</Text>
      <Text tag="Option 2">Option 2</Text>
      <Text tag="Option 3">Option 3</Text>
    </Picker>
  )
}
```

## Common Use Cases for `Picker`

1. **Form Selection**: `Picker` can be used in forms to select a single value from a predefined set of options.
2. **Settings Interface**: In app settings, `Picker` can be used to choose colors, themes, languages, etc.
3. **Navigation Options**: In more complex interfaces, `Picker` can serve as a tool for selecting options within multi-level menus.

## Notes

- Each `children` element in the `Picker` must use the `tag` property to mark its value, for example: `<Text tag={1}>Option 1</Text>`.
- The `value` and `onChanged` properties must be used together to ensure correct functionality when the user changes the selected value.
- The `pickerStyle` property provides various styles to enhance the user experience. Select the one that fits your use case best.

### Related APIs

- `JSX.Element`: The type used for defining the view structure. The `Picker` component’s `children` property relies on this type.
- `useState`: A React hook for managing the selected value’s state.
