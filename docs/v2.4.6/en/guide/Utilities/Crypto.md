---
title: Crypto
description: The interface provides simple, secure, and efficient APIs for generating cryptographic hashes from data. 

---

The `Crypto` module provides a set of cryptographic utilities for hashing, HMAC authentication, symmetric key generation, and AES-GCM encryption/decryption. It is designed to securely process `Data` instances using industry-standard algorithms.

---

## Overview

The `Crypto` module enables:

* Hashing data with MD5, SHA-1, SHA-2 family (SHA-224, SHA-256, SHA-384, SHA-512)
* Creating HMAC digests using a secret key
* Generating random symmetric encryption keys
* Encrypting and decrypting data with AES-GCM (authenticated encryption)

All operations are performed on the `Data` type, which encapsulates binary input/output.

---

## Functions

### `Crypto.generateSymmetricKey(size?: number): Data`

Generates a new random symmetric key.

* **Parameters:**

  * `size` (optional): Key size in bits. Defaults to `256`.

* **Returns:** A `Data` object representing the key.

* **Example:**

  ```ts
  const key = Crypto.generateSymmetricKey() // 256-bit key
  ```

---

### Hashing Functions

These functions return a cryptographic hash (digest) of the input data.

#### `Crypto.md5(data: Data): Data`

Hashes the input data using the MD5 algorithm (128-bit output).

* **Returns:** A `Data` object containing the MD5 digest.

* **Example:**

  ```ts
  const data = Data.fromString("Hello")
  const hash = Crypto.md5(data).toHexString()
  ```

---

#### `Crypto.sha1(data: Data): Data`

Uses the SHA-1 algorithm (160-bit output).

* **Returns:** A `Data` object.

---

#### `Crypto.sha256(data: Data): Data`

Uses the SHA-256 algorithm (256-bit output).

* **Returns:** A `Data` object.

* **Example:**

  ```ts
  const hash = Crypto.sha256(Data.fromString("test")).toHexString()
  ```

---

#### `Crypto.sha384(data: Data): Data`

Uses the SHA-384 algorithm (384-bit output).

* **Returns:** A `Data` object.

---

#### `Crypto.sha512(data: Data): Data`

Uses the SHA-512 algorithm (512-bit output).

* **Returns:** A `Data` object.

---

### HMAC Functions

These functions generate a hash-based message authentication code (HMAC) using a shared secret key.

All return a `Data` object representing the HMAC digest.

* **Parameters:**

  * `data`: The message to authenticate (`Data`)
  * `key`: The symmetric key (`Data`)

---

#### `Crypto.hmacMD5(data: Data, key: Data): Data`

Computes HMAC using MD5.

```ts
const key = Crypto.generateSymmetricKey()
const hmac = Crypto.hmacMD5(Data.fromString("msg"), key).toHexString()
```

---

#### `Crypto.hmacSHA1(data: Data, key: Data): Data`

Computes HMAC using SHA-1.

---

#### `Crypto.hmacSHA224(data: Data, key: Data): Data`

Computes HMAC using SHA-224.

---

#### `Crypto.hmacSHA256(data: Data, key: Data): Data`

Computes HMAC using SHA-256.

---

#### `Crypto.hmacSHA384(data: Data, key: Data): Data`

Computes HMAC using SHA-384.

---

#### `Crypto.hmacSHA512(data: Data, key: Data): Data`

Computes HMAC using SHA-512.

---

## AES-GCM Encryption

### `Crypto.encryptAESGCM(data: Data, key: Data, options?: { iv?: Data, aad?: Data }): Data | null`

Encrypts the given data using AES-GCM with the provided key.

* **Parameters:**

  * `data`: The plaintext `Data` to encrypt
  * `key`: A `Data` object representing the symmetric key
  * `options` (optional):

    * `iv`: Initialization vector (optional). If omitted, a random IV is used internally.
    * `aad`: Additional authenticated data (optional). Used for authentication but not encrypted.

* **Returns:** A `Data` object containing the encrypted ciphertext, or `null` on failure.

* **Example:**

  ```ts
  const key = Crypto.generateSymmetricKey()
  const plaintext = Data.fromString("secret message")
  const encrypted = Crypto.encryptAESGCM(plaintext, key)
  ```

---

### `Crypto.decryptAESGCM(data: Data, key: Data, aad?: Data): Data | null`

Decrypts AES-GCM-encrypted `Data` using the provided key and optional AAD.

* **Parameters:**

  * `data`: The encrypted data (`Data`)
  * `key`: The symmetric key used to encrypt the data
  * `aad` (optional): The additional authenticated data used during encryption (must match exactly)

* **Returns:** The decrypted plaintext as `Data`, or `null` if decryption fails (e.g., tag mismatch or incorrect key).

* **Example:**

  ```ts
  const decrypted = Crypto.decryptAESGCM(encrypted, key)
  console.log(decrypted?.toRawString())
  ```

---

## Summary of Algorithms

| Function  | Output Size  | Use Case                   |
| --------- | ------------ | -------------------------- |
| `md5`     | 128 bits     | Legacy checksums           |
| `sha1`    | 160 bits     | Compatibility              |
| `sha256`  | 256 bits     | General-purpose security   |
| `sha384`  | 384 bits     | Stronger hashing           |
| `sha512`  | 512 bits     | High-security requirements |
| `hmacXXX` | Same as hash | Authentication             |
| `AES-GCM` | variable     | Authenticated encryption   |

---

## Full Example

```ts
const key = Crypto.generateSymmetricKey()
const message = Data.fromString("Encrypt me")
const encrypted = Crypto.encryptAESGCM(message, key)
const decrypted = encrypted ? Crypto.decryptAESGCM(encrypted, key) : null

if (decrypted) {
  console.log("Decrypted:", decrypted.toRawString())
}
```

---

## Notes

* All functions require valid `Data` objects.
* For AES-GCM, if `iv` is omitted, a secure random IV is automatically applied.
* Encrypted `Data` may include the IV and authentication tag.
