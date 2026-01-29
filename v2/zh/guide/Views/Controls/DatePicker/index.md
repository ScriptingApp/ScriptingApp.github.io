# 日期、时间选择器

`DatePicker` 是一个用于选择日期（以及可选的时间）的 UI 组件，支持通过多种显示方式（如日历、滚轮、文本等）进行交互。它允许用户根据自己的需求选择特定的日期，并根据组件配置决定是否包括时间选择。此组件特别适合需要日期和时间输入的场景，例如选择事件的开始日期或任务的截止日期。

## 参数

### `DatePickerProps` 类型

- **`title`** (必选)：`string`

  设置日期选择器的标题，通常用于描述选择的目的，例如“选择日期”。

- **`children`** (可选)：`(VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode`

  用于渲染自定义的子视图内容。如果没有自定义内容，则无需传递此属性。

- **`value`** (必选)：`number`

  表示当前选定日期的时间戳（毫秒数）。该值会传递给 `onChanged` 事件处理器。

- **`onChanged`** (必选)：`(value: number) => void`

  当日期值发生变化时调用的回调函数，参数是新的时间戳。

- **`startDate`** (可选)：`number`

  设置可选日期范围的起始日期时间戳。用户只能选择该日期之后的日期。

- **`endDate`** (可选)：`number`

  设置可选日期范围的结束日期时间戳。用户只能选择该日期之前的日期。

- **`displayedComponents`** (可选)：`DatePickerComponents[]`

  一个可选的数组，指定用户能够查看和编辑的日期组件。默认值是 `['hourAndMinute', 'date']`，表示同时显示日期和时间（小时和分钟）。如果需要显示秒数（仅在 watchOS 可用），可以选择 `['hourMinuteAndSecond']`。

### `DatePickerComponents` 类型

该类型定义了日期选择器中可能显示的组件：

- **`date`**：显示日、月和年，基于当前区域设置。
- **`hourAndMinute`**：显示小时和分钟，基于当前区域设置。
- **`hourMinuteAndSecond`**：仅在 watchOS 上可用，显示小时、分钟和秒数，基于当前区域设置。

### `DatePickerStyle` 类型

定义了 `DatePicker` 组件的样式类型。支持以下选项：

- **`automatic`**：默认样式，自动选择合适的显示方式。
- **`compact`**：紧凑样式，以文本格式显示各个日期组件。
- **`graphical`**：图形样式，显示一个可互动的日历或时钟。
- **`wheel`**：滚轮样式，每个日期组件显示为一个可以滚动的列。
- **`field`**：仅在 macOS 上可用，显示为可编辑的文本字段。
- **`stepperField`**：仅在 macOS 上可用，显示为可编辑的文本字段，旁边带有步进器，可增加或减少选中的日期组件。

## 示例代码

以下是 `DatePicker` 组件的示例使用代码：

```tsx
<DatePicker
  title="选择日期和时间"
  value={new Date().getTime()}
  onChanged={(newDate) => console.log('新日期:', newDate)}
  startDate={new Date('2024-01-01').getTime()}
  endDate={new Date('2024-12-31').getTime()}
  displayedComponents={['date', 'hourAndMinute']}
  datePickerStyle="wheel"
/>
```

## 用法说明

`DatePicker` 组件可以通过 `displayedComponents` 属性控制显示的内容。默认情况下，它会显示日期和时间（小时和分钟），但您可以根据需求定制其显示组件。例如，在 `watchOS` 设备上，您可以选择显示小时、分钟和秒数。

选择器的外观和交互方式可以通过 `datePickerStyle` 属性进一步定制。不同的样式提供不同的用户体验，您可以根据平台和用户需求选择最合适的样式。

## 注意事项

- `startDate` 和 `endDate` 用于限定用户可选择的日期范围，确保用户只能选择有效的日期。
- `displayedComponents` 属性的设置需要根据您的需求进行调整。如果不需要时间选择，您可以仅显示日期组件。
- `DatePicker` 支持在不同平台上提供不同的体验（例如，`stepperField` 仅在 macOS 上可用），请确保根据平台调整样式选项。
