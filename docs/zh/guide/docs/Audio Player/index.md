---
title: 音频播放器
---
`AVPlayer` API 提供了播放音频或视频的功能，并支持各种自定义选项。以下是如何有效使用此 API 的详细指南，以及最佳实践和潜在问题的注意事项。

---

## 入门指南

要使用 `AVPlayer`，需要创建一个实例，并通过 `setSource()` 设置媒体源。配置播放选项（如 `volume` 或 `rate`），并使用 `play()` 开始播放。

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

- **`volume`**: `number`
    - 控制播放音量，范围为 `0.0`（静音）到 `1.0`（最大音量）。
    - 示例：
      ```typescript
      player.volume = 0.5 // 设置为 50% 音量
      ```

- **`duration`**: `DurationInSeconds`
    - 媒体的总时长。在媒体准备好之前为 `0`。
    - 示例：
      ```typescript
      console.log(`媒体时长：${player.duration} 秒`)
      ```

- **`currentTime`**: `DurationInSeconds`
    - 当前播放位置。可以设置以跳转到指定时间。
    - 示例：
      ```typescript
      player.currentTime = 30 // 跳转到 30 秒
      ```

- **`rate`**: `number`
    - 控制播放速度。`1.0` 为正常速度，较高值会加速播放。
    - 示例：
      ```typescript
      player.rate = 1.5 // 以 1.5 倍速播放
      ```

- **`timeControlStatus`**: `TimeControlStatus`
    - 指示播放状态（如播放中、暂停、等待中）。

- **`numberOfLoops`**: `number`
    - 设置媒体循环播放次数。`0` 为不循环，`-1` 为无限循环。
    - 示例：
      ```typescript
      player.numberOfLoops = -1 // 无限循环播放
      ```

### 方法

- **`setSource(filePathOrURL: string): boolean`**
    - 设置媒体源。支持本地文件路径或远程 URL。
    - 返回值：`true` 表示成功。

- **`play(): boolean`**
    - 开始播放。返回 `true` 表示成功。

- **`pause()`**
    - 暂停播放。

- **`stop()`**
    - 停止播放并重置到开头。

- **`dispose()`**
    - 释放所有资源。播放不再需要时必须调用。

### 回调

- **`onReadyToPlay?: () => void`**
    - 媒体准备好播放时调用。

- **`onTimeControlStatusChanged?: (status: TimeControlStatus) => void`**
    - 播放状态更改时调用。

- **`onEnded?: () => void`**
    - 播放结束时调用。

- **`onError?: (message: string) => void`**
    - 出现错误时调用。

---

## 处理音频会话

`AVPlayer` API 依赖系统的共享音频会话。以下是关键注意事项：

1. **音频会话中断**
    - 使用 `SharedAudioSession.addInterruptionListener` 注册中断监听器，处理来电等中断事件。
    - 示例：
      ```typescript
      SharedAudioSession.addInterruptionListener((type) => {
          if (type === 'began') {
              player.pause()
          } else if (type === 'ended') {
              player.play()
          }
      })
      ```

2. **类别和选项**
    - 根据用例设置适当的音频会话类别和选项。
    - 示例：
      ```typescript
      await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
      ```

3. **激活**
    - 播放之前激活音频会话。
    - 示例：
      ```typescript
      await SharedAudioSession.setActive(true)
      ```

---

## 常见用例

### 播放远程音频

```typescript
player.setSource("https://example.com/audio.mp3")
player.onReadyToPlay = () => {
    player.play()
}
```

### 播放本地音频

```typescript
player.setSource("/path/to/local/audio.mp3")
player.play()
```

### 处理播放事件

```typescript
player.onEnded = () => {
    console.log("播放完成。")
}
player.onError = (message) => {
    console.error("播放错误：", message)
}
```

### 循环播放

```typescript
player.numberOfLoops = 3 // 循环播放 3 次
player.play()
```

---

## 最佳实践

1. **资源管理**
    - 播放器不再需要时，始终调用 `dispose()` 释放资源。

2. **错误处理**
    - 实现 `onError` 以处理播放问题，例如网络失败。

3. **音频会话配置**
    - 根据应用行为正确配置音频会话类别和选项。

4. **中断管理**
    - 使用中断监听器优雅地暂停和恢复播放。

5. **优化用户体验**
    - 使用 `onReadyToPlay` 和 `onTimeControlStatusChanged` 回调提供加载和播放状态的 UI 反馈。

---

## 完整示例

以下是展示如何使用 `AVPlayer` API 的完整示例：

```typescript
// 创建 AVPlayer 实例
const player = new AVPlayer()

// 配置音频会话
await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)

// 设置媒体源
if (player.setSource("https://example.com/audio.mp3")) {
    // 注册事件
    player.onReadyToPlay = () => {
        console.log("媒体已准备好播放")
        player.play()
    }

    player.onEnded = () => {
        console.log("播放完成")
        player.dispose()
    }

    player.onError = (message) => {
        console.error("播放错误：", message)
        player.dispose()
    }
} else {
    console.error("设置媒体源失败")
}

// 处理中断
SharedAudioSession.addInterruptionListener((type) => {
    if (type === 'began') {
        player.pause()
    } else if (type === 'ended') {
        player.play()
    }
})
```