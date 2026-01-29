---
title: Slider
description: A control for selecting a value from a bounded linear range of values.

---
        
The `Slider` component allows users to select a value from a bounded linear range of values. You can configure the slider by setting the minimum value, maximum value, step size, and the current value. The component also supports custom labels to describe the minimum and maximum values, as well as the slider itself. Additionally, it provides callbacks for handling value changes and editing state changes.

## SliderProps Type

`SliderProps` defines the properties for the `Slider` component, which includes the following fields:

- **min** (`number`):  
  - The minimum value of the slider.
  - **Required**.

- **max** (`number`):  
  - The maximum value of the slider.
  - **Required**.

- **step** (`number`):  
  - The step size between each valid value of the slider.
  - **Optional**, defaults to `1`.

- **value** (`number`):  
  - The selected value within bounds.
  - **Required**, must be between `min` and `max`.

- **onChanged** (`(value: number) => void`):  
  - A callback function that is called whenever the slider value changes.
  - **Required**, called each time the value is updated.

- **onEditingChanged** (`(value: boolean) => void`):  
  - An optional callback function called when the editing state of the slider changes.
  - `value` is `true` when editing starts, and `false` when editing ends.

- **label** (`VirtualNode`):  
  - An optional view that describes the purpose of the slider. Even if some slider styles do not display the label, the system uses it for accessibility purposes (e.g., VoiceOver).
  - **Optional**.

- **minValueLabel** (`VirtualNode`):  
  - An optional view that describes the minimum value of the slider.
  - **Optional**, used only in the `SliderWithRangeValueLabelProps` mode.

- **maxValueLabel** (`VirtualNode`):  
  - An optional view that describes the maximum value of the slider.
  - **Optional**, used only in the `SliderWithRangeValueLabelProps` mode.

## SliderWithRangeValueLabelProps Type

`SliderWithRangeValueLabelProps` is a type that defines additional properties for labeling the slider's range. It includes:

- **label** (`VirtualNode`):  
  - The label that describes the purpose of the slider.

- **minValueLabel** (`VirtualNode`):  
  - The label that describes the minimum value of the slider.

- **maxValueLabel** (`VirtualNode`):  
  - The label that describes the maximum value of the slider.

## Usage Example

Here’s an example of using the `Slider` component:

```tsx
import { Slider } from 'scripting'

const ExampleSlider = () => {
  const [value, setValue] = useState(50)

  const handleChange = (newValue: number) => {
    setValue(newValue)
  }

  return (
    <Slider
      min={0}
      max={100}
      value={value}
      onChanged={handleChange}
      label={<Text>Adjust Volume</Text>}
      minValueLabel={<Text>0</Text>}
      maxValueLabel={<Text>100</Text>}
    />
  )
}
```

In this example, the `Slider` component is configured with a range from `0` to `100`, with the default value set to `50`. Labels for the slider's purpose, as well as the minimum and maximum values, are provided.

## Important Notes

- The `min` and `max` properties of the `Slider` must be numeric, and the `value` must be within this range.
- The `onChanged` callback will trigger whenever the slider's value changes, passing the new value.
- If you use `SliderWithRangeValueLabelProps`, you must provide appropriate view elements for `minValueLabel` and `maxValueLabel`.

## Summary

The `Slider` component is a versatile UI control suitable for scenarios where the user needs to select a numerical value. With its flexible properties and callbacks, it can handle a wide range of use cases, especially when labels for the minimum, maximum values, or the slider itself are needed.