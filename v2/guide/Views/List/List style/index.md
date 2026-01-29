# List style

The `listStyle` property allows you to customize the behavior and appearance of a list in your UI when using the `List` view.

## Property Declaration

```tsx
listStyle?: ListStyle;
```

### Description

The `listStyle` property defines the visual style of a list, allowing you to choose from various predefined list styles.

### Accepted Values

The `listStyle` property accepts the following string values:

- **`automatic`**: Uses the platform’s default behavior and appearance for a list.
- **`bordered`**: Displays a list with standard borders.
- **`carousel`**: Applies a carousel-like appearance to the list.
- **`elliptical`**: Gives the list an elliptical style.
- **`grouped`**: Displays the list in a grouped format.
- **`inset`**: Applies an inset appearance to the list.
- **`insetGroup`**: Combines inset and grouped styles for the list.
- **`plain`**: Displays the list in a plain style without additional decorations.
- **`sidebar`**: Renders the list in a sidebar-like appearance.

### Default Behavior

If `listStyle` is not specified, the default style is determined by the platform.

## Usage Example

Here’s how you can apply the `listStyle` property in your TypeScript code:

### Example: Plain List Style

```tsx
<List
  listStyle="plain"
>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</List>
```

This creates a list with a plain style.

### Example: Grouped List Style

```tsx
<List
  listStyle="grouped"
>
  <Section header={
    <Text>Fruits</Text>
  }>
    <Text>Apple</Text>
    <Text>Banana</Text>
  </Section>
  <Section header={
    <Text>Vegetables</Text>
  }>
    <Text>Carrot</Text>
    <Text>Broccoli</Text>
  </Section>
</List>
```

This creates a grouped list with sections.

### Example: Sidebar List Style

```tsx
<List
  listStyle="sidebar"
>
  <Text>Home</Text>
  <Text>Settings</Text>
  <Text>Profile</Text>
</List>
```

This creates a sidebar-style list.

## Notes

- The `listStyle` property directly maps to SwiftUI’s `listStyle` modifier.
- Make sure to match the string value with one of the predefined styles listed above to avoid runtime errors.
