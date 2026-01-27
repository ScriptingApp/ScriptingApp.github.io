---
title: LiveActivity View Modifiers
---

Scripting provides two view modifiers that customize the appearance of Live Activities on the Lock Screen. These modifiers control the background tint color of the Live Activity and the foreground color of the system-provided action button.

These properties are designed to match SwiftUI’s Live Activity customization options.

---

## Modifier Definitions

```ts
/**
 * Sets the tint color for the background of a Live Activity that appears on the Lock Screen.
 */
activityBackgroundTint?: Color | {
  light: Color
  dark: Color
}

/**
 * Sets the text (foreground) color for the system-provided auxiliary action button
 * that appears next to a Live Activity on the Lock Screen.
 */
activitySystemActionForegroundColor?: Color | {
  light: Color
  dark: Color
}
```

---

## Usage Constraints

These modifiers **can only be applied to the `content` view** of the Live Activity UI.

They **do not** take effect when placed in:

- `compactLeading`
- `compactTrailing`
- `minimal`

Only the **full-size Lock Screen presentation** (the `content` region) supports these appearance customizations.

---

## Modifier Details

## 1. activityBackgroundTint

**Type:** `Color | { light: Color; dark: Color }`
**Description:**
Sets the tint color used as the background of the Live Activity when displayed on the Lock Screen.

This influences the main card background rendered by the system.

### Typical Use Cases

- Applying a brand color as the Live Activity background
- Giving different Live Activities distinct themes
- Improving readability by contrasting text and background colors

---

## 2. activitySystemActionForegroundColor

**Type:** `Color | { light: Color; dark: Color }`
**Description:**
Specifies the foreground (text/icon) color of the system’s auxiliary action button that may appear next to the Live Activity on the Lock Screen.

### Typical Use Cases

- Ensuring button text is readable on dark or bright backgrounds
- Highlighting an important system-provided action
- Matching the app’s color theme

---

## Usage Example (Content Only)

These modifiers must be applied to the **content** view inside your Live Activity UI builder:

```tsx
function ActivityView() {
  <LiveActivityUI
    content={
      <ContentView
        activityBackgroundTint={"blue"}
        activitySystemActionForegroundColor={"white"}
      />
    }
    compactLeading={...}
    compactTrailing={...}
    minimal={<Image systemName="clock" />}
  >
    <LiveActivityUIExpandedCenter>
      <ContentView />
    </LiveActivityUIExpandedCenter>
  </LiveActivityUI>
}
```

---

## Additional Notes

1. These modifiers affect only the Lock Screen presentation of the Live Activity.
2. They do not modify the compact or minimal variants shown in the Dynamic Island.
3. If not provided, the system will use default styles consistent with SwiftUI’s behavior.
