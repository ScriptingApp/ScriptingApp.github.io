# gaugeStyle

The `GaugeStyle` type defines how a gauge is visually represented. By selecting a particular style, you control whether the gauge appears as a ring, a bar, or uses markers to indicate the current value. Some styles only apply on specific platforms (notably watchOS), while others are more broadly available.

## Overview

A `Gauge` component visually represents a value within a specified range. For example, you might use it to show a battery level, download progress, or temperature reading. By combining a `Gauge` with a chosen `GaugeStyle`, you can tailor the gauge’s appearance to match your app’s design language or functional requirements.

**Key points:**

- Choose a style that best suits the data you’re representing—rings for circular contexts, bars for linear contexts.
- Some styles show a marker at the current value; others show a filled segment or partial capacity.
- Certain styles are only available on watchOS, as noted below.

## Available Styles

- **`automatic`**:\
  Relies on the system’s default style for the current platform and context. This is a good starting point if you don’t have a strong preference.

- **`accessoryCircular`**:\
  Shows an open ring with a marker that points to the current value along the ring’s circumference. Great for showing levels or percentages in a compact, circular form.

- **`accessoryCircularCapacity`**:\
  Similar to `accessoryCircular` but shows a closed ring partially filled in up to the current value. This works well to indicate capacity levels, such as a storage meter.

- **`circular`** _(Only available on watchOS)_:\
  Like `accessoryCircular`, this displays an open ring with a marker. Useful for watchOS complications or similar small form factor displays.

- **`linearCapacity`**:\
  Displays a horizontal bar that fills from the leading edge to the trailing edge as the value increases. Ideal for progress bars, battery meters, or memory usage indicators.

- **`accessoryLinear`**:\
  A linear gauge that shows a marker along a bar, indicating the exact point of the current value rather than a filled segment.

- **`accessoryLinearCapacity`**:\
  Combines aspects of `linearCapacity` with the `accessoryLinear` style. It shows a filled bar segment that grows with the value, suitable for showing capacity or progress out of a whole.

- **`linear`** _(Only available on watchOS)_:\
  Similar to `accessoryLinear` but watchOS-specific. It shows a marker along a bar for the current value.

## Example Usage

```tsx
<Gauge
  value={0.7}
  min={0}
  max={1}
  label={<Text>Battery</Text>}
  currentValueLabel={<Text>70%</Text>}
  minValueLabel={<Text>0%</Text>}
  maxValueLabel={<Text>100%</Text>}
  gaugeStyle="accessoryCircularCapacity"
/>
```

In this example, the gauge shows a partially filled circular ring indicating that the battery level is at 70%.

Switching to a linear capacity style:

```tsx
<Gauge
  value={0.7}
  min={0}
  max={1}
  label={<Text>Download Progress</Text>}
  currentValueLabel={<Text>70%</Text>}
  gaugeStyle="linearCapacity"
/>
```

This would show a horizontal bar filled from left to right up to 70% of its length.

If you prefer a style that shows a marker instead of a fill, you could do:

```tsx
<Gauge
  value={0.7}
  min={0}
  max={1}
  label={<Text>Temperature</Text>}
  currentValueLabel={<Text>Warm</Text>}
  gaugeStyle="accessoryCircular"
/>
```

This style displays an open ring with a marker pointing to the current value (70%) rather than a filled segment.

## When to Use Each Style

- **`circular` and `accessoryCircular` styles:**\
  Ideal for data that you intuitively represent in a circular format, such as a timer, speedometer-like reading, or capacity shown as a ring.

- **`linear` and `accessoryLinear` styles:**\
  Best for data that’s inherently linear, like progress bars, completion percentages, or levels that are typically read left to right.

- **`Capacity` styles:**\
  Perfect for scenarios where you want a filled segment to indicate how “full” or “complete” something is, such as battery life, storage space used, or loading progress.

- **`automatic`:**\
  Let the system decide and adapt style based on context. Good as a default choice if you’re unsure.

## Summary

By setting the `gaugeStyle` on a `Gauge`, you have full control over the visual representation of your data. Whether you want a circular ring, a linear bar, a simple marker, or a filled capacity indicator, `GaugeStyle` provides flexible options to present information in a way that feels both intuitive and aesthetically pleasing.
