---
title: FormData

---

The `FormData` class provides a way to construct key/value pairs representing form fields and their values.
It is mainly used for building `multipart/form-data` requests that can include both text and binary data (such as files or images).

In the **Scripting app**, `FormData` is fully compatible with the standard **Fetch API**, allowing you to send data through `fetch()` with mixed text and file fields.

---

## Definition

```ts
class FormData {
  private formData
  append(name: string, value: string): void
  append(name: string, value: Data, mimeType: string, filename?: string): void
  get(name: string): string | Data | null
  getAll(name: string): any[]
  has(name: string): boolean
  delete(name: string): void
  set(name: string, value: string): void
  set(name: string, value: Data, filename?: string): void
  forEach(callback: (value: any, name: string, parent: FormData) => void): void
  entries(): [string, any][]
  toJson(): Record<string, any>
}
```

---

## Purpose

`FormData` is used to:

* Build `multipart/form-data` requests with text and file fields.
* Upload files (images, documents, audio, etc.) with metadata.
* Replace JSON-based bodies when binary data is included.

---

## Methods

### `append(name: string, value: string): void`

### `append(name: string, value: Data, mimeType: string, filename?: string): void`

Appends a new field to the form.
Can be used to add both text and file fields.

#### Parameters

| Parameter    | Type                  | Description                                                                                     |
| ------------ | --------------------- | ----------------------------------------------------------------------------------------------- |
| **name**     | `string`              | The name of the form field.                                                                     |
| **value**    | `string` | `Data`     | The value of the field (text or binary data).                                                   |
| **mimeType** | `string`              | The MIME type of the file (e.g., `"image/png"`). Required only when `value` is a `Data` object. |
| **filename** | `string` *(optional)* | The filename to include for file uploads.                                                       |

#### Example

```tsx
const form = new FormData()
form.append("username", "Tom")
form.append("file", Data.fromFile("/path/to/image.png"), "image/png", "avatar.png")
```

---

### `set(name: string, value: string): void`

### `set(name: string, value: Data, filename?: string): void`

Sets a form field, replacing any existing field with the same name.
Unlike `append()`, this overwrites previous values.

#### Example

```tsx
const form = new FormData()
form.set("message", "Hello world")
form.set("file", Data.fromFile("/path/to/file.txt"), "text/plain", "note.txt")
```

---

### `get(name: string): string | Data | null`

Retrieves the value of a form field.
Returns `null` if the field does not exist.

#### Example

```tsx
const form = new FormData()
form.append("title", "My Post")
console.log(form.get("title")) // "My Post"
```

---

### `getAll(name: string): any[]`

Returns all values associated with a given field name (useful when using multiple `append()` calls with the same name).

#### Example

```tsx
const form = new FormData()
form.append("tag", "swift")
form.append("tag", "ios")
form.append("tag", "scripting")

console.log(form.getAll("tag")) // ["swift", "ios", "scripting"]
```

---

### `has(name: string): boolean`

Checks whether a form field exists.

#### Example

```tsx
const form = new FormData()
form.append("username", "Tom")

console.log(form.has("username")) // true
console.log(form.has("password")) // false
```

---

### `delete(name: string): void`

Deletes the specified field and all of its values.

#### Example

```tsx
const form = new FormData()
form.append("title", "Hello")
form.append("file", Data.fromFile("/path/to/file.txt"), "text/plain")

form.delete("file")
```

---

### `forEach(callback: (value: any, name: string, parent: FormData) => void): void`

Iterates over all form fields and invokes the callback function for each one.

#### Example

```tsx
const form = new FormData()
form.append("user", "Tom")
form.append("age", "25")

form.forEach((value, name) => {
  console.log(`${name}: ${value}`)
})
```

---

### `entries(): [string, any][]`

Returns an array of `[name, value]` pairs for all form fields.

#### Example

```tsx
const form = new FormData()
form.append("username", "Tom")
form.append("age", "25")
console.log(form.entries())
// [["username", "Tom"], ["age", "25"]]
```

---

### `toJson(): Record<string, any>`

Converts the form data into a plain JSON object for debugging or logging.
If the form contains binary data (`Data` objects), those fields will be represented as descriptive placeholders instead of raw binary data.

#### Example

```tsx
const form = new FormData()
form.append("name", "Tom")
form.append("photo", Data.fromFile("/path/to/avatar.png"), "image/png", "avatar.png")

console.log(form.toJson())
// { name: "Tom", photo: "[Data: image/png]" }
```

---

## Usage Examples

### Example 1 — Upload a File

```tsx
const form = new FormData()
form.append("file", Data.fromFile("/path/to/image.png"), "image/png", "avatar.png")
form.append("userId", "1234")

const response = await fetch("https://api.example.com/upload", {
  method: "POST",
  body: form,
})

console.log(await response.json())
```

---

### Example 2 — Upload Multiple Files

```tsx
const form = new FormData()
form.append("files", Data.fromFile("/path/to/photo1.jpg"), "image/jpeg", "photo1.jpg")
form.append("files", Data.fromFile("/path/to/photo2.jpg"), "image/jpeg", "photo2.jpg")

await fetch("https://api.example.com/multi-upload", {
  method: "POST",
  body: form,
})
```

---

### Example 3 — Mixed Text and File Fields

```tsx
const form = new FormData()
form.append("title", "Travel Memories")
form.append("description", "A collection of travel photos.")
form.append("cover", Data.fromFile("/path/to/cover.png"), "image/png", "cover.png")

const response = await fetch("https://example.com/uploadPost", {
  method: "POST",
  body: form,
})

console.log(await response.text())
```

---

### Example 4 — Iterating and Debugging

```tsx
const form = new FormData()
form.append("name", "Alice")
form.append("file", Data.fromFile("/path/to/file.txt"), "text/plain", "file.txt")

form.forEach((value, name) => {
  console.log(`${name}:`, value instanceof Data ? "Binary Data" : value)
})
```

---

## Relationships with Other Classes

| Class          | Description                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------- |
| **`fetch()`**  | Accepts `FormData` as a request body; automatically sets `Content-Type` to `multipart/form-data`. |
| **`Data`**     | Used to represent binary content (e.g., files, images) added to form fields.                      |
| **`Request`**  | A `FormData` instance can be passed to `RequestInit.body`.                                        |
| **`Response`** | You can use `response.formData()` to parse a multipart response into a `FormData` object.         |

---

## Notes

* **Automatic Content-Type:** When you pass a `FormData` instance to `fetch()`, the app automatically sets the correct `Content-Type` header (with a boundary). Do not manually set it.
* **Multiple Fields:** Use `append()` to add multiple values with the same name.
* **Binary Uploads:** Always provide a MIME type for binary uploads. Otherwise, the data defaults to `application/octet-stream`.
* **JSON Conversion:** The `toJson()` method is intended for debugging and should not be used for actual data transmission.

---

## Summary

`FormData` is the **core class for building multipart/form-data requests** in the Scripting app.
It provides a flexible and developer-friendly API for combining text and binary fields, integrating seamlessly with `fetch()` and `Data`.

### Key Features

* Fully compatible with the Fetch API
* Supports text and file uploads
* Automatically handles multipart boundaries
* Useful debugging utilities (`entries()`, `toJson()`)
* Integrates natively with `Data`, `Request`, and `Response`
