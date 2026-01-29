---
title: Gauge
description: A view that shows a value within a range.

---
        
The `Gauge` component is a view used to display the current value in relation to a specified finite capacity, similar to a fuel gauge in an automobile. The `Gauge` component is highly configurable and can display any combination of the current value, the range the gauge can display, and a label describing the purpose of the gauge itself. It is suitable for showing the current value of a limited capacity, such as progress, level, or quantity.

## Properties

### `value` (Required)
- **Type**: `number`
- **Description**: The current value to display in the gauge. This value should be within the range defined by the `min` and `max` properties.

### `label` (Required)
- **Type**: `VirtualNode`
- **Description**: A view element that describes the purpose of the gauge. For example, this could display descriptive text such as "Battery Level" or "Temperature".

### `min` (Optional)
- **Type**: `number`
- **Description**: The minimum valid value of the gauge, defaulting to `0`. It represents the lower bound of the gauge.

### `max` (Optional)
- **Type**: `number`
- **Description**: The maximum valid value of the gauge, defaulting to `1`. It represents the upper bound of the gauge.

### `currentValueLabel` (Optional)
- **Type**: `VirtualNode`
- **Description**: A view element that describes the current value of the gauge. For example, it could show a text label displaying the current value (e.g., "70%").

### `minValueLabel` (Optional)
- **Type**: `VirtualNode`
- **Description**: A view element that describes the lower bound of the gauge. For example, it could display a label like "0%" or "Min" at the minimum value position.

### `maxValueLabel` (Optional)
- **Type**: `VirtualNode`
- **Description**: A view element that describes the upper bound of the gauge. For example, it could display a label like "100%" or "Max" at the maximum value position.

### `gaugeStyle` (Optional)
- **Type**: `GaugeStyle`
- **Description**: The style of the gauge view. This property controls the visual appearance of the gauge and has the following options:
  - **`automatic`**: The default style based on the current context of the view being styled.
  - **`accessoryCircular`**: Displays an open circular ring with a marker that appears at a point along the ring to indicate the current value.
  - **`accessoryCircularCapacity`**: Displays a closed circular ring that is partially filled to indicate the current value.
  - **`circular`**: **(Available only on watchOS)** Displays an open circular ring with a marker that appears at a point along the ring to indicate the current value.
  - **`linearCapacity`**: Displays a bar that fills from the leading to trailing edge as the value increases.
  - **`accessoryLinear`**: Displays a bar with a marker that appears at a point along the bar to indicate the current value.
  - **`accessoryLinearCapacity`**: Displays a bar that fills from the leading to trailing edge as the value increases.
  - **`linear`**: **(Available only on watchOS)** Displays a bar with a marker that appears at a point along the bar to indicate the current value.

## Example Code

```tsx
<Gauge
  value={0.7}
  label={<Text>Battery Level</Text>}
  min={0}
  max={1}
  currentValueLabel={<Text>70%</Text>}
  minValueLabel={<Text>0%</Text>}
  maxValueLabel={<Text>100%</Text>}
  gaugeStyle="accessoryCircular"
/>
```

## Use Cases

The `Gauge` component is ideal for the following use cases:
- Displaying progress (e.g., task completion, download progress).
- Showing device status (e.g., battery level, signal strength).
- Displaying performance metrics (e.g., temperature, humidity, CPU usage).

By customizing properties such as `label` and `currentValueLabel`, the `Gauge` component can be adapted for various display needs, helping users understand the current state more clearly.

## Notes
- The `value` property should be within the range specified by `min` and `max` to ensure proper display.
- If `min` and `max` are not provided, the gauge will default to the range `[0, 1]`.
- Different `gaugeStyle` options provide varied visual representations. Select an appropriate style based on the device and context to enhance user experience.