# 进度视图

`ProgressView` 是一个用于表示任务或操作进度的 UI 组件。它可以显示确定性（百分比完成）和不确定性（正在进行或未进行）的进度状态。此外，它还提供了可自定义的进度视图样式，包括线性和圆形表示。

你可以使用 `ProgressView` 来显示各种任务的进度，例如下载文件、完成某个过程或等待某个事件。该组件还可以显示附加的细节，如任务描述和当前进度。

## 使用方法

### 组件声明

`ProgressView` 组件接受两种可能的属性集，具体取决于你想表示的是基于时间的区间还是一般的进度任务。这些属性通过 `ProgressViewProps` 类型定义，可能是以下之一：

- `TimerIntervalProgressViewProps`
- `NormalProgressViewProps`

你可以通过绑定 `value` 和 `total` 属性来表示进度，从而创建一个确定性进度视图。此外，组件还支持通过 `progressViewStyle` 属性来自定义样式。

### 示例：基于时间区间的进度视图

```tsx
<ProgressView
  timerFrom={startTimestamp}
  timerTo={endTimestamp}
  countsDown={true}
  label={<Text>任务进行中</Text>}
  currentValueLabel={<Text>50% 完成</Text>}
/>
```

### 示例：普通进度视图

```tsx
<ProgressView
  value={0.5}
  total={1.0}
  title="加载中"
  label={<Text>文件下载中</Text>}
  currentValueLabel={<Text>50% 完成</Text>}
/>
```

## 属性

### `TimerIntervalProgressViewProps`

- **`timerFrom`** (`number`):\
  任务进度区间的起始时间戳（以毫秒为单位）。此值用于计算进度视图中已过去的时间。

- **`timerTo`** (`number`):\
  任务进度区间的结束时间戳（以毫秒为单位）。此值表示进度视图的结束点。

- **`countsDown`** (`boolean`, 可选，默认值: `true`):\
  如果设置为 `true`，进度视图会从 `timerFrom` 倒计时至 `timerTo`。如果设置为 `false`，则表示进度会从 `timerFrom` 增长至 `timerTo`。

- **`label`** (`VirtualNode`, 可选):\
  一个虚拟节点，用于提供任务的描述或附加信息。这可以是一个文本标签或其他类型的视图。

- **`currentValueLabel`** (`VirtualNode`, 可选):\
  一个虚拟节点，描述任务的当前进度值。例如，这可以显示当前的完成百分比。

### `NormalProgressViewProps`

- **`value`** (`number`, 可选):\
  任务当前的进度值，范围为 `0.0` 到 `total` 之间，表示任务完成的百分比。如果为 `nil`，则视图为不确定性进度。

- **`total`** (`number`, 可选，默认值: `1.0`):\
  完成任务所需的总进度值。当 `value` 等于 `total` 时，任务完成。默认值为 `1.0`。

- **`title`** (`string`, 可选):\
  正在进行的任务的标题或名称。

- **`label`** (`VirtualNode`, 可选):\
  描述任务进度的虚拟节点，类似于 `TimerIntervalProgressViewProps` 中的 `label` 属性。

- **`currentValueLabel`** (`VirtualNode`, 可选):\
  显示当前进度值的虚拟节点，类似于 `TimerIntervalProgressViewProps` 中的 `currentValueLabel` 属性。

### `CommonViewProps`

- **`progressViewStyle`** (`ProgressViewStyle`, 可选):\
  用于此视图的进度视图样式。可用样式包括：
  - **`automatic`**: 根据当前上下文自动选择的默认样式。
  - **`circular`**: 使用圆形进度条样式，表示活动的部分完成。在 macOS 之外的平台，圆形样式可能会显示为不确定性指示器。
  - **`linear`**: 使用水平条形样式来显示任务的进度。

### `ProgressViewStyle`

- **`linear`**: 使用水平条形来表示进度。
- **`circular`**: 使用圆形进度条来表示任务的部分完成。在 macOS 之外的平台，通常用于不确定性进度。
- **`automatic`**: 默认样式，自动根据上下文选择进度视图样式。

## 注意事项

- `ProgressView` 会根据提供的 `TimerIntervalProgressViewProps` 或 `NormalProgressViewProps` 中的值自动调整显示方式。
- 如果同时提供了 `value` 和 `total`，则视为确定性进度。如果其中任意一个为 `nil`，则视为不确定性进度。
- 你可以通过 `label` 和 `currentValueLabel` 属性自定义 UI，传递任何类型的视图，包括文本、图片或自定义组件。
- `progressViewStyle` 属性用于自定义进度视图的视觉样式。默认情况下，使用 `automatic` 样式，但你可以根据需要选择 `linear` 或 `circular`。

## 示例

### 确定性进度（包含 value 和 total）

```tsx
<ProgressView
  value={0.75}
  total={1.0}
  title="任务进度"
  label={<Text>任务已完成 75%</Text>}
  currentValueLabel={<Text>75%</Text>}
  progressViewStyle="linear"
/>
```

### 不确定性进度（没有 value）

```tsx
<ProgressView
  title="加载中"
  label={<Text>正在加载文件...</Text>}
  progressViewStyle="circular"
/>
```

## 结论

`ProgressView` 是一个灵活且易于使用的 UI 组件，支持确定性和不确定性进度状态。它允许通过线性或圆形进度指示器展示进度，并且支持自定义任务细节和视觉样式。使用 `ProgressView`，你可以在各种场景中有效地展示任务的进度。
