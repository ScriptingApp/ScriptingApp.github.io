---
title: 音频播放器

---

`AVPlayer` 提供播放音频或视频的能力，并支持播放控制、循环播放、回调事件和元数据读取等功能。你可以通过 `setSource()` 设置媒体源（本地文件或远程 URL），然后使用 `play()` 开始播放。

---

## 入门指南

以下示例展示了 `AVPlayer` 的基本用法：

```typescript
const player = new AVPlayer()

// 设置媒体源（本地文件或远程 URL）
if (player.setSource("https://example.com/audio.mp3")) {
    player.onReadyToPlay = () => {
        player.play()
    }
    player.onEnded = () => {
        console.log("播放完成。")
    }
} else {
    console.error("设置媒体源失败。")
}
```

---

## API 参考

### 属性

#### `volume: number`

控制播放音量，范围为 `0.0`（静音）到 `1.0`（最大音量）。

```typescript
player.volume = 0.5 // 设置为 50% 音量
```

---

#### `duration: DurationInSeconds`

媒体总时长（单位：秒）。在媒体加载完成前，该值为 `0`。

```typescript
console.log(`媒体时长：${player.duration} 秒`)
```

---

#### `currentTime: DurationInSeconds`

当前播放时间（单位：秒）。可通过设置该值跳转播放位置。

```typescript
player.currentTime = 30 // 跳转到第 30 秒
```

---

#### `rate: number`

控制播放速率。`1.0` 为正常速度，值小于 `1.0` 为减速播放，大于 `1.0` 为加速播放。

```typescript
player.rate = 1.5 // 以 1.5 倍速播放
```

---

#### `timeControlStatus: TimeControlStatus`

指示播放状态。可取值：

* `paused`: 暂停中
* `waitingToPlayAtSpecifiedRate`: 正在等待可播放状态（如网络缓冲）
* `playing`: 正在播放

---

#### `numberOfLoops: number`

设置循环播放次数。

* `0`：不循环
* 正数：指定循环次数
* 负数：无限循环

```typescript
player.numberOfLoops = -1 // 无限循环播放
```

---

### 方法

#### `setSource(filePathOrURL: string): boolean`

设置播放源，可以是本地文件路径或远程 URL。

返回：

* `true`: 设置成功
* `false`: 设置失败

---

#### `play(): boolean`

开始播放媒体。

返回：

* `true`: 成功开始播放
* `false`: 失败

---

#### `pause()`

暂停播放。

---

#### `stop()`

停止播放并重置到起始位置。

---

#### `dispose()`

释放播放器资源、移除观察者。
应在播放器不再使用时调用以避免资源泄露。

---

#### `loadMetadata(): Promise<AVMetadataItem[] | null>`

加载当前媒体的完整元数据。

返回：

* 一个包含 `AVMetadataItem` 对象的数组
* 若媒体未加载或无元数据，则返回 `null`

示例：

```typescript
const metadata = await player.loadMetadata()
if (metadata) {
  for (const item of metadata) {
    console.log(item.key, await item.stringValue)
  }
}
```

---

#### `loadCommonMetadata(): Promise<AVMetadataItem[] | null>`

加载当前媒体的通用元数据（common metadata），这些元数据的 `commonKey` 属性提供跨格式可识别的键名。

示例：

```typescript
const commonMetadata = await player.loadCommonMetadata()
if (commonMetadata) {
  const titleItem = commonMetadata.find(i => i.commonKey === "title")
  console.log("标题：", await titleItem?.stringValue)
}
```

---

### 回调事件

#### `onReadyToPlay?: () => void`

媒体准备就绪、可播放时触发。

---

#### `onTimeControlStatusChanged?: (status: TimeControlStatus) => void`

播放状态变更时触发，例如从“等待中”到“播放中”。

---

#### `onEnded?: () => void`

媒体播放完成时触发。

---

#### `onError?: (message: string) => void`

播放过程中发生错误时触发，参数为错误信息。

---

## 使用音频会话

`AVPlayer` 依赖系统的共享音频会话。你可以通过 `SharedAudioSession` 进行配置，以确保播放行为符合预期。

```typescript
await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)
```

处理系统中断（如电话）：

```typescript
SharedAudioSession.addInterruptionListener((type) => {
  if (type === 'began') player.pause()
  else if (type === 'ended') player.play()
})
```

---

## 常见用例

### 播放远程音频

```typescript
player.setSource("https://example.com/audio.mp3")
player.onReadyToPlay = () => player.play()
```

---

### 播放本地文件

```typescript
player.setSource("/path/to/audio.mp3")
player.play()
```

---

### 循环播放

```typescript
player.numberOfLoops = 3 // 循环播放 3 次
player.play()
```

---

### 获取元数据

```typescript
const metadata = await player.loadCommonMetadata()
if (metadata) {
  const artist = metadata.find(i => i.commonKey === "artist")
  console.log("演唱者：", await artist?.stringValue)
}
```

---

## 最佳实践

1. **资源管理**
   使用完毕后务必调用 `dispose()` 释放资源。

2. **错误处理**
   实现 `onError` 回调，优雅地处理播放错误。

3. **中断管理**
   通过音频会话监听中断事件，自动暂停或恢复播放。

4. **UI 状态更新**
   使用 `onTimeControlStatusChanged` 更新播放状态显示。

5. **元数据使用**
   通过 `loadCommonMetadata()` 获取通用信息，如标题、艺术家、封面等，用于显示在 UI 上。

---

## 完整示例

```typescript
const player = new AVPlayer()

await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)

if (player.setSource("https://example.com/audio.mp3")) {
  player.onReadyToPlay = () => player.play()
  player.onEnded = () => {
    console.log("播放完成")
    player.dispose()
  }
  player.onError = (message) => {
    console.error("播放错误：", message)
    player.dispose()
  }

  // 读取元数据
  const commonMetadata = await player.loadCommonMetadata()
  if (commonMetadata) {
    const titleItem = commonMetadata.find(i => i.commonKey === "title")
    console.log("标题：", await titleItem?.stringValue)
  }
} else {
  console.error("设置媒体源失败")
}
```
