---
title: Pasteboard

---

The `Pasteboard` namespace provides a complete interface for reading, writing, and observing system pasteboard (clipboard) changes in the **Scripting app**.
Compared to the deprecated `Clipboard` API, `Pasteboard` offers more robust features, including:

* Support for multiple data types (text, images, URLs, binary data, etc.)
* Change event callbacks (`onChanged` and `onRemoved`)
* Privacy controls such as `localOnly` and expiration time

> **Note**
> To allow pasting from other apps, go to:
> **Settings > Scripting > Paste from Other Apps > Allow**

---

## Namespace: `Pasteboard`

### Type Definition

#### `Item`

Represents a pasteboard item.
Each item is a map (`Record<UTType, string | UIImage | Data>`) where the key is a data type (`UTType`) and the value can be a string, image, or binary data.

Common types:

* `public.plain-text` → plain text
* `public.url` → URL string
* `public.jpeg` / `public.png` → image (`UIImage`)
* `public.data` → binary data (`Data`)

**Example**

```ts
const item: Pasteboard.Item = {
  "public.plain-text": "Hello, world!",
  "public.url": "https://example.com"
}
```

---

## Properties

### `hasStrings: Promise<boolean>`

Checks whether the pasteboard contains text content.

**Example**

```ts
if (await Pasteboard.hasStrings) {
  console.log("Pasteboard contains text")
}
```

---

### `hasImages: Promise<boolean>`

Checks whether the pasteboard contains images.

**Example**

```ts
if (await Pasteboard.hasImages) {
  console.log("Pasteboard contains images")
}
```

---

### `hasURLs: Promise<boolean>`

Checks whether the pasteboard contains URLs.

**Example**

```ts
if (await Pasteboard.hasURLs) {
  console.log("Pasteboard contains URLs")
}
```

---

### `numberOfItems: Promise<number>`

Returns the number of items currently stored in the pasteboard.

**Example**

```ts
const count = await Pasteboard.numberOfItems
console.log(`The pasteboard contains ${count} items`)
```

---

### `changeCount: Promise<number>`

Returns the number of times the pasteboard contents have changed since system startup.
This value increases whenever the pasteboard is modified (items added, updated, or removed).

**Example**

```ts
const changeCount = await Pasteboard.changeCount
console.log("Pasteboard change count:", changeCount)
```

---

## Text Operations

### `getString(): Promise<string | null>`

Retrieves the text string of the first pasteboard item.

**Example**

```ts
const text = await Pasteboard.getString()
if (text) console.log("Pasteboard text:", text)
```

---

### `setString(string: string | null): Promise<void>`

Sets the text string of the first pasteboard item.

**Example**

```ts
await Pasteboard.setString("Scripting is powerful!")
```

---

### `getStrings(): Promise<string[] | null>`

Retrieves all text strings from the pasteboard.

**Example**

```ts
const texts = await Pasteboard.getStrings()
console.log(texts)
```

---

### `setStrings(strings: string[] | null): Promise<void>`

Sets multiple text strings to the pasteboard (each string becomes a separate item).

**Example**

```ts
await Pasteboard.setStrings(["Apple", "Banana", "Cherry"])
```

---

## URL Operations

### `getURL(): Promise<string | null>`

Retrieves the first URL string from the pasteboard.

**Example**

```ts
const url = await Pasteboard.getURL()
if (url) console.log("Pasteboard URL:", url)
```

---

### `setURL(url: string | null): Promise<void>`

Sets a URL string as the first pasteboard item.

**Example**

```ts
await Pasteboard.setURL("https://example.com")
```

---

### `getURLs(): Promise<string[] | null>`

Retrieves all URL strings from the pasteboard.

**Example**

```ts
const urls = await Pasteboard.getURLs()
console.log(urls)
```

---

### `setURLs(urls: string[] | null): Promise<void>`

Sets multiple URLs to the pasteboard.

**Example**

```ts
await Pasteboard.setURLs([
  "https://apple.com",
  "https://openai.com"
])
```

---

## Image Operations

### `getImage(): Promise<UIImage | null>`

Retrieves the first image (`UIImage`) from the pasteboard.

**Example**

```ts
const img = await Pasteboard.getImage()
if (img) console.log("Image retrieved from pasteboard")
```

---

### `setImage(image: UIImage | null): Promise<void>`

Sets the first pasteboard item to an image.

**Example**

```ts
await Pasteboard.setImage(myImage)
```

---

### `getImages(): Promise<UIImage[] | null>`

Retrieves all image objects from the pasteboard.

**Example**

```ts
const images = await Pasteboard.getImages()
console.log(`Retrieved ${images?.length ?? 0} images`)
```

---

### `setImages(images: UIImage[] | null): Promise<void>`

Sets multiple images to the pasteboard.

**Example**

```ts
await Pasteboard.setImages([img1, img2, img3])
```

---

## Item Management

### `addItems(items: Item[]): Promise<void>`

Appends new items to the existing pasteboard content without clearing it.

**Example**

```ts
await Pasteboard.addItems([
  { "public.plain-text": "First item" },
  { "public.url": "https://example.com" }
])
```

---

### `setItems(items: Item[], options?: { localOnly?: boolean, expirationDate?: Date }): Promise<void>`

Replaces the pasteboard contents with new items and applies optional privacy settings.

**Parameters**

* `items`: An array of pasteboard items.
* `options.localOnly`: If `true`, prevents the pasteboard content from being shared to other devices via Handoff.
* `options.expirationDate`: Sets an expiration time after which the system automatically removes the content.

**Example**

```ts
await Pasteboard.setItems(
  [
    { "public.plain-text": "Sensitive Info" }
  ],
  {
    localOnly: true,
    expirationDate: new Date(Date.now() + 60 * 1000) // Expires in 1 minute
  }
)
```

---

### `getItems(): Promise<Item[] | null>`

Retrieves all pasteboard items as an array of `Pasteboard.Item` objects.

**Example**

```ts
const items = await Pasteboard.getItems()
console.log(items)
```

---

## Event Callbacks

### `onChanged: ((addedKeys: string[]) => void) | null | undefined`

Called when the pasteboard content changes.
The parameter `addedKeys` is an array of the added representation types (`UTType`).

**Example**

```ts
Pasteboard.onChanged = addedKeys => {
  console.log("Added pasteboard types:", addedKeys)
}
```

---

### `onRemoved: ((removedKeys: string[]) => void) | null | undefined`

Called when content is removed from the pasteboard.
The parameter `removedKeys` is an array of the removed representation types (`UTType`).

**Example**

```ts
Pasteboard.onRemoved = removedKeys => {
  console.log("Removed pasteboard types:", removedKeys)
}
```

---

## Deprecated Clipboard API

The legacy `Clipboard` namespace is **deprecated** and retained only for backward compatibility.

| Deprecated Method                  | Replacement                  |
| ---------------------------------- | ---------------------------- |
| `Clipboard.copyText(text: string)` | `Pasteboard.setString(text)` |
| `Clipboard.getText()`              | `Pasteboard.getString()`     |

---

## Best Practices

* Always use the new `Pasteboard` API instead of `Clipboard`.
* Use `changeCount` to detect when pasteboard contents have changed.
* Use `expirationDate` to automatically clear sensitive data after a specific duration.
* Set `localOnly: true` for data that should not sync across devices.
* Use `hasStrings`, `hasImages`, and `hasURLs` to check available content types before reading.
* Use `onChanged` and `onRemoved` callbacks to react in real time to pasteboard updates.
