`EnvironmentValuesReader` is a Scripting component that allows you to read environment values from the current view hierarchy.
It serves a similar role to SwiftUI’s `@Environment`, but with a more explicit and controlled design:
**You must specify which environment keys you want to read**, and the component will inject only those values into the `children` callback.

This makes environment access predictable, explicit, and optimized.

***

# EnvironmentValues Type

```ts
type EnvironmentValues = {
    colorScheme: ColorScheme;
    colorSchemeContrast: ColorSchemeContrast;
    displayScale: number;
    horizontalSizeClass: UserInterfaceSizeClass | null;
    verticalSizeClass: UserInterfaceSizeClass | null;
    dismiss: () => void;
    dismissSearch: () => void;
    editMode: EditMode | null;
    widgetRenderingMode: WidgetRenderingMode;
    showsWidgetContainerBackground: boolean;
    isSearching: boolean;
    isPresented: boolean;
    activityFamily: "small" | "medium";
    tabViewBottomAccessoryPlacement: 'expanded' | 'inline';
};
```

Below are the descriptions of each field.

***

# Field Descriptions

### 1. colorScheme

Type: `ColorScheme`
The current system color appearance (`light` or `dark`).

***

### 2. colorSchemeContrast

Type: `ColorSchemeContrast`
Represents contrast settings such as `standard` or `increased`.

***

### 3. displayScale

Type: `number`
The display scale factor of the device (e.g., **2.0**, **3.0**).

***

### 4. horizontalSizeClass

Type: `UserInterfaceSizeClass | null`
The horizontal size class of the current environment: `compact` or `regular`.

***

### 5. verticalSizeClass

Type: `UserInterfaceSizeClass | null`
The vertical size class, same categories as above.

***

### 6. dismiss

Type: `() => void`
A function to dismiss the currently presented view (equivalent to SwiftUI’s `dismiss()`).

***

### 7. dismissSearch

Type: `() => void`
A function that dismisses the current searchable field, if active.

***

### 8. editMode

Type: `EditMode | null`
Indicates whether the view is in editing mode (e.g., during List editing).

***

### 9. widgetRenderingMode

Type: `WidgetRenderingMode`
The current widget rendering mode (e.g., `fullColor`, `accented`).

***

### 10. showsWidgetContainerBackground

Type: `boolean`
Indicates whether the widget is showing the system-provided container background.

***

### 11. isSearching

Type: `boolean`
Whether the view is currently in a searching state triggered by `searchable`.

***

### 12. isPresented

Type: `boolean`
Whether the view is currently being shown, unlike `onAppear` which is called every time the view appears, `isPresented` is called only once when the view is first shown.

***

### 13. activityFamily

Type: `"small" | "medium"`
The current LiveActivity size, similar to SwiftUI's `activityFamily`, used to determine the size of LiveActivity UI.

***

### 14. tabViewBottomAccessoryPlacement

Type: `'expanded' | 'inline'`
The current TabView bottom accessory placement, similar to SwiftUI's `tabViewBottomAccessoryPlacement`.

***

# EnvironmentValuesReader Component

```ts
type EnvironmentValuesReaderProps = {
    /**
     * The keys to read from the environment values.
     */
    keys: Array<keyof EnvironmentValues>;
    /**
     * The callback function that receives the environment values.
     */
    children: (values: EnvironmentValues) => VirtualNode;
};
```

***

# Props Description

### keys

Type: `Array<keyof EnvironmentValues>`
Specifies exactly which environment keys you want to read.
Only these keys will be retrieved and passed to the callback.

***

### children(values)

Type: `(values: EnvironmentValues) => VirtualNode`
A rendering callback that receives the requested environment values and returns the corresponding view.

***

# Component Definition

```ts
declare const EnvironmentValuesReader: FunctionComponent<EnvironmentValuesReaderProps>;
```

***

# Usage Examples

## Example 1 — Reading colorScheme and displayScale

```tsx
import { EnvironmentValuesReader, Text, VStack } from "scripting"

function View() {
  return <EnvironmentValuesReader keys={["colorScheme", "displayScale"]}>
    {(env) => {
      return <VStack>
        <Text>Color Scheme: {env.colorScheme}</Text>
        <Text>Scale: {env.displayScale}</Text>
      </VStack>
    }}
  </EnvironmentValuesReader>
}
```

***

## Example 2 — Accessing dismiss

```tsx
<EnvironmentValuesReader keys={["dismiss"]}>
  {(env) => {
    return <Button
      title="Close"
      action={() => env.dismiss()}
    />
  }}
</EnvironmentValuesReader>
```

***

## Example 3 — Dynamic layout using size classes

```tsx
<EnvironmentValuesReader keys={["horizontalSizeClass"]}>
  {(env) => {
    const compact = env.horizontalSizeClass === "compact"
    return compact
      ? <Text>Compact Layout</Text>
      : <Text>Regular Layout</Text>
  }}
</EnvironmentValuesReader>
```

***

# Behavior Notes

1. **Only the explicitly listed keys are read**. All other environment values will not be included in the callback.
2. When any of the requested environment values change, the `children()` callback re-renders automatically.
3. `dismiss` and `dismissSearch` are real functional operations that behave like their SwiftUI equivalents.
4. Environment values originate from the parent view hierarchy (Navigation, searchable, editMode, Widget context, etc.).
5. If a key is not included in `keys`, it will not appear in the `values` object.
6. This API is not intended for global state management—only for accessing the contextual environment of the current view.
