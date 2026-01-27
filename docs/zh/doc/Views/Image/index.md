---
title: 图像

---
        
`Image` 组件用于展示图片，支持来自多种来源的图像，包括系统图标、网络图片、本地文件以及 `UIImage` 对象。同时，它还支持根据浅色 / 深色模式动态切换图片资源，并提供多个视图修饰符用于自定义图像的行为和外观。

---

## **类型定义**

### `ImageResizable`

定义图片的缩放方式：

* **`boolean` 类型**：

  * `true`: 启用默认缩放行为。
  * `false`: 禁用缩放。

* **`object` 类型**：

  * **`capInsets`** *(可选)*: `EdgeInsets`
    设置图片拉伸的边距，用于控制哪些区域被拉伸，哪些保持不变。

  * **`resizingMode`** *(可选)*: `ImageResizingMode`
    设置图片的拉伸模式，例如缩放（stretch）或平铺（tile）。

### `ImageScale`

设置图像在视图中的相对大小：

* `'large'`：较大尺寸
* `'medium'`：中等尺寸
* `'small'`：较小尺寸

### `DynamicImageSource<T>`

用于根据系统的浅色或深色模式动态切换图片资源：

```ts
type DynamicImageSource<T> = {
  dark: T
  light: T
}
```

可用于以下字段：

* `imageUrl`: 网络图片
* `filePath`: 本地图片
* `image`: `UIImage` 对象

---

## **图片来源参数类型**

### `SystemImageProps`

* **`systemName`** *(string, 必填)*
  系统图标名称。可在 [SF Symbols 官网](https://developer.apple.com/design/resources/#sf-symbols) 或 [SF Symbols Browser App](https://apps.apple.com/cn/app/sf-symbols-reference/id1491161336?l=en-GB) 中查看所有图标。

* **`variableValue`** *(number, 可选)*
  一个介于 `0.0` 到 `1.0` 之间的值，用于动态调整支持变量图标的外观。若图标不支持变量值，此项无效。

* **`resizable`** *(ImageResizable, 可选)*
  设置图像的缩放方式。

### `NetworkImageProps`

* **`imageUrl`** *(string | DynamicImageSource\<string\>, 必填)*
  图片的网络 URL 地址。支持使用 `DynamicImageSource` 实现浅色/深色模式下切换图片。

* **`placeholder`** *(VirtualNode, 可选)*
  图片加载完成前显示的占位视图。

* **`resizable`** *(ImageResizable, 可选)*
  设置图像的缩放方式。

### `FileImageProps`

* **`filePath`** *(string | DynamicImageSource\<string\>, 必填)*
  本地图片文件的路径。支持使用 `DynamicImageSource` 动态切换。

* **`resizable`** *(ImageResizable, 可选)*
  设置图像的缩放方式。

### `UIImageProps`

* **`image`** *(UIImage | DynamicImageSource\<UIImage\>, 必填)*
  一个 `UIImage` 对象。支持动态切换 `UIImage` 对象以适应浅色/深色模式。

* **`resizable`** *(ImageResizable, 可选)*
  设置图像的缩放方式。

---

## **通用视图修饰符（CommonViewProps）**

* **`scaleToFit`** *(boolean, 可选)*
  缩放图像以适配容器大小。

* **`scaleToFill`** *(boolean, 可选)*
  缩放图像以填满容器。

* **`aspectRatio`** *(object, 可选)*
  设置图像宽高比例：

  * **`value`** *(number 或 null, 可选)*：宽高比。为 null 时保持原始比例。
  * **`contentMode`** *(ContentMode, 必填)*：设置是适配（fit）还是填充（fill）。

* **`imageScale`** *(ImageScale, 可选)*
  设置图像缩放等级。可选值：`'large'`、`'medium'`、`'small'`

* **`foregroundStyle`** *(ShapeStyle | DynamicShapeStyle | object, 可选)*
  设置前景样式，可用于系统图标等：

  * **`primary`**：主前景颜色或样式
  * **`secondary`**：辅助前景样式
  * **`tertiary`** *(可选)*：第三前景样式

---

### 图像渲染行为（ImageRenderingBehaviorProps）

| 属性                            | 类型                                      | 默认值          | 说明                                           |
| ----------------------------- | --------------------------------------- | ------------ | -------------------------------------------- |
| `resizable`                   | `boolean \| object`                     | `false`      | 控制图像是否自适应尺寸（详见下方）                            |
| `renderingMode`               | `'original' \| 'template'`              | `'original'` | 设置图像渲染模式，`template` 可使用 `foregroundColor` 着色 |
| `interpolation`               | `'none' \| 'low' \| 'medium' \| 'high'` | `'medium'`   | 设置图像缩放时的插值质量                                 |
| `antialiased`                 | `boolean`                               | `false`      | 是否开启抗锯齿边缘渲染                                  |
| `widgetAccentedRenderingMode` | `WidgetAccentedRenderingMode`           | -            | 控制在 Widget 的强调模式下的图像渲染方式（仅 Widget 有效）        |

---

## **使用示例**

1. **根据浅色/深色模式切换网络图片**

```tsx
<Image
  imageUrl={{
    light: "https://example.com/image-light.png",
    dark: "https://example.com/image-dark.png"
  }}
  placeholder={<Text>加载中...</Text>}
/>
```

2. **本地图片动态切换**

```tsx
<Image
  filePath={{
    light: Path.join(Script.directory, "light.jpg"),
    dark: Path.join(Script.directory, "dark.jpg")
  }}
  resizable={true}
/>
```

3. **UIImage 动态切换**

```tsx
const lightImage = UIImage.fromFile('/path/light.png')
const darkImage = UIImage.fromFile('/path/dark.png')

<Image image={{ light: lightImage, dark: darkImage }} />
```

4. **系统图标，设置缩放和宽高比**

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

---

## 注意事项

* 通过 `DynamicImageSource` 可以实现根据系统外观自动切换图片资源，适配浅色/深色主题。
* 可以组合使用 `scaleToFit`、`scaleToFill`、`aspectRatio` 等修饰符，灵活控制布局。
* `foregroundStyle` 可用于精细控制图标或图形的配色样式。
* 使用网络图片时请确保 URL 可访问；使用本地路径时确保文件存在。
