# 选择器样式

通过该属性，你可以自定义视图层次结构中选择器（Picker）的外观和行为。

***

## 属性声明

```tsx
pickerStyle?: PickerStyle;
```

### 描述

`pickerStyle` 属性用于设置选择器的视觉样式，使其能够适应不同的上下文和用户体验需求。

***

### 可接受的值

`pickerStyle` 属性接受以下字符串值：

- **`automatic`**：默认选择器样式，根据选择器的上下文进行适配。
- **`inline`**：将每个选项内嵌显示在当前容器中的其他视图之间。
- **`menu`**：当用户按下按钮时，将选项作为菜单显示，或者作为嵌套菜单的一部分。
- **`navigationLink`**：通过导航链接将选项呈现为推送列表样式的选择器视图。
- **`palette`**：将选项以紧凑元素行的形式呈现。
- **`segmented`**：以分段控件的形式显示选项。
- **`wheel`**：将选项显示为可滚动的轮状视图，同时展示所选选项及其附近的一些选项。

***

### 默认行为

如果未指定 `pickerStyle`，则根据选择器的上下文自动应用默认样式（`automatic`）。

***

## 使用示例

以下示例展示了如何在 TypeScript 代码中应用 `pickerStyle` 属性：

### 示例 1：内嵌样式 (Inline Style)

```tsx
function View() {
  const [value, setValue] = useState(0)

  return <Picker
    title="选择器"
    pickerStyle="inline"
    value={value}
    onChanged={(value) => {
      setValue(value)
      console.log('选择了:', value)
    }}
  >
    <Text tag={0}>选项 1</Text>
    <Text tag={1}>选项 2</Text>
    <Text tag={2}>选项 3</Text>
  </Picker>
}
```

此示例创建了一个内嵌样式的选择器。

***

### 示例 2：分段样式 (Segmented Style)

```tsx
function View() {
  const [value, setValue] = useState(0)

  return <Picker
    title="选择器"
    pickerStyle="segmented"
    value={value}
    onChanged={(value) => {
      setValue(value)
      console.log('选择了:', value)
    }}
  >
    <Text tag={0}>选项 1</Text>
    <Text tag={1}>选项 2</Text>
    <Text tag={2}>选项 3</Text>
  </Picker>
}
```

此示例创建了一个以分段控件形式显示的选择器。

***

### 示例 3：滚轮样式 (Wheel Style)

```tsx
function View() {
  const [value, setValue] = useState(0)

  return <Picker
    title="选择器"
    pickerStyle="wheel"
    value={value}
    onChanged={(value) => {
      setValue(value)
      console.log('选择了:', value)
    }}
  >
    <Text tag={0}>选项 1</Text>
    <Text tag={1}>选项 2</Text>
    <Text tag={2}>选项 3</Text>
  </Picker>
}
```

此示例创建了一个滚轮样式的选择器。

***

## 注意事项

- `pickerStyle` 属性直接映射到 SwiftUI 的 `pickerStyle` 修饰符。
- 确保传入的字符串值与上述预定义样式之一匹配，以避免运行时错误。

通过使用 `pickerStyle`，你可以根据不同的上下文自定义选择器的外观，从而提供流畅的用户体验。
