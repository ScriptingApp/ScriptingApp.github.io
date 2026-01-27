---
title: Redaction View Modifiers
---

## Redaction View Modifiers

The Scripting app supports view modifiers for applying redaction to a view hierarchy. Redaction allows views to display placeholder, obscured, or invalidated content, commonly used to indicate loading states, protect sensitive data, or mark content as outdated.

These modifiers closely follow SwiftUI's `redacted(reason:)` and `unredacted()` API behavior.

---

## `redacted`

```ts
redacted?: RedactedReason | null
```

Applies a redaction reason to the view hierarchy, changing the visual appearance of content according to the specified context.

### Description

Redaction visually alters the view and its descendants to reflect the current content state without modifying the underlying data. Use this modifier to display placeholders, hide private data, or indicate invalid content.

### Enum: `RedactedReason`

```ts
type RedactedReason = "placeholder" | "invalidated" | "privacy";
```

- **`placeholder`**: Displays generic placeholder visuals, typically used during loading.
- **`invalidated`**: Indicates the content is stale or awaiting a refresh.
- **`privacy`**: Obscures content to protect private or sensitive information.

### Example

```tsx
<Text redacted={"placeholder"}>Loading text...</Text>
```

In this example, the text will be displayed as a placeholder until real data is available.

---

## `unredacted`

```ts
unredacted?: boolean
```

Removes any previously applied redaction from the view hierarchy.

### Description

Set this property to `true` to opt a view out of inherited redaction, restoring its original appearance even when an ancestor view is redacted.

### Example

```tsx
<VStack redacted={"placeholder"}>
  <Text>Loading...</Text>
  <Text unredacted={true}>This content is not redacted</Text>
</VStack>
```

In this example, the entire `VStack` is redacted, but the second `Text` view will render normally due to `unredacted: true`.

---

## Usage Notes

- Redaction is purely visual and does not alter layout or accessibility semantics.
- `unredacted` is effective only when applied to a view that inherits redaction from an ancestor.
- Setting `redacted` to `null` removes any redaction from the current view.
