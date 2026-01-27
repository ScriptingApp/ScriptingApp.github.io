---
title: contentTransition

---

The `contentTransition` modifier specifies a transition animation to apply when the **content within a single view changes**. Unlike view-level transitions (such as `.transition(.move)`), `contentTransition` animates **changes in content** rather than the insertion or removal of the view itself.

This is particularly useful when updating the contents of views like `Text`, `Image`, or symbol-based `Image(systemName: ...)`, providing smooth visual feedback on state or data changes.

---

## Type

```ts
contentTransition?: ContentTransition
```

---

## Supported `ContentTransition` Values

| Value | Description |
| ----- | ----------- |

### `"identity"`

* No animation is applied to the content change.
* The view updates instantly with no visual transition.

```tsx
<Text contentTransition="identity">{value}</Text>
```

---

### `"interpolate"`

* The view attempts to interpolate between the old and new content where appropriate.
* Best used with animatable types such as `Color`, `Shape`, or `View` interpolations.

```tsx
<Rectangle fill={color} contentTransition="interpolate" />
```

---

### `"opacity"`

* Applies a fade effect: old content fades out while new content fades in.
* Works well with general-purpose views.

```tsx
<Text contentTransition="opacity">{message}</Text>
```

---

### `"numericText"`

* Specialized transition for `Text` views displaying numbers.
* Animates character changes in a way that emphasizes numerical progression.

```tsx
<Text contentTransition="numericText">{score}</Text>
```

---

### `"numericTextCountsUp"`

* Similar to `"numericText"`, but optimized for numeric **increments**.
* Intended for counter-like transitions.

```tsx
<Text contentTransition="numericTextCountsUp">{level}</Text>
```

---

### `"numericTextCountsDown"`

* Optimized for numeric **decrements**.
* Useful for countdowns or decreasing counters.

```tsx
<Text contentTransition="numericTextCountsDown">{remainingTime}</Text>
```

---

### `"symbolEffect"`

* Applies a default symbol animation when a **symbol image** changes.
* Only affects symbol-based images (`Image(systemName: ...)`) and has no effect on other views.

```tsx
<Image
  systemName={isOn ? "lightbulb.fill" : "lightbulb"}
  contentTransition="symbolEffect"
/>
```

---

### `"symbolEffectAutomatic"`

* Uses platform-adaptive symbol animation depending on context.
* Typically provides fade, scale, or morphing effects between symbols.

```tsx
<Image
  systemName={icon}
  contentTransition="symbolEffectAutomatic"
/>
```

---

### `"symbolEffectReplace"`

* Replaces the layers of one symbol image with another.
* Provides a more visually fluid symbol swap than abrupt replacement.

```tsx
<Image
  systemName={currentSymbol}
  contentTransition="symbolEffectReplace"
/>
```

---

### `"symbolEffectAppear"` / `"symbolEffectDisappear"`

* Explicit transitions for symbol insertion and removal, respectively.
* These may be combined with visibility-based state changes.

```tsx
{isShown
  ? <Image
    systemName="checkmark"
    contentTransition="symbolEffectAppear"
  />
  : null}
```

---

### `"symbolEffectScale"`

* Scales the symbol up or down during the content change.
* Works well for symbol emphasis or status feedback.

```tsx
<Image
  systemName={statusIcon}
  contentTransition="symbolEffectScale"
/>
```

---

## Summary

| Transition              | Best Used For                                |
| ----------------------- | -------------------------------------------- |
| `identity`              | No animation at all                          |
| `interpolate`           | Animatable content (e.g. color, shape)       |
| `opacity`               | General-purpose fade-in/fade-out transitions |
| `numericText`           | Text views displaying numbers                |
| `numericTextCountsUp`   | Animated numeric increases                   |
| `numericTextCountsDown` | Animated numeric decreases                   |
| `symbolEffect`          | Transition between two SF Symbols            |
| `symbolEffectAutomatic` | Platform-determined symbol transitions       |
| `symbolEffectReplace`   | Replacing symbol layers smoothly             |
| `symbolEffectAppear`    | Animate symbol appearing                     |
| `symbolEffectDisappear` | Animate symbol disappearing                  |
| `symbolEffectScale`     | Scaling effect on symbol changes             |

---

This modifier is ideal for providing subtle, performant feedback in data-driven UI updates while maintaining view identity and layout stability. It is particularly effective in dashboards, counters, toggles, icon transitions, and numerically dynamic interfaces.
