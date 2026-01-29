---
title: ProgressView
description: A view that shows the progress toward completion of a task.

---
        
`ProgressView` is a UI component that visually represents the progress of a task or operation. It can display both determinate (percentage complete) and indeterminate (progressing or not) types of progress. Additionally, it offers customizable progress view styles, including linear and circular representations.

You can use `ProgressView` to display the progress of various tasks, such as downloading a file, completing a process, or waiting for an event. The component can also show additional details like labels for the task description and current progress.

## Usage

### Component Declaration
The `ProgressView` component accepts two possible sets of properties, depending on whether you want to represent a time-based interval or a general progress task. These are specified through the `ProgressViewProps` type, which can be one of the following:
- `TimerIntervalProgressViewProps`
- `NormalProgressViewProps`

You can create a determinate progress view by binding the `value` and `total` properties to represent progress. Additionally, the component supports custom styling through the `progressViewStyle` property.

### Example: Timer-Based Progress View

```tsx
<ProgressView
  timerFrom={startTimestamp}
  timerTo={endTimestamp}
  countsDown={true}
  label={<Text>Task in Progress</Text>}
  currentValueLabel={<Text>50% Complete</Text>}
/>
```

### Example: Normal Progress View

```tsx
<ProgressView
  value={0.5}
  total={1.0}
  title="Loading"
  label={<Text>File Download</Text>}
  currentValueLabel={<Text>50% Complete</Text>}
/>
```

## Props

### `TimerIntervalProgressViewProps`

- **`timerFrom`** (`number`):  
  The start timestamp (in milliseconds) that defines the beginning of the progress interval. This is used to calculate how much time has passed in the progress view.
  
- **`timerTo`** (`number`):  
  The end timestamp (in milliseconds) that defines the completion of the progress interval. This marks the end point of the progress view.

- **`countsDown`** (`boolean`, optional, default: `true`):  
  If set to `true`, the progress view counts down from the `timerFrom` to `timerTo` timestamp. If `false`, it will count up.

- **`label`** (`VirtualNode`, optional):  
  A virtual node that provides additional context or description about the task in progress. This could be a text label or another type of view.

- **`currentValueLabel`** (`VirtualNode`, optional):  
  A virtual node that describes the current value or progress of the task. For example, this could show the current percentage of completion.

### `NormalProgressViewProps`

- **`value`** (`number`, optional):  
  The completed progress of the task so far. This is a floating-point number between `0.0` and `total`, representing the task's completion percentage. If `nil`, the progress is indeterminate.

- **`total`** (`number`, optional, default: `1.0`):  
  The total amount representing 100% completion of the task. The progress is considered complete when `value` equals `total`. Defaults to `1.0`.

- **`title`** (`string`, optional):  
  The title or name of the task that is being represented in the progress view.

- **`label`** (`VirtualNode`, optional):  
  A virtual node that describes the task in progress, similar to the `label` property in `TimerIntervalProgressViewProps`.

- **`currentValueLabel`** (`VirtualNode`, optional):  
  A virtual node that shows the current progress value of the task, similar to the `currentValueLabel` in `TimerIntervalProgressViewProps`.

### `CommonViewProps`

- **`progressViewStyle`** (`ProgressViewStyle`, optional):  
  The style of the progress view. The available styles are:
  - **`automatic`**: The default style based on the current context of the view being styled.
  - **`circular`**: A circular gauge style to show progress. On platforms other than macOS, this may appear as an indeterminate indicator.
  - **`linear`**: A horizontal bar style indicating the task's progress.

### `ProgressViewStyle`

- **`linear`**: A progress view that visually indicates its progress using a horizontal bar.
- **`circular`**: A circular progress view that indicates the partial completion of an activity. On non-macOS platforms, this may be used for indeterminate progress.
- **`automatic`**: The default style, which automatically chooses the appropriate style based on the context.

## Notes
- `ProgressView` automatically adjusts its display based on the values provided in the `TimerIntervalProgressViewProps` or `NormalProgressViewProps`.
- If both `value` and `total` are provided, the progress will be determinate. If either of them is `nil`, the progress view will be indeterminate.
- You can use the `label` and `currentValueLabel` properties to customize the UI by passing any type of view, including text, images, or custom components.
- The `progressViewStyle` can be set to customize the visual style of the progress indicator. By default, it uses the `automatic` style, but you can choose `linear` or `circular` depending on your needs.

## Examples

### Determinate Progress (with value and total)

```tsx
<ProgressView
  value={0.75}
  total={1.0}
  title="Task Progress"
  label={<Text>Task is 75% complete</Text>}
  currentValueLabel={<Text>75%</Text>}
  progressViewStyle="linear"
/>
```

### Indeterminate Progress (without value)

```tsx
<ProgressView
  title="Loading"
  label={<Text>Loading file...</Text>}
  progressViewStyle="circular"
/>
```

## Conclusion
`ProgressView` is a flexible and easy-to-use UI component that supports both determinate and indeterminate progress states. It allows you to display progress through either a linear or circular visual representation. With the ability to customize progress details and UI style, `ProgressView` is an ideal choice for indicating task progress in various scenarios.