# Headers

The `Headers` class represents a collection of HTTP request or response header fields.
It is fully compatible with the **Fetch API** standard but includes additional convenience methods for scripting environments, such as JSON conversion for debugging and serialization.

A `Headers` object can be used in the following contexts:

- When creating a request via `RequestInit.headers`
- When reading headers from a `Response` object
- When programmatically modifying header data in a script

***

## Definition

```ts
class Headers {
  constructor(init?: HeadersInit)
  append(name: string, value: string): void
  get(name: string): string | null
  has(name: string): boolean
  set(name: string, value: string): void
  delete(name: string): void
  forEach(callback: (value: string, name: string) => void): void
  keys(): string[]
  values(): string[]
  entries(): [string, string][]
  toJson(): Record<string, string>
}
```

***

## HeadersInit Type

`Headers` can be initialized using multiple formats:

```ts
type HeadersInit = [string, string][] | Record<string, string> | Headers
```

You can create a `Headers` object using any of these forms:

```tsx
new Headers([["Content-Type", "application/json"]])
new Headers({ "Authorization": "Bearer token" })
new Headers(existingHeaders)
```

***

## Constructor

### `new Headers(init?: HeadersInit)`

Creates a new `Headers` instance.
You can optionally pass initial header data.

#### Parameters

| Parameter | Type          | Description                                                                  |
| --------- | ------------- | ---------------------------------------------------------------------------- |
| **init**  | `HeadersInit` | Initial header data. Can be an object, array, or another `Headers` instance. |

***

## Methods

### `append(name: string, value: string): void`

Adds a new value to an existing header field.
If the field already exists, the new value is **appended** instead of replacing the old one.

#### Example

```tsx
const headers = new Headers()
headers.append("Accept", "application/json")
headers.append("Accept", "text/plain") // Now "Accept" has two values
```

***

### `set(name: string, value: string): void`

Sets a header field to a specific value.
If the field already exists, it will be **overwritten**.

#### Example

```tsx
const headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Authorization", "Bearer token-123")
```

***

### `get(name: string): string | null`

Retrieves the value of a specific header field.
Returns `null` if the field does not exist.

#### Example

```tsx
const headers = new Headers({ "Content-Type": "application/json" })
console.log(headers.get("Content-Type")) // "application/json"
```

***

### `has(name: string): boolean`

Checks whether a specific header field exists.

#### Example

```tsx
const headers = new Headers({ "Accept": "application/json" })
console.log(headers.has("Accept")) // true
console.log(headers.has("Authorization")) // false
```

***

### `delete(name: string): void`

Removes a specific header field.

#### Example

```tsx
const headers = new Headers({
  "Accept": "application/json",
  "Cache-Control": "no-cache"
})
headers.delete("Cache-Control")
```

***

### `forEach(callback: (value: string, name: string) => void): void`

Iterates over all header fields and executes the callback for each pair.

#### Example

```tsx
const headers = new Headers({
  "Accept": "application/json",
  "User-Agent": "ScriptingApp/1.0"
})

headers.forEach((value, name) => {
  console.log(`${name}: ${value}`)
})
```

***

### `keys(): string[]`

Returns an array containing all header names.

```tsx
const headers = new Headers({
  "Accept": "application/json",
  "User-Agent": "Scripting"
})
console.log(headers.keys()) // ["accept", "user-agent"]
```

> Note: Header names are **case-insensitive** and normalized to lowercase.

***

### `values(): string[]`

Returns an array containing all header values.

```tsx
const headers = new Headers({
  "Accept": "application/json",
  "User-Agent": "Scripting"
})
console.log(headers.values()) // ["application/json", "Scripting"]
```

***

### `entries(): [string, string][]`

Returns an array of `[name, value]` pairs representing all headers.

#### Example

```tsx
const headers = new Headers({
  "Accept": "application/json",
  "Cache-Control": "no-cache"
})
console.log(headers.entries())
// [["accept", "application/json"], ["cache-control", "no-cache"]]
```

***

### `toJson(): Record<string, string>`

Converts the header collection into a plain JSON object for easy serialization and debugging.

#### Example

```tsx
const headers = new Headers({
  "Content-Type": "application/json",
  "Authorization": "Bearer token"
})

console.log(headers.toJson())
// { "content-type": "application/json", "authorization": "Bearer token" }
```

***

## Usage Examples

### Example 1 — Setting Custom Headers in a Request

```tsx
const headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Authorization", "Bearer token-xyz")

const response = await fetch("https://api.example.com/user", {
  method: "POST",
  headers,
  body: JSON.stringify({ name: "Tom" }),
})
```

***

### Example 2 — Reading Response Headers

```tsx
const response = await fetch("https://example.com/data")
console.log("Content-Type:", response.headers.get("Content-Type"))
console.log("Server:", response.headers.get("Server"))
```

***

### Example 3 — Converting to JSON for Logging

```tsx
const response = await fetch("https://example.com/api")
console.log("Response Headers:", response.headers.toJson())
```

***

### Example 4 — Checking for Specific Headers

```tsx
const response = await fetch("https://example.com/info")
if (response.headers.has("Set-Cookie")) {
  console.log("The response contains a Set-Cookie header")
}
```

***

## Relationships with Other Classes

| Class          | Description                                                                              |
| -------------- | ---------------------------------------------------------------------------------------- |
| **`Request`**  | Headers can be defined in `RequestInit.headers` when creating requests.                  |
| **`Response`** | Access response headers via `response.headers`.                                          |
| **`fetch()`**  | Both requests and responses use `Headers` to manage header data.                         |
| **`Cookie`**   | Cookies returned in headers can be parsed into structured objects in `response.cookies`. |

***

## Notes

- **Case-insensitivity:** Header names are case-insensitive and stored in lowercase form.
- **Multi-value headers:** Use `append()` to add multiple values for the same header (e.g., for `Accept` or `Cookie`).
- **System headers:** Certain system-managed headers (e.g., `Host`, `Connection`) may be ignored or overwritten by the iOS networking stack.
- **Serialization:** The `toJson()` method is useful for logging, debugging, or serializing header data.

***

## Summary

The `Headers` class is a foundational component of the **Scripting networking system**, providing a consistent and convenient interface for managing HTTP headers.

It enables developers to:

- Add, modify, and remove headers dynamically
- Read and iterate through response headers
- Work with both request and response headers in a unified way
- Output structured header data for logging and debugging
