---
title: AppIntent

---

`AppIntentManager` 用于在 **Scripting** 中注册并管理 `AppIntent`，它是 Widget、Live Activity、ControlWidget 等控件执行脚本逻辑的核心机制。
所有的 `AppIntent` **必须** 定义在 `app_intents.tsx` 文件中，且在执行时其运行环境 `Script.env` 为 `"app_intents"`。

通过 `AppIntentManager` 注册的意图可以被 Widget / Live Activity / ControlWidget 中的 **Button** 与 **Toggle** 控件调用，以在用户交互时触发对应的脚本逻辑。

---

## 一、类型定义

### `AppIntent<T>`

表示一个具体的应用意图实例。

| 字段名        | 类型                  | 描述                                       |
| ---------- | ------------------- | ---------------------------------------- |
| `script`   | `string`            | 脚本路径，由系统内部生成。                            |
| `name`     | `string`            | 意图名称，唯一标识该 AppIntent。                    |
| `protocol` | `AppIntentProtocol` | 该意图实现的协议类型（如普通、音频播放、音频录制、Live Activity）。 |
| `params`   | `T`                 | 意图执行时的参数。                                |

---

### `AppIntentFactory<T>`

表示一个 **工厂函数**，用于通过参数创建 `AppIntent` 实例。

```ts
type AppIntentFactory<T> = (params: T) => AppIntent<T>
```

---

### `AppIntentPerform<T>`

表示一个执行函数，用于在意图被触发时执行实际逻辑。

```ts
type AppIntentPerform<T> = (params: T) => Promise<void>
```

---

### `AppIntentProtocol`

`AppIntentProtocol` 是枚举类型，用于指定意图的协议（行为类别）。

| 枚举成员                       | 描述                                                                                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `AppIntent` (0)            | 普通 AppIntent。用于执行一般操作的意图。                                                                                                                |
| `AudioPlaybackIntent` (1)  | 播放、暂停或修改音频播放状态的意图。                                                                                                                       |
| `AudioRecordingIntent` (2) | （iOS 18.0+）启动、停止或修改音频录制状态的意图。**注意**：在 iOS/iPadOS 中，当使用 `AudioRecordingIntent` 协议时，必须在开始录音时启动一个 **Live Activity** 并在录音持续时保持活跃，否则音频录制将会停止。 |
| `LiveActivityIntent` (3)   | 启动、暂停或修改 Live Activity 的意图。                                                                                                              |

---

## 二、AppIntentManager 类

### `AppIntentManager.register<T>(options): AppIntentFactory<T>`

注册一个新的 `AppIntent`。
通过指定 `name`、`protocol` 和 `perform` 函数来注册，当控件（Button/Toggle）被触发时，系统会自动调用 `perform` 函数执行逻辑。

```ts
static register<T = undefined>(options: {
  name: string;
  protocol: AppIntentProtocol;
  perform: AppIntentPerform<T>;
}): AppIntentFactory<T>
```

#### 参数：

| 参数名        | 类型                    | 描述                                    |
| ---------- | --------------------- | ------------------------------------- |
| `name`     | `string`              | AppIntent 的名称，需唯一，用于标识该意图。            |
| `protocol` | `AppIntentProtocol`   | AppIntent 的协议类型。                      |
| `perform`  | `AppIntentPerform<T>` | 当控件触发该意图时执行的异步函数，参数为控件传递过来的 `params`。 |

#### 返回值：

* **`AppIntentFactory<T>`**：返回一个工厂函数，可通过传入参数创建 `AppIntent` 实例。

#### 示例：

```tsx
/// app_intents.tsx
export const ToggleDoorIntent = AppIntentManager.register({
  name: "ToggleDoorIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async ({ id, newState }: { id: string; newState: boolean }) => {
    // 自定义逻辑：切换门的状态
    await setDoorState(id, newState)
    // 通知控件刷新状态（如 ControlWidgetToggle）
    ControlWidget.reloadToggles()
  }
})
```

在控件文件中（如 `control_widget_toggle.tsx`）：

```tsx
ControlWidget.present(
  <ControlWidgetToggle
    intent={ToggleDoorIntent({ id: "door1", newState: !currentState })}
    label={{
      title: "Door 1",
      systemImage: currentState ? "door.garage.opened" : "door.garage.closed"
    }}
    activeValueLabel={{ title: "The door is opened" }}
    inactiveValueLabel={{ title: "The door is closed" }}
  />
)
```

在小组件中使用（如 `widget.tsx`）:

```tsx
<Toggle
  title="Door 1"
  value={currentState}
  intent={ToggleDoorIntent({ id: "door1", newState: !currentState })}
/>
```

---

## 三、执行时环境

所有通过 `AppIntentManager` 定义的 AppIntent 在执行时，`Script.env` 会自动为 `"app_intents"`。
这意味着在 `perform` 函数中可以安全地使用适合 `"app_intents"` 环境的 API（如访问网络、更新 Live Activity 状态、触发控件刷新等）。

---

## 四、最佳实践

1. **集中管理**：所有 AppIntent 必须定义在 `app_intents.tsx` 文件中，避免分散。
2. **类型安全**：在 `perform` 和控件参数中定义严格的参数类型 `T`，以确保开发时的自动补全与类型检查。
3. **协议匹配**：根据控件行为选择合适的 `AppIntentProtocol`，例如：

   * 普通操作 → `AppIntent`
   * 控制音频播放 → `AudioPlaybackIntent`
   * 控制音频录制 → `AudioRecordingIntent`（iOS 18+ 且需保持 Live Activity）
   * 启动/暂停 Live Activity → `LiveActivityIntent`
4. **状态刷新**：执行完 `perform` 后，如需更新 UI 状态（例如切换门锁开关），请调用 `ControlWidget.reloadButtons()` 、 `ControlWidget.reloadToggles()` 或 `Widget.reloadAll()`。
