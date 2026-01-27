---
title: contentShape

---

The `contentShape` property defines the **interactive or visual boundary shape** of a view's content. This shape can influence how a view behaves during interactions such as tapping, dragging, accessibility focus, hover effects, and previews. It is commonly used to fine-tune the **hit-testing area** or provide a custom **visual outline** for advanced interaction features.

This is especially useful for views like `Button`, `ListRow`, or custom views where the tappable or interactive area should differ from the visual content.

---

## Definition

```ts
contentShape?: Shape | {
  kind: ContentShapeKinds
  shape: Shape
}
```

## Supported Formats

### 1. Simple Shape

You can specify a standalone `Shape` to define the default content shape for all purposes.

```tsx
contentShape="circle"
```

This applies to all interactions (tap, accessibility, drag, etc.) unless overridden.

---

### 2. Typed Shape by Purpose

You can define a content shape with a specific **interaction kind**, using the following structure:

```ts
{
  kind: ContentShapeKinds
  shape: Shape
}
```

This lets you control the content shape behavior in specific contexts (e.g., drag previews or accessibility hit-testing).

---

## Supported `ContentShapeKinds`

| Kind                   | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| `"interaction"`        | Defines the hit-testing area (taps, clicks, gestures)                      |
| `"dragPreview"`        | Used for shaping drag-and-drop previews                                    |
| `"contextMenuPreview"` | Used when displaying a context menu preview                                |
| `"hoverEffect"`        | Defines the area for hover interactions (e.g., when using pointer devices) |
| `"accessibility"`      | Defines the shape used for accessibility focus, highlighting, and ordering |

---

## Examples

### Default shape for all interactions

```tsx
<Button
  title="Click Me"
  contentShape="capsule"
  action={() => {

  }}
/>
```

### Custom shape for accessibility only

```tsx
<Button
  title="Accessible Button"
  action={() => {

  }}
  contentShape={{
    kind: "accessibility",
    shape: {
      type: "rect",
      cornerRadius: 12
    }
  }}
/>
```

### Custom interaction area using an ellipse

```tsx
<Text
  contentShape={{
    kind: "interaction",
    shape: "ellipse"
  }}
>
  Custom Tap Area
</Text>
```

---

## Notes

* `contentShape` does not alter how the view **looks**, only how it **responds** to interactions or previews.
* When using custom shapes, ensure the shape aligns appropriately with the view’s layout frame.
* For symbol-based views (e.g., buttons with icons), defining a `contentShape` can make tap targets more accessible.
