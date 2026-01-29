---
title: 模态展示
description: 在单独的视图中呈现内容，以提供更专注的交互。

---
        
Scripting App 提供了对 SwiftUI 风格的模态视图展示的支持。开发者可以通过向组件声明特定的属性，实现类似 `sheet`、`popover`、`fullScreenCover`、`alert` 和 `confirmationDialog` 的展示行为。这些展示是响应状态变化的，并支持多种配置项，以满足在不同屏幕尺寸和交互需求下的使用场景。

---

## Alert（警告弹窗）

当条件为真时，展示一个带标题、可选消息和操作按钮的警告弹窗。

```ts
alert?: {
  title: string
  isPresented: boolean
  onChanged: (isPresented: boolean) => void
  actions: VirtualNode
  message?: VirtualNode
}
```

### 字段说明

* **`title`**：弹窗的标题文本。
* **`isPresented`**：控制弹窗是否显示的布尔值。
* **`onChanged`**：当 `isPresented` 状态变化时调用的回调函数。需要在用户关闭弹窗时将其更新为 `false`。
* **`actions`**：表示操作按钮的 `VirtualNode`。
* **`message`**（可选）：用于展示附加信息的 `VirtualNode`。

---

## Confirmation Dialog（确认对话框）

展示一个确认对话框，包含标题、可选消息和操作项。

```ts
confirmationDialog?: {
  title: string
  titleVisibility?: Visibility
  isPresented: boolean
  onChanged: (isPresented: boolean) => void
  actions: VirtualNode
  message?: VirtualNode
}
```

### 字段说明

* **`title`**：对话框的标题。
* **`titleVisibility`**（可选）：标题是否显示，默认值为 `"automatic"`。
* **`isPresented`**：是否显示对话框。
* **`onChanged`**：用于更新 `isPresented` 状态的回调。
* **`actions`**：对话框操作项。
* **`message`**（可选）：附加消息内容。

```ts
type Visibility = "automatic" | "hidden" | "visible"
```

---

## Sheet（底部弹窗）

从底部弹出模态视图，通常用于展示中等重要性的内容。支持传入单个或多个配置项。

```ts
sheet?: ModalPresentation | ModalPresentation[]
```

---

## Full Screen Cover（全屏覆盖视图）

展示一个覆盖全屏的模态视图。可传入多个视图配置。

```ts
fullScreenCover?: ModalPresentation | ModalPresentation[]
```

---

## Popover（弹出菜单）

展示一个带箭头的弹出内容区域，通常用于 iPad 或大屏设备上。可设置适配策略及箭头位置。

```ts
popover?: PopoverPresentation | PopoverPresentation[]
```

### PopoverPresentation 类型定义

```ts
type PopoverPresentation = ModalPresentation & {
  arrowEdge?: Edge
  presentationCompactAdaptation?: PresentationAdaptation | {
    horizontal: PresentationAdaptation
    vertical: PresentationAdaptation
  }
}
```

#### 字段说明

* **`arrowEdge`**（可选）：弹出箭头指向的边，默认是 `"top"`。
* **`presentationCompactAdaptation`**（可选）：在紧凑环境下的展示适配策略。

```ts
type Edge = "top" | "bottom" | "leading" | "trailing"
```

---

## ModalPresentation（通用模态视图结构）

该类型被 `sheet`、`popover` 和 `fullScreenCover` 使用，定义了基础展示结构。

```ts
type ModalPresentation = {
  isPresented: boolean
  onChanged: (isPresented: boolean) => void
  content: VirtualNode
}
```

### 字段说明

* **`isPresented`**：控制是否展示模态视图。
* **`onChanged`**：模态视图关闭或显示时触发的状态更新回调。
* **`content`**：展示内容的 `VirtualNode`。

---

## PresentationAdaptation（展示适配策略）

指定在不同尺寸环境下的视图展示方式。

```ts
type PresentationAdaptation =
  | "automatic"
  | "fullScreenCover"
  | "none"
  | "popover"
  | "sheet"
```

* **`automatic`**：系统自动选择合适的展示方式。
* **`fullScreenCover`**：优先使用全屏覆盖。
* **`popover`**：优先使用弹出菜单形式。
* **`sheet`**：优先使用底部弹窗。
* **`none`**：尽量保持原始展示方式，不做适配。

---

## 示例用法

### 展示 Sheet

```tsx
<Button
  title={"Present"}
  action={() => setIsPresented(true)}
  sheet={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    content: <VStack>
      <Text>Sheet 内容</Text>
      <Button title={"Dismiss"} action={() => setIsPresented(false)} />
    </VStack>
  }}
/>
```

### 展示 Popover

```tsx
<Button
  title={"Show Popover"}
  action={() => setIsPresented(true)}
  popover={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    presentationCompactAdaptation: "popover",
    content: <Text>Popover 内容</Text>,
    arrowEdge: "top",
  }}
/>
```

### 展示 Full Screen Cover

```tsx
<Button
  title={"Present"}
  action={() => setIsPresented(true)}
  fullScreenCover={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    content: <VStack>
      <Text>全屏模态视图</Text>
    </VStack>
  }}
/>
```

### 配置 Sheet 高度

```tsx
sheet={{
  isPresented: isPresented,
  onChanged: setIsPresented,
  content: <VStack
    presentationDetents={[200, "medium", "large"]}
    presentationDragIndicator={"visible"}
  >
    <Text>可拖动调整高度的 Sheet</Text>
  </VStack>
}}
```

### 展示 Alert

```tsx
<Button
  title={"Present"}
  action={() => setIsPresented(true)}
  alert={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    title: "警告",
    message: <Text>一切正常</Text>,
    actions: <Button title={"OK"} action={() => {}} />
  }}
/>
```

### 展示 Confirmation Dialog

```tsx
<Button
  title={"Present"}
  action={() => setIsPresented(true)}
  confirmationDialog={{
    isPresented,
    onChanged: setIsPresented,
    title: "是否删除此图片？",
    actions: <Button title={"删除"} role={"destructive"} action={() => {}} />
  }}
/>
```