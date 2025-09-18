---
title: Data
---
The `Data` class represents binary data and provides methods to convert between various formats including strings, files, base64, hex, and `ArrayBuffer`. It also supports image and file encoding, binary composition, and low-level byte access.

## Overview

`Data` objects are used to:

* Encode and decode textual or binary data.
* Load or persist data from files.
* Transform images to binary format (JPEG/PNG).
* Convert between `ArrayBuffer`, Base64, Hex, and raw string formats.
* Concatenate multiple binary values into a single `Data` object.

---

## Static Methods

### `Data.fromString(string: string, encoding?: string): Data | null`

Creates a new `Data` object from a string.

* **Parameters:**

  * `string`: The input string to encode.
  * `encoding` (optional): The string encoding. Defaults to `"utf-8"`.

* **Returns:** A new `Data` object, or `null` if encoding fails or input is empty.

* **Example:**

  ```ts
  const data = Data.fromString("Hello, world!")
  ```

---

### `Data.fromFile(filePath: string): Data | null`

Reads binary content from a file at the given path.

* **Parameters:**

  * `filePath`: Absolute file system path to the file.

* **Returns:** A `Data` instance if the file is found and readable, otherwise `null`.

* **Example:**

  ```ts
  const fileData = Data.fromFile("/path/to/tmp/sample.txt")
  ```

---

### `Data.fromArrayBuffer(arrayBuffer: ArrayBuffer): Data | null`

Wraps an `ArrayBuffer` in a new `Data` object.

* **Parameters:**

  * `arrayBuffer`: A valid `ArrayBuffer` instance.

* **Returns:** A new `Data` instance, or `null` if the buffer is empty or invalid.

* **Example:**

  ```ts
  const buffer = new Uint8Array([1, 2, 3]).buffer
  const data = Data.fromArrayBuffer(buffer)
  ```

---

### `Data.fromBase64String(base64Encoded: string): Data | null`

Creates a `Data` object from a Base64-encoded string.

* **Parameters:**

  * `base64Encoded`: A valid Base64 string.

* **Returns:** A `Data` object containing the decoded binary, or `null` if decoding fails.

* **Example:**

  ```ts
  const data = Data.fromBase64String("SGVsbG8=")
  ```

---

### `Data.fromHexString(hexEncoded: string): Data | null`

Creates a `Data` object from a hexadecimal string.

* **Parameters:**

  * `hexEncoded`: A valid hex string, e.g., `"48656c6c6f"`.

* **Returns:** A `Data` object or `null` if parsing fails.

* **Example:**

  ```ts
  const data = Data.fromHexString("48656c6c6f") // "Hello"
  ```

---

### `Data.fromJPEG(image: UIImage, compressionQuality?: number): Data | null`

Encodes a `UIImage` as JPEG binary data.

* **Parameters:**

  * `image`: The image to encode.
  * `compressionQuality` (optional): JPEG quality from 0.0 (lowest) to 1.0 (highest). Defaults to 1.0.

* **Returns:** A `Data` object or `null` on failure.

---

### `Data.fromPNG(image: UIImage): Data | null`

Encodes a `UIImage` as PNG binary data.

* **Parameters:**

  * `image`: The image to encode.

* **Returns:** A `Data` object or `null` on failure.

---

### `Data.combine(dataList: Data[]): Data`

Combines multiple `Data` instances into a single `Data` object.

* **Parameters:**

  * `dataList`: An array of `Data` instances.

* **Returns:** A new `Data` instance containing the concatenated bytes. Empty `Data` elements are ignored.

* **Example:**

  ```ts
  const d1 = Data.fromString("Hello, ")
  const d2 = Data.fromString("world!")
  const combined = Data.combine([d1, d2])
  console.log(combined.toRawString()) // "Hello, world!"
  ```

---

## Instance Methods

### `getBytes(): Uint8Array | null`

Returns the raw bytes as a `Uint8Array`.

* **Returns:** A `Uint8Array` view of the bytes, or `null` if conversion fails.

* **Example:**

  ```ts
  const data = Data.fromString("abc")
  const bytes = data?.getBytes() // [97, 98, 99]
  ```

---

### `toArrayBuffer(): ArrayBuffer`

Returns the data as an `ArrayBuffer`.

* **Returns:** A new `ArrayBuffer` instance, always valid (may be empty).

* **Example:**

  ```ts
  const buffer = data.toArrayBuffer()
  ```

---

### `toBase64String(): string`

Returns the Base64-encoded string representation of the data.

* **Returns:** A string (possibly empty).

* **Example:**

  ```ts
  const base64 = data.toBase64String() // "SGVsbG8gd29ybGQ="
  ```

---

### `toHexString(): string`

Returns a hexadecimal string representing the data bytes.

* **Returns:** A string (e.g., `"48656c6c6f"` for "Hello").

* **Example:**

  ```ts
  const hex = data.toHexString()
  ```

---

### `toRawString(encoding?: string): string | null`

Converts the binary data to a string using the specified encoding.

* **Parameters:**

  * `encoding` (optional): String encoding (e.g., `"utf-8"`, `"ascii"`). Defaults to `"utf-8"`.

* **Returns:** A decoded string, or `null` if decoding fails.

* **Example:**

  ```ts
  const data = Data.fromHexString("e4b8ad")
  const str = data?.toRawString("utf-8") // "中"
  ```

---

### `compressed(algorithm: CompressionAlgorithm): Data`

Compresses the current in-memory data using the specified algorithm.

* **Parameters:**

  * `algorithm`: The compression algorithm to use.

* **Returns:** A new `Data` object containing the compressed bytes.

* **Throws:** An error if the data is empty or cannot be compressed.

* **Usage Tip:** Use this method to reduce memory usage. Compression is most effective for raw data formats. Already compressed formats (e.g., JPEG, MP4) may benefit little or not at all.

---

### `decompressed(algorithm: CompressionAlgorithm): Data`

Decompresses the current data using the specified algorithm.

* **Parameters:**

  * `algorithm`: The same algorithm that was used to compress the data.

* **Returns:** A new `Data` object containing the decompressed bytes.

* **Throws:** An error if the data is empty or cannot be decompressed.

* **Usage Tip:** Use this method when you need access to the original raw bytes that were compressed using `compressed()`.

---

## Enums

### `CompressionAlgorithm`

An enum that defines the available compression algorithms used with `Data.compressed()` and `Data.decompressed()`.

```ts
enum CompressionAlgorithm {
  lzfse = 0, // LZFSE – Fast and efficient compression
  lz4   = 1, // LZ4 – Very fast compression algorithm
  lzma  = 2, // LZMA – High compression ratio
  zlib  = 3  // Zlib – Widely used standard algorithm
}
```

---

## Usage Examples

### Convert Text to Hex and Back

```ts
const original = "SecureMessage"
const data = Data.fromString(original)
const hex = data?.toHexString()
const restored = Data.fromHexString(hex!).toRawString()
console.log(restored) // "SecureMessage"
```

---

### Read File and Convert to Base64

```ts
const fileData = Data.fromFile("/path/to/file.bin")
const base64 = fileData?.toBase64String()
```

---

### Concatenate Multiple Data Objects

```ts
const part1 = Data.fromString("Hello, ")
const part2 = Data.fromString("world!")
const combined = Data.combine([part1, part2])
console.log(combined.toRawString()) // "Hello, world!"
```

