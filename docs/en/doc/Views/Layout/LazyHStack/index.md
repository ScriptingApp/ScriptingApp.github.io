---
title: LazyHStack

---
        
The `LazyHStack` component is part of the **Scripting** app's UI library. It arranges its children in a horizontal stack, creating and displaying items only as needed, which improves performance for large data sets.

## LazyHStack

## Type: `FunctionComponent<LazyHStackProps>`

A `LazyHStack` arranges its children in a line that grows horizontally. Unlike a regular horizontal stack, it loads and displays views lazily, creating them only when they are about to appear on the screen. This makes it ideal for scenarios involving large or dynamic data.

---

## LazyHStackProps

| Property       | Type                                                                                       | Default             | Description                                                                                                                                                     |
|----------------|--------------------------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alignment`    | `VerticalAlignment`                                                                        | `undefined`         | Determines how the children are aligned vertically within the stack. All child views share the same vertical screen coordinate.                                |
| `spacing`      | `number`                                                                                   | `undefined` (default spacing) | The space between adjacent subviews. If `undefined`, the stack uses a default spacing value.                                                                  |
| `pinnedViews`  | `'sectionHeaders'` \| `'sectionFooters'` \| `'sectionHeadersAndFooters'`                   | `undefined`         | Specifies which child views remain pinned to the bounds of the scroll view during scrolling.                                                                  |
| `children`     | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | `undefined`         | The content to be displayed in the stack. Accepts one or multiple `VirtualNode` elements, including arrays and optional `null` or `undefined` values.          |

---

## PinnedScrollViews

The `PinnedScrollViews` type defines which kinds of child views can remain pinned to the scroll view's bounds as it scrolls:

- `'sectionHeaders'`: Pins only the section headers.
- `'sectionFooters'`: Pins only the section footers.
- `'sectionHeadersAndFooters'`: Pins both section headers and footers.

---

## Example Usage

```tsx
import { LazyHStack, Text, ScrollView, Section } from 'scripting'

const Example = () => {
  return (
    <ScrollView
      axes="horizontal"
    >
      <LazyHStack
        alignment="center"
        spacing={10}
        pinnedViews="sectionHeaders"
      >
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
      </LazyHStack>
    </ScrollView>
  )
}
```

### Explanation:

- The stack arranges the `Section` views horizontally with `10` points of spacing.
- The `alignment` property centers the items vertically within the stack.
- The `pinnedViews` property ensures that section headers remain pinned to the top of the scroll view when scrolling.

---

## Notes

- Lazy loading improves performance by creating views only as they become visible.
- Use `spacing` to adjust the distance between items and `alignment` to control vertical positioning.
- The `pinnedViews` property is particularly useful for table-like layouts where headers or footers should remain visible during scrolling.

This API allows you to efficiently handle horizontally growing content while providing customization for layout and scrolling behavior.