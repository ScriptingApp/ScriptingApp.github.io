---
title: SFTP 客户端
tag: PRO
---

`SFTPClient` 用于通过 SSH 连接访问远程文件系统，基于 **SFTP 协议**。
它提供目录操作、文件操作、路径解析等能力，并可通过 `openFile()` 获得更强大的 `SFTPFile` 对象执行读取、写入等低层操作。

该类实例通常由：

```ts
const sftp = await ssh.openSFTP();
```

返回。

---

## 属性

### `readonly isActive: boolean`

指示当前 SFTP 连接是否仍然有效。

- `true`：连接仍然处于活跃状态
- `false`：连接已关闭或发生错误

---

## 方法

---

## `close(): Promise<void>`

关闭当前 SFTP 连接。

#### 返回值：

- `Promise<void>`：关闭成功后 resolve

#### 示例：

```ts
await sftp.close();
```

---

## `readDirectory(atPath: string): Promise<DirectoryEntry[]>`

读取指定目录下的文件与子目录。

#### 参数：

- **`atPath`**：远程目录路径

#### 返回值：

**`DirectoryEntry[]`** 数组，结构如下：

```ts
{
  filename: string
  longname: string
  attributes: {
    size?: number
    userId?: number
    groupId?: number
    accessTime?: Date
    modificationTime?: Date
    permissions?: number
  }
}[]
```

#### 示例：

```ts
const items = await sftp.readDirectory("/var/log");
```

---

## `createDirectory(atPath: string): Promise<void>`

在指定路径创建一个目录。

#### 参数：

- `atPath`：目标目录路径

#### 返回值：

- `Promise<void>`：创建成功后 resolve

#### 示例：

```ts
await sftp.createDirectory("/home/user/new-folder");
```

---

## `removeDirectory(atPath: string): Promise<void>`

删除一个目录（需为空目录）。

#### 参数：

- `atPath`：要删除的目录路径

#### 返回值：

- `Promise<void>`

#### 示例：

```ts
await sftp.removeDirectory("/home/user/empty-dir");
```

---

## `rename(oldPath: string, newPath: string): Promise<void>`

重命名或移动文件 / 目录。

#### 参数：

- `oldPath`：原路径
- `newPath`：目标路径

#### 返回值：

- `Promise<void>`

#### 示例：

```ts
await sftp.rename("/home/user/a.txt", "/home/user/b.txt");
```

---

## `getAttributes(atPath: string): Promise<FileAttributes>`

读取文件或目录的信息。

#### 返回值：

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

#### 示例：

```ts
const attrs = await sftp.getAttributes("/etc/hosts");
```

---

## `openFile(filePath: string, flags: SFTPOpenFileFlags | SFTPOpenFileFlags[]): Promise<SFTPFile>`

以指定模式打开远程文件，返回 `SFTPFile` 对象进行读写。

#### 参数：

- `filePath`：文件路径
- `flags`：打开文件的模式，可为单个 flag 或数组

可用的 flag：

```
"read" | "write" | "append" | "create" | "truncate" | "forceCreate"
```

#### 返回值：

- `Promise<SFTPFile>`：一个可读写、可关闭的文件对象

#### 示例：

```ts
const file = await sftp.openFile("/home/user/log.txt", ["read"]);
const data = await file.readAll();
await file.close();
```

---

## `remove(atPath: string): Promise<void>`

删除指定路径的文件。

#### 参数：

- `atPath`：要删除的文件路径

#### 示例：

```ts
await sftp.remove("/home/user/old.txt");
```

---

## `getRealPath(atPath: string): Promise<string>`

解析符号链接、相对路径、`~` 等，返回绝对路径。

#### 示例：

```ts
const real = await sftp.getRealPath("~/documents");
```

---

## 使用示例

```ts
const ssh = await SSHClient.connect({
  host: "192.168.1.10",
  authenticationMethod: SSHAuthenticationMethod.passwordBased("user", "pass"),
});

const sftp = await ssh.openSFTP();

// 查看目录内容
const list = await sftp.readDirectory("/home/user");

// 打开文件读取
const file = await sftp.openFile("/home/user/info.txt", "read");
const data = await file.readAll();
await file.close();

// 创建目录
await sftp.createDirectory("/home/user/new-folder");

// 删除文件
await sftp.remove("/home/user/temp.txt");

await sftp.close();
```
