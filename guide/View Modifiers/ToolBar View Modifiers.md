# ToolBar View Modifiers

The Scripting app supports a collection of view modifiers that control the visibility, appearance, and behavior of system toolbars, including the navigation bar, bottom bar, and tab bar. These modifiers align closely with SwiftUI's APIs and provide declarative control over toolbar configuration at the view level.

***

## Visibility Modifiers

These modifiers control the visibility of various interface bars on a per-view basis.

```ts
bottomBarVisibility?: Visibility
navigationBarVisibility?: Visibility
tabBarVisibility?: Visibility
```

### Enum: `Visibility`

```ts
type Visibility = "automatic" | "hidden" | "visible"
```

- **`automatic`**: Defers visibility decision to the system.
- **`hidden`**: Explicitly hides the bar.
- **`visible`**: Forces the bar to be shown.

***

## Toolbar Title Menu

```ts
toolbarTitleMenu?: VirtualNode
```

Adds a custom menu that appears when tapping the navigation title. This feature is often used to expose contextual actions relevant to the current screen or view hierarchy.

***

## Toolbar Background Style

```ts
toolbarBackground?: ShapeStyle | DynamicShapeStyle | {
  style: ShapeStyle | DynamicShapeStyle
  bars?: ToolbarPlacement[]
}
```

Specifies the preferred background style of toolbars. You can apply a color, material, or gradient background, and optionally limit the scope to specific bars.

### `bars` (optional)

```ts
type ToolbarPlacement = "automatic" | "tabBar" | "bottomBar" | "navigationBar"
```

- Use this field to apply the background style only to specific system bars.
- If `bars` is omitted, the style applies automatically based on system behavior.

***

## Toolbar Background Visibility (iOS 18+)

```ts
toolbarBackgroundVisibility?: Visibility | {
  visibility: Visibility
  bars?: ToolbarPlacement[]
}
```

Controls the visibility of the toolbar background. You can use this to make toolbars appear translucent or completely hidden in specific contexts.

- **`visibility`**: A value of `"automatic"`, `"visible"`, or `"hidden"`.
- **`bars`** (optional): Targeted bars for applying the visibility change. If omitted, all toolbars are affected.

***

## Toolbar Color Scheme

```ts
toolbarColorScheme?: ColorScheme | {
  colorScheme: ColorScheme | null
  bars?: ToolbarPlacement[]
}
```

Specifies the color scheme used by toolbars and their contents.

### Enum: `ColorScheme`

```ts
type ColorScheme = "light" | "dark"
```

- **`light`**: Enforces a light appearance.
- **`dark`**: Enforces a dark appearance.
- **`null`**: Resets to the system default.

The `bars` field limits the color scheme application to selected bars, such as `navigationBar` or `tabBar`.

***

## Toolbar Title Display Mode

```ts
toolbarTitleDisplayMode?: ToolbarTitleDisplayMode
```

Controls how the navigation bar title is displayed.

### Enum: `ToolbarTitleDisplayMode`

```ts
type ToolbarTitleDisplayMode = "automatic" | "large" | "inline" | "inlineLarge"
```

- **`automatic`**: The system chooses between large or inline style based on context.
- **`large`**: Displays a large navigation title when appropriate.
- **`inline`**: Displays the title inline with the navigation bar.
- **`inlineLarge`**: Enables inline layout while preserving large title characteristics (e.g., custom styling).

***

## Usage Notes

- These modifiers can be combined to achieve consistent toolbar customization across different views.
- `toolbarBackground`, `toolbarColorScheme`, and `toolbarBackgroundVisibility` accept scoped configuration via the `bars` field, enabling precise visual adjustments.
- iOS 18 is required for `toolbarBackgroundVisibility`.
