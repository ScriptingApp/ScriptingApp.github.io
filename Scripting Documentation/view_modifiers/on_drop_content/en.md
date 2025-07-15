The `onDropContent` view modifier allows a view in your script to act as a drop target, accepting files, images, or text dragged in from other apps. This makes it easy to build interactive interfaces that respond to drag-and-drop gestures for your script.

---

## Overview

Use `onDropContent` to:

* Accept content (e.g., images or files) dragged into your view.
* Restrict accepted data types using **Uniform Type Identifiers (UTIs)**.
* Track when the drag cursor enters or exits the drop area.
* Handle the dropped content through a callback.

---

## Modifier Definition

```ts
onDropContent?: {
  types: UTType[]
  isTarget: {
    value: boolean
    onChanged: (value: boolean) => void
  }
  onResult: (result: {
    texts: string[]
    images: UIImage[]
    fileURLs: string[]
  }) => void
}
```

### Parameters

| Property   | Type                                                      | Description                                                                                                                                                                                                                     |
| ---------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `types`    | `UTType[]`                                                | A list of Uniform Type Identifiers (e.g., `"public.image"`, `"public.text"`) that specifies which content types this view can accept. If the dragged content does not match these types, the view does not respond to the drop. |
| `isTarget` | `{ value: boolean; onChanged: (value: boolean) => void }` | A binding object that reflects whether the drag operation is currently hovering over the view. Use this to update UI appearance (e.g., highlight the drop area).                                                                |
| `onResult` | `(result) => void`                                        | A callback that provides the dropped content when a valid drop occurs. The result includes text, images, and file URLs if available.                                                                                            |

---

## Result Object Structure

```ts
{
  texts: string[]
  images: UIImage[]
  fileURLs: string[]
}
```

* **`texts`** – Plain text strings extracted from the drop.
* **`images`** – Dropped images as `UIImage` instances.
* **`fileURLs`** – Local file paths of dropped files.

---

## Example

```tsx
const [isTarget, setIsTarget] = useState(false)

return <VStack
  onDropContent={{
    types: ["public.image"],
    isTarget: {
      value: isTarget,
      onChanged: setIsTarget
    },
    onResult: (result) => {
      console.log(`Received ${result.images.length} image(s)`)
    }
  }}
>
  <Text>
    {isTarget ? "Drop here!" : "Drag an image into this area."}
  </Text>
</VStack>
```

In this example:

* The `VStack` accepts dropped images (`"public.image"`).
* The UI updates when the cursor hovers over the drop area.
* When an image is dropped, the count is logged.
