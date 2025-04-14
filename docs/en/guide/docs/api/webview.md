The `WebViewController` and `WebView` APIs provide tools to display and interact with web content inside your script. `WebViewController` allows for advanced programmatic control, while `WebView` integrates web content seamlessly into your script’s UI.

---

## WebViewController Overview

`WebViewController` provides complete control over web content, including loading URLs, evaluating JavaScript, and handling navigation. It can be presented modally or used as part of a `WebView` component.

---

## API Reference

### WebViewController Methods

#### Loading Content

- **`loadURL(url: string): Promise<boolean>`**
    - Loads a webpage by its URL.
    - **Parameters:**
        - `url`: The URL string to load.
    - **Returns:** A promise resolving to `true` if the load request completes successfully.

- **`loadHTML(html: string, baseURL?: string): Promise<boolean>`**
    - Loads content from an HTML string.
    - **Parameters:**
        - `html`: The HTML string to load.
        - `baseURL` (optional): Base URL for resolving relative links.
    - **Returns:** A promise resolving to `true` if the load request completes successfully.

- **`loadData(data: Data, mimeType: string, encoding: string, baseURL: string): Promise<boolean>`**
    - Loads content from raw data.
    - **Parameters:**
        - `data`: The raw data to load.
        - `mimeType`: MIME type of the data.
        - `encoding`: Character encoding.
        - `baseURL`: Base URL for resolving relative links.
    - **Returns:** A promise resolving to `true` if the load request completes successfully.

#### Navigation

- **`canGoBack(): Promise<boolean>`**
    - Checks if there is a valid back item in the navigation history.

- **`canGoForward(): Promise<boolean>`**
    - Checks if there is a valid forward item in the navigation history.

- **`goBack(): Promise<boolean>`**
    - Navigates to the previous page.

- **`goForward(): Promise<boolean>`**
    - Navigates to the next page.

- **`reload(): Promise<void>`**
    - Reloads the current page.

#### Content Interaction

- **`getHTML(): Promise<string | null>`**
    - Retrieves the current webpage's HTML content.

- **`evaluateJavaScript<T = any>(javascript: string): Promise<T>`**
    - Evaluates JavaScript in the context of the current page.

#### Messaging

- **`addScriptMessageHandler<P = any, R = any>(name: string, handler: (params?: P) => R)`**
    - Registers a message handler to communicate between the web content and your app.

#### Presentation

- **`present(options?: { fullscreen?: boolean, navigationTitle?: string }): Promise<void>`**
    - Presents the WebView modally.

- **`dismiss(): void`**
    - Dismisses the WebView if it is currently presented.

#### Lifecycle Management

- **`waitForLoad(): Promise<boolean>`**
    - Waits until the current load request completes.

- **`dispose(): void`**
    - Releases resources used by the WebViewController. Always call this when the controller is no longer needed to avoid memory leaks.

---

### WebView

`WebView` is a React functional component for embedding web content into your UI.

**Props:**

- **`controller: WebViewController`**
    - The `WebViewController` instance to control the embedded web content.

---

## Common Use Cases

### Load a URL

```typescript
const controller = new WebViewController()
controller.loadURL("https://example.com")
```

### Present a WebView Modally

```typescript
const controller = new WebViewController()
controller.loadURL("https://example.com")
controller.present({ fullscreen: true, navigationTitle: "Example" }).then(() => {
  console.log("dismissed")
})
await controller.waitForLoad()
```

### Evaluate JavaScript

```typescript
const controller = new WebViewController()
controller.loadURL("https://example.com")
await controller.waitForLoad()
const title = await controller.evaluateJavaScript<string>("document.title")
console.log(`Page title is: ${title}`)
```

### Add a Script Message Handler

```typescript
const controller = new WebViewController()
controller.addScriptMessageHandler("sayHi", (message: string) => {
    console.log("Received message:", message)
    return "Hello from the app!"
})
await controller.loadHTML(`
    <script>
    window.webkit.messageHandlers.sayHi.postMessage('Hi!')
    </script>
`)
```

---

## Best Practices

1. **Dispose Controllers:** Always call `dispose()` when the controller is no longer needed.
2. **Handle Navigation Gracefully:** Check `canGoBack()` and `canGoForward()` before navigating.
3. **Secure Messaging:** Validate and sanitize inputs from script message handlers.
4. **Optimize Performance:** Use `loadHTML` or `loadData` for lightweight content instead of remote URLs when possible.
5. **Debugging:** Use JavaScript evaluation to troubleshoot issues during development.

---

## Full Example


### Presents the WebView modally 
```typescript
const controller = new WebViewController()

// Add message handler
controller.addScriptMessageHandler("sayHi", (message: string) => {
    console.log("Received message:", message)
    return "Hello from the app!"
})

// Load a URL
await controller.loadURL("https://example.com")

// Present the WebView
controller.present({ fullscreen: true, navigationTitle: "Example Website" }).then(() => {
    console.log("WebView dismissed")
})

// Evaluate JavaScript
const pageTitle = await controller.evaluateJavaScript<string>("document.title")
console.log(`Page title is: ${pageTitle}`)

// Dismiss and Dispose
controller.dismiss()

// The dispose method also dismiss the view.
controller.dispose()
```

### Use WebView and WebViewController in TSX
```tsx
function View() {
  const controller = useMemo(() => {
    const controller = new WebViewController()
    controller.loadURL("https://example.com")
  }, [])

  useEffect(() => {
    return () => controller.dispose()
  }, [])

  return <WebView
    controller={controller}
  />
}
```
