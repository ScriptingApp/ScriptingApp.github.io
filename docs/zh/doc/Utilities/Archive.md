---
title: Archive（归档）
tag: PRO
---

`Archive` 类用于读取、创建与修改压缩归档文件（如 ZIP 格式）。
它支持以同步或异步的方式向归档中添加文件、目录或从归档中提取文件内容。

---

## 概述

`Archive` 提供了灵活的接口来管理压缩包内容，包括：

* 打开已有归档或创建新归档；
* 添加文件、目录或自定义数据；
* 支持异步与同步两种操作模式；
* 提取文件内容到内存或磁盘；
* 删除归档中的条目；
* 支持自定义压缩算法（如 `deflate`）；
* 可通过 `entries()` 获取归档中的所有条目信息。

---

## 静态方法

### `static openForMode(path: string, accessMode: "update" | "read", options?: { pathEncoding?: Encoding }): Archive`

打开一个归档文件。

**参数：**

| 参数名                    | 类型                   | 说明                                                       |
| ---------------------- | -------------------- | -------------------------------------------------------- |
| `path`                 | `string`             | 要打开的归档文件路径。                                              |
| `accessMode`           | `"update" \| "read"` | 访问模式： - `"read"`：以只读方式打开； - `"update"`：以可修改方式打开。 |
| `options.pathEncoding` | `Encoding`           | 可选，指定归档中文件路径的编码方式，默认为 `"utf-8"`。                         |

**返回值：**
返回一个 `Archive` 对象。

**示例：**

```ts
const archive = Archive.openForMode("/tmp/example.zip", "update")
```

---

## 属性

### `path: string`

归档文件的路径。

**示例：**

```ts
console.log(archive.path)
```

---

### `data: Data | null`

归档的二进制数据内容（如果以内存方式打开）。

---

## 实例方法

### `entries(pathEncoding?: Encoding): ArchiveEntry[]`

获取归档中所有条目的信息。

**参数：**
`pathEncoding` 可选，指定路径的编码方式，默认为 `"utf-8"`。

**返回值：**
返回一个 `ArchiveEntry` 对象的数组，包含所有条目的信息。

---

### `getEntryPaths(encoding?: Encoding): string[]`

获取归档中所有条目的路径。

**参数：**
`encoding` 可选，指定路径的编码方式，默认为 `"utf-8"`。

**返回值：**
返回一个字符串数组，包含所有条目的路径。

---

### `getEntry(path: string): ArchiveEntry | null`

获取归档中指定路径的条目。

**参数：**
`path` 要获取的条目的路径。

**返回值：**
返回一个 `ArchiveEntry` 对象，或 `null` 如果条目不存在。

---

### `contains(path: string): boolean`

判断归档中是否包含指定路径的条目。

**参数：**

`path` 要判断的条目的路径。

**返回值：**
`true` 表示存在，`false` 表示不存在。

**示例：**

```ts
if (archive.contains("README.md")) {
  console.log("Archive contains README.md")
}
```

---

### `addEntry(path: string, toPath: string, options?: { compressionMethod?: "deflate" | "none"; bufferSize?: number }): Promise<void>`

向归档中添加一个现有文件（异步）。

**参数：**

| 参数名                         | 类型                     | 说明                      |
| --------------------------- | ---------------------- | ----------------------- |
| `path`                      | `string`               | 源文件路径。                  |
| `toPath`                    | `string`               | 添加到归档中的目标路径。            |
| `options.compressionMethod` | `"deflate"` | `"none"` | 压缩方式，默认为 `"none"`。      |
| `options.bufferSize`        | `number`               | 缓冲区大小，默认为 `16*1024` 字节。 |

**示例：**

```ts
await archive.addEntry("/tmp/input.txt", "docs/input.txt", {
  compressionMethod: "deflate"
})
```

---

### `addEntrySync(path: string, toPath: string, options?)`

同步版本，与 `addEntry()` 功能相同。
若添加失败会抛出异常。

---

### `addFileEntry(path: string, uncompressedSize: number, provider: (offset: number, length: number) => Data, options?): Promise<void>`

通过数据提供函数添加文件到归档（异步）。

**参数：**

| 参数名                         | 类型                                         | 说明                           |
| --------------------------- | ------------------------------------------ | ---------------------------- |
| `path`                      | `string`                                   | 要添加的归档路径（文件名）。               |
| `uncompressedSize`          | `number`                                   | 文件未压缩时的大小。                   |
| `provider`                  | `(offset: number, length: number) => Data` | 用于提供文件数据的函数，会被多次调用直到读取完所有数据。 |
| `options.modificationDate`  | `Date`                                     | 修改时间（可选）。                    |
| `options.compressionMethod` | `"deflate"` | `"none"`                     | 压缩方式（默认 `"none"`）。           |
| `options.bufferSize`        | `number`                                   | 缓冲区大小，默认 `16*1024` 字节。       |

