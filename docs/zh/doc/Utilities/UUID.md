---
title: UUID

---

`UUID` 模块提供了简便的方法来生成唯一的 UUID 字符串。

---

## 函数

### `string(): string`
生成一个新的 UUID（通用唯一标识符）字符串。

- **返回值**：  
  一个 UUID 格式的字符串，例如 `"550e8400-e29b-41d4-a716-446655440000"`。

---

## 使用示例

```tsx
const id = UUID.string()
console.log('生成的 UUID：', id)
```