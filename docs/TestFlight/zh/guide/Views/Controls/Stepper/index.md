---
title: 步进器
description: 一个执行递增和递减操作的控件。

---
        
`Stepper` 是一个用于执行递增和递减操作的控件。它允许用户通过点击“+”或“-”按钮来增加或减少数值。该组件也支持触发编辑状态变化的回调函数。

## 属性

### 1. `title`（可选，字符串）
- **描述**：指定步进器的标题，通常用于说明步进器的目的。
- **类型**：`string`
- **示例**：
    ```tsx
    <Stepper 
      title="Adjust Volume" 
      onIncrement={handleIncrement} 
      onDecrement={handleDecrement} 
    />
    ```

### 2. `children`（可选，虚拟节点）
- **描述**：用于描述步进器的目的的视图内容。可以使用多个子视图来构建控件的外观。此属性和 `title` 属性为互斥关系，只能选择其一。
- **类型**：`(VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode`
- **示例**：
    ```tsx
    <Stepper
      onIncrement={handleIncrement} 
      onDecrement={handleDecrement}
    >
      <Text>Adjust Volume</Text>
    </Stepper>
    ```

### 3. `onIncrement`（必选，回调函数）
- **描述**：当用户点击或触摸“+”按钮时，执行此函数。
- **类型**：`() => void`
- **示例**：
    ```tsx
    const handleIncrement = () => {
      console.log("Incremented");
    }

    <Stepper 
      onIncrement={handleIncrement} 
      onDecrement={handleDecrement} 
    />
    ```

### 4. `onDecrement`（必选，回调函数）
- **描述**：当用户点击或触摸“-”按钮时，执行此函数。
- **类型**：`() => void`
- **示例**：
    ```tsx
    const handleDecrement = () => {
      console.log("Decremented")
    }

    <Stepper onIncrement={handleIncrement} onDecrement={handleDecrement} />
    ```

### 5. `onEditingChanged`（可选，回调函数）
- **描述**：当编辑开始和结束时调用的函数。例如，在 iOS 上，用户长按步进器的增减按钮时，会触发 `onEditingChanged` 回调函数，表示编辑状态的变化。
- **类型**：`(value: boolean) => void`
- **示例**：
    ```tsx
    const handleEditingChanged = (isEditing: boolean) => {
      console.log("Editing started:", isEditing)
    }

    <Stepper 
      onIncrement={handleIncrement} 
      onDecrement={handleDecrement} 
      onEditingChanged={handleEditingChanged} 
    />
    ```

## 示例代码

以下是一个完整的示例，展示了如何使用 `Stepper` 组件：

```tsx
const handleIncrement = () => {
  console.log("Volume increased")
}

const handleDecrement = () => {
  console.log("Volume decreased")
}

const handleEditingChanged = (isEditing: boolean) => {
  console.log("Editing started:", isEditing)
}

<Stepper
  title="Volume Control"
  onIncrement={handleIncrement}
  onDecrement={handleDecrement}
  onEditingChanged={handleEditingChanged}
/>
```

## 注意事项
- `title` 和 `children` 属性是互斥的。只能使用一个来描述步进器的目的。
- `onEditingChanged` 回调函数是可选的，只在支持编辑状态的情况下触发，例如长按按钮时。

## 小结

`Stepper` 控件提供了一个简单的接口来实现递增和递减操作，支持在用户交互时触发回调。通过配置 `title` 或 `children` 属性来指定控件的目的，并且可以使用 `onIncrement` 和 `onDecrement` 函数定义按钮点击后的行为。