---
title: Presentation View Modifiers
description: These view modifiers customize the appearance, sizing, and interaction behavior of views presented using sheet.

---

These view modifiers customize the appearance, sizing, and interaction behavior of views presented using `sheet` in the **Scripting** app. They allow for adaptive presentations, resizing with detents, background interaction control, and more.

> Apply these modifiers to the **root view** of the sheet content (e.g., `<VStack>`, `<NavigationStack>`, or `<List>`).

---

## `presentationCompactAdaptation`

Defines how a sheet adapts in **compact horizontal or vertical size classes**.

### Type

```ts
presentationCompactAdaptation?: PresentationAdaptation | {
  horizontal: PresentationAdaptation
  vertical: PresentationAdaptation
}
```

### `PresentationAdaptation` options:

* `"automatic"` – System default behavior
* `"fullScreenCover"` – Adapts to full-screen presentation
* `"sheet"` – Adapts to sheet-style presentation
* `"popover"` – Adapts to popover-style (where supported)
* `"none"` – Disables adaptation

### Example

```tsx
<NavigationStack
  presentationCompactAdaptation={{
    horizontal: "fullScreenCover",
    vertical: "sheet"
  }}
>
  {/* Sheet content */}
</NavigationStack>
```

---

## `presentationDragIndicator`

Controls visibility of the drag indicator at the top of the sheet.

### Type

```ts
presentationDragIndicator?: "visible" | "hidden" | "automatic"
```

### Example

```tsx
<VStack presentationDragIndicator="visible">
  <Text>Pull the indicator to resize</Text>
</VStack>
```

---

## `presentationDetents`

Defines the **available heights** ("detents") that the sheet can rest at. If multiple detents are provided, the user can **drag the sheet** to resize it.

### Type

```ts
presentationDetents?: PresentationDetent[]
```

### `PresentationDetent` values:

* `"medium"` – Approximately half screen height (not available in compact vertical size class)
* `"large"` – Full screen height
* `number > 1` – A fixed height in points
* `number between 0 and 1` – A **fractional height** (e.g., `0.5` means 50% of available height)

### Example

```tsx
<VStack presentationDetents={[200, "medium", "large"]}>
  <Text>Drag the sheet to change its height</Text>
</VStack>
```

---

## `presentationBackgroundInteraction`

Defines whether and how the user can interact with **views behind** the presented sheet.

### Type

```ts
presentationBackgroundInteraction?:
  | "automatic"
  | "enabled"
  | "disabled"
  | { enabledUpThrough: PresentationDetent }
```

### Example

Allow background interaction **up to** a certain sheet size:

```tsx
<VStack presentationBackgroundInteraction={{
  enabledUpThrough: "medium"
}}>
  <Text>Background is interactive when sheet is small</Text>
</VStack>
```

---

## `presentationContentInteraction`

Controls how the sheet prioritizes **resizing vs scrolling** when the user swipes up.

### Type

```ts
presentationContentInteraction?: "automatic" | "resizes" | "scrolls"
```

### Description

* `"resizes"`: Swipe gesture first resizes the sheet, then scrolls content.
* `"scrolls"`: Content inside (e.g., `ScrollView`) scrolls immediately.
* `"automatic"`: System default (usually prefers resizing first).

### Example

```tsx
<ScrollView presentationContentInteraction="scrolls">
  {/* Scrolls immediately, doesn't trigger resize */}
</ScrollView>
```

---

## `presentationCornerRadius`

Sets a custom **corner radius** for the sheet background.

### Type

```ts
presentationCornerRadius?: number
```

### Example

```tsx
<VStack presentationCornerRadius={16}>
  <Text>Sheet has rounded corners</Text>
</VStack>
```

---

## Full Usage Example

```tsx
function SheetPage({ onDismiss }: {
  onDismiss: () => void
}) {
  return <NavigationStack>
    <List navigationTitle="Other Page">
      <Text font="title" padding={50}>
        Drag the indicator to resize the sheet height.
      </Text>
      <Button
        title="Dismiss"
        action={onDismiss}
      />
    </List>
  </NavigationStack>
}

<Button
  title="Present"
  action={() => setIsPresented(true)}
  sheet={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    content: <SheetPage
      presentationDragIndicator="visible"
      presentationDetents={[200, "medium", "large"]}
      onDismiss={() => setIsPresented(false)}
    />
  }}
/>
```

---

## Summary

| Modifier                            | Description                                                             |
| ----------------------------------- | ----------------------------------------------------------------------- |
| `presentationCompactAdaptation`     | Defines how the sheet adapts in compact size classes                    |
| `presentationDragIndicator`         | Shows or hides the drag indicator                                       |
| `presentationDetents`               | Defines the heights the sheet can rest at                               |
| `presentationBackgroundInteraction` | Controls interaction with the background view during sheet presentation |
| `presentationContentInteraction`    | Determines whether sheet resizes or content scrolls on swipe            |
| `presentationCornerRadius`          | Sets a custom corner radius for the sheet                               |
