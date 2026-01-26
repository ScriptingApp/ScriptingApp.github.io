# 快速查看

在 Scripting 应用中，**QuickLook API** 提供了一种简单的方法，用于在脚本中预览文本、图片或文件。这是对 iOS QuickLook 功能的封装，允许您快速显示多种内容类型的预览。

每个方法都会返回一个 Promise，该 Promise 会在 QuickLook 视图被关闭时解析，从而使您可以轻松地链式调用操作或处理预览后的逻辑。

***

## **API 参考**

### `QuickLook.previewText(text: string): Promise<void>`

显示文本字符串的预览。

#### **参数**

- `text` (string)：要在预览中显示的文本内容。
- `fullscreen` (boolean?): 是否以全屏模式预览。默认为false.

#### **返回值**

- `Promise<void>`：在预览关闭后解析。

#### **示例**

```tsx
await QuickLook.previewText("你好，世界！这是一个 QuickLook 预览示例。")
console.log("文本预览已关闭")
```

***

### `QuickLook.previewImage(image: UIImage): Promise<void>`

显示图片的预览。

#### **参数**

- `image` (UIImage)：要在预览中显示的图片。
- `fullscreen` (boolean?): 是否以全屏模式预览。默认为false.

#### **返回值**

- `Promise<void>`：在预览关闭后解析。

#### **示例**

```tsx
// 假设 `myImage` 是一个 UIImage 实例
await QuickLook.previewImage(myImage, true)
console.log("图片预览已关闭")
```

***

### `QuickLook.previewURLs(urls: string[]): Promise<void>`

显示一个或多个文件（位于指定的文件 URL 路径）的预览。

#### **参数**

- `urls` (string\[])：文件 URL 字符串数组。每个字符串应指向一个有效的文件路径或可以通过 QuickLook 预览的远程文件。
- `fullscreen` (boolean?): 是否以全屏模式预览。默认为false.

#### **返回值**

- `Promise<void>`：在预览关闭后解析。

#### **示例**

```tsx
const fileURLs = [
  "/path/to/file1.pdf",
  "/path/to/file2.jpg",
]

await QuickLook.previewURLs(fileURLs)
console.log("文件预览已关闭")
```

***

## **使用说明**

- **UI 阻塞**：这些方法会显示一个模态 QuickLook 视图。在用户关闭预览之前，后续代码（`await` 之后的部分）将暂停执行。
- **错误处理**：使用 `try...catch` 来处理错误，例如无效的文件路径或不支持的内容类型。
- **支持的文件类型**：支持的文件类型取决于 iOS 的 QuickLook 功能，包括常见的文件类型，例如 PDF、图片、文本文件等。

***

## **示例使用场景**

### 按顺序预览文本、图片和文件

```tsx
// 预览文本
await QuickLook.previewText("QuickLook 预览示例")

// 预览图片
const myImage = UIImage.fromFile("/path/to/image.png")
await QuickLook.previewImage(myImage)

// 预览文件
const fileURLs = [
  "/path/to/file1.pdf",
  "/path/to/file2.jpg",
]
await QuickLook.previewURLs(fileURLs)

console.log("所有预览已完成")
```

通过这个 API，您可以将 QuickLook 预览无缝集成到脚本中，以最小的努力提升用户体验。

***
