---
title: preferredColorScheme

---

Sets the preferred system appearance (light or dark) for the view hierarchy. Only affects non-transient system overlays.

## Type

```ts
preferredColorScheme?: "light" | "dark"
```

## Example

```tsx
<NavigationStack>
  <List preferredColorScheme="dark">
    <Text>Dark mode view</Text>
  </List>
</NavigationStack>
```
