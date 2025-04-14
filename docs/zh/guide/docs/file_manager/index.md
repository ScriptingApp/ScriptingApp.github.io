---
title: 文件管理器
---
`FileManager` 类在 Scripting 应用中提供了与 iOS 文件系统交互的接口。它包括管理文件和目录、检查 iCloud 状态、读写文件内容以及处理压缩文件的方法。以下是每个功能的详细指南。

---

#### 基本信息
`FileManager` 类使用以下类型定义：
- **Encoding**：确定文件读写时的编码格式。选项包括 `'utf-8'`、`'ascii'` 和 `'latin1'`。
- **FileStat**：保存有关文件的元数据，例如创建日期、修改日期、类型和大小。

#### iCloud 访问
要检查 iCloud 功能并管理存储在 iCloud 中的文件，请使用以下内容：

- **`isiCloudEnabled`**：`boolean`  
  - 指示是否启用了 iCloud 功能。在访问特定 iCloud 路径之前，请确保已授权 iCloud。
  - **用法**：
    ```ts
    if (FileManager.isiCloudEnabled) {
      // iCloud 功能已启用
    }
    ```

- **`iCloudDocumentsDirectory`**：`string`  
  - iCloud 文档目录的路径。**需要**启用 iCloud 功能。
  - **用法**：
    ```ts
    const path = FileManager.iCloudDocumentsDirectory
    ```

- **`isFileStoredIniCloud(filePath: string)`**：`boolean`  
  - 检查文件是否存储在 iCloud 中。
  - **用法**：
    ```ts
    const isStored = FileManager.isFileStoredIniCloud('/path/to/file')
    ```

- **`isiCloudFileDownloaded(filePath: string)`**：`boolean`  
  - 检查 iCloud 文件是否已本地下载。
  - **用法**：
    ```ts
    const isDownloaded = FileManager.isiCloudFileDownloaded('/path/to/file')
    ```

- **`downloadFileFromiCloud(filePath: string)`**：`Promise<boolean>`  
  - 下载 iCloud 文件。
  - **用法**：
    ```ts
    const success = await FileManager.downloadFileFromiCloud('/path/to/file')
    ```

- **`getShareUrlOfiCloudFile(path: string, expiration?: DurationInMilliseconds)`**：`string`  
  - 为 iCloud 文件生成可共享的 URL，允许用户下载该文件。需使用 `try-catch` 处理可能的调用失败情况。
  - **要求**：
    - 文件必须位于 `iCloudDocumentsDirectory` 中。
    - 文件必须已上传到 iCloud。
    - 仅支持单一文件（不支持文件包）。
  - **参数**：
    - `path`：iCloud 文件路径，需以 `FileManager.iCloudDocumentsDirectory` 为前缀。
    - `expiration`：可选。设置 URL 过期时间（毫秒）。
  - **用法**：
    ```ts
    try {
      const shareUrl = FileManager.getShareUrlOfiCloudFile('/path/to/file');
      console.log('共享 URL:', shareUrl);
    } catch (error) {
      console.error('生成共享 URL 失败:', error);
    }
    ```

#### 文件和目录路径

- **`appGroupDocumentsDirectory`**：`string`  
  - 应用组文档目录的路径。此处的文件可供小组件访问，但不能通过文件应用访问。

- **`documentsDirectory`**：`string`  
  - 通用文档目录的路径，可通过文件应用访问。

- **`temporaryDirectory`**：`string`  
  - 临时目录路径，用于存储临时数据。

- **`scriptsDirectory`**: `string`
  - 脚本项目存储的目录路径。

---

#### 目录和文件操作

- **`createDirectory(path: string, recursive?: boolean)`**：`Promise<void>`  
  - 在指定路径创建目录。如果 `recursive` 为 `true`，则会创建不存在的父目录。
  - **用法**：
    ```ts
    await FileManager.createDirectory('/path/to/newDir', true)
    ```

- **`createLink(path: string, target: string)`**：`Promise<void>`  
  - 创建从 `path` 到 `target` 的符号链接。
  - **用法**：
    ```ts
    await FileManager.createLink('/path/to/link', '/target/path')
    ```

#### 读写文件

