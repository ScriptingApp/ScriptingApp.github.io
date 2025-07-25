The `FileManager` class in the Scripting app provides an interface to interact with the iOS filesystem. It includes methods for managing files and directories, checking iCloud status, reading/writing file contents, and working with compressed files. Below is a detailed guide on how to use each feature.

---

## Basic Information
The `FileManager` class uses several type definitions:
- **Encoding**: Determines the encoding format for file reading/writing. Options include `'utf-8'`, `'ascii'`, and `'latin1'`.
- **FileStat**: Holds metadata about files, such as creation and modification dates, type, and size.

## iCloud Access
To check for iCloud features and manage files stored in iCloud, use the following:

### `isiCloudEnabled`: `boolean`

Indicates if iCloud features are enabled. Ensure iCloud is authorized before accessing iCloud-specific paths.

#### Usage
```ts
if (FileManager.isiCloudEnabled) {
  // iCloud is enabled
}
```

---

### `iCloudDocumentsDirectory`: `string`

Path to the iCloud Documents directory. **Requires** iCloud to be enabled.

#### Usage
```ts
const path = FileManager.iCloudDocumentsDirectory
```

---

### `isFileStoredIniCloud(filePath: string)`: `boolean`

Checks if a file is set to be stored in iCloud.

#### Usage
```ts
const isStored = FileManager.isFileStoredIniCloud('/path/to/file')
```

---

### `isiCloudFileDownloaded(filePath: string)`: `boolean`

Checks if an iCloud file has been downloaded locally.
 
#### Usage
```ts
const isDownloaded = FileManager.isiCloudFileDownloaded('/path/to/file')
```

---

### `downloadFileFromiCloud(filePath: string)`: `Promise<boolean>`

Downloads an iCloud file.
 
#### Usage
```ts
const success = await FileManager.downloadFileFromiCloud('/path/to/file')
```

---

### `getShareUrlOfiCloudFile(path: string, expiration?: DurationInMilliseconds)`: `string`

Generates a shareable URL for an iCloud file, allowing users to download the file. You need to use `try-catch` to handle the situation where this method call fails.

#### Requirements
- The file must be located in the `iCloudDocumentsDirectory`.
- The file must already be uploaded to iCloud.
- Only flat files are supported (not bundles).

#### Parameters
- `path`: The iCloud file path, prefixed with `FileManager.iCloudDocumentsDirectory`.
- `expiration`: Optional. Set the expiration timestamp in milliseconds.

#### Usage
```ts
try {
  const shareUrl = FileManager.getShareUrlOfiCloudFile('/path/to/file');
  console.log('Shareable URL:', shareUrl);
} catch (error) {
  console.error('Failed to generate shareable URL:', error);
}
```

---

## File and Directory Paths

### `appGroupDocumentsDirectory`: `string`

Path to the App Group Documents directory. Files here are accessible within Widgets but not via the Files app.

---

### `documentsDirectory`: `string`

Path to the general Documents directory, accessible via the Files app.

---

### `temporaryDirectory`: `string`

Path to the temporary directory for storing transient data.

---

### `scriptsDirectory`: `string`

Directory where scripts are stored.

---

## Directory and File Operations

### `createDirectory(path: string, recursive?: boolean)`: `Promise<void>`

Creates a directory at the specified path. If `recursive` is `true`, creates parent directories if they don’t exist.

#### Usage
```ts
await FileManager.createDirectory('/path/to/newDir', true)
```

---

### `createLink(path: string, target: string)`: `Promise<void>`

Creates a symbolic link from `path` to `target`.

#### Usage
```ts
await FileManager.createLink('/path/to/link', '/target/path')
```

---

## Reading and Writing Files

### `readAsString(path: string, encoding?: Encoding)`: `Promise<string>`

Reads file contents as a string with optional encoding.

#### Usage
```ts
const content = await FileManager.readAsString('/path/to/file', 'utf-8')
```

---

### `readAsBytes(path: string)`: `Promise<Uint8Array>`

Reads file contents as a `Uint8Array`.

#### Usage
```ts
const bytes = await FileManager.readAsBytes('/path/to/file')
```

---

### `readAsData(path: string)`: `Promise<Data>`

Reads file contents as a `Data` object.
  
---

### `writeAsString(path: string, contents: string, encoding?: Encoding)`: `Promise<void>`

Writes a string to a file with optional encoding.

#### Usage
```ts
await FileManager.writeAsString('/path/to/file', 'Hello World', 'utf-8')
```

---

