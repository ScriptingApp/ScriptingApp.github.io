---
title: AVMetadataItem

---

`AVMetadataItem` 类用于表示媒体文件（如音频或视频）中的单个元数据条目。
此类通常通过 `AVPlayer.loadMetadata()` 或 `AVPlayer.loadCommonMetadata()` 方法返回，用于访问媒体文件中嵌入的标准或自定义元数据信息。

元数据项可以包含标题、艺术家、专辑、封面图片、编码信息、语言标签等。
每个 `AVMetadataItem` 实例都表示一个独立的键值对，并且提供多种类型化访问方式。

---

## 类定义

### `class AVMetadataItem`

---

### **属性（Properties）**

#### `key: string`

元数据项的键（Key）。
该值通常与具体的媒体格式相关（例如 ID3、QuickTime、iTunes 等）。

**示例**

```ts
console.log(item.key) // 例如： "id3/TIT2"
```

---

#### `commonKey?: string`

元数据项的**通用键**。
此属性表示与 `key` 对应的“通用命名空间”键，用于跨格式访问常用元数据。
即使底层媒体格式不同，你仍然可以通过 `commonKey` 访问相同意义的字段。

**示例**

```ts
console.log(item.commonKey) // 例如： "title"
```

---

#### `identifier?: string`

元数据项的唯一标识符（Identifier）。
可用于区分相同类型的多个元数据条目。

---

#### `extendedLanguageTag?: string`

元数据项使用的语言扩展标签（如 `"en-US"` 或 `"zh-Hans"`）。
如果元数据内容与语言相关，则该值指示其语言环境。

---

#### `locale?: string`

表示与该元数据关联的地区或本地化信息。

---

#### `time?: number`

元数据项在媒体中的时间戳（以秒为单位）。
适用于时间相关的元数据，如字幕或歌词。

**示例**

```ts
console.log(item.time) // 输出例如：12.53
```

---

#### `duration?: number`

元数据项的持续时间（以秒为单位）。
例如某些可视化元数据（如图片、歌词）具有有效时长。

---

#### `startDate?: Date`

元数据项的起始时间（如果存在）。
若该项没有具体日期信息，则返回 `null`。

---

#### `dataType?: string`

元数据项值的数据类型（如 `"com.apple.metadata.datatype.UTF-8"`, `"public.jpeg"` 等）。

该属性可用于判断 `value` 的原始数据类型。

---

#### `extraAttributes: Promise<Record<string, any> | null>`

额外属性，包含特定元数据容器或键空间的附加信息。
例如 ID3 标签中 `"APIC"` 帧（封面图片）可能包含描述性文本、图片类型等额外属性。

**示例**

```ts
const extras = await item.extraAttributes
console.log(extras)
// 可能输出： { description: "Cover (front)", pictureType: 3 }
```

---

#### `dataValue: Promise<Data | null>`

将元数据项的值以 `Data` 类型返回。
适用于二进制内容（如封面图片、嵌入数据等）。

**示例**

```ts
const imageData = await item.dataValue
if (imageData) {
  const image = UIImage.fromData(imageData)
  // 使用 image
}
```

---

#### `stringValue: Promise<string | null>`

将元数据项的值以 `string` 类型返回。
常用于文本元数据（标题、艺术家、专辑等）。

**示例**

```ts
const title = await item.stringValue
console.log("标题：", title)
```

---

#### `numberValue: Promise<number | null>`

将元数据项的值以数字形式返回。
适用于数值型元数据（如比特率、采样率、音量等）。

**示例**

```ts
const bitrate = await item.numberValue
console.log("比特率：", bitrate)
```

---

#### `dateValue: Promise<Date | null>`

将元数据项的值以 `Date` 类型返回。
适用于时间相关的元数据（如录制日期、发布日期等）。

**示例**

```ts
const date = await item.dateValue
console.log("发布日期：", date?.toISOString())
```

---

## 使用示例

```ts
const metadata = await player.loadMetadata()
for (const item of metadata) {
  const key = item.commonKey ?? item.key
  const value = await item.stringValue ?? await item.numberValue
  console.log(`${key}: ${value}`)
}
```

**说明：**

* 若 `commonKey` 存在，建议优先使用，以保持跨格式一致性。
* 异步属性（如 `stringValue`、`dataValue`、`extraAttributes`）都以 Promise 形式提供，便于按需加载。
* 可结合 `AVPlayer.loadCommonMetadata()` 获取标准化元数据（如标题、专辑、艺术家、封面等）。

---

## 常见用途

| 用途   | 示例字段 (`commonKey`) | 说明              |
| ---- | ------------------ | --------------- |
| 标题   | `"title"`          | 媒体文件标题          |
| 艺术家  | `"artist"`         | 表演者或作者          |
| 专辑   | `"albumName"`      | 专辑名称            |
| 封面图片 | `"artwork"`        | 通常为 JPEG/PNG 数据 |
| 编码信息 | `"encoder"`        | 媒体编码器或软件        |
| 录制时间 | `"creationDate"`   | 录制或生成时间         |
