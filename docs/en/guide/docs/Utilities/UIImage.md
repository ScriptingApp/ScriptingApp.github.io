---
title: UIImage
---
The `UIImage` class represents an image that can be loaded from a file or binary data. It provides access to image dimensions and can be used for encoding, conversion, and display. `UIImage` is compatible with UI components and binary utilities such as `Data.fromPNG()` or `Data.fromJPEG()`.

---

## Overview

`UIImage` serves as:

* A representation of image content (PNG, JPEG, etc.).
* An input for encoding into binary formats (`Data`).
* A data source for displaying images in UI components.
* A base unit for handling light/dark appearance-specific images via `DynamicImageSource`.

---

## Properties

### `width: number`

Returns the width of the image in pixels.

```ts
const image = UIImage.fromFile("/path/to/image.jpg")
console.log(image?.width)
```

---

### `height: number`

Returns the height of the image in pixels.

```ts
const image = UIImage.fromFile("/path/to/image.jpg")
console.log(image?.height)
```

---

## Static Methods

### `UIImage.fromFile(filePath: string): UIImage | null`

Creates a `UIImage` instance from a file path.

* **Parameters:**

  * `filePath`: A string path to a local image file (`.png`, `.jpg`, etc.).

* **Returns:** A `UIImage` object if the file is valid and readable, otherwise `null`.

* **Example:**

  ```ts
  const image = UIImage.fromFile("/path/to/tmp/photo.png")
  if (image) {
    console.log(`Image size: ${image.width} x ${image.height}`)
  }
  ```

---

### `UIImage.fromData(data: Data): UIImage | null`

Creates a `UIImage` from binary image data.

* **Parameters:**

  * `data`: A `Data` object containing valid image data (PNG or JPEG).

* **Returns:** A `UIImage` instance or `null` if the data is not a valid image.

* **Example:**

  ```ts
  const data = Data.fromFile("/path/to/sample.jpg")
  const image = data ? UIImage.fromData(data) : null
  ```

---

## Using `UIImage` with the `Image` Component

`UIImage` can be rendered in the UI using the built-in `Image` component.

### Component: `Image`

```ts
declare const Image: FunctionComponent<UIImageProps>
```

### Props: `UIImageProps`

```ts
type UIImageProps = {
  image: UIImage | DynamicImageSource<UIImage>
}
```

* `image`: The image to render, either a single `UIImage`, or a `DynamicImageSource<UIImage>` that provides different images for light and dark mode.

---

### Type: `DynamicImageSource<T>`

```ts
type DynamicImageSource<T> = {
  light: T
  dark: T
}
```

Use this type to assign different images based on the system color scheme.

---

### Example: Displaying a Static Image

```ts
const image = UIImage.fromFile("/path/to/avatar.png")

<Image image={image} />
```

---

### Example: Supporting Light and Dark Mode

```ts
const lightImage = UIImage.fromFile("/path/to/images/light-logo.png")
const darkImage = UIImage.fromFile("/path/to/images/dark-logo.png")

<Image image={{ light: lightImage, dark: darkImage }} />
```

---

## Common Use Cases

### Convert an Image to Base64

```ts
const image = UIImage.fromFile("/path/to/image.png")
const data = image ? Data.fromPNG(image) : null
const base64 = data?.toBase64String()
```

---

### Convert an Image to JPEG with Compression

```ts
const image = UIImage.fromFile("/path/to/photo.jpg")
const jpeg = image ? Data.fromJPEG(image, 0.7) : null
```

---

### Display an Image in UI

```ts
const image = UIImage.fromFile("/path/to/logo.png")

<Image image={image} />
```

---

## Summary

The `UIImage` class is a core utility for image handling within the Scripting app. It supports:

* Reading from file system or binary data.
* Image dimension introspection.
* Encoding as PNG/JPEG via `Data`.
* Display in UI with `Image` component.
* Light/dark mode adaptability through `DynamicImageSource`.
