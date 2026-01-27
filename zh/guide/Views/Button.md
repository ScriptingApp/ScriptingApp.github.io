# 按钮

在 **Scripting** 应用中，`Button` 组件允许您创建具有可自定义动作、标签、样式和角色的交互式元素。按钮可以触发动作、执行意图，并根据配置显示不同的视觉样式。本指南提供了关于如何使用 `Button` API 的详细说明，包括其属性、角色、样式及示例。

***

## `Button`

### 描述

您可以通过提供一个 **动作**（action）或 **意图**（intent）以及一个 **标签**（label）来创建按钮。标签可以是简单的文本、图标或复杂的视图。按钮是创建交互界面的关键，例如提交表单或在页面之间导航。

### 属性

| **属性**        | **类型**                                                     | **描述**                                                                                |
| ------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `title`       | `string`                                                   | 按钮上显示的文本标签。                                                                           |
| `systemImage` | `string` _(可选)_                                            | 按钮标题旁边显示的系统图标名称。                                                                      |
| `children`    | `VirtualNode` 或 `VirtualNode[]`                            | 用作按钮标签的自定义视图，替代 `title`。                                                              |
| `role`        | `'destructive' \| 'cancel' \| 'close' \| 'confirm'` _(可选)_ | 描述按钮的用途。`destructive` 用于标记执行潜在危险操作的按钮，`cancel` 表示取消操作。                                |
| `intent`      | `AppIntent<any>`                                           | 当按钮被触发时执行的意图。适用于 `Widget` 或 `LiveActivity`。详情见 `Interactive Widget and LiveActivity`。 |
| `action`      | `() => void`                                               | 用户触发按钮时执行的函数。                                                                         |

***

### `ButtonStyle`

定义按钮的视觉外观。

| **值**               | **描述**                               |
| ------------------- | ------------------------------------ |
| `automatic`         | 根据按钮的上下文设置默认样式。                      |
| `bordered`          | 标准的带边框样式。                            |
| `borderedProminent` | 突出的带边框样式，更加醒目。                       |
| `borderless`        | 无边框样式。                               |
| `plain`             | 简洁的样式，具有最少的装饰，但仍可在按下、聚焦或启用状态下提供视觉反馈。 |

***

### `ButtonBorderShape`

指定 `bordered` 或 `borderedProminent` 样式按钮的边框形状。

| **值**                                | **描述**        |
| ------------------------------------ | ------------- |
| `automatic`                          | 由系统决定适当的形状。   |
| `capsule`                            | 胶囊形状的边框。      |
| `circle`                             | 圆形边框。         |
| `roundedRectangle`                   | 带圆角的矩形边框。     |
| `buttonBorder`                       | 由环境决定最终的边框形状。 |
| `{ roundedRectangleRadius: number }` | 带特定角半径的圆角矩形。  |

***

### `ControlSize`

定义按钮和其他控件的尺寸。

| **值**        | **描述**                 |
| ------------ | ---------------------- |
| `mini`       | 最小的控件尺寸。               |
| `small`      | 紧凑的控件尺寸。               |
| `regular`    | 标准的控件尺寸。               |
| `large`      | 较大的控件尺寸。               |
| `extraLarge` | 最大的控件尺寸，通常用于高强调或无障碍场景。 |

***

### `CommonViewProps`

这些属性可用于自定义视图中按钮的外观和行为。

| **属性**              | **类型**              | **描述**                                         |
| ------------------- | ------------------- | ---------------------------------------------- |
| `controlSize`       | `ControlSize`       | 设置视图中控件的尺寸。                                    |
| `buttonStyle`       | `ButtonStyle`       | 应用自定义交互行为和按钮外观。                                |
| `buttonBorderShape` | `ButtonBorderShape` | 指定 `bordered` 和 `borderedProminent` 按钮样式的边框形状。 |

***

## 示例用法

### 带动作的基础按钮

```tsx
<Button title="Sign in" action={handleSignIn} />
```

### 带系统图标的按钮

```tsx
<Button title="Delete" systemImage="trash" role="destructive" action={handleDelete} />
```

### 自定义标签按钮

```tsx
<Button>
  <Text>Custom Label</Text>
</Button>
```

### 执行 AppIntent 的按钮

```tsx
<Button
  title="Start Workout"
  intent={MyStartWorkoutIntent({ duration: 30 })}
  buttonStyle="borderedProminent"
/>
```

### 设置按钮样式

```tsx
<Group
  buttonStyle="bordered"
  buttonBorderShape={{ roundedRectangleRadius: 8 }}
  controlSize="large"
>
  <Button title="Save" action={handleSave} />
</Group>
```

***

### 注意事项

- 使用 `role` 指定具有特定用途的按钮，例如取消或危险操作按钮。
- 将 `buttonStyle` 和 `buttonBorderShape` 结合使用，为整个视图提供一致的主题。
- `intent` 属性将按钮与 `Widget` 和 `LiveActivity` 集成，实现无缝交互。

关于 `AppIntent` 的更多细节，请参阅 `Interactive Widget and LiveActivity` 文档。
