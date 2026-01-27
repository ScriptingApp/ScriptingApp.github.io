---
title: Stepper

---
        
The `Stepper` is a control used for performing increment and decrement actions. It allows the user to increase or decrease a value by tapping the “+” or “-” buttons. The component also supports triggering callback functions when editing starts or ends.

## Properties

### 1. `title` (Optional, String)
- **Description**: Specifies the title of the stepper, typically used to describe the purpose of the stepper.
- **Type**: `string`
- **Example**:
    ```tsx
    <Stepper
      title="Adjust Volume" 
      onIncrement={handleIncrement} 
      onDecrement={handleDecrement} 
    />
    ```

### 2. `children` (Optional, VirtualNode)
- **Description**: A view that describes the purpose of this stepper. Multiple child views can be used to build the appearance of the control. This property is mutually exclusive with the `title` property.
- **Type**: `(VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode`
- **Example**:
    ```tsx
    <Stepper 
      onIncrement={handleIncrement} 
      onDecrement={handleDecrement}
    >
      <Text>Adjust Volume</Text>
    </Stepper>
    ```

### 3. `onIncrement` (Required, Callback Function)
- **Description**: A function executed when the user clicks or taps the “+” button.
- **Type**: `() => void`
- **Example**:
    ```tsx
    const handleIncrement = () => {
      console.log("Incremented")
    }

    <Stepper onIncrement={handleIncrement} onDecrement={handleDecrement} />
    ```

### 4. `onDecrement` (Required, Callback Function)
- **Description**: A function executed when the user clicks or taps the “-” button.
- **Type**: `() => void`
- **Example**:
    ```tsx
    const handleDecrement = () => {
      console.log("Decremented")
    }

    <Stepper 
      onIncrement={handleIncrement} 
      onDecrement={handleDecrement} 
    />
    ```

### 5. `onEditingChanged` (Optional, Callback Function)
- **Description**: A function called when editing begins and ends. For example, on iOS, when the user touches and holds the increment or decrement buttons on a Stepper, it triggers the `onEditingChanged` callback to indicate the start and end of the editing gesture.
- **Type**: `(value: boolean) => void`
- **Example**:
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

## Example Code

Here is a complete example showing how to use the `Stepper` component:

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

## Notes
- The `title` and `children` properties are mutually exclusive. You can use one or the other to describe the purpose of the stepper.
- The `onEditingChanged` callback is optional and only triggered when editing is supported, such as when the user long presses the buttons.

## Summary

The `Stepper` control provides a simple interface to increment and decrement values, with support for triggering callbacks during user interaction. You can configure the `title` or `children` properties to describe the purpose of the control, and use the `onIncrement` and `onDecrement` functions to define actions when the buttons are clicked.