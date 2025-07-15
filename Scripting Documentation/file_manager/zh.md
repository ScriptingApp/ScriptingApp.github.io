`Scripting` 应用中的 `FileManager` 类提供了一个接口，用于与 iOS 文件系统交互。它包含用于管理文件和目录、检查 iCloud 状态、读取/写入文件内容以及处理压缩文件的方法。以下是每个功能的详细使用指南。

---

## 基本信息

`FileManager` 类使用了以下类型定义：

* **Encoding（编码）**：指定读取或写入文件时所使用的编码格式。可选值包括 `'utf-8'`、`'ascii'` 和 `'latin1'`。
* **FileStat**：包含文件的元数据，例如创建时间、修改时间、类型和大小等。

---

## iCloud 访问

要检查 iCloud 功能是否可用以及管理存储于 iCloud 中的文件，请使用以下方法：

### `isiCloudEnabled`: `boolean`

指示是否启用了 iCloud 功能。在访问 iCloud 路径前，请确保已授权启用 iCloud。

#### 示例

```ts
if (FileManager.isiCloudEnabled) {
  // iCloud 功能已启用
}
```

---

### `iCloudDocumentsDirectory`: `string`

iCloud Documents 目录的路径。**必须**启用 iCloud 功能后才能访问。

#### 示例

```ts
const path = FileManager.iCloudDocumentsDirectory
```

---

### `isFileStoredIniCloud(filePath: string)`: `boolean`

检查某个文件是否设置为存储在 iCloud 中。

#### 示例

```ts
const isStored = FileManager.isFileStoredIniCloud('/path/to/file')
```

---

### `isiCloudFileDownloaded(filePath: string)`: `boolean`

检查某个 iCloud 文件是否已下载到本地。

#### 示例

```ts
const isDownloaded = FileManager.isiCloudFileDownloaded('/path/to/file')
```

---

### `downloadFileFromiCloud(filePath: string)`: `Promise<boolean>`

下载一个 iCloud 文件到本地。

#### 示例

```ts
const success = await FileManager.downloadFileFromiCloud('/path/to/file')
```

---

### `getShareUrlOfiCloudFile(path: string, expiration?: DurationInMilliseconds)`: `string`

为一个 iCloud 文件生成可分享的 URL，用户可以通过链接下载该文件。请使用 `try-catch` 来处理可能失败的情况。

#### 要求

* 文件必须位于 `iCloudDocumentsDirectory` 中。
* 文件必须已上传至 iCloud。
* 仅支持普通文件（不支持包类型）。

#### 参数

* `path`: iCloud 文件路径，需以 `FileManager.iCloudDocumentsDirectory` 为前缀。
* `expiration`: 可选，设置链接的过期时间（毫秒为单位）。

#### 示例

```ts
try {
  const shareUrl = FileManager.getShareUrlOfiCloudFile('/path/to/file');
  console.log('可分享链接:', shareUrl);
} catch (error) {
  console.error('生成链接失败:', error);
}
```

---

## 文件与目录路径

* `appGroupDocumentsDirectory`: App Group 的 Documents 目录路径。Widget 可访问，但 Files 应用不可见。
* `documentsDirectory`: 通用 Documents 目录路径，可通过 Files 应用访问。
* `temporaryDirectory`: 临时目录路径，用于存储临时数据。
* `scriptsDirectory`: 脚本存储目录路径。

---

## 目录与文件操作

---

### `createDirectory(path: string, recursive?: boolean)`: `Promise<void>`

在指定路径创建目录。如果 `recursive` 为 `true`，则会自动创建不存在的父目录。

#### 示例

```ts
await FileManager.createDirectory('/path/to/newDir', true)
```

---

### `createLink(path: string, target: string)`: `Promise<void>`

创建从 `path` 到 `target` 的符号链接。

#### 示例

```ts
await FileManager.createLink('/path/to/link', '/target/path')
```

---

## 读取与写入文件

---

### `readAsString(path: string, encoding?: Encoding)`: `Promise<string>`

以字符串形式读取文件内容，支持指定编码格式。

#### 示例

```ts
const content = await FileManager.readAsString('/path/to/file', 'utf-8')
```

---

### `readAsBytes(path: string)`: `Promise<Uint8Array>`

以字节数组 (`Uint8Array`) 形式读取文件内容。

#### 示例

```ts
const bytes = await FileManager.readAsBytes('/path/to/file')
```

---

### `readAsData(path: string)`: `Promise<Data>`

以 `Data` 对象形式读取文件内容。

---

---

