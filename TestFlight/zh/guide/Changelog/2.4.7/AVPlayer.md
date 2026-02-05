# 音视频播放器

`AVPlayer` 用于播放音频或视频资源，支持播放控制、速率控制、循环播放、播放状态监听以及媒体元数据读取等能力。

你可以通过 `setSource()` 设置媒体源（本地文件或远程 URL），然后使用 `play()` 开始播放。

***

## 入门指南

```ts
const player = new AVPlayer()

if (player.setSource("https://example.com/audio.mp3")) {
  player.onReadyToPlay = () => {
    player.play()
  }

  player.onEnded = () => {
    console.log("播放完成")
  }
} else {
  console.error("设置媒体源失败")
}
```

***

## API 参考

### 属性

#### `volume: number`

控制播放音量，取值范围为 `0.0`（静音）到 `1.0`（最大音量）。

```ts
player.volume = 0.5
```

***

#### `duration: DurationInSeconds`

媒体的总时长（秒）。
在媒体尚未加载完成前，该值为 `0`。

```ts
console.log(player.duration)
```

***

#### `currentTime: DurationInSeconds`

当前播放时间（秒）。
可通过设置该值来跳转播放位置。

```ts
player.currentTime = 30
```

***

#### `rate: number`

当前实际播放速率。

- `1.0` 表示正常速度
- 小于 `1.0` 表示慢速播放
- 大于 `1.0` 表示快速播放

```ts
player.rate = 1.25
```

***

#### `defaultRate: number`

默认播放速率，用于**开始播放时**的速率选择。

- 当调用 `play()` 且未传入 `atRate` 参数时，会使用 `defaultRate`
- 修改 `defaultRate` **不会立即影响当前正在播放的速率**
- 常用于控制「下次开始播放」时的速率

```ts
player.defaultRate = 1.5
```

典型使用场景：

- 用户在播放前选择了一个“默认倍速”
- 下次调用 `play()` 时自动使用该倍速

***

#### `timeControlStatus: TimeControlStatus`

指示播放器当前的播放状态：

- `paused`
  播放器已暂停或尚未开始播放
- `waitingToPlayAtSpecifiedRate`
  等待满足播放条件（例如网络缓冲）
- `playing`
  正在播放

***

#### `numberOfLoops: number`

设置循环播放次数：

- `0`：不循环
- 正整数：循环指定次数
- 负数：无限循环

```ts
player.numberOfLoops = -1
```

***

### 方法

#### `setSource(filePathOrURL: string): boolean`

设置媒体播放源，支持：

- 本地文件路径
- 远程 URL

返回值：

- `true`：设置成功
- `false`：设置失败

***

#### `play(atRate?: number): boolean`

开始播放当前媒体。

- 若传入 `atRate`，则以该速率开始播放
- 若未传入 `atRate`，则使用 `defaultRate`
- 播放过程中可通过修改 `rate` 动态调整速率

```ts
player.play()        // 使用 defaultRate
player.play(1.25)    // 以 1.25 倍速开始播放
```

返回值：

- `true`：成功开始播放
- `false`：播放失败

***

#### `pause()`

暂停当前播放。

***

#### `stop()`

停止播放，并将播放位置重置到起始位置。

***

#### `dispose()`

释放播放器占用的所有资源，并移除内部观察者。
当播放器不再使用时必须调用，以避免资源泄露。

***

#### `loadMetadata(): Promise<AVMetadataItem[] | null>`

加载当前媒体的完整元数据。

返回：

- `AVMetadataItem[]`
- 若未设置媒体源或无元数据，则返回 `null`

```ts
const metadata = await player.loadMetadata()
```

***

#### `loadCommonMetadata(): Promise<AVMetadataItem[] | null>`

加载当前媒体的通用元数据（Common Metadata）。

这些元数据提供跨格式统一的 `commonKey`，常用于获取标题、艺术家、专辑等信息。

```ts
const common = await player.loadCommonMetadata()
```

***

### 回调事件

#### `onReadyToPlay?: () => void`

当媒体已准备好并可开始播放时触发。

***

#### `onTimeControlStatusChanged?: (status: TimeControlStatus) => void`

当播放状态发生变化时触发，例如：

- 等待缓冲 → 播放中
- 播放中 → 暂停

***

#### `onEnded?: () => void`

当媒体播放完成时触发。

***

#### `onError?: (message: string) => void`

播放过程中发生错误时触发，参数为错误描述信息。

***

## 音频会话说明

`AVPlayer` 依赖系统的共享音频会话。
在播放前应正确配置并激活音频会话。

```ts
await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)
```

处理中断（如来电）：

```ts
SharedAudioSession.addInterruptionListener(type => {
  if (type === 'began') {
    player.pause()
  } else if (type === 'ended') {
    player.play()
  }
})
```

***

## 常见用法示例

### 使用默认倍速播放

```ts
player.defaultRate = 1.5
player.play()
```

***

### 临时指定倍速播放

```ts
player.play(2.0)
```

***

### 循环播放

```ts
player.numberOfLoops = 3
player.play()
```

***

### 读取通用元数据

```ts
const metadata = await player.loadCommonMetadata()
if (metadata) {
  const title = metadata.find(i => i.commonKey === 'title')
  console.log(await title?.stringValue)
}
```

***

## 最佳实践

1. **区分 defaultRate 与 rate**

   - `defaultRate` 用于“开始播放时”
   - `rate` 用于“当前播放过程中”

2. **始终释放资源**

   - 播放结束或不再使用时调用 `dispose()`

3. **处理播放状态**

   - 使用 `onTimeControlStatusChanged` 更新 UI（加载中 / 播放中）

4. **播放前配置音频会话**

   - 避免后台、静音或混音行为不符合预期

5. **元数据读取时机**

   - 在 `onReadyToPlay` 之后读取元数据更稳定

***

## 完整示例

```ts
const player = new AVPlayer()

await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)

player.defaultRate = 1.25

if (player.setSource("https://example.com/audio.mp3")) {
  player.onReadyToPlay = () => {
    player.play()
  }

  player.onEnded = () => {
    console.log("播放完成")
    player.dispose()
  }

  player.onError = message => {
    console.error("播放错误：", message)
    player.dispose()
  }

  const metadata = await player.loadCommonMetadata()
  if (metadata) {
    const title = metadata.find(i => i.commonKey === 'title')
    console.log("标题：", await title?.stringValue)
  }
}
```
