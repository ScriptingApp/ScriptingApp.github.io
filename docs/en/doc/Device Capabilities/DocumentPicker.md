---
title: DocumentPicker

---

The `DocumentPicker` class provides an interface to the iOS document picker, allowing users to select files or directories and export files from within the Files app. This is useful for scripts that need to access user files, share content, or organize resources in a specified directory.

## Type Definitions

### `PickFilesOption`

Options for configuring file selection with `pickFiles`.

- **`initialDirectory`** (optional)  
  - *Type*: `string`
  - *Description*: Specifies the initial directory that the document picker displays.

- **`types`** (optional)  
  - *Type*: `string[]`
  - *Description*: An array of uniform type identifiers (UTIs) for the document picker to display. For more details, see [Uniform Type Identifiers](https://developer.apple.com/documentation/uniformtypeidentifiers/uttype-swift.struct).

- **`shouldShowFileExtensions`** (optional)  
  - *Type*: `boolean`
  - *Description*: Indicates if file extensions should be visible. Defaults to `true`.

- **`allowsMultipleSelection`** (optional)  
  - *Type*: `boolean`
  - *Description*: Allows selecting multiple files. Defaults to `false`.

### `ExportFilesOptions`

Options for exporting files using `exportFiles`.

- **`initialDirectory`** (optional)  
  - *Type*: `string`
  - *Description*: Specifies the initial directory that the document picker displays.

- **`files`**  
  - *Type*: `Array<{ data: Data; name: string }>`
  - *Description*: An array of files to be exported. Each file object must contain:
    - **`data`**: The file data.
    - **`name`**: The file name.

## Class Methods

### `DocumentPicker.pickFiles(options?: PickFilesOption): Promise<string[]>`

Allows users to pick files from the Files app.

#### Parameters
- **`options`** (optional): `PickFilesOption`  
  - Configuration options for file selection.

#### Returns
- A promise that resolves with an array of file paths (`string[]`).

#### Example
```typescript
async function run() {
  const imageFilePath = await DocumentPicker.pickFiles()
  if (imageFilePath != null) {
    // Handle the selected file paths
  }
}
run()
```

### `DocumentPicker.pickDirectory(initialDirectory?: string): Promise<string | null>`

Allows users to pick a directory from the Files app.

#### Parameters
- **`initialDirectory`** (optional): `string`  
  - The initial directory that the document picker displays.

#### Returns
- A promise that resolves with the selected directory path as a `string`, or `null` if the user canceled the picker.

#### Example
```typescript
const selectedDirectory = await DocumentPicker.pickDirectory()
if (selectedDirectory == null) {
  // User canceled the picker
}
```

### `DocumentPicker.exportFiles(options: ExportFilesOptions): Promise<string[]>`

Exports files to the Files app.

#### Parameters
- **`options`**: `ExportFilesOptions`  
  - Configuration options for file export, including file data and names.

#### Returns
- A promise that resolves with an array of exported file paths (`string[]`).

#### Example
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
    console.log('Exported files: ', result)
  }
}
run()
```

### `DocumentPicker.stopAcessingSecurityScopedResources(): void`

Relinquishes access to security-scoped resources, like files or directories accessed via the document picker. Use this method when you no longer need access to these resources to ensure your app manages resources efficiently.
