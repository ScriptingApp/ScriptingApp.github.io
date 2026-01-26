# SSH Authentication Method PRO

Represents a method for authenticating with an SSH server. This class provides static methods for creating different types of SSH authentication strategies, including password-based, RSA key, ED25519, and ECDSA (P-256, P-384, P-521) private key authentication.

This class is essential when connecting to an SSH server using the `SSHClient.connect()` method.

## Static Methods

### `static passwordBased(username: string, password: string): SSHAuthenticationMethod`

Creates a password-based authentication method.

#### Parameters:

- `username` (string):
  The username to use when logging into the SSH server.

- `password` (string):
  The password corresponding to the provided username.

#### Returns:

- An instance of `SSHAuthenticationMethod` configured for password-based login.

#### Example:

```ts
const auth = SSHAuthenticationMethod.passwordBased("user1", "mypassword")
```

***

### `static ras(username: string, sshRsa: Data, decryptionKey?: Data): SSHAuthenticationMethod | null`

Creates an RSA private key–based authentication method.

#### Parameters:

- `username` (string):
  The username for SSH login.

- `sshRsa` (`Data`):
  The RSA private key in OpenSSH format. You can load the key using the `Data.fromString()` or similar method.

- `decryptionKey` (`Data`, optional):
  If the private key is encrypted, provide the decryption password as a `Data` object.

#### Returns:

- An instance of `SSHAuthenticationMethod` configured with RSA authentication, or `null` if the key is invalid.

#### Example:

```ts
const rsaKey = Data.fromString(privateKeyContent)!
const auth = SSHAuthenticationMethod.ras("user1", rsaKey)
```

***

### `static ed25519(username: string, sshEd25519: Data, decryptionKey?: Data): SSHAuthenticationMethod | null`

Creates an ED25519 private key–based authentication method.

#### Parameters:

- `username` (string):
  The SSH username.

- `sshEd25519` (`Data`):
  The ED25519 private key content.

- `decryptionKey` (`Data`, optional):
  Optional decryption key if the private key is encrypted.

#### Returns:

- An instance of `SSHAuthenticationMethod`, or `null` if the key is not valid.

#### Example:

```ts
const edKey = Data.fromString(ed25519KeyContent)!
const auth = SSHAuthenticationMethod.ed25519("user1", edKey)
```

***

### `static p256(username: string, pemRepresentation: string): SSHAuthenticationMethod | null`

Creates a P-256 (ECDSA) authentication method from a PEM-formatted private key.

#### Parameters:

- `username` (string):
  The username for SSH login.

- `pemRepresentation` (string):
  The PEM-formatted private key string for ECDSA P-256.

#### Returns:

- An instance of `SSHAuthenticationMethod`, or `null` if the PEM is not valid.

#### Example:

```ts
const auth = SSHAuthenticationMethod.p256("user1", pemKeyContent)
```

***

### `static p384(username: string, pemRepresentation: string): SSHAuthenticationMethod | null`

Creates a P-384 (ECDSA) authentication method using a PEM-formatted private key.

#### Parameters:

- `username` (string):
  The SSH username.

- `pemRepresentation` (string):
  The PEM-formatted private key string.

#### Returns:

- An instance of `SSHAuthenticationMethod`, or `null` if the PEM format is invalid.

***

### `static p521(username: string, pemRepresentation: string): SSHAuthenticationMethod | null`

Creates a P-521 (ECDSA) authentication method using a PEM-formatted private key.

#### Parameters:

- `username` (string):
  The SSH username.

- `pemRepresentation` (string):
  The PEM-formatted private key string.

#### Returns:

- An instance of `SSHAuthenticationMethod`, or `null` if the PEM format is invalid.

***

## Usage Example

```ts
// Example with password
const passwordAuth = SSHAuthenticationMethod.passwordBased("root", "secret123")

// Example with RSA private key
const privateKey = await FileManager.readAsData("/path/to/id_rsa")
const rsaAuth = SSHAuthenticationMethod.ras("root", privateKey)

// Connect to server
const ssh = await SSHClient.connect({
  host: "192.168.0.1",
  authenticationMethod: rsaAuth
})
```
