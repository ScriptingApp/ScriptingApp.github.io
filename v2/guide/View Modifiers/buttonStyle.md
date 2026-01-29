# buttonStyle

The `buttonStyle` property allows you to customize the interaction behavior and appearance of buttons within a view hierarchy in your UI.

## Property Declaration

```tsx
buttonStyle?: ButtonStyle;
```

### Description

The `buttonStyle` property applies a specific style to all buttons within a view hierarchy, enabling you to customize their appearance and interaction behavior.

### Accepted Values

The `buttonStyle` property accepts the following string values:

- **`automatic`**: The default button style, adapting to the button’s context.
- **`bordered`**: Applies standard border artwork based on the button’s context.
- **`borderedProminent`**: Applies prominent border artwork for buttons.
- **`borderless`**: A style that doesn’t apply a border.
- **`plain`**: A style that avoids decoration while idle but may indicate the button's pressed, focused, or enabled state visually.

### Default Behavior

If `buttonStyle` is not specified, the default style (`automatic`) is applied based on the button’s context.

## Usage Example

Here’s how you can apply the `buttonStyle` property in your TypeScript code:

### Example: Bordered Button Style

```tsx
<Button
  title="Press Me"
  buttonStyle="bordered"
  action={() => console.log('Button pressed!')}
/>
```

This creates a button with a standard border.

### Example: Borderless Button Style

```tsx
<Button
  title="Press Me"
  buttonStyle="borderless"
  action={() => console.log('Button pressed!')}
/>
```

This creates a button without any border.

### Example: Plain Button Style

```tsx
<Button
  title="Press Me"
  buttonStyle="plain"
  action={() => console.log('Button pressed!')}
/>
```

This creates a button that does not decorate its content while idle but visually indicates interaction states.

## Notes

- The `buttonStyle` property directly maps to SwiftUI’s `buttonStyle` modifier.
- Ensure the string value matches one of the predefined styles listed above to avoid runtime errors.
