`WebViewController` 和 `WebView` API 提供了在脚本中显示和交互 Web 内容的工具。`WebViewController` 允许进行高级编程控制，而 `WebView` 可以无缝地将 Web 内容集成到脚本的 UI 中。

---

## WebViewController 概述

`WebViewController` 提供对 Web 内容的完整控制，包括加载 URL、执行 JavaScript 和处理导航。它可以以模态形式呈现，或作为 `WebView` 组件的一部分使用。

---

## API 参考

### WebViewController 方法

#### 加载内容

- **`loadURL(url: string): Promise<boolean>`**
  - 加载指定 URL 的网页。
  - **参数:**
    - `url`：要加载的 URL 字符串。
  - **返回值：** 成功完成加载请求时返回 `true`。

- **`loadHTML(html: string, baseURL?: string): Promise<boolean>`**
  - 从 HTML 字符串加载内容。
  - **参数:**
    - `html`：要加载的 HTML 字符串。
    - `baseURL`（可选）：用于解析相对链接的基 URL。
  - **返回值：** 成功完成加载请求时返回 `true`。

- **`loadData(data: Data, mimeType: string, encoding: string, baseURL: string): Promise<boolean>`**
  - 从原始数据加载内容。
  - **参数:**
    - `data`：要加载的原始数据。
    - `mimeType`：数据的 MIME 类型。
    - `encoding`：字符编码。
    - `baseURL`：用于解析相对链接的基 URL。
  - **返回值：** 成功完成加载请求时返回 `true`。

#### 导航

- **`canGoBack(): Promise<boolean>`**
  - 检查导航历史中是否有有效的后退项。

- **`canGoForward(): Promise<boolean>`**
  - 检查导航历史中是否有有效的前进项。

- **`goBack(): Promise<boolean>`**
  - 导航到上一页。

- **`goForward(): Promise<boolean>`**
  - 导航到下一页。

- **`reload(): Promise<void>`**
  - 重新加载当前页面。

#### 内容交互

- **`getHTML(): Promise<string | null>`**
  - 获取当前网页的 HTML 内容。

- **`evaluateJavaScript<T = any>(javascript: string): Promise<T>`**
  - 在当前页面上下文中执行 JavaScript。

#### 消息通信

- **`addScriptMessageHandler<P = any, R = any>(name: string, handler: (params?: P) => R)`**
  - 注册消息处理程序，用于在 Web 内容和应用之间通信。

#### 界面呈现

- **`present(options?: { fullscreen?: boolean, navigationTitle?: string }): Promise<void>`**
  - 以模态形式呈现 WebView。

- **`dismiss(): void`**
  - 如果 WebView 当前正在显示，关闭它。

#### 生命周期管理

- **`waitForLoad(): Promise<boolean>`**
  - 等待当前加载请求完成。

- **`dispose(): void`**
  - 释放 WebViewController 使用的资源。不再需要控制器时必须调用此方法以避免内存泄漏。

---

### WebView

`WebView` 是一个 React 函数组件，用于在 UI 中嵌入 Web 内容。

**属性:**

- **`controller: WebViewController`**
  - 用于控制嵌入的 Web 内容的 `WebViewController` 实例。

---

## 常见用例

### 加载 URL

```typescript
const controller = new WebViewController()
controller.loadURL("https://example.com")
await controller.waitForLoad()
```

### 以模态形式显示 WebView

```typescript
const controller = new WebViewController()
controller.loadURL("https://example.com")
controller.present({ fullscreen: true, navigationTitle: "Example" }).then(() => {
  console.log("dismissed")
})
await controller.waitForLoad()
```

### 执行 JavaScript

```typescript
const controller = new WebViewController()
controller.loadURL("https://example.com")
await controller.waitForLoad()
const title = await controller.evaluateJavaScript<string>("document.title")
console.log(`页面标题是: ${title}`)
```

### 添加脚本消息处理程序

```typescript
const controller = new WebViewController()
controller.addScriptMessageHandler("sayHi", (message: string) => {
    console.log("收到消息:", message)
    return "来自应用的问候！"
})
await controller.loadHTML(`
    <script>
    window.webkit.messageHandlers.sayHi.postMessage('Hi!')
    </script>
`)
```

---

## 最佳实践

1. **释放控制器资源：** 当控制器不再需要时，始终调用 `dispose()`。
2. **优雅处理导航：** 在导航前检查 `canGoBack()` 和 `canGoForward()`。
3. **安全的消息通信：** 验证和清理来自脚本消息处理程序的输入。
4. **优化性能：** 优先使用 `loadHTML` 或 `loadData` 加载轻量级内容，而不是远程 URL。
5. **调试：** 使用 JavaScript 执行功能来排查开发问题。

---

## 完整示例

### 以模态形式显示 WebView

```typescript
const controller = new WebViewController()

// 添加消息处理程序
controller.addScriptMessageHandler("sayHi", (message: string) => {
    console.log("收到消息:", message)
    return "来自应用的问候！"
})

// 加载 URL
await controller.loadURL("https://example.com")

// 显示 WebView
controller.present({ fullscreen: true, navigationTitle: "示例网站" }).then(() => {
    console.log("WebView 已关闭")
})

// 执行 JavaScript
const pageTitle = await controller.evaluateJavaScript<string>("document.title")
console.log(`页面标题是: ${pageTitle}`)

// 关闭并释放资源
controller.dismiss()
controller.dispose()
```

### 在 TSX 中使用WebView和WebViewController

```tsx
function View() {
  const controller = useMemo(() => {
    const controller = new WebViewController()
    controller.loadURL("https://example.com")
  }, [])

  useEffect(() => {
    return () => controller.dispose()
  }, [])

  return <WebView controller={controller} />
}
```