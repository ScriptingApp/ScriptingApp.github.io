---
title: SFTP Client
description: This interface provides a simple way to transfer files securely over SSH using SFTP protocol.
tag: PRO
---

`SFTPClient` provides access to a remote file system over an SSH connection using the SFTP protocol.
It supports directory operations, file management, attribute retrieval, and path resolution.
Files can be opened using `openFile()`, which returns an `SFTPFile` instance for reading and writing.

Instances of this class are typically created through:

```ts
const sftp = await ssh.openSFTP();
```

---

## Properties

### `readonly isActive: boolean`

Indicates whether the SFTP connection is still active.

- `true`: The connection is active
- `false`: The connection is closed or invalid

---

## Methods

---

## `close(): Promise<void>`

Closes the SFTP connection.

#### Returns:

- A promise that resolves when the connection is successfully closed.

#### Example:

```ts
await sftp.close();
```

---

## `readDirectory(atPath: string): Promise<DirectoryEntry[]>`

Reads the contents of a directory.

### Parameters:

- **`atPath`**: The path of the directory to read.

### Returns:

An array of directory entries:

```ts
{
  filename: string
  longname: string
  attributes: {
    size?: number
    userId?: number
    groupId?: number
    accessTime?: Date
    modificationTime?: Date
    permissions?: number
  }
}[]
```

### Example:

```ts
const items = await sftp.readDirectory("/var/log");
```

---

## `createDirectory(atPath: string): Promise<void>`

Creates a directory at the specified path.

### Parameters:

- `atPath`: The path where the directory should be created.

### Returns:

A promise that resolves when the directory is created.

### Example:

```ts
await sftp.createDirectory("/home/user/new-folder");
```

---

## `removeDirectory(atPath: string): Promise<void>`

Removes a directory. The directory must be empty.

### Parameters:

- `atPath`: The directory path to remove.

### Example:

```ts
await sftp.removeDirectory("/home/user/empty-dir");
```

---

## `rename(oldPath: string, newPath: string): Promise<void>`

Renames or moves a file or directory.

### Parameters:

- `oldPath`: The current path.
- `newPath`: The new path.

### Example:

```ts
await sftp.rename("/home/user/a.txt", "/home/user/b.txt");
```

---

## `getAttributes(atPath: string): Promise<FileAttributes>`

Retrieves file or directory metadata.

### Returns:

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
const attrs = await sftp.getAttributes("/etc/hosts");
```

---

## `openFile(filePath: string, flags: SFTPOpenFileFlags | SFTPOpenFileFlags[]): Promise<SFTPFile>`

Opens a file with the specified flags and returns an `SFTPFile` instance.

### Parameters:

- `filePath`: The path of the file to open.
- `flags`: One or more of the following:

```
"read" | "write" | "append" | "create" | "truncate" | "forceCreate"
```

### Returns:

- A promise that resolves to an `SFTPFile` object.

### Example:

```ts
const file = await sftp.openFile("/home/user/log.txt", ["read"]);
const data = await file.readAll();
await file.close();
```

---

## `remove(atPath: string): Promise<void>`

Removes a file.

### Parameters:

- `atPath`: The file path to remove.

### Example:

```ts
await sftp.remove("/home/user/old.txt");
```

---

## `getRealPath(atPath: string): Promise<string>`

Resolves symbolic links, `~`, and relative paths to an absolute path.

### Example:

```ts
const real = await sftp.getRealPath("~/documents");
```

---

## Usage Example

```ts
const ssh = await SSHClient.connect({
  host: "192.168.1.10",
  authenticationMethod: SSHAuthenticationMethod.passwordBased("user", "pass"),
});

const sftp = await ssh.openSFTP();

// Read a directory
const list = await sftp.readDirectory("/home/user");

// Open a file and read contents
const file = await sftp.openFile("/home/user/info.txt", "read");
const data = await file.readAll();
await file.close();

// Create a directory
await sftp.createDirectory("/home/user/new-folder");

// Delete a file
await sftp.remove("/home/user/temp.txt");

await sftp.close();
```
