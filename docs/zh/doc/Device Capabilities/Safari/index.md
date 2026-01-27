---
title: Safari

---
        
`Safari` 模块提供用于打开和展示网页的函数，可通过系统默认浏览器外部打开，或在 Scripting 应用内通过内嵌 Safari 视图打开网页，实现沉浸式或外部浏览的无缝切换。

---

## 模块：`Safari`

该模块包含两个函数：

---

### ▸ `Safari.openURL(url: string): Promise<boolean>`

使用系统默认方式打开指定的 URL。根据 URL 的 scheme 类型，可能会启动 Safari、其他浏览器或对应的第三方应用。

#### 参数

* **`url`** (`string`): 要打开的 URL。支持以 `http://`、`https://` 开头的网址，也支持如 `mailto:`、`tel:`、`appname://` 等自定义 URL scheme。

#### 返回值

* 返回一个 `Promise<boolean>`，当 URL 成功打开时为 `true`，如果打开失败（例如无效的 scheme 或未安装支持的应用）则为 `false`。

#### 示例

```ts
const success = await Safari.openURL('mailto:hello@example.com')
if (!success) {
  console.error('打开 URL 失败')
}
```

---

### ▸ `Safari.present(url: string, fullscreen?: boolean): Promise<void>`

在 Scripting 应用内使用内嵌 Safari 视图展示网页。该网页以模态窗口方式呈现。返回的 Promise 会在用户关闭该视图后才完成。

#### 参数

* **`url`** (`string`): 要展示的网页地址。
* **`fullscreen`** (`boolean`, 可选): 是否以全屏方式展示，默认为 `true`。

#### 返回值

* 一个 `Promise<void>`，在用户关闭网页视图后完成。

#### 示例

默认全屏展示网站：

```ts
await Safari.present('https://developer.apple.com')

// 视图关闭后执行
console.log('网页视图已关闭。')
```

非全屏展示（例如嵌入界面中的子页面）：

```ts
await Safari.present('https://news.ycombinator.com', false)

// 视图关闭后执行
console.log('网页视图已关闭。')
```

---

## 使用场景

* 跳转到外部链接，例如帮助文档、认证页面或 App Store。
* 在应用内展示在线内容，如博客文章、数据面板等。
* 通过自定义 URL scheme 启动第三方应用。

---

## 注意事项

* 请确保传入的是完整有效的 URL。
* 若希望用户停留在应用中，请使用 `present()`。
* 若需跳转到外部浏览器或打开其他 app，请使用 `openURL()`。
