本文档介绍如何在脚本应用中使用`Data`和`UIImage`全局对象。这些类是 iOS `Data`和 `UIImage` 对象的包装器，提供用于处理二进制数据和图像的实用程序。

# `Data` 类

## 概述
`Data` 类表示内存中的字节缓冲区，提供了创建、转换和编码数据的工具方法。

---

## 实例方法

### **`getBytes()`**
- **返回值**: `Uint8Array | null`
- **描述**: 从 `Data` 实例中获取原始字节，并以 `Uint8Array` 的形式返回。

### **`toArrayBuffer()`**
- **返回值**: `ArrayBuffer`
- **描述**: 将 `Data` 实例转换为一个 `ArrayBuffer` 对象。

### **`toBase64String()`**
- **返回值**: `string`
- **描述**: 将 `Data` 实例编码为 Base64 字符串。

### **`toRawString(encoding?: string)`**
- **参数**:
  - `encoding` (可选): 字符串的编码格式 (例如 `"utf-8"`, `"ascii"`)。
- **返回值**: `string | null`
- **描述**: 使用指定编码将 `Data` 实例转换为原始字符串。若未指定 `encoding`，则默认为 `"utf-8"`。

---

## 静态方法

### **`fromString(string: string, encoding?: string)`**
- **参数**:
  - `string`: 要转换的字符串。
  - `encoding` (可选): 字符串的编码格式 (例如 `"utf-8"`, `"ascii"`)。
- **返回值**: `Data | null`
- **描述**: 根据指定的编码从字符串创建一个 `Data` 实例。

### **`fromFile(filePath: string)`**
- **参数**:
  - `filePath`: 文件的路径。
- **返回值**: `Data | null`
- **描述**: 读取指定路径下的文件内容并转换为 `Data` 实例。

### **`fromArrayBuffer(arrayBuffer: ArrayBuffer)`**
- **参数**:
  - `arrayBuffer`: 要转换的 `ArrayBuffer`。
- **返回值**: `Data | null`
- **描述**: 从一个 `ArrayBuffer` 创建一个 `Data` 实例。

### **`fromBase64String(base64Encoded: string)`**
- **参数**:
  - `base64Encoded`: Base64 编码的字符串。
- **返回值**: `Data | null`
- **描述**: 将 Base64 字符串解码为一个 `Data` 实例。

### **`fromJPEG(image: UIImage, compressionQuality?: number)`**
- **参数**:
  - `image`: 需要编码为 JPEG 的 `UIImage` 实例。
  - `compressionQuality` (可选): 在 `0.0`（最低质量）到 `1.0`（最高质量）之间的数值。默认为 `1.0`。
- **返回值**: `Data | null`
- **描述**: 将一个 `UIImage` 编码为 JPEG 格式的 `Data`。

### **`fromPNG(image: UIImage)`**
- **参数**:
  - `image`: 需要编码为 PNG 的 `UIImage` 实例。
- **返回值**: `Data | null`
- **描述**: 将一个 `UIImage` 编码为 PNG 格式的 `Data`。

---

# `UIImage` 类

## 概述
`UIImage` 类表示一个图像，并提供加载与创建图像实例的方法。

---

## 属性

- **`width: number`**
  - **描述**: 图像的宽度（像素值）。
  
- **`height: number`**
  - **描述**: 图像的高度（像素值）。

---

## 静态方法

### **`fromData(data: Data)`**
- **参数**:
  - `data`: 包含图像数据的 `Data` 实例。
- **返回值**: `UIImage | null`
- **描述**: 从二进制图像数据创建一个 `UIImage` 实例。

### **`fromFile(filePath: string)`**
- **参数**:
  - `filePath`: 图像文件路径。
- **返回值**: `UIImage | null`
- **描述**: 从指定的文件路径加载图像并返回一个 `UIImage` 实例。

---

# 示例

### 1. 将字符串转换为 Data 并再次转换回字符串

```tsx
const string = "Hello, World!"
const data = Data.fromString(string, "utf-8")
if (data) {
  const restoredString = data.toRawString("utf-8")
  console.log(restoredString) // 输出: "Hello, World!"
}
```

### 2. 加载图像并转换为 JPEG 格式的 Data

```tsx
const image = UIImage.fromFile("/path/to/image.png")
if (image) {
  const jpegData = Data.fromJPEG(image, 0.8) // 80% 质量
  if (jpegData) {
    console.log("JPEG Data 大小:", jpegData.getBytes()?.length)
  }
}
```

### 3. 从文件加载 Data 并创建 UIImage

```tsx
const data = Data.fromFile("/path/to/image.jpg")
if (data) {
  const image = UIImage.fromData(data)
  if (image) {
    console.log(`图像尺寸: ${image.width}x${image.height}`)
  }
}
```

使用 `Data` 和 `UIImage` 类可以帮助您在脚本中方便地处理二进制数据和图像操作，轻松完成编码、解码、转换、加载和保存等常见图像及数据相关任务。