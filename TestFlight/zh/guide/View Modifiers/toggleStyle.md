# 切换开关样式

通过该属性，你可以定义 `Toggle`（通常称为开关或复选框）的视觉外观和行为。

***

## 概述

`Toggle` 用于表示布尔值的开/关状态。它可以显示为开关、可点击的按钮，或者根据上下文使用平台的默认样式。`toggleStyle` 属性允许你指定要使用的外观，确保你的 UI 与应用的整体设计语言保持一致。

***

## 可用样式

- **`automatic`**：\
  让系统根据平台和上下文选择最适合的样式。如果不确定使用哪种样式，`automatic` 是一个不错的默认选择。

- **`switch`**：\
  将 `Toggle` 渲染为经典的开关，类似于 iOS 设置中的开关。开关通过滑动切换状态，为大多数用户提供熟悉的交互体验。

- **`button`**：\
  将 `Toggle` 呈现为按钮样式。与滑动不同，点击按钮即可切换状态。这种样式适合需要将 `Toggle` 作为可选择选项的 UI 布局。

***

## 使用示例

### 开关样式

```tsx
<Toggle
  title="启用通知"
  value={notificationsEnabled}
  onChanged={(newVal) => setNotificationsEnabled(newVal)}
  toggleStyle="switch"
/>
```

在此示例中，`Toggle` 显示为开关。用户点击时，开关滑动，切换状态为开或关。

***

### 按钮样式

```tsx
<Toggle
  title="深色模式"
  value={darkMode}
  onChanged={(newVal) => setDarkMode(newVal)}
  toggleStyle="button"
/>
```

在这种情况下，`Toggle` 看起来像一个按钮，点击时状态切换。适合需要更突出、可点击样式的场景。

***

### 自动样式

```tsx
<Toggle
  title="使用蜂窝数据"
  value={useCellular}
  onChanged={(newVal) => setUseCellular(newVal)}
  toggleStyle="automatic"
/>
```

使用 `automatic` 样式时，系统自动选择样式。这适用于信任系统默认样式以匹配平台约定的情况，或者希望在无需手动指定样式的情况下实现最大一致性。

***

## 其他 Toggle 属性

- **`value: boolean`**：\
  指示 `Toggle` 的当前状态（开或关）。

- **`onChanged(value: boolean): void`**：\
  当 `Toggle` 状态发生变化时触发的回调。可以用来相应地更新应用的数据模型。

- **`intent: AppIntent<any>`（可选）**：\
  你可以将 `Toggle` 与 `AppIntent` 关联，而不是本地处理状态变化。这样可以直接从 `Toggle` 的状态变化中触发预定义的应用动作（例如小组件或 Live Activity 场景）。

- **`title` 和 `systemImage`**：\
  提供一个描述性文本标签，并可选地添加一个图像，以清晰传达 `Toggle` 的用途。

- **`children`**：\
  你可以提供自定义内容（如文本节点、图标或两者的组合）作为 `Toggle` 的标签，而不是使用 `title` 或 `systemImage`。

***

## 总结

通过调整 `toggleStyle` 属性，你可以控制 `Toggle` 的外观和体验。无论你选择熟悉的开关样式、按钮样式，还是依赖 `automatic` 自动选择，该属性都能确保 `Toggle` 无缝融入你的脚本设计，同时为用户提供直观清晰的方式来更改布尔值设置。
