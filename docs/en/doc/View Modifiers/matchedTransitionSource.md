---
title: matchedTransitionSource

---

`matchedTransitionSource` marks a view as the **geometric source of a navigation transition**. It allows a view to act as the starting point of a page-level transition animation, such as a **zoom (Hero-style) transition**.

This API corresponds to SwiftUI’s `matchedTransitionSource` and is intended **only for navigation transitions**, not for component-level layout animations.

Typical use cases include:

* Image → Image detail zoom
* Card → Detail page Hero animation
* Avatar → Profile page transition

---

## 1. API Definition

```ts
/**
 * Identifies this view as the source of a navigation transition, such as a zoom transition.
 * @available iOS 18.0+
 */
matchedTransitionSource?: {
  id: string | number
  namespace: NamespaceID
}
```

---

## 2. Core Purpose

The core purpose of `matchedTransitionSource` is:

> To define **which exact view** should be used as the **starting geometry** of a navigation transition.

It solves the following problems:

* Eliminates the visual disconnect between a tapped view and the destination page
* Prevents “disappear → new page appears” jump cuts
* Enables spatial continuity between the source element and the destination layout

With this API, the system can:

* Read the source view’s real on-screen frame
* Compute the destination page’s final layout frame
* Animate smoothly between the two

---

## 3. Parameter Details

### 3.1 `id` — Transition Source Identifier

```ts
id: string | number
```

Meaning:

* Uniquely identifies **which view is the transition source**
* Must **exactly match** the destination page’s `navigationTransition.sourceID`

Rules:

* Within the same `namespace`, `id` must be unique
* Per navigation transition:

  * Only **one** `matchedTransitionSource` may match the `sourceID`

---

### 3.2 `namespace` — Transition Namespace

```ts
namespace: NamespaceID
```

Meaning:

* Defines the **transition animation scope**
* Created and injected by `NamespaceReader`

Rules:

1. The source view and the destination page **must use the exact same namespace**
2. Different namespaces will **never** produce a matched transition
3. Even if `id` is the same, a different namespace disables the animation

---

## 4. How matchedTransitionSource Works

A successful navigation zoom transition requires **all four conditions** to be satisfied:

1. A view defines `matchedTransitionSource`
2. The destination page defines `navigationTransition`
3. `navigationTransition.sourceID === matchedTransitionSource.id`
4. Both sides use the **same `namespace`**

Only when all conditions are met will the system:

* Capture the source view’s:

  * Frame
  * Position
  * Scale
* Capture the destination layout’s final frame
* Compute:

  * Translation path
  * Scale ratio
* Perform the full transition animation

---

## 5. Minimal Working Example: Image → Detail Zoom

```tsx
<NamespaceReader>
  {namespace => (
    <NavigationLink
      destination={
        <DetailPage
          navigationTransition={{
            type: "zoom",
            namespace,
            sourceID: "cover"
          }}
        />
      }
    >
      <Image
        source="cover"
        frame={{
          width: 120,
          height: 160
        }}
        matchedTransitionSource={{
          id: "cover",
          namespace
        }}
      />
    </NavigationLink>
  )}
</NamespaceReader>
```

### Resulting Behavior

1. The user taps the image
2. Navigation begins
3. The destination page does not appear instantly
4. Instead, it **zooms smoothly from the tapped image’s position and size**

---

## 6. Card → Detail Hero Transition Example

```tsx
<NamespaceReader>
  {namespace => (
    <NavigationLink
      destination={
        <DetailPage
          navigationTransition={{
            type: "zoom",
            namespace,
            sourceID: "card-1"
          }}
        />
      }
    >
      <VStack
        frame={{
          width: 280,
          height: 180
        }}
        background="systemGray6"
        matchedTransitionSource={{
          id: "card-1",
          namespace
        }}
      >
        <Text>Card Title</Text>
      </VStack>
    </NavigationLink>
  )}
</NamespaceReader>
```

Effect:

* The entire card becomes the transition origin
* The detail page expands naturally from that card
* Produces a classic Hero-style animation

---

## 7. Difference Between matchedTransitionSource and matchedGeometryEffect

| Aspect                      | matchedTransitionSource | matchedGeometryEffect  |
| --------------------------- | ----------------------- | ---------------------- |
| Scope                       | Page-level navigation   | Component-level layout |
| Requires Navigation         | Yes                     | No                     |
| Multiple elements supported | No                      | Yes                    |
| Needs `sourceID`            | Yes                     | No                     |
| Geometry property control   | No                      | Yes                    |
| Internal layout animation   | No                      | Yes                    |

Summary:

* `matchedTransitionSource`: controls **where a page transition starts**
* `matchedGeometryEffect`: controls **how layout changes animate inside views**

---

## 8. Common Issues and Debug Checklist

### 8.1 Transition Does Not Trigger

Check:

* Does `sourceID` exactly match `matchedTransitionSource.id`?
* Are both using the same `namespace` instance?
* Is the navigation actually triggered via `NavigationLink`?

---

### 8.2 Wrong Direction or Scaling Artifacts

Common causes:

* The source view uses:

  * `scaleEffect`
  * `offset`
  * `rotation`
* Or is wrapped by:

  * `clipShape`
  * `mask`
  * `containerShape`

These affect how the system reads the real geometry frame.

---

### 8.3 Multiple Sources with the Same ID

Incorrect:

* Multiple views share the same `id`
* All define `matchedTransitionSource`

Result:

* The system cannot determine the true source
* The transition becomes undefined or fails

---

## 9. Platform and Environment Limitations

1. `matchedTransitionSource` works only with:

   * Navigation-based transitions
2. It is **not supported or is limited** in:

   * Widgets
   * Live Activities
3. It should not be used for:

   * Tab switching
   * Collapsing/expanding menus
   * Component state animations

Use `matchedGeometryEffect` for those cases.

---

## 10. Recommended Use Cases

Highly suitable:

* Image → full-screen preview
* Article cover → reading page
* Product card → product detail
* Avatar → profile page
* Large card → immersive detail view

Not suitable:

* High-frequency UI state changes
* Dense grid transitions
* Real-time updating interfaces
