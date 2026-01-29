---
title: 对话框
description: 该接口提供了一些用于显示对话框的快捷方法。

---
        
`Dialog` 模块提供了一组用于展示对话框的快捷方法，包括提示框（Alert）、确认框（Confirm）、输入框（Prompt）和操作表（Action Sheet）。可用于在脚本执行过程中与用户进行交互。

---

## 模块：`Dialog`

---

### ▸ `Dialog.alert(options: { message: string, title?: string, buttonLabel?: string }): Promise<void>`

显示一个简单的提示框，包含一段信息和一个确认按钮。用户点击按钮后，Promise 会被 resolve。

#### 参数说明

* `message` (`string`)：提示的主要内容，**必填**。
* `title?` (`string`)：对话框标题，可选。
* `buttonLabel?` (`string`)：按钮文本，默认为 `"OK"`。

#### 返回值

* `Promise<void>`：用户点击按钮后 resolve。

#### 示例

```ts
await Dialog.alert({
  title: '提示',
  message: '操作已成功完成。',
  buttonLabel: '知道了'
})
```

---

### ▸ `Dialog.confirm(options: { message: string, title?: string, cancelLabel?: string, confirmLabel?: string }): Promise<boolean>`

显示一个确认框，包含“确认”和“取消”两个按钮。返回值表示用户是否确认。

#### 参数说明

* `message` (`string`)：确认信息内容，**必填**。
* `title?` (`string`)：标题，可选。
* `cancelLabel?` (`string`)：取消按钮文本，默认值为 `"Cancel"`。
* `confirmLabel?` (`string`)：确认按钮文本，默认值为 `"OK"`。

#### 返回值

* `Promise<boolean>`：用户点击确认返回 `true`，点击取消返回 `false`。

#### 示例

```ts
const confirmed = await Dialog.confirm({
  title: '删除文件',
  message: '确定要删除这个文件吗？',
  cancelLabel: '取消',
  confirmLabel: '删除'
})

if (confirmed) {
  // 执行删除操作
}
```

---

### ▸ `Dialog.prompt(options: {...}): Promise<string | null>`

显示一个输入框对话界面，允许用户输入文字。返回用户输入的字符串，或在取消时返回 `null`。

#### 参数说明

* `title` (`string`)：输入框标题，**必填**。
* `message?` (`string`)：辅助说明信息。
* `defaultValue?` (`string`)：默认输入值。
* `obscureText?` (`boolean`)：是否隐藏输入内容（如密码）。
* `selectAll?` (`boolean`)：是否自动选中全部默认内容。
* `placeholder?` (`string`)：输入框的占位提示文本。
* `cancelLabel?` (`string`)：取消按钮文本。
* `confirmLabel?` (`string`)：确认按钮文本。
* `keyboardType?` (`KeyboardType`)：输入键盘类型（如数字、邮箱等）。

#### 返回值

* `Promise<string | null>`：用户输入的文本，或取消时为 `null`。

#### 示例

```ts
const name = await Dialog.prompt({
  title: '请输入姓名',
  placeholder: '例如：李雷',
  defaultValue: '张三',
  confirmLabel: '提交',
  cancelLabel: '取消'
})

if (name != null) {
  console.log(`你好，${name}`)
}
```

---

### ▸ `Dialog.actionSheet(options: {...}): Promise<number | null>`

展示一个操作表（Action Sheet），可包含多个选项按钮。点击某个按钮返回该按钮的索引，点击取消返回 `null`。

#### 参数说明

* `title` (`string`)：标题，**必填**。
* `message?` (`string`)：提示信息，可选。
* `cancelButton?` (`boolean`)：是否显示取消按钮，默认值为 `true`。
* `actions` (`{ label: string, destructive?: boolean }[]`)：操作项数组，`destructive` 表示是否为破坏性操作（红色高亮）。

#### 返回值

* `Promise<number | null>`：返回所点击操作的索引，或用户取消时返回 `null`。

#### 示例

```ts
const index = await Dialog.actionSheet({
  title: '是否删除此图片？',
  actions: [
    { label: '删除', destructive: true },
    { label: '保留' }
  ]
})

if (index === 0) {
  // 用户选择删除
} else if (index === 1) {
  // 用户选择保留
} else {
  // 用户点击了取消
}
```

---

## 方法概览

| 方法名           | 用途         | 返回值类型              |         |
| ------------- | ---------- | ------------------ | ------- |
| `alert`       | 显示提示框      | `Promise<void>`    |         |
| `confirm`     | 显示确认框      | `Promise<boolean>` |         |
| `prompt`      | 显示文字输入框    | `Promise<string  \| null>` |
| `actionSheet` | 显示多个选项的操作表 | `Promise<number  \| null>` |
