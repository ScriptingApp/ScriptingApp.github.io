---
title: Widget API
description: The Widget API provides static methods and properties to render and interact with home screen widgets.

---

The `Widget` class provides static methods and properties to interact with home screen widgets created using the Scripting app. This API enables rendering widgets, handling configuration parameters, previewing widget layouts, and managing widget timelines.

---

## Class: `Widget`

This class cannot be instantiated. All its members are static.

---

### Properties

#### `Widget.family: WidgetFamily`

Returns the widget family configured by the user. The `WidgetFamily` determines the size and layout constraints of the widget.
Common values include:

* `"systemSmall"` – small widget
* `"systemMedium"` – medium widget
* `"systemLarge"` – large widget
* `"accessoryRectangular"` – Lock Screen rectangular widget
* `"accessoryCircular"` – Lock Screen circular widget

> **Type:** `WidgetFamily`

---

#### `Widget.displaySize: WidgetDisplaySize`

Returns the widget’s display size in points (width and height), depending on its family and the device's screen.

> **Type:** `{ width: number; height: number }`

---

#### `Widget.parameter: string`

Returns the value of the parameter configured in the widget’s settings when the script is executed via a home screen widget tap.
This is useful for customizing widget content dynamically based on user-defined input.

> **Type:** `string`

---

### Methods

#### `Widget.present(element, options?): void`

##### Type Definition

```ts
Widget.present(element: VirtualNode, reloadPolicy?: WidgetReloadPolicy): void

Widget.present(element: VirtualNode, optoins?: {
  reloadPolicy?: WidgetReloadPolicy
  relevance?: WidgetRelevance
}): void
```

Renders the widget UI using a React-like virtual node (`JSX.Element`).
You can optionally specify a reload policy to instruct the system when to request an updated timeline.

##### Parameters

* `element` (`VirtualNode`) – A JSX element representing the widget UI tree.
* `reloadPolicy` (`WidgetReloadPolicy`, optional) – Specifies when WidgetKit should request a new timeline. Defaults to `atEnd`.
* `relevance` (`WidgetRelevance`, optional) – Specifies the relevance of the widget, which affects its display priority.

##### Example

```tsx
function WidgetView() {
  return <VStack>
    <Image
      systemName="globe"
      resizable
      scaleToFit
      frame={{
        width: 28,
        height: 28
      }}
    />
    <Text>Hello Scripting!</Text>
  </VStack>
}

Widget.present(<WidgetView />, {
  policy: "after",
  date: new Date(Date.now() + 1000 * 60 * 5) // 5 minutes later
})
```

> **Returns:** `void`

---

#### `Widget.preview(options?: PreviewOptions): Promise<void>`

Previews the widget with the specified configuration. This method is available only in `index.tsx`, not in `widget.tsx` or `intent.tsx`.

##### Parameters

* `options` (optional) – Configuration for previewing the widget.

```ts
interface PreviewOptions {
  family?: WidgetFamily
  parameters?: {
    options: Record<string, string> // Map of parameter names to JSON stringified values
    default: string                 // The default parameter key to use
  }
}
```

##### Example

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

> **Returns:** `Promise<void>`
> Throws an error if parameters are not formatted correctly.

---

#### `Widget.reloadAll(): void`

Requests WidgetKit to reload the timelines for **all** widgets created using the Scripting app.
This is useful when the data or appearance of widgets may have changed and needs to be refreshed.

> **Returns:** `void`

---

## Related Types

### `WidgetFamily`

A string enum representing available widget sizes. Typical values:

```ts
type WidgetFamily =
  | "systemSmall"
  | "systemMedium"
  | "systemLarge"
  | "accessoryCircular"
  | "accessoryRectangular"
```

---

### `WidgetDisplaySize`

An object representing the widget’s current width and height in points:

```ts
interface WidgetDisplaySize {
  width: number
  height: number
}
```

---

### `WidgetReloadPolicy`

An object specifying when WidgetKit should request a new timeline:

```ts
type WidgetReloadPolicy =
  | { policy: "atEnd" } // Reload after the timeline ends (default)
  | { policy: "after", date: Date } // Reload after a specific date
```

---

### `WidgetRelevance`

An object specifying the relevance of a widget:

```ts
type WidgetRelevance = {
  score: number // A score used to determine widget priority
  duration?: number // Optional duration in seconds
}
```

---

## Usage Notes

* `Widget.present` should be used inside `widget.tsx` to define and display the actual widget content.
* `Widget.preview` is a development utility used in `index.tsx` to simulate how widgets look and behave with different parameters.
* You must call `Script.exit()` at the end of the widget script to ensure proper lifecycle handling.
* When using parameters, remember to parse `Widget.parameter` as JSON if it contains structured data.
