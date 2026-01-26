# TTY 标准输入写入器

表示一个可写的 TTY（终端）标准输入流，用于通过 SSH 建立的伪终端（PTY）或 TTY 会话。该类支持将数据写入远程终端的 `stdin`，以及动态调整终端窗口大小。

通常由 `SSHClient.withPTY()` 或 `SSHClient.withTTY()` 方法返回。

***

## 方法

### `write(data: string): Promise<void>`

向远程 TTY 会话的标准输入写入文本数据。

#### 参数：

- `data`（字符串）：
  要发送给远程终端标准输入的字符串，可以包含控制字符（如 `"\r"` 表示回车，`\x03` 表示 Ctrl+C）。

#### 返回值：

- 一个 `Promise`，在数据成功写入后 resolve。

#### 示例：

```ts
const writer = await ssh.withTTY({
  onOutput: (text) => {
    console.log("输出：", text)
    return true
  }
})
await writer.write("ls -la\n")
```

***

### `changeSize(options: { cols: number; rows: number; pixelWidth: number; pixelHeight: number }): Promise<void>`

更改远程终端的窗口尺寸，适用于需要特定终端尺寸的程序（如 `vim`、`htop` 等）。

#### 参数：

- `options`（对象）：
  一个包含终端尺寸信息的对象：

  - `cols`（数字）：
    终端的字符列数，例如 80。

  - `rows`（数字）：
    终端的字符行数，例如 24。

  - `pixelWidth`（数字）：
    终端的像素宽度（如果不适用可设为 0）。

  - `pixelHeight`（数字）：
    终端的像素高度（如果不适用可设为 0）。

#### 返回值：

- 一个 `Promise`，在终端尺寸更改成功后 resolve。

#### 示例：

```ts
await writer.changeSize({
  cols: 100,
  rows: 30,
  pixelWidth: 0,
  pixelHeight: 0
})
```

***

## 使用示例

```ts
const ssh = await SSHClient.connect({
  host: "192.168.1.10",
  authenticationMethod: SSHAuthenticationMethod.passwordBased("user", "password")
})

const writer = await ssh.withPTY({
  term: "xterm",
  onOutput: (text, isStderr) => {
    console.log(text)
    return true
  }
})

// 写入命令
await writer.write("top\n")

// 2 秒后调整终端尺寸
await new Promise(resolve => setTimeout(resolve, 2000))
await writer.changeSize({
  cols: 120,
  rows: 40,
  pixelWidth: 0,
  pixelHeight: 0
})
```
