---
title: labelsHidden
description: Hides the labels of controls contained within the view.

---

Hides the labels of controls (e.g. `Picker`, `DatePicker`) contained within the view. The controls remain visible and functional.

## Type

```ts
labelsHidden?: boolean
```

## Example

```tsx
<Picker
  title="Picker"
  labelsHidden={true}
  value={value}
  onChanged={onChanged}
>
  <Text tag={0}>Option 1</Text>
  <Text tag={1}>Option 2</Text>
</Picker>
```