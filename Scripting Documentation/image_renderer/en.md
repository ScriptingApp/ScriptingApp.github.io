The `ImageRenderer` API provides a convenient way to render virtual views written in TSX into images. This document explains how to use the API to create images in various formats, with examples and best practices.

---

## Overview

The `ImageRenderer` API enables you to render TSX components, like a `VirtualNode`, into images. You can create images in multiple formats, such as `UIImage`, PNG, or JPEG, by providing a virtual TSX element and optional rendering options.

---

## API Reference

### ImageRenderOptions

An optional configuration object to customize rendering behavior.

#### Properties:

- **`opaque`**: `boolean`
    - Indicates whether the rendering context has an alpha channel.
    - Defaults to `false`.

- **`scale`**: `number`
    - The display scale of the rendering context.
    - Defaults to the `scale` of the main screen.

### ImageRenderer

A class for rendering views into images or data.

#### Static Methods:

- **`toUIImage(element: VirtualNode, options?: ImageRenderOptions): Promise<UIImage>`**
    - Renders a TSX view into a `UIImage`.

- **`toPNGData(element: VirtualNode, options?: ImageRenderOptions): Promise<Data>`**
    - Renders a TSX view into PNG data.

- **`toJPEGData(element: VirtualNode, options?: ImageRenderOptions & { compressionQuality?: number }): Promise<Data>`**
    - Renders a TSX view into JPEG data.
    - **Additional Option:**
        - `compressionQuality`: A number between `0.0` and `1.0`, where `1.0` indicates lossless compression. Defaults to `1.0`.

---

## Common Use Cases

### Render a View to a UIImage

```tsx
import { ImageRenderer } from "scripting"

function MyView() {
  return <VStack>
    <Text>Hello, World!</Text>
  </VStack>
}

async function run() {
  try {
    const image = await ImageRenderer.toUIImage(<MyView />)
    console.log("Image created:", image)
  } catch (e) {
    console.error("Failed to generate an image," e)
  }
}

run()
```

### Render a View to PNG Data

```tsx
async function savePNG() {
  const pngData = await ImageRenderer.toPNGData(<MyView />, { scale: 2 })
  console.log("PNG data created:", pngData)
}

savePNG()
```

### Render a View to JPEG Data

```tsx
async function saveJPEG() {
  const jpegData = await ImageRenderer.toJPEGData(<MyView />, {
    compressionQuality: 0.8,
  })
  console.log("JPEG data created:", jpegData)
}

saveJPEG()
```

---

## Best Practices

1. **Optimize Performance:**
    - Use `scale` to adjust the rendering resolution according to your requirements.
    - Avoid rendering unnecessarily large images to reduce memory usage.

2. **Compression Settings:**
    - For JPEG, adjust `compressionQuality` to balance image quality and file size.

3. **Testing:**
    - Test your TSX views in the app to ensure the rendered output matches your expectations.

4. **Reusability:**
    - Write reusable TSX components for common rendering tasks.

5. **Dispose Unused Data:**
    - Manage generated data (like `UIImage` or PNG/JPEG data) efficiently to avoid memory leaks.

---

## Full Example

```tsx
import { ImageRenderer } from "scripting"

function CustomView() {
  return <VStack spacing={10}>
    <Text fontSize={20}>Welcome</Text>
    <Image imageUrl={"https://example.com/logo.png"} />
  </VStack>
}

async function main() {
  // Render to UIImage
  const uiImage = await ImageRenderer.toUIImage(<CustomView />, { opaque: true, scale: 2 })
  console.log("UIImage created:", uiImage)

  // Render to PNG
  const pngData = await ImageRenderer.toPNGData(<CustomView />)
  console.log("PNG data size:", pngData.length)

  // Render to JPEG
  const jpegData = await ImageRenderer.toJPEGData(<CustomView />, { compressionQuality: 0.8 })
  console.log("JPEG data size:", jpegData.length)
}

main()
```

