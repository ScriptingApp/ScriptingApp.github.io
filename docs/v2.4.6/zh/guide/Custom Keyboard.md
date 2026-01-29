---
title: 自定义键盘
description: 创建具有独特布局和功能的自定义键盘。
tag: PRO
---

`CustomKeyboard` 是 Scripting 提供的全局命名空间，用于开发 iOS 自定义键盘扩展。在 `keyboard.tsx` 脚本中使用该 API，可以渲染自定义键盘 UI，并访问当前输入状态、插入文本、控制光标、监听输入事件、调整高度，并在多个脚本之间导航切换。

## 一、使用环境与前提

### 环境要求

* 必须在脚本项目中创建名为 **`keyboard.tsx`** 的文件；
* 所有 `CustomKeyboard` 方法 **仅可在键盘扩展环境中使用**；
* 在 **App 脚本、Intent (`intent.tsx`)、小组件 (`widget.tsx`) 中无法使用此 API**；
* 系统设置路径：

  ```
  设置 > 通用 > 键盘 > 键盘 > 添加新键盘 > 选择 Scripting
  ```

  添加后，进入 Scripting 键盘详情页，开启 **允许完全访问**，以启用网络请求、剪贴板访问等高级功能。

---

## 二、展示键盘 UI

### `present(node: VirtualNode): void`

用于展示自定义键盘界面。必须在 `keyboard.tsx` 中调用一次。

```tsx
function MyKeyboard() {
  return <Text>你好，世界</Text>
}

CustomKeyboard.present(<MyKeyboard />)
```

---

## 三、输入状态查询

| 属性名                | 类型                        | 说明          |
| ------------------ | ------------------------- | ----------- |
| `textBeforeCursor` | `Promise<string \| null>` | 光标前的文本      |
| `textAfterCursor`  | `Promise<string \| null>` | 光标后的文本      |
| `selectedText`     | `Promise<string \| null>` | 当前选中的文本（如有） |
| `hasText`          | `Promise<boolean>`        | 输入框是否包含文本内容 |

---

## 四、输入特征（traits）

### `useTraits(): TextInputTraits`

获取当前输入框的系统特征（如键盘类型、返回键样式等）。值在 `textDidChange` 和 `selectionDidChange` 事件中自动更新。

### `traits: TextInputTraits`

为静态快照，不会自动更新。建议在组件中使用 `useTraits()`。

常见字段包括：

* `keyboardType`：如 `'default'`, `'emailAddress'`, `'numberPad'`
* `returnKeyType`：如 `'done'`, `'go'`, `'search'`
* `textContentType`：如 `'username'`, `'password'`, `'oneTimeCode'`
* `keyboardAppearance`：`'light'`, `'dark'` 等

---

## 五、文本操作

### `insertText(text: string): Promise<void>`

在光标处插入文本。

### `deleteBackward(): Promise<void>`

删除光标前的一个字符。

### `moveCursor(offset: number): Promise<void>`

移动光标位置。负数为向左，正数为向右。

### `setMarkedText(text, location, length): Promise<void>`

设置标记文本（用于拼音输入等组合输入）。

### `unmarkText(): Promise<void>`

取消当前标记文本。

---

## 六、键盘行为控制

### `dismiss(): Promise<void>`

关闭键盘。

### `nextKeyboard(): Promise<void>`

切换至系统中的下一个键盘。

### `requestHeight(height: number): Promise<void>`

请求调整键盘高度（单位为 pt）。推荐范围为 **216~360pt**，超出范围可能被系统忽略。

### `setHasDictationKey(value: boolean): Promise<void>`

设置是否显示语音输入按钮（麦克风图标）。

### `setToolbarVisible(visible: boolean): Promise<void>`

控制顶部工具栏的显示/隐藏。默认显示，适用于调试等场景。

---

## 七、导航控制

### `dismissToHome(): Promise<void>`

关闭当前键盘脚本，返回 Scripting 键盘首页（脚本列表）。适用于用户在多个脚本之间自由切换的场景。

```ts
await CustomKeyboard.dismissToHome()
```

---

## 八、用户反馈

### `playInputClick(): void`

播放标准键盘按键音，建议在模拟按键操作时调用，提升交互体验。

```ts
CustomKeyboard.playInputClick()
```

---

## 九、事件监听

### `addListener(event, callback): void`

注册事件监听器：

| 事件名                   | 回调参数                                | 说明     |
| --------------------- | ----------------------------------- | ------ |
| `textWillChange`      | `() => void`                        | 文本将要变更 |
| `textDidChange`       | `(traits: TextInputTraits) => void` | 文本已变更  |
| `selectionWillChange` | `() => void`                        | 光标将变更  |
| `selectionDidChange`  | `(traits: TextInputTraits) => void` | 光标已变更  |

### `removeListener(event, callback): void`

移除指定监听器。

### `removeAllListeners(event): void`

移除指定事件的所有监听器。

---

## 十、完整示例

```tsx
function MyKeyboard() {
  const traits = CustomKeyboard.useTraits()

  const insert = async (text: string) => {
    CustomKeyboard.playInputClick()
    await CustomKeyboard.insertText(text)
  }

  return (
    <VStack spacing={12}>
      <Text>输入类型：{traits.keyboardType}</Text>
      <HStack spacing={10}>
        <Button title="你" action={() => insert("你")} />
        <Button title="好" action={() => insert("好")} />
        <Button title="← 删除" action={() => CustomKeyboard.deleteBackward()} />
        <Button title="返回首页" action={() => CustomKeyboard.dismissToHome()} />
      </HStack>
    </VStack>
  )
}

CustomKeyboard.present(<MyKeyboard />)
```

---

## 十一、开发建议

* **必须调用 `present()` 并且仅调用一次**；
* 合理设置键盘高度，避免 UI 被遮挡；
* 使用 `useTraits()` 获取输入上下文信息；
* 调用 `dismissToHome()` 可以让用户在多个键盘脚本之间切换；
* 通过 `playInputClick()` 提升按键交互体验；
* 删除文本前请先判断 `hasText` 是否为 true；
* 监听事件时注意避免重复注册和内存泄漏；
