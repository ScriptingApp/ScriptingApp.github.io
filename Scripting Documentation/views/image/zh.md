**Scripting 应用中的 `Image` 组件**允许显示来自多种来源的图片，例如系统图标、网络 URL、本地文件或 `UIImage` 对象。此外，还可以通过多个视图修饰符自定义 `Image` 组件的行为和外观。

---

## **类型定义**

### `ImageResizable`

定义图片如何调整大小：

- **`boolean`**:  
  - `true`: 启用默认缩放。  
  - `false`: 禁用缩放。
- **`object`**:  
  - **`capInsets`** *(可选)*: `EdgeInsets`  
    定义图片拉伸的边距，以控制图片哪些部分被拉伸，哪些部分保持固定。  
  - **`resizingMode`** *(可选)*: `ImageResizingMode`  
    指定缩放模式，例如缩放或平铺。

### `ImageScale`

指定图片在视图中的相对大小：

- `'large'`: 以较大的尺寸显示图片。
- `'medium'`: 以中等尺寸显示图片。
- `'small'`: 以较小的尺寸显示图片。

### `SystemImageProps`

- **`systemName`** *(string, 必需)*  
  系统提供的图标名称。  
  可参考 [SF Symbols](https://developer.apple.com/design/resources/#sf-symbols) 库，或使用 [SF Symbols 浏览器](https://apps.apple.com/cn/app/sf-symbols-reference/id1491161336?l=en-GB) 应用浏览可用的图标名称。

- **`variableValue`** *(number, 可选)*  
  介于 `0.0` 和 `1.0` 之间的值，用于自定义可变图标的外观。  
  *(对不支持可变值的图标无效。)*

- **`resizable`** *(ImageResizable, 可选)*  
  配置图片如何调整大小以适应分配的空间。

### `NetworkImageProps`

- **`imageUrl`** *(string, 必需)*  
  图片的加载 URL。

- **`placeholder`** *(VirtualNode, 可选)*  
  图片加载时显示的占位视图。

- **`resizable`** *(ImageResizable, 可选)*  
  配置图片如何调整大小以适应分配的空间。

### `FileImageProps`

- **`filePath`** *(string, 必需)*  
  本地图像文件的路径。

- **`resizable`** *(ImageResizable, 可选)*  
  配置图片如何调整大小以适应分配的空间。

### `UIImageProps`

- **`image`** *(UIImage, 必需)*  
  要显示的 `UIImage` 对象。

- **`resizable`** *(ImageResizable, 可选)*  
  配置图片如何调整大小以适应分配的空间。

### `CommonViewProps`

适用于 `Image` 组件及其他视图的修饰符：

- **`scaleToFit`** *(boolean, 可选)*  
  将视图缩放以适应其父容器。

- **`scaleToFill`** *(boolean, 可选)*  
  将视图缩放以填充其父容器。

- **`aspectRatio`** *(object, 可选)*  
  配置视图的宽高比：  
  - **`value`** *(number 或 null, 可选)*: 宽高比值。如果为 `null`，保持当前宽高比。  
  - **`contentMode`** *(ContentMode, 必需)*: 决定内容是适应还是填充其父容器。

- **`imageScale`** *(ImageScale, 可选)*  
  调整视图中的图片大小。可选值：`'large'`、`'medium'`、`'small'`。

- **`foregroundStyle`** *(ShapeStyle 或 DynamicShapeStyle 或 object, 可选)*  
  配置视图的前景样式：  
  - **`primary`**: 主前景元素的样式。  
  - **`secondary`**: 次前景元素的样式。  
  - **`tertiary`** *(可选)*: 第三前景元素的样式。

---

## **Image 组件**

`Image` 是一个函数组件，基于提供的来源渲染图片，并支持上述修饰符。

### 支持的来源：
1. **系统图标**: 使用 `systemName` 渲染。
2. **网络图片**: 通过 `imageUrl` 加载 URL。
3. **本地图像文件**: 使用文件路径 `filePath` 渲染。
4. **`UIImage` 对象**: 直接使用 `UIImage` 实例渲染。

---

## **使用示例**

1. **带宽高比和缩放的系统图标**

```tsx
<Image
  systemName="square.and.arrow.up.circle"
  scaleToFit={true}
  aspectRatio={{ value: 1.0, contentMode: "fit" }}
  imageScale="medium"
  foregroundStyle={{
    primary: "blue",
    secondary: "gray",
  }}
/>
```

2. **带占位视图和前景样式的网络图片**

```tsx
<Image
  imageUrl="https://example.com/image.png"
  placeholder={<Text>加载中...</Text>}
/>
```

3. **带自定义缩放的本地图像文件**

```tsx
<Image
  filePath="/path/to/image.png"
  resizable={{
    capInsets: { top: 5, left: 5, bottom: 5, right: 5 },
    resizingMode: "tile",
  }}
/>
```

4. **带缩放和宽高比的 `UIImage` 对象**

```tsx
import { UIImage } from 'scripting'

const myImage = UIImage.createFromFile('/path/to/image.png')

<Image
  image={myImage}
  scaleToFill={true}
  aspectRatio={{ value: null, contentMode: "fill" }}
/>
```

---

## 注意事项
- 组合使用修饰符如 `scaleToFit`、`scaleToFill` 和 `aspectRatio`，以实现精确的布局配置。
- 使用 `foregroundStyle` 属性可详细设置图标或形状等元素的样式。
- 确保网络图片 URL 有效且可访问，以便正确渲染。
- 对于系统图标，请核对 `systemName` 是否在 SF Symbols 库中可用。