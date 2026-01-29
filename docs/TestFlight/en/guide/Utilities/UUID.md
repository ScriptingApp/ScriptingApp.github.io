---
title: UUID
description: The interface provides an easy way to generate unique UUID strings.

---

The `UUID` module provides an easy way to generate unique UUID strings.

---

## Functions

### `string(): string`
Generates a new UUID (Universally Unique Identifier) in string format.

- **Returns**:  
  A UUID string (e.g., `"550e8400-e29b-41d4-a716-446655440000"`).

---

## Usage Example

```tsx
const id = UUID.string()
console.log('Generated UUID:', id)
```