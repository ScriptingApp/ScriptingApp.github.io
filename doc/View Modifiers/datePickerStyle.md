# datePickerStyle

The `datePickerStyle` property allows you to customize the appearance and interaction of the `DatePicker` view in your UI.

## Property Declaration

```tsx
DatePickerStyle = "automatic" | "compact" | "graphical" | "wheel" | "field" | "stepperField"
DatePickerComponents = "hourAndMinute" | "date" | "hourMinuteAndSecond"
```

***

## `DatePickerStyle` Values

The `DatePickerStyle` property accepts the following string values to define the appearance and interaction:

- **`automatic`**: The default style for date pickers.
- **`compact`**: Displays the date picker components in a compact, textual format.
- **`graphical`**: Displays the date picker as an interactive calendar or clock.
- **`wheel`**: Displays the date picker components as columns in a scrollable wheel.
- **`field`** _(macOS only)_: Displays the components in an editable field.
- **`stepperField`** _(macOS only)_: Displays the components in an editable field with an adjoining stepper to increment or decrement the selected component.

***

## `DatePickerComponents` Values

The `displayedComponents` property specifies which components of the date are shown and editable. Accepted values are:

- **`date`**: Displays the day, month, and year based on the locale.
- **`hourAndMinute`**: Displays the hour and minute components based on the locale.
- **`hourMinuteAndSecond`** _(watchOS only)_: Displays the hour, minute, and second components based on the locale.

***

## Usage Example

### Example 1: Graphical Date Picker

```tsx
function View() {
  const [date, setDate] = useState(Date.now())

  return <DatePicker
    title="Select Date"
    value={date}
    onChanged={setDate}
    startDate={Date.now() - 31556926000} // 1 year ago
    endDate={Date.now() + 31556926000}  // 1 year ahead
    displayedComponents={["date"]}
    datePickerStyle="graphical"
  />
}
```

This creates a graphical date picker for selecting a date.

***

### Example 2: Compact Date Picker with Time Selection

```tsx
function View() {
  const [time, setTime] = useState(Date.now())
  return <DatePicker
    title="Select Time"
    value={time}
    onChanged={setTime}
    displayedComponents={["hourAndMinute"]}
    datePickerStyle="compact"
  />
}
```

This creates a compact date picker for selecting the hour and minute.

***

### Example 3: Wheel Date Picker

```tsx
function View() {
  const [date, setDate] = useState(Date.now())
  return <DatePicker
    title="Choose Date and Time"
    value={date}
    onChanged={setDate}
    displayedComponents={["hourAndMinute", "date"]}
    datePickerStyle="wheel"
  />
}
```

This creates a date picker with a scrollable wheel for date and time selection.

***

## Notes

- The `DatePickerStyle` property maps directly to SwiftUI’s `datePickerStyle` modifier.
- Ensure that the `displayedComponents` and `datePickerStyle` values are compatible with the target platform to avoid runtime errors.
- For macOS-specific styles (`field` and `stepperField`), ensure the app is running on macOS.

With `DatePickerStyle`, you can create versatile date pickers to suit your app’s design and functional requirements.
