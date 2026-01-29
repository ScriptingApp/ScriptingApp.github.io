# clipped

Clips the view to its rectangular bounds. You can specify whether to apply anti-aliasing for smooth edges.

## Type

```ts
clipped?: boolean
```

## Example

```tsx
<Text
  fixedSize
  frame={{
    width: 175,
    height: 100
  }}
  clipped={true}
  border={{
    style: "gray"
  }}
>This long text string is clipped</Text>
```
