---
title: Widget Quick Start
---
The **Scripting** app allows you to create iOS home screen widgets using TypeScript and a React-like TSX syntax. Widgets are defined in a `widget.tsx` file using SwiftUI components.

---

## 1. Getting Started

### Step 1: Create a Script Project

1. Open the **Scripting** app.
2. Create a new script project and name it appropriately for your widget.

### Step 2: Add a `widget.tsx` File

1. In your project, create a file named `widget.tsx`.
2. Define your widget’s UI using a function component.
3. Import components and APIs from the `scripting` package.

#### Example:

```tsx
// widget.tsx
import { VStack, Text, Widget } from 'scripting'

function MyWidgetView() {
  return (
    <VStack>
      <Text>Hello world</Text>
    </VStack>
  )
}

Widget.present(<MyWidgetView />)
```

Calling `Widget.present()` renders the component as a widget on your home screen.

---

## 2. Accessing Widget Context

You can use the following properties from the `Widget` API to adapt your layout and content:

| Property             | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| `Widget.displaySize` | The actual pixel size of the widget at runtime.                           |
| `Widget.family`      | The widget family: `'small'`, `'medium'`, or `'large'`.                   |
| `Widget.parameter`   | A user-defined parameter configured in the widget's home screen settings. |

Use these properties to tailor layout, content, or conditional views based on widget size or user preference.

---

## 3. Adding to the Home Screen

1. Add a **Scripting** widget to your iOS home screen.
2. Long press the widget and tap **Edit Widget**.
3. Choose the script you created and configure the **parameter** if needed.

Once configured, your `widget.tsx` component will be rendered directly on the home screen.

---

## 4. View Composition

Use built-in components inspired by SwiftUI (such as `VStack`, `HStack`, `Text`, `Image`, etc.) to build your widget layout. You may structure your code by splitting logic and views into separate files and importing them as modules.

---

## 5. Development Constraints and Best Practices

### Hooks Are Ineffective in Widgets

While you can technically use React-style hooks such as `useState`, `useEffect`, etc., **they will not take effect in widgets**, because widgets are rendered **once** with no retained state or interaction cycle. Avoid relying on any dynamic state logic.

### Memory Limit

iOS imposes a memory limit for widgets — approximately **30MB**. To stay within budget:

* Avoid rendering large trees of nested views.
* Minimize image resource use.
* Ensure there are no memory leaks or lingering data references.

Rendering failures or blank widgets often indicate memory issues.

### Widget Context Is Destroyed

After calling `Widget.present(...)`, the current execution context will be **immediately destroyed**. You must:

* Complete all data preparation before the call.
* Avoid placing logic **after** `Widget.present`, as it won’t execute.
* Treat the widget function as a one-shot UI renderer.

---

## 6. Interaction Support

Although widgets are mostly static, **basic interaction is supported** via AppIntents:

* Use components like `<Button>` or `<Toggle>` to trigger `AppIntent` actions.
* For more details, refer to the **Interactive Widget and LiveActivity** documentation.

---

## 7. View Compatibility

**Not all SwiftUI views are supported in widgets.** Certain layout containers and effects are not available. Refer to Apple’s documentation on [Supported SwiftUI Views in WidgetKit](https://developer.apple.com/documentation/widgetkit/swiftui-views) to ensure compatibility.

---

## 8. Previewing Limitations

The widget preview inside the Scripting app is only an **approximation**. Actual rendering on the iOS home screen may differ slightly in:

* Text alignment
* Widget size
* Widget corner radius
* Layout behavior

To validate your layout, **always test the widget directly on the home screen**.

---

## 9. Refreshing Widgets

* Call `Widget.reloadAll()` within a script (in the code of your AppIntents or `index.tsx`) to refresh all widgets immediately.
* Use the **Refresh Widget** button in the Scripting app to trigger an update during development.

This enables rapid iteration when adjusting layout or logic.

---

## 10. Documentation and Support

* See the **Views Documentation** for a complete list of components and modifiers.
* Refer to the **APIs Documentation** for more advanced integrations (e.g., Calendar, FileManager, AVPlayer).

---

## 11. Programmatic Previewing with `Widget.preview`

During development, you can use `Widget.preview()` to programmatically preview a widget from `index.tsx` with specific parameters and layout configuration, without having to go back to the home screen.

### Method: `Widget.preview(options)`

This method renders a preview of your widget in-app, simulating different parameter configurations and sizes. It is intended **only for development use** and must be called from the **`index.tsx` context** (not from `widget.tsx` or `intent.tsx`).

### Parameters

| Property             | Type                                                   | Description                                                                         |
| -------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `family`             | `'systemSmall'` \| `'systemMedium'` \| `'systemLarge'` | Optional. Specifies the widget size to preview. Defaults to `'systemSmall'`.        |
| `parameters.options` | `Record<string, string>`                               | A record mapping parameter names to JSON-encoded strings representing input values. |
| `parameters.default` | `string`                                               | The name of the default parameter option to use during preview.                     |

### Example

```tsx
const options = {
  "Param 1": JSON.stringify({
    color: "red"
  }),
  "Param 2": JSON.stringify({
    color: "blue"
  }),
}

await Widget.preview({
  family: "systemSmall",
  parameters: {
    options,
    default: "Param 1"
  }
})
console.log("Widget preview dismissed")
```

This allows you to test how your widget responds to different inputs (e.g., colors, content types, or configuration states) without going through the home screen widget settings.

### Notes

* **Must be called from `index.tsx`**, such as in manual test scripts or development tools.
* Will **throw an error** if the parameter format is invalid.
* The preview is still subject to the same rendering limitations as described in [Section 8. Previewing Limitations](#8-previewing-limitations).
