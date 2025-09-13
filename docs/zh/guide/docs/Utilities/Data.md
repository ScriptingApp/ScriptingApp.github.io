---
title: 数据
---
`Data` 类用于表示二进制数据，并提供将数据在字符串、文件、Base64、Hex、`ArrayBuffer` 等多种格式之间进行转换的方法。它还支持图像编码、文件读写、二进制拼接与底层字节访问。

## 概览

`Data` 对象适用于以下场景：

* 编码或解码文本与二进制数据
* 从文件中加载或保存数据
* 将图像转换为 JPEG/PNG 二进制格式
* 在 `ArrayBuffer`、Base64、Hex 和原始字符串之间转换
* 合并多个二进制数据为一个完整的数据块

---

## 静态方法（Static Methods）

### `Data.fromString(string: string, encoding?: string): Data | null`

从字符串创建一个新的 `Data` 对象。

* **参数：**

  * `string`: 要编码的字符串。
  * `encoding`（可选）：编码格式，默认为 `"utf-8"`。

* **返回值：** 新的 `Data` 对象，若编码失败或内容为空则返回 `null`。

* **示例：**

  ```ts
  const data = Data.fromString("Hello, world!")
  ```

---

### `Data.fromFile(filePath: string): Data | null`

从指定路径读取文件内容并创建 `Data` 对象。

* **参数：**

  * `filePath`: 文件的绝对路径。

* **返回值：** 若读取成功返回 `Data` 实例，否则返回 `null`。

* **示例：**

  ```ts
  const fileData = Data.fromFile("/path/to/tmp/sample.txt")
  ```

---

### `Data.fromArrayBuffer(arrayBuffer: ArrayBuffer): Data | null`

将一个 `ArrayBuffer` 封装为 `Data` 对象。

* **参数：**

  * `arrayBuffer`: 有效的 `ArrayBuffer` 实例。

* **返回值：** 封装后的 `Data` 对象，若无效或为空则返回 `null`。

* **示例：**

  ```ts
  const buffer = new Uint8Array([1, 2, 3]).buffer
  const data = Data.fromArrayBuffer(buffer)
  ```

---

### `Data.fromBase64String(base64Encoded: string): Data | null`

从 Base64 编码字符串创建 `Data` 对象。

* **参数：**

  * `base64Encoded`: 有效的 Base64 字符串。

* **返回值：** 解码后的 `Data` 对象，失败时返回 `null`。

* **示例：**

  ```ts
  const data = Data.fromBase64String("SGVsbG8=")
  ```

---

### `Data.fromHexString(hexEncoded: string): Data | null`

从十六进制字符串创建 `Data` 对象。

* **参数：**

  * `hexEncoded`: 十六进制字符串（如 `"48656c6c6f"`）。

* **返回值：** 解析成功返回 `Data` 对象，失败返回 `null`。

* **示例：**

  ```ts
  const data = Data.fromHexString("48656c6c6f") // "Hello"
  ```

---

### `Data.fromJPEG(image: UIImage, compressionQuality?: number): Data | null`

将图像编码为 JPEG 格式二进制数据。

* **参数：**

  * `image`: 要编码的图像对象。
  * `compressionQuality`（可选）：JPEG 压缩质量，范围 0.0 \~ 1.0，默认为 1.0。

* **返回值：** 编码后的 `Data` 对象，失败返回 `null`。

---

### `Data.fromPNG(image: UIImage): Data | null`

将图像编码为 PNG 格式二进制数据。

* **参数：**

  * `image`: 要编码的图像对象。

* **返回值：** 编码后的 `Data` 对象，失败返回 `null`。

---

### `Data.combine(dataList: Data[]): Data`

合并多个 `Data` 实例为一个完整的 `Data` 对象。

* **参数：**

  * `dataList`: `Data` 对象数组。

* **返回值：** 合并后的新 `Data` 对象。空数据元素会被忽略。

