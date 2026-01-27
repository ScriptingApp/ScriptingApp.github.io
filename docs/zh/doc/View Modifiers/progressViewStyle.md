---
title: 进度视图样式

---

通过该属性，你可以自定义进度视图在 UI 中的外观。

---

## 属性声明

```tsx
progressViewStyle?: ProgressViewStyle;
```

### 描述

`progressViewStyle` 属性定义了进度视图的样式，允许你选择最适合应用上下文的视觉表示形式。

---

### 可接受的值

`progressViewStyle` 属性接受以下字符串值：

- **`automatic`**：使用默认的进度视图样式，适配视图当前的上下文。
- **`circular`**：以环形仪表显示，用于指示活动的部分完成情况。在非 macOS 平台上，该样式可能显示为不确定的加载指示器。
- **`linear`**：以水平条的形式显示进度，直观地指示任务完成情况。

---

### 默认行为

如果未指定 `progressViewStyle`，则根据视图上下文自动应用默认样式（`automatic`）。

---

## 进度视图属性

### 定时器进度视图属性

这些属性用于为基于时间的任务显示进度视图：

- **`timerFrom`**：进度开始的时间戳。
- **`timerTo`**：进度结束的时间戳。
- **`countsDown`** *(可选)*：如果为 true（默认值），随着时间推移进度将逐渐减少。
- **`label`** *(可选)*：描述正在进行的任务的视图。
- **`currentValueLabel`** *(可选)*：描述任务已完成进度的视图。

---

### 普通进度视图属性

这些属性用于为具有明确范围的任务显示进度视图：

- **`value`** *(可选)*：当前任务已完成的部分，范围为 0.0 到 `total`；如果进度不确定，则为 `nil`。
- **`total`** *(可选)*：任务的完整范围（默认值为 1.0）。
- **`title`** *(可选)*：描述正在进行任务的标题。
- **`label`** *(可选)*：描述正在进行任务的视图。
- **`currentValueLabel`** *(可选)*：描述任务已完成进度的视图。

---

## 使用示例

### 示例 1：定时器进度视图

```tsx
<ProgressView
  progressViewStyle="circular"
  timerFrom={Date.now()}
  timerTo={Date.now() + 3600000}
  countsDown={true}
  label={<Text>定时器进度</Text>}
  currentValueLabel={<Text>剩余时间</Text>}
/>
```

此示例为定时器任务创建了一个环形进度视图。

---

### 示例 2：普通进度视图

```tsx
<ProgressView
  progressViewStyle="linear"
  value={0.5}
  total={1.0}
  title="文件上传"
  label={<Text>正在上传...</Text>}
  currentValueLabel={<Text>50%</Text>}
/>
```

此示例为一个完成 50% 的任务创建了一个线性进度视图。

---

## 注意事项

- `progressViewStyle` 属性直接映射到 SwiftUI 的 `progressViewStyle` 修饰符。
- 确保传入的字符串值与上述预定义样式之一匹配，以避免运行时错误。

通过设置 `progressViewStyle`，你可以根据任务的不同需求自定义进度视图的外观，提供直观且符合设计语言的用户体验。