### `writeAsBytes(path: string, data: Uint8Array)`: `Promise<void>`

Writes a `Uint8Array` to a file.

---

### `writeAsData(path: string, data: Data)`: `Promise<void>`

Writes `Data` to a file.

---

## Appending to Files

### `appendText(path: string, text: string, encoding?: Encoding): Promise<void>`

Appends the given text to the end of a file at the specified path. If the file or its parent directories do not exist, they will be created automatically.

#### Parameters

- `path`: The file path where the text should be appended.
- `text`: The string content to append.
- `encoding`: Optional. The encoding to use (default is `'utf-8'`).

#### Usage

```ts
await FileManager.appendText(
  FileManager.documentsDirectory + '/log.txt',
  'Appended log line\n'
)
```

---

### `appendTextSync(path: string, text: string, encoding?: Encoding): void`

Synchronous version of `appendText`. Useful for short, immediate operations where blocking is acceptable.

#### Usage

```ts
try {
  FileManager.appendTextSync(
    FileManager.documentsDirectory + '/log.txt',
    'Sync log line\n'
  )
} catch (e) {
  console.error("Failed to append text", e)
}
```

---

### `appendData(path: string, data: Data): Promise<void>`

Appends binary `Data` to a file. If the file or its parent directories do not exist, they will be created.

#### Parameters

- `path`: The file path to append the data to.
- `data`: A `Data` object containing the binary content to append.

#### Usage

```ts
const data = Data.fromString("New line\n")!
await FileManager.appendData(
  FileManager.documentsDirectory + '/binary.log',
  data
)
```

---

## `appendDataSync(path: string, data: Data): void`

Synchronous version of `appendData`.

#### Usage

```ts
const data = Data.fromString("New line\n")!
try {
  FileManager.appendDataSync(
    FileManager.documentsDirectory + '/sync.log',
    data
  )
} catch (e) {
  console.error("Failed to append data", e)
}
```

---

## File Information

### `stat(path: string)`: `Promise<FileStat>`

Gets metadata for a file or directory.

#### Usage
```ts
const stat = await FileManager.stat('/path/to/file')
console.log(stat.size)
```

---

### `mimeType(path: string)`: `string`

Gets MIME type for a file.

#### Usage
```ts
const mimeType = FileManager.mimeType('script.json')
console.log(mimeType) // "application/json"
```

---

### `destinationOfSymbolicLink(path: string)`: `string | null`

Gets destination for a symbolic link.

#### Usage
```ts
const realPath = FileManager.destinationOfSymbolicLink('/path/to/link')
console.log(realPath)
```

---

## File Manipulation

### `rename(path: string, newPath: string)`: `Promise<void>`

Moves or renames a file or directory.

#### Usage
```ts
await FileManager.rename('/old/path', '/new/path')
```

---

### `remove(path: string)`: `Promise<void>`

Deletes a file or directory (including contents if a directory).

#### Usage
```ts
await FileManager.remove('/path/to/file')
```

---

## Compression (Zip and Unzip)

### `zip(srcPath: string, destPath: string, shouldKeepParent?: boolean)`: `Promise<void>`

Zips files or directories to a specified destination. `shouldKeepParent` determines if the top-level directory is preserved.

#### Usage
```ts
await FileManager.zip('/path/to/folder', '/path/to/folder.zip', true)
```

---

### `unzip(srcPath: string, destPath: string)`: `Promise<void>`

Unzips contents from a zip file.

#### Usage
```ts
await FileManager.unzip('/path/to/file.zip', '/path/to/extracted')
```
    
---

## File Bookmarks

### `getAllFileBookmarks()`: `Array<{name: string; path: string}>`

Get all file bookmarks. File bookmarks are used to bookmark a file or a folder and read or write to it late in your script. They can be created from File Bookmarks tool, they also were automatic created by Intent for Shortcuts app or Share Sheet.

#### Usage
```ts
const bookmarks = FileManager.getAllFileBookmarks()
```

---

### `bookmarkExists(name: string)`: `bool`

Returns a boolean value indicates that whether the bookmark of specified name is exists.

#### Usage
```ts
if (FileManager.bookmarkExists("My Bookmark")) {
  // ...
}
```

---

### `bookmarkedPath(name: string)`: `string | null`

Try to get the path of a bookmarked file or folder by a given name, if the bookmark of the name is not exists, returns `null`.

#### Usage
```ts
const filePath = FileManager.bookmarkedPath("My Bookmark")
if (filePath) {
  // ...
}
```
