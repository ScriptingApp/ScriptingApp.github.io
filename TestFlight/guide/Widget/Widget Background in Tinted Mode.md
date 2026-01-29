# Widget Background in Tinted Mode

The `widgetBackground` modifier is used to define background styles specifically for **widgets**, with behavior optimized for **iOS 18’s accented (tinted)** rendering mode.

## Purpose

In **accented mode**, iOS displays nearly all view colors—including backgrounds—as white, unless the view is explicitly marked with `widgetAccentable`. This can cause unintended visual issues in widgets.

The `widgetBackground` modifier addresses this by:

- **Automatically hiding the background** when the widget is displayed in accented mode.
- **Rendering the background normally** in all other display modes (default or full-color).

This ensures your widget layout remains visually consistent and unaffected by system-imposed tinting rules.

***

## Supported Background Variants

The `widgetBackground` modifier accepts several input formats:

### 1. **Solid Color (ShapeStyle)**

Apply a simple color to the background.

```tsx
<Text widgetBackground="systemBlue">
  Hello
</Text>
```

***

### 2. **Dynamic Color (DynamicShapeStyle)**

Apply different styles for light and dark modes.

```tsx
<Text
  widgetBackground={{
    light: "white",
    dark: "black"
  }}
>
  Mode-aware Background
</Text>
```

***

### 3. **Shape with Fill Style**

Use a **shape** along with a **fill style**. This form provides structured and stylized backgrounds.

```tsx
<Text
  widgetBackground={{
    style: "systemGray6",
    shape: {
      type: "rect",
      cornerRadius: 12,
      style: "continuous"
    }
  }}
>
  Rounded Background
</Text>
```

You may use any supported built-in or custom shape types, such as:

- `'rect'`, `'circle'`, `'capsule'`, `'ellipse'`, `'buttonBorder'`, `'containerRelative'`
- Custom rounded rectangles with `cornerRadius`, `cornerSize`, or `cornerRadii`

***

## Behavior in Accented Mode

- **In accented (tinted) mode**: The background is **automatically hidden** to prevent it from rendering as solid white.
- **In default and full-color modes**: The background displays as defined.

This conditional behavior ensures better design control and visual integrity across widget contexts.

***

## Best Practices

- Use `widgetBackground` only in **widget-specific views**.
- Do not use it for essential visual meaning, since the background may be hidden in accented mode.
- Combine it with `widgetAccentable` to precisely control which parts of the widget are subject to system tinting.
