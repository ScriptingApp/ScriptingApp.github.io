---
title: MD5
---
The `MD5` module provides functions to hash strings using the MD5 algorithm.  
It supports both hexadecimal and Base64 encodings.

---

## Functions

### `hex(str: string): string`
Creates an MD5 hash of the input string and returns it as a **hexadecimal** string.

- **Parameters**:
  - `str`: The input string to hash.

- **Returns**:  
  The MD5 hash encoded as a hexadecimal string.

---

### `base64(str: string): string`
Creates an MD5 hash of the input string and returns it as a **Base64** string.

- **Parameters**:
  - `str`: The input string to hash.

- **Returns**:  
  The MD5 hash encoded as a Base64 string.

---

## Usage Examples

```tsx
const text = 'Hello, world!'
const hexHash = MD5.hex(text)
console.log('MD5 Hex:', hexHash)

const base64Hash = MD5.base64(text)
console.log('MD5 Base64:', base64Hash)
```