This document explains how to use the `Data` and `UIImage` global objects in the Scripting app. These classes are wrappers for iOS `Data` and `UIImage` objects, providing utilities for handling binary data and images.

---

## `Data` Class

### Overview
The `Data` class represents a byte buffer in memory and provides utilities for creating, transforming, and encoding data.

### Instance Methods

- **`getBytes()`**
  - Returns: `Uint8Array | null`
  - Description: Retrieves the raw bytes from the `Data` instance as a `Uint8Array`.

- **`toArrayBuffer()`**
  - Returns: `ArrayBuffer`
  - Description: Converts the `Data` instance to an `ArrayBuffer`.

- **`toBase64String()`**
  - Returns: `string`
  - Description: Encodes the `Data` instance as a Base64-encoded string.

- **`toRawString(encoding?: string)`**
  - Parameters:
    - `encoding`: (optional) The string encoding format (e.g., `"utf-8"`, `"ascii"`).
  - Returns: `string | null`
  - Description: Converts the `Data` instance into a raw string using the specified encoding. Defaults to `"utf-8"` if no encoding is provided.

### Static Methods

- **`fromString(string: string, encoding?: string)`**
  - Parameters:
    - `string`: The input string.
    - `encoding`: (optional) The string encoding format (e.g., `"utf-8"`, `"ascii"`).
  - Returns: `Data | null`
  - Description: Creates a `Data` instance from a string with the specified encoding.

- **`fromFile(filePath: string)`**
  - Parameters:
    - `filePath`: The path to the file.
  - Returns: `Data | null`
  - Description: Reads a file at the specified path into a `Data` instance.

- **`fromArrayBuffer(arrayBuffer: ArrayBuffer)`**
  - Parameters:
    - `arrayBuffer`: The `ArrayBuffer` to convert.
  - Returns: `Data | null`
  - Description: Creates a `Data` instance from an `ArrayBuffer`.

- **`fromBase64String(base64Encoded: string)`**
  - Parameters:
    - `base64Encoded`: A Base64-encoded string.
  - Returns: `Data | null`
  - Description: Decodes a Base64 string into a `Data` instance.

- **`fromJPEG(image: UIImage, compressionQuality?: number)`**
  - Parameters:
    - `image`: The `UIImage` instance to encode as JPEG.
    - `compressionQuality`: (optional) A number between `0.0` (lowest quality) and `1.0` (highest quality). Defaults to `1.0`.
  - Returns: `Data | null`
  - Description: Encodes a `UIImage` as JPEG data.

- **`fromPNG(image: UIImage)`**
  - Parameters:
    - `image`: The `UIImage` instance to encode as PNG.
  - Returns: `Data | null`
  - Description: Encodes a `UIImage` as PNG data.

---

## `UIImage` Class

### Overview
The `UIImage` class represents an image and provides methods for loading and creating image instances.

### Properties

- **`width: number`**
  - Description: The width of the image in pixels.

- **`height: number`**
  - Description: The height of the image in pixels.

### Static Methods

- **`fromData(data: Data)`**
  - Parameters:
    - `data`: A `Data` instance containing image data.
  - Returns: `UIImage | null`
  - Description: Creates a `UIImage` from binary image data.

- **`fromFile(filePath: string)`**
  - Parameters:
    - `filePath`: The path to the image file.
  - Returns: `UIImage | null`
  - Description: Loads an image from the specified file path.

---

## Examples

### Convert a String to Data and Back

```tsx
const string = "Hello, World!"
const data = Data.fromString(string, "utf-8")
if (data) {
  const restoredString = data.toRawString("utf-8")
  console.log(restoredString) // Output: "Hello, World!"
}
```

### Load an Image and Convert to JPEG Data

```tsx
const image = UIImage.fromFile("/path/to/image.png")
if (image) {
  const jpegData = Data.fromJPEG(image, 0.8) // 80% quality
  if (jpegData) {
    console.log("JPEG Data size:", jpegData.getBytes()?.length)
  }
}
```

### Load Data from a File and Create an Image

```tsx
const data = Data.fromFile("/path/to/image.jpg")
if (data) {
  const image = UIImage.fromData(data)
  if (image) {
    console.log(`Image size: ${image.width}x${image.height}`)
  }
}
```
