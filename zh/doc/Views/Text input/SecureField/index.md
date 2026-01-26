# 安全文本输入框（SecureField）

`SecureField` 是 Scripting 提供的安全文本输入框组件，用于输入密码或其他敏感信息。用户输入内容会被自动隐藏，不以明文显示，其行为与 SwiftUI 中的 `SecureField` 一致。

该组件适用于登录、注册、PIN 验证等需要保护用户隐私的场景。

***

## 属性定义

```ts
type SecureFieldProps = (
  | { title: string }
  | { label: VirtualNode }
) & {
  value: string
  onChanged: (value: string) => void
  prompt?: string
  autofocus?: boolean
  onFocus?: () => void
  onBlur?: () => void
}
```

### 属性说明

| 属性          | 类型                        | 说明                           |
| ----------- | ------------------------- | ---------------------------- |
| `title`     | `string`                  | 输入框的文本标签（与 `label` 二选一）。     |
| `label`     | `VirtualNode`             | 自定义标签视图节点（与 `title` 二选一）。    |
| `value`     | `string`                  | 当前输入的内容，需使用状态绑定更新。           |
| `onChanged` | `(value: string) => void` | 当输入内容发生变化时触发的回调函数。           |
| `prompt`    | `string`（可选）              | 输入框为空时显示的提示占位文字。             |
| `autofocus` | `boolean`（可选）             | 是否在渲染后自动聚焦该输入框，默认值为 `false`。 |
| `onFocus`   | `() => void`（可选）          | 输入框获取焦点时触发的回调。               |
| `onBlur`    | `() => void`（可选）          | 输入框失去焦点时触发的回调。               |

***

## 示例

```tsx
import { useState, VStack, SecureField } from "scripting"

function LoginForm() {
  const [password, setPassword] = useState("")

  return <VStack padding>
    <SecureField
      title="密码"
      value={password}
      onChanged={setPassword}
      prompt="请输入密码"
    />
  </VStack>
}
```

### 行为说明

- 输入内容将以安全方式隐藏，不会以明文显示；
- 可通过 `prompt` 提示用户输入；
- 绑定的状态变量（如 `password`）可用于后续认证逻辑。

***

## 注意事项

- `title` 与 `label` 必须二选一使用；
- 除了内容会被隐藏，其他行为与 `TextField` 基本一致；
- 支持自动聚焦和焦点事件监听，可用于配合用户交互逻辑；
- 非常适用于登录、注册、设置等需要密码输入的界面。
