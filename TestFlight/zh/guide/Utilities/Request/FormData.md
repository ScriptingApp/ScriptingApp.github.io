# 表单数据

`FormData` 类用于构造表单数据（`multipart/form-data`），以便在网络请求中上传文本字段或文件数据。
它的行为与浏览器中的 **Fetch API FormData** 基本一致，但在 **Scripting app** 中进行了扩展以支持 `Data` 类型（原生二进制对象），从而更方便地上传文件或图片。

你可以将 `FormData` 对象直接作为 `fetch()` 请求的 `body` 参数使用。系统会自动生成带有正确边界的 `multipart/form-data` 请求体。

***

## 定义

```ts
class FormData {
  append(name: string, value: string): void
  append(name: string, value: Data, mimeType: string, filename?: string): void
  get(name: string): string | Data | null
  getAll(name: string): any[]
  has(name: string): boolean
  delete(name: string): void
  set(name: string, value: string): void
  set(name: string, value: Data, filename?: string): void
  forEach(callback: (value: any, name: string, parent: FormData) => void): void
  entries(): [string, any][]
  toJson(): Record<string, any>
}
```

***

## 主要用途

- 构造带文本与文件混合的表单请求
- 用于文件上传接口（如图片、音频、文档等）
- 代替 JSON 结构上传二进制文件或表单信息

***

## 方法说明

### `append(name: string, value: string): void`

### `append(name: string, value: Data, mimeType: string, filename?: string): void`

向表单中添加一个字段。
可以用于添加文本字段或文件数据。

#### 参数说明

| 参数           | 类型           | 说明                                            |                               |
| ------------ | ------------ | --------------------------------------------- | ----------------------------- |
| **name**     | `string`     | 字段名称。                                         |                               |
| **value**    | `string`     | `Data`                                        | 字段值，可以是字符串或 `Data` 对象（二进制文件）。 |
| **mimeType** | `string`     | 文件的 MIME 类型（如 `"image/png"`）。仅在传入 `Data` 时需要。 |                               |
| **filename** | `string`（可选） | 文件名，仅在上传文件时使用。                                |                               |

#### 示例

```tsx
const form = new FormData()
form.append("username", "Tom")
form.append("file", Data.fromFile("/path/to/image.png"), "image/png", "avatar.png")
```

***

### `set(name: string, value: string): void`

### `set(name: string, value: Data, filename?: string): void`

设置一个字段的值。
若该字段已存在，则会被覆盖。
与 `append()` 的区别是：`set()` 仅保留一个值，而 `append()` 可重复添加同名字段。

#### 示例

```tsx
const form = new FormData()
form.set("message", "Hello world")
form.set("file", Data.fromFile("/path/to/file.txt"), "text/plain", "note.txt")
```

***

### `get(name: string): string | Data | null`

获取指定字段的值。
如果字段不存在，则返回 `null`。

#### 示例

```tsx
const form = new FormData()
form.append("title", "My Post")
console.log(form.get("title")) // 输出: "My Post"
```

***

### `getAll(name: string): any[]`

获取同名字段的所有值（如果使用了多次 `append()`）。

#### 示例

```tsx
const form = new FormData()
form.append("tag", "swift")
form.append("tag", "ios")
form.append("tag", "scripting")

console.log(form.getAll("tag")) // ["swift", "ios", "scripting"]
```

***

### `has(name: string): boolean`

检查表单中是否存在指定名称的字段。

#### 示例

```tsx
const form = new FormData()
form.append("username", "Tom")

console.log(form.has("username")) // true
console.log(form.has("password")) // false
```

***

### `delete(name: string): void`

删除指定名称的字段及其所有值。

#### 示例

```tsx
const form = new FormData()
form.append("title", "Hello")
form.append("file", Data.fromFile("/path/to/file.txt"), "text/plain")

form.delete("file")
```

***

### `forEach(callback: (value: any, name: string, parent: FormData) => void): void`

遍历所有表单字段，执行回调函数。

