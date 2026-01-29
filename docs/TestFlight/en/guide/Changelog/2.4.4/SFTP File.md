---
title: SFTP File
description: This interface provides low-level operations such as reading, writing, retrieving attributes, and closing the file.
tag: PRO
---

`SFTPFile` represents an opened remote file accessed through an SFTP session.
It provides low-level operations such as reading, writing, retrieving attributes, and closing the file.

Instances of this class are typically obtained through:

```ts
const file = await sftp.openFile(path, flags)
```

---

## Properties

---

### `readonly isActive: boolean`

Indicates whether the file handle is still open.

* `true`: The file is open and can be used
* `false`: The file has been closed or is no longer valid

---

## Methods

---

## `readAttributes(): Promise<FileAttributes>`

Reads metadata attributes of the file.

### Returns:

An object containing file attributes:

```ts
{
  size?: number
  userId?: number
  groupId?: number
  accessTime?: Date
  modificationTime?: Date
  permissions?: number
}
```

### Example:

```ts
const attrs = await file.readAttributes()
console.log(attrs.size)
```

---

## `read(options?: { from?: number, length?: number }): Promise<Data>`

Reads data from the file with optional offset and length.

### Parameters:

* `from?`: The byte offset to start reading from. Defaults to `0`.
* `length?`: The number of bytes to read. Defaults to reading until the end of the file.

### Returns:

* A `Promise<Data>` containing the read bytes.

### Example:

```ts
const data = await file.read({ from: 100, length: 50 })
```

---

## `readAll(): Promise<Data>`

Reads the entire contents of the file.

### Returns:

* A `Promise<Data>` containing all file data.

### Example:

```ts
const data = await file.readAll()
```

---

## `write(data: Data, at?: number): Promise<void>`

Writes data to the file.

### Parameters:

* `data`: The binary data to write.
* `at?`: The byte offset at which to start writing.

  * If omitted, behavior depends on the flags used to open the file:

    * `"append"` will write at the end of the file.
    * `"write"` will write from offset 0 unless the implementation maintains a current offset.

### Returns:

* A promise that resolves when the write completes.

### Example:

```ts
await file.write(Data.fromRawString("Hello world"))
```

---

## `close(): Promise<void>`

Closes the file handle.
After closing, `isActive` becomes `false`, and no further reads or writes are allowed.

### Example:

```ts
await file.close()
```

---

## Usage Example

```ts
// Open file in read mode
const file = await sftp.openFile("/home/user/info.txt", ["read"])

// Get file attributes
const attrs = await file.readAttributes()

// Read the entire file
const allData = await file.readAll()

// Read part of the file
const partialData = await file.read({ from: 50, length: 100 })

// Close the file
await file.close()
```
