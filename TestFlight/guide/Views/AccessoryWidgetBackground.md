# AccessoryWidgetBackground

An adaptive background view that provides a standard appearance based on the widget’s environment.

## Overview

The `AccessoryWidgetBackground` component is designed to be used inside accessory widgets—such as Lock Screen widgets or StandBy widgets—where it applies a system-defined background appropriate for the widget's context.

Using this view ensures that your widget maintains visual consistency with the surrounding system UI, adapting automatically to light and dark modes, transparency effects, and other environmental styling set by the system.

You typically use `AccessoryWidgetBackground` as a background layer in combination with other views, such as `ZStack`, to provide system-adaptive styling while layering custom content above it.

## Example

```tsx
import { AccessoryWidgetBackground, Text, ZStack } from "scripting"

function AccessoryView() {
  return (
    <ZStack>
      <AccessoryWidgetBackground />
      <Text font="caption">Weather</Text>
    </ZStack>
  )
}
```

In this example, `AccessoryWidgetBackground` provides the adaptive system background, and the `Text` element is rendered on top of it. This layout is useful for Lock Screen widgets where consistent and legible appearance is important.

## Best Practices

- Always place `AccessoryWidgetBackground` beneath your content using a stacking layout like `ZStack`.
- Do not apply custom colors or effects directly to `AccessoryWidgetBackground`; it automatically adapts to system appearance.
- Combine it with other SwiftUI-inspired components to maintain a consistent style with iOS system widgets.

## Compatibility

This component is intended for use in accessory widgets and may not have any visual effect outside that context. Use it to ensure your widget blends seamlessly with the native iOS design system.
