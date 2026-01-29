---
title: layoutPriority
description: This view modifier specifies a layout priority for a view.

---

`layoutPriority` determines how much priority a view has when its parent layout allocates space among multiple child views, especially when space is constrained.

When multiple child views compete for space within a layout, those with a higher layout priority will be allocated more space, while those with a lower priority may be compressed or truncated.

## Parameter

* `layoutPriority` *(optional)*
  A number that defines the layout priority of the view.
  Higher values indicate higher priority. The default is `0`. Decimal values are supported.

## Usage Example

Suppose you want to create a horizontal stack of text views and ensure that a title is prioritized over a subtitle when space is limited:

```tsx
<HStack>
  <Text layoutPriority={1}>Title</Text>
  <Text>Subtitle (can be compressed)</Text>
</HStack>
```

In this example, the `"Title"` text has a higher layout priority, so it will be allocated space first. If space runs out, the `"Subtitle"` will be truncated or compressed before the title.

## Notes

* `layoutPriority` only has an effect when the parent layout needs to resolve space conflicts among its children.
* If all child views have the same priority, space is distributed evenly.
* Useful in layout containers like `HStack`, `VStack`, and `ZStack` where views might compete for limited space.

---

The `layoutPriority` modifier is a powerful tool for controlling how views behave in constrained layouts. By adjusting priority values, you can create more adaptive and user-friendly interfaces.
