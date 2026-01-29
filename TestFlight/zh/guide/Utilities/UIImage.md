# UIImage

`UIImage` 类表示一个图像对象，可用于加载、编码、转换与显示。它支持从文件路径、二进制数据或 Base64 字符串中创建图像，并提供多种格式转换方法（PNG/JPEG）。
`UIImage` 可直接用于 `Image` 组件显示，也可与 `Data` 类配合用于图像存储、上传、加密等操作。

***

## 概述

`UIImage` 是脚本环境中处理图像的核心类，常用于以下场景：

- 从本地文件、二进制数据、网络URL或 Base64 字符串中加载图像
- 获取图像的像素宽高与缩放比例
- 转换图像格式（如 PNG、JPEG）
- 生成 Base64 字符串
- 调整渲染模式与可拉伸区域
- 对图像进行翻转或着色
- 生成缩略图
- 支持浅色/深色模式切换的动态图像显示

***

## 属性

### `width: number`

图像的宽度（单位：像素）。

```ts
const image = UIImage.fromFile("/path/to/image.png")
console.log(image?.width)
```

***

### `height: number`

图像的高度（单位：像素）。

```ts
const image = UIImage.fromFile("/path/to/image.png")
console.log(image?.height)
```

***

### `scale: number`

图像的缩放比例（Scale Factor），通常为 `1` 或 `2`（Retina 屏幕）。

```ts
console.log(image?.scale)
```

***

### `imageOrientation: string`

图像的方向，可能的值包括：

- `"up"`
- `"down"`
- `"left"`
- `"right"`
- `"upMirrored"`
- `"downMirrored"`
- `"leftMirrored"`
- `"rightMirrored"`
- `"unknown"`

```ts
console.log(image?.imageOrientation)
```

***

### `isSymbolImage: boolean`

指示该图像是否为 SFSymbol 符号图像。

```ts
const symbol = UIImage.fromSFSymbol("heart.fill")
console.log(symbol?.isSymbolImage) // true
```

***

### `renderingMode: "automatic" | "alwaysOriginal" | "alwaysTemplate" | "unknown"`

图像的渲染模式。

- `automatic`: 系统自动决定渲染方式
- `alwaysOriginal`: 显示原始颜色
- `alwaysTemplate`: 使用模板渲染（可通过 tintColor 着色）

***

### `resizingMode: "tile" | "stretch" | "unknown"`

图像的拉伸模式：

- `"tile"`：平铺重复绘制
- `"stretch"`：直接拉伸

***

### `capInsets: { top: number, left: number, bottom: number, right: number }`

定义图像的可拉伸区域边距（Cap Insets）。

***

### `flipsForRightToLeftLayoutDirection: boolean`

是否为右到左（RTL）布局方向自动翻转图像。

***

## 实例方法

### `preparingThumbnail(size: Size): UIImage | null`

生成指定尺寸的缩略图。

- **参数：**

  - `size.width`: 缩略图宽度
  - `size.height`: 缩略图高度

- **返回值：**

  - 新的 `UIImage` 实例或 `null`

**示例：**

```ts
const image = UIImage.fromFile("/path/to/photo.jpg")
const thumb = image?.preparingThumbnail({ width: 200, height: 200 })
```

***

### `withBaselineOffset(offset: number): UIImage`

设置图像的基线偏移量（Baseline Offset），用于调整图像在垂直方向上的显示位置，在文本布局中很有用。

```ts
const image = UIImage.fromFile("/path/to/image.png")
const offset = image?.withBaselineOffset(10)
```

***

### `withHorizontallyFlippedOrientation(): UIImage`

水平翻转图像方向，返回新的 `UIImage` 实例。

```ts
const flipped = image?.withHorizontallyFlippedOrientation()
```

***

### `withTintColor(color: string, renderingMode?: "automatic" | "alwaysOriginal" | "alwaysTemplate"): UIImage | null`

为图像应用指定的渲染模式和颜色着色。

