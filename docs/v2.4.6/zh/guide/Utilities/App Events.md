---
title: App事件
description: 该接口允许你监听应用程序级别的状态变化事件，例如生命周期（scene phase）变更以及系统外观（light/dark 模式）切换。

---

Scripting 提供的 `AppEvents` 模块允许你监听应用程序级别的状态变化事件，例如生命周期（scene phase）变更以及系统外观（light/dark 模式）切换。这些功能非常适合用于构建对运行时环境具有感知能力的响应式脚本或组件。

---

## 场景生命周期

### `ScenePhase`

```ts
type ScenePhase = 'active' | 'inactive' | 'background'
```

表示 App 当前的生命周期状态：

* **`active`**：应用处于前台，正在交互。
* **`inactive`**：应用处于过渡状态，暂时不活跃（如切换页面、弹窗等）。
* **`background`**：应用已进入后台，不再显示在屏幕上。

---

## 颜色外观（Color Scheme）

### `ColorScheme`

```ts
type ColorScheme = 'light' | 'dark'
```

表示当前系统主题外观模式：

* **`light`**：浅色模式。
* **`dark`**：深色模式。

---

## `AppEventListenerManager<T>`

```ts
class AppEventListenerManager<T> {
  addListener(listener: (data: T) => void): void
  removeListener(listener: (data: T) => void): void
}
```

通用事件监听器管理类，用于注册和移除监听器。`scenePhase` 和 `colorScheme` 都基于该类实现。

---

## `AppEvents` 类

```ts
class AppEvents {
  static scenePhase: AppEventListenerManager<ScenePhase>
  static colorScheme: AppEventListenerManager<ColorScheme>
}
```

### `AppEvents.scenePhase`

监听应用生命周期状态的变化，例如进入后台或前台。

#### 示例：

```ts
AppEvents.scenePhase.addListener((phase) => {
  if (phase === 'active') {
    console.log("App 已激活")
  } else if (phase === 'background') {
    console.log("App 已进入后台")
  }
})
```

---

### `AppEvents.colorScheme`

监听系统外观模式的切换事件（浅色 / 深色）。

#### 示例：

```ts
AppEvents.colorScheme.addListener((scheme) => {
  console.log(`当前外观：${scheme}`)
})
```

---

## `useColorScheme()` 钩子函数

```ts
declare function useColorScheme(): ColorScheme
```

### 说明：

`useColorScheme()` 是一个响应式 Hook，用于在组件中实时获取当前的 `ColorScheme`（`'light'` 或 `'dark'`）。当用户更改系统主题时，返回值会自动更新。

### 示例：

```tsx
function ThemedView() {
  const colorScheme = useColorScheme()

  return <Text>
    {colorScheme === 'dark' ? '当前为深色模式' : '当前为浅色模式'}
  </Text>
}
```

---

## 使用说明

* 使用 `AppEvents.scenePhase` 和 `AppEvents.colorScheme` 可观察全局状态变化，适用于数据暂停/恢复、UI调整等。
* 使用 `useColorScheme()` 是在组件中获取并响应系统外观切换的推荐方式。
* 所有通过 `addListener` 注册的事件都应在不再需要时调用 `removeListener` 以避免内存泄漏。
