---
title: 可互动的小组件和灵动岛

---

**Scripting** 应用支持在 **小组件** 和 **LiveActivity（灵动岛）** 中添加互动的功能，使您可以通过 `Button` 和 `Toggle` 组件创建动态、交互式的 UI。这些控件可以执行 **AppIntent** 来触发操作，从而增强小组件和 LiveActivity 的功能。

---

## 1. AppIntent 简介

### 什么是 AppIntent？

**AppIntent** 定义了一个由控件（如 `Button` 或 `Toggle`）触发的特定操作，用于小组件或 LiveActivity UI。AppIntent 将 UI 组件与可执行逻辑连接起来，实现无缝交互。

### 支持的协议

AppIntent 可以实现以下协议：

- **`AppIntent`**：通用意图，用于触发自定义操作。
- **`AudioPlaybackIntent`**：处理音频播放（如播放、暂停或切换音频状态）。
- **`AudioRecordingIntent`**：管理音频录制状态（需要 iOS 18+，并且在录制期间保持 LiveActivity 活跃）。
- **`LiveActivityIntent`**：修改或管理 LiveActivity 状态。

---

## 2. 注册 AppIntent

在使用 **AppIntent** 之前，必须通过 `AppIntentManager.register` 方法在 `app_intents.tsx` 文件中注册。

### 示例：注册 AppIntent

```typescript
// app_intents.tsx

import { AppIntentManager, AppIntentProtocol } from "scripting"

// 注册不带参数的 AppIntent
const IntentWithoutParams = AppIntentManager.register({
  name: "IntentWithoutParams",
  protocol: AppIntentProtocol.AppIntent,
  perform: async (params: undefined) => {
    // 执行自定义操作
    console.log("Intent 被触发")
    // 可选：刷新小组件
    Widget.reloadAll()
  }
})

// 注册带参数的 AppIntent
const ToggleIntentWithParams = AppIntentManager.register({
  name: "ToggleIntentWithParams",
  protocol: AppIntentProtocol.AudioPlaybackIntent,
  perform: async (audioName: string) => {
    // 根据参数执行操作
    console.log(`切换音频播放状态：${audioName}`)
    Widget.reloadAll()
  }
})
```

---

## 3. 在小组件或 LiveActivity UI 中使用 AppIntent

注册完 AppIntent 后，可以在 `widget.tsx` 或 LiveActivity UI 文件中的 `Button` 和 `Toggle` 等交互组件中链接这些 AppIntent。

### 示例：在小组件中使用 AppIntent

```typescript
// widget.tsx

import { VStack, Button, Toggle } from "scripting"
import { IntentWithoutParams, ToggleIntentWithParams } from "./app_intents"
import { model } from "./model"

function WidgetView() {
  return (
    <VStack>
      <Button
        title="点击我"
        intent={IntentWithoutParams(undefined)} // 触发无参数的 AppIntent
      />
      <Toggle
        title="播放或暂停"
        value={model.checked}
        intent={ToggleIntentWithParams("audio_name")} // 触发带参数的 AppIntent
      />
    </VStack>
  )
}

// 展示小组件
Widget.present(<WidgetView />)
```

---

## 4. API 参考

### `AppIntentManager.register`

注册一个可在小组件或 LiveActivity UI 中使用的 AppIntent。

#### 参数：
- `name` (string)：意图的唯一名称。
- `protocol` (`AppIntentProtocol`)：指定意图类型（如 `AppIntent`、`AudioPlaybackIntent`）。
- `perform` (function)：当触发意图时执行的函数。

#### 返回：
- 一个 `AppIntentFactory` 函数，可用于创建已注册意图的实例。

---

### `Button` 组件

可点击的按钮，用于触发 AppIntent。

#### 属性：
- `title` (string)：按钮的标签。
- `intent` (`AppIntent<any>`)：按钮被点击时执行的 AppIntent。
- `systemImage` (可选)：按钮上显示的 SF Symbol 图标。

---

### `Toggle` 组件

切换开关，切换值时触发 AppIntent。

#### 属性：
- `value` (boolean)：切换状态（开/关）。
- `intent` (`AppIntent<any>`)：切换时执行的 AppIntent。
- `title` (string)：切换的标签。
- `systemImage` (可选)：切换上显示的 SF Symbol 图标。

---

## 5. 注意事项和最佳实践

- 在 `perform` 函数中使用 `Widget.reloadAll()` 可在执行意图后动态更新小组件。
- 将所有 AppIntent 定义在 `app_intents.tsx` 文件中，方便组织和重用。
- 根据意图的功能选择合适的协议（如 `AudioPlaybackIntent`）。