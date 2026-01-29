---
title: 文本输入框（TextField）
description: 显示可编辑文本界面的控件。

---
        
Scripting 提供了与 SwiftUI 中 `TextField` 相似的文本输入框组件，支持声明式绑定、提示文字、焦点控制、滚动方向和行数限制等功能。

`TextField` 适用于用户信息填写、搜索、消息输入等各种输入场景，可灵活设置为单行或多行滚动输入。

---

## 属性定义

```ts
type TextFieldProps = (
  | { title: string }
  | { label: VirtualNode }
) & {
  value: string
  onChanged: (value: string) => void
  prompt?: string
  axis?: Axis
  autofocus?: boolean
  onFocus?: () => void
  onBlur?: () => void
}
```

### 属性说明

| 属性          | 类型                                                                      | 说明                                       |
| ----------- | ----------------------------------------------------------------------- | ---------------------------------------- |
| `title`     | `string`                                                                | 作为输入框标签显示的标题字符串（与 `label` 二选一）。          |
| `label`     | `VirtualNode`                                                           | 自定义标签节点（与 `title` 二选一）。                  |
| `value`     | `string`                                                                | 当前输入框内容，需使用状态绑定更新。                       |
| `onChanged` | `(value: string) => void`                                               | 输入内容变更时的回调函数。                            |
| `prompt`    | `string`（可选）                                                            | 输入框中的提示文本，占位提示用途。                        |
| `axis`      | `"horizontal"` \| `"vertical"`（可选）                                      | 当内容溢出时的滚动方向。多行输入需设置为 `"vertical"`。       |
| `autofocus` | `boolean`（可选）                                                           | 是否自动聚焦该输入框。默认为 `false`。                  |
| `onFocus`   | `() => void`（可选）                                                        | 输入框获得焦点时触发的回调。                           |
| `onBlur`    | `() => void`（可选）                                                        | 输入框失去焦点时触发的回调。                           |

---

## 示例一：可垂直滚动的多行输入框

```tsx
import { useState, VStack, TextField } from "scripting"

function ScrollableTextInput() {
  const [text, setText] = useState("")

  return <VStack padding>
    <TextField
      title="留言"
      value={text}
      onChanged={setText}
      prompt="请输入留言"
      axis="vertical"
      lineLimit={{ min: 3, max: 8 }}
    />
  </VStack>
}
```

### 行为说明：

* 输入框会自动扩展至 3～8 行的高度；
* 超过 8 行后内容将支持垂直滚动；
* 输入为空时显示 `prompt` 占位提示文字。

---

## 示例二：基础的单行输入框

```tsx
import { useState, VStack, TextField, Text } from "scripting"

function UsernameInput() {
  const [username, setUsername] = useState("")

  return <VStack padding>
    <TextField
      title="用户名"
      value={username}
      onChanged={setUsername}
      prompt="请输入用户名"
    />
    <Text>当前用户名：{username}</Text>
  </VStack>
}
```

---

## 使用说明

* `title` 和 `label` 必须二选一，不可同时设置；
* 设置 `axis="vertical"` 并结合 `lineLimit` 可启用多行输入及滚动行为；
* 可使用 `autofocus`、`onFocus`、`onBlur` 管理输入框的焦点交互；
* 搭配 `useState` 可实现实时响应的表单输入功能。
