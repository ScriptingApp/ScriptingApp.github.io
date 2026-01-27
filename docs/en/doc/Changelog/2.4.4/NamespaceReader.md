---
title: NamespaceReader

---

`NamespaceReader` is used to **create and manage a geometry animation namespace (Namespace)**.
This namespace is the **foundational requirement** for enabling:

* `matchedGeometryEffect` (component-level geometry animation)
* `matchedTransitionSource` (page-level navigation transition)
* `navigationTransition` (such as zoom transitions)

You can think of `NamespaceReader` as:

> A “geometry animation coordinate provider” that defines which views belong to the **same animation scope**.

---

## 1. Role of NamespaceReader

`NamespaceReader` is **not a visual UI component**. It is a **namespace generator** whose responsibilities are:

* Creating a brand-new `NamespaceID`
* Exposing that namespace via a render function
* Defining the **boundary of a geometry animation group**

In Scripting, this corresponds conceptually to SwiftUI’s:

* `@Namespace`
* `Namespace.ID`

---

## 2. Basic Usage Pattern

### 2.1 Minimal Structure

```tsx
<NamespaceReader>
  {namespace => (
    // All views inside this scope
    // can use this namespace for matched geometry animations
  )}
</NamespaceReader>
```

Explanation:

* `NamespaceReader` accepts a **function as its child**
* This function receives a single argument: `namespace`
* The returned `namespace` is the unique animation scope for all child views

---

## 3. The True Purpose of a Namespace

### 3.1 What a Namespace Really Does

The real purpose of a `namespace` is to:

* Declare a group of views as **eligible for shared geometry animation**
* Explicitly define **which views are allowed to match each other**

Without using the same `namespace`:

* Even if two views have the **same `id`**
* **No geometry animation will ever happen**

---

### 3.2 Isolation Provided by Namespaces

| Condition                              | Geometry Matching Occurs |
| -------------------------------------- | ------------------------ |
| Same `id` + Same `namespace`           | Yes                      |
| Same `id` + Different `namespace`      | No                       |
| Different `id` + Same `namespace`      | No                       |
| Different `id` + Different `namespace` | No                       |

Conclusion:

> **Both `id` and `namespace` must match exactly for geometry animation to be established.**

---

## 4. Relationship with the Geometry Animation System

### 4.1 Relationship with matchedGeometryEffect

* `matchedGeometryEffect` relies on `namespace` to establish cross-view geometry mapping
* `NamespaceReader` is a **mandatory prerequisite** for `matchedGeometryEffect`
* Without `NamespaceReader`:

  * `matchedGeometryEffect` cannot function

---

### 4.2 Relationship with matchedTransitionSource

* Page-level navigation transitions also depend on `namespace` to pair:

  * The source view
  * The destination page
* `NamespaceReader` is used to:

  * Create the namespace on the source page
  * Pass the same namespace into the destination page

---

## 5. Basic NamespaceReader Example (Component-Level)

```tsx
const expanded = useObservable(false)

<NamespaceReader>
  {namespace => (
    <VStack>
      {!expanded.value && (
        <Circle
          matchedGeometryEffect={{
            id: "shape",
            namespace
          }}
          onTapGesture={() => {
            expanded.setValue(true)
          }}
        />
      )}

      {expanded.value && (
        <Circle
          frame={{ width: 200, height: 200 }}
          matchedGeometryEffect={{
            id: "shape",
            namespace,
            isSource: false
          }}
        />
      )}
    </VStack>
  )}
</NamespaceReader>
```

In this example:

* `NamespaceReader` provides the animation coordinate system
* Both `Circle` views share:

  * The same `id`
  * The same `namespace`
* Therefore, they are geometrically linked

---

## 6. Typical NamespaceReader Structure in Navigation Transitions

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
        matchedTransitionSource={{
          id: "cover",
          namespace
        }}
      />
    </NavigationLink>
  )}
</NamespaceReader>
```

This structure demonstrates:

* `namespace` is created by `NamespaceReader`
* The same `namespace` is used by:

  * The source view
  * The destination page
* This enables full page-level shared-geometry transitions

---

## 7. Namespace Lifecycle and Scope

### 7.1 Lifecycle

* Every time `NamespaceReader` is created:

  * A **new namespace instance** is generated
* The namespace:

  * Exists only within the current component tree
  * Is destroyed automatically when the component is unmounted

---

### 7.2 Scope

* A namespace is valid **only inside the render function of its `NamespaceReader`**
* It is **not shared automatically across component hierarchies**
* If cross-component sharing is required:

  * The namespace must be passed explicitly via props

---

## 8. Common Errors and Debugging Tips

### 8.1 Geometry Animations Do Not Trigger

Check the following:

* Is `NamespaceReader` actually present?
* Is the `namespace` correctly received and passed?
* Are both source and target using **the exact same namespace instance**?

---

### 8.2 Animations Are Unstable or Occasionally Fail

Common cause:

* `NamespaceReader` is being conditionally rendered and destroyed repeatedly
* Each destruction/recreation produces a **new namespace**
* The old and new views are no longer in the same animation coordinate system

Recommendation:

* Place `NamespaceReader` in a **stable parent node**
* Avoid wrapping it in `if` or ternary conditions

---

### 8.3 Nested NamespaceReader Causing Unexpected Behavior

Symptoms:

* `id` appears to be correct
* But geometry matching still fails

Likely cause:

* Source and target views are actually using **different NamespaceReader instances**
* Even though their `id` values are the same

---

## 9. Design Guidelines

1. Use **one NamespaceReader per independent animation region**
2. Do not create a separate NamespaceReader for every individual view
3. For page-level transitions:

   * Place `NamespaceReader` near the page root
4. For component-level animations:

   * Place `NamespaceReader` around the logical animation group
5. Inside the same namespace:

   * Do not reuse the same `id` for unrelated views

---

## 10. Recommended Use Cases

Appropriate scenarios for using `NamespaceReader`:

* Card → Detail shared-element transitions
* Tab indicator geometry animation
* Image zoom previews
* List item → Detail content transitions
* Spatially continuous multi-view animations

Scenarios where `NamespaceReader` is **not required**:

* Simple opacity or scale animations
* Single-view internal transitions
* Animations that do not involve cross-view geometry matching
