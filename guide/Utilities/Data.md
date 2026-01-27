# Data

The `Data` class represents binary data in memory and provides a wide range of methods for manipulating, converting, compressing, decompressing, and transforming that data. It is useful for working with raw byte buffers, encoded files, images, and more.

***

## CompressionAlgorithm (Enum)

Specifies which compression algorithm to use when compressing or decompressing a `Data` instance:

| Value   | Description                                               |
| ------- | --------------------------------------------------------- |
| `lzfse` | Fast and efficient compression using the LZFSE algorithm. |
| `lz4`   | Very fast compression with moderate compression ratio.    |
| `lzma`  | High compression ratio, slower performance.               |
| `zlib`  | Standard and widely-used compression format.              |

***

## Instance Properties and Methods

### `size: number`

The length of the data in bytes (read-only).

***

### `resetBytes(startIndex: number, endIndex: number): void`

Resets a range of bytes to zero.

- `startIndex`: Starting index (inclusive)
- `endIndex`: Ending index (exclusive)

Throws an error if the indices are out of bounds.

***

### `advanced(amount: number): Data`

Returns a new `Data` instance by removing the first `amount` bytes from the buffer.

***

### `replaceSubrange(startIndex, endIndex, data): void`

Replaces a specified byte range with the content of another `Data` instance.

***

### `compressed(algorithm: CompressionAlgorithm): Data`

Compresses the current data using the specified algorithm and returns a new `Data` instance.

Throws an error if the data is empty or cannot be compressed.

***

### `decompressed(algorithm: CompressionAlgorithm): Data`

Decompresses the current data using the specified algorithm and returns a new `Data` instance.

Must use the same algorithm that was used to compress the data.

***

### `slice(start?: number, end?: number): Data`

Returns a new `Data` instance representing a slice of the original.

- `start`: Starting index (default is `0`)
- `end`: Ending index (default is the end of the data)

***

### `append(other: Data): void`

Appends another `Data` instance to the end of the current one.

***

### `getBytes(): Uint8Array | null` (Deprecated)

Use `toUint8Array()` instead.

***

### `toUint8Array(): Uint8Array | null`

Converts the data into a `Uint8Array`.

***

### `toArrayBuffer(): ArrayBuffer`

Converts the data into an `ArrayBuffer`.

***

### `toBase64String(): string`

Returns a Base64-encoded string representation of the data.

***

### `toHexString(): string`

Returns a hexadecimal string representation of the data.

***

### `toRawString(encoding?: string): string | null`

Converts the data into a string using the specified encoding (default: `"utf-8"`), strictly following the specified encoding, and returning `null` if the data is empty or cannot be converted to a string.

***

### `toDecodedString(encoding?: "utf8" | "ascii"): string`

Converts the data into a decoded string using the specified encoding (default: `"utf-8"`), loosing any bad characters.

***

### `toIntArray(): number[]`

Returns an array of integers representing the bytes of the data.

***

## Static Methods

### `Data.fromIntArray(array: number[]): Data`

Creates a `Data` instance from an array of integers.

***

### `Data.fromString(str: string, encoding?: string): Data | null` (Deprecated)

Use `Data.fromRawString()` instead.

***

### `Data.fromRawString(str: string, encoding?: string): Data | null`

Creates a `Data` instance from a raw string, using the specified encoding (default: `"utf-8"`).

***

### `Data.fromFile(filePath: string): Data | null`

Reads binary data from a file path and returns a `Data` instance.

***

### `Data.fromArrayBuffer(buffer: ArrayBuffer): Data | null`

Creates a `Data` instance from an `ArrayBuffer`.

***

### `Data.fromUint8Array(bytes: Uint8Array): Data | null`

Creates a `Data` instance from a `Uint8Array`.

***

### `Data.fromBase64String(base64: string): Data | null`

Creates a `Data` instance from a Base64-encoded string.

***

### `Data.fromHexString(hex: string): Data | null`

Creates a `Data` instance from a hexadecimal string.

***

### `Data.fromJPEG(image: UIImage, compressionQuality?: number): Data | null`

Converts a `UIImage` to JPEG format data.

- `compressionQuality`: Compression quality between `0.0` and `1.0` (default: `1.0`)

***

### `Data.fromPNG(image: UIImage): Data | null`

Converts a `UIImage` to PNG format data.

***

### `Data.combine(dataList: Data[]): Data`

Combines multiple `Data` instances into one.

Returns `null` if the list is empty or all items are empty.
