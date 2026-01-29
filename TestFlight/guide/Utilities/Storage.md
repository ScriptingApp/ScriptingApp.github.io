# Storage

The `Storage` module provides a lightweight persistent key-value storage system for scripts. It allows scripts to save and retrieve simple typed data as well as binary data (`Data`). All data is persisted asynchronously in the background.

By default, all values are stored in the **private domain** of the current script, which means other scripts cannot access them. To share data across multiple scripts, set the `shared: true` option to use the **shared domain** instead.

***

## Supported Data Types

The following types can be stored using the Storage API:

- `string`
- `number`
- `boolean`
- `JSON` (any JSON-serializable structure)
- `Data` (using `setData` / `getData`)

***

## Storage Domains

| Domain  | Default                       | Accessible By           | Use Case                                                        |
| ------- | ----------------------------- | ----------------------- | --------------------------------------------------------------- |
| Private | Yes                           | Only the current script | Script-specific settings, preferences, cached content           |
| Shared  | No (must pass `shared: true`) | All scripts             | Global settings, shared preferences, multi-script communication |

***

## API Reference

## 1. `Storage.set(key, value, options?)`

```ts
function set<T>(key: string, value: T, options?: { shared: boolean }): boolean;
```

Stores a value in persistent storage. Supports `string`, `number`, `boolean`, and JSON-serializable values.

### Parameters

| Name           | Type      | Required | Description                                    |
| -------------- | --------- | -------- | ---------------------------------------------- |
| key            | `string`  | Yes      | The key under which the value is stored        |
| value          | `T`       | Yes      | The value to store                             |
| options.shared | `boolean` | No       | Store the value in the shared domain when true |

### Returns

- `boolean` — whether the operation was successful.

***

## 2. `Storage.get(key, options?)`

```ts
function get<T>(key: string, options?: { shared: boolean }): T | null;
```

Retrieves a stored value. Returns `null` if the key does not exist.

### Returns

- `T | null` — the value associated with the key or `null`.

***

## 3. `Storage.setData(key, data, options?)`

```ts
function setData(key: string, data: Data, options?: { shared: boolean }): void;
```

Stores a `Data` object in persistent storage.

***

## 4. `Storage.getData(key, options?)`

```ts
function getData(key: string, options?: { shared: boolean }): Data | null;
```

Retrieves a stored `Data` object. Returns `null` if the key does not exist.

***

## 5. `Storage.remove(key, options?)`

```ts
function remove(key: string, options?: { shared: boolean }): void;
```

Removes the entry associated with the specified key.

***

## 6. `Storage.contains(key, options?)`

```ts
function contains(key: string, options?: { shared: boolean }): boolean;
```

Checks whether the storage contains the specified key.

***

## 7. `Storage.clear()`

```ts
function clear(): void;
```

Removes all entries from the **private storage domain**.
This does **not** affect shared storage.

***

## 8. `Storage.keys()`

```ts
function keys(): string[];
```

Returns an array of all keys stored in the current storage domain.

***

## Usage Examples

## Example 1: Store and retrieve simple values

```ts
Storage.set("username", "Thom");

const name = Storage.get<string>("username");
console.log(name); // "Thom"
```

***

## Example 2: Store a JSON object

```ts
Storage.set("profile", {
  name: "Alice",
  age: 30,
});

const profile = Storage.get<{ name: string; age: number }>("profile");
console.log(profile?.age); // 30
```

***

## Example 3: Store and read binary Data

```ts
const bytes = Data.fromUTF8("hello");
Storage.setData("payload", bytes);

const result = Storage.getData("payload");
console.log(result?.toUTF8()); // "hello"
```

***

## Example 4: Shared domain usage

```ts
Storage.set("theme", "dark", { shared: true });

const theme = Storage.get<string>("theme", { shared: true });
console.log(theme); // "dark"
```

***

## Example 5: Check existence and remove

```ts
if (Storage.contains("token")) {
  Storage.remove("token");
}
```

***

## Example 6: List all keys

```ts
console.log(Storage.keys()); // ["username", "profile", ...]
```

***

## Notes and Best Practices

1. All writes are persisted asynchronously, but the method returns immediately with a success flag.
2. `Data` cannot be stored using `Storage.set()`. Use `setData()` / `getData()` instead.
3. JSON values must be fully serializable.
4. Storage is intended for small, simple data. Avoid storing large binary blobs.
5. `Storage.clear()` only clears the private domain.
