---
title: 文件管理器

---

FileManager 模块提供对文件系统的统一访问接口，是脚本与本地文件及 iCloud 文件交互的主要方式。它支持对目录与文件进行读取、写入、拷贝、移动、删除、压缩、解压、符号链接操作，以及 iCloud 文件管理等功能。

---

## 基本属性

### `FileManager.scriptsDirectory: string`

存放脚本文件的目录路径。开发者编写的脚本会存储在该目录中。

### `FileManager.isiCloudEnabled: boolean`

用于判断 iCloud 是否可用。若当前设备未登录 iCloud，或未授权 Scripting 使用 iCloud，该属性返回 `false`。

### `FileManager.iCloudDocumentsDirectory: string`

返回 iCloud 的 `Documents` 目录路径。若 iCloud 未启用，调用该属性会抛出错误。使用前应检查 `FileManager.isiCloudEnabled`。

### `FileManager.appGroupDocumentsDirectory: string`

返回 App Group 的共享 Documents 目录路径。存储于该目录的文件不会显示在系统的“文件”应用中，但 Widget 中运行的脚本可访问这些文件。

### `FileManager.documentsDirectory: string`

返回本地的 `Documents` 目录路径。存储于该目录的文件可在“文件”应用中查看，但 Widget 不可访问。

### `FileManager.temporaryDirectory: string`

返回临时目录路径，用于创建临时文件。系统可能在适当时机自动清除该目录内容。

---

## iCloud 文件管理

### `FileManager.isFileStoredIniCloud(filePath: string): boolean`

判断指定文件是否为存储于 iCloud 的文件。

| 参数     | 类型   | 说明     |
| -------- | ------ | -------- |
| filePath | string | 文件路径 |

### `FileManager.isiCloudFileDownloaded(filePath: string): boolean`

判断指定的 iCloud 文件是否已从云端下载到本地。

### `FileManager.downloadFileFromiCloud(filePath: string): Promise<boolean>`

下载指定的 iCloud 文件。

| 返回值             | 说明         |
| ------------------ | ------------ |
| Promise\<boolean\> | 下载是否成功 |

示例：

```ts
if (FileManager.isiCloudEnabled) {
  const file = FileManager.iCloudDocumentsDirectory + "/data.json";
  const ok = await FileManager.downloadFileFromiCloud(file);
}
```

### `FileManager.getShareUrlOfiCloudFile(path: string, expiration?: number): string`

生成 iCloud 文件的可分享下载链接。文件必须存在于 iCloud 且已上传。

| 参数       | 类型        | 说明                                                           |
| ---------- | ----------- | -------------------------------------------------------------- |
| path       | string      | 必须以 `FileManager.iCloudDocumentsDirectory` 为前缀的文件路径 |
| expiration | number 可选 | 链接过期时间戳                                                 |

使用时需配合 `try-catch` 捕获异常。

---

## 目录与文件操作

支持异步（Promise）与同步（Sync）两种版本。同步方法会阻塞执行线程，在性能敏感场景应优先使用异步版本。

### 创建目录

#### `createDirectory(path: string, recursive?: boolean): Promise<void>`

#### `createDirectorySync(path: string, recursive?: boolean): void`

| 参数      | 类型         | 说明                                |
| --------- | ------------ | ----------------------------------- |
| path      | string       | 目录路径                            |
| recursive | boolean 可选 | 若为 true，则自动创建不存在的父目录 |

### 创建符号链接

#### `createLink(path: string, target: string): Promise<void>`

#### `createLinkSync(path: string, target: string): void`

在 `path` 创建指向 `target` 的符号链接。

### 拷贝文件

#### `copyFile(path: string, newPath: string): Promise<void>`

#### `copyFileSync(path: string, newPath: string): void`

### 读取目录

#### `readDirectory(path: string, recursive?: boolean): Promise<string[]>`

#### `readDirectorySync(path: string, recursive?: boolean): string[]`

列出指定目录下所有内容，可递归。

### 判断文件存在性

#### `exists(path: string): Promise<boolean>`

#### `existsSync(path: string): boolean`

### 文件书签管理

文件书签用于持久访问用户授权的外部文件。

| 方法                    | 说明                                  |
| ----------------------- | ------------------------------------- |
| `bookmarkExists(name)`  | 判断书签是否存在                      |
| `getAllFileBookmarks()` | 获取所有书签名称与路径                |
| `bookmarkedPath(name)`  | 返回书签对应的路径，不存在时返回 null |

### 判断文件类型

| 方法                              | 返回    | 说明             |
| --------------------------------- | ------- | ---------------- |
| `isFile / isFileSync`             | boolean | 是否为文件       |
| `isDirectory / isDirectorySync`   | boolean | 是否为目录       |
| `isLink / isLinkSync`             | boolean | 是否为符号链接   |
| `isBinaryFile / isBinaryFileSync` | boolean | 是否为二进制文件 |

---

## 文件读写

支持三种读写格式：字符串、字节数组、Data。

### 读取文件

| 方法                | 返回类型   | 说明                 |
| ------------------- | ---------- | -------------------- |
| readAsString / Sync | string     | 指定编码读取文本内容 |
| readAsBytes / Sync  | Uint8Array | 读取为字节数组       |
| readAsData / Sync   | Data       | 读取为 Data 对象     |

### 写入文件

| 方法                 | 数据格式   |
| -------------------- | ---------- |
| writeAsString / Sync | string     |
| writeAsBytes / Sync  | Uint8Array |
| writeAsData / Sync   | Data       |

自动覆盖已有文件。

### 追加内容

| 方法              | 数据格式 |
| ----------------- | -------- |
| appendText / Sync | string   |
| appendData / Sync | Data     |

若文件或目录不存在将自动创建。

---

## 文件信息与操作

### `stat(path: string): Promise<FileStat>`

### `statSync(path: string): FileStat`

获取文件信息。若 path 为符号链接，会返回真实文件的状态。

### `rename / renameSync`

移动或重命名文件或目录。

### `remove / removeSync`

删除文件或目录（目录会递归删除）。

---

## 压缩与解压

### `zip(srcPath: string, destPath: string, shouldKeepParent?: boolean): Promise<void>`

### `zipSync(srcPath: string, destPath: string, shouldKeepParent?: boolean): void`

压缩文件或目录为 zip。

### `unzip(srcPath: string, destPath: string): Promise<void>`

### `unzipSync(srcPath: string, destPath: string): void`

解压 zip 文件。

示例：

```ts
const docs = FileManager.documentsDirectory;
await FileManager.zip(docs + "/MyScript", docs + "/MyScript.zip");
await FileManager.unzip(docs + "/MyScript.zip", docs + "/Output");
```

---

## 其他工具方法

### `mimeType(path: string): string`

返回文件的 MIME 类型。

### `destinationOfSymbolicLink(path: string): string`

返回符号链接指向的目标路径。

---

## 类型定义

### `FileStat`

```ts
type FileStat = {
  creationDate: number;
  modificationDate: number;
  type: string; // "file" | "directory" | "link" | "unixDomainSock" | "pipe" | "notFound"
  size: number;
};
```
