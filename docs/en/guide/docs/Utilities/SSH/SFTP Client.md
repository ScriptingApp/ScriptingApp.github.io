---
title: SFTP Client
---
The `SFTPClient` class provides access to the remote file system over an SSH connection using the SFTP protocol. It supports common file operations such as reading directories, managing files and folders, retrieving file attributes, and resolving real paths.

This class is returned by the method `SSHClient.openSFTP()`.

---

## Properties

### `readonly isActive: boolean`

Indicates whether the SFTP connection is still open.

* `true`: The connection is active and usable.
* `false`: The connection has been closed or interrupted.

---

## Methods

### `close(): Promise<void>`

Closes the SFTP connection.

#### Returns:

* A `Promise` that resolves when the connection is successfully closed.

#### Example:

```ts
await sftp.close()
```

---

### `readDirectory(atPath: string): Promise<string[]>`

Reads the contents of a directory at the specified path.

#### Parameters:

* `atPath` (`string`):
  The remote directory path to read.

#### Returns:

* A `Promise` that resolves to an array of file and directory names within the directory.

#### Example:

```ts
const items = await sftp.readDirectory("/home/user")
```

---

### `createDirectory(atPath: string): Promise<void>`

Creates a new directory at the given path.

#### Parameters:

* `atPath` (`string`):
  The path where the new directory should be created.

#### Returns:

* A `Promise` that resolves when the directory is created successfully.

#### Example:

```ts
await sftp.createDirectory("/home/user/new-folder")
```

---

### `removeDirectory(atPath: string): Promise<void>`

Removes the directory at the specified path.

#### Parameters:

* `atPath` (`string`):
  The path of the directory to remove.

#### Returns:

* A `Promise` that resolves when the directory is removed.

#### Example:

```ts
await sftp.removeDirectory("/home/user/old-folder")
```

---

### `rename(oldPath: string, newPath: string): Promise<void>`

Renames a file or directory.

#### Parameters:

* `oldPath` (`string`):
  The current file or directory path.

* `newPath` (`string`):
  The desired new path.

#### Returns:

* A `Promise` that resolves when the item is successfully renamed.

#### Example:

```ts
await sftp.rename("/home/user/file.txt", "/home/user/file-renamed.txt")
```

---

### `getAttributes(atPath: string): Promise<{ ... }>`

Retrieves metadata for a file or directory.

#### Parameters:

* `atPath` (`string`):
  The file or directory path to inspect.

#### Returns:

* A `Promise` that resolves to an object containing:

  * `size?: number`: File size in bytes
  * `flag?: number`: Internal flag
  * `userId?: number`: User ID
  * `groupId?: number`: Group ID
  * `accessTime?: Date`: Last access time
  * `modificationTime?: Date`: Last modification time
  * `permissions?: number`: File mode/permissions (e.g., `0o755`)

#### Example:

```ts
const attrs = await sftp.getAttributes("/home/user/file.txt")
```

---

### `readFile(atPath: string): Promise<string>`

Reads the contents of a file as a string.

#### Parameters:

* `atPath` (`string`):
  The file path to read.

#### Returns:

* A `Promise` that resolves to the file content as a UTF-8 string.

#### Example:

```ts
const content = await sftp.readFile("/home/user/notes.txt")
```

---

### `writeFile(atPath: string, content: string): Promise<void>`

Writes content to a file. If the file already exists, it will be overwritten.

#### Parameters:

* `atPath` (`string`):
  The destination file path.

* `content` (`string`):
  The text content to write.

#### Returns:

* A `Promise` that resolves when the file is written successfully.

#### Example:

```ts
await sftp.writeFile("/home/user/todo.txt", "Buy milk")
```

---

### `removeFile(atPath: string): Promise<void>`

Removes a file at the specified path.

#### Parameters:

* `atPath` (`string`):
  The file path to remove.

#### Returns:

* A `Promise` that resolves when the file is deleted.

#### Example:

```ts
await sftp.removeFile("/home/user/todo.txt")
```

---

### `getRealPath(atPath: string): Promise<string>`

Resolves the canonical (real) path for a given file or directory path on the remote system.

#### Parameters:

* `atPath` (`string`):
  The input path, possibly containing symbolic links or relative segments.

#### Returns:

* A `Promise` that resolves to the absolute, resolved path.

#### Example:

```ts
const realPath = await sftp.getRealPath("~/logs")
```

---

## Usage Example

```ts
const ssh = await SSHClient.connect({
  host: "192.168.1.10",
  authenticationMethod: SSHAuthenticationMethod.passwordBased("user", "pass")
})

const sftp = await ssh.openSFTP()

const files = await sftp.readDirectory("/home/user")
console.log("Remote files:", files)

await sftp.writeFile("/home/user/hello.txt", "Hello from Scripting app")
const content = await sftp.readFile("/home/user/hello.txt")
console.log("File content:", content)

await sftp.close()
```
