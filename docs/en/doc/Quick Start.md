---
title: Quick Start

---

Welcome to **Scripting**, an iOS app that lets you code UI components in **TypeScript** using **React-like TSX syntax**. With Scripting, you can create and present iOS utility UI pages through a familiar coding structure, using wrapped SwiftUI views for a smooth, native experience on iOS. This guide walks you through setting up your project, creating components, and working with hooks to build dynamic interfaces.

### Table of Contents
1. **Getting Started**
2. **Creating a Script Project**
3. **Importing Components**
4. **Creating Custom Components**
5. **Presenting UI Views**
6. **Using Hooks**
7. **Building Complex UIs**

---

### 1. Getting Started

In Scripting, you’ll create simple UI elements by defining them with function components. Every component and API you’ll need can be imported from the `scripting` package.

### 2. Creating a Script Project

Before you begin coding, you need to **create a script project**. Once the project is set up, write your code in the `index.tsx` file. This is your main entry point for defining UI components and logic.

Example setup in `index.tsx`:

```tsx
import { VStack, Text } from "scripting"

// Define a custom view component
function View() {
  return (
    <VStack>
      <Text>Hello, Scripting!</Text>
    </VStack>
  )
}
```

---

### 3. Importing Views

All views and some APIs from SwiftUI are wrapped and accessible through the `scripting` package. Here’s a list of some available views:

- **Layout Views**: `VStack`, `HStack`, `ZStack`, `Grid`
- **Controls**: `Button`, `Picker`, `Toggle`, `Slider`, `ColorPicker`
- **Collections**: `List`, `Section`
- **Date and Time**: `DatePicker`
- **Text and Labels**: `Text`, `Label`, `TextField`

To use these in your project, import them as shown:

```tsx
import { VStack, Text, Button, Picker } from "scripting"
```

---

### 4. Creating Custom Components

Function components in Scripting work just like in React, with JSX-like syntax for building reusable components.

Example:

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

### 5. Presenting UI Views

To present a UI view, use the `Navigation.present` method. This allows you to display a custom component as a modal view and handle its dismissal. The `Navigation.present` method returns a promise that fulfills when the view is dismissed. To avoid memory leaks, always call `Script.exit()` after the view is dismissed.

Example:

```tsx
import { VStack, Text, Navigation, Script } from "scripting"

function View() {
  return (
    <VStack>
      <Text>Hello, Scripting!</Text>
    </VStack>
  )
}

// Present the view
Navigation.present({ 
  element: <View />
}).then(() => {
  // Clean up to avoid memory leaks
  Script.exit()
})
```

In this example, `Navigation.present({ element: <View /> })` displays the `View` component, and when the user dismisses it, `Script.exit()` ensures resources are freed.

---

### 6. Using Hooks

Scripting supports a range of React-like hooks for managing state, effects, memoization, and context. Here’s a guide on how to use each hook with examples:

---

#### `useState`
The `useState` hook lets you add local state to a function component. 

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

In this example, clicking the button updates the `count` variable, which automatically re-renders the component.

---

#### `useEffect`
The `useEffect` hook lets you perform side effects in your components, such as fetching data or setting up subscriptions.

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
    
    return () => clearTimeout(timerId) // Clean up on unmount
  }, [])

  return <Text>Current Time: {time}</Text>
}
```

In this example, the `useEffect` hook sets up an interval to update the `time` variable every second, and clears the interval on component unmount.

---

#### `useReducer`
The `useReducer` hook is useful for managing complex state logic in components.

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

The `useReducer` hook helps you handle complex state transitions by using a reducer function.

---

#### `useCallback`
The `useCallback` hook lets you memoize functions, optimizing performance by preventing unnecessary re-creations of the function on every render.

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

With `useCallback`, the `increment` function is only re-created when necessary, improving performance in large or frequently updated components.

---

#### `useMemo`
The `useMemo` hook lets you memoize values, caching expensive computations for better performance.

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

The `useMemo` hook optimizes performance by only re-calculating the factorial when `count` changes.

---

#### `useContext`
The `useContext` hook allows components to access shared state across the app without prop drilling, using a Context API.

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

In this example, `useContext` accesses `CountContext` to get a shared count value across the app.

---

### 7. Building Complex UIs

Combine available views, hooks, and custom components to create complex, fully functional UIs.

Example:

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

For further details, check the full API documentation, which includes more examples and use cases for `scripting` package components and APIs.
