# Liquid Glass Effect

Scripting provides full support for the new **Liquid Glass** visual system introduced in iOS 26. This includes `glassEffect`, `GlassEffectContainer`, `UIGlass`, and related geometry-matching and transition APIs. These APIs allow scripts to create rich translucent materials, fluid glass shapes, matched geometry animations, and unioned glass regions directly within TSX.

This document explains how the Liquid Glass APIs are used in Scripting, including:

- Concepts and fundamentals
- How to apply glass effects
- UIGlass configuration
- Geometry transitions
- glassEffect identifiers and unions
- GlassEffectContainer behavior
- Practical examples and best practices

***

# 1. Overview of Liquid Glass

Liquid Glass is a new material and animation system in iOS 26. Compared to earlier blur or material effects, Liquid Glass provides:

- Fluid, dynamic shapes that follow view geometry
- Tintable and interactive glass materials
- Geometry-matched transitions
- Grouped “glass unions” to merge multiple regions
- High-performance rendering inside containers

***

# 2. The `glassEffect` Modifier

Any view that adopts `GlassProps` can apply a Liquid Glass effect using the `glassEffect` property.

### Definition

```ts
type GlassProps = {
  glassEffect?: boolean | UIGlass | Shape | {
    glass: UIGlass
    shape: Shape
  }

  glassEffectTransition?: GlassEffectTransition

  glassEffectID?: {
    id: string | number
    namespace: NamespaceID
  }

  glassEffectUnion?: {
    id: string | number
    namespace: NamespaceID
  }
}
```

***

## 2.1 Ways to Use `glassEffect`

### **1. Enable default Liquid Glass material**

```tsx
<Text glassEffect>Foo</Text>
```

Equivalent to `UIGlass.regular()`.

***

### **2. Apply a specific UIGlass instance**

```tsx
<Text glassEffect={UIGlass.regular().interactive(false)}>
  Foo
</Text>
```

You can chain configuration calls such as `interactive()` and `tint()`.

***

### **3. Provide a specific Shape**

```tsx
<Text
  glassEffect={{
    glass: UIGlass.regular(),
    shape: { type: 'rect', cornerRadius: 10 }
  }}
>
  Foo
</Text>
```

Or directly provide a Shape object:

```tsx
<Text glassEffect={{ type: 'rect', cornerRadius: 10 }}>
  Foo
</Text>
```

The glass material will be clipped to the shape’s geometry.

***

### **4. Boolean shorthand**

```tsx
<View glassEffect />
```

Acts the same as default Liquid Glass material.

***

# 3. The `UIGlass` Class

`UIGlass` represents the Liquid Glass material configuration.

### Static factories

| Method               | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `UIGlass.clear()`    | Fully clear variant, used for overlay or blending composition. |
| `UIGlass.regular()`  | Standard Liquid Glass material.                                |
| `UIGlass.identity()` | Identity material that leaves content visually unchanged.      |

### Instance configuration

```ts
interactive(value?: boolean): UIGlass
tint(color: Color): UIGlass
```

Example:

```tsx
glassEffect={UIGlass.regular().interactive().tint("red")}
```

***

# 4. Glass Effect Transitions

```ts
type GlassEffectTransition = 'identity' | 'materialize' | 'matchedGeometry'
```

### Transition Types

| Transition          | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `'identity'`        | No change or animation applied.                                             |
| `'materialize'`     | Fades in content and animates the glass material without geometry matching. |
| `'matchedGeometry'` | Matches the geometry of other glass shapes during transitions.              |

### Usage

```tsx
<Text
  glassEffect
  glassEffectTransition="materialize"
>
  Foo
</Text>
```

`matchedGeometry` works best with **glassEffectID** or **glassEffectUnion**.

***

# 5. glassEffectID and glassEffectUnion

Liquid Glass can identify or group glass effects to create smooth geometry animations or unified material regions.

***

## 5.1 glassEffectID

Assigns a unique identity to a glass effect for matched geometry animations.

```tsx
<Text
  glassEffect
  glassEffectID={{ id: "avatar", namespace }}
>
  Foo
</Text>
```

Views with the same `id + namespace` can participate in matched geometry transitions.

***

## 5.2 glassEffectUnion

Groups multiple glass effects into a single unioned glass region.

```tsx
<Text
  glassEffect
  glassEffectUnion={{ id: 1, namespace }}
/>
```

This merges material rendering across multiple views.

***

# 6. GlassEffectContainer

`GlassEffectContainer` is used to group and manage correlated glass effects. Views inside the container:

- Participate in matched geometry
- Support glass unions
- Render glass transitions more efficiently

### Example

```tsx
<GlassEffectContainer>
  <HStack spacing={40}>
    <Image systemName="1.circle" glassEffect />
    <Image systemName="2.circle" glassEffect />
  </HStack>
</GlassEffectContainer>
```

No configuration is required; the container acts as a shared environment.

***

# 7. Glass Button Styles

Scripting supports additional iOS 26 button styles:

- `"glass"`
- `"glassProminent"`

### Examples

```tsx
<Button title="Glass" buttonStyle="glass" />

<Button title="Glass Prominent" buttonStyle="glassProminent" />

<Button
  title="Glass & Tint"
  buttonStyle="glass"
  tint="red"
/>
```

These styles use Liquid Glass materials and integrate with tint and interaction behaviors.

***

# 8. Practical Example

Below is a real example combining multiple features:

- Glass buttons
- GlassEffectContainer
- UIGlass configurations
- Shape-based glass
- Offset effects

```tsx
<GlassEffectContainer>
  <HStack spacing={40}>
    <Image
      systemName="1.circle"
      frame={{ width: 80, height: 80 }}
      font={36}
      glassEffect
      offset={{ x: 30, y: 0 }}
    />
    <Image
      systemName="2.circle"
      frame={{ width: 80, height: 80 }}
      font={36}
      glassEffect
      offset={{ x: -30, y: 0 }}
    />
  </HStack>
</GlassEffectContainer>
```

***

# 9. Best Practices

### 1. Place related glass views inside a single GlassEffectContainer

Improves performance and produces more consistent transitions.

### 2. Provide glassEffectID for matched geometry animations

Without IDs, transitions cannot interpolate shapes.

### 3. Use glassEffectUnion to merge nearby glass regions

Creates a seamless material surface.

### 4. Avoid deeply nested glass hierarchies

Prefer using a container with ZStack for organization.

### 5. Use UIGlass.identity when structure must remain but material disabled

Useful for conditionally enabling glass without changing layout.
