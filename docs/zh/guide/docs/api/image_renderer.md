`ImageRenderer` API 提供了一种方便的方法，将使用 TSX 编写的虚拟视图渲染为图像。本指南将解释如何使用此 API 创建多种格式的图像，并包含示例和最佳实践。

---

## 概述

`ImageRenderer` API 允许将 TSX 组件（如 `VirtualNode`）渲染为图像。通过提供一个虚拟 TSX 元素和可选的渲染选项，可以创建多种格式的图像，如 `UIImage`、PNG 或 JPEG。

---

## API 参考

### ImageRenderOptions

一个可选的配置对象，用于自定义渲染行为。

#### 属性:

- **`opaque`**: `boolean`
    - 指定渲染上下文是否有透明通道。
    - 默认值为 `false`。

- **`scale`**: `number`
    - 渲染上下文的显示比例。
    - 默认值为主屏幕的 `scale`。

### ImageRenderer

用于将视图渲染为图像或数据的类。

#### 静态方法:

- **`toUIImage(element: VirtualNode, options?: ImageRenderOptions): Promise<UIImage>`**
    - 将 TSX 视图渲染为 `UIImage`。

- **`toPNGData(element: VirtualNode, options?: ImageRenderOptions): Promise<Data>`**
    - 将 TSX 视图渲染为 PNG 数据。

- **`toJPEGData(element: VirtualNode, options?: ImageRenderOptions & { compressionQuality?: number }): Promise<Data>`**
    - 将 TSX 视图渲染为 JPEG 数据。
    - **额外选项:**
        - `compressionQuality`: 范围为 `0.0` 到 `1.0`，`1.0` 表示无损压缩。默认值为 `1.0`。

---

## 常见用例

### 将视图渲染为 UIImage

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
    console.error("Failed to generate an image,", e)
  }
}

run()
```

### 将视图渲染为 PNG 数据

```tsx
async function savePNG() {
  const pngData = await ImageRenderer.toPNGData(<MyView />, { scale: 2 })
  console.log("PNG data created:", pngData)
}

savePNG()
```

### 将视图渲染为 JPEG 数据

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

## 最佳实践

1. **优化性能:**
    - 使用 `scale` 根据需求调整渲染分辨率。
    - 避免渲染不必要的大图像，以减少内存使用。

2. **压缩设置:**
    - 对于 JPEG，可调整 `compressionQuality` 以平衡图像质量和文件大小。

3. **测试:**
    - 在应用中测试 TSX 视图，以确保渲染输出符合预期。

4. **复用性:**
    - 为常见渲染任务编写可复用的 TSX 组件。

5. **释放未使用的数据:**
    - 高效管理生成的数据（如 `UIImage` 或 PNG/JPEG 数据），以避免内存泄漏。

---

## 完整示例

```tsx
import { ImageRenderer } from "scripting"

function CustomView() {
  return <VStack spacing={10}>
    <Text fontSize={20}>Welcome</Text>
    <Image imageUrl={"https://example.com/logo.png"} />
  </VStack>
}

async function main() {
  // 渲染为 UIImage
  const uiImage = await ImageRenderer.toUIImage(<CustomView />, { opaque: true, scale: 2 })
  console.log("UIImage created:", uiImage)

  // 渲染为 PNG 数据
  const pngData = await ImageRenderer.toPNGData(<CustomView />)
  console.log("PNG data size:", pngData.length)

  // 渲染为 JPEG 数据
  const jpegData = await ImageRenderer.toJPEGData(<CustomView />, { compressionQuality: 0.8 })
  console.log("JPEG data size:", jpegData.length)
}

main()
```