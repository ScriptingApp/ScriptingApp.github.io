---
title: 文本输入框

---

这些修饰符可用于自定义 `TextField` 组件的行为和外观，包括键盘类型、自动更正、自动大写、提交操作等。

---

## `onSubmit`

为文本字段添加提交时触发的操作。

### 类型

```ts
onSubmit?: (() => void) | {
  triggers: SubmitTriggers
  action: () => void
}
```

### 行为说明

* 若直接提供函数形式：

  ```tsx
  <TextField onSubmit={() => console.log('提交了')} />
  ```

  等价于：

  ```tsx
  <TextField
    onSubmit={{
      triggers: 'text',
      action: () => console.log('提交了')
    }}
  />
  ```

* 也可以明确指定触发提交操作的方式：

  ```tsx
  <TextField
    onSubmit={{
      triggers: 'search',
      action: () => console.log('搜索提交')
    }}
  />
  ```

### `SubmitTriggers` 可选值：

* `"text"`：由文本输入控件（如 `TextField`、`SecureField`）触发。
* `"search"`：由搜索输入框（使用 `searchable` 修饰符）触发。

---

## `keyboardType`

设置聚焦输入时显示的键盘类型。

### 类型

```ts
keyboardType?: KeyboardType
```

### 可选值：

* `'default'`
* `'numberPad'`
* `'phonePad'`
* `'namePhonePad'`
* `'URL'`
* `'decimalPad'`
* `'asciiCapable'`
* `'asciiCapableNumberPad'`
* `'emailAddress'`
* `'numbersAndPunctuation'`
* `'twitter'`
* `'webSearch'`

### 示例

```tsx
<TextField keyboardType="emailAddress" />
```

---

## `autocorrectionDisabled`

控制是否启用系统的自动更正功能。

### 类型

```ts
autocorrectionDisabled?: boolean
```

### 默认值

* `true` — 默认禁用自动更正。

### 示例

```tsx
<TextField autocorrectionDisabled={false} />
```

---

## `textInputAutocapitalization`

设置文本输入时的自动大写行为。

### 类型

```ts
textInputAutocapitalization?: TextInputAutocapitalization
```

### 可选值

* `"never"` – 不自动大写。
* `"characters"` – 每个字母都大写。
* `"sentences"` – 每个句子的首字母大写。
* `"words"` – 每个单词的首字母大写。

### 示例

```tsx
<TextField textInputAutocapitalization="words" />
```

---

## `submitScope`

阻止当前视图触发的提交操作向上传递到父级视图的 `onSubmit` 处理器。

### 类型

```ts
submitScope?: boolean
```

### 默认值

* `false` — 默认允许事件向上传递。

### 示例

```tsx
<TextField submitScope />
```

启用此项后，该字段的提交事件将不会触发父视图中的提交处理逻辑。

## `submitLabel`

设置提交按钮的文本。

### 类型

```ts
submitLabel?: "continue" | "return" | "send" | "go" | "search" | "join" | "done" | "next" | "route"
```

### 示例

```tsx
<TextField submitLabel="send" />
```