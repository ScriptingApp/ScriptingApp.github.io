Welcome to **Scripting**! This app enables you to create custom widgets for iOS using TypeScript and a React-like TSX syntax. With **Scripting**, you can build complex UIs quickly by combining familiar TypeScript code with SwiftUI components. Here’s how you can get started:

---

### 1. Creating Your First Widget

To create a widget for your iOS home screen, follow these steps:

#### Step 1: Create a New Script Project
1. Open the **Scripting** app.
2. Start a new script project and name it according to your widget idea.

#### Step 2: Set Up `widget.tsx`
1. Inside your project, create a new file named `widget.tsx`.
2. Define your widget's main view component using a function, similar to how you would in React.
3. Import all APIs and views from the `scripting` package.

#### Example
```typescript
// widget.tsx
import { VStack, Text, Widget } from 'scripting'

function MyWidgetView() {
  return (
    <VStack>
      <Text>Hello world</Text>
    </VStack>
  )
}

// Presenting the widget
Widget.present(<MyWidgetView />)
```

In this example:
- `MyWidgetView` is a function component that uses SwiftUI-inspired components (like `VStack` and `Text`) to structure and style the UI.
- `Widget.present(<MyWidgetView />)` renders your component as the widget view on your home screen.

---

### 2. Accessing Widget Context Properties

To adapt your widget’s content to different contexts, you can use the following properties available through the `Widget` API:

- **`Widget.displaySize`**: Provides the size of the widget being displayed, useful for adjusting the layout based on widget dimensions.
- **`Widget.family`**: Returns the widget family (e.g., small, medium, large) to help tailor the UI for each available widget size.
- **`Widget.parameter`**: Allows you to configure a custom parameter for the widget in the iOS home screen widget configuration panel. This parameter can be used within your component to customize the widget based on user input or preferences.

---

### 3. Adding Your Widget to the Home Screen

1. Once you've created your widget component and set up `Widget.present`, add a **Scripting widget** to your iOS home screen.
2. Tap and hold the widget, then select **Edit Widget**.
3. In the widget’s configuration, choose the script you just created and set the **parameter** if desired.

The widget will now render `MyWidgetView` (or whichever component you specified) directly on your home screen.

---

### 4. Wrapping SwiftUI Views

The **Scripting** app allows you to wrap and use **SwiftUI** views within your TypeScript code. This flexibility provides access to powerful, native iOS UI components and smooth integration with TypeScript’s logic and React-like TSX syntax.

Use the SwiftUI-inspired components available within **Scripting**, such as `VStack`, `Text`, and others, to achieve the look and feel you want.

---

### Additional Notes

- **Component Structure:** You can build your widgets in a modular way by composing multiple components within your `widget.tsx` file, or you can create components in multiple files and then import them using `import { OtherComponent } from "./other_component`.
- **Widget Updates:** After you add the widgets to the home screen, they can be refreshed immediately by calling `Widget.reloadAll()`. When you update the widget.tsx code, you can reload the widget by tapping the `Refresh Widget` button in the lower right corner. Allowing for rapid development and testing.
- **Documentation for Views:** Refer to the **Views** for detailed documentation on all available views and APIs in the `scripting` package.

---

**Enjoy building your custom widgets with Scripting!** Feel free to explore and experiment with different layouts and components to create the perfect home screen widgets tailored to your needs.