### `writeAsString(path: string, contents: string, encoding?: Encoding)`: `Promise<void>`

将字符串写入指定路径的文件中，支持指定编码。

#### 示例

```ts
await FileManager.writeAsString('/path/to/file', 'Hello World', 'utf-8')
```

---

### `writeAsBytes(path: string, data: Uint8Array)`: `Promise<void>`

将字节数组写入文件。

---

### `writeAsData(path: string, data: Data)`: `Promise<void>`

将 `Data` 数据写入文件。

---

## 追加写入文件

---

### `appendText(path: string, text: string, encoding?: Encoding): Promise<void>`

将文本追加到指定路径的文件末尾。如果文件或其父目录不存在，将自动创建。

#### 示例

```ts
await FileManager.appendText(
  FileManager.documentsDirectory + '/log.txt',
  '追加日志内容\n'
)
```

---

### `appendTextSync(path: string, text: string, encoding?: Encoding): void`

同步版本的 `appendText`，适用于短小、可容忍阻塞的操作。

#### 示例

```ts
try {
  FileManager.appendTextSync(
    FileManager.documentsDirectory + '/log.txt',
    '同步日志内容\n'
  )
} catch (e) {
  console.error("追加文本失败", e)
}
```

---

### `appendData(path: string, data: Data): Promise<void>`

将二进制 `Data` 追加到文件末尾。如果文件或目录不存在，将自动创建。

#### 示例

```ts
const data = Data.fromString("新的一行\n")!
await FileManager.appendData(
  FileManager.documentsDirectory + '/binary.log',
  data
)
```

---

### `appendDataSync(path: string, data: Data): void`

同步版本的 `appendData`。

#### 示例

```ts
const data = Data.fromString("新的一行\n")!
try {
  FileManager.appendDataSync(
    FileManager.documentsDirectory + '/sync.log',
    data
  )
} catch (e) {
  console.error("追加数据失败", e)
}
```

---

## 文件信息

---

### `stat(path: string)`: `Promise<FileStat>`

获取指定文件或目录的元数据信息。

#### 示例

```ts
const stat = await FileManager.stat('/path/to/file')
console.log(stat.size)
```

---

### `mimeType(path: string)`: `string`

获取文件的 MIME 类型。

#### 示例

```ts
const mimeType = FileManager.mimeType('script.json')
console.log(mimeType) // "application/json"
```

---

### `destinationOfSymbolicLink(path: string)`: `string | null`

获取符号链接的目标路径。

#### 示例

```ts
const realPath = FileManager.destinationOfSymbolicLink('/path/to/link')
console.log(realPath)
```

---

## 文件操作

---

### `rename(path: string, newPath: string)`: `Promise<void>`

移动或重命名文件/目录。

#### 示例

```ts
await FileManager.rename('/old/path', '/new/path')
```

---

### `remove(path: string)`: `Promise<void>`

删除文件或目录（若是目录，将连同内部内容一并删除）。

#### 示例

```ts
await FileManager.remove('/path/to/file')
```

---

## 压缩与解压

---

### `zip(srcPath: string, destPath: string, shouldKeepParent?: boolean)`: `Promise<void>`

将指定路径下的文件或目录压缩为 zip 文件。`shouldKeepParent` 决定是否保留顶层目录。

#### 示例

```ts
await FileManager.zip('/path/to/folder', '/path/to/folder.zip', true)
```

---

### `unzip(srcPath: string, destPath: string)`: `Promise<void>`

解压 zip 文件的内容到目标路径。

#### 示例

```ts
await FileManager.unzip('/path/to/file.zip', '/path/to/extracted')
```

---

## 文件书签（Bookmarks）

---

### `getAllFileBookmarks()`: `Array<{name: string; path: string}>`

获取所有文件书签。书签可用于在脚本中保存并稍后访问指定文件或文件夹。它们可以在 File Bookmarks 工具中创建，也可以通过 Shortcuts 或分享扩展自动生成。

#### 示例

```ts
const bookmarks = FileManager.getAllFileBookmarks()
```

---

### `bookmarkExists(name: string)`: `boolean`

检查是否存在指定名称的文件书签。

#### 示例

```ts
if (FileManager.bookmarkExists("我的书签")) {
  // 存在该书签
}
```

---

### `bookmarkedPath(name: string)`: `string | null`

根据名称获取书签文件/文件夹的路径；如果不存在对应书签，则返回 `null`。

#### 示例

```ts
const filePath = FileManager.bookmarkedPath("我的书签")
if (filePath) {
  // 可使用 filePath
}
```