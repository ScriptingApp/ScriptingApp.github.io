# 剪贴板

`Pasteboard` 命名空间提供在 **Scripting app** 中读取、设置与监听系统粘贴板内容变化的完整接口。
相比旧版 `Clipboard`，`Pasteboard` 提供了更强的功能支持，包括：

- 支持多类型数据（文本、图片、URL、二进制数据等）
- 监听粘贴板变化事件
- 设置隐私属性（如过期时间、本地可见性）

> **注意**
> 如果希望能够从其他 App 粘贴内容，请前往：
> **设置 > Scripting > 从其他 App 粘贴 > 允许**

***

## 命名空间：`Pasteboard`

### 类型定义

#### `Item`

表示一个粘贴板项目。
每个项目是一个 `Record<UTType, string | UIImage | Data>` 映射表，其中键为数据类型（`UTType`），值可以是字符串、图片或二进制数据。

常见类型：

- `public.plain-text` → 文本字符串
- `public.url` → URL 字符串
- `public.jpeg` / `public.png` → 图片对象（`UIImage`）
- `public.data` → 二进制数据（`Data`）

**示例**

```ts
const item: Pasteboard.Item = {
  "public.plain-text": "Hello, world!",
  "public.url": "https://example.com"
}
```

***

## 属性（Properties）

### `hasStrings: Promise<boolean>`

判断粘贴板中是否包含文本内容。

**示例**

```ts
if (await Pasteboard.hasStrings) {
  console.log("粘贴板中包含文本")
}
```

***

### `hasImages: Promise<boolean>`

判断粘贴板中是否包含图片。

**示例**

```ts
if (await Pasteboard.hasImages) {
  console.log("粘贴板中包含图片")
}
```

***

### `hasURLs: Promise<boolean>`

判断粘贴板中是否包含 URL。

**示例**

```ts
if (await Pasteboard.hasURLs) {
  console.log("粘贴板中包含 URL 链接")
}
```

***

### `numberOfItems: Promise<number>`

获取当前粘贴板中项目的数量。

**示例**

```ts
const count = await Pasteboard.numberOfItems
console.log(`共有 ${count} 个粘贴板项目`)
```

***

### `changeCount: Promise<number>`

获取自系统启动以来粘贴板内容变化的次数。
每当粘贴板内容发生变化（新增、修改或清空），该计数都会增加。
可用于检测粘贴板是否有更新。

**示例**

```ts
const changeCount = await Pasteboard.changeCount
console.log("粘贴板变化次数：", changeCount)
```

***

## 文本操作

### `getString(): Promise<string | null>`

获取粘贴板中第一个项目的文本字符串。

**示例**

```ts
const text = await Pasteboard.getString()
if (text) console.log("读取到文本：", text)
```

***

### `setString(string: string | null): Promise<void>`

设置粘贴板中第一个项目的文本字符串。

**示例**

```ts
await Pasteboard.setString("Scripting is powerful!")
```

***

### `getStrings(): Promise<string[] | null>`

获取粘贴板中所有项目的文本数组。

**示例**

```ts
const texts = await Pasteboard.getStrings()
console.log(texts)
```

***

### `setStrings(strings: string[] | null): Promise<void>`

设置多个文本字符串到粘贴板。

**示例**

```ts
await Pasteboard.setStrings(["Apple", "Banana", "Cherry"])
```

***

## URL 操作

### `getURL(): Promise<string | null>`

获取粘贴板中第一个 URL 字符串。

**示例**

```ts
const url = await Pasteboard.getURL()
if (url) console.log("链接内容：", url)
```

***

### `setURL(url: string | null): Promise<void>`

设置粘贴板中第一个 URL 字符串。

**示例**

```ts
await Pasteboard.setURL("https://example.com")
```

***

### `getURLs(): Promise<string[] | null>`

获取粘贴板中所有 URL 项目。

**示例**

```ts
const urls = await Pasteboard.getURLs()
console.log(urls)
```

***

### `setURLs(urls: string[] | null): Promise<void>`

设置多个 URL 项目到粘贴板。

**示例**

```ts
await Pasteboard.setURLs([
  "https://apple.com",
  "https://openai.com"
])
```

***

## 图片操作

### `getImage(): Promise<UIImage | null>`

获取粘贴板中第一个图片对象。

**示例**

```ts
const img = await Pasteboard.getImage()
if (img) console.log("读取到图片")
```

***

### `setImage(image: UIImage | null): Promise<void>`

设置粘贴板中第一个图片对象。

**示例**

```ts
await Pasteboard.setImage(myImage)
```

***

### `getImages(): Promise<UIImage[] | null>`

获取粘贴板中所有图片对象。

**示例**

```ts
const images = await Pasteboard.getImages()
console.log(`共读取到 ${images?.length ?? 0} 张图片`)
```

***

### `setImages(images: UIImage[] | null): Promise<void>`

设置多个图片对象到粘贴板。

**示例**

```ts
await Pasteboard.setImages([img1, img2])
```

***

## 粘贴板项目操作

### `addItems(items: Item[]): Promise<void>`

向当前粘贴板追加新项目（不会清除已有内容）。

**示例**

```ts
await Pasteboard.addItems([
  { "public.plain-text": "First" },
  { "public.url": "https://example.com" }
])
```

***

### `setItems(items: Item[], options?: { localOnly?: boolean, expirationDate?: Date }): Promise<void>`

设置粘贴板内容为指定项目，并支持隐私控制选项。

**参数**

- `items`：粘贴板项目数组。
- `options.localOnly`：若为 `true`，不会通过 Handoff 同步到其他设备。
- `options.expirationDate`：设置过期时间，系统会在该时间后自动清除内容。

**示例**

```ts
await Pasteboard.setItems(
  [
    { "public.plain-text": "Sensitive Info" }
  ],
  {
    localOnly: true,
    expirationDate: new Date(Date.now() + 60 * 1000) // 1分钟后过期
  }
)
```

***

### `getItems(): Promise<Item[] | null>`

获取粘贴板中所有项目，每个项目为一个 `Pasteboard.Item` 对象。

**示例**

```ts
const items = await Pasteboard.getItems()
console.log(items)
```

***

## 事件回调（Callbacks）

### `onChanged: ((addedKeys: string[]) => void) | null | undefined`

当粘贴板内容发生变化时触发。
参数 `addedKeys` 为一个字符串数组，包含本次**新增的表示类型**（`UTType`）。

**示例**

```ts
Pasteboard.onChanged = addedKeys => {
  console.log("粘贴板新增内容类型：", addedKeys)
}
```

***

### `onRemoved: ((removedKeys: string[]) => void) | null | undefined`

当粘贴板内容被移除时触发。
参数 `removedKeys` 为一个字符串数组，包含被移除的表示类型（`UTType`）。

**示例**

```ts
Pasteboard.onRemoved = removedKeys => {
  console.log("粘贴板移除的类型：", removedKeys)
}
```

***

## 与旧版 Clipboard API 的区别

旧的 `Clipboard` 命名空间现已**弃用**，仅保留最基本的兼容接口：

- `Clipboard.copyText(text: string)` → 请改用 `Pasteboard.setString()`
- `Clipboard.getText()` → 请改用 `Pasteboard.getString()`
