The `Keychain` API allowing secure storage, retrieval, and management of sensitive data. This guide explains the methods and options available to use the `Keychain` API effectively.

---

## **Module: Keychain**

### **Methods**

---

#### **`Keychain.set(key: string, value: string, options?: KeychainOptions): void`**

**Description**  
Encrypts and saves the specified `key` with the given `value`. If the `key` already exists in the Keychain, its associated value will be updated.

**Parameters**  
- **`key`**: A unique identifier for the value to store (string)  
- **`value`**: The value to securely store (string)  
- **`options`** *(optional)*: Configuration options for the Keychain item

**Usage Example**
```tsx
// Store a user token with accessibility options
Keychain.set(
  'userToken',
  'abc123',
  {
    accessibility: 'unlocked',
    synchronizable: true
  }
)
```

---

#### **`Keychain.get(key: string, options?: KeychainOptions): string | null`**

**Description**  
Decrypts and retrieves the value associated with the specified `key`. Returns `null` if the `key` does not exist.

**Parameters**  
- **`key`**: A unique identifier for the value to retrieve (string)  
- **`options`** *(optional)*: Configuration options for accessing the Keychain item 

**Returns**  
- The stored value (string) or `null` if the `key` is not found.

**Usage Example**
```tsx
// Retrieve a stored token
const token = Keychain.get(
  'userToken',
  {
    accessibility: 'unlocked'
  }
)
if (token) {
  console.log(`Retrieved token: ${token}`)
} else {
  console.log('No token found')
}
```

---

#### **`Keychain.remove(key: string, options?: KeychainOptions): void`**

**Description**  
Deletes the value associated with the specified `key`. If the `key` does not exist, this method does nothing.

**Parameters**  
- **`key`**: A unique identifier for the value to delete (string)  
- **`options`** *(optional)*: Configuration options for the Keychain item

**Usage Example**
```tsx
// Remove a stored token
Keychain.remove('userToken')
console.log('Token deleted')
```

---

#### **`Keychain.contains(key: string, options?: KeychainOptions): boolean`**

**Description**  
Checks if the Keychain contains a value for the specified `key`.

**Parameters**  
- **`key`**: A unique identifier for the value to check (string)  
- **`options`** *(optional)*: Configuration options for the Keychain item 

**Returns**  
- `true` if the Keychain contains the `key`, otherwise `false`.

**Usage Example**
```tsx
// Check if a key exists in the Keychain
if (Keychain.contains('userToken')) {
  console.log('Token exists')
} else {
  console.log('Token does not exist')
}
```

---

## **Types**

### **KeychainOptions**
Configuration options for Keychain items.

| Property          | Type                | Description                                                                 |
|-------------------|---------------------|-----------------------------------------------------------------------------|
| `accessibility`   | `KeychainAccessibility` | Specifies when the Keychain item is accessible |
| `synchronizable`  | `boolean`           | Indicates whether the Keychain item synchronizes through iCloud             |

---

### **KeychainAccessibility**
Specifies when the Keychain item is accessible.  
Available values:

- **`passcode`**: Data is accessible only when the device is unlocked. Requires a passcode and does not migrate to new devices.
- **`unlocked`**: Data is accessible while the device is unlocked by the user.
- **`unlocked_this_device`**: Same as `unlocked`, but does not migrate to new devices.
- **`first_unlock`**: Data is accessible after the first unlock following a device restart.
- **`first_unlock_this_device`**: Same as `first_unlock`, but does not migrate to new devices.

---

## **Common Use Cases**

### **Storing and Retrieving User Tokens**
```tsx
// Store a user token
Keychain.set(
  'authToken',
  'secureToken',
  {
    accessibility: 'unlocked',
    synchronizable: true
  }
)

// Retrieve the token
const token = Keychain.get(
  'authToken',
  {
    accessibility: 'unlocked',
    synchronizable: true
  }
)
console.log(token ? `Token: ${token}` : 'No token found')
```

---

### **Securely Storing Sensitive Data**
```tsx
// Save sensitive credentials
Keychain.set('username', 'user123')
Keychain.set('password', 'password123', { accessibility: 'first_unlock' })

// Retrieve credentials
const username = Keychain.get('username')
const password = Keychain.get('password', { accessibility: 'first_unlock' })
if (username && password) {
  console.log(`Welcome, ${username}`)
} else {
  console.log('Credentials not found')
}
```

---

### **Removing Secure Data on Logout**
```tsx
// Clear user data
Keychain.remove('authToken')
Keychain.remove('username')
Keychain.remove('password')
console.log('User data cleared')
```
