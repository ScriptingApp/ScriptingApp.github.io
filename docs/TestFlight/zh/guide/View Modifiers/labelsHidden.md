---
title: 隐藏标签
description: 隐藏视图内控件的标签部分，但控件本身仍然显示。

---

隐藏视图内控件（如 `Picker`, `DatePicker`）的标签部分，但控件本身仍然显示。

## 类型

```ts
labelsHidden?: boolean
```

## 示例

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