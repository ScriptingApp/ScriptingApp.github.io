---
title: SSH 认证方法
description: 该接口提供了一种使用各种方法（如密码、公钥或私钥）进行 SSH 连接认证的方法。
tag: PRO
---

表示 SSH 身份验证方法。该类提供多个静态方法用于创建不同类型的 SSH 身份验证方式，包括基于密码、RSA 私钥、ED25519 私钥，以及 ECDSA（P-256、P-384、P-521）私钥的认证方式。

你可以将本类创建的实例传递给 `SSHClient.connect()` 方法中的 `authenticationMethod` 参数，用于连接 SSH 服务器。

## 静态方法

---

### `static passwordBased(username: string, password: string): SSHAuthenticationMethod`

创建一个基于用户名和密码的 SSH 身份验证方法。

#### 参数：

* `username`（字符串）：
  SSH 登录使用的用户名。

* `password`（字符串）：
  用户名对应的密码。

#### 返回值：

* 一个 `SSHAuthenticationMethod` 实例，使用用户名密码进行身份验证。

#### 示例：

```ts
const auth = SSHAuthenticationMethod.passwordBased("user1", "mypassword")
```

---

### `static ras(username: string, sshRsa: Data, decryptionKey?: Data): SSHAuthenticationMethod | null`

创建一个基于 RSA 私钥的身份验证方法。

#### 参数：

* `username`（字符串）：
  SSH 登录使用的用户名。

* `sshRsa`（`Data` 对象）：
  OpenSSH 格式的 RSA 私钥内容，通常通过 `Data.fromString()` 读取。

* `decryptionKey`（可选的 `Data` 对象）：
  如果私钥加密了，请提供解密密码（同样为 `Data` 类型）。

#### 返回值：

* 一个 `SSHAuthenticationMethod` 实例。如果密钥无效，则返回 `null`。

#### 示例：

```ts
const rsaKey = Data.fromString(privateKeyContent)!
const auth = SSHAuthenticationMethod.ras("user1", rsaKey)
```

---

### `static ed25519(username: string, sshEd25519: Data, decryptionKey?: Data): SSHAuthenticationMethod | null`

创建一个基于 ED25519 私钥的身份验证方法。

#### 参数：

* `username`（字符串）：
  SSH 登录用户名。

* `sshEd25519`（`Data` 对象）：
  ED25519 格式的私钥内容。

* `decryptionKey`（可选的 `Data` 对象）：
  私钥若加密，需提供对应的解密密码。

#### 返回值：

* 一个 `SSHAuthenticationMethod` 实例。如果密钥无效，则返回 `null`。

#### 示例：

```ts
const edKey = Data.fromString(ed25519KeyContent)!
const auth = SSHAuthenticationMethod.ed25519("user1", edKey)
```

---

### `static p256(username: string, pemRepresentation: string): SSHAuthenticationMethod | null`

使用 PEM 格式的 P-256（ECDSA）私钥创建身份验证方法。

#### 参数：

* `username`（字符串）：
  SSH 登录用户名。

* `pemRepresentation`（字符串）：
  PEM 格式的 P-256 私钥内容。

#### 返回值：

* 一个 `SSHAuthenticationMethod` 实例。如果 PEM 格式无效，则返回 `null`。

#### 示例：

```ts
const auth = SSHAuthenticationMethod.p256("user1", pemKeyContent)
```

---

### `static p384(username: string, pemRepresentation: string): SSHAuthenticationMethod | null`

使用 PEM 格式的 P-384（ECDSA）私钥创建身份验证方法。

#### 参数：

* `username`（字符串）：
  SSH 登录用户名。

* `pemRepresentation`（字符串）：
  PEM 格式的 P-384 私钥内容。

#### 返回值：

* 一个 `SSHAuthenticationMethod` 实例，如果无效则返回 `null`。

---

### `static p521(username: string, pemRepresentation: string): SSHAuthenticationMethod | null`

使用 PEM 格式的 P-521（ECDSA）私钥创建身份验证方法。

#### 参数：

* `username`（字符串）：
  SSH 登录用户名。

* `pemRepresentation`（字符串）：
  PEM 格式的 P-521 私钥内容。

#### 返回值：

* 一个 `SSHAuthenticationMethod` 实例，如果无效则返回 `null`。

---

## 使用示例

```ts
// 使用用户名密码认证
const passwordAuth = SSHAuthenticationMethod.passwordBased("root", "secret123")

// 使用 RSA 私钥认证
const privateKey = await FileManager.readAsData("/path/to/id_rsa")
const rsaAuth = SSHAuthenticationMethod.ras("root", privateKey)

// 建立 SSH 连接
const ssh = await SSHClient.connect({
  host: "192.168.0.1",
  authenticationMethod: rsaAuth
})
```
