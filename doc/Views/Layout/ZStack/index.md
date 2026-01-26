# ZStack

The `ZStack` component in the Scripting app allows you to arrange subviews on top of each other in a layered stack. It provides flexibility in aligning the layers along both the x- and y-axes using predefined alignment guides.

***

## `ZStackProps`

The `ZStack` component accepts the following props:

| Property    | Type                                                                                          | Default Value | Description                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------- |
| `alignment` | `Alignment` (optional)                                                                        | `"center"`    | Determines how the subviews are aligned along the x- and y-axes.                              |
| `children`  | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | `undefined`   | The child components to be displayed in the stack. Can be a single node or an array of nodes. |

***

## `Alignment`

The `Alignment` type defines a set of common alignments for stacking views. These alignments combine horizontal and vertical guides. The diagram below illustrates these alignments:

![Alignment](https://docs-assets.developer.apple.com/published/09693fd98ab76356519a900fd33d9e7f/Alignment-1-iOS@2x.png)

### Supported Values:

| Value                         | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| `"top"`                       | Aligns views at the top edge of the stack.                          |
| `"center"`                    | Centers views along both horizontal and vertical axes.              |
| `"bottom"`                    | Aligns views at the bottom edge of the stack.                       |
| `"leading"`                   | Aligns views at the leading edge (left in left-to-right layouts).   |
| `"trailing"`                  | Aligns views at the trailing edge (right in left-to-right layouts). |
| `"bottomLeading"`             | Aligns views at the bottom-left corner.                             |
| `"bottomTrailing"`            | Aligns views at the bottom-right corner.                            |
| `"centerFirstTextBaseline"`   | Aligns views at the center using the first text baseline.           |
| `"centerLastTextBaseline"`    | Aligns views at the center using the last text baseline.            |
| `"leadingFirstTextBaseline"`  | Aligns views at the leading edge using the first text baseline.     |
| `"leadingLastTextBaseline"`   | Aligns views at the leading edge using the last text baseline.      |
| `"topLeading"`                | Aligns views at the top-left corner.                                |
| `"topTrailing"`               | Aligns views at the top-right corner.                               |
| `"trailingFirstTextBaseline"` | Aligns views at the trailing edge using the first text baseline.    |
| `"trailingLastTextBaseline"`  | Aligns views at the trailing edge using the last text baseline.     |

***

## `ZStack` Component

The `ZStack` is a function component that arranges its children in a layered stack. Each child is placed relative to the alignment defined in the `alignment` property.

### Importing the Component

To use the `ZStack` component, ensure you import it from the Scripting app's `scripting` package:

```tsx
import { ZStack } from 'scripting'
```

***

## Example Usage

### 1. Basic Example

Align child views at the top:

```tsx
<ZStack alignment="top">
  <Image systemName="globe" />
  <Text>
    Hello world.
  </Text>
</ZStack>
```

### 2. Advanced Alignments

Use complex alignments such as `bottomLeading` to position child elements:

```tsx
<ZStack alignment="bottomLeading">
  <Rectangle fill="gray" />
  <Text>
    Bottom Leading Text
  </Text>
</ZStack>
```

### 3. Nested `ZStack` Example

Combine `ZStack` with other layout components for complex arrangements:

```tsx
<ZStack alignment="center">
  <Rectangle fill="blue" />
  <ZStack alignment="topTrailing">
    <Image systemName="star" />
    <Text>
      Nested ZStack
    </Text>
  </ZStack>
</ZStack>
```

***

## Notes

- **Performance Considerations**: Avoid adding too many child views to the `ZStack` to prevent potential performance bottlenecks in complex layouts.
- **Composable Layouts**: Use `ZStack` alongside other components like `VStack` and `HStack` for flexible and dynamic UIs.
