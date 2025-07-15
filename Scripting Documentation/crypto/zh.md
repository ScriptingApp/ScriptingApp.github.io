`Crypto` 模块提供了简单、安全、高效的数据哈希功能。  
目前支持三种常用的哈希算法：**SHA-256**、**SHA-384**、**SHA-512**。

该模块需与 `Data` 类配合使用，支持对文本、二进制数据、文件内容等进行哈希加密，使用方式非常简洁。

---

## 函数

### `sha256(data: Data): string`
使用 SHA-256 算法对传入的 `Data` 进行哈希处理，返回十六进制格式的字符串结果。

### `sha384(data: Data): string`
使用 SHA-384 算法对传入的 `Data` 进行哈希处理，返回十六进制格式的字符串结果。

### `sha512(data: Data): string`
使用 SHA-512 算法对传入的 `Data` 进行哈希处理，返回十六进制格式的字符串结果。

---

## 使用示例

### 对字符串进行哈希
```tsx
const data = Data.fromString('你好，世界！')
if (data) {
  const hash = Crypto.sha256(data)
  console.log('SHA-256 哈希值：', hash)
}
```

---

### 对文件内容进行哈希
```tsx
const filePath = '/路径/文件.txt'
const fileData = Data.fromFile(filePath)
if (fileData) {
  const hash = Crypto.sha384(fileData)
  console.log('SHA-384 文件哈希值：', hash)
}
```

---

### 对图片（JPEG格式）进行哈希
```tsx
// 假设已有 UIImage 对象
const imageData = Data.fromJPEG(myImage, 0.8)
if (imageData) {
  const hash = Crypto.sha512(imageData)
  console.log('SHA-512 图片哈希值：', hash)
}
```

---

### 链式哈希多次处理
```tsx
const original = Data.fromString('第一次加密')
if (original) {
  const firstHash = Crypto.sha256(original)
  const secondData = Data.fromString(firstHash)
  if (secondData) {
    const finalHash = Crypto.sha512(secondData)
    console.log('链式哈希（SHA-512）：', finalHash)
  }
}
```
