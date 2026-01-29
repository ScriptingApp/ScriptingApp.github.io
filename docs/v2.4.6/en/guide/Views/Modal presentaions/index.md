---
title: Modal presentaions
description: Present content in a separate view that offers focused interaction.

---
        
The Scripting app supports SwiftUI-style modal view presentations through declarative properties applied to UI components. These include support for `sheet`, `popover`, `fullScreenCover`, `alert`, and `confirmationDialog`. Each of these is defined using structured configuration objects that allow you to present views based on application state.

---

## Alert

Displays an alert with a title, optional message, and one or more actions when the specified condition is true.

```ts
alert?: {
  title: string
  isPresented: boolean
  onChanged: (isPresented: boolean) => void
  actions: VirtualNode
  message?: VirtualNode
}
```

### Properties

* **`title`**: A string used as the title of the alert.
* **`isPresented`**: A boolean value that controls the visibility of the alert.
* **`onChanged`**: A callback function invoked when the `isPresented` value changes. You must update this value to `false` when dismissing the alert.
* **`actions`**: A `VirtualNode` representing the alert’s actions.
* **`message`** (optional): A `VirtualNode` that describes the alert’s message content.

---

## Confirmation Dialog

Displays a confirmation dialog with a title, optional message, and a set of actions. The dialog is shown when the `isPresented` condition is true.

```ts
confirmationDialog?: {
  title: string
  titleVisibility?: Visibility
  isPresented: boolean
  onChanged: (isPresented: boolean) => void
  actions: VirtualNode
  message?: VirtualNode
}
```

### Properties

* **`title`**: The title text for the dialog.
* **`titleVisibility`** (optional): Determines the visibility of the title. Defaults to `"automatic"`.
* **`isPresented`**: Controls whether the dialog is currently visible.
* **`onChanged`**: A callback that updates the `isPresented` state when the dialog is dismissed.
* **`actions`**: A `VirtualNode` representing the dialog’s action buttons.
* **`message`** (optional): A `VirtualNode` providing a descriptive message.

```ts
type Visibility = "automatic" | "hidden" | "visible"
```

---

## Sheet

Presents a modal sheet from the bottom of the screen when the `isPresented` condition is true. Multiple sheets can be registered using an array of presentation objects.

```ts
sheet?: ModalPresentation | ModalPresentation[]
```

---

## Full Screen Cover

Presents a modal view that covers the entire screen. Multiple views can be registered using an array of presentation objects.

```ts
fullScreenCover?: ModalPresentation | ModalPresentation[]
```

---

## Popover

Presents a popover when the `isPresented` condition is true. Popovers can be configured with arrow direction and adaptation strategies.

```ts
popover?: PopoverPresentation | PopoverPresentation[]
```

### PopoverPresentation

```ts
type PopoverPresentation = ModalPresentation & {
  arrowEdge?: Edge
  presentationCompactAdaptation?: PresentationAdaptation | {
    horizontal: PresentationAdaptation
    vertical: PresentationAdaptation
  }
}
```

#### Properties

* **`arrowEdge`** (optional): Defines the edge of the anchor that the popover arrow points to. Defaults to `"top"`.
* **`presentationCompactAdaptation`** (optional): Specifies how the presentation adapts in compact size classes.

```ts
type Edge = "top" | "bottom" | "leading" | "trailing"
```

---

## ModalPresentation

Defines a common interface used by `sheet`, `popover`, and `fullScreenCover`.

```ts
type ModalPresentation = {
  isPresented: boolean
  onChanged: (isPresented: boolean) => void
  content: VirtualNode
}
```

### Properties

* **`isPresented`**: A boolean value indicating whether the modal is shown.
* **`onChanged`**: A callback that updates the `isPresented` state when the modal is dismissed.
* **`content`**: A `VirtualNode` representing the modal view content.

---

## PresentationAdaptation

Specifies the strategy used when adapting modal presentations to different size classes.

```ts
type PresentationAdaptation =
  | "automatic"
  | "fullScreenCover"
  | "none"
  | "popover"
  | "sheet"
```

* **`automatic`**: Uses the system default adaptation.
* **`fullScreenCover`**: Prefers a full-screen cover style.
* **`popover`**: Prefers a popover style.
* **`sheet`**: Prefers a sheet style.
* **`none`**: Disables adaptation if possible.

---

## Example Usage

### Presenting a Sheet

```tsx
<Button
  title={"Present"}
  action={() => setIsPresented(true)}
  sheet={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    content: <VStack>
      <Text>Sheet content</Text>
      <Button title={"Dismiss"} action={() => setIsPresented(false)} />
    </VStack>
  }}
/>
```

### Presenting a Popover

```tsx
<Button
  title={"Show Popover"}
  action={() => setIsPresented(true)}
  popover={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    presentationCompactAdaptation: "popover",
    content: <Text>Popover content</Text>,
    arrowEdge: "top",
  }}
/>
```

### Presenting a Full Screen Cover

```tsx
<Button
  title={"Present"}
  action={() => setIsPresented(true)}
  fullScreenCover={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    content: <VStack>
      <Text>A full-screen modal view.</Text>
    </VStack>
  }}
/>
```

### Configuring Sheet Height

```tsx
sheet={{
  isPresented: isPresented,
  onChanged: setIsPresented,
  content: <VStack
    presentationDetents={[200, "medium", "large"]}
    presentationDragIndicator={"visible"}
  >
    <Text>Resizable sheet</Text>
  </VStack>
}}
```

### Presenting an Alert

```tsx
<Button
  title={"Present"}
  action={() => setIsPresented(true)}
  alert={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    title: "Alert",
    message: <Text>Everything is OK</Text>,
    actions: <Button title={"OK"} action={() => {}} />
  }}
/>
```

### Presenting a Confirmation Dialog

```tsx
<Button
  title={"Present"}
  action={() => setIsPresented(true)}
  confirmationDialog={{
    isPresented,
    onChanged: setIsPresented,
    title: "Do you want to delete this image?",
    actions: <Button title={"Delete"} role={"destructive"} action={() => {}} />
  }}
/>
```