- **`readAsString(path: string, encoding?: Encoding)`**：`Promise<string>`  
  - 使用可选编码格式将文件内容读取为字符串。
  - **用法**：
    ```ts
    const content = await FileManager.readAsString('/path/to/file', 'utf-8')
    ```

- **`readAsBytes(path: string)`**：`Promise<Uint8Array>`  
  - 将文件内容读取为 `Uint8Array`。
  - **用法**：
    ```ts
    const bytes = await FileManager.readAsBytes('/path/to/file')
    ```

- **`readAsData(path: string)`**：`Promise<Data>`  
  - 将文件内容读取为 `Data` 对象。

- **`writeAsString(path: string, contents: string, encoding?: Encoding)`**：`Promise<void>`  
  - 使用可选编码格式将字符串写入文件。
  - **用法**：
    ```ts
    await FileManager.writeAsString('/path/to/file', 'Hello World', 'utf-8')
    ```

- **`writeAsBytes(path: string, data: Uint8Array)`**：`Promise<void>`  
  - 将 `Uint8Array` 写入文件。

- **`writeAsData(path: string, data: Data)`**：`Promise<void>`  
  - 将 `Data` 写入文件。

#### 文件信息

- **`stat(path: string)`**：`Promise<FileStat>`  
  - 获取文件或目录的元数据。
  - **用法**：
    ```ts
    const stat = await FileManager.stat('/path/to/file')
    console.log(stat.size)
    ```

- **`mimeType(path: string)`**: `string`
  - 获取文件的MIME type.
  - **用法**:
    ```ts
    const mimeType = FileManager.mimeType('script.json')
    console.log(mimeType) // "application/json"
    ```

- **`destinationOfSymbolicLink(path: string)`**: `string | null`
  - 获取symbolic link的真实路径.
  - **用法**:
    ```ts
    const realPath = FileManager.destinationOfSymbolicLink('/path/to/link')
    console.log(realPath)
    ```

#### 文件操作

- **`rename(path: string, newPath: string)`**：`Promise<void>`  
  - 移动或重命名文件或目录。
  - **用法**：
    ```ts
    await FileManager.rename('/old/path', '/new/path')
    ```

- **`remove(path: string)`**：`Promise<void>`  
  - 删除文件或目录（包括目录内容）。
  - **用法**：
    ```ts
    await FileManager.remove('/path/to/file')
    ```

#### 压缩（Zip 和 Unzip）

- **`zip(srcPath: string, destPath: string, shouldKeepParent?: boolean)`**：`Promise<void>`  
  - 将文件或目录压缩到指定目标位置。`shouldKeepParent` 确定是否保留顶层目录。
  - **用法**：
    ```ts
    await FileManager.zip('/path/to/folder', '/path/to/folder.zip', true)
    ```

- **`unzip(srcPath: string, destPath: string)`**：`Promise<void>`  
  - 解压 zip 文件内容。
  - **用法**：
    ```ts
    await FileManager.unzip('/path/to/file.zip', '/path/to/extracted')
    ```
   
#### 文件书签

- **`getAllFileBookmarks()`**: `Array<{name: string; path: string}>`
  - 读取所有文件书签。 为文件或文件夹添加一个书签，之后您可以在脚本中访问这些文件和文件夹，这通常用于访问Scripting app外部的文件。文件书签可以通过工具-文件书签管理页面添加；当在快捷指令app和分享弹窗中访问了Scripting app外部的文件时，文件书签也会被自动创建，为了让您的intent.tsx里的脚本可以正确的访问这些文件。您需要删除不再访问的文件书签以释放资源。
  - **用法**:
    ```ts
    const bookmarks = FileManager.getAllFileBookmarks()
    ```

- **`bookmarkExists(name: string)`**: `bool`
  - 根据给定的name判断是否存在文件书签。
  - **用法**:
    ```ts
    if (FileManager.bookmarkExists("My Bookmark")) {
      // ...
    }
    ```

- **`bookmarkedPath(name: string)`**: `string | null`
  - 获取给定的name的文件书签的文件路径，如果不存在则返回`null`.
  - **用法**:
    ```ts
    const filePath = FileManager.bookmarkedPath("My Bookmark")
    if (filePath) {
      // ...
    }
    ```
    
---

`FileManager` API 提供了强大的文件和目录管理功能，支持 iCloud 和本地操作。请确保正确处理异步操作以保证功能流畅运行。