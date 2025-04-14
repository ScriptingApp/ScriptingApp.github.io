## 概述

`Photos` 类提供了对用户相册中的照片进行访问和管理的方法。它包括获取最新照片、通过照片选择器对话框选择照片、拍摄新照片以及将图像保存到相册的功能。

---

### 类：`Photos`

> `Photos` 类是一个静态工具类，不需要创建实例即可使用。您可以直接调用其静态方法。

#### 方法说明

---

### `getLatestPhotos(count: number): Promise<UIImage[] | null>`

从系统“照片”应用中获取指定数量的最新照片。

- **参数**:
  - `count`（number）：要获取的照片数量。

- **返回值**: `Promise<UIImage[] | null>`  
  返回一个 Promise，当操作成功时，Promise 会解析为包含若干 `UIImage` 对象的数组；如果操作失败，Promise 会解析为 `null`。

- **示例**:
  ```typescript
  const photos = await Photos.getLatestPhotos(10)
  if (photos) {
      console.log("Retrieved photos:", photos)
  } else {
      console.log("Failed to retrieve photos.")
  }
  ```

---

### `pickPhotos(count: number): Promise<UIImage[]>`

打开照片选择器对话框，允许用户选择限定数量的照片。

- **参数**:
  - `count`（number）：用户可选择的照片数量上限。

- **返回值**: `Promise<UIImage[]>`  
  返回一个 Promise，会解析为用户所选照片的 `UIImage` 对象数组。

- **示例**:
  ```typescript
  const selectedPhotos = await Photos.pickPhotos(5)
  console.log("User selected photos:", selectedPhotos)
  ```

---

### `takePhoto(): Promise<UIImage | null>`

让用户使用相机拍摄一张照片，并在成功时返回一个 `UIImage` 对象。

- **返回值**: `Promise<UIImage | null>`  
  返回一个 Promise，当拍摄成功时，会解析为表示该照片的 `UIImage`；如果操作未成功，则解析为 `null`。

- **示例**:
  ```typescript
  const photo = await Photos.takePhoto()
  if (photo) {
      console.log("Photo taken:", photo)
  } else {
      console.log("Photo capture was unsuccessful.")
  }
  ```

---

### `savePhoto(image: Data, options?: { fileName?: string }): Promise<boolean>`

将一张图片保存到系统相册，并可选择指定元数据。

- **参数**:
  - `image`（Data）：要保存的图像数据。
  - `options`（object，可选）：额外的保存选项。
    - `fileName`（string，可选）：保存时给照片指定的名称。

- **返回值**: `Promise<boolean>`  
  返回一个 Promise，当照片成功保存时，解析为 `true`；否则为 `false`。

- **示例**:
  ```typescript
  const imageData = Data.fromJPEG(uiImage)! /* 图像数据来源 */
  const success = await Photos.savePhoto(imageData, { fileName: "Vacation Photo" })
  if (success) {
      console.log("Photo saved successfully.")
  } else {
      console.log("Failed to save the photo.")
  }
  ```

---

### 注意事项

- **错误处理**：每个方法都返回一个 Promise，您可以在异步函数中使用 `try...catch` 来处理错误。
- **权限**：当您首次使用某些方法时，应用可能会请求访问用户的照片库或相机的权限。请确保正确处理这些权限请求。

---

通过 `Photos` 接口，您可以轻松将相册和相机功能集成到脚本中，实现与用户照片的多种互动。