---
title: Path

---

The `Path` API provides utility functions for handling and transforming file and directory paths. It is inspired by the Node.js `path` module, offering familiar methods for developers to work with paths effectively.

---

## Overview

The `Path` API provides methods for:
- Normalizing paths.
- Determining if a path is absolute.
- Joining path segments.
- Extracting path components like directory name, base name, and extension.
- Parsing paths into structured objects.

It simplifies cross-platform path handling by using the appropriate path delimiters and separators for the current operating system.

---

### Static Methods

#### `Path.normalize(path: string): string`

Normalizes the given path by resolving `..` and `.` segments.

- **Parameters:**
  - `path`: The input path to normalize.
- **Returns:**
  - A normalized path string.

#### Example:

```typescript
const normalizedPath = Path.normalize('/foo/bar//baz/asdf/quux/..')
console.log(normalizedPath) // '/foo/bar/baz/asdf'
```

---

#### `Path.isAbsolute(path: string): boolean`

Determines whether a given path is absolute.

- **Parameters:**
  - `path`: The input path.
- **Returns:**
  - `true` if the path is absolute, otherwise `false`.

#### Example:

```typescript
console.log(Path.isAbsolute('/foo/bar')) // true
console.log(Path.isAbsolute('foo/bar'))  // false
```

---

#### `Path.join(...args: string[]): string`

Joins multiple path segments into a single path and normalizes it.

- **Parameters:**
  - `...args`: The path segments to join.
- **Returns:**
  - A single normalized path string.

#### Example:

```typescript
const joinedPath = Path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
console.log(joinedPath) // '/foo/bar/baz/asdf'
```

---

#### `Path.dirname(path: string): string`

Returns the directory name of a path.

- **Parameters:**
  - `path`: The input path.
- **Returns:**
  - The directory name.

#### Example:

```typescript
console.log(Path.dirname('/foo/bar/baz/asdf/quux')) // '/foo/bar/baz/asdf'
```

---

#### `Path.basename(path: string, ext?: string): string`

Returns the last portion of a path, similar to the Unix `basename` command. Optionally, removes a file extension.

- **Parameters:**
  - `path`: The input path.
  - `ext` (optional): The file extension to remove.
- **Returns:**
  - The base name of the path.

#### Example:

```typescript
console.log(Path.basename('/foo/bar/baz/asdf/quux.html')) // 'quux.html'
console.log(Path.basename('/foo/bar/baz/asdf/quux.html', '.html')) // 'quux'
```

---

#### `Path.extname(path: string): string`

Returns the extension of the path.

- **Parameters:**
  - `path`: The input path.
- **Returns:**
  - The file extension, or an empty string if none exists.

#### Example:

```typescript
console.log(Path.extname('/foo/bar/baz/asdf/quux.html')) // '.html'
console.log(Path.extname('/foo/bar/baz/asdf/quux'))     // ''
```

---

#### `Path.parse(path: string): { root: string; dir: string; base: string; ext: string; name: string; }`

Parses a path into an object with the following properties:
- `root`: The root of the path.
- `dir`: The directory name.
- `base`: The file name including the extension.
- `ext`: The file extension.
- `name`: The file name without the extension.

- **Parameters:**
  - `path`: The input path.
- **Returns:**
  - An object with the parsed path properties.

#### Example:

```typescript
const parsed = Path.parse('/foo/bar/baz/asdf/quux.html')
console.log(parsed)
// {
//   root: '/',
//   dir: '/foo/bar/baz/asdf',
//   base: 'quux.html',
//   ext: '.html',
//   name: 'quux'
// }
```

---

## Common Use Cases

### Normalize a Path

```typescript
const normalizedPath = Path.normalize('./foo/bar/../baz')
console.log(normalizedPath) // './foo/baz'
```

### Check If a Path is Absolute

```typescript
console.log(Path.isAbsolute('/absolute/path')) // true
console.log(Path.isAbsolute('relative/path'))  // false
```

### Join Multiple Path Segments

```typescript
const fullPath = Path.join('/home', 'user', 'documents', 'file.txt')
console.log(fullPath) // '/home/user/documents/file.txt'
```

### Extract File Name and Extension

```typescript
const fileName = Path.basename('/path/to/file.txt')
const fileExt = Path.extname('/path/to/file.txt')
console.log(fileName) // 'file.txt'
console.log(fileExt)  // '.txt'
```

### Parse a Path

```typescript
const pathDetails = Path.parse('/path/to/file.txt')
console.log(pathDetails)
// {
//   root: '/',
//   dir: '/path/to',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }
```

---

## Best Practices

1. **Use Normalization:** Always normalize paths to ensure consistent formatting across platforms.
2. **Avoid Hardcoding Delimiters:** Use methods like `join` instead of concatenating strings with `/` or `\\`.

---

## Full Example

```typescript
import { Path } from 'scripting'

function main() {
  const filePath = '/foo/bar/baz/asdf/quux.html'

  console.log("Normalized Path:", Path.normalize(filePath))
  console.log("Is Absolute:", Path.isAbsolute(filePath))
  console.log("Directory Name:", Path.dirname(filePath))
  console.log("Base Name:", Path.basename(filePath))
  console.log("Extension:", Path.extname(filePath))

  const parsedPath = Path.parse(filePath)
  console.log("Parsed Path:", parsedPath)

  const joinedPath = Path.join('/foo', 'bar', 'baz')
  console.log("Joined Path:", joinedPath)
}

main()
```

