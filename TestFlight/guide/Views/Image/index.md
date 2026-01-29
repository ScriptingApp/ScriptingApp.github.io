# Image

The `Image` component allows you to display images from various sources, such as system symbols, network URLs, local files, or `UIImage` objects. It supports dynamic image sources that change based on light or dark color schemes. Additionally, several view modifiers are available to customize the behavior and appearance of the `Image` component.

***

## **Type Definitions**

### `ImageResizable`

Defines how the image should be resized:

- **`boolean`**:

  - `true`: Enables default resizing.
  - `false`: Disables resizing.

- **`object`**:

  - `capInsets` _(optional)_: `EdgeInsets`
    Defines insets for image stretching to control which parts of the image stretch and which remain fixed.

  - `resizingMode` _(optional)_: `ImageResizingMode`
    Specifies the resizing mode, such as scaling or tiling.

### `ImageScale`

Specifies relative image sizes available within the view:

- `'large'`: Renders the image at a large size.
- `'medium'`: Renders the image at a medium size.
- `'small'`: Renders the image at a small size.

### `DynamicImageSource<T>`

Defines a dynamic source that changes based on the system color scheme:

```ts
type DynamicImageSource<T> = {
  dark: T
  light: T
}
```

Used for adapting the image resource for light/dark modes. Supported in:

- `imageUrl` (network images)
- `filePath` (local file images)
- `image` (`UIImage` objects)

***

## **Source Props**

### `SystemImageProps`

- **`systemName`** _(string, required)_
  The name of a system-provided symbol.
  Refer to the [SF Symbols](https://developer.apple.com/design/resources/#sf-symbols) library or use the [SF Symbols Browser](https://apps.apple.com/cn/app/sf-symbols-reference/id1491161336?l=en-GB) app to browse available symbol names.

- **`variableValue`** _(number, optional)_
  A value between `0.0` and `1.0` for customizing the appearance of a variable symbol.
  _(Has no effect for symbols that do not support variable values.)_

- **`resizable`** _(ImageResizable, optional)_
  Configures how the image is resized to fit its allocated space.

### `NetworkImageProps`

- **`imageUrl`** _(string | DynamicImageSource\<string>, required)_
  The URL of the image to load. Supports dynamic sources via `DynamicImageSource`.

- **`placeholder`** _(VirtualNode, optional)_
  A view displayed while the image is loading.

- **`resizable`** _(ImageResizable, optional)_
  Configures how the image is resized to fit its allocated space.

### `FileImageProps`

- **`filePath`** _(string | DynamicImageSource\<string>, required)_
  The path to the local image file. Supports dynamic sources via `DynamicImageSource`.

- **`resizable`** _(ImageResizable, optional)_
  Configures how the image is resized to fit its allocated space.

### `UIImageProps`

- **`image`** _(UIImage | DynamicImageSource\<UIImage>, required)_
  A `UIImage` object to display. Supports dynamic sources via `DynamicImageSource`.

- **`resizable`** _(ImageResizable, optional)_
  Configures how the image is resized to fit its allocated space.

***

## **CommonViewProps**

Modifiers applicable to the `Image` component and other views:

- **`scaleToFit`** _(boolean, optional)_
  Scales the view to fit its parent container.

- **`scaleToFill`** _(boolean, optional)_
  Scales the view to fill its parent container.

- **`aspectRatio`** _(object, optional)_
  Configures the view's aspect ratio:

  - **`value`** _(number or null, optional)_: The width-to-height ratio. If `null`, maintains the current aspect ratio.
  - **`contentMode`** _(ContentMode, required)_: Determines whether the content fits or fills its parent.

- **`imageScale`** _(ImageScale, optional)_
  Adjusts the size of images within the view. Options: `'large'`, `'medium'`, `'small'`.

- **`foregroundStyle`** _(ShapeStyle or DynamicShapeStyle or object, optional)_
  Configures the view's foreground elements:

  - **`primary`**: Style for the primary foreground elements.
  - **`secondary`**: Style for secondary elements.
  - **`tertiary`** _(optional)_: Style for tertiary elements.

***

### Rendering Behavior (`ImageRenderingBehaviorProps`)

| Prop                          | Type                                        | Default      | Description                                                     |
| ----------------------------- | ------------------------------------------- | ------------ | --------------------------------------------------------------- |
| `resizable`                   | `boolean \| object`                         | `false`      | Controls whether the image resizes to fit its frame (see below) |
| `renderingMode`               | `'original' \| 'template'`                  | `'original'` | Use `"template"` to allow tinting via `foregroundColor`         |
| `interpolation`               | `'none' \| 'low' \| 'medium' \| 'high'`     | `'medium'`   | Sets interpolation quality when scaling the image               |
| `antialiased`                 | `boolean`                                   | `false`      | Whether the image should use anti-aliasing                      |
| `widgetAccentedRenderingMode` | `WidgetAccentedRenderingMode` (Widget-only) | —            | Defines how the image renders in Widget accented mode           |

***

## **Usage Examples**

1. **Dynamic Network Image Based on Color Scheme**

```tsx
<Image
  imageUrl={{
    light: "https://example.com/image-light.png",
    dark: "https://example.com/image-dark.png"
  }}
  placeholder={<Text>Loading...</Text>}
/>
```

2. **Dynamic Local File Image**

```tsx
<Image
  filePath={{
    light: Path.join(Script.directory, "light-mode.jpg"),
    dark: Path.join(Script.directory, "dark-mode.jpg")
  }}
  resizable={true}
/>
```

3. **Dynamic UIImage Object**

```tsx
const lightImg = UIImage.fromFile('/path/to/light.png')
const darkImg = UIImage.fromFile('/path/to/dark.png')

<Image image={{ light: lightImg, dark: darkImg }} />
```

4. **System Symbol with Aspect Ratio and Scaling**

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

***

## Notes

- Use `DynamicImageSource` to adapt images for light/dark mode with minimal logic.
- Combine view modifiers like `scaleToFit`, `scaleToFill`, and `aspectRatio` to achieve precise layout configurations.
- Use the `foregroundStyle` property for detailed styling of icons or symbols.
- Ensure URLs and file paths provided for dynamic image sources are valid and accessible.
