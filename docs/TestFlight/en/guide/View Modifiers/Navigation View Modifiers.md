---
title: Navigation View Modifiers
description: These modifiers allow for the customization of navigation titles, title display styles, and back button behavior—closely following the conventions of SwiftUI's navigation system.

---

The Scripting app supports a set of navigation-related view modifiers that enable developers to control how views are presented within navigation stacks. These modifiers allow for the customization of navigation titles, title display styles, and back button behavior—closely following the conventions of SwiftUI's navigation system.

---

## `navigationTitle`

```ts
navigationTitle?: string
```

Specifies the navigation title of the view.

### Description

* On **iOS**, the navigation title appears in the navigation bar when the view is part of a navigation stack.
* On **iPadOS**, the title of the primary navigation destination is also used as the app window's title in the App Switcher.

---

## `navigationBarTitleDisplayMode`

```ts
navigationBarTitleDisplayMode?: NavigationBarTitleDisplayMode
```

Controls the display style of the navigation title.

### Enum: `NavigationBarTitleDisplayMode`

```ts
type NavigationBarTitleDisplayMode = "automatic" | "large" | "inline"
```

* **`automatic`**: The system chooses the most appropriate display style based on context.
* **`large`**: Displays the title in a prominent, large style (typically for root views).
* **`inline`**: Displays the title in-line with the navigation bar controls, using a compact layout.

---

## `navigationBarBackButtonHidden`

```ts
navigationBarBackButtonHidden?: boolean
```

Hides or shows the navigation bar back button.

### Description

* When set to `true`, the default back button is not shown for the view.
* This is useful when implementing custom navigation controls or when the default back action should be disabled.

---

## Usage Example

```tsx
<VStack
  navigationTitle={"Profile"}
  navigationBarTitleDisplayMode={"inline"}
  navigationBarBackButtonHidden={true}
>
  <Text>Welcome to the Profile screen</Text>
</VStack>
```

In this example:

* The view’s title is set to `"Profile"` and will be shown in the navigation bar.
* The title uses the `inline` display style.
* The default back button is hidden.
