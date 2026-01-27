---
title: 加密

---

`Crypto` 模块提供了一组加密工具函数，用于数据哈希、HMAC 认证、对称密钥生成，以及 AES-GCM 加解密。该模块支持标准的加密算法，配合 `Data` 类型使用，适用于各种安全处理场景。

---

## 模块概览

`Crypto` 模块支持：

* 使用 MD5、SHA-1、SHA-2 系列算法进行哈希
* 基于密钥的 HMAC 消息认证
* 生成对称密钥（用于加密和 HMAC）
* 使用 AES-GCM 算法进行加密与解密

所有函数的输入与输出均为 `Data` 类型，代表二进制数据。

---

## 函数说明

### `Crypto.generateSymmetricKey(size?: number): Data`

生成一个随机对称密钥。

* **参数：**

  * `size`（可选）：密钥位数，默认是 256 位（即 32 字节）

* **返回值：** 返回一个 `Data` 实例，包含生成的密钥

* **示例：**

  ```ts
  const key = Crypto.generateSymmetricKey() // 默认生成 256 位密钥
  ```

---

## 哈希函数（Hash Functions）

以下函数用于对输入数据进行不可逆哈希，常用于签名或内容校验。

### `Crypto.md5(data: Data): Data`

使用 MD5 算法生成摘要（128 位）。

* **返回值：** 包含 MD5 哈希值的 `Data` 实例

* **示例：**

  ```ts
  const data = Data.fromString("Hello")
  const hash = Crypto.md5(data).toHexString()
  ```

---

### `Crypto.sha1(data: Data): Data`

使用 SHA-1 算法生成摘要（160 位）。

---

### `Crypto.sha256(data: Data): Data`

使用 SHA-256 算法生成摘要（256 位）。

* **示例：**

  ```ts
  const hash = Crypto.sha256(Data.fromString("test")).toHexString()
  ```

---

### `Crypto.sha384(data: Data): Data`

使用 SHA-384 算法生成摘要（384 位）。

---

### `Crypto.sha512(data: Data): Data`

使用 SHA-512 算法生成摘要（512 位）。

---

## HMAC 函数（带密钥的哈希）

以下函数使用密钥对消息进行哈希认证（HMAC），常用于消息完整性校验与身份验证。

* **参数：**

  * `data`: 要加密的消息（`Data`）
  * `key`: 对称密钥（`Data`）

* **返回值：** HMAC 结果为 `Data` 类型

---

### `Crypto.hmacMD5(data: Data, key: Data): Data`

使用 MD5 生成 HMAC。

```ts
const key = Crypto.generateSymmetricKey()
const hmac = Crypto.hmacMD5(Data.fromString("msg"), key).toHexString()
```

---

### `Crypto.hmacSHA1(data: Data, key: Data): Data`

使用 SHA-1 生成 HMAC。

---

### `Crypto.hmacSHA224(data: Data, key: Data): Data`

使用 SHA-224 生成 HMAC。

---

### `Crypto.hmacSHA256(data: Data, key: Data): Data`

使用 SHA-256 生成 HMAC。

---

### `Crypto.hmacSHA384(data: Data, key: Data): Data`

使用 SHA-384 生成 HMAC。

---

### `Crypto.hmacSHA512(data: Data, key: Data): Data`

使用 SHA-512 生成 HMAC。

---

## AES-GCM 加密与解密

### `Crypto.encryptAESGCM(data: Data, key: Data, options?: { iv?: Data, aad?: Data }): Data | null`

使用 AES-GCM 算法对数据进行加密。

* **参数：**

  * `data`: 明文数据（`Data`）
  * `key`: 对称密钥（`Data`）
  * `options`（可选）：

    * `iv`: 初始化向量（`Data`）。如果不指定，将自动生成随机 IV。
    * `aad`: 附加认证数据，不参与加密，但会影响认证标签（可选）

* **返回值：** 加密后的 `Data`，失败时返回 `null`

* **示例：**

  ```ts
  const key = Crypto.generateSymmetricKey()
  const plaintext = Data.fromString("secret message")
  const encrypted = Crypto.encryptAESGCM(plaintext, key)
  ```

---

### `Crypto.decryptAESGCM(data: Data, key: Data, aad?: Data): Data | null`

使用 AES-GCM 解密密文数据。

* **参数：**

  * `data`: 密文数据（`Data`）
  * `key`: 加密时使用的对称密钥（`Data`）
  * `aad`: 加密时使用的附加认证数据（若有）

* **返回值：** 解密后的明文 `Data`，如果解密失败（如认证标签不匹配、密钥错误），返回 `null`

* **示例：**

  ```ts
  const decrypted = Crypto.decryptAESGCM(encrypted, key)
  console.log(decrypted?.toRawString())
  ```

---

## 常见算法摘要

| 函数        | 输出长度  | 用途说明      |
| --------- | ----- | --------- |
| `md5`     | 128 位 | 旧版校验      |
| `sha1`    | 160 位 | 兼容场景      |
| `sha256`  | 256 位 | 推荐的通用加密哈希 |
| `sha384`  | 384 位 | 更强的哈希     |
| `sha512`  | 512 位 | 高安全性需求    |
| `hmacXXX` | 同哈希   | 消息认证      |
| `AES-GCM` | 可变    | 加密+认证     |

---

## 完整示例：加密与解密一段字符串

```ts
const key = Crypto.generateSymmetricKey()
const message = Data.fromString("Encrypt me")
const encrypted = Crypto.encryptAESGCM(message, key)
const decrypted = encrypted ? Crypto.decryptAESGCM(encrypted, key) : null

if (decrypted) {
  console.log("解密结果:", decrypted.toRawString())
}
```

---

## 说明与注意事项

* 所有函数都要求输入为 `Data` 类型
* AES-GCM 支持自动生成随机 IV，也支持传入自定义 IV 和 AAD
* 返回的加密结果包含密文和认证标签，必要时还应保存 IV