#### 示例

```tsx
const form = new FormData()
form.append("user", "Tom")
form.append("age", "25")

form.forEach((value, name) => {
  console.log(`${name}: ${value}`)
})
```

***

### `entries(): [string, any][]`

返回一个由 `[name, value]` 组成的键值对数组。

#### 示例

```tsx
const form = new FormData()
form.append("username", "Tom")
form.append("age", "25")
console.log(form.entries())
// [["username", "Tom"], ["age", "25"]]
```

***

### `toJson(): Record<string, any>`

将表单数据转换为普通的 JavaScript 对象，用于调试或日志输出。
⚠️ 注意：如果表单中包含文件（`Data` 类型），此方法不会输出二进制内容，而是显示为占位符信息。

#### 示例

```tsx
const form = new FormData()
form.append("name", "Tom")
form.append("photo", Data.fromFile("/path/to/avatar.png"), "image/png", "avatar.png")

console.log(form.toJson())
// { name: "Tom", photo: "[Data: image/png]" }
```

***

## 使用示例

### 示例 1：上传文件

```tsx
const form = new FormData()
form.append("file", Data.fromFile("/path/to/image.png"), "image/png", "avatar.png")
form.append("userId", "1234")

const response = await fetch("https://api.example.com/upload", {
  method: "POST",
  body: form,
})

console.log(await response.json())
```

***

### 示例 2：同时上传多个文件

```tsx
const form = new FormData()
form.append("files", Data.fromFile("/path/to/photo1.jpg"), "image/jpeg", "photo1.jpg")
form.append("files", Data.fromFile("/path/to/photo2.jpg"), "image/jpeg", "photo2.jpg")

await fetch("https://api.example.com/multi-upload", {
  method: "POST",
  body: form,
})
```

***

### 示例 3：构造包含文本与文件的复合请求

```tsx
const form = new FormData()
form.append("title", "Travel Memories")
form.append("description", "A collection of my travel photos.")
form.append("cover", Data.fromFile("/path/to/cover.png"), "image/png", "cover.png")

const response = await fetch("https://example.com/uploadPost", {
  method: "POST",
  body: form,
})

console.log(await response.text())
```

***

### 示例 4：遍历并调试表单内容

```tsx
const form = new FormData()
form.append("name", "Alice")
form.append("file", Data.fromFile("/path/to/file.txt"), "text/plain", "file.txt")

form.forEach((value, name) => {
  console.log(`${name}:`, value instanceof Data ? "Binary Data" : value)
})
```

***

## 与其他类的关系

| 类名             | 说明                                                          |
| -------------- | ----------------------------------------------------------- |
| **`fetch()`**  | 可直接使用 `FormData` 实例作为请求体。系统会自动设置请求头为 `multipart/form-data`。 |
| **`Data`**     | 用于表示文件或图片等二进制内容，作为 `FormData` 字段值传入。                        |
| **`Request`**  | 可通过 `RequestInit.body` 设置 `FormData` 实例。                    |
| **`Response`** | 可使用 `response.formData()` 将响应解析为 `FormData`。                |

***

## 注意事项

- **自动设置 Content-Type**：使用 `FormData` 时，`fetch()` 会自动设置正确的 `Content-Type`（带边界）。不要手动覆盖。
- **同名字段**：支持使用 `append()` 为同一字段名添加多个值。
- **文件上传**：上传文件时需传入 MIME 类型，否则默认可能被识别为 `application/octet-stream`。
- **JSON 转换限制**：`toJson()` 仅用于调试显示，不适合用于真实数据传输。

***

## 小结

`FormData` 是 **Scripting 网络请求体系中用于构造 multipart/form-data 请求的核心类**，具备以下特性：

- 支持文本与文件混合上传
- 与 `fetch()` 无缝集成
- 支持 `Data` 类型文件传递
- 提供便利的 `forEach()`、`entries()`、`toJson()` 等辅助方法
- 完全兼容 Web 标准的 FormData 行为
