# 滑块控件

`Slider` 组件允许用户从一个有限的线性范围内选择一个值。可以通过设置最小值、最大值、步长和当前值来配置滑动条，支持自定义标签用于描述最小值、最大值及滑动条本身。这个组件还支持处理值的变化和编辑状态的回调。

## SliderProps 类型

`SliderProps` 是 `Slider` 组件的属性类型，包含以下字段：

- **min** (`number`):
  - 设置滑动条的最小值。
  - **必选**。

- **max** (`number`):
  - 设置滑动条的最大值。
  - **必选**。

- **step** (`number`):
  - 设置滑动条上每次有效值之间的间隔。
  - **可选**，默认为 `1`。

- **value** (`number`):
  - 设置当前选中的值。
  - **必选**，必须在 `min` 和 `max` 之间。

- **onChanged** (`(value: number) => void`):
  - 一个回调函数，用于监听滑动条的值变化。
  - **必选**，每次值变化时会被调用。

- **onEditingChanged** (`(value: boolean) => void`):
  - 一个可选回调函数，当滑动条的编辑状态发生变化时会被调用。
  - `value` 为 `true` 时表示滑动条正在被编辑，`false` 表示编辑已结束。

- **label** (`VirtualNode`):
  - 一个可选视图，用于描述滑动条的目的。即使某些滑动条样式不会显示该标签，系统仍然会用于可访问性目的（例如，VoiceOver）。
  - **可选**。

- **minValueLabel** (`VirtualNode`):
  - 一个可选视图，用于描述滑动条的最小值。
  - **可选**，仅在 `SliderWithRangeValueLabelProps` 模式下使用。

- **maxValueLabel** (`VirtualNode`):
  - 一个可选视图，用于描述滑动条的最大值。
  - **可选**，仅在 `SliderWithRangeValueLabelProps` 模式下使用。

## SliderWithRangeValueLabelProps 类型

`SliderWithRangeValueLabelProps` 是用于描述滑动条的附加信息的属性类型。它包括：

- **label** (`VirtualNode`):
  - 用于描述滑动条目的标签。

- **minValueLabel** (`VirtualNode`):
  - 用于描述最小值的标签。

- **maxValueLabel** (`VirtualNode`):
  - 用于描述最大值的标签。

## 使用示例

以下是一个使用 `Slider` 组件的简单示例：

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
      label={<Text>调整音量</Text>}
      minValueLabel={<Text>0</Text>}
      maxValueLabel={<Text>100</Text>}
    />
  )
}
```

在此示例中，`Slider` 组件配置了一个从 `0` 到 `100` 的滑动条，默认值为 `50`。标签和最小、最大值标签分别描述了滑动条的目的和范围。

## 注意事项

- `Slider` 组件的 `min` 和 `max` 必须设置为数值，且 `value` 必须在这个范围内。
- 当用户调整滑动条时，`onChanged` 回调会触发，传入新的值。
- 如果使用 `SliderWithRangeValueLabelProps`，则必须为 `minValueLabel` 和 `maxValueLabel` 提供合适的视图元素。

## 小结

`Slider` 组件是一个功能强大的 UI 控件，适用于需要用户选择数值的场景。通过灵活的属性和回调，可以实现许多自定义行为，尤其是在需要提供最小、最大值说明或标签的场景中。
