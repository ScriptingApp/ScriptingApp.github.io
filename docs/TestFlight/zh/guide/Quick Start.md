---
title: 快速开始
description: 快速掌握 Scripting 应用的使用。

---

欢迎使用 **Scripting**！这是一款可让你使用 **TypeScript** 编写 **React 类似的 TSX 语法**来创建 UI 组件和自定义小组件、灵动岛和使用发通知提醒等能力的应用。通过 Scripting，你可以使用包装过的 SwiftUI 视图来获得在 iOS 上流畅且原生的使用体验，并通过熟悉的编码结构来创建和呈现各种 iOS 工具型 UI 页面。本指南将带你完成项目设置、组件创建以及结合 Hooks 构建动态界面的流程。

### 目录
1. **快速开始**
2. **创建脚本项目**
3. **导入组件**
4. **创建自定义组件**
5. **呈现 UI 视图**
6. **使用 Hooks**
7. **构建复杂的 UI**

---

### 1. 快速开始

在 Scripting 中，你可以通过定义函数式组件的方式来创建简单的 UI 元素。你需要的所有组件和 API 都可以从 `scripting` 包里导入。

### 2. 创建脚本项目

在开始编写代码之前，你需要**创建一个脚本项目**。项目创建完成后，你可以在 `index.tsx` 文件中编写代码。这个文件是定义 UI 组件和逻辑的主要入口。

`index.tsx` 的示例：

```tsx
import { VStack, Text } from "scripting"

// 定义一个自定义视图组件
function View() {
  return (
    <VStack>
      <Text>Hello, Scripting!</Text>
    </VStack>
  )
}
```

---

### 3. 导入视图

SwiftUI 中的所有视图以及部分 API 都进行了包装，并通过 `scripting` 包提供给你使用。以下是部分可用视图的列表：

- **布局视图**: `VStack`, `HStack`, `ZStack`, `Grid`
- **控件**: `Button`, `Picker`, `Toggle`, `Slider`, `ColorPicker`
- **集合**: `List`, `Section`
- **日期和时间**: `DatePicker`
- **文本和标签**: `Text`, `Label`, `TextField`

你可以像这样在项目中导入它们：

```tsx
import { VStack, Text, Button, Picker } from "scripting"
```

---

### 4. 创建自定义组件

在 Scripting 中，函数式组件的工作原理与 React 基本相同，可以使用类似 JSX 的语法来构建可复用组件。

示例：

```tsx
import { VStack, HStack, Text, Button } from "scripting"

function Greeting({
   name
}: {
   name: string 
}) {
  return (
    <HStack>
      <Text>Hello, {name}!</Text>
    </HStack>
  )
}

function MainView() {
  return (
    <VStack>
      <Greeting name="Scripting User" />
      <Button 
        title="Click Me" 
        action={() => console.log("Button Clicked!")}
      />
    </VStack>
  )
}
```

---

### 5. 呈现 UI 视图

若要呈现 UI 视图，可以使用 `Navigation.present` 方法。它能够以模态视图的形式显示自定义组件，并处理该视图的关闭。`Navigation.present` 方法会返回一个在视图被关闭后才会完成的 Promise。为了避免内存泄漏，一定要在视图关闭后调用 `Script.exit()`。

示例：

```tsx
import { VStack, Text, Navigation, Script } from "scripting"

function View() {
  return (
    <VStack>
      <Text>Hello, Scripting!</Text>
    </VStack>
  )
}

// 显示该视图
Navigation.present({ 
  element: <View />
}).then(() => {
  // 视图关闭后清理资源，避免内存泄漏
  Script.exit()
})
```

在上述示例中，`Navigation.present({ element: <View /> })` 会呈现 `View` 组件；当用户关闭此视图后，`Script.exit()` 确保释放相关资源。

---

### 6. 使用 Hooks

Scripting 支持一系列与 React 类似的 Hooks，用于管理组件中的状态、副作用、Memo 化以及上下文。以下是每种 Hook 的使用指南及示例：

---

#### `useState`
`useState` Hook 能够让你在函数式组件中添加本地状态。

```tsx
import { useState, VStack, Text, Button } from "scripting"

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <VStack>
      <Text>Count: {count}</Text>
      <Button
        title="Increment"
        action={() => setCount(count + 1)}
      />
    </VStack>
  )
}
```

在这个示例中，每次点击按钮都会更新 `count` 变量，并触发组件的自动重新渲染。

---

#### `useEffect`
`useEffect` Hook 可以让你在组件中执行副作用操作，比如获取数据或者设置订阅。

