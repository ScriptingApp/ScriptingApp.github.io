This document provides a comprehensive explanation of **Glass Effect Transitions** in Scripting, including how Liquid Glass materials animate during view changes, how geometry matching works, and how to correctly use `NamespaceReader` to access SwiftUI’s `@Namespace` within TSX code.

Contents include:

- Overview of Liquid Glass transitions
- The three transition types
- Relationship among `glassEffectTransition`, `glassEffectID`, and `namespace`
- Role of `glassEffectUnion`
- Purpose and behavior of `GlassEffectContainer`
- Design and usage of `NamespaceReader`
- Detailed walkthrough of the provided example
- Best practice recommendations

***

# 1. Overview: What Is a Glass Effect Transition?

A **Glass Effect Transition** defines how a Liquid Glass material animates when:

- A view is inserted or removed
- Layout changes
- Views switch between two states

```ts
type GlassEffectTransition = 'identity' | 'materialize' | 'matchedGeometry'
```

These transitions affect **only the Liquid Glass material**—not the rest of the view’s opacity or scale.

A transition controls:

1. How the glass material appears or disappears
2. Whether the shape of the glass participates in animation
3. Whether the glass attempts to match geometry with other shapes

***

# 2. Transition Types

## 2.1 identity

```tsx
glassEffectTransition="identity"
```

Behavior:

- No animation or geometry change.
- The glass effect appears immediately with no fade or shape transformation.

Use cases:

- Disabling animations
- Static UI
- Debugging transitions

***

## 2.2 materialize

```tsx
glassEffectTransition="materialize"
```

Behavior:

- The material fades in or out smoothly.
- No attempt is made to match geometry with any other glass shape.
- Content transitions in a simple, clean way.

Use cases:

- Basic menu transitions
- Buttons appearing or disappearing
- When geometric continuity is not needed

***

## 2.3 matchedGeometry (most powerful)

```tsx
glassEffectTransition="matchedGeometry"
```

Behavior:

- The Liquid Glass shape morphs between views that share the same ID and namespace.
- Creates smooth, fluid transitions between corresponding glass shapes.
- Requires `glassEffectID` and `namespace`.

Use cases:

- Menu switching (e.g., Edit → Home)
- Toolbar reconfiguration
- Any UI element where continuity matters

***

# 3. glassEffectID and namespace

**The core of geometric matching**

Liquid Glass’ geometric-matching transitions require the ability to identify and relate specific glass shapes.

***

## 3.1 Why IDs Are Required

To animate a shape from state A → state B, the system must know:

- which old shape matches which new shape

The identity is provided by:

```tsx
glassEffectID={{
  id: 1,
  namespace
}}
```

Views with the same `id` in the same namespace are treated as the **same conceptual glass entity** across states.

***

## 3.2 Why a namespace Is Required

SwiftUI’s matchedGeometry system requires an `@Namespace` to define the animation scope.

Since TSX cannot define SwiftUI property wrappers, Scripting provides:

```tsx
<NamespaceReader>
  {namespace => (…)}
</NamespaceReader>
```

Inside the closure:

- `namespace` refers to a real SwiftUI `@Namespace`
- All `glassEffectID` and `glassEffectUnion` inside this closure must use this namespace

Benefits:

- Provides correct scope for geometry transitions
- Prevents accidental cross-scope animation
- Ensures matchedGeometry and unions behave predictably

Without a namespace, geometric matching does not work.

***

# 4. glassEffectUnion: Unifying Glass Regions

`glassEffectUnion` merges multiple views into a **single continuous glass material region**.

```tsx
glassEffectUnion={{
  id: 1,
  namespace
}}
```

Effects:

- Buttons appear to share a single underlying piece of glass
- Material may shift or reflow cohesively
- Enhances visual coherence in grouped UI elements

Typically paired with matchedGeometry transitions.

***

# 5. GlassEffectContainer

The container provides:

- A shared environment for geometry matching
- A rendering boundary for unioned glass
- Optimized rendering for clusters of Liquid Glass views

