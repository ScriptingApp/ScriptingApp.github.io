---
title: onDrag and onDrop View Modifiers
description: These APIs enable views to act as drag sources, drop destinations, or both, supporting intra-app and cross-app drag-and-drop scenarios.

---

Scripting provides a Drag & Drop API closely aligned with the SwiftUI drag-and-drop interaction model. It enables views to act as drag sources, drop destinations, or both, supporting intra-app and cross-app drag-and-drop scenarios.

The API is composed of three core parts:

* **onDrag**: Declares a view as a drag source
* **onDrop**: Declares a view as a drop destination
* **DropInfo / ItemProvider / UTType**: Context objects describing drag content and state

Drag and drop is a system-controlled interaction. Certain APIs are only valid during specific callbacks. These constraints are explicitly documented below and must be respected.

---

## Core Types

### DropInfo

`DropInfo` represents the real-time state of a drag operation relative to a specific drop target view.
It is only valid within `onDrop` callbacks.

### Properties

#### location: Point

* The current drag location
* Expressed in the **local coordinate space of the drop view**
* Commonly used for:

  * Insertion indicators
  * Reordering logic
  * Position-based highlighting

### Methods

#### hasItemsConforming(types: UTType[]): boolean

* Indicates whether at least one dragged item conforms to any of the specified UTTypes
* Commonly used in:

  * `validateDrop`
  * `dropEntered`
  * `dropUpdated`
* This method performs capability checks only and does not load data

#### itemProviders(types: UTType[]): ItemProvider[]

* Returns all `ItemProvider` instances conforming to the specified UTTypes
* **Only valid inside the `performDrop` callback**
* After `performDrop` returns, access to the dragged data is revoked by the system

> Critical constraint
> You must **start loading the contents** of the returned `ItemProvider` instances **within the scope of `performDrop`**.
> Loading may complete later, but it must be initiated synchronously before `performDrop` returns.

---

## DropOperation

`DropOperation` describes the action a drop target intends to perform.

Available values:

* `"copy"`
  Copies the dragged data (default and most common)

* `"move"`
  Moves the data instead of copying it (typically internal to the app)

* `"cancel"`
  Cancels the drag operation and transfers no data

* `"forbidden"`
  Explicitly disallows the drop at the current location

`DropOperation` is usually returned from `dropUpdated` to dynamically control the drag behavior.

---

## DragDropProps

`DragDropProps` defines the optional drag-and-drop capabilities that a view may adopt.

---

## onDrag

### Purpose

Marks the view as a **drag source**, allowing the user to initiate a drag operation from it.

### Definition

```ts
onDrag?: {
  data: () => ItemProvider
  preview: VirtualNode
}
```

### Parameters

#### data

```ts
data: () => ItemProvider
```

* Returns an `ItemProvider` describing the dragged data
* Supports text, images, files, URLs, and custom types
* Invoked each time a drag begins

Recommended practice:
Create a new `ItemProvider` instance for each drag operation. Do not reuse instances.

#### preview

```ts
preview: VirtualNode
```

* A view used as the drag preview
* Rendered by the system as a floating representation during dragging
* Centered over the source view by default

---

## onDrop

### Purpose

Marks the view as a **drop destination** and provides fine-grained control over validation, interaction updates, and data handling.

### Definition

```ts
onDrop?: {
  types: UTType[]
  validateDrop?: (info: DropInfo) => boolean
  dropEntered?: (info: DropInfo) => void
  dropUpdated?: (info: DropInfo) => DropOperation | null
  dropExited?: (info: DropInfo) => void
  performDrop: (info: DropInfo) => boolean
}
```

---

### onDrop.types

```ts
types: UTType[]
```

* Declares the content types this view can accept
* If the dragged content does not conform to any listed type:

  * The drop target does not activate
  * `validateDrop` is not called
  * Visual feedback is not shown

---

### validateDrop

```ts
validateDrop?: (info: DropInfo) => boolean
```

* Determines whether the drop operation should be allowed to begin
* Returning `false` immediately rejects the drag
* Common use cases:

  * Checking item count
  * Enforcing application state constraints

Default behavior: always returns `true`

---

### dropEntered

```ts
dropEntered?: (info: DropInfo) => void
```

* Called when the drag enters the drop target area
* Typically used to:

  * Show highlight states
  * Display insertion placeholders
  * Trigger animations

---

### dropUpdated

```ts
dropUpdated?: (info: DropInfo) => DropOperation | null
```

* Called repeatedly as the drag moves within the drop target
* Used to dynamically specify the intended `DropOperation`

Return value behavior:

* Returning a `DropOperation` updates the active operation
* Returning `null`:

  * Reuses the last valid operation
  * Falls back to `"copy"` if none was previously returned

---

### dropExited

```ts
dropExited?: (info: DropInfo) => void
```

* Called when the drag leaves the drop target area
* Commonly used to clear highlight or placeholder UI

---

### performDrop

```ts
performDrop: (info: DropInfo) => boolean
```

* **The most critical callback**
* Indicates that the user has released the drag and data access is permitted
* Return value:

  * `true` if the drop was successfully handled
  * `false` if the drop failed

#### Mandatory constraints

* Within this method, you must:

  * Call `info.itemProviders(...)`
  * Immediately initiate data loading from the returned providers
* You must not:

  * Store `ItemProvider` references for later use
  * Defer loading to unrelated callbacks

These constraints are enforced by the operating system for security reasons.

---

## Typical Interaction Flow

1. The user initiates a drag from an `onDrag` view
2. The system checks compatibility using `onDrop.types`
3. `validateDrop` is invoked
4. The drag enters the drop target → `dropEntered`
5. The drag moves within the target → repeated `dropUpdated`
6. The drag leaves the target → `dropExited`
7. The user releases the drag → `performDrop`
8. Data is loaded and processed

---

## Design Guidelines and Best Practices

* Declare UTTypes as narrowly as possible
* Use `"forbidden"` in `dropUpdated` to explicitly block invalid drops
* Perform heavy parsing or processing only after `ItemProvider` loading completes
* Prefer system-standard UTTypes (text, image, file, URL) for cross-app drag-and-drop
