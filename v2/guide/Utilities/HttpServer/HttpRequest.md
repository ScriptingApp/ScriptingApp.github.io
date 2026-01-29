# HttpRequest

The `HttpRequest` class represents an HTTP request received by the server.
It encapsulates all request information, including path, method, headers, body, client address, and parsed parameters.
An instance of this class is provided as an argument to handler functions registered through `HttpServer.registerHandler()`.

***

## Overview

`HttpRequest` is typically used inside HTTP route handlers to:

- Access request path, method, headers, and body
- Read URL parameters and query parameters
- Parse form data (`application/x-www-form-urlencoded` or `multipart/form-data`)
- Verify authentication tokens or custom headers

***

## Properties

### `path: string`

The request path (excluding query parameters).

**Example:**

```ts
console.log(request.path)
// Output: "/api/user"
```

***

### `method: string`

The HTTP method of the request (e.g., `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`).

**Example:**

```ts
console.log(request.method)
// Output: "POST"
```

***

### `headers: Record<string, string>`

An object containing all HTTP request headers as key–value pairs.

**Example:**

```ts
console.log(request.headers["content-type"])
// Output: "application/json"
```

***

### `body: Data`

The request body as a `Data` object.
You can convert it to a string using methods such as `toRawString("utf-8")`.

**Example:**

```ts
const text = request.body.toRawString("utf-8")
console.log("Body content:", text)
```

***

### `address: string | null`

The IP address of the client that made the request.
If the address cannot be determined, this value is `null`.

**Example:**

```ts
console.log("Client address:", request.address)
```

***

### `params: Record<string, string>`

An object containing route parameters defined in the registered path.

**Example:**

```ts
// Route registration
server.registerHandler("/user/:id", (req) => {
  const userId = req.params["id"]
  return HttpResponse.ok(HttpResponseBody.text(`User ID: ${userId}`))
})
```

If the request path is `/user/123`, the response will be:

```
User ID: 123
```

***

### `queryParams: Array<{ key: string; value: string }>`

An array of query parameter key–value pairs extracted from the request URL.

**Example:**

```ts
// Request URL: /search?keyword=apple&page=2
for (const param of request.queryParams) {
  console.log(param.key, "=", param.value)
}
// Output:
// keyword = apple
// page = 2
```

***

## Methods

### `hasTokenForHeader(headerName: string, token: string): boolean`

Checks whether the specified header contains the given token value.
Commonly used for authentication headers such as `Authorization`.

**Parameters:**

| Name         | Type     | Description                                         |
| ------------ | -------- | --------------------------------------------------- |
| `headerName` | `string` | The name of the header to check (case-insensitive). |
| `token`      | `string` | The token string to match.                          |

**Returns:**

- `true` if the header contains the token
- `false` otherwise

**Example:**

```ts
if (!request.hasTokenForHeader("Authorization", "Bearer my-secret-token")) {
  return HttpResponse.unauthorized()
}
```

***

### `parseUrlencodedForm(): Array<{ key: string; value: string }>`

Parses the request body as `application/x-www-form-urlencoded` form data.
Typically used for HTML form submissions via POST.

**Returns:**
An array of key–value pairs representing form fields.

**Example:**

```ts
const form = request.parseUrlencodedForm()
for (const field of form) {
  console.log(field.key, "=", field.value)
}
```

If the body is:

```
username=thom&password=1234
```

then the output is:

```
username = thom
password = 1234
```

***

### `parseMultiPartFormData(): Array<{ name: string | null; filename: string | null; headers: Record<string, string>; data: Data }>`

Parses `multipart/form-data` requests, typically used for file uploads.

**Returns:**
An array of form parts, where each element contains:

| Property   | Type                     | Description                                                    |
| ---------- | ------------------------ | -------------------------------------------------------------- |
| `name`     | `string \| null`         | The field name.                                                |
| `filename` | `string \| null`         | The uploaded filename if the part is a file, otherwise `null`. |
| `headers`  | `Record<string, string>` | The part’s headers.                                            |
| `data`     | `Data`                   | The raw content of the field or file.                          |

**Example:**

```ts
const parts = request.parseMultiPartFormData()
for (const part of parts) {
  if (part.filename) {
    console.log("Uploaded file:", part.filename)
    FileManager.writeAsDataSync(Path.join(Script.directory, part.filename), part.data)
  } else {
    console.log("Field:", part.name, "=", part.data.toRawString("utf-8"))
  }
}
```

***

## Full Example

The example below shows how to read request data and respond accordingly:

```ts
server.registerHandler("/upload", (req) => {
  if (req.method === "POST") {
    const parts = req.parseMultiPartFormData()
    for (const part of parts) {
      if (part.filename) {
        console.log("Received file:", part.filename)
      } else {
        console.log("Field:", part.name)
      }
    }
    return HttpResponse.ok(HttpResponseBody.text("Upload successful"))
  } else {
    return HttpResponse.badRequest(HttpResponseBody.text("POST required"))
  }
})
```
