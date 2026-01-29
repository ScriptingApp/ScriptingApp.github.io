---
title: FileManager
description: A convenient interface to the contents of the file system, and the primary means of interacting with it.

---

The **FileManager** module provides a unified interface for interacting with the file system in Scripting. It serves as the primary API for accessing local files, iCloud files, App Group shared storage, and performing common file operations such as reading, writing, copying, moving, deleting, zipping, and unzipping.

---

## Core Properties

### `FileManager.scriptsDirectory: string`

Returns the directory path where script files are stored within the Scripting app.

### `FileManager.isiCloudEnabled: boolean`

Indicates whether iCloud is enabled for the user. Returns `false` if:

- The user is not logged into iCloud, or
- iCloud permissions have not been granted to the Scripting app.

### `FileManager.iCloudDocumentsDirectory: string`

Returns the path to the iCloud `Documents` directory.
Throws an error if iCloud is disabled. Always check `isiCloudEnabled` before calling.

### `FileManager.appGroupDocumentsDirectory: string`

Returns the path to the shared App Group `Documents` directory.
Files stored here are not accessible in the Files app, but scripts running inside Widgets can access them.

### `FileManager.documentsDirectory: string`

Returns the path to the local `Documents` directory.
Files stored here are visible in the Files app. Widgets cannot access files in this directory.

### `FileManager.temporaryDirectory: string`

Returns the path to the system temporary directory.
Files stored here may be removed automatically by the system.

---

## iCloud File Management

### `FileManager.isFileStoredIniCloud(filePath: string): boolean`

Checks whether the specified file is stored in iCloud.

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| filePath  | string | The file path to check |

### `FileManager.isiCloudFileDownloaded(filePath: string): boolean`

Checks whether an iCloud-stored file has been downloaded to the device.

### `FileManager.downloadFileFromiCloud(filePath: string): Promise<boolean>`

Downloads an iCloud file to the device.

| Returns            | Description                 |
| ------------------ | --------------------------- |
| Promise\<boolean\> | `true` if download succeeds |

**Example:**

```ts
if (FileManager.isiCloudEnabled) {
  const file = FileManager.iCloudDocumentsDirectory + "/data.json";
  const success = await FileManager.downloadFileFromiCloud(file);
}
```

### `FileManager.getShareUrlOfiCloudFile(path: string, expiration?: number): string`

Generates a shareable download URL for an iCloud file.

| Parameter  | Type              | Description                                                                                                          |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| path       | string            | The iCloud file path. Must begin with `FileManager.iCloudDocumentsDirectory`. File must be fully uploaded to iCloud. |
| expiration | number (optional) | Expiration timestamp of the share link                                                                               |

This call may throw an error. Use `try-catch` for error handling.

---

## Directory and File Operations

All operations are available in both asynchronous and synchronous forms.
Synchronous methods block execution; asynchronous versions are recommended for most use cases.

### Create Directory

#### `createDirectory(path: string, recursive?: boolean): Promise<void>`

#### `createDirectorySync(path: string, recursive?: boolean): void`

| Parameter | Type               | Description                                             |
| --------- | ------------------ | ------------------------------------------------------- |
| path      | string             | Directory path to create                                |
| recursive | boolean (optional) | If true, creates intermediate directories automatically |

### Create Symbolic Link

#### `createLink(path: string, target: string): Promise<void>`

#### `createLinkSync(path: string, target: string): void`

Creates a symbolic link at `path` pointing to `target`.

### Copy File

#### `copyFile(path: string, newPath: string): Promise<void>`

#### `copyFileSync(path: string, newPath: string): void`

### Read Directory

#### `readDirectory(path: string, recursive?: boolean): Promise<string[]>`

#### `readDirectorySync(path: string, recursive?: boolean): string[]`

Enumerates the contents of a directory and optionally recurses into subdirectories.

### Check Existence

#### `exists(path: string): Promise<boolean>`

#### `existsSync(path: string): boolean`

Checks whether a file or directory exists.

### File Bookmarks

Bookmarks allow persistent access to user-authorized external files or folders.

| Method                  | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| `bookmarkExists(name)`  | Checks whether a bookmark exists                                |
| `getAllFileBookmarks()` | Returns all bookmark names and their paths                      |
| `bookmarkedPath(name)`  | Returns file path for the bookmark name, or `null` if not found |

---

### Determine File Type

| Method                            | Returns | Description                          |
| --------------------------------- | ------- | ------------------------------------ |
| `isFile / isFileSync`             | boolean | Whether the path refers to a file    |
| `isDirectory / isDirectorySync`   | boolean | Whether it refers to a directory     |
| `isLink / isLinkSync`             | boolean | Whether it refers to a symbolic link |
| `isBinaryFile / isBinaryFileSync` | boolean | Whether the file is binary           |

---

## File Reading and Writing

Supports three data formats: string, `Uint8Array`, and `Data`.

### Read File

| Method              | Return Type | Description                              |
| ------------------- | ----------- | ---------------------------------------- |
| readAsString / Sync | string      | Reads text using specified encoding      |
| readAsBytes / Sync  | Uint8Array  | Reads raw bytes                          |
| readAsData / Sync   | Data        | Reads the entire file as a `Data` object |

### Write File

| Method               | Data Format |
| -------------------- | ----------- |
| writeAsString / Sync | string      |
| writeAsBytes / Sync  | Uint8Array  |
| writeAsData / Sync   | Data        |

Existing files will be overwritten.

### Append to File

| Method            | Data Format |
| ----------------- | ----------- |
| appendText / Sync | string      |
| appendData / Sync | Data        |

If the file or its parent directory does not exist, it will be created automatically.

---

## File Information and Management

### `stat(path: string): Promise<FileStat>`

### `statSync(path: string): FileStat`

Returns a `FileStat` object for the file or directory. If the path is a symbolic link, the resolved target is reported.

### `rename / renameSync`

Moves or renames a file or directory.

### `remove / removeSync`

Removes a file or directory. Directories are removed recursively.

---

## Compression and Extraction

### `zip(srcPath: string, destPath: string, shouldKeepParent?: boolean): Promise<void>`

### `zipSync(srcPath: string, destPath: string, shouldKeepParent?: boolean): void`

Creates a zip archive from a file or directory.

### `unzip(srcPath: string, destPath: string): Promise<void>`

### `unzipSync(srcPath: string, destPath: string): void`

Extracts a zip archive to the specified destination.

**Example:**

```ts
const docs = FileManager.documentsDirectory;

await FileManager.zip(docs + "/MyScript", docs + "/MyScript.zip");
await FileManager.unzip(docs + "/MyScript.zip", docs + "/Output");
```

---

## Utility Methods

### `mimeType(path: string): string`

Returns the MIME type of the file based on its extension.

### `destinationOfSymbolicLink(path: string): string`

Returns the destination of a symbolic link.

---

## Types

### `FileStat`

```ts
type FileStat = {
  creationDate: number;
  modificationDate: number;
  type: string; // "file" | "directory" | "link" | "unixDomainSock" | "pipe" | "notFound"
  size: number;
};
```
