---
title: Toggle
description: A control that toggles between on and off states.

---
        
The `Toggle` component in the Scripting app provides a view control that allows users to toggle between "on" and "off" states. It supports various configuration options to suit different use cases, including user interaction handlers, intents for automation, and customization for display purposes.

## ToggleProps

The `ToggleProps` type defines the configuration options for the `Toggle` component. 

### Properties

#### **value**
- **Type**: `boolean`
- **Description**: Indicates whether the toggle is currently in the "on" (`true`) or "off" (`false`) state.
- **Required**: Yes

---

#### **onChanged**
- **Type**: `(value: boolean) => void`
- **Description**: A handler function that is invoked whenever the toggle state changes. It receives the new state (`true` or `false`) as a parameter.
- **Required**: Yes, if `intent` is not provided.

---

#### **intent**
- **Type**: `AppIntent<any>`
- **Description**: An `AppIntent` to execute when the toggle is toggled. This is available only for `Widget` or `LiveActivity` contexts.
- **Required**: Yes, if `onChanged` is not provided.

---

#### **title**
- **Type**: `string`
- **Description**: A short string describing the purpose of the toggle.
- **Optional**: Yes, mutually exclusive with `children`.

---

#### **systemImage**
- **Type**: `string`
- **Description**: The name of an image resource to display alongside the toggle, typically for enhancing the description.
- **Optional**: Yes, available only if `title` is provided.

---

#### **children**
- **Type**: `(VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode`
- **Description**: A custom view that describes the purpose of the toggle, offering a more flexible alternative to `title`.
- **Optional**: Yes, mutually exclusive with `title`.

---

## ToggleStyle

Defines the appearance and behavior of the `Toggle`. It can be configured through the `toggleStyle` property in `CommonViewProps`.

### Options
- **`'automatic'`**: Automatically chooses the most appropriate style based on context.
- **`'switch'`**: Displays the toggle as a traditional switch.
- **`'button'`**: Displays the toggle as a button.

---

## CommonViewProps

`CommonViewProps` provides additional customization options for the `Toggle`.

### Properties

#### **toggleStyle**
- **Type**: `'automatic' | 'switch' | 'button'`
- **Description**: Specifies the appearance and behavior of the toggle. Defaults to `'automatic'` if not set.
- **Optional**: Yes

---

## Usage Examples

### Example 1: Basic Toggle with State Change Handler
```tsx
import { Toggle } from 'scripting'

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <Toggle 
      value={isEnabled} 
      onChanged={newValue => setIsEnabled(newValue)} 
      title="Enable Notifications" 
      systemImage="bell"
    />
  )
}
```

---

### Example 2: Toggle with AppIntent
```tsx
import { Toggle, } from 'scripting'
import { SomeToggleIntent } from "./app_intents"

function MyWidget() {
  const checked = getCheckedState()
  return (
    <Toggle 
        value={checked} 
        intent={SomeToggleIntent(checked)} 
        title="Perform Action" 
        systemImage="action"
    />
  )
}
```
See `Interactive Widget and LiveActivity` documentation for more information about `AppIntent`.
---

### Example 3: Toggle with Custom View
```tsx
import { Toggle, View } from 'scripting'

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <Toggle 
      value={isEnabled} 
      onChanged={newValue => setIsEnabled(newValue)}
    >
      <View>
        <Text>Enable Feature</Text>
        <Image imageUrl="https://example.com/feature-icon.png" />
      </View>
    </Toggle>
  )
}
```

---

### Example 4: Toggle with `toggleStyle`
```tsx
import { Toggle } from 'scripting'

function StyledToggle() {
  const [isActive, setIsActive] = useState(false)

  return (
    <Toggle 
      value={isActive} 
      onChanged={newValue => setIsActive(newValue)} 
      title="Styled Toggle" 
      toggleStyle="button"
    />
  )
}
```

---

This documentation ensures developers can utilize the `Toggle` component effectively, leveraging its versatility for creating dynamic and interactive UI experiences in the Scripting app.