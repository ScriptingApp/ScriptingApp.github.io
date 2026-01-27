---
title: 控制中心的小组件
tag: PRO
---

Scripting 支持用户在控制中心或锁屏界面添加按钮（Button）或开关（Toggle）控件，并通过绑定脚本 `AppIntent` 实现自定义逻辑。控件支持状态反馈、图标动态切换、隐私显示控制等能力。

---

## 控件标签类型定义

### `ControlWidgetLabel`

表示控件主标签或状态标签的信息结构。

| 字段名                | 类型         | 描述                   |
| ------------------ | ---------- | -------------------- |
| `title`            | `string`   | 标签的文本标题。             |
| `systemImage`      | `string?`  | 可选的 SF Symbols 图标名称。 |
| `privacySensitive` | `boolean?` | 控件在设备锁定时是否隐藏该标签内容。   |

---

## 一、按钮控件：`ControlWidgetButton`

用于添加一个点击后触发指定意图的按钮控件。

```ts
function ControlWidgetButton(props: ControlWidgetButtonProps): JSX.Element
```

### `ControlWidgetButtonProps`

| 字段名                  | 类型                            | 描述                                                   |
| -------------------- | ----------------------------- | ---------------------------------------------------- |
| `privacySensitive`   | `boolean?`                    | 控件是否在锁屏状态下隐藏其内容与状态。                                  |
| `intent`             | `AppIntent<any>`              | 点击按钮后触发的意图（AppIntent 实例）。                            |
| `label`              | `ControlWidgetLabel`          | 按钮主标签，显示标题与图标。                                       |
| `activeValueLabel`   | `ControlWidgetLabel \| null?` | 按钮激活（Active）状态时显示的标签。设置后需同时提供 `inactiveValueLabel`。  |
| `inactiveValueLabel` | `ControlWidgetLabel \| null?` | 按钮非激活（Inactive）状态时显示的标签。设置后需同时提供 `activeValueLabel`。 |

> 若提供了 `activeValueLabel` 或 `inactiveValueLabel`，建议同时提供两者，以确保状态一致性。此类状态标签的图标会覆盖 `label` 中的图标。

---

## 二、开关控件：`ControlWidgetToggle`

用于添加一个可切换状态的开关控件，自动将布尔值通过绑定意图传入。

```ts
function ControlWidgetToggle<T extends { value: boolean }>(props: ControlWidgetToggleProps<T>): JSX.Element
```

### `ControlWidgetToggleProps<T>`

| 字段名                  | 类型                            | 描述                                            |
| -------------------- | ----------------------------- | --------------------------------------------- |
| `privacySensitive`   | `boolean?`                    | 控件是否在锁屏状态下隐藏其内容与状态。                           |
| `intent`             | `AppIntent<T>`                | 控件状态切换时触发的意图。泛型参数 `T` 必须包含 `value: boolean`。  |
| `label`              | `ControlWidgetLabel`          | 控件主标签。                                        |
| `activeValueLabel`   | `ControlWidgetLabel \| null?` | 控件激活（开）状态时显示的标签。需与 `inactiveValueLabel` 搭配使用。 |
| `inactiveValueLabel` | `ControlWidgetLabel \| null?` | 控件非激活（关）状态时显示的标签。需与 `activeValueLabel` 搭配使用。  |

---

## 三、ControlWidget 命名空间

```ts
namespace ControlWidget
```

### `ControlWidget.parameter: string`

用户在控件配置界面中设置的参数值，通常用于标识目标对象，如设备 ID、门编号等。

---

### `ControlWidget.present(element: VirtualNode): void`

设置控件的显示内容。仅允许传入 `ControlWidgetButton` 或 `ControlWidgetToggle` 元素。

#### 注意：

* 若使用 `control_widget_button.tsx`，只能呈现 `ControlWidgetButton`；
* 若使用 `control_widget_toggle.tsx`，只能呈现 `ControlWidgetToggle`；
* 若控件需要在锁屏隐藏，可在顶层组件上设置 `privacySensitive`；
* 如果仅需要隐藏标签或状态信息，可在相应的 `ControlWidgetLabel` 中设置 `privacySensitive`。

#### 示例：

```tsx
/// app_intents.tsx
export const ToggleDoorIntent = AppIntentManager.register({
  name: "ToggleDoorIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async ({ id, value }: { id: string; value: boolean }) => {
    await setDoorState(id, value)
    ControlWidget.reloadToggles()
  }
})

/// control_widget_toggle.tsx
async function run() {
  const doorId = ControlWidget.parameter || "default"
  const data = await fetchDoorData(doorId)

  ControlWidget.present(
    <ControlWidgetToggle
      privacySensitive
      intent={ToggleDoorIntent({ id: doorId, value: !data.doorOpened })}
      label={{
        title: `门 ${doorId}`,
        systemImage: data.doorOpened ? "door.garage.opened" : "door.garage.closed"
      }}
      activeValueLabel={{ title: "门已打开" }}
      inactiveValueLabel={{ title: "门已关闭" }}
    />
  )
}

run()
```

---

### `ControlWidget.reloadButtons(): void`

重新加载所有按钮控件。用于意图执行后刷新状态显示。

---

### `ControlWidget.reloadToggles(): void`

重新加载所有切换控件。常用于状态变更后触发 UI 更新。

---

## 四、开发建议

1. 所有控件必须绑定一个 `AppIntent`，用于定义交互逻辑。
2. 切换(Toggle)控件的参数必须包含 `{ value: boolean }`，可使用`AppIntentProtocol.AppIntent`协议，内部会强制切换为 `SetValueIntent` 协议。
3. 若为控件提供状态标签，建议提供完整的 `activeValueLabel` 与 `inactiveValueLabel` 配对，以提升可读性。
4. 图标使用 SF Symbols 命名的系统图标。
5. 在意图执行中变更控件状态时，应调用 `ControlWidget.reloadButtons()` 或 `reloadToggles()` 以触发前端刷新。
