---
title: 日期选择器样式

---

该属性用于自定义 `DatePicker` 视图在 UI 中的外观和交互方式。

---

## 属性声明

```tsx
DatePickerStyle = "automatic" | "compact" | "graphical" | "wheel" | "field" | "stepperField"
DatePickerComponents = "hourAndMinute" | "date" | "hourMinuteAndSecond"
```

---

## `DatePickerStyle` 值

`DatePickerStyle` 属性接受以下字符串值，用于定义日期选择器的外观和交互方式：

- **`automatic`**: 日期选择器的默认样式。
- **`compact`**: 将日期选择器组件以紧凑的文本格式显示。
- **`graphical`**: 将日期选择器显示为交互式日历或时钟。
- **`wheel`**: 将日期选择器组件显示为可滚动的轮状列。
- **`field`** *(仅 macOS)*: 将组件显示为可编辑的字段。
- **`stepperField`** *(仅 macOS)*: 将组件显示为带有递增/递减控件的可编辑字段。

---

## `DatePickerComponents` 值

`displayedComponents` 属性指定日期选择器显示和可编辑的日期组件。可接受的值包括：

- **`date`**: 显示基于本地化的日、月、年。
- **`hourAndMinute`**: 显示基于本地化的小时和分钟。
- **`hourMinuteAndSecond`** *(仅 watchOS)*: 显示基于本地化的小时、分钟和秒。

---

## 使用示例

### 示例 1: 图形化日期选择器

```tsx
function View() {
  const [date, setDate] = useState(Date.now())

  return <DatePicker
    title="选择日期"
    value={date}
    onChanged={setDate}
    startDate={Date.now() - 31556926000} // 1 年前
    endDate={Date.now() + 31556926000}  // 1 年后
    displayedComponents={["date"]}
    datePickerStyle="graphical"
  />
}
```

此示例创建了一个用于选择日期的图形化日期选择器。

---

### 示例 2: 紧凑型时间选择器

```tsx
function View() {
  const [time, setTime] = useState(Date.now())
  return <DatePicker
    title="选择时间"
    value={time}
    onChanged={setTime}
    displayedComponents={["hourAndMinute"]}
    datePickerStyle="compact"
  />
}
```

此示例创建了一个紧凑型日期选择器，用于选择小时和分钟。

---

### 示例 3: 滚轮日期选择器

```tsx
function View() {
  const [date, setDate] = useState(Date.now())
  return <DatePicker
    title="选择日期和时间"
    value={date}
    onChanged={setDate}
    displayedComponents={["hourAndMinute", "date"]}
    datePickerStyle="wheel"
  />
}
```

此示例创建了一个带滚轮的日期选择器，用于选择日期和时间。

---

## 注意事项

- `DatePickerStyle` 属性直接映射到 SwiftUI 的 `datePickerStyle` 修饰符。
- 确保 `displayedComponents` 和 `datePickerStyle` 的值与目标平台兼容，以避免运行时错误。
- 对于 macOS 特定的样式（`field` 和 `stepperField`），请确保应用在 macOS 上运行。

通过使用 `DatePickerStyle`，可以创建多功能的日期选择器，满足应用设计和功能需求。