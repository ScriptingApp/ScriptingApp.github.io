# Widget Quick Start

**Scripting** is an app that allows you to create iOS Home Screen widgets using **TypeScript** and React-like **TSX** syntax.
You can define your widget’s UI inside a `widget.tsx` file using SwiftUI-inspired components.

***

## 1. Quick Start

### Step 1: Create a Script Project

1. Open the **Scripting** app.
2. Create a new script project and give your widget a name.

### Step 2: Add a `widget.tsx` File

1. In the project, create a new file named `widget.tsx`.
2. Define your widget’s interface using a functional component.
3. Import the required components and APIs from the `scripting` package.

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

Calling `Widget.present()` renders the widget on the Home Screen.

***

## 2. Accessing the Widget Context

You can use the following `Widget` API properties to adapt layout and content:

| Property             | Description                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| `Widget.displaySize` | The actual pixel size of the widget at runtime.                                  |
| `Widget.family`      | The widget size: `'small'`, `'medium'`, or `'large'`.                            |
| `Widget.parameter`   | The user-defined custom parameter configured in the Home Screen widget settings. |

These properties help you dynamically adjust content and layout based on the widget’s size or user preferences.

***

## 3. Add to Home Screen

1. Add the **Scripting** widget to your iOS Home Screen.
2. Long-press the widget and tap **Edit Widget**.
3. Select the script you created and configure its **Parameter** if needed.

Once configured, the UI defined in your `widget.tsx` file will appear directly on the Home Screen.

***

## 4. Building the View

Use SwiftUI-inspired built-in components such as `VStack`, `HStack`, `Text`, and `Image` to compose your widget UI.
You can also separate logic and UI across multiple files and import them as needed.

***

## 5. Development Constraints and Best Practices

### Hooks Are Not Active in Widgets

While you can technically use React hooks such as `useState` or `useEffect`, they **don’t take effect** inside widgets because widgets are **rendered once** and have no persistent interactive lifecycle.
Avoid relying on dynamic state logic.

### Memory Limit

iOS enforces an approximate **30 MB memory limit** per widget. To stay within it:

- Avoid deep view hierarchies.
- Minimize image usage.
- Avoid memory leaks or large data references.

If a widget fails to render or appears blank, it’s often due to exceeding this limit.

### Context Is Immediately Destroyed

After calling `Widget.present(...)`, the current execution context is **immediately destroyed**:

- Prepare all data before calling `Widget.present()`.
- Do not place code after `Widget.present()`, as it will never run.
- Treat the widget function as a one-time UI renderer.

***

## 6. Interaction Support

Although widgets are mostly static, **basic interactivity** can be achieved via **AppIntent**:

- Use `<Button>` or `<Toggle>` components to trigger AppIntents.
- See the **Interactive Widget** and **LiveActivity** documentation for more details.

***

## 7. View Compatibility

**Not all SwiftUI views are supported** in WidgetKit.
Some layout containers and visual effects are unavailable.
Refer to Apple’s official documentation: [Supported SwiftUI views in WidgetKit](https://developer.apple.com/documentation/widgetkit/swiftui-views).

***

## 8. Widget Preview Limitations

Widget previews inside the **Scripting** app are only **approximations**.
The actual rendering on the Home Screen may differ slightly in:

- Text alignment
- Widget size
- Corner radius
- Layout behavior

Always **test on the Home Screen** to verify the final layout.

***

## 9. Refreshing Widgets

### General Refresh Methods

- Call `Widget.reloadAll()` to refresh **all** widgets (both user and developer kinds).
- You can invoke it in `index.tsx` or inside an AppIntent.
- Alternatively, use the **Refresh Widgets** button in the Scripting app during development.

This enables rapid iteration on layout and logic.

***

### New: User Widgets vs Developer Widgets

Scripting now distinguishes between two kinds of widgets:

| Type             | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| **User Widgets** | Regular widgets intended for end-users to add and use on the Home Screen.    |
| **Test Widgets** | Developer-only widgets used for debugging and previewing during development. |

Each kind has its own `kind` identifier, allowing isolation between user and developer widgets.
This ensures that refreshing test widgets doesn’t affect the user’s actual widgets.

***

### New Refresh Methods

| Method                       | Description                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `Widget.reloadUserWidgets()` | Refreshes **User Widgets only**, without affecting any developer Test Widgets.      |
| `Widget.reloadTestWidgets()` | Refreshes **Test Widgets only**, without affecting user widgets on the Home Screen. |

These methods were introduced to **isolate user and developer environments**.
When developing, refreshing Test Widgets won’t disturb any user widgets already installed.

#### Example

```tsx
// During development
await Widget.reloadTestWidgets()

// When publishing or updating user widgets
await Widget.reloadUserWidgets()
```

#### Usage Recommendations

- **During development:** use `Widget.reloadTestWidgets()` for testing.
- **For production or user updates:** use `Widget.reloadUserWidgets()` or `Widget.reloadAll()`.

This separation helps prevent interference between development experiments and user-facing widgets.

***

## 10. Documentation and Support

- Refer to the **Views Documentation** for a complete list of available components and modifiers.
- Check the **API Documentation** for advanced integrations (e.g., Calendar, FileManager, AVPlayer, etc.).

***

## 11. Using `Widget.preview` for In-App Development Preview

During development, you can use `Widget.preview()` in your `index.tsx` to preview layout and parameter configurations **without leaving the app**.

### Method: `Widget.preview(options)`

This method simulates widget rendering for various sizes and parameters, suitable for **development-only testing**.
It can **only** be called from the **`index.tsx` environment** (not from `widget.tsx` or `intent.tsx`).

### Parameters

| Property             | Type                     | Description                                                               |                 |                                                               |
| -------------------- | ------------------------ | ------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------- |
| `family`             | `'systemSmall'`          | `'systemMedium'`                                                          | `'systemLarge'` | Optional. The preview widget size (default: `'systemSmall'`). |
| `parameters.options` | `Record<string, string>` | Key–value map of parameter options. Values must be JSON-parsable strings. |                 |                                                               |
| `parameters.default` | `string`                 | Specifies which parameter option to use by default.                       |                 |                                                               |

### Example

```tsx
const options = {
  "Param 1": JSON.stringify({ color: "red" }),
  "Param 2": JSON.stringify({ color: "blue" }),
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

This allows testing visual differences under different parameter inputs such as colors, text, or layout configurations.

### Notes

- Must be called **from `index.tsx`** — not from `widget.tsx` or `intent.tsx`.
- If the parameter format is invalid, an error will be thrown.
- Preview results are still subject to the [limitations listed in Section 8](#8-widget-preview-limitations); always verify the final look on the Home Screen.
