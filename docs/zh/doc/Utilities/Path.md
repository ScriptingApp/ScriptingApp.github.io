---
title: 文件路径工具

---

`Path` API 提供了一些实用函数，用于处理和转换文件与目录路径。它受到 Node.js 的 `path` 模块启发，提供了开发者熟悉的方法来高效地处理路径。

---

## 概述

`Path` API 提供以下功能：
- 规范化路径。
- 判断路径是否为绝对路径。
- 拼接路径段。
- 提取路径组件，例如目录名、基本名和扩展名。
- 将路径解析为结构化对象。

它通过使用当前操作系统适合的路径分隔符，简化了跨平台的路径处理。

---

### 静态方法

#### `Path.normalize(path: string): string`

通过解析 `..` 和 `.` 段，规范化给定的路径。

- **参数：**
  - `path`：要规范化的输入路径。
- **返回值：**
  - 一个规范化的路径字符串。

#### 示例：

```typescript
const normalizedPath = Path.normalize('/foo/bar//baz/asdf/quux/..')
console.log(normalizedPath) // '/foo/bar/baz/asdf'
```

---

#### `Path.isAbsolute(path: string): boolean`

判断给定路径是否为绝对路径。

- **参数：**
  - `path`：输入路径。
- **返回值：**
  - 如果路径是绝对路径，则返回 `true`，否则返回 `false`。

#### 示例：

```typescript
console.log(Path.isAbsolute('/foo/bar')) // true
console.log(Path.isAbsolute('foo/bar'))  // false
```

---

#### `Path.join(...args: string[]): string`

将多个路径段拼接为一个路径，并进行规范化。

- **参数：**
  - `...args`：要拼接的路径段。
- **返回值：**
  - 一个规范化的路径字符串。

#### 示例：

```typescript
const joinedPath = Path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
console.log(joinedPath) // '/foo/bar/baz/asdf'
```

---

#### `Path.dirname(path: string): string`

返回路径的目录名。

- **参数：**
  - `path`：输入路径。
- **返回值：**
  - 目录名。

#### 示例：

```typescript
console.log(Path.dirname('/foo/bar/baz/asdf/quux')) // '/foo/bar/baz/asdf'
```

---

#### `Path.basename(path: string, ext?: string): string`

返回路径的最后一部分，类似于 Unix 的 `basename` 命令。可选地移除文件扩展名。

- **参数：**
  - `path`：输入路径。
  - `ext`（可选）：要移除的文件扩展名。
- **返回值：**
  - 路径的基本名。

#### 示例：

```typescript
console.log(Path.basename('/foo/bar/baz/asdf/quux.html')) // 'quux.html'
console.log(Path.basename('/foo/bar/baz/asdf/quux.html', '.html')) // 'quux'
```

---

#### `Path.extname(path: string): string`

返回路径的扩展名。

- **参数：**
  - `path`：输入路径。
- **返回值：**
  - 文件扩展名；如果没有扩展名，则返回空字符串。

#### 示例：

```typescript
console.log(Path.extname('/foo/bar/baz/asdf/quux.html')) // '.html'
console.log(Path.extname('/foo/bar/baz/asdf/quux'))     // ''
```

---

#### `Path.parse(path: string): { root: string; dir: string; base: string; ext: string; name: string; }`

将路径解析为包含以下属性的对象：
- `root`：路径的根目录。
- `dir`：目录名。
- `base`：包含扩展名的文件名。
- `ext`：文件扩展名。
- `name`：不带扩展名的文件名。

- **参数：**
  - `path`：输入路径。
- **返回值：**
  - 一个包含解析路径属性的对象。

#### 示例：

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

## 常见用例

### 规范化路径

```typescript
const normalizedPath = Path.normalize('./foo/bar/../baz')
console.log(normalizedPath) // './foo/baz'
```

### 检查路径是否为绝对路径

```typescript
console.log(Path.isAbsolute('/absolute/path')) // true
console.log(Path.isAbsolute('relative/path'))  // false
```

### 拼接多个路径段

```typescript
const fullPath = Path.join('/home', 'user', 'documents', 'file.txt')
console.log(fullPath) // '/home/user/documents/file.txt'
```

### 提取文件名和扩展名

```typescript
const fileName = Path.basename('/path/to/file.txt')
const fileExt = Path.extname('/path/to/file.txt')
console.log(fileName) // 'file.txt'
console.log(fileExt)  // '.txt'
```

### 解析路径

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

## 最佳实践

1. **使用规范化功能：** 始终规范化路径以确保跨平台的一致性。
2. **避免硬编码分隔符：** 使用类似 `join` 的方法代替直接拼接字符串 `/` 或 `\\`。

---

## 完整示例

```typescript
import { Path } from 'scripting'

function main() {
  const filePath = '/foo/bar/baz/asdf/quux.html'

  console.log("规范化路径:", Path.normalize(filePath))
  console.log("是否为绝对路径:", Path.isAbsolute(filePath))
  console.log("目录名:", Path.dirname(filePath))
  console.log("基本名:", Path.basename(filePath))
  console.log("扩展名:", Path.extname(filePath))

  const parsedPath = Path.parse(filePath)
  console.log("解析路径:", parsedPath)

  const joinedPath = Path.join('/foo', 'bar', 'baz')
  console.log("拼接路径:", joinedPath)
}

main()
```