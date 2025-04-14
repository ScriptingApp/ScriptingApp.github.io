The `Storage` API provides a simple and efficient interface for storing and retrieving persistent data, supporting basic data types and JSON.

---

## Overview

The `Storage` API is designed to persist simple data types asynchronously to disk. It is suitable for settings, user preferences, or lightweight data that needs to be retained between app launches.

### Key Features:
- Simple interface for storing, retrieving, and removing data.
- Supports essential data types and JSON.
- Persistent across app launches.

---

## Supported Data Types

The following data types are supported for storage:

- `string`
- `number`
- `boolean`
- JSON objects (`Record<string, any>` or arrays)

---

## API Reference

### Methods

#### `Storage.set<T>(key: string, value: T): boolean`

Saves a `value` to persistent storage in the background.

- **Parameters:**
  - `key`: A unique identifier for the data.
  - `value`: The data to be stored. Must be one of the supported data types.
- **Returns:**
  - A boolean indicating whether the operation was successful.

#### Example:

```typescript
const success = Storage.set("username", "JohnDoe")
console.log("Save successful:", success)
```

---

#### `Storage.get<T>(key: string): T | null`

Reads a value from persistent storage. If the `key` does not exist, it returns `null`.

- **Parameters:**
  - `key`: The unique identifier of the data to retrieve.
- **Returns:**
  - The stored value, or `null` if the `key` does not exist.

#### Example:

```typescript
const username = Storage.get<string>("username")
console.log("Stored username:", username)
```

---

#### `Storage.remove(key: string): void`

Removes an entry from persistent storage.

- **Parameters:**
  - `key`: The unique identifier of the data to remove.

#### Example:

```typescript
Storage.remove("username")
console.log("Username removed from storage")
```

---

#### `Storage.contains(key: string): boolean`

Checks if the persistent storage contains the given `key`.

- **Parameters:**
  - `key`: The unique identifier of the data.
- **Returns:**
  - `true` if the `key` exists, otherwise `false`.

#### Example:

```typescript
const hasKey = Storage.contains("username")
console.log("Username exists in storage:", hasKey)
```

---

## Common Use Cases

### Save and Retrieve a User Setting

```typescript
Storage.set("theme", "dark")
const theme = Storage.get<string>("theme")
console.log("Current theme:", theme)
```

### Check for a Key and Remove It

```typescript
if (Storage.contains("theme")) {
  Storage.remove("theme")
  console.log("Theme preference removed")
}
```

### Store JSON Data

```typescript
const userData = { name: "John Doe", age: 30 }
Storage.set("user", userData)

const storedUser = Storage.get<Record<string, any>>("user")
console.log("User data:", storedUser)
```

---

## Best Practices

1. **Key Management:** Use consistent and descriptive keys to avoid conflicts and make your code more maintainable.
2. **Validate Data:** Always validate the data type and structure when retrieving stored JSON objects.
3. **Error Handling:** Check the return value of `Storage.set` to ensure that the operation was successful.
4. **Optimize Access:** Minimize frequent read/write operations to avoid unnecessary overhead.

---

## Full Example

```typescript
async function main() {
  // Save user preferences
  const saveSuccess = Storage.set("language", "English")
  if (saveSuccess) {
    console.log("Language preference saved successfully")
  }

  // Retrieve user preferences
  const language = Storage.get<string>("language")
  console.log("Preferred language:", language)

  // Save JSON data
  const profile = { name: "Jane Doe", age: 28 }
  Storage.set("profile", profile)

  // Retrieve JSON data
  const storedProfile = Storage.get<Record<string, any>>("profile")
  console.log("Stored profile:", storedProfile)

  // Remove a key
  if (Storage.contains("language")) {
    Storage.remove("language")
    console.log("Language preference removed")
  }
}

main()
```

