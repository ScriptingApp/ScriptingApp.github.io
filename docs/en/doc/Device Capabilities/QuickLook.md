---
title: QuickLook

---

The **QuickLook API** in the Scripting app provides a simple way to preview text, images, or files within your scripts. This is a wrapper around iOS QuickLook capabilities, allowing you to quickly display previews for a wide range of content types. 

Each method returns a promise that resolves when the QuickLook view is dismissed, enabling you to chain actions or handle post-preview logic easily.

---

## **API Reference**

### `QuickLook.previewText(text: string): Promise<void>`
Displays a preview of a text string.

#### **Parameters**
- `text` (string): The text content to display in the preview.
- `fullscreen` (boolean?): Whether preview in a fullscreen mode. Defaults to false.

#### **Returns**
- A `Promise<void>`: Resolves after the preview is dismissed.

#### **Example**
```tsx
await QuickLook.previewText("Hello, world! This is a QuickLook preview.")
console.log("Text preview dismissed")
```

---

### `QuickLook.previewImage(image: UIImage): Promise<void>`
Displays a preview of an image.

#### **Parameters**
- `image` (UIImage): The image to display in the preview.
- `fullscreen` (boolean?): Whether preview in a fullscreen mode. Defaults to false.

#### **Returns**
- A `Promise<void>`: Resolves after the preview is dismissed.

#### **Example**
```tsx
// Assume `myImage` is a UIImage instance
await QuickLook.previewImage(myImage)
console.log("Image preview dismissed")
```

---

### `QuickLook.previewURLs(urls: string[]): Promise<void>`
Displays a preview of one or more files located at the given file URL strings.

#### **Parameters**
- `urls` (string[]): An array of file URL strings. Each string should point to a valid file path or remote file that can be previewed by QuickLook.
- `fullscreen` (boolean?): Whether preview in a fullscreen mode. Defaults to false.

#### **Returns**
- A `Promise<void>`: Resolves after the preview is dismissed.

#### **Example**
```tsx
const fileURLs = [
  "/path/to/file1.pdf",
  "/path/to/file2.jpg",
]

await QuickLook.previewURLs(fileURLs)
console.log("File previews dismissed")
```

---

## **Usage Notes**
- **UI Blocking**: These methods present a modal QuickLook view. Execution of subsequent code (after `await`) will pause until the user dismisses the preview.
- **Error Handling**: Use `try...catch` to handle errors such as invalid file paths or unsupported content types.
- **Supported File Types**: The supported file types depend on iOS QuickLook capabilities, which include common file types like PDFs, images, text files, and more.

---

## **Example Use Case**
### Previewing Text, Images, and Files Sequentially
```tsx
// Preview a text
await QuickLook.previewText("QuickLook Preview Example")

// Preview an image
const myImage = UIImage.fromFile("/path/to/image.png")
await QuickLook.previewImage(myImage)

// Preview files
const fileURLs = [
  "/path/to/file1.pdf",
  "/path/to/file2.jpg",
]
await QuickLook.previewURLs(fileURLs)

console.log("All previews completed")
```

With this API, you can integrate QuickLook previews seamlessly into your scripts, enhancing the user experience with minimal effort.