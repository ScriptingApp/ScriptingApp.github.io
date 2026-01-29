---
title: FileEntity
description: 该接口提供了文件级的读写操作接口，用于在 `HttpServer` 或其他脚本环境中直接读取、写入、定位和关闭文件。

---

`FileEntity` 类提供了文件级的读写操作接口，用于在 `HttpServer` 或其他脚本环境中直接读取、写入、定位和关闭文件。
它支持以多种模式（只读、只写、读写、追加等）打开文件，并能配合 `HttpResponse` 直接返回文件内容给客户端。

---

## 概述

`FileEntity` 允许你在脚本中对文件执行以下操作：

* 打开文件进行读取、写入或读写；
* 按偏移量定位文件读取位置；
* 从文件中读取或写入指定大小的数据；
* 在使用完成后关闭文件；
* 支持以二进制流方式处理文件内容；
* 可直接作为 `HttpResponse.raw()` 的响应体返回。

---

## 实例属性

### `path: string`

文件路径（只读属性），表示该 `FileEntity` 对应的本地文件路径。

**示例：**

```ts
const file = FileEntity.openForReading("/path/to/file.txt")
console.log(file.path)
// 输出: "/path/to/file.txt"
```

---

## 实例方法

### `seek(offset: number): boolean`

移动文件指针到指定的偏移位置。
偏移量以字节为单位，返回值表示是否定位成功。

**参数：**

| 参数名      | 类型       | 说明          |
| -------- | -------- | ----------- |
| `offset` | `number` | 要移动到的字节偏移量。 |

**返回值：**

* `true`：定位成功；
* `false`：定位失败。

**示例：**

```ts
const file = FileEntity.openForReading("/path/to/data.bin")
file.seek(128)
```

---

### `read(size: number): Data`

从当前文件指针位置开始读取指定字节数的数据。
读取到的内容以 `Data` 对象返回。

**参数：**

| 参数名    | 类型       | 说明        |
| ------ | -------- | --------- |
| `size` | `number` | 要读取的字节数量。 |

**返回值：**

* `Data`：包含所读取的文件数据。

**示例：**

```ts
const file = FileEntity.openForReading("/path/to/text.txt")
const data = file.read(100)
console.log(data.toRawString("utf-8"))
file.close()
```

---

### `write(data: Data): void`

将指定的 `Data` 写入到文件的当前位置。

**参数：**

| 参数名    | 类型     | 说明          |
| ------ | ------ | ----------- |
| `data` | `Data` | 要写入文件的数据对象。 |

**异常：**
如果文件未以写模式打开或写入失败，将抛出异常。

**示例：**

```ts
const data = Data.fromRawString("Hello, Scripting!", "utf-8")
const file = FileEntity.openNewForWriting("/tmp/test.txt")
file.write(data)
file.close()
```

---

### `close(): void`

关闭文件并释放资源。
关闭后不应再调用 `read()` 或 `write()`。

**示例：**

```ts
const file = FileEntity.openForReading("/path/to/file.txt")
// ...进行读取操作...
file.close()
```

---

## 静态方法

### `static openForReading(path: string): FileEntity`

以只读模式打开文件。
如果文件不存在或无法读取，将抛出异常。

**参数：**

| 参数名    | 类型       | 说明        |
| ------ | -------- | --------- |
| `path` | `string` | 要打开的文件路径。 |

**示例：**

```ts
const file = FileEntity.openForReading("/path/to/image.png")
```

---

### `static openNewForWriting(path: string): FileEntity`

以写入模式打开文件，若文件已存在会被覆盖。
适合用于创建新文件或清空原文件内容。

**示例：**

```ts
const file = FileEntity.openNewForWriting("/tmp/output.txt")
file.write(Data.fromRawString("New file created"))
file.close()
```

---

### `static openForMode(path: string, mode: string): FileEntity`

以指定模式打开文件。
支持的模式遵循标准 POSIX 文件模式，但建议使用带有二进制标志的形式（例如 `"rb"`, `"r+b"`），以确保跨平台兼容性，因为该接口底层以二进制方式读写文件。

**参数：**

| 模式               | 说明                                          |
| ---------------- | ------------------------------------------- |
| `"r"` / `"rb"`   | 以只读方式打开文件（文件必须存在）。推荐使用 `"rb"`，兼容性更好。        |
| `"w"` / `"wb"`   | 以只写方式打开文件（文件存在则清空，不存在则创建）。推荐使用 `"wb"`。      |
| `"a"` / `"ab"`   | 以追加写入模式打开文件（写入内容将添加到末尾，不存在则创建）。推荐使用 `"ab"`。 |
| `"r+"` / `"r+b"` | 以读写模式打开文件（文件必须存在）。推荐使用 `"r+b"`，支持二进制读写。     |
| `"w+"` / `"w+b"` | 以读写模式打开文件（文件存在则清空，不存在则创建）。推荐使用 `"w+b"`。     |
| `"a+"` / `"a+b"` | 以读写追加模式打开文件（文件不存在则创建）。推荐使用 `"a+b"`。         |

> 💡 **建议：**
> 优先使用带 `b` 后缀的模式（如 `"rb"`, `"r+b"` 等），因为 `FileEntity` 的底层接口以二进制流方式处理数据，这样可避免在不同平台上出现编码或换行符差异问题。

**示例：**

```ts
// 以二进制读写模式打开文件（推荐）
const file = FileEntity.openForMode("/tmp/log.bin", "r+b")

// 写入二进制内容
file.write(Data.fromRawString("append log\n"))

// 定位到文件开头并读取数据
file.seek(0)
const content = file.read(20).toRawString("utf-8")
console.log(content)

file.close()
```

---

## 在 HttpResponse 中使用文件

`FileEntity` 可直接作为 `HttpResponse.raw()` 的响应体，实现文件下载或静态内容响应。

**示例：**

```ts
server.registerHandler("/download", (req) => {
  const file = FileEntity.openForReading(Path.join(Script.directory, "manual.pdf"))
  return HttpResponse.raw(200, "OK", {
    headers: { "Content-Type": "application/pdf" },
    body: file
  })
})
```

客户端访问 `/download` 时将直接下载该文件。

---

## 总结

| 方法                           | 功能            | 使用场景       |
| ---------------------------- | ------------- | ---------- |
| `seek()`                     | 定位文件读取/写入位置   | 分段读取或随机访问  |
| `read()`                     | 从文件中读取数据      | 读取文本或二进制内容 |
| `write()`                    | 写入数据到文件       | 保存日志、导出文件  |
| `close()`                    | 关闭文件          | 释放资源       |
| `openForReading()`           | 以只读方式打开文件     | 读取静态资源     |
| `openNewForWriting()`        | 以写入模式打开文件（覆盖） | 创建新文件      |
| `openForWritingAndReading()` | 以读写模式打开文件     | 文件编辑或流式传输  |
| `openForMode()`              | 以自定义模式打开文件    | 兼容多种操作方式   |
