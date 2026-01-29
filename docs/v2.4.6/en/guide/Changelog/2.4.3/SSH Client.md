---
title: SSH Client
description: This interface provides a simple way to connect to remote servers using SSH protocol.
tag: PRO
---

The `SSHClient` class provides an interface for connecting to a remote SSH server, executing commands, opening TTY or PTY sessions, transferring files via SFTP, and performing multi-hop SSH jumps. It supports both command-based and interactive terminal-based workflows.

This class is central to establishing and managing SSH sessions in your script.

---

## Static Methods

### `SSHClient.connect(options): Promise<SSHClient>`

Establishes a connection to a remote SSH server.

#### Parameters:

* `options` (`object`):

  * `host` (`string`):
    The hostname or IP address of the SSH server.

  * `port?` (`number`):
    The port number to connect to. Defaults to `22`.

  * `authenticationMethod` (`SSHAuthenticationMethod`):
    The authentication method to use (e.g., password, RSA key).

  * `trustedHostKeys?` (`string[]`):
    Optional list of trusted server public keys. If provided, the client will validate the server against this list.

  * `reconnect?` (`"never" | "once" | "always"`):
    Optional strategy for reconnecting if the connection drops. Default is `"never"`.

#### Returns:

* A `Promise` that resolves to an `SSHClient` instance upon successful connection.

#### Example:

```ts
const ssh = await SSHClient.connect({
  host: "192.168.0.10",
  authenticationMethod: SSHAuthenticationMethod.passwordBased("root", "password")
})
```

---

## Properties

### `onDisconnect: (() => void) | null`

Callback function to be invoked when the SSH connection is lost or closed.

#### Example:

```ts
ssh.onDisconnect = () => {
  console.log("Disconnected from SSH server.")
}
```

---

## Instance Methods

### `executeCommand(command: string, options?): Promise<string>`

Executes a shell command on the remote server and returns its output.

#### Parameters:

* `command` (`string`):
  The command to execute.

* `options?` (`object`):

  * `maxResponseSize?` (`number`):
    Maximum number of bytes to return.

  * `includeStderr?` (`boolean`):
    If `true`, includes standard error output in the result.

  * `inShell?` (`boolean`):
    If `true`, executes the command inside a shell (e.g., `sh -c`). Default is `false`.

#### Returns:

* A `Promise` that resolves to the command output as a string.

#### Example:

```ts
const result = await ssh.executeCommand("uname -a")
```

---

### `executeCommandStream(command, onOutput, options?): Promise<void>`

Executes a command and streams its output line-by-line.

#### Parameters:

* `command` (`string`):
  The command to run.

* `onOutput` (`function`):
  Callback `(data: Data, isStderr: boolean) => boolean`
  Called for each line of output. Return `false` to stop receiving output.

* `options?`:

  * `inShell?` (`boolean`):
    Whether to run the command in a shell.

#### Returns:

* A `Promise` that resolves when the command completes.

#### Example:

```ts
const output = Data.fromIntArray([])
await ssh.executeCommandStream("ping -c 4 google.com", (data, isStderr) => {
  output.append(data)
  return true
})
console.log(output.toDecodedString()())
```

---

### `withPTY(options): Promise<TTYStdinWriter>`

Opens a PTY (pseudo-terminal) session.

#### Parameters:

* `options` (`object`):

  * `wantReply?` (`boolean`):
    Whether to wait for a reply from the server. Defaults to `true`.

  * `term?` (`string`):
    Terminal type (default is `"xterm"`).

  * `terminalCharacterWidth?` (`number`):
    Terminal character width. Default is `80`.

  * `terminalRowHeight?` (`number`):
    Terminal row height. Default is `24`.

  * `terminalPixelWidth?` (`number`):
    Terminal pixel width. Default is `0`.

  * `terminalPixelHeight?` (`number`):
    Terminal pixel height. Default is `0`.

  * `onOutput` (`function`):
    Callback `(data: Data, isStderr: boolean) => boolean` for receiving terminal output.

  * `onError?` (`function`):
    Optional error callback `(error: string) => void`.

#### Returns:

* A `Promise` that resolves to a `TTYStdinWriter` instance.

#### Example:

```ts
let output: Data | undefined
let timerId: number | undefined
const writer = await ssh.withPTY({
  onOutput: (data, isStderr) => {
    if (output == null) {
      output = data
    } else {
      output.append(data)
    }
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      console.log(output.toDecodedString()())
      output = undefined
    }, 500)
    return true
  }
})
await writer.write("top\n")
```

---

### `withTTY(options): Promise<TTYStdinWriter>`

Opens a TTY session with simplified options (without explicit dimensions).

#### Parameters:

* `options` (`object`):

  * `onOutput` (`function`):
    Callback `(data: Data, isStderr: boolean) => boolean` for receiving terminal output.

  * `onError?` (`function`):
    Optional error callback `(error: string) => void`.

#### Returns:

* A `Promise` that resolves to a `TTYStdinWriter`.

---

### `openSFTP(): Promise<SFTPClient>`

Opens an SFTP session for file transfer operations.

#### Returns:

* A `Promise` that resolves to an `SFTPClient` instance.

#### Example:

```ts
const sftp = await ssh.openSFTP()
await sftp.writeFile("/tmp/test.txt", "Hello world")
```

---

### `jump(options): Promise<SSHClient>`

Performs an SSH jump (proxy) to another remote host from the current SSH session.

#### Parameters:

* `options` (`object`):

  * `host` (`string`):
    The destination host to jump to.

  * `port?` (`number`):
    Port to connect to (default is `22`).

  * `authenticationMethod` (`SSHAuthenticationMethod`):
    Authentication method for the next host.

  * `trustedHostKeys?` (`string[]`):
    Optional list of trusted host keys.

#### Returns:

* A `Promise` that resolves to a new `SSHClient` representing the jump connection.

#### Example:

```ts
const nextHop = await ssh.jump({
  host: "10.0.0.2",
  authenticationMethod: SSHAuthenticationMethod.passwordBased("user2", "pass2")
})
```

---

### `close(): Promise<void>`

Closes the SSH connection and releases associated resources.

> **Important:** You should call this method when the SSH client is no longer needed to avoid potential memory or socket leaks.

#### Returns:

* A `Promise` that resolves when the SSH connection is successfully closed.

#### Example:

```ts
await ssh.close()
```

---

## Usage Example

```ts
const ssh = await SSHClient.connect({
  host: "192.168.1.10",
  authenticationMethod: SSHAuthenticationMethod.passwordBased("user", "password")
})

const output = await ssh.executeCommand("uptime")
console.log("Uptime:", output)

const sftp = await ssh.openSFTP()
await sftp.writeFile("/tmp/hello.txt", "Hello SSH")

await ssh.close()
```