**示例：**

```ts
const data = Data.fromRawString("abcdefg".repeat(100))
await archive.addFileEntry("fromMemory.txt", data.count, (offset, length) => {
  return data.slice(offset, offset + length)
})
```

---

### `addFileEntrySync(...)`

同步版本，与上方异步方法功能一致。

---

### `addDirectoryEntry(path: string, options?): Promise<void>`

向归档中添加一个目录。

**参数：**

| 参数名                         | 类型                     | 说明                   |
| --------------------------- | ---------------------- | -------------------- |
| `path`                      | `string`               | 要添加的目录路径。            |
| `options.modificationDate`  | `Date`                 | 修改日期（可选）。            |
| `options.compressionMethod` | `"deflate"` | `"none"` | 压缩方式（默认 `"none"`）。   |
| `options.bufferSize`        | `number`               | 缓冲区大小（默认 `16*1024`）。 |

**示例：**

```ts
await archive.addDirectoryEntry("images/")
```

---

### `addDirectoryEntrySync(...)`

同步版本，与 `addDirectoryEntry()` 功能相同。

---

### `removeEntry(path: string, options?): Promise<void>`

从归档中删除指定路径的条目（异步）。

**参数：**

| 参数名                  | 类型       | 说明                   |
| -------------------- | -------- | -------------------- |
| `path`               | `string` | 要删除的条目路径。            |
| `options.bufferSize` | `number` | 缓冲区大小（默认 `16*1024`）。 |

**示例：**

```ts
await archive.removeEntry("old/file.txt")
```

---

### `removeEntrySync(...)`

同步版本，与 `removeEntry()` 功能相同。

---

### `extract(path: string, consumer: (data: Data) => void, options?): Promise<void>`

从归档中提取指定文件，并将其数据通过回调函数分块返回（异步）。

**参数：**

| 参数名                  | 类型                     | 说明                   |
| -------------------- | ---------------------- | -------------------- |
| `path`               | `string`               | 要提取的文件路径。            |
| `consumer`           | `(data: Data) => void` | 数据消费函数，用于处理提取的数据块。   |
| `options.bufferSize` | `number`               | 缓冲区大小（默认 `16*1024`）。 |

**示例：**

```ts
await archive.extract("docs/manual.txt", (chunk) => {
  console.log("Received chunk:", chunk.count)
})
```

---

### `extractSync(...)`

同步版本，与 `extract()` 功能一致。

---

### `extractTo(path: string, to: string, options?): Promise<void>`

将归档中的文件或目录提取到指定磁盘路径（异步）。

**参数：**

| 参数名                                | 类型        | 说明                               |
| ---------------------------------- | --------- | -------------------------------- |
| `path`                             | `string`  | 归档内路径。                           |
| `to`                               | `string`  | 提取到的目标路径。                        |
| `options.bufferSize`               | `number`  | 缓冲区大小（默认 `16*1024`）。             |
| `options.allowUncontainedSymlinks` | `boolean` | 是否允许解压出不在目标目录内的符号链接（默认 `false`）。 |

**示例：**

```ts
await archive.extractTo("docs/", "/tmp/extracted/")
```

---

### `extractToSync(...)`

同步版本，与 `extractTo()` 功能一致。

---

## ArchiveEntry 类型

`ArchiveEntry` 表示归档中的一个条目（文件、目录或符号链接）。

| 属性                 | 类型                                     | 说明                  |
| ------------------ | -------------------------------------- | ------------------- |
| `path`             | `string`                               | 条目的路径。              |
| `type`             | `"file"` | `"directory"` | `"symlink"` | 条目类型。               |
| `isCompressed`     | `boolean`                              | 是否为压缩状态。            |
| `compressedSize`   | `number`                               | 压缩后的大小（字节）。         |
| `uncompressedSize` | `number`                               | 原始未压缩大小（字节）。        |
| `fileAttributes`   | `{ posixPermissions?: number; modificationDate?: Date }`                             | 文件属性信息（时间戳、类型、大小等）。 |

**示例：**

```ts
for (const entry of archive.entries()) {
  console.log(`[${entry.type}] ${entry.path} (${entry.uncompressedSize} bytes)`)
}
```

---

## 综合示例

### 创建新压缩包并添加文件

```ts
const archive = Archive.openForMode("/tmp/example.zip", "update")

await archive.addEntry(
  "/tmp/hello.txt",
  "docs/hello.txt",
  { compressionMethod: "deflate" }
)

await archive.addDirectoryEntry("images/")
await archive.addEntry("/tmp/logo.png", "images/logo.png")

console.log("Archive entries:", archive.entries().length)
```

### 提取文件到本地目录

```ts
const archive = Archive.openForMode("/tmp/example.zip", "read")
await archive.extractTo("docs/hello.txt", "/tmp/unpacked/hello.txt")
```
