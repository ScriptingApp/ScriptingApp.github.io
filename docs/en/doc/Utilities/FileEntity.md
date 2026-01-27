---
title: FileEntity

---

The `FileEntity` class provides low-level file read and write operations.
It allows scripts and HTTP servers to open, read, write, seek, and close files efficiently.
`FileEntity` can also be used as a response body for `HttpResponse.raw()` to serve static or downloadable files.

---

## Overview

`FileEntity` enables direct file operations, including:

* Opening files in different modes (read, write, read/write, append, etc.)
* Reading and writing binary data (`Data` objects)
* Seeking to a specific offset in the file
* Closing files to release resources
* Returning file streams as HTTP responses

---

## Instance Properties

### `path: string`

The full path of the file represented by this `FileEntity` instance.

**Example:**

```ts
const file = FileEntity.openForReading("/path/to/file.txt")
console.log(file.path)
// Output: "/path/to/file.txt"
```

---

## Instance Methods

### `seek(offset: number): boolean`

Moves the file pointer to the specified byte offset.
Returns `true` if successful, or `false` if seeking fails.

**Parameters:**

| Name     | Type     | Description                 |
| -------- | -------- | --------------------------- |
| `offset` | `number` | The byte offset to move to. |

**Example:**

```ts
const file = FileEntity.openForReading("/path/to/data.bin")
file.seek(128)
```

---

### `read(size: number): Data`

Reads a specified number of bytes from the current file position and returns them as a `Data` object.

**Parameters:**

| Name   | Type     | Description              |
| ------ | -------- | ------------------------ |
| `size` | `number` | Number of bytes to read. |

**Returns:**
A `Data` object containing the read bytes.

**Example:**

```ts
const file = FileEntity.openForReading("/path/to/text.txt")
const data = file.read(100)
console.log(data.toRawString("utf-8"))
file.close()
```

---

### `write(data: Data): void`

Writes the provided `Data` to the current file position.
Throws an error if the file was not opened in a writable mode.

**Parameters:**

| Name   | Type   | Description                           |
| ------ | ------ | ------------------------------------- |
| `data` | `Data` | The binary data to write to the file. |

**Example:**

```ts
const data = Data.fromRawString("Hello, Scripting!", "utf-8")
const file = FileEntity.openNewForWriting("/tmp/test.txt")
file.write(data)
file.close()
```

---

### `close(): void`

Closes the file and releases the associated resources.
After closing, you should not call `read()` or `write()` again.

**Example:**

```ts
const file = FileEntity.openForReading("/path/to/file.txt")
// ... perform operations ...
file.close()
```

---

## Static Methods

### `static openForReading(path: string): FileEntity`

Opens a file in **read-only** mode.
Throws an error if the file does not exist or cannot be read.

**Parameters:**

| Name   | Type     | Description            |
| ------ | -------- | ---------------------- |
| `path` | `string` | The file path to open. |

**Example:**

```ts
const file = FileEntity.openForReading("/path/to/image.png")
```

---

### `static openNewForWriting(path: string): FileEntity`

Opens a file in **write-only** mode.
If the file already exists, it will be **overwritten**.

**Example:**

```ts
const file = FileEntity.openNewForWriting("/tmp/output.txt")
file.write(Data.fromRawString("New file created"))
file.close()
```

---

### `static openForWritingAndReading(path: string): FileEntity`

Opens a file in **read/write** mode.
If the file does not exist, it will be created automatically.

**Example:**

```ts
const file = FileEntity.openForWritingAndReading("/tmp/data.txt")
file.write(Data.fromRawString("abc"))
file.seek(0)
console.log(file.read(3).toRawString("utf-8"))
file.close()
```

---

### `static openForMode(path: string, mode: string): FileEntity`

Opens a file using the specified access mode.
The supported modes follow standard POSIX file semantics, but **it is strongly recommended to use binary-safe modes** such as `"rb"` or `"r+b"` for better cross-platform compatibility, since `FileEntity` performs all read/write operations in binary mode internally.

**Parameters:**

| Mode             | Description                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `"r"` / `"rb"`   | Read-only mode (file must exist). `"rb"` is recommended for better compatibility.                     |
| `"w"` / `"wb"`   | Write-only mode (creates a new file or overwrites the existing one). `"wb"` is recommended.           |
| `"a"` / `"ab"`   | Append mode (writes data to the end of the file; creates the file if missing). `"ab"` is recommended. |
| `"r+"` / `"r+b"` | Read/write mode (file must exist). `"r+b"` is recommended for binary read/write.                      |
| `"w+"` / `"w+b"` | Read/write mode (creates or overwrites the file). `"w+b"` is recommended.                             |
| `"a+"` / `"a+b"` | Read/append mode (creates the file if missing). `"a+b"` is recommended.                               |

> 💡 **Note:**
> Always prefer binary-safe modes (those ending with `b`), such as `"rb"`, `"wb"`, or `"r+b"`.
> This ensures consistent behavior across platforms and avoids newline or encoding conversion issues, since `FileEntity` handles all file I/O as binary streams.

**Example:**

```ts
// Open file in binary read/write mode (recommended)
const file = FileEntity.openForMode("/tmp/log.bin", "r+b")

// Write binary data
file.write(Data.fromRawString("append log\n"))

// Move to the beginning and read data
file.seek(0)
const content = file.read(20).toRawString("utf-8")
console.log(content)

file.close()
```

---

## Using FileEntity in HttpResponse

`FileEntity` can be used directly as the body of an HTTP response via `HttpResponse.raw()`.
This allows serving files or implementing file download endpoints.

**Example:**

```ts
server.registerHandler("/download", (req) => {
  const file = FileEntity.openForReading(Path.join(Script.directory, "manual.pdf"))
  return HttpResponse.raw(200, "OK", {
    headers: { "Content-Type": "application/pdf" },
    body: file
  })
})
```

Clients accessing `/download` will directly receive the file as a download.

---

## Summary

| Method                       | Description                          | Typical Use Case                |
| ---------------------------- | ------------------------------------ | ------------------------------- |
| `seek()`                     | Moves the read/write position        | Random access or partial reads  |
| `read()`                     | Reads data from file                 | Reading text or binary content  |
| `write()`                    | Writes data to file                  | Saving logs, exporting data     |
| `close()`                    | Closes the file                      | Always call after use           |
| `openForReading()`           | Opens a file for reading             | Serving static content          |
| `openNewForWriting()`        | Opens a file for writing (overwrite) | Creating new files              |
| `openForWritingAndReading()` | Opens for both reading and writing   | Editing or streaming            |
| `openForMode()`              | Opens file in custom mode            | POSIX-compatible access control |