```tsx
import { useState, useEffect, VStack, Text } from "scripting"

function TimeDisplay() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  )

  useEffect(() => {
    let timerId: number

    const startTimer = () => {
      timerId = setTimeout(() => {
        setTime(new Date().toLocaleTimeString())
      }, 1000)
    }

    startTimer()
    
    return () => clearTimeout(timerId) // 组件卸载时清理定时器
  }, [])

  return <Text>Current Time: {time}</Text>
}
```

在此示例中，`useEffect` Hook 会设置一个间隔操作，每秒更新一次 `time` 变量，并在组件卸载时清除该间隔以避免潜在的问题。

---

#### `useReducer`
当你需要在组件中管理更复杂的状态逻辑时，`useReducer` Hook 非常有用。

```tsx
import { useReducer, VStack, Text, Button } from "scripting"

type Action = { 
  type: "increment"
} | {
  type: "decrement"
}
const reducer = (state: number, action: Action) => {
  switch (action.type) {
    case "increment":
      return state + 1
    case "decrement":
      return state - 1
    default:
      return state
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0)

  return (
    <VStack>
      <Text>Count: {count}</Text>
      <Button 
        title="Increment"
        action={() => dispatch({ type: "increment" })}
      />
      <Button
        title="Decrement"
        action={() => dispatch({ type: "decrement" })}
      />
    </VStack>
  )
}
```

`useReducer` Hook 可以通过一个 reducer 函数来帮助你更好地处理复杂的状态变更。

---

#### `useCallback`
`useCallback` Hook 可以让你对函数进行 Memo 化，以避免在每次渲染时都重新创建函数，从而提升性能。

```tsx
import { useState, useCallback, VStack, Text, Button } from "scripting"

function Counter() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    setCount((prev) => prev + 1)
  }, [])

  return (
    <VStack>
      <Text>Count: {count}</Text>
      <Button 
        title="Increment"
        action={increment}
      />
    </VStack>
  )
}
```

使用 `useCallback`，只有在依赖项改变时才会重新创建 `increment` 函数，从而在大型或频繁更新的组件中提升性能。

---

#### `useMemo`
`useMemo` Hook 允许你对某些值进行 Memo 化，以缓存代价高的计算结果，从而提高性能。

```tsx
import { useState, useMemo, VStack, Text, Button } from "scripting"

function FactorialCounter() {
  const [count, setCount] = useState(1)

  const factorial = useMemo(() => {
    let result = 1
    for (let i = 1; i <= count; i++) result *= i
    return result
  }, [count])

  return (
    <VStack>
      <Text>Factorial of {count} is {factorial}</Text>
      <Button 
        title="Increase"
        action={() => setCount(count + 1)}
      />
    </VStack>
  )
}
```

`useMemo` Hook 仅在 `count` 改变时才重新计算阶乘，从而避免不必要的性能消耗。

---

#### `useContext`
`useContext` Hook 允许你在应用的各组件之间共享状态，而无需进行层层的 props 传递（即“向下传递”）。

```tsx
import { createContext, useContext, VStack, Text, Button } from "scripting"

const CountContext = createContext<number>()

function Display() {
  const count = useContext(CountContext)
  return <Text>Shared Count: {count}</Text>
}

function App() {
  return (
    <CountContext.Provider value={42}>
      <VStack>
        <Display />
      </VStack>
    </CountContext.Provider>
  )
}
```

在此示例中，`useContext` 可以访问 `CountContext`，从而在应用中共享计数值。

---

### 7. 构建复杂的 UI

通过结合已提供的视图、Hooks 和自定义组件，你可以构建出功能完善、结构复杂的 UI。

示例：

```tsx
import { useState, VStack, Text, TextField, List, Section, NavigationStack, Script } from "scripting"

function ToDoApp() {
  const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3"])
  const [content, setContent] = useState("")

  return (
    <NavigationStack>
        <List
          navigationTitle="My Tasks"
        >
          <Section>
            {tasks.map((task, index) => (
              <Text key={index}>{task}</Text>
            ))}
          </Section>
          
          <TextField
            title="New Task"
            value={content}
            onSubmit={() => {
              if (content.length === 0) {
                return
              }
              setTasks([...tasks, content])
              setContent("")
            }}
          />
        </List>
    </NavigationStack>
  )
}

async function run() {
  await Navigation.present({
    element: <ToDoApp />
  })

  Script.exit()
}
```

---

如需了解更多详细信息，请查阅完整的 API 文档，该文档包含关于 `scripting` 包的更多示例和使用场景。