- **参数：**

  - `color`: 要应用的颜色字符串，例如 `"#ffcc00"` 或 `"rgb(255,128,0)"`
  - `renderingMode`: 渲染模式，默认为 `"automatic"`

**示例：**

```ts
const symbol = UIImage.fromSFSymbol("star.fill")
const tinted = symbol?.withTintColor("#ffcc00", "alwaysTemplate")
```

***

### `withRenderingMode(renderingMode: "automatic" | "alwaysOriginal" | "alwaysTemplate"): UIImage | null`

返回使用指定渲染模式的新图像。

```ts
const templated = image?.withRenderingMode("alwaysTemplate")
```

***

### `resizableImage(capInsets, resizingMode?): UIImage | null`

返回带有指定可拉伸区域和模式的新图像。

- **参数：**

  - `capInsets`: `{ top, left, bottom, right }`
  - `resizingMode`: `"tile"` 或 `"stretch"`，默认 `"tile"`

**示例：**

```ts
const resizable = image?.resizableImage(
  { top: 10, left: 10, bottom: 10, right: 10 },
  "stretch"
)
```

***

### `renderedInCircle(radius?: number | null, fitEntireImage?: boolean): UIImage`

返回一个新的圆形渲染版本的图像，可选指定圆的半径和是否完整显示整个图像。

- **参数：**

  - `radius`（可选）：圆的半径（单位：点）。

    - 如果未指定：

      - 当 `fitEntireImage` 为 `false` 时，圆形将使用图像的**最短边**作为直径；
      - 当 `fitEntireImage` 为 `true` 时，圆形将使用图像的**最长边**作为直径。
  - `fitEntireImage`（可选）：是否让整个图像内容都适应在圆形范围内。

    - 默认值为 `true`。
    - 若为 `false`，图像会填满圆形区域，但可能出现内容裁剪。

- **返回值：**

  - 返回一个新的 `UIImage` 实例，表示圆形渲染结果。

**示例 1：创建默认的圆形头像**

```ts
const image = UIImage.fromFile("/path/to/avatar.jpg")
const circle = image?.renderedInCircle()
<Image image={circle} />
```

**示例 2：指定半径并完整显示整个图像**

```ts
const image = UIImage.fromFile("/path/to/photo.png")
const circle = image?.renderedInCircle(60, true)
<Image image={circle} />
```

**示例 3：填充模式（可能裁剪图像部分内容）**

```ts
const image = UIImage.fromFile("/path/to/icon.png")
const circle = image?.renderedInCircle(50, false)
<Image image={circle} />
```

***

### `renderedIn(size: { width: number, height: number }, source?: {  position?: ..., size?: ... }): UIImage | null`

返回一个新的图像，将源图像缩放到指定大小，可选指定源图像的位置和尺寸。

- **参数：**

  - `size`: `{ width: number, height: number }`，目标图像的尺寸（单位：点）
  - `source`: `{ position?: { x: number, y: number }, size?: { width: number, height: number } }`，源图像的位置和尺寸。

- **返回值：**

  - 成功时返回新的 `UIImage` 实例；失败时返回 `null`。

**示例 1：将整张图片缩放绘制到矩形区域**

```ts
const image = UIImage.fromFile("/path/to/photo.jpg")
const rendered = image?.renderedIn({width: 200, height: 200 })
<Image image={rendered} />
```

**示例 2：从源图像中裁剪指定区域并绘制**

```ts
const image = UIImage.fromFile("/path/to/landscape.jpg")
const cropped = image?.renderedIn({
    width: 150,
    height: 150 
  }, {
  position: { x: 100, y: 50 },
  size: { width: 300, height: 300 }
})
<Image image={cropped} />
```

***

### `applySymbolConfiguration(config: UIImageSymbolConfiguration | UIImageSymbolConfiguration[]): UIImage | null`

返回一个应用指定符号配置（`UIImageSymbolConfiguration`）的新图像实例。
该方法主要用于自定义 **SF Symbols** 图标的外观（如颜色、粗细、大小、配色模式等）。

