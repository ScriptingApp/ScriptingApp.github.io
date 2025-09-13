---
title: UIImage
---
`UIImage` 类表示一个图像对象，可以从文件或二进制数据中加载。它提供图像的宽高属性，并可用于图像编码（如 PNG/JPEG）、数据转换和在 UI 中展示。`UIImage` 可与 `Data` 类结合用于图像处理，也可直接传入 `Image` 组件进行显示。

---

## 概述

`UIImage` 可用于以下场景：

* 从本地文件或二进制数据中加载图像
* 获取图像的像素尺寸
* 转换为 `Data` 类型用于加密、上传或保存
* 在 UI 界面中通过 `Image` 组件显示图像
* 根据系统外观切换（浅色/深色模式）动态切换图像源

---

## 属性

### `width: number`

图像的宽度（单位：像素）

```ts
const image = UIImage.fromFile("/path/to/image.jpg")
console.log(image?.width)
```

---

### `height: number`

图像的高度（单位：像素）

```ts
const image = UIImage.fromFile("/path/to/image.jpg")
console.log(image?.height)
```

---

## 静态方法

### `UIImage.fromFile(filePath: string): UIImage | null`

从文件路径读取图像并创建 `UIImage` 实例。

* **参数：**

  * `filePath`: 图像文件的绝对路径（支持 PNG、JPG 等）

* **返回值：** 成功时返回 `UIImage` 实例，失败时返回 `null`

* **示例：**

  ```ts
  const image = UIImage.fromFile("/path/to/tmp/photo.png")
  if (image) {
    console.log(`图像尺寸: ${image.width} x ${image.height}`)
  }
  ```

---

### `UIImage.fromData(data: Data): UIImage | null`

通过图像的二进制数据创建 `UIImage`。

* **参数：**

  * `data`: 包含 PNG 或 JPEG 格式数据的 `Data` 实例

* **返回值：** 返回 `UIImage`，若数据无效或非图像格式返回 `null`

* **示例：**

  ```ts
  const data = Data.fromFile("/path/to/tmp/sample.jpg")
  const image = data ? UIImage.fromData(data) : null
  ```

---

## 在 `Image` 组件中使用 `UIImage`

`UIImage` 可通过 `Image` 组件在 UI 中展示图像。

### 组件定义

```ts
declare const Image: FunctionComponent<UIImageProps>
```

### 属性定义：`UIImageProps`

```ts
type UIImageProps = {
  image: UIImage | DynamicImageSource<UIImage>
}
```

* `image`: 要显示的图像，可以是单个 `UIImage`，也可以是 `DynamicImageSource<UIImage>`，支持浅色/深色模式的图像切换

---

### 类型定义：`DynamicImageSource<T>`

```ts
type DynamicImageSource<T> = {
  light: T
  dark: T
}
```

用于为浅色模式和深色模式分别设置不同图像。

---

### 示例：显示单张图片

```ts
const image = UIImage.fromFile("/path/to/avatar.png")

<Image image={image} />
```

---

### 示例：适配浅色和深色模式

```ts
const lightImage = UIImage.fromFile("/path/to/images/light-logo.png")
const darkImage = UIImage.fromFile("/path/to/images/dark-logo.png")

<Image image={{ light: lightImage, dark: darkImage }} />
```

---

## 常见用法

### 将图像转换为 Base64 字符串

```ts
const image = UIImage.fromFile("/path/to/image.png")
const data = image ? Data.fromPNG(image) : null
const base64 = data?.toBase64String()
```

---

### 将图像以 JPEG 格式压缩输出

```ts
const image = UIImage.fromFile("/path/to/photo.jpg")
const jpeg = image ? Data.fromJPEG(image, 0.7) : null
```

---

### 在 UI 中显示图片

```ts
const image = UIImage.fromFile("/path/to/logo.png")

<Image image={image} />
```

---

## 总结

`UIImage` 是 Scripting 脚本环境中处理图像的基础类，支持：

* 从文件或二进制数据加载图像
* 获取图像尺寸信息
* 与 `Data` 结合实现图像格式转换（如 PNG/JPEG）
* 直接用于 UI 渲染，支持浅色/深色模式适配
