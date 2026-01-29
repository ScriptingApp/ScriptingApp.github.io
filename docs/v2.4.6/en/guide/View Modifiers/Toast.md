---
title: Toast
description: This view modifier displays a temporary notification message (toast) over the current view.

---

The `toast` view modifier displays a temporary notification message (toast) over the current view.
It is typically used to show short feedback messages such as “Saved successfully,” “Action completed,” or “Network error.”

You can show a simple text message or provide a fully custom view as the toast’s content.
You can also control its duration, position, background color, text color, corner radius, and shadow style.

---

## Type Definition

```ts
toast?: {
  duration?: number | null
  position?: "top" | "bottom" | "center"
  backgroundColor?: Color | null
  textColor?: Color | null
  cornerRadius?: number | null
  shadowRadius?: number | null
} & (
  | { message: string; content?: never }
  | { message?: never; content: VirtualNode }
) & ({
  isPresented: boolean
  onChanged: (isPresented: boolean) => void
} | {
  isPresented: Observable<boolean>
})
```

---

## Property Descriptions

### `isPresented: boolean` and `onChanged(isPresented: boolean): void`

**Description**:
Uses the `isPresented` and `onChanged` properties to control the visibility and behavior of the toast.

**Example**:

```tsx
const [showToast, setShowToast] = useState(false)

toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  message: "Saved successfully"
}}
```

---

### `isPresented: Observable<boolean>`

**Description**:
Uses the `isPresented` observable to control the visibility and behavior of the toast.

**Example**:

```tsx
const showToast = useObservable(false)

toast={{
  isPresented: showToast,
  message: "Saved successfully"
}}
```

---

### `duration?: number | null`

**Description**:
Specifies how long (in seconds) the toast should remain visible.
Defaults to `2` seconds.

**Example**:

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  duration: 3,
  message: "Action completed"
}}
```

---

### `position?: "top" | "bottom" | "center"`

**Description**:
Controls where the toast appears on the screen.

Available values:

* `"top"` – Displays the toast at the top.
* `"bottom"` – Displays the toast at the bottom (default).
* `"center"` – Displays the toast in the center.

**Example**:

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  position: "top",
  message: "New message received"
}}
```

---

### `backgroundColor?: Color | null`

**Description**:
Sets the background color of the toast.

**Example**:

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  backgroundColor: "blue",
  message: "Upload successful"
}}
```

---

### `textColor?: Color | null`

**Description**:
Sets the text color of the toast message.

**Example**:

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  textColor: "white",
  message: "Download failed"
}}
```

---

### `cornerRadius?: number | null`

**Description**:
Sets the corner radius of the toast.
Defaults to `16`.

**Example**:

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  cornerRadius: 8,
  message: "Item added"
}}
```

---

### `shadowRadius?: number | null`

**Description**:
Sets the blur radius of the toast’s shadow.
Defaults to `4`.

**Example**:

```tsx
toast={{
  isPresented: showToast,
  onChanged: setShowToast,
  shadowRadius: 6,
  message: "Success"
}}
```

---

## Displaying a Simple Message

**Example**:

```tsx
function View() {
  const [showToast, setShowToast] = useState(false)

  return (
    <List
      toast={{
        isPresented: showToast,
        onChanged: setShowToast,
        message: "Data saved successfully",
        duration: 2,
        position: "bottom",
        backgroundColor: "green",
        textColor: "white"
      }}
    >
      <Button
        title="Save"
        action={() => setShowToast(true)}
      />
    </List>
  )
}
```

When the button is pressed, a green toast with the message “Data saved successfully” appears at the bottom for 2 seconds.

---

## Displaying Custom Content

**Description**:
Instead of plain text, you can provide a custom `VirtualNode` (view) as the toast content.
This allows you to include icons, multiple text lines, or other view layouts.

**Example**:

```tsx
function View() {
  const [showToast, setShowToast] = useState(false)

  return (
    <List
      toast={{
        isPresented: showToast,
        onChanged: setShowToast,
        content: (
          <HStack spacing={8}>
            <Image systemName="checkmark.circle.fill" />
            <Text foregroundStyle="white">Upload Complete</Text>
          </HStack>
        ),
        backgroundColor: "black",
        cornerRadius: 12
      }}
    >
      <Button
        title="Show Toast"
        action={() => setShowToast(true)}
      />
    </List>
  )
}
```

This example shows a custom toast with an icon and message inside a black rounded background.

---

## Best Practices

1. **Keep state synchronized**
   Always ensure `isPresented` and `onChanged` stay in sync so the toast can be properly dismissed.

2. **Use for lightweight notifications**
   Toasts should only display short, transient messages and should not include complex interactions.

3. **Avoid multiple simultaneous toasts**
   Displaying more than one toast at the same time may confuse users.

4. **Combine with user actions**
   Pair the toast with `Button`, `Form`, or other components to provide quick feedback after an action.
