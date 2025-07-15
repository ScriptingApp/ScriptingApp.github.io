---
title: Crypto
---
The `Crypto` module provides simple, secure, and efficient APIs for generating cryptographic hashes from data.  
Currently, it supports three hashing algorithms: **SHA-256**, **SHA-384**, and **SHA-512**.

The module is designed for use with the `Data` class.  
You can easily hash any text, binary data, or file content with just a few lines of code.

---

## Functions

### `sha256(data: Data): string`
Computes the SHA-256 hash of the given `Data` and returns the result as a hexadecimal string.

### `sha384(data: Data): string`
Computes the SHA-384 hash of the given `Data` and returns the result as a hexadecimal string.

### `sha512(data: Data): string`
Computes the SHA-512 hash of the given `Data` and returns the result as a hexadecimal string.

---

## Usage Examples

### Hash a simple string
```tsx
const data = Data.fromString('Hello, world!')
if (data) {
  const hash = Crypto.sha256(data)
  console.log('SHA-256 Hash:', hash)
}
```

---

### Hash file contents
```tsx
const filePath = '/path/to/file.txt'
const fileData = Data.fromFile(filePath)
if (fileData) {
  const hash = Crypto.sha384(fileData)
  console.log('SHA-384 File Hash:', hash)
}
```

---

### Hash an image (JPEG)
```tsx
// Assume you have a UIImage object
const imageData = Data.fromJPEG(myImage, 0.8)
if (imageData) {
  const hash = Crypto.sha512(imageData)
  console.log('SHA-512 Image Hash:', hash)
}
```

---

### Chain hash multiple steps
```tsx
const original = Data.fromString('First Step')
if (original) {
  const firstHash = Crypto.sha256(original)
  const secondData = Data.fromString(firstHash)
  if (secondData) {
    const finalHash = Crypto.sha512(secondData)
    console.log('Chained Hash (SHA-512):', finalHash)
  }
}
```
