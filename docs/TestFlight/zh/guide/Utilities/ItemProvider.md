---
title: ItemProvider
description: 该类表示一个延迟数据提供者。

---

`ItemProvider` 用于表示一个**可按需加载的数据提供者**，常见于拖放、文件导入、Photos 选择等场景。
它并不直接包含数据本身，而是描述**可以如何、安全地获取数据**。

`ItemProvider` 支持加载对象、文本、URL、原始数据以及文件路径，并对文件访问施加了明确的安全访问边界。

---

## 核心概念

* `ItemProvider` 描述的是能力，而不是数据
* 所有加载行为都必须遵循系统的安全作用域规则
* 文件类资源只能在受控的回调作用域内访问
* 是否支持原地访问（in-place）由底层系统决定

---

## 属性

### registeredTypes

```ts
readonly registeredTypes: UTType[]
```

表示该 `ItemProvider` 在语义上可以提供的所有类型。

* 包含直接类型以及可推导的父类型
* 用于判断内容大类或调试用途
* 不保证一定存在对应的底层文件表示

---

### registeredInPlaceTypes

```ts
readonly registeredInPlaceTypes: UTType[]
```

表示该 `ItemProvider` 支持原地访问（open-in-place）的类型集合。

* 常见于视频、音频、文档等大文件
* 是否真正原地访问需以加载结果为准

---

## 能力判断方法

### hasItemConforming

```ts
hasItemConforming(type: UTType): boolean
```

判断内容在语义上是否符合指定类型。

* 判断宽松
* 会考虑 UTType 的继承关系
* 适合用于业务分支判断

---

### hasRepresentationConforming

```ts
hasRepresentationConforming(type: UTType): boolean
```

判断是否存在一个真实的、可加载的底层表示符合指定类型。

* 判断严格
* 适合用于文件处理或精确格式要求的场景

---

### hasInPlaceRepresentationConforming

```ts
hasInPlaceRepresentationConforming(type: UTType): boolean
```

判断是否存在支持原地访问的底层表示。

* 常用于大文件加载策略选择

---

## 对象加载能力判断

### canLoadUIImage

```ts
canLoadUIImage(): boolean
```

判断是否可以加载为 `UIImage` 对象。

* 适合 UI 展示
* 不保证原始文件格式或元数据

---

### canLoadLivePhoto

```ts
canLoadLivePhoto(): boolean
```

判断是否可以加载为 `LivePhoto` 对象。

* 用于区分静态图片与 Live Photo
* 返回 `true` 时可调用 `loadLivePhoto`

---

## 加载方法

### loadUIImage

```ts
loadUIImage(): Promise<UIImage | null>
```

加载一个 `UIImage` 对象。

* 适合轻量展示
* 不适合用于文件级处理或资源保真

---

### loadLivePhoto

```ts
loadLivePhoto(): Promise<LivePhoto | null>
```

加载一个 `LivePhoto` 对象。

* 包含图片与配对视频
* 适合展示、保存或进一步处理

---

### loadURL

```ts
loadURL(): Promise<string | null>
```

加载一个 URL 字符串。

* 可能是网页 URL
* 也可能是文件 URL

---

### loadText

```ts
loadText(): Promise<string | null>
```

加载纯文本内容。

* 支持 plain text
* 富文本会被降级为纯文本

---

### loadData

```ts
loadData(type: UTType): Promise<Data | null>
```

加载指定类型的原始二进制数据。

* 数据会整体加载进内存
* 适合 JSON、配置文件、小体积资源
* 不适合视频、音频等大文件

---

## 文件路径加载（安全作用域）

文件路径的加载需要遵循系统的安全限制，所有文件访问都必须在指定的回调作用域内完成。

---

### loadFilePath

```ts
loadFilePath(type: UTType): Promise<string | null>
```

加载指定类型的文件路径，如果文件不存在或无法加载，返回 `null`。如果可以加载，文件会被复制到应用组的临时目录中，并返回文件路径。
如果你不再需要文件，请删除它。

示例：

```ts
const filePath = provider.loadFilePath("public.movie")
```

---

## 创建 ItemProvider

### fromUIImage

```ts
ItemProvider.fromUIImage(image: UIImage): ItemProvider
```

从 `UIImage` 创建 `ItemProvider`。

* 仅提供静态图片能力
* 不包含 Live Photo 或原始资源信息

---

### fromText

```ts
ItemProvider.fromText(text: string): ItemProvider
```

从文本创建 `ItemProvider`。

---

### fromURL

```ts
ItemProvider.fromURL(url: string): ItemProvider | null
```

从 URL 字符串创建 `ItemProvider`。

* URL 不合法时返回 `null`
* 支持网页 URL 与文件 URL

---

### fromFilePath

```ts
ItemProvider.fromFilePath(path: string): ItemProvider
```

从文件路径创建 `ItemProvider`。

* 保留原始文件
* 适合视频、音频、文档等资源
* 支持原地访问能力判断

---

## 使用建议

* 使用 `hasItemConforming` 进行内容类型判断
* 使用对象加载方法进行 UI 展示
* 使用文件路径加载方法处理大文件
* 文件路径只能在 `perform` 回调作用域内访问
* 不应在回调外部延迟访问安全作用域文件