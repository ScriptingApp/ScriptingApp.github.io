---
title: progressViewStyle
description: The progressViewStyle property allows you to customize the appearance of a progress view.

---


The `progressViewStyle` property allows you to customize the appearance of a progress view in your UI.

## Property Declaration

```tsx
progressViewStyle?: ProgressViewStyle;
```

### Description
The `progressViewStyle` property defines the style of a progress view, allowing you to select a visual representation that best fits your app’s context.

### Accepted Values
The `progressViewStyle` property accepts the following string values:

- **`automatic`**: Uses the default progress view style, adapting to the current context of the view being styled.
- **`circular`**: Displays a circular gauge to indicate the partial completion of an activity. On platforms other than macOS, this style may appear as an indeterminate indicator.
- **`linear`**: Displays a horizontal bar to visually indicate progress.

### Default Behavior
If `progressViewStyle` is not specified, the default style (`automatic`) is applied based on the view’s context.

---

## Progress View Properties

### Timer Interval Progress View Properties

Use these properties to display a progress view for a time-based task:

- **`timerFrom`**: The starting date range timestamp over which the view progresses.
- **`timerTo`**: The ending date range timestamp over which the view progresses.
- **`countsDown`** *(optional)*: If true (default), the view empties as time passes.
- **`label`** *(optional)*: A view that describes the task in progress.
- **`currentValueLabel`** *(optional)*: A view that describes the level of completed progress of the task.

### Normal Progress View Properties

Use these properties to display a progress view for a task with a defined scope:

- **`value`** *(optional)*: The completed amount of the task to this point, in a range of 0.0 to `total`, or `nil` if the progress is indeterminate.
- **`total`** *(optional)*: The full amount representing the complete scope of the task (default is 1.0).
- **`title`** *(optional)*: A title describing the task in progress.
- **`label`** *(optional)*: A view that describes the task in progress.
- **`currentValueLabel`** *(optional)*: A view that describes the level of completed progress of the task.

---

## Usage Example

### Example 1: Timer Interval Progress View

```tsx
<ProgressView
  progressViewStyle="circular"
  timerFrom={Date.now()}
  timerTo={Date.now() + 3600000}
  countsDown={true}
  label={<Text>Timer Progress</Text>}
  currentValueLabel={<Text>Remaining Time</Text>}
/>
```

This creates a circular progress view for a timer interval task.

### Example 2: Normal Progress View

```tsx
<ProgressView
  progressViewStyle="linear"
  value={0.5}
  total={1.0}
  title="File Upload"
  label={<Text>Uploading...</Text>}
  currentValueLabel={<Text>50%</Text>}
/>
```

This creates a linear progress view for a task with 50% completion.

---

## Notes
- The `progressViewStyle` property directly maps to SwiftUI’s `progressViewStyle` modifier.
- Ensure the string value matches one of the predefined styles listed above to avoid runtime errors.
