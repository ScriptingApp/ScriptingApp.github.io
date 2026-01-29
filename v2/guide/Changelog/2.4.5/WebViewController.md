# WebViewController

The `WebViewController` class allows you to display and interact with embedded web content inside your script. It is designed for use cases like custom in-app browsers, rendering dynamic HTML, or communicating with JavaScript running in a web context.

***

## Class: `WebViewController`

```ts
const webView = new WebViewController()
```

***

## Properties

### `shouldAllowRequest?: (request) => Promise<boolean>`

An optional callback that determines whether to allow or block a request made by the WebView. This function is invoked before each resource is loaded, such as when navigating to a new page or submitting a form.

This is useful for intercepting navigation actions, implementing custom security logic, or filtering unwanted requests (e.g., ad domains).

#### Parameters

The function receives a single `request` object with the following properties:

- `url: string`
  The full URL of the request.

- `method: string`
  The HTTP method (e.g., `GET`, `POST`).

- `body?: Data | null`
  Optional body data sent with the request (e.g., for `POST` requests).

- `headers: Record<string, string>`
  HTTP request headers.

- `timeoutInterval: number`
  The timeout interval in seconds for the request.

- `navigationType: "linkActivated" | "reload" | "backForward" | "formResubmitted" | "formSubmitted" | "other"`
  The context that triggered the navigation.

#### Returns

A `Promise<boolean>` resolving to:

- `true`: allow the request to proceed
- `false`: block the request

#### Example

```ts
const webView = new WebViewController()

webView.shouldAllowRequest = async (request) => {
  console.log('Intercepted request to:', request.url)

  // Block all requests to example.com
  if (request.url.includes('example.com')) {
    return false
  }

  return true
}

await webView.loadURL('https://www.wikipedia.org')
await webView.present({ navigationTitle: 'Filtered WebView' })
```

***

## Methods

### `loadFile(path: string, allowingReadAccessTo?: string): Promise<boolean>`

Loads a web page from a local file.

- **Parameters**:

  - `path`: The path to the local file.
  - `allowingReadAccessTo` (optional): A directory to allow read access to.
- **Returns**: `Promise<boolean>` — Resolves to `true` if the load succeeds.

### `loadURL(url: string): Promise<boolean>`

Loads a webpage by its URL.

- **Parameters**:

  - `url`: The full URL of the webpage to load.
- **Returns**: `Promise<boolean>` — Resolves to `true` if the load succeeds.

***

### `loadHTML(html: string, baseURL?: string): Promise<boolean>`

Loads a web page using raw HTML content.

- **Parameters**:

  - `html`: The HTML string to render.
  - `baseURL` (optional): A base URL to resolve relative paths.
- **Returns**: `Promise<boolean>` — Resolves to `true` on successful load.

***

### `loadData(data: Data, mimeType: string, encoding: string, baseURL: string): Promise<boolean>`

Loads web content from raw data.

- **Parameters**:

  - `data`: The binary content to load.
  - `mimeType`: MIME type of the content (e.g., `"text/html"`).
  - `encoding`: Character encoding (e.g., `"utf-8"`).
  - `baseURL`: Base URL for resolving relative URLs.
- **Returns**: `Promise<boolean>`

***

### `waitForLoad(): Promise<boolean>`

Waits until the WebView has finished loading content.

- **Returns**: `Promise<boolean>`

***

### `getHTML(): Promise<string | null>`

Returns the current HTML content of the page.

- **Returns**: `Promise<string | null>`

***

### `evaluateJavaScript<T = any>(javascript: string): Promise<T>`

Evaluates the specified JavaScript string in the context of the WebView.

- **Parameters**:

  - `javascript`: A JavaScript code string to be evaluated.
    To retrieve a result from JavaScript, the code must explicitly use the `return` keyword.
- **Returns**: `Promise<T>` — Resolves with the result of the JavaScript evaluation. If the JavaScript code returns a value, it will be returned as the resolved value of the Promise.

#### Example

```ts
const webView = new WebViewController()
await webView.loadURL("https://example.com")
const title = await webView.evaluateJavaScript("return document.title") // Must use `return`
console.log(title) // "Example Domain"
webView.dispose()
```

Another example:

```ts
const webView = new WebViewController()
await webView.loadHTML(`
  <html>
    <body>
      <script>
        window.myValue = 42
      </script>
    </body>
  </html>
`)

await webView.waitForLoad()

const result = await webView.evaluateJavaScript('return window.myValue')
console.log(result) // 42
```

***

### `addScriptMessageHandler<P = any, R = any>(name: string, handler: (params?: P) => R): Promise<void>`

Installs a message handler callable from JavaScript in the web page, and enables sending a reply back from native code.

- **Parameters**:

  - `name`: The message handler name. Must be unique and non-empty.
  - `handler`: A callback function that receives parameters from JavaScript and returns a value. The return value will be sent back as the JavaScript promise resolution.

- **Returns**: `Promise<void>` — Resolves when the message handler is added successfully.

#### Example

```ts
let webView = new WebViewController()

await webView.addScriptMessageHandler("sayHi", (greeting: string) => {
  console.log("Receive a message", greeting)
  return "Hello!"
})

await webView.loadHTML(`
  <html>
    <body>
      <script>
        (async () => {
          const response = await window.webkit.messageHandlers.sayHi.postMessage("Hi!")
          alert(response) // Shows: "Hello!"
        })()
      </script>
    </body>
  </html>
`)
```

***

### `present(options?: { fullscreen?: boolean, navigationTitle?: string }): Promise<void>`

Presents the WebView in a modal sheet.

- **Options**:

  - `fullscreen`: If `true`, displays the WebView in fullscreen mode.
  - `navigationTitle`: Optional title for the navigation bar.
- **Returns**: `Promise<void>`

***

### `canGoBack(): Promise<boolean>`

Checks whether the WebView can go back in history.

***

### `canGoForward(): Promise<boolean>`

Checks whether the WebView can go forward in history.

***

### `goBack(): Promise<boolean>`

Navigates to the previous page in the history stack.

***

### `goForward(): Promise<boolean>`

Navigates to the next page in the history stack.

***

### `reload(): Promise<void>`

Reloads the current webpage.

***

### `dismiss(): void`

Dismisses the WebView if currently presented.

***

### `dispose(): void`

Disposes the WebView instance and releases resources.

- If the WebView is still presented, it will first be dismissed.
- **Important**: You must call this to prevent memory leaks when done.

***

## Full Example

```ts
const webView = new WebViewController()

await webView.addScriptMessageHandler('greet', (name) => {
  return `Hello, ${name}`
})

await webView.loadHTML(`
  <html>
    <body>
      <h1>Custom WebView</h1>
      <button onclick="sendMessage()">Greet</button>
      <script>
        async function sendMessage() {
          const response = await window.webkit.messageHandlers.greet.postMessage("Alice")
          alert(response)
        }
      </script>
    </body>
  </html>
`)

await webView.present({ navigationTitle: 'WebView Demo' })
webView.dispose()
```
