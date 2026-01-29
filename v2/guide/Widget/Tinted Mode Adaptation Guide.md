# Tinted Mode Adaptation Guide

iOS 18 introduces a new widget rendering mode called **accented mode**, which tints the widget’s content using system-defined accent colors. To support this behavior in your widgets, the **Scripting** app provides three view modifiers:

- `widgetAccentable`
- `widgetAccentedRenderingMode`
- `widgetBackground`

These modifiers allow you to control which parts of your widget participate in the system’s accenting logic, enabling more expressive and adaptable designs.

***

## `widgetAccentable`

### Description

Marks a view and all of its subviews as part of the **accented group**. When a widget is displayed in **accented rendering mode**, the system applies a distinct tint color to the accented group and another to the default group. The colors are applied as if views were template images — the system ignores any explicit color and only uses the view’s alpha channel.

This modifier helps create layered visual effects, especially useful in tinted widgets where you want to differentiate between elements.

### Usage

```tsx
<VStack>
  <Text
    widgetAccentable
    font="caption"
  >
    MON
  </Text>
  <Text font="title">
    6
  </Text>
</VStack>
```

In the above example:

- The first `Text` is added to the **accented group**, and will be tinted with the accent color.
- The second `Text` belongs to the **default group**, and will be tinted with the default (typically lighter) color.

***

## `widgetAccentedRenderingMode` (for `Image` components)

### Description

Defines how an `Image` should be rendered when displayed in **accented widget mode**. This modifier allows you to fine-tune how image content responds to system tinting.

### Available Modes

- `'accented'`: Renders the image as part of the **accented group**, using the accent color.
- `'accentedDesaturated'`: Converts the image’s luminance to alpha and applies the accent color.
- `'desaturated'`: Converts the image’s luminance to alpha and applies the default group color.
- `'fullColor'`: Preserves the image’s original colors with no tinting — available only on iOS.

### Usage

```tsx
<Image
  filePath="/path/to/image.png"
  widgetAccentedRenderingMode="fullColor"
/>
```

This ensures the image will retain its full color and not be affected by system tints — useful for branding elements or complex images where tinting would degrade clarity.

***

## `widgetBackground`

### Description

The `widgetBackground` modifier allows you to define background colors or shapes in a way that automatically adapts to **accented mode**. When the widget is displayed in accented mode, the background is **automatically hidden** to avoid being forced into a white or unintended rendering by the system.

This modifier is especially important because iOS 18 **ignores background colors** in accented mode, unless transparency (`alpha`) is used. With `widgetBackground`, you can safely define decorative backgrounds without worrying about white overlays.

### Supported Formats

You can use the following formats:

#### Solid Color

```tsx
<Text widgetBackground="systemGray5">
  Hello
</Text>
```

#### Dynamic Light/Dark Color

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

#### Shape with Style

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
  Shaped Background
</Text>
```

### Notes

- Background is hidden in **accented mode**.
- Background is fully rendered in **default or full-color modes**.
- Works seamlessly with `widgetAccentable` and layering effects.

***

## Behavior Notes (iOS 18+ Specific)

- In **tinted mode**, **all colors (including background colors)** are ignored unless alpha is less than `1`. This means setting a solid background color will be rendered as white if not made semi-transparent.
- Use `alpha` values to introduce visual hierarchy. For example, a fully opaque accentable element (`alpha = 1`) will be strongly tinted, while one with `alpha = 0.3` will appear more subtle.
- **Do not rely on color values** directly for styling in accented widgets — use tint layering via the accent group instead.
- **Use `widgetBackground`** instead of `background` when defining decorative backgrounds, to ensure proper behavior under accenting.

***

## Example

```tsx
<VStack
  widgetBackground={{
    style: "systemGray6",
    shape: {
      type: "rect",
      cornerRadius: 12
    }
  }}
  spacing={4}
>
  <Image
    filePath="/path/to/icons/calendar.png"
    widgetAccentedRenderingMode="accentedDesaturated"
  />
  <Text widgetAccentable font="caption">
    MON
  </Text>
  <Text font="title">
    6
  </Text>
</VStack>
```

This layout:

- Applies a rounded background that is visible only in non-accented modes.
- Places the icon and weekday label in the **accented group**.
- Leaves the date number in the **default group**.
- Maintains consistent visual separation, even with iOS's tinting behavior.

***

## Tips

- Use `widgetAccentable` to group multiple views into the accent layer — don’t apply it to the entire widget unless necessary.
- For icons or logos, consider using `widgetAccentedRenderingMode="fullColor"` if the image must retain its original branding.
- Use `widgetBackground` in place of `background` to ensure backgrounds disappear cleanly in accented mode.
- Use semi-transparent fills (`alpha < 1`) for layered effects that survive tint flattening.

***

This setup ensures your widgets are fully optimized for iOS 18’s dynamic accenting system, while retaining control over visual composition and user experience.
