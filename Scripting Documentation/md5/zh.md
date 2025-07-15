`MD5` 模块提供了对字符串进行 MD5 哈希处理的功能。  
支持输出为十六进制（hex）编码或 Base64 编码格式。

---

## 函数

### `hex(str: string): string`
对输入字符串进行 MD5 哈希处理，并返回**十六进制**格式的字符串。

- **参数**：
  - `str`：要进行哈希处理的字符串。

- **返回值**：  
  以十六进制编码的 MD5 哈希值字符串。

---

### `base64(str: string): string`
对输入字符串进行 MD5 哈希处理，并返回**Base64**格式的字符串。

- **参数**：
  - `str`：要进行哈希处理的字符串。

- **返回值**：  
  以 Base64 编码的 MD5 哈希值字符串。

---

## 使用示例

```tsx
const text = '你好，世界！'
const hexHash = MD5.hex(text)
console.log('MD5 十六进制：', hexHash)

const base64Hash = MD5.base64(text)
console.log('MD5 Base64编码：', base64Hash)
```