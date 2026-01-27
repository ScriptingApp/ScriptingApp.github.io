---
title: DatePicker

---
        
The `DatePicker` is a UI component for selecting a date (and optionally a time). It supports various interactive display styles, such as calendar views, wheel selectors, and compact text formats. This component is ideal for scenarios where users need to select a specific date and time, such as choosing an event start date or a task deadline.

## Props

### `DatePickerProps` Type

- **`title`** (required): `string`
  
  The title of the date picker, typically used to describe the purpose of the selection, such as "Select Date."

- **`children`** (optional): `(VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode`
  
  Used for rendering custom child content. If no custom content is required, this property can be omitted.

- **`value`** (required): `number`
  
  The timestamp (in milliseconds) representing the currently selected date. This value is passed to the `onChanged` handler.

- **`onChanged`** (required): `(value: number) => void`
  
  A callback function that is called when the date value changes. The argument is the new timestamp.

- **`startDate`** (optional): `number`
  
  The starting date for selectable dates. The user can only select dates greater than or equal to this value.

- **`endDate`** (optional): `number`
  
  The ending date for selectable dates. The user can only select dates less than or equal to this value.

- **`displayedComponents`** (optional): `DatePickerComponents[]`
  
  An optional array specifying the date components the user can view and edit. The default value is `['hourAndMinute', 'date']`, which displays both the date and time (hour and minute). If you need to show seconds (only available on watchOS), you can use `['hourMinuteAndSecond']`.

### `DatePickerComponents` Type

This type defines the components that can be displayed in the date picker:

- **`date`**: Displays the day, month, and year based on the locale.
- **`hourAndMinute`**: Displays the hour and minute based on the locale.
- **`hourMinuteAndSecond`**: Available only on watchOS. Displays the hour, minute, and second components based on the locale.

### `DatePickerStyle` Type

Defines the style of the `DatePicker` component. The following options are available:

- **`automatic`**: The default style for the date picker, which automatically selects the most appropriate display format.
- **`compact`**: A compact style that displays the components in a textual format.
- **`graphical`**: A graphical style that shows an interactive calendar or clock.
- **`wheel`**: A wheel style where each component is displayed as a scrollable column.
- **`field`**: Available only on macOS. A field style that displays the components in an editable text field.
- **`stepperField`**: Available only on macOS. A system style that displays the components in an editable field, with an adjoining stepper to increment or decrement the selected component.

## Example Code

Here’s an example of how to use the `DatePicker` component:

```tsx
<DatePicker
  title="Select Date and Time"
  value={new Date().getTime()}
  onChanged={(newDate) => console.log('New Date:', newDate)}
  startDate={new Date('2024-01-01').getTime()}
  endDate={new Date('2024-12-31').getTime()}
  displayedComponents={['date', 'hourAndMinute']}
  datePickerStyle="wheel"
/>
```

## Usage Notes

The `DatePicker` component allows you to control the displayed components via the `displayedComponents` prop. By default, it will show both the date and time (hour and minute), but you can customize which components to display according to your needs. For example, on watchOS devices, you can show the hour, minute, and second components.

The appearance and interaction style of the date picker can be further customized using the `datePickerStyle` prop. Different styles provide varying user experiences, and you can choose the one most suitable for your platform and use case.

## Considerations

- The `startDate` and `endDate` properties are used to limit the selectable date range, ensuring that users can only select valid dates.
- The `displayedComponents` property can be adjusted according to your requirements. If you don't need time selection, you can opt to display only the date component.
- The `DatePicker` supports different experiences on various platforms (e.g., `stepperField` is only available on macOS), so make sure to adjust the style options based on the platform.
