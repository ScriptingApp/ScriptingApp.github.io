# 二进制数据（Data）

`Data` 类用于表示二进制数据，提供多种方法用于数据的创建、转换、压缩、解压、拼接、读取等操作。可用于处理图像、文件、音频、编码数据等各种原始字节数据。

***

## CompressionAlgorithm（压缩算法枚举）

该枚举用于指定 `Data` 的压缩或解压算法：

| 枚举值     | 描述                    |
| ------- | --------------------- |
| `lzfse` | LZFSE 压缩算法，快速且高效。     |
| `lz4`   | LZ4 压缩算法，压缩和解压速度极快。   |
| `lzma`  | LZMA 算法，压缩率高，压缩速度较慢。  |
| `zlib`  | Zlib 算法，通用且广泛支持的压缩格式。 |

***

## 实例属性与方法

### `size: number`

当前数据的字节长度（只读属性）。

***

### `resetBytes(startIndex: number, endIndex: number): void`

将数据中指定范围内的字节清零。

- `startIndex`：起始索引（包含）
- `endIndex`：结束索引（不包含）

若索引超出范围将抛出异常。

***

### `advanced(amount: number): Data`

返回一个新的 `Data` 实例，去除前 `amount` 个字节。

***

### `replaceSubrange(startIndex, endIndex, data): void`

将当前数据中指定范围的字节替换为另一个 `Data` 实例的数据。

***

### `compressed(algorithm: CompressionAlgorithm): Data`

使用指定的压缩算法压缩当前数据，返回压缩后的新 `Data` 实例。

如果数据为空或无法压缩将抛出异常。

***

### `decompressed(algorithm: CompressionAlgorithm): Data`

使用指定的算法对当前数据进行解压，返回解压后的 `Data` 实例。

压缩与解压时使用的算法必须一致。

***

### `slice(start?: number, end?: number): Data`

返回数据的子集片段，形成新的 `Data` 实例。

- `start`：起始索引（默认 0）
- `end`：结束索引（默认到末尾）

***

### `append(other: Data): void`

将另一个 `Data` 实例的数据追加到当前数据末尾。

***

### `getBytes(): Uint8Array | null`（已废弃）

请改用 `toUint8Array()`。

***

### `toUint8Array(): Uint8Array | null`

将数据转换为 `Uint8Array`。

***

### `toArrayBuffer(): ArrayBuffer`

将数据转换为 `ArrayBuffer`。

***

### `toBase64String(): string`

将数据编码为 Base64 字符串。

***

### `toHexString(): string`

将数据编码为十六进制字符串。

***

### `toRawString(encoding?: string): string | null`

将数据转换为字符串，支持指定编码（默认 `"utf-8"`），严格解码，无法解码的字符将返回 `null`。

***

### `toDecodedString(encoding?: "utf8" | "ascii"): string`

将数据转换为字符串，支持指定编码（默认 `"utf-8"`）, 宽松解码，会将无法解码的字符替换为 `?`。

***

### `toIntArray(): number[]`

将数据转换为由整数表示的字节数组。

***

## 静态方法

### `Data.fromIntArray(array: number[]): Data`

从整数数组创建 `Data` 实例。

***

### `Data.fromString(str: string, encoding?: string): Data | null`（已废弃）

请使用 `Data.fromRawString()` 代替。

***

### `Data.fromRawString(str: string, encoding?: string): Data | null`

从字符串创建 `Data` 实例，支持指定编码（默认 `"utf-8"`）。

***

### `Data.fromFile(filePath: string): Data | null`

从本地文件路径读取数据，返回 `Data` 实例。

***

### `Data.fromArrayBuffer(buffer: ArrayBuffer): Data | null`

从 `ArrayBuffer` 创建 `Data` 实例。

***

### `Data.fromUint8Array(bytes: Uint8Array): Data | null`

从 `Uint8Array` 创建 `Data` 实例。

***

### `Data.fromBase64String(base64: string): Data | null`

从 Base64 编码字符串创建 `Data` 实例。

***

### `Data.fromHexString(hex: string): Data | null`

从十六进制字符串创建 `Data` 实例。

***

### `Data.fromJPEG(image: UIImage, compressionQuality?: number): Data | null`

将图像转为 JPEG 格式的 `Data` 实例。

- `compressionQuality`：JPEG 压缩质量，范围 0.0 \~ 1.0，默认值为 1.0（最高质量）

***

### `Data.fromPNG(image: UIImage): Data | null`

将图像转为 PNG 格式的 `Data` 实例。

***

### `Data.combine(dataList: Data[]): Data`

将多个 `Data` 实例合并为一个新实例。

如果列表为空或所有数据为空，则返回空数据。
