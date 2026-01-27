---
title: padding

---

The `padding` property adds space around the content of a view, mirroring the behavior of SwiftUI’s `padding` modifier. It helps separate a view from surrounding elements and improve layout clarity.

## Definition

```ts
padding?: true | number | {
  horizontal?: number | true
  vertical?: number | true
  leading?: number | true
  trailing?: number | true
  top?: number | true
  bottom?: number | true
}
```

## Supported Formats

You can specify padding in multiple ways:

---

### 1. Default Padding

```ts
padding: true
```

Applies the system default padding on all sides.

#### Example:

```tsx
<Text padding={true}>
  Default Padding
</Text>
```

---

### 2. Uniform Padding

```ts
padding: 8
```

Applies the same number of points of padding to all edges.

#### Example:

```tsx
<VStack padding={12}>
  <Text>Even Padding</Text>
</VStack>
```

---

### 3. Directional Padding Object

Specify individual edges or edge groups.

```ts
padding: {
  horizontal: 16,
  vertical: 8
}
```

#### Supported Keys:

| Key          | Description                               |
| ------------ | ----------------------------------------- |
| `horizontal` | Padding for both `leading` and `trailing` |
| `vertical`   | Padding for both `top` and `bottom`       |
| `leading`    | Padding on the leading edge (LTR: left)   |
| `trailing`   | Padding on the trailing edge (LTR: right) |
| `top`        | Padding on the top                        |
| `bottom`     | Padding on the bottom                     |

Each value can be a number or `true`. When set to `true`, it applies the default system padding for that edge.

#### Example:

```tsx
<Text
  padding={{
    top: 10,
    bottom: 10,
    horizontal: 16
  }}
>
  Custom Edge Padding
</Text>
```

#### Example with `true` for specific edges:

```tsx
<Text
  padding={{
    top: true,
    horizontal: 12
  }}
>
  Mixed Padding
</Text>
```

---

## Notes

* Padding does **not** affect the size of the view’s content directly, but adjusts the space around it.
* Combining directional keys allows for precise control over layout spacing.
* `horizontal`/`vertical` and `leading`/`trailing` can be combined. The more specific key (like `leading`) overrides the group key (like `horizontal`) if both are provided.

