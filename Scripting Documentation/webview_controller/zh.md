`WebViewController` 是一个用于显示和交互网页内容的控制器。它允许你在脚本中加载 HTML、展示 Web 页面、执行 JavaScript 脚本，并与页面中的 JavaScript 进行消息通信。你可以将它作为浏览器使用，也可以嵌入应用功能页面。

---

## 类：`WebViewController`

表示一个 WebView 控制器对象，用于展示 Web 内容并与网页交互。

```ts
const webView = new WebViewController()
```

---

## 属性

### `shouldAllowRequest`

```ts
shouldAllowRequest?: (request) => Promise<boolean>
```

一个可选的回调函数，用于决定每一个 Web 请求是否允许加载。常用于拦截导航、实现访问控制或内容过滤。

#### 参数说明：

* `url: string`：请求地址。
* `method: string`：HTTP 方法（如 `GET`、`POST`）。
* `body?: Data | null`：请求体数据。
* `headers: Record<string, string>`：请求头信息。
* `timeoutInterval: number`：请求的超时时间。
* `navigationType`: 导航类型，可为：

  * `linkActivated`：点击链接
  * `reload`：重新加载
  * `backForward`：前进或后退
  * `formSubmitted`：提交表单
  * `formResubmitted`：重新提交表单
  * `other`：其他类型

#### 返回值：

* `true`：允许加载请求
* `false`：阻止加载请求

#### 示例：

```ts
webView.shouldAllowRequest = async (request) => {
  if (request.url.includes('ads.example.com')) {
    return false
  }
  return true
}
```

---

## 方法

### `loadURL(url: string): Promise<boolean>`

加载一个网页地址。

* **参数**：

  * `url`：要加载的网页地址字符串。
* **返回值**：

  * `Promise<boolean>`：是否加载成功。

---

### `loadHTML(html: string, baseURL?: string): Promise<boolean>`

使用 HTML 字符串加载页面内容。

* **参数**：

  * `html`：HTML 字符串。
  * `baseURL`（可选）：用于解析相对路径的基础地址。
* **返回值**：

  * `Promise<boolean>`：是否加载成功。

---

### `loadData(data: Data, mimeType: string, encoding: string, baseURL: string): Promise<boolean>`

加载原始数据内容作为网页。

* **参数**：

  * `data`：网页内容的二进制数据。
  * `mimeType`：数据类型，如 `text/html`。
  * `encoding`：字符编码，如 `utf-8`。
  * `baseURL`：基础地址。
* **返回值**：

  * `Promise<boolean>`

---

### `waitForLoad(): Promise<boolean>`

等待 Web 页面加载完成。

* **返回值**：

  * `Promise<boolean>`：是否加载成功。

---

### `getHTML(): Promise<string | null>`

获取当前页面的 HTML 内容。

* **返回值**：

  * `Promise<string | null>`：当前网页的 HTML 字符串。

---

### `evaluateJavaScript<T = any>(javascript: string): Promise<T>`

在网页上下文中执行 JavaScript 代码。

* **参数**：

  * `javascript`：JavaScript 代码字符串。
* **返回值**：

  * `Promise<T>`：执行结果。

#### 示例：

```ts
await webView.evaluateJavaScript('document.title')
```

---

### `addScriptMessageHandler<P = any, R = any>(name: string, handler: (params?: P) => R): void`

添加可被网页 JavaScript 调用的消息处理器。

* **参数**：

  * `name`：消息名称，必须唯一。
  * `handler`：处理函数，接收参数并返回响应。

#### 示例：

```ts
webView.addScriptMessageHandler('sayHello', (name: string) => {
  return `Hello, ${name}`
})
```

网页端调用：

```js
window.webkit.messageHandlers.sayHello.postMessage("Alice")
```

---

### `present(options?: { fullscreen?: boolean, navigationTitle?: string }): Promise<void>`

以模态视图形式展示 WebView。

* **参数**：

  * `fullscreen`（可选）：是否全屏显示。
  * `navigationTitle`（可选）：导航栏标题。
* **返回值**：

  * `Promise<void>`

---

### `canGoBack(): Promise<boolean>`

判断是否可以后退。

* **返回值**：

  * `Promise<boolean>`

---

### `canGoForward(): Promise<boolean>`

判断是否可以前进。

* **返回值**：

  * `Promise<boolean>`

---

### `goBack(): Promise<boolean>`

后退到上一页。

* **返回值**：

  * `Promise<boolean>`

---

### `goForward(): Promise<boolean>`

前进到下一页。

* **返回值**：

  * `Promise<boolean>`

---

### `reload(): Promise<void>`

重新加载当前页面。

---

### `dismiss(): void`

关闭当前展示的 WebView（如果已展示）。

---

### `dispose(): void`

销毁 WebViewController 实例，释放资源。
如果 WebView 处于展示状态，将自动关闭。**必须**在不再使用时调用该方法以防止内存泄漏。

---

## 示例：完整使用流程

```ts
const webView = new WebViewController()

webView.shouldAllowRequest = async (req) => {
  console.log('请求地址：', req.url)
  return !req.url.includes('blockme.com')
}

webView.addScriptMessageHandler('ping', () => {
  return 'pong'
})

await webView.loadHTML(`
  <html>
    <body>
      <h1>你好，WebView！</h1>
      <script>
        window.webkit.messageHandlers.ping.postMessage()
      </script>
    </body>
  </html>
`)

await webView.present({ navigationTitle: '演示页面' })
```