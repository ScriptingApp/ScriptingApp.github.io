# SFTP 文件 PRO

`SFTPFile` 表示一个已经通过 SFTP 打开的远程文件句柄。
通过该类，你可以对文件执行读取、写入、获取属性、关闭等底层操作。

实例通常通过：

```ts
const file = await sftp.openFile(path, flags)
```

获得。

***

## 属性

***

### `readonly isActive: boolean`

指示当前文件是否仍然处于打开状态。

- `true`：文件句柄有效，可继续读写
- `false`：文件已关闭或出现错误

***

## 方法

***

# `readAttributes(): Promise<FileAttributes>`

读取文件的元数据属性。

### 返回值：

一个包含文件属性的对象：

```ts
{
  size?: number
  userId?: number
  groupId?: number
  accessTime?: Date
  modificationTime?: Date
  permissions?: number
}
```

### 示例：

```ts
const attrs = await file.readAttributes()
console.log(attrs.size)
```

***

# `read(options?: { from?: number, length?: number }): Promise<Data>`

按指定范围读取文件内容。

### 参数：

- `from?`：读取的起始偏移（字节），默认从 `0` 开始
- `length?`：读取的字节数，默认读取到文件末尾

### 返回值：

- 一个 `Promise<Data>`，包含读取到的数据

### 示例：

```ts
const data = await file.read({ from: 100, length: 50 })
```

***

# `readAll(): Promise<Data>`

读取文件的全部内容。

### 返回值：

- 一个 `Promise<Data>`，包含完整的文件数据

### 示例：

```ts
const data = await file.readAll()
```

***

# `write(data: Data, at?: number): Promise<void>`

向文件写入数据。

### 参数：

- `data`：要写入的二进制数据
- `at?`：写入的起始偏移（字节）。

  - 若未提供，则根据 flags 的模式决定：

    - 若使用 `"append"` 打开，则追加到文件末尾
    - 若使用 `"write"` 打开，则从当前偏移或默认 0 写入

### 返回值：

- `Promise<void>`，写入成功后 resolve

### 示例：

```ts
await file.write(Data.fromRawString("Hello world"))
```

***

# `close(): Promise<void>`

关闭文件句柄。
关闭后，`isActive` 将变为 `false`，无法继续读写。

### 示例：

```ts
await file.close()
```

***

# 使用示例

```ts
// 打开文件（读取模式）
const file = await sftp.openFile("/home/user/info.txt", ["read"])

// 获取文件属性
const attrs = await file.readAttributes()

// 读取内容
const allData = await file.readAll()

// 部分读取
const partial = await file.read({ from: 50, length: 100 })

// 关闭文件
await file.close()
```
