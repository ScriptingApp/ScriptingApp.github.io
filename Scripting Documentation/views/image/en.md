The `Image` component in the **Scripting app** allows you to display images from various sources, such as system symbols, network URLs, local files, or `UIImage` objects. Additionally, several view modifiers are available to customize the behavior and appearance of the `Image` component.

---

## **Type Definitions**

### `ImageResizable`

Defines how the image should be resized:

- **`boolean`**: 
  - `true`: Enables default resizing.
  - `false`: Disables resizing.
- **`object`**:
  - `capInsets` *(optional)*: `EdgeInsets`  
    Defines insets for image stretching to control which parts of the image stretch and which remain fixed.
  - `resizingMode` *(optional)*: `ImageResizingMode`  
    Specifies the resizing mode, such as scaling or tiling.

### `ImageScale`

Specifies relative image sizes available within the view:

- `'large'`: Renders the image at a large size.
- `'medium'`: Renders the image at a medium size.
- `'small'`: Renders the image at a small size.

### `SystemImageProps`

- **`systemName`** *(string, required)*  
  The name of a system-provided symbol.  
  Refer to the [SF Symbols](https://developer.apple.com/design/resources/#sf-symbols) library or use the [SF Symbols Browser](https://apps.apple.com/cn/app/sf-symbols-reference/id1491161336?l=en-GB) app to browse available symbol names.

- **`variableValue`** *(number, optional)*  
  A value between `0.0` and `1.0` for customizing the appearance of a variable symbol.  
  *(Has no effect for symbols that do not support variable values.)*

- **`resizable`** *(ImageResizable, optional)*  
  Configures how the image is resized to fit its allocated space.

### `NetworkImageProps`

- **`imageUrl`** *(string, required)*  
  The URL of the image to load.

- **`placeholder`** *(VirtualNode, optional)*  
  A view displayed while the image is loading.

- **`resizable`** *(ImageResizable, optional)*  
  Configures how the image is resized to fit its allocated space.

### `FileImageProps`

- **`filePath`** *(string, required)*  
  The path to the local image file.

- **`resizable`** *(ImageResizable, optional)*  
  Configures how the image is resized to fit its allocated space.

### `UIImageProps`

- **`image`** *(UIImage, required)*  
  A `UIImage` object to display.

- **`resizable`** *(ImageResizable, optional)*  
  Configures how the image is resized to fit its allocated space.

### `CommonViewProps`

Modifiers applicable to the `Image` component and other views:

- **`scaleToFit`** *(boolean, optional)*  
  Scales the view to fit its parent container.

- **`scaleToFill`** *(boolean, optional)*  
  Scales the view to fill its parent container.

- **`aspectRatio`** *(object, optional)*  
  Configures the view's aspect ratio:
  - **`value`** *(number or null, optional)*: The width-to-height ratio. If `null`, maintains the current aspect ratio.
  - **`contentMode`** *(ContentMode, required)*: Determines whether the content fits or fills its parent.

- **`imageScale`** *(ImageScale, optional)*  
  Adjusts the size of images within the view. Options: `'large'`, `'medium'`, `'small'`.

- **`foregroundStyle`** *(ShapeStyle or DynamicShapeStyle or object, optional)*  
  Configures the view's foreground elements:
  - **`primary`**: Style for the primary foreground elements.
  - **`secondary`**: Style for secondary elements.
  - **`tertiary`** *(optional)*: Style for tertiary elements.

---

## **Image Component**

`Image` is a functional component that renders an image based on the provided source and supports the aforementioned modifiers.

### Supported Sources:
1. **System Symbols**: Rendered using `systemName`.
2. **Network Images**: Loaded from a URL via `imageUrl`.
3. **Local Files**: Rendered using a file path via `filePath`.
4. **`UIImage` Objects**: Rendered directly using a `UIImage` instance.

---

## **Usage Examples**

1. **System Symbol with Aspect Ratio and Scaling**

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

2. **Network Image with Placeholder and Foreground Style**

```tsx
<Image
  imageUrl="https://example.com/image.png"
  placeholder={<Text>Loading...</Text>}
/>
```

3. **Local File Image with Custom Resizing**

```tsx
<Image
  filePath="/path/to/image.png"
  resizable={{
    capInsets: { top: 5, left: 5, bottom: 5, right: 5 },
    resizingMode: "tile",
  }}
/>
```

4. **`UIImage` Object with Scale and Aspect Ratio**

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

## Notes
- Combine view modifiers like `scaleToFit`, `scaleToFill`, and `aspectRatio` to achieve precise layout configurations.
- Use the `foregroundStyle` property for detailed styling of elements like icons or shapes within the `Image` view.
- Ensure network image URLs are valid and reachable for proper rendering.
- For system symbols, verify the `systemName` against the SF Symbols library to ensure availability.