Example:

```tsx
<GlassEffectContainer>
  <HStack> ... </HStack>
</GlassEffectContainer>
```

Every view participating in glass transitions should be placed inside the same container.

***

# 6. NamespaceReader

**Exposing SwiftUI’s `@Namespace` to TSX**

## 6.1 Why NamespaceReader Exists

SwiftUI defines matchedGeometry transitions using:

```swift
@Namespace private var namespace
```

But TSX code cannot create Swift `@Namespace` values.
Therefore Scripting provides:

```tsx
<NamespaceReader>
  {namespace => (…)}
</NamespaceReader>
```

### Purpose:

- Internally creates and manages a real SwiftUI `@Namespace`
- Makes the namespace accessible to JavaScript/TypeScript
- Ensures all participating views share the same namespace
- Enables matchedGeometry transitions to work in TSX

## 6.2 How It Works

- NamespaceReader creates a SwiftUI view containing `@Namespace`.
- That namespace is passed to the TSX children via a function parameter.
- All `glassEffectID` and `glassEffectUnion` must use this namespace.
- All participating views inside the closure are guaranteed to match within the same namespace.

***

# 7. Example Analysis

Below is the provided example, demonstrating a dynamic menu switching between two states:

- Menu A: Home / Settings
- Menu B: Edit / Erase / Delete
- Using animation for transitions
- Using matchedGeometry via ID sharing
- Using union IDs for continuous material appearance

### Key excerpts:

```tsx
isAlternativeMenu.value
  ? <>
      <Button
        title="Home"
        glassEffectID={{id:1, namespace}}
        glassEffectUnion={{id:1,namespace}}
      />
      <Button
        title="Settings"
        glassEffectID={{id:2, namespace}}
        glassEffectUnion={{id:1,namespace}}
      />
    </>
  : <>
      <Button
        title="Edit"
        glassEffectID={{id:1, namespace}}
        glassEffectUnion={{id:1,namespace}}
      />
      <Button
        title="Erase"
        glassEffectID={{id:3, namespace}}
        glassEffectUnion={{id:1,namespace}}
        glassEffectTransition="materialize"
      />
      <Button
        title="Delete"
        glassEffectID={{id:2, namespace}}
        glassEffectUnion={{id:1,namespace}}
      />
    </>
```

### 1. Shared union (id = 1)

All buttons belong to the same glass union.
This produces a smooth, unified underlying glass region.

### 2. Shared glassEffectID for corresponding buttons

- `Home` and `Edit` share `id = 1`
- `Settings` and `Delete` share `id = 2`

→ They animate between each other using `matchedGeometry`.

### 3. “Erase” uses a different transition

```tsx
glassEffectTransition="materialize"
```

This button fades its material rather than matching geometry, making its appearance more distinct.

### 4. Animation is triggered explicitly

```tsx
withAnimation(() => {
  isAlternativeMenu.setValue(
    !isAlternativeMenu.value
  )
})
```

Glass transitions attach themselves to this animation transaction automatically.

***

# 8. Best Practices

### 1. Use a single GlassEffectContainer

All participating glass views must share one container.

### 2. Use one NamespaceReader per animated region

Do not create multiple namespaces unless intentionally separating animation scopes.

### 3. Use consistent glassEffectID between states

Both old and new states must contain the same ID to animate geometrically.

### 4. Use glassEffectUnion for cohesive material appearance

Especially in toolbars and menus.

### 5. Prefer matchedGeometry for sophisticated transitions

Use materialize only for elements needing simple appearance behavior.

***

# 9. Summary

Glass Effect Transitions enable highly expressive and fluid animations for Liquid Glass materials in iOS 26.
In Scripting:

- `glassEffectTransition` defines how the material animates
- `glassEffectID` and `namespace` enable geometric matching
- `glassEffectUnion` creates unified material regions
- `GlassEffectContainer` manages the animation environment
- `NamespaceReader` exposes SwiftUI’s `@Namespace` to TSX, making advanced animations possible
