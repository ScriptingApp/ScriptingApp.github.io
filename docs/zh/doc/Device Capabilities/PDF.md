---
title: PDF

---

Scripting app 提供了 `PDFDocument` 和 `PDFPage` 两个类，封装了 PDFKit 功能，支持加载、修改、提取、保存 PDF 文件，并支持同步或异步的操作方式。

---

## `PDFPage` 类

表示 PDF 文档中的单个页面。提供访问页面文本、数据和相关信息的能力。

### 静态方法

#### `PDFPage.fromImage(image: UIImage): PDFPage | null`

从图像创建一个新的 PDF 页面。

* **参数**：

  * `image`：要转换为 PDF 页的图像。
* **返回**：`PDFPage` 实例，若失败返回 `null`。

---

### 属性

#### `document: PDFDocument | null`

所属的 PDF 文档实例。若该页面尚未添加至文档，则为 `null`。

#### `label: string | null`

页面的标签（如页码、用户可定义标题等）。

#### `numberOfCharacters: number`

页面中提取到的字符数量。

---

### 异步属性（getter）

#### `string: Promise<string | null>`

异步获取页面的文本内容。

* 如果页面是图像或不可解析为文本，则返回 `null`。

#### `data: Promise<Data | null>`

异步获取页面的原始二进制数据。

---

## `PDFDocument` 类

表示完整的 PDF 文档。可读取、修改页面，提取元信息，并进行保存（支持异步和同步写入）。

---

### 静态方法

#### `PDFDocument.fromData(data: Data): PDFDocument | null`

从二进制数据创建文档实例。

* **参数**：

  * `data`：有效的 PDF 数据。
* **返回**：`PDFDocument` 实例，若无效则为 `null`。

#### `PDFDocument.fromFilePath(filePath: string): PDFDocument | null`

从文件路径加载 PDF 文件。

* **参数**：

  * `filePath`：PDF 文件的本地路径。
* **返回**：成功返回 `PDFDocument`，否则为 `null`。

---

### 只读属性

#### `pageCount: number`

文档总页数。

#### `filePath: string | null`

文档源文件路径。若是通过内存创建则为 `null`。

#### `isLocked: boolean`

文档是否被加锁（需要密码解锁）。

#### `isEncrypted: boolean`

文档是否加密。

#### `documentAttributes: object | null`

PDF 的元数据（如作者、标题、创建时间等）。

```ts
{
  author?: string | null
  creationDate?: Date | null
  creator?: string | null
  keywords?: any | null
  modificationDate?: Date | null
  producer?: string | null
  subject?: string | null
  title?: string | null
}
```

##### 示例

```ts
const doc = PDFDocument.fromFilePath("path/to/example.pdf")
const attrs = doc.documentAttributes
console.log(attrs?.title) // 输出："项目报告"
```

---

### 异步属性（getter）

#### `data: Promise<Data | null>`

异步获取整个文档的二进制数据。

#### `string: Promise<string | null>`

异步获取整个文档的文本内容。若为图片型 PDF，可能返回 `null`。

---

### 方法

#### `pageAt(index: number): PDFPage | null`

获取指定索引的页面。

* **参数**：

  * `index`：页面索引（从 0 开始）。
* **返回**：`PDFPage` 实例，索引无效时返回 `null`。

#### `indexOf(page: PDFPage): number`

获取指定页面在文档中的索引。

* **参数**：

  * `page`：页面实例。
* **返回**：索引值，若找不到则为 `-1`。

#### `removePageAt(index: number): void`

移除指定索引的页面。

#### `insertPageAt(page: PDFPage, atIndex: number): void`

在指定索引插入一个页面。

##### 示例

```ts
const doc = PDFDocument.fromFilePath("path/to/document.pdf")
const imagePage = PDFPage.fromImage(image)
doc.insertPageAt(imagePage, 1)
```

#### `exchangePage(atIndex: number, withPageIndex: number): void`

交换两个页面的位置。

---

### 保存方法

#### `writeSync(toFilePath: string, options?): boolean`

将 PDF 同步写入指定路径，支持设置密码和其他选项。

* **参数**：

  * `toFilePath`：输出文件路径。
  * `options`（可选）：

    ```ts
    {
      ownerPassword?: string
      userPassword?: string
      burnInAnnotations?: boolean
      saveTextFromOCR?: boolean
      saveImagesAsJPEG?: boolean
    }
    ```
* **返回**：保存成功返回 `true`，否则为 `false`。

##### 示例

```ts
const doc = PDFDocument.fromFilePath("path/to/input.pdf")
const success = doc.writeSync("path/to/output.pdf", {
  ownerPassword: "admin",
  userPassword: "1234"
})
```

#### `write(toFilePath: string, options?): Promise<boolean>`

异步方式写入 PDF 文件。

* 参数与 `writeSync` 相同。
* **返回值**：`Promise<boolean>` 表示保存是否成功。

---

### 解锁文档

#### `unlock(password: string): boolean`

尝试使用密码解锁文档。

* **参数**：

  * `password`：密码字符串。
* **返回**：若解锁成功，返回 `true`，否则返回 `false`。

---

## 示例代码

```ts
const doc = PDFDocument.fromFilePath("path/to/book.pdf")
if (doc && !doc.isLocked) {
  const firstPage = doc.pageAt(0)
  const text = await firstPage?.string
  console.log("第一页文本：", text)
  
  const success = await doc.write("path/to/book-copy.pdf")
  console.log(success ? "保存成功" : "保存失败")
}
```