* **示例：**

  ```ts
  const d1 = Data.fromString("Hello, ")
  const d2 = Data.fromString("world!")
  const combined = Data.combine([d1, d2])
  console.log(combined.toRawString()) // "Hello, world!"
  ```

---

## 实例方法（Instance Methods）

### `getBytes(): Uint8Array | null`

返回原始字节数组的 `Uint8Array` 视图。

* **返回值：** 字节数组视图，若失败则返回 `null`。

* **示例：**

  ```ts
  const data = Data.fromString("abc")
  const bytes = data?.getBytes() // [97, 98, 99]
  ```

---

### `toArrayBuffer(): ArrayBuffer`

以 `ArrayBuffer` 格式返回数据。

* **返回值：** 新的 `ArrayBuffer` 对象，即使为空也有效。

* **示例：**

  ```ts
  const buffer = data.toArrayBuffer()
  ```

---

### `toBase64String(): string`

以 Base64 格式返回数据。

* **返回值：** 编码后的 Base64 字符串。

* **示例：**

  ```ts
  const base64 = data.toBase64String() // "SGVsbG8gd29ybGQ="
  ```

---

### `toHexString(): string`

以十六进制字符串格式返回数据。

* **返回值：** 十六进制字符串（如 `"48656c6c6f"` 表示 "Hello"）。

* **示例：**

  ```ts
  const hex = data.toHexString()
  ```

---

### `toRawString(encoding?: string): string | null`

使用指定编码将二进制数据转换为字符串。

* **参数：**

  * `encoding`（可选）：字符串编码，如 `"utf-8"`、`"ascii"`，默认为 `"utf-8"`。

* **返回值：** 解码后的字符串，失败返回 `null`。

* **示例：**

  ```ts
  const data = Data.fromHexString("e4b8ad")
  const str = data?.toRawString("utf-8") // "中"
  ```

---

### `compressed(algorithm: CompressionAlgorithm): Data`

使用指定算法压缩内存中的数据。

* **参数：**

  * `algorithm`: 要使用的压缩算法（详见下方枚举）。

* **返回值：** 压缩后的 `Data` 对象。

* **异常：** 若数据为空或压缩失败则抛出错误。

* **使用建议：** 适用于减小内存占用，但对于 JPEG、AAC 等已压缩格式可能无显著效果。

---

### `decompressed(algorithm: CompressionAlgorithm): Data`

使用指定算法解压当前数据。

* **参数：**

  * `algorithm`: 压缩时使用的相同算法。

* **返回值：** 解压后的 `Data` 对象。

* **异常：** 若数据为空或解压失败则抛出错误。

* **使用建议：** 适用于还原使用 `compressed()` 压缩后的原始字节数据。

---

## 枚举类型（Enums）

### `CompressionAlgorithm`

用于指定压缩/解压算法的枚举类型，适用于 `Data.compressed()` 和 `Data.decompressed()` 方法。

```ts
enum CompressionAlgorithm {
  lzfse = 0, // LZFSE 算法，快速且高效
  lz4   = 1, // LZ4 算法，极快
  lzma  = 2, // LZMA 算法，高压缩比
  zlib  = 3  // Zlib 标准压缩算法，兼容性好
}
```

---

## 使用示例（Usage Examples）

### 字符串转十六进制再还原

```ts
const original = "SecureMessage"
const data = Data.fromString(original)
const hex = data?.toHexString()
const restored = Data.fromHexString(hex!).toRawString()
console.log(restored) // "SecureMessage"
```

---

### 读取文件并转为 Base64

```ts
const fileData = Data.fromFile("/path/to/file.bin")
const base64 = fileData?.toBase64String()
```

---

### 合并多个数据对象

```ts
const part1 = Data.fromString("Hello, ")
const part2 = Data.fromString("world!")
const combined = Data.combine([part1, part2])
console.log(combined.toRawString()) // "Hello, world!"
```