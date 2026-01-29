---
title: matchedGeometryEffect
description: This view modifier establishes a geometric relationship between different views, allowing them to animate smoothly when transitioning across different layouts, different containers, different conditional render states, different size and position configurations.

---

`matchedGeometryEffect` establishes a **geometric relationship between different views**, allowing them to animate smoothly when transitioning across:

* Different layouts
* Different containers
* Different conditional render states
* Different size and position configurations

It corresponds to SwiftUI’s `matchedGeometryEffect` and is a **component-level geometry animation system**, independent of navigation.

---

## 1. API Definition

```ts
matchedGeometryEffect?: {
  id: string | number
  namespace: NamespaceID
  properties?: MatchedGeometryProperties
  anchor?: Point | KeywordPoint
  isSource?: boolean
}
```

```ts
type MatchedGeometryProperties = "frame" | "position" | "size"
```

---

## 2. Core Purpose

The core purpose of `matchedGeometryEffect` is:

> To make two views that represent the same logical element share geometry information across different layouts, producing a continuous animated transition instead of a visual jump.

This solves issues such as:

* Sudden jumps when a view moves between containers
* Abrupt size changes when expanding a card
* Layout discontinuity between list and detail views
* Teleport-like behavior of tab indicators

---

## 3. Parameter Details

### 3.1 `id` — Geometry Matching Identifier

```ts
id: string | number
```

* Identifies which views belong to the same geometry group.
* Only views with the **same `id` inside the same `namespace`** will match.
* Typically derived from:

  * Model identifiers
  * Index values
  * Stable business keys

Rules:

* The `id` must remain stable during animation.
* One `id` can have **only one `isSource = true` at any moment**.

---

### 3.2 `namespace` — Geometry Namespace

```ts
namespace: NamespaceID
```

* Defines the animation scope.
* Even if two views share the same `id`, they **will not animate** unless the `namespace` is also the same.
* Must be created and injected via `NamespaceReader`.

Rules:

* Source and target **must use the exact same namespace instance**.
* Cross-namespace matching is not allowed.

---

### 3.3 `properties` — Geometry Properties to Match

```ts
properties?: "frame" | "position" | "size"
```

Default:

```ts
properties = "frame"
```

Meaning:

| Value        | Description                      |
| ------------ | -------------------------------- |
| `"frame"`    | Matches both position and size   |
| `"position"` | Matches only the center position |
| `"size"`     | Matches only width and height    |

Guidelines:

* Use `"frame"` for natural transitions
* Use `"position"` for indicators and sliding highlights
* Use `"size"` for zooming and expansion effects

---

### 3.4 `anchor` — Animation Anchor Point

```ts
anchor?: Point | KeywordPoint
```

Default:

```ts
anchor = "center"
```

Controls how the geometry alignment is calculated during animation.

Common values:

* `"center"`
* `"topLeading"`
* `"topTrailing"`
* `"bottomLeading"`
* `"bottomTrailing"`

Usage examples:

* Expanding a card from the top-left
* Zooming an avatar from the top-right
* Sliding a panel upward from the bottom

---

### 3.5 `isSource` — Geometry Data Provider

```ts
isSource?: boolean
```

Default:

```ts
isSource = true
```

Meaning:

| Value   | Behavior                              |
| ------- | ------------------------------------- |
| `true`  | This view provides geometry data      |
| `false` | This view receives geometry animation |

Standard pattern:

* Original view → `isSource: true`
* Target view → `isSource: false`

If omitted:

* The first appearing view becomes the source by default.

---

## 4. Minimal Working Example (Position + Size Matching)

This example shows a circle moving and scaling smoothly between two containers.

```tsx
const expanded = useObservable(false)

<NamespaceReader>
  {namespace => (
    <VStack spacing={40}>
      <Button
        title="Toggle"
        onTapGesture={() => {
          expanded.setValue(!expanded.value)
        }}
      />

      <ZStack
        frame={{ width: 300, height: 200 }}
        background="systemGray6"
      >
        {!expanded.value && (
          <Circle
            fill="systemOrange"
            frame={{ width: 60, height: 60 }}
            matchedGeometryEffect={{
              id: "circle",
              namespace
            }}
          />
        )}
      </ZStack>

      <ZStack
        frame={{ width: 300, height: 300 }}
        background="systemGray4"
      >
        {expanded.value && (
          <Circle
            fill="systemOrange"
            frame={{ width: 150, height: 150 }}
            matchedGeometryEffect={{
              id: "circle",
              namespace,
              isSource: false
            }}
          />
        )}
      </ZStack>
    </VStack>
  )}
</NamespaceReader>
```

### Behavior

* The same logical circle:

  * Moves downward
  * Grows in size
  * Maintains continuous animation
* No visual teleportation occurs

---

## 5. Position-Only Matching (Tab Indicator)

```tsx
const selected = useObservable(0)

<NamespaceReader>
  {namespace => (
    <HStack spacing={24}>
      <Text
        onTapGesture={() => selected.setValue(0)}
        matchedGeometryEffect={{
          id: "indicator",
          namespace,
          properties: "position",
          isSource: selected.value === 0
        }}
      >
        Tab 1
      </Text>

      <Text
        onTapGesture={() => selected.setValue(1)}
        matchedGeometryEffect={{
          id: "indicator",
          namespace,
          properties: "position",
          isSource: selected.value === 1
        }}
      >
        Tab 2
      </Text>
    </HStack>
  )}
</NamespaceReader>
```

Used for:

* Tab selection indicators
* Sliding highlights
* Moving selection backgrounds

---

## 6. Size-Only Matching (Zoom Animation)

```tsx
const expanded = useObservable(false)

<NamespaceReader>
  {namespace => (
    <ZStack>
      <Circle
        fill="systemBlue"
        frame={{
          width: expanded.value ? 200 : 80,
          height: expanded.value ? 200 : 80
        }}
        matchedGeometryEffect={{
          id: "avatar",
          namespace,
          properties: "size"
        }}
        onTapGesture={() => {
          expanded.setValue(!expanded.value)
        }}
      />
    </ZStack>
  )}
</NamespaceReader>
```

Suitable for:

* Avatar zooming
* Card expansion
* Press feedback animations

---

## 7. Multi-Element Matching (Card → Detail View)

```tsx
const showDetail = useObservable(false)

<NamespaceReader>
  {namespace => (
    <ZStack>
      {!showDetail.value && (
        <VStack spacing={16}>
          <Image
            source="cover"
            matchedGeometryEffect={{
              id: "card.image",
              namespace
            }}
            onTapGesture={() => {
              showDetail.setValue(true)
            }}
          />

          <Text
            matchedGeometryEffect={{
              id: "card.title",
              namespace
            }}
          >
            Card Title
          </Text>
        </VStack>
      )}

      {showDetail.value && (
        <VStack spacing={24}>
          <Image
            source="cover"
            frame={{ width: 300, height: 200 }}
            matchedGeometryEffect={{
              id: "card.image",
              namespace,
              isSource: false
            }}
          />

          <Text
            font="largeTitle"
            matchedGeometryEffect={{
              id: "card.title",
              namespace,
              isSource: false
            }}
          >
            Card Title
          </Text>
        </VStack>
      )}
    </ZStack>
  )}
</NamespaceReader>
```

Effect:

* Image and title animate together
* Transition from compact card to expanded detail layout
* No navigation system required

---

## 8. Key Usage Rules

1. **`namespace` must be identical**
2. **`id` must be identical**
3. At any time:

   * One `id` → only one `isSource = true`
4. Default behavior:

   ```ts
   properties = "frame"
   anchor = "center"
   isSource = true
   ```
5. Source and target must switch within the same render cycle
6. If both views are marked as `isSource: true`, results are undefined
7. Live Activity and Widget environments do not fully support matched geometry animations

---

## 9. Suitable Use Cases

Recommended:

* Tab indicators
* Card-to-detail transitions
* Image zoom previews
* List selection animations
* Split-view selection synchronization

Not recommended:

* High-frequency updating lists
* Large grids with many simultaneous matches
* Real-time chart rendering
