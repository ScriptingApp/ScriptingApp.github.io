---
title: LazyVStack

---
        
The `LazyVStack` component is part of the **Scripting** app's UI library. It arranges its children in a vertical stack, creating and displaying items only as needed, optimizing performance for large data sets.

## LazyVStack

## Type: `FunctionComponent<LazyVStackProps>`

A `LazyVStack` arranges its children in a line that grows vertically. Unlike a regular vertical stack, it lazily loads and displays views only when they are about to appear on the screen. This makes it ideal for lists or large sets of dynamically generated content.

---

## LazyVStackProps

| Property       | Type                                                                                       | Default             | Description                                                                                                                                                     |
|----------------|--------------------------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alignment`    | `HorizontalAlignment`                                                                      | `undefined`         | Determines how the children are aligned horizontally within the stack. All child views share the same horizontal screen coordinate.                             |
| `spacing`      | `number`                                                                                   | `undefined` (default spacing) | The space between adjacent subviews. If `undefined`, the stack uses a default spacing value.                                                                  |
| `pinnedViews`  | `'sectionHeaders'` \| `'sectionFooters'` \| `'sectionHeadersAndFooters'`                   | `undefined`         | Specifies which child views remain pinned to the bounds of the scroll view during scrolling.                                                                  |
| `children`     | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | `undefined`         | The content to be displayed in the stack. Accepts one or multiple `VirtualNode` elements, including arrays and optional `null` or `undefined` values.          |

---

## PinnedScrollViews

The `PinnedScrollViews` type defines which kinds of child views can remain pinned to the scroll view's bounds as it scrolls:

- `'sectionHeaders'`: Pins only the section headers
- `'sectionFooters'`: Pins only the section footers
- `'sectionHeadersAndFooters'`: Pins both section headers and footers

---

## Example Usage

```tsx
import { LazyVStack, Text, ScrollView, Section } from 'scripting'

const Example = () => {
  return (
    <ScrollView>
      <LazyVStack alignment="leading" spacing={12} pinnedViews="sectionHeaders">
        {list.map(item => 
          <Section
            key={item.id}
            header={
              <Text>{item.title}</Text>
            }
          >
            <ItemView
              item={item}
            />
          </Section>
        )}
      </LazyVStack>
    </ScrollView>
  )
}
```

### Explanation:

- The stack arranges the `Section` views vertically with `12` points of spacing
- The `alignment` property aligns the items to the leading edge of the stack
- The `pinnedViews` property ensures that section headers remain pinned to the top of the scroll view when scrolling

---

## Notes

- Lazy loading ensures that views are only created as they become visible, which improves performance for large content
- Use `spacing` to control the vertical distance between items and `alignment` to customize the horizontal alignment
- The `pinnedViews` property is especially useful for table or list-like layouts with sticky headers or footers

This API allows you to efficiently manage vertically growing content while offering customization for layout and scrolling behavior.