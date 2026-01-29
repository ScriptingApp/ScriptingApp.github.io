---
title: contentMargins
description: This view modifier configures custom margins around a view’s content.

---

The `contentMargins` modifier configures custom margins around a view’s content. This allows precise control over layout spacing, particularly in scrollable containers such as `ScrollView`, `List`, or `Form`. You can apply margins uniformly or selectively to certain edges and placement contexts.

---

## Type

```ts
contentMargins?: 
  | number
  | EdgeInsets
  | {
      edges?: EdgeSet
      insets: number | EdgeInsets
      placement?: ContentMarginPlacement
    }
```

---

## Parameters

## `insets` (required)

Defines the margin values to apply. You can provide:

* A single number (applied to all specified edges)
* An `EdgeInsets` object for per-edge customization

### Example – uniform insets:

```tsx
<ScrollView
  contentMargins={20}
>
  <Text>Applies 20 points of margin on all sides</Text>
</ScrollView>
```

### Example – edge-specific insets:

```tsx
<ScrollView
  contentMargins={{
    top: 10,
    bottom: 30,
    leading: 16,
    trailing: 16
  }}
>
  <Text>Custom edge insets</Text>
</ScrollView>
```

---

## `edges` (optional)

Defines which edges the insets should apply to. If omitted, all edges are used.

### Type

```ts
type EdgeSet = "top" | "bottom" | "leading" | "trailing" | "vertical" | "horizontal" | "all"
```

### Example – apply to top and bottom only:

```tsx
<ScrollView
  contentMargins={{
    edges: "vertical",
    insets: 12
  }}
>
  <Text>Vertical-only margins</Text>
</ScrollView>
```

---

## `placement` (optional)

Specifies **where** in the layout the margins should be applied. This is especially relevant in scrollable views that have both scrollable content and indicators.

### Type

```ts
type ContentMarginPlacement = "automatic" | "scrollContent" | "scrollIndicators"
```

### Options

| Value                | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| `"automatic"`        | System chooses appropriate placement (default)                |
| `"scrollContent"`    | Margins apply to the main scrollable content only             |
| `"scrollIndicators"` | Margins apply only to scroll indicators (e.g. scrollbar area) |

### Example – margin applied only to scrollable content:

```tsx
<ScrollView
  contentMargins={{
    insets: 24,
    placement: "scrollContent"
  }}
>
  <Text>Scroll content margins only</Text>
</ScrollView>
```

---

## Full Configuration Example

```tsx
<ScrollView
  contentMargins={{
    edges: "horizontal",
    insets: { leading: 20, trailing: 20, top: 0, bottom: 0 },
    placement: "scrollContent"
  }}
>
  <VStack spacing={10}>
    <Text>Margin is applied only to horizontal scroll content area</Text>
  </VStack>
</ScrollView>
```

---

## Summary

| Property    | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `insets`    | Required. Margin values to apply. Can be a number or `EdgeInsets`.                                |
| `edges`     | Optional. Specifies which edges to apply the margins to. Default is `all`.                        |
| `placement` | Optional. Defines where the margins apply (scroll content or indicators). Default is `automatic`. |
