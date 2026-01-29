---
title: TTY Stdin Writer
description: This interface allows you to write data to the standard input of a TTY session, enabling interactive command execution.
tag: PRO
---

Represents a writable input stream for a TTY (teletypewriter) session opened over SSH. This class allows writing text to the remote terminal’s standard input and resizing the terminal window dynamically.

This class is typically returned from methods such as `SSHClient.withPTY()` and `SSHClient.withTTY()`.

---

## Methods

### `write(data: string): Promise<void>`

Writes the given string to the standard input of the TTY session.

#### Parameters:

* `data` (`string`):
  The string data to send to the remote terminal’s `stdin`. This can include control characters (e.g., `"\r"` for Enter, `"\x03"` for Ctrl+C).

#### Returns:

* A `Promise` that resolves when the data has been successfully written to the TTY stream.

#### Example:

```ts
const writer = await ssh.withTTY({
  onOutput: (text) => {
    console.log("Output:", text)
    return true
  }
})
await writer.write("ls -la\n")
```

---

### `changeSize(options: { cols: number; rows: number; pixelWidth: number; pixelHeight: number }): Promise<void>`

Resizes the remote terminal window. This is useful for applications that rely on terminal dimensions, such as text editors or full-screen tools (e.g., `vim`, `htop`).

#### Parameters:

* `options` (`object`):
  An object describing the new terminal dimensions:

  * `cols` (`number`):
    The number of character columns in the terminal (e.g., 80).

  * `rows` (`number`):
    The number of character rows in the terminal (e.g., 24).

  * `pixelWidth` (`number`):
    The pixel width of the terminal window. Use `0` if not applicable.

  * `pixelHeight` (`number`):
    The pixel height of the terminal window. Use `0` if not applicable.

#### Returns:

* A `Promise` that resolves once the terminal size has been successfully updated.

#### Example:

```ts
await writer.changeSize({
  cols: 100,
  rows: 30,
  pixelWidth: 0,
  pixelHeight: 0
})
```

---

## Usage Example

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

await writer.write("top\n")

// Resize the terminal after 2 seconds
await new Promise(resolve => setTimeout(resolve, 2000))
await writer.changeSize({
  cols: 120,
  rows: 40,
  pixelWidth: 0,
  pixelHeight: 0
})
```
