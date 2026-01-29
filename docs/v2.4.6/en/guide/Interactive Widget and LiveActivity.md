---
title: Interactive Widget and LiveActivity
description: To create dynamic and interactive UIs using Button and Toggle views.

---

The **Scripting** app supports adding interactivity to **widgets** and **LiveActivity**, allowing you to create dynamic and interactive UIs using `Button` and `Toggle` components. These controls can execute **AppIntents** to trigger actions, making your widgets and live activities more powerful.

---

## 1. Introduction to AppIntents

### What are AppIntents?

An **AppIntent** defines a specific action that can be triggered by a control (e.g., a `Button` or `Toggle`) in a widget or LiveActivity UI. AppIntents enable seamless interaction and functionality by linking UI components with executable logic.

### Supported Protocols

AppIntents can implement the following protocols:

- **`AppIntent`**: General-purpose intents for triggering custom actions.
- **`AudioPlaybackIntent`**: Handles audio playback (e.g., play, pause, or toggle audio states).
- **`AudioRecordingIntent`**: Manages audio recording states (requires iOS 18+ and a LiveActivity to stay active during recording).
- **`LiveActivityIntent`**: Modifies or manages LiveActivity states.

---

## 2. Registering an AppIntent

To use an **AppIntent**, it must first be registered in the `app_intents.tsx` file using the `AppIntentManager.register` method.

### Example: Registering AppIntents

```typescript
// app_intents.tsx

import { AppIntentManager, AppIntentProtocol } from "scripting"

// Register an AppIntent
const IntentWithoutParams = AppIntentManager.register({
  name: "IntentWithoutParams",
  protocol: AppIntentProtocol.AppIntent,
  perform: async (params: undefined) => {
    // Perform a custom action
    console.log("Intent triggered")
    // Optionally reload widgets
    Widget.reloadAll()
  }
})

// Register an AppIntent with parameters
const ToggleIntentWithParams = AppIntentManager.register({
  name: "ToggleIntentWithParams",
  protocol: AppIntentProtocol.AudioPlaybackIntent,
  perform: async (audioName: string) => {
    // Perform action based on the parameter
    console.log(`Toggling audio playback for: ${audioName}`)
    Widget.reloadAll()
  }
})
```

---

## 3. Using AppIntents in Widgets or LiveActivity UIs

After registering an AppIntent, it can be linked to interactive components like `Button` and `Toggle` in your `widget.tsx` or LiveActivity UI file.

### Example: Using AppIntents in a Widget

```typescript
// widget.tsx

import { VStack, Button, Toggle } from "scripting"
import { IntentWithoutParams, ToggleIntentWithParams } from "./app_intents"
import { model } from "./model"

function WidgetView() {
  return (
    <VStack>
      <Button
        title="Tap me"
        intent={IntentWithoutParams(undefined)} // Trigger the intent without parameters
      />
      <Toggle
        title="Play or Pause"
        value={model.checked}
        intent={ToggleIntentWithParams("audio_name")} // Trigger the intent with a parameter
      />
    </VStack>
  )
}

// Present the widget
Widget.present(<WidgetView />)
```

---

## 4. API Reference

### `AppIntentManager.register`

Registers an AppIntent for use in widgets or LiveActivity UIs.

#### Parameters:
- `name` (string): A unique name for the intent.
- `protocol` (`AppIntentProtocol`): Specifies the type of intent (e.g., `AppIntent`, `AudioPlaybackIntent`).
- `perform` (function): The function to execute when the intent is triggered.

#### Returns:
- An `AppIntentFactory` function that can be used to create instances of the registered intent.

---

### `Button` Component

A tappable button that triggers an AppIntent.

#### Props:
- `title` (string): The button’s label.
- `intent` (`AppIntent<any>`): The AppIntent to execute when the button is tapped.
- `systemImage` (optional): An SF Symbol to display on the button.

---

### `Toggle` Component

A toggle switch that triggers an AppIntent when its value changes.

#### Props:
- `value` (boolean): Indicates the toggle's state (on/off).
- `intent` (`AppIntent<any>`): The AppIntent to execute when the toggle is toggled.
- `title` (string): The toggle’s label.
- `systemImage` (optional): An SF Symbol to display with the toggle.

---

## 5. Notes and Best Practices

- Use `Widget.reloadAll()` within `perform` functions to update widgets dynamically after executing an intent.
- Define your AppIntents in `app_intents.tsx` for organization and reusability.
- Use appropriate protocols (e.g., `AudioPlaybackIntent`) to match the intent's functionality.