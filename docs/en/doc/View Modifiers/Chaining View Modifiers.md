---
title: Chaining View Modifiers

---

The `modifiers` property allows you to apply multiple view modifiers to a view using a fluent, chainable syntax. This API is a flexible and expressive alternative to the traditional single `modifier` attribute on a view in TSX, which only supports one layer of modification.

With `modifiers`, you can apply the same modifier multiple times (e.g., nested paddings or backgrounds), control modifier order explicitly, and build view style stacks that are closer in spirit to SwiftUI.

---

## Type

```ts
declare function modifiers(): ViewModifiers;

declare class ViewModifiers {
  // Example methods:
  padding(value): this;
  background(value): this;
  opacity(value): this;
  frame(value): this;
  font(value): this;
  // ... and many more (same as `CommonViewProps`)
}
```

> The `ViewModifiers` class contains chainable methods for nearly all standard SwiftUI view modifiers, including layout, styling, interaction, and animation. Each method returns `this`, enabling fluent chaining.

---

## Benefits

* **Supports multiple instances** of the same modifier (e.g., multiple `.padding()` or `.background()` layers).
* **Preserves modifier order**, ensuring layout and appearance behave as expected.
* **Increased modularity**, making it easier to abstract and reuse modifier chains.
* **SwiftUI-like syntax**, aligning more closely with native SwiftUI best practices.

---

## Usage Examples

### Example 1: Layered background and padding

```tsx
<VStack
  modifiers={
    modifiers()
      .padding()
      .background("red")
      .padding()
      .background("blue")
  }
>
  <Text>Hello</Text>
</VStack>
```

This will produce a layout similar to:

```swift
Text("Hello")
  .padding()
  .background(Color.red)
  .padding()
  .background(Color.blue)
```

### Example 2: Reusable modifier chain

```ts
const myModifiers = modifiers()
  .padding(12)
  .background("gray")
  .cornerRadius(8)
  .opacity(0.9)

<List modifiers={myModifiers}>
  <Text>Item 1</Text>
</List>
```

### Example 3: Composing modifiers dynamically

```ts
const base = modifiers().padding()

if (isDarkMode) {
  base.background("black")
} else {
  base.background("white")
}

return <HStack modifiers={base}>...</HStack>
```

---

## When to Use

Use `modifiers` when:

* You need multiple layers of the same modifier (e.g., multiple paddings or backgrounds).
* You want to cleanly separate style logic into reusable chains.
* You prefer an imperative, fluent way to express modifier order.
* You are dynamically building view styles based on runtime conditions.

---

## Full Modifier List

`ViewModifiers` exposes methods for over 200 modifiers, covering:

* **Layout**: `padding`, `frame`, `offset`, `position`, `zIndex`, etc.
* **Styling**: `background`, `foregroundStyle`, `opacity`, `shadow`, `clipShape`, etc.
* **Text and Font**: `font`, `bold`, `italic`, `underline`, `kerning`, etc.
* **Interactions**: `onTapGesture`, `onAppear`, `onDisappear`, `contextMenu`, etc.
* **Scroll and Navigation**: `scrollDisabled`, `navigationTitle`, `sheet`, `popover`, etc.
* **Charts**: `chartXAxis`, `chartYAxisLabel`, `chartSymbolScale`, etc.
* **Widget-specific**: `widgetURL`, `widgetBackground`, etc.

> See the full type definition for all supported modifier methods.

---

## Notes

* Modifiers are applied in the **exact order** they are chained.
* Each call to `modifiers()` returns a fresh instance. If you call it multiple times, they do **not** merge.
* `modifiers` is preferred for complex chains.

---

This feature enhances expressiveness and power when building UI with TSX, offering a richer and more modular view configuration approach.
