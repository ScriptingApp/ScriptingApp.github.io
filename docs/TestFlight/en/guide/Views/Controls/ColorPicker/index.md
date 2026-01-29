---
title: ColorPicker
description: A control used to select a color from the system color picker UI.

---
        
The `ColorPicker` component provides a system color picker UI that allows users to select a color and passes the selected color back to the application via the `onChanged` event. It supports the following formats for colors:
- Keyword colors (e.g., `green`, `red`, `blue`, etc.)
- Hexadecimal color strings (e.g., `#FF5733` or `#333`)
- CSS rgba strings (e.g., `rgba(255,0,0,1)`)

---

## `ColorPickerProps`

`ColorPickerProps` is the type of properties for the `ColorPicker` component. It can be defined in the following two ways:

### 1. Using the `title` property
- **`title`** (`string`): Provides a title for the color picker, describing its purpose or offering guidance to the user.

### 2. Using the `children` property
- **`children`** (`VirtualNode | undefined | null | (VirtualNode | undefined | null)[]` | `VirtualNode`): A custom view that describes the usage of the selected color. The system color picker UI will use the text of this view to set the title. If you don't use `children`, you can simply use `title`.

### Additional properties

- **`value`** (`Color`): The current selected color value. It can be a keyword color, hexadecimal color string, or RGBA string.
  
- **`onChanged`** (`(value: Color) => void`): A callback function triggered when the color changes. This callback is invoked with the new color value when the user selects a new color.

- **`supportsOpacity`** (`boolean`, optional): If set to `true`, allows the user to adjust the opacity of the selected color. The default is `true`.

---

### Example Code

```tsx
import { useState } from 'scripting'
import { ColorPicker } from 'scripting'

const MyComponent = () => {
  const [color, setColor] = useState<Color>('#FF5733')

  return (
    <ColorPicker
      title="Pick a Color"
      value={color}
      onChanged={setColor}
    />
  )
}
```

### Explanation
In the example above:
- The `ColorPicker` component’s `title` is set to `"Pick a Color"`, instructing the user to choose a color.
- The initial color value is `#FF5733`.
- The `onChanged` callback is triggered when the color changes, updating the `color` state.

### Optional Opacity Support

If you wish to allow adjusting the opacity of the selected color, you can enable this feature by setting the `supportsOpacity` property:

```tsx
<ColorPicker
  title="Pick a Color"
  value={color}
  onChanged={setColor}
  supportsOpacity={true}
/>
```

## `Color` Type

The `Color` type is used to define various color formats, including:
- **Keyword colors**: such as `"red"`, `"green"`, `"blue"`, etc.
- **Hexadecimal strings**: such as `"#FF5733"`.
- **CSS rgba strings**: such as `rgba(255, 0, 0, 0.5)`.

### Example

```tsx
const color: Color = 'rgba(255, 0, 0, 0.5)'
```