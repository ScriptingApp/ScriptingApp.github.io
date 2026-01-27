---
title: toggleStyle

---

The `toggleStyle` property defines how a `Toggle` (commonly known as a switch or checkbox) visually appears and behaves. By selecting a style, you can influence the toggle’s look—whether it looks like a traditional switch, a button-like state indicator, or let the system decide what’s best.

## Overview

A `Toggle` is used to represent a boolean on/off state. It might appear as a switch, a tappable button, or use the platform’s default look based on context. The `toggleStyle` property allows you to specify which appearance to use, ensuring your UI remains consistent with your app’s overall design language.

## Available Styles

- **`automatic`**:  
  Lets the system select the most appropriate style based on the platform and context. If you’re unsure which style to choose, `automatic` is a good default.

- **`switch`**:  
  Renders the toggle as a classic switch, similar to what you’d see in iOS Settings. The switch slides between off and on states, providing a familiar interaction for most users.

- **`button`**:  
  Presents the toggle as a button-like element. Instead of sliding, tapping toggles it on or off. This can fit well into UI layouts where toggles should feel more like selectable options rather than switches.

## Example Usage

### Switch Style

```tsx
<Toggle
  title="Enable Notifications"
  value={notificationsEnabled}
  onChanged={(newVal) => setNotificationsEnabled(newVal)}
  toggleStyle="switch"
/>
```

Here, the toggle is displayed as a switch. When the user taps it, the knob slides, turning the option on or off.

### Button Style

```tsx
<Toggle
  title="Dark Mode"
  value={darkMode}
  onChanged={(newVal) => setDarkMode(newVal)}
  toggleStyle="button"
/>
```

In this scenario, the toggle looks like a button that changes state when tapped. It may be useful in contexts where a more pronounced, clickable style feels appropriate.

### Automatic Style

```tsx
<Toggle
  title="Use Cellular Data"
  value={useCellular}
  onChanged={(newVal) => setUseCellular(newVal)}
  toggleStyle="automatic"
/>
```

With `automatic`, the system chooses the style. This is a good choice if you trust the system’s default styling to match the platform’s conventions, or if you’re aiming for maximum consistency without manually specifying a style.

## Other Toggle Properties

- **`value: boolean`**:  
  Indicates the current state of the toggle (on or off).

- **`onChanged(value: boolean): void`**:  
  A callback that fires when the toggle changes state. Use this to update your app’s data model accordingly.

- **`intent: AppIntent<any>` (optional)**:  
  Instead of handling state changes locally, you can associate a toggle with an `AppIntent` for certain widget or Live Activity scenarios. This lets you trigger predefined app actions directly from the toggle’s state changes.

- **`title` and `systemImage`**:  
  Provide a descriptive text label and optionally an image to convey the toggle’s purpose clearly.

- **`children`**:  
  Instead of a title or image, you can provide custom content (e.g., a text node, an icon, or a combination) as the label for the toggle.

## Summary

By adjusting the `toggleStyle`, you control how your toggle looks and feels. Whether you choose a familiar switch, a button-like toggle, or leave it to `automatic`, this property ensures that the toggle fits cohesively into your script's design and provides a clear and intuitive way for users to change a Boolean setting.