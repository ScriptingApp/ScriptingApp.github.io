# Toast提示

`toast` 修饰器用于在视图上显示一个临时提示框（Toast）。
它通常用于短暂地展示消息或反馈信息，例如“保存成功”、“操作完成”、“网络错误”等。

Toast 可以包含简单的文本消息，也可以自定义内容视图。
你可以控制其显示位置、持续时间、背景颜色、圆角、阴影等外观属性。

***

## 类型定义

```ts
toast?: {
  duration?: number | null
  position?: "top" | "bottom" | "center"
  backgroundColor?: Color | null
  textColor?: Color | null
  cornerRadius?: number | null
  shadowRadius?: number | null
} & (
  | { message: string; content?: never }
  | { message?: never; content: VirtualNode }
) & ({
  isPresented: boolean
  onChanged: (isPresented: boolean) => void
} | {
  isPresented: Observable<boolean>
})
```

***

## 属性说明

### `isPresented: boolean` 和 `onChanged(isPresented: boolean): void`

**说明**：
使用`isPresented`和`onChanged`来控制Toast的显示和隐藏。

**示例**：

```tsx
const [showToast, setShowToast] = useState(false)

toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  message: "Saved successfully"
}}
```

***

### `isPresented: Observable<boolean>`

**说明**：使用 `isPresented` 作为 `Observable` 来控制 Toast 的显示和隐藏。

**示例**：

````tsx
const showToast = useObservable(false)

toast={{
  isPresented: showToast,
  message: "Saved successfully"
}}

---

### `duration?: number | null`

**说明**：
Toast 显示的持续时间（单位：秒）。
默认值为 `2` 秒。

**示例**：

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  duration: 3,
  message: "Action completed"
}}
````

***

### `position?: "top" | "bottom" | "center"`

**说明**：
控制 Toast 在屏幕上的显示位置。
可选值：

- `"top"`：顶部显示
- `"bottom"`：底部显示（默认）
- `"center"`：居中显示

**示例**：

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  position: "top",
  message: "New message received"
}}
```

***

### `backgroundColor?: Color | null`

**说明**：
设置 Toast 的背景颜色。可以使用任意支持的 `Color` 类型。

**示例**：

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  backgroundColor: "blue",
  message: "Upload successful"
}}
```

***

### `textColor?: Color | null`

**说明**：
设置 Toast 文本的颜色。

**示例**：

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  textColor: "white",
  message: "Download failed"
}}
```

***

### `cornerRadius?: number | null`

**说明**：
设置 Toast 的圆角大小。
默认值为 `16`。

**示例**：

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  cornerRadius: 8,
  message: "Item added"
}}
```

***

### `shadowRadius?: number | null`

**说明**：
设置阴影的模糊半径。
默认值为 `4`。

**示例**：

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  shadowRadius: 6,
  message: "Success"
}}
```

***

## 显示文本消息

**示例**：

```tsx
function View() {
  const [showToast, setShowToast] = useState(false)

  return (
    <List
      toast={{
        isPresented: showToast,
        onChanged: setShowToast,
        message: "Data saved successfully",
        duration: 2,
        position: "bottom",
        backgroundColor: "green",
        textColor: "white"
      }}
    >
      <Button
        title="Save"
        action={() => setShowToast(true)}
      />
    </List>
  )
}
```

该示例中，当点击按钮后，会在底部显示一个绿色背景的提示“Data saved successfully”，持续 2 秒后自动消失。

***

## 显示自定义内容

**说明**：
除了简单文本，你还可以传入一个 `VirtualNode` 来自定义 Toast 的内容，例如包含图标、布局或按钮的自定义组件。

**示例**：

```tsx
function View() {
  const [showToast, setShowToast] = useState(false)

  return (
    <List
      toast={{
        isPresented: showToast,
        onChanged: setShowToast,
        content: (
          <HStack spacing={8}>
            <Image systemName="checkmark.circle.fill" />
            <Text foregroundStyle="white">Upload Complete</Text>
          </HStack>
        ),
        backgroundColor: "black",
        cornerRadius: 12
      }}
    >
      <Button
        title="Show Toast"
        action={() => setShowToast(true)}
      />
    </List>
  )
}
```

该示例展示了一个包含图标与文本的自定义 Toast。

***

## 使用建议

1. **保持状态同步**：
   `isPresented` 必须与 `onChanged` 回调保持同步，否则 Toast 无法正确关闭。

2. **简洁提示**：
   Toast 应用于短暂、轻量级的信息提示，而非需要交互的复杂内容。

3. **避免同时显示多个 Toast**：
   屏幕上同时出现多个 Toast 可能造成用户困惑。

4. **可组合使用**：
   你可以与 `Button`、`List` 等组件配合使用，用于即时反馈用户操作。