- **参数：**

  - `config`: 要应用的符号配置对象。

    - 可以是单个 `UIImageSymbolConfiguration` 实例；
    - 或由多个配置组成的数组，多个配置将按顺序依次应用（后者可覆盖前者）。

- **返回值：**

  - 返回一个新的 `UIImage` 实例，表示应用配置后的图像。
    如果应用失败，返回 `null`。

**示例 1：设置符号图标为多色显示**

```ts
const image = UIImage.fromFile("/path/to/sf_symbol.png")
const config = UIImageSymbolConfiguration.preferringMulticolor()
const colored = image?.applySymbolConfiguration(config)
<Image image={colored} />
```

**示例 2：同时应用缩放和权重配置**

```ts
const image = UIImage.fromFile("/path/to/sf_symbol.png")
const config = [
  UIImageSymbolConfiguration.scale("large"),
  UIImageSymbolConfiguration.weight("bold")
]
const boldLarge = image?.applySymbolConfiguration(config)
<Image image={boldLarge} />
```

**示例 3：设置分层颜色与调色板颜色**

```ts
const image = UIImage.fromFile("/path/to/symbol.png")
const config = [
  UIImageSymbolConfiguration.hierarchicalColor(Color.blue()),
  UIImageSymbolConfiguration.paletteColors([Color.red(), Color.orange()])
]
const customized = image?.applySymbolConfiguration(config)
<Image image={customized} />
```

***

## UIImageSymbolConfiguration

`UIImageSymbolConfiguration` 是用于配置 **符号图像（SF Symbols）** 外观的类。
可通过其静态方法创建不同的配置对象，并在 `applySymbolConfiguration()` 中使用。

### 可用静态方法

| 方法                          | 说明                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `preferringMonochrome()`    | 优先使用单色显示符号。                                                                                                              |
| `preferringMulticolor()`    | 优先使用多色显示符号。                                                                                                              |
| `scale(value)`              | 设置符号缩放比例，可选值：`"default"`, `"large"`, `"medium"`, `"small"`, `"unspecified"`。                                             |
| `weight(value)`             | 设置符号线条粗细，可选值：`"ultraLight"`, `"thin"`, `"light"`, `"regular"`, `"medium"`, `"semibold"`, `"bold"`, `"heavy"`, `"black"`。 |
| `pointSize(value)`          | 设置符号点大小。                                                                                                                 |
| `paletteColors(value)`      | 设置符号调色板颜色数组（用于多层符号）。                                                                                                     |
| `hierarchicalColor(value)`  | 设置符号的层级颜色（分层阴影样式）。                                                                                                       |
| `variableValueMode(value)`  | 设置符号的动态数值显示模式，可选值：`"automatic"`, `"color"`, `"draw"`。                                                                    |
| `colorRenderingMode(value)` | 设置颜色渲染模式，可选值：`"automatic"`, `"flat"`, `"gradient"`。                                                                      |
| `locale(identifier)`        | 设置用于符号本地化的语言标识符（如 `"en"`, `"zh-Hans"`）。                                                                                  |

***

**示例：组合配置符号图标外观**

```ts
const config = [
  UIImageSymbolConfiguration.scale("medium"),
  UIImageSymbolConfiguration.weight("semibold"),
  UIImageSymbolConfiguration.preferringMonochrome(),
  UIImageSymbolConfiguration.colorRenderingMode("flat")
]

const image = UIImage.fromFile("/path/to/symbol.png")
const result = image?.applySymbolConfiguration(config)
<Image image={result} />
```

***

### `toJPEGData(compressionQuality?: number): Data | null`

将图像转换为 JPEG 格式的二进制数据。

- **参数：**

  - `compressionQuality`（可选）: 压缩质量（0–1，默认 1）
- **返回值：**

  - `Data` 实例或 `null`

***

### `toPNGData(): Data | null`

将图像转换为 PNG 格式的二进制数据。
返回 `Data` 实例或 `null`。

