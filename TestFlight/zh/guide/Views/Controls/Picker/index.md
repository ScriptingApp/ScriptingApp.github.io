# 选择器

`Picker` 组件用于从一组互斥的选项中进行选择。它支持不同的显示样式，并允许用户选择单个值。可以通过设置 `value` 和 `onChanged` 属性来控制选项的值和改变事件。

## 类型定义

- `PickerValue`: 选择值的类型，支持 `number` 或 `string`。
- `PickerProps<T extends PickerValue>`: `Picker` 组件的属性类型，其中：
  - `value`: 当前选中的值，可以是 `number` 或 `string`，可选。
  - `onChanged`: 当选择的值发生变化时调用的函数，参数为选中的值（`T`）。
  - `children`: 选项视图，每个子元素都必须使用 `tag` 属性来标记其值，可以是一个 `JSX.Element` 或多个 `JSX.Element` 的数组。
  - `title`: 字符串类型，表示选择项的描述标题，仅在某些情况下使用。
  - `systemImage`: 系统图标的名称，仅在某些情况下使用。
  - `label`: 用于描述选择项的 `JSX.Element` 视图，仅在某些情况下使用。

## 组件功能

`Picker` 组件通过设置 `value` 和 `onChanged` 来管理用户的选择。`value` 是当前选择的值，`onChanged` 是一个回调函数，当用户更改选择时被调用。`children` 提供了选项的视图，允许使用多种不同的布局来展示选项。每个 `children` 元素必须使用 `tag` 属性来标记其值，例如 `<Text tag={1}>Option 1</Text>`。

## Picker 样式

`Picker` 组件支持以下几种样式，用于调整组件的呈现方式：

- `automatic`: 默认样式，基于 `Picker` 上下文自动决定样式。
- `inline`: 将每个选项与当前容器中的其他视图并排显示。
- `menu`: 以菜单形式展示选项，通常通过按钮点击展开，或者在更大菜单中作为子菜单。
- `navigationLink`: 通过导航链接形式呈现，点击后会展示一个 `List` 样式的选择器视图。
- `palette`: 将选项呈现为一行紧凑的元素。
- `segmented`: 将选项以分段控制样式显示。
- `wheel`: 通过可滚动的轮盘展示选项，显示当前选择项和若干邻近选项。

## 示例

以下是如何使用 `Picker` 组件的示例：

### 示例 1：数字类型的 Picker

```tsx
import { Picker, Text, useState } from 'scripting'

const MyPicker = () => {
  const [selectedValue, setSelectedValue] = useState<number>(1)

  return (
    <Picker
      value={selectedValue}
      onChanged={(newValue) => setSelectedValue(newValue)}
      pickerStyle="inline"
    >
      <Text tag={1}>Option 1</Text>
      <Text tag={2}>Option 2</Text>
      <Text tag={3}>Option 3</Text>
    </Picker>
  )
}
```

### 示例 2：字符串类型的 Picker

```tsx
import { Picker, Text, useState } from 'scripting'

const MyPicker = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Option 1")

  return (
    <Picker
      value={selectedValue}
      onChanged={(newValue) => setSelectedValue(newValue)}
      pickerStyle="segmented"
    >
      <Text tag="Option 1">Option 1</Text>
      <Text tag="Option 2">Option 2</Text>
      <Text tag="Option 3">Option 3</Text>
    </Picker>
  )
}
```

### 示例 3：带标题和系统图标的 Picker

```tsx
import { Picker, Text, useState } from 'scripting'

const MyPicker = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Option 1")

  return (
    <Picker
      value={selectedValue}
      onChanged={(newValue) => setSelectedValue(newValue)}
      pickerStyle="menu"
      title="Choose an option"
      systemImage="star"
    >
      <Text tag="Option 1">Option 1</Text>
      <Text tag="Option 2">Option 2</Text>
      <Text tag="Option 3">Option 3</Text>
    </Picker>
  )
}
```

## `Picker` 组件的常用场景

1. **表单选择项**：可以用于表单中的单选项，帮助用户从一组预定义的选项中做出选择。
2. **设置界面**：在应用设置中，`Picker` 可以用于选择颜色、主题、语言等选项。
3. **导航选项**：在更复杂的界面中，`Picker` 还可以作为多层菜单的选择工具。

## 注意事项

- 每个 `Picker` 的 `children` 元素必须使用 `tag` 属性来标记其对应的值，例如 `<Text tag={1}>Option 1</Text>`。
- `value` 和 `onChanged` 必须配合使用，确保在用户更改选择时能够正确响应。
- `pickerStyle` 提供了多种样式，选择适合的样式可以提升用户体验。

### 相关 API

- `JSX.Element`: 用于定义视图元素的基本结构，`Picker` 组件的 `children` 属性依赖此类型。
- `useState`: 用于管理选中值的状态。
