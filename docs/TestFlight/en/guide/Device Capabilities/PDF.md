---
title: PDF
description: A high-level interface for interacting with PDF files.

---

The `PDFDocument` and `PDFPage` classes in the **Scripting** app provide a simplified and powerful interface for working with PDF files, including reading, editing, and exporting content. Both synchronous and asynchronous methods are supported for optimal flexibility.

---

## `PDFPage` Class

Represents a single page within a PDF document. It offers access to text content, raw data, and related metadata.

### Static Methods

#### `PDFPage.fromImage(image: UIImage): PDFPage | null`

Creates a new PDF page from the given image.

* **Parameters**:

  * `image`: The image to convert into a PDF page.
* **Returns**: A `PDFPage` instance, or `null` if creation fails.

---

### Properties

#### `document: PDFDocument | null`

The parent `PDFDocument` instance this page belongs to, or `null` if it hasn’t been added to a document yet.

#### `label: string | null`

A user-visible label for the page, such as a page title.

#### `numberOfCharacters: number`

The total number of text characters on the page.

---

### Asynchronous Getters

#### `string: Promise<string | null>`

Returns the text content of the page. May return `null` if the page contains only images or non-text content.

#### `data: Promise<Data | null>`

Returns the raw binary representation of the page.

---

## `PDFDocument` Class

Represents an entire PDF document. This class enables reading, inspecting, editing pages, and saving the document.

---

### Static Methods

#### `PDFDocument.fromData(data: Data): PDFDocument | null`

Creates a new document from raw PDF data.

* **Parameters**:

  * `data`: A valid PDF binary buffer.
* **Returns**: A `PDFDocument` instance or `null` if the data is invalid.

#### `PDFDocument.fromFilePath(filePath: string): PDFDocument | null`

Loads a PDF document from a file path.

* **Parameters**:

  * `filePath`: Path to a valid PDF file.
* **Returns**: A `PDFDocument` instance, or `null` if the file cannot be read.

---

### Read-Only Properties

#### `pageCount: number`

The total number of pages in the document.

#### `filePath: string | null`

The original file path of the PDF, or `null` if created in memory.

#### `isLocked: boolean`

Indicates whether the document is locked and requires a password.

#### `isEncrypted: boolean`

Indicates whether the document is encrypted.

#### `documentAttributes: object | null`

Optional document metadata:

```ts
{
  author?: string | null
  creationDate?: Date | null
  creator?: string | null
  keywords?: any | null
  modificationDate?: Date | null
  producer?: string | null
  subject?: string | null
  title?: string | null
}
```

##### Example

```ts
const doc = PDFDocument.fromFilePath("path/to/example.pdf")
const attrs = doc.documentAttributes
console.log(attrs?.title) // "Project Report"
```

---

### Asynchronous Getters

#### `data: Promise<Data | null>`

Asynchronously retrieves the document's binary data.

#### `string: Promise<string | null>`

Asynchronously retrieves the full text content of the PDF. May return `null` for image-based documents.

---

### Instance Methods

#### `pageAt(index: number): PDFPage | null`

Returns the page at the given index.

* **Parameters**:

  * `index`: Zero-based index of the page.
* **Returns**: A `PDFPage` instance or `null` if out of range.

#### `indexOf(page: PDFPage): number`

Returns the index of the specified page within the document.

* **Parameters**:

  * `page`: A `PDFPage` object from this document.
* **Returns**: The page index, or `-1` if not found.

#### `removePageAt(index: number): void`

Removes the page at the specified index.

#### `insertPageAt(page: PDFPage, atIndex: number): void`

Inserts a page at the specified index.

##### Example

```ts
const doc = PDFDocument.fromFilePath("path/to/document.pdf")
const imagePage = PDFPage.fromImage(image)
doc.insertPageAt(imagePage, 1)
```

#### `exchangePage(atIndex: number, withPageIndex: number): void`

Swaps two pages in the document.

---

### Save Methods

#### `writeSync(toFilePath: string, options?): boolean`

Writes the document to a file synchronously with optional encryption and configuration.

* **Parameters**:

  * `toFilePath`: Path to save the new PDF.
  * `options` (optional):

    ```ts
    {
      ownerPassword?: string
      userPassword?: string
      burnInAnnotations?: boolean
      saveTextFromOCR?: boolean
      saveImagesAsJPEG?: boolean
    }
    ```
* **Returns**: `true` if the file was saved successfully, `false` otherwise.

##### Example

```ts
const doc = PDFDocument.fromFilePath("path/to/input.pdf")
const success = doc.writeSync("path/to/output.pdf", {
  ownerPassword: "admin",
  userPassword: "1234"
})
```

#### `write(toFilePath: string, options?): Promise<boolean>`

Asynchronously writes the document to a file.

* Same parameters as `writeSync`.
* **Returns**: A `Promise<boolean>` indicating success.

---

### Unlock Method

#### `unlock(password: string): boolean`

Attempts to unlock an encrypted PDF document.

* **Parameters**:

  * `password`: The password string.
* **Returns**: `true` if unlocked successfully, otherwise `false`.

---

## Example Usage

```ts
const doc = PDFDocument.fromFilePath("path/to/book.pdf")
if (doc && !doc.isLocked) {
  const firstPage = doc.pageAt(0)
  const text = await firstPage?.string
  console.log("First page text:", text)
  
  const success = await doc.write("path/to/book-copy.pdf")
  console.log(success ? "Saved successfully" : "Save failed")
}
```
