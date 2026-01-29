# 切换开关

`Toggle` 组件是 Scripting 应用中的一种视图控件，允许用户在“开启”和“关闭”状态之间切换。它支持多种配置选项，以适应不同的使用场景，包括用户交互处理器、自动化的意图支持以及用于显示的自定义选项。

***

## ToggleProps

`ToggleProps` 类型定义了 `Toggle` 组件的配置选项。

### 属性

#### **value**

- **类型**: `boolean`
- **描述**: 指示当前切换状态是“开启”(`true`)还是“关闭”(`false`)。
- **是否必需**: 是

***

#### **onChanged**

- **类型**: `(value: boolean) => void`
- **描述**: 当切换状态更改时调用的处理函数。它接收新的状态值（`true` 或 `false`）作为参数。
- **是否必需**: 是（如果未提供 `intent`）。

***

#### **intent**

- **类型**: `AppIntent<any>`
- **描述**: 当切换状态更改时执行的 `AppIntent`。仅适用于 `Widget` 或 `LiveActivity` 上下文。
- **是否必需**: 是（如果未提供 `onChanged`）。

***

#### **title**

- **类型**: `string`
- **描述**: 描述此切换目的的一段简短字符串。
- **可选**: 是，与 `children` 互斥。

***

#### **systemImage**

- **类型**: `string`
- **描述**: 显示在切换旁边的图像资源名称，通常用于增强描述。
- **可选**: 是，仅当提供了 `title` 时可用。

***

#### **children**

- **类型**: `(VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode`
- **描述**: 描述切换目的的自定义视图，提供比 `title` 更灵活的替代方案。
- **可选**: 是，与 `title` 互斥。

***

## ToggleStyle

定义 `Toggle` 的外观和行为。可以通过 `CommonViewProps` 中的 `toggleStyle` 属性进行配置。

### 选项

- **`'automatic'`**: 根据上下文自动选择最合适的样式。
- **`'switch'`**: 将切换显示为传统的开关。
- **`'button'`**: 将切换显示为按钮。

***

## CommonViewProps

`CommonViewProps` 提供了用于自定义 `Toggle` 的附加选项。

### 属性

#### **toggleStyle**

- **类型**: `'automatic' | 'switch' | 'button'`
- **描述**: 指定切换的外观和行为。如果未设置，则默认为 `'automatic'`。
- **可选**: 是

***

## 使用示例

### 示例 1: 带状态更改处理器的基础切换

```tsx
import { Toggle } from 'scripting'

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <Toggle 
      value={isEnabled} 
      onChanged={newValue => setIsEnabled(newValue)} 
      title="启用通知" 
      systemImage="bell"
    />
  )
}
```

***

### 示例 2: 带有 AppIntent 的切换

```tsx
import { Toggle, } from 'scripting'
import { SomeToggleIntent } from "./app_intents"

function MyWidget() {
  const checked = getCheckedState()
  return (
    <Toggle 
        value={checked} 
        intent={SomeToggleIntent(checked)} 
        title="执行操作" 
        systemImage="action"
    />
  )
}
```

有关 `AppIntent` 的更多信息，请参阅 `Interactive Widget and LiveActivity` 文档。

***

### 示例 3: 带有自定义视图的切换

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
        <Text>启用功能</Text>
        <Image imageUrl="https://example.com/feature-icon.png" />
      </View>
    </Toggle>
  )
}
```

***

### 示例 4: 带有 `toggleStyle` 的切换

```tsx
import { Toggle } from 'scripting'

function StyledToggle() {
  const [isActive, setIsActive] = useState(false)

  return (
    <Toggle 
      value={isActive} 
      onChanged={newValue => setIsActive(newValue)} 
      title="样式切换" 
      toggleStyle="button"
    />
  )
}
```

***

通过本指南，开发者可以充分利用 `Toggle` 组件的功能，轻松创建动态且交互性强的 UI 体验，提升 Scripting 应用的开发效率。
