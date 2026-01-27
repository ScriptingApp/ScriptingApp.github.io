---
title: Keychain

---

`Keychain` provides secure access to the system keychain for storing **sensitive and persistent data** inside the Scripting environment. It is designed for:

* Authentication tokens
* Login credentials
* License and subscription states
* Encryption keys
* Private user data

All data is protected using the system-level Keychain security mechanism.

---

## 1. Per-Script Keychain Scope

In Scripting, `Keychain` uses a **per-script isolation model**.

### 1.1 Scope Rules

* Each script has its **own independent Keychain scope**
* A script can **only access the Keychain data it has written**
* Different scripts:

  * Cannot read each other’s Keychain data
  * Cannot overwrite each other’s keys
  * Even if the same key name is used
  * Even if `synchronizable: true` is enabled
* Each script is treated as an **independent security sandbox**

---

### 1.2 Security Implications

This design ensures that:

* No script can steal credentials from another script
* Subscription, login state, and authorization data are fully isolated
* Malicious scripts cannot access private user data stored by other scripts
* The security boundary is stricter than the system-level app Keychain alone

---

### 1.3 Script Removal Behavior

* When a script is deleted:

  * All Keychain data under that script’s scope is automatically removed
* Other scripts’ Keychain data is not affected

---

## 2. Namespace

```ts
namespace Keychain
```

---

## 3. Supported Data Types

`Keychain` supports three data types:

| Type        | Write     | Read      |
| ----------- | --------- | --------- |
| String      | `set`     | `get`     |
| Boolean     | `setBool` | `getBool` |
| Binary Data | `setData` | `getData` |

---

## 4. KeychainAccessibility

```ts
type KeychainAccessibility =
  | 'passcode'
  | 'unlocked'
  | 'unlocked_this_device'
  | 'first_unlock'
  | 'first_unlock_this_device'
```

| Value                      |  Description   |   
| -------------------------- | ------------------------------ |
| `passcode`                 | Accessible only when a device passcode is set; does not migrate to a new device |
| `unlocked`                 | Accessible only while the device is unlocked                                    |
| `unlocked_this_device`     | Accessible only on the current device; does not migrate                         |
| `first_unlock`             | Accessible after the first unlock following a restart                           |
| `first_unlock_this_device` | Same as `first_unlock`, but does not migrate                                    |

Default value:

```ts
accessibility: "unlocked"
```

---

## 5. iCloud Synchronization (synchronizable)

```ts
synchronizable?: boolean
```

| Value   | Description                                         |
| ------- | --------------------------------------------------- |
| `true`  | Synchronizes across devices using the same Apple ID |
| `false` | Stored only on the local device                     |

Default:

```ts
synchronizable: false
```

Even when enabled, synchronization is still restricted to the **current script scope**.

---

## 6. Writing Data

### 6.1 Store a String

```ts
Keychain.set(key: string, value: string, options?): boolean
```

```ts
Keychain.set("token", "abcdef")
```

```ts
Keychain.set("token", "abcdef", {
  accessibility: "first_unlock",
  synchronizable: true
})
```

---

### 6.2 Store a Boolean

```ts
Keychain.setBool(key: string, value: boolean, options?): boolean
```

```ts
Keychain.setBool("is_login", true)
```

---

### 6.3 Store Binary Data

```ts
Keychain.setData(key: string, value: Data, options?): boolean
```

```ts
Keychain.setData("avatar", imageData)
```

---

### 6.4 Overwrite Rules

* Existing values are automatically overwritten
* `true` is returned on success
* `false` is returned on failure

---

## 7. Reading Data

### 7.1 Read a String

```ts
Keychain.get(key: string, options?): string | null
```

---

### 7.2 Read a Boolean

```ts
Keychain.getBool(key: string, options?): boolean | null
```

---

### 7.3 Read Binary Data

```ts
Keychain.getData(key: string, options?): Data | null
```

---

## 8. Removing Data

```ts
Keychain.remove(key: string, options?): boolean
```

* If the key exists, it is deleted and returns `true`
* If the key does not exist, it still safely returns `true`

---

## 9. Checking for Key Existence

```ts
Keychain.contains(key: string, options?): boolean
```

---

## 10. Listing All Keys

```ts
Keychain.keys(options?): string[]
```

---

## 11. Clearing the Keychain

```ts
Keychain.clear(options?): boolean
```

Behavior:

* Only clears data within the **current script scope**
* Does not affect other scripts
* Does not affect the app’s own Keychain data or other apps

---

## 12. synchronizable Read/Write Consistency Rules

If a key is written with:

```ts
synchronizable: true
```

Then all subsequent operations **must use the same flag**:

```ts
Keychain.set("token", "abc", { synchronizable: true })

Keychain.get("token") // Cannot read
Keychain.get("token", { synchronizable: true }) // Can read
```

---

## 13. Security Recommendations

### Suitable Data

* Authentication tokens
* Subscription and license states
* User identifiers
* Encryption keys

### Not Recommended

* Large binary files
* High-frequency cache data
* Public configuration values

---

## 14. Typical Usage Examples

```ts
// Write
Keychain.set("token", "abcdef")
Keychain.setBool("is_login", true)
Keychain.setData("avatar", avatarData)

// Read
const token = Keychain.get("token")
const isLogin = Keychain.getBool("is_login")
const avatar = Keychain.getData("avatar")

// Remove
Keychain.remove("token")

// Check existence
Keychain.contains("token")

// List all keys
Keychain.keys()

// Clear
Keychain.clear()
```
