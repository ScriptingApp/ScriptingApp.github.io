---
title: App Events
description: This interface allows you to observe global application state changes, such as scene lifecycle transitions and changes in system-wide appearance (light/dark mode).

---

The `AppEvents` module in the Scripting app provides an interface to observe global application state changes, such as scene lifecycle transitions and changes in system-wide appearance (light/dark mode). These capabilities are essential for writing responsive scripts that react appropriately to runtime context.

---

## Scene Lifecycle

### `ScenePhase`

```ts
type ScenePhase = 'active' | 'inactive' | 'background'
```

Represents the state of the app’s scene:

* **`active`** – The app is in the foreground and interactive.
* **`inactive`** – The app is in transition or temporarily inactive.
* **`background`** – The app is running in the background and not visible.

---

## Color Scheme

### `ColorScheme`

```ts
type ColorScheme = 'light' | 'dark'
```

Reflects the current appearance mode of the device:

* **`light`** – Light mode UI
* **`dark`** – Dark mode UI

---

## `AppEventListenerManager<T>`

```ts
class AppEventListenerManager<T> {
  addListener(listener: (data: T) => void): void
  removeListener(listener: (data: T) => void): void
}
```

A generic event manager that allows you to register and unregister listeners dynamically. Used for both `scenePhase` and `colorScheme`.

---

## `AppEvents` Class

```ts
class AppEvents {
  static scenePhase: AppEventListenerManager<ScenePhase>
  static colorScheme: AppEventListenerManager<ColorScheme>
}
```

### `AppEvents.scenePhase`

Listen for scene phase transitions. Ideal for responding to foreground/background state changes.

#### Example

```ts
AppEvents.scenePhase.addListener((phase) => {
  if (phase === 'active') {
    console.log("App is active")
  } else if (phase === 'background') {
    console.log("App is in background")
  }
})
```

---

### `AppEvents.colorScheme`

Observe system-wide light/dark appearance changes in real time.

#### Example

```ts
AppEvents.colorScheme.addListener((scheme) => {
  console.log(`Current color scheme: ${scheme}`)
})
```

---

## `useColorScheme()` Hook

```ts
declare function useColorScheme(): ColorScheme
```

### Description

This hook provides a reactive way to access the current `ColorScheme` (`'light'` or `'dark'`) within a component. It automatically updates the value when the system theme changes.

### Example

```tsx
function ThemedView() {
  const colorScheme = useColorScheme()

  return <Text>
    {colorScheme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}
  </Text>
}
```

---

## Notes

* Listeners registered with `AppEvents` should be manually removed when no longer needed to prevent memory leaks.
* `useColorScheme()` is the recommended way to reactively reflect the current theme in your components.
* These APIs allow you to respond to system and app-level state changes in a clean, declarative way—without relying on imperative lifecycle logic.
