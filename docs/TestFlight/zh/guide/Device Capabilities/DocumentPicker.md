---
title: 文档选择器
description: 从文件应用中选择文件。

---

`DocumentPicker` 类为 iOS 的文档选择器提供接口，允许用户在 Files App 中选择文件或目录，或者将文件导出到 Files App。这对于需要访问用户文件、共享内容或将资源有序保存在指定目录中的脚本非常有用。

---

## 类型定义

### `PickFilesOption`

用于配置 `pickFiles` 文件选择功能的选项。

- **`initialDirectory`** (可选)  
  - **类型**: `string`  
  - **描述**: 指定文档选择器初次显示的目录。

- **`types`** (可选)  
  - **类型**: `string[]`  
  - **描述**: 要在文档选择器中显示的统一类型标识符（UTI）数组。更多信息可参考 [Uniform Type Identifiers](https://developer.apple.com/documentation/uniformtypeidentifiers/uttype-swift.struct)。

- **`shouldShowFileExtensions`** (可选)  
  - **类型**: `boolean`  
  - **描述**: 是否显示文件扩展名。默认为 `true`。

- **`allowsMultipleSelection`** (可选)  
  - **类型**: `boolean`  
  - **描述**: 是否允许选择多个文件。默认为 `false`。

---

### `ExportFilesOptions`

用于通过 `exportFiles` 导出文件的选项。

- **`initialDirectory`** (可选)  
  - **类型**: `string`  
  - **描述**: 指定文档选择器初次显示的目录。

- **`files`**  
  - **类型**: `Array<{ data: Data; name: string }>`  
  - **描述**: 要导出的文件数组。数组中的每个文件对象必须包含：
    - **`data`**: 文件的 `Data` 数据对象。  
    - **`name`**: 文件名。

---

## 类方法

### `DocumentPicker.pickFiles(options?: PickFilesOption): Promise<string[]>`

允许用户从 Files App 中选择文件。

#### 参数
- **`options`** (可选): `PickFilesOption`  
  - 用于文件选择的配置选项。

#### 返回值
- 一个 Promise，当用户完成选择后，返回文件路径数组（`string[]`）。

#### 示例
```typescript
async function run() {
  const imageFilePath = await DocumentPicker.pickFiles()
  if (imageFilePath != null) {
    // 处理用户选择的文件路径
  }
}
run()
```

---

### `DocumentPicker.pickDirectory(initialDirectory?: string): Promise<string | null>`

允许用户从 Files App 中选择一个目录。

#### 参数
- **`initialDirectory`** (可选): `string`  
  - 文档选择器初次显示的目录。

#### 返回值
- 一个 Promise，解析后返回用户所选目录的路径（`string`），如果用户取消选择，则返回 `null`。

#### 示例
```typescript
const selectedDirectory = await DocumentPicker.pickDirectory()
if (selectedDirectory == null) {
  // 用户取消了选择
}
```

---

### `DocumentPicker.exportFiles(options: ExportFilesOptions): Promise<string[]>`

将文件导出到 Files App。

#### 参数
- **`options`**: `ExportFilesOptions`  
  - 用于配置文件导出的选项，包括文件数据和文件名。

#### 返回值
- 一个 Promise，解析后返回导出的文件路径数组（`string[]`）。

#### 示例
```typescript
async function run() {
  const textContent = "Hello Scripting!"
  const result = await DocumentPicker.exportFiles({
    files: [
      {
        data: Data.fromString(textContent)!,
        name: 'greeting.txt',
      }
    ]
  });

  if (result.length > 0) {
    console.log('导出的文件: ', result)
  }
}
run()
```

---

### `DocumentPicker.stopAcessingSecurityScopedResources(): void`

放弃对安全范围资源（Security-Scoped Resources）的访问，例如通过文档选择器访问到的文件或目录。当不再需要访问这些资源时，请调用此方法以确保您的应用能够高效地管理资源。

```typescript
DocumentPicker.stopAcessingSecurityScopedResources()
```