***

### `toJPEGBase64String(compressionQuality?: number): string | null`

将图像转换为 Base64 编码的 JPEG 字符串。

***

### `toPNGBase64String(): string | null`

将图像转换为 Base64 编码的 PNG 字符串。

***

## 静态方法

### `UIImage.fromData(data: Data): UIImage | null`

通过 `Data` 创建图像。

***

### `UIImage.fromFile(filePath: string): UIImage | null`

从文件路径加载图像（支持 PNG/JPEG）。

***

### `UIImage.fromBase64String(base64String: string): UIImage | null`

通过 Base64 字符串创建图像。

***

### `UIImage.fromSFSymbol(name: string): UIImage | null`

从 **SFSymbol 名称** 创建系统图标。

**示例：**

```ts
const heart = UIImage.fromSFSymbol("heart.fill")
<Image image={heart} />
```

***

### `UIImage.fromURL(url: string): Promise<UIImage | null>`

通过 URL 加载图像（支持 PNG/JPEG）。

**示例：**

```ts
const image = await UIImage.fromURL("https://example.com/image.jpg")
<Image image={image} />
```

***

## 在 UI 中使用 UIImage

`UIImage` 可以直接用于 `<Image>` 组件中显示图像。

### 组件定义

```ts
declare const Image: FunctionComponent<UIImageProps>
```

***

### 属性定义

```ts
type UIImageProps = {
  image: UIImage | DynamicImageSource<UIImage>
}
```

***

### 类型定义

```ts
type DynamicImageSource<T> = {
  light: T
  dark: T
}
```

***

### 示例：显示单张图片

```ts
const image = UIImage.fromFile("/path/to/avatar.png")
<Image image={image} />
```

***

### 示例：适配浅色与深色模式

```ts
const lightImage = UIImage.fromFile("/path/to/light-logo.png")
const darkImage = UIImage.fromFile("/path/to/dark-logo.png")

<Image image={{ light: lightImage, dark: darkImage }} />
```

***

## 常见用法示例

### 1. 图像转 Base64

```ts
const image = UIImage.fromFile("/path/to/image.png")
const base64 = image?.toPNGBase64String()
```

***

### 2. 压缩为 JPEG 数据并保存

```ts
const image = UIImage.fromFile("/path/to/photo.jpg")
const jpegData = image?.toJPEGData(0.6)
if (jpegData) {
  // 写入到本地文件
}
```

***

### 3. 从 Base64 字符串还原图片并显示

```ts
const base64 = "iVBORw0KGgoAAAANSUhEUgAA..."
const image = UIImage.fromBase64String(base64)
<Image image={image} />
```

***

### 4. 将 PNG 图片转换为 JPEG 并上传

```ts
const image = UIImage.fromFile("/path/to/logo.png")
const jpegData = image?.toJPEGData(0.8)
if (jpegData) {
  const response = await fetch("https://example.com/upload", {
    method: "POST",
    body: jpegData.toUint8Array()
  })
}
```

***

### 5. 创建 SFSymbol 图像并着色

```ts
const symbol = UIImage.fromSFSymbol("star.fill")
const colored = symbol?.withTintColor("#ffcc00", "alwaysTemplate")
<Image image={colored} />
```

***

### 6. 生成缩略图

```ts
const image = UIImage.fromFile("/path/to/large.jpg")
const thumb = image?.preparingThumbnail({ width: 120, height: 120 })
<Image image={thumb} />
```

***

## 总结

`UIImage` 是 Scripting 脚本环境中图像操作的核心类，具备以下特性：

- 从文件、二进制或 Base64 加载图像
- 支持 SFSymbol 系统图标
- 读取图像宽高、比例、方向与渲染信息
- 可进行翻转、着色与可拉伸处理
- 支持 PNG/JPEG 格式转换与 Base64 编码
- 生成缩略图与自定义渲染模式
- 可直接用于 `<Image>` 组件显示，支持浅色/深色模式自动切换
