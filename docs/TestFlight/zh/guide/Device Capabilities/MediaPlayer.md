---
title: 媒体播放器
description: 该接口允许与 Now Playing Center 交互，管理 Now Playing Info，并响应远程控制事件。

---

`MediaPlayer` API 允许与 **Now Playing Center** 交互，管理 **Now Playing Info**，并响应远程控制事件。以下是使用指南、最佳实践及示例。

---

## 入门指南

`MediaPlayer` API 提供对媒体播放信息的控制及远程命令处理。入门步骤如下：

1. 设置 `nowPlayingInfo`，用于显示当前媒体信息。
2. 使用 `setAvailableCommands()` 配置可用的命令。
3. 注册 `commandHandler`，以响应远程事件。

```typescript
MediaPlayer.nowPlayingInfo = {
  title: "歌曲标题",
  artist: "艺术家",
  playbackRate: 1.0,
  elapsedPlaybackTime: 30,
  playbackDuration: 240
}

MediaPlayer.setAvailableCommands(["play", "pause", "nextTrack", "previousTrack"])

MediaPlayer.commandHandler = (command, event) => {
  console.log(`收到命令: ${command}`)
}
```

---

## API 参考

### `nowPlayingInfo`

`nowPlayingInfo` 对象显示当前播放媒体的元数据。将其设置为 `null` 可清除 Now Playing Info Center。

**属性：**

- **`title`**: `string` （必需）  
  媒体标题。
- **`artist`**: `string` （可选）  
  媒体艺术家或表演者。
- **`albumTitle`**: `string` （可选）  
  专辑标题。
- **`artwork`**: `UIImage` （可选）  
  媒体封面图片。
- **`mediaType`**: `MediaType` （可选）  
  默认值为 `audio`。
- **`playbackRate`**: `number` （可选）  
  当前播放速度，默认为 `0`。
- **`elapsedPlaybackTime`**: `DurationInSeconds` （可选）  
  当前播放时间，默认为 `0`。
- **`playbackDuration`**: `DurationInSeconds` （可选）  
  媒体总时长，默认为 `0`。

---

### 播放状态

`playbackState` 属性指示应用的当前播放状态：

- **`unknown`**: 默认状态，播放状态未定义。
- **`playing`**: 正在播放。
- **`paused`**: 播放已暂停。
- **`stopped`**: 播放已停止。
- **`interrupted`**: 播放被外部事件中断。

```typescript
if (MediaPlayer.playbackState === MediaPlayerPlaybackState.playing) {
    console.log("媒体正在播放")
}
```

---

### 命令与事件处理

#### `setAvailableCommands(commands: MediaPlayerRemoteCommand[])`

指定用户可交互的远程命令。

**示例：**
```typescript
MediaPlayer.setAvailableCommands(["play", "pause", "stop", "nextTrack"])
```

#### `commandHandler`

回调函数，用于处理远程命令。注册此函数以处理命令（如 `play`、`pause` 或 `seekBackward`）。

**示例：**
```typescript
MediaPlayer.commandHandler = (command, event) => {
  switch (command) {
    case "play":
      console.log("收到播放命令")
      break
    case "pause":
      console.log("收到暂停命令")
      break
    default:
      console.log(`未处理的命令: ${command}`)
  }
}
```

**支持的命令：**
- `play`、`pause`、`stop`、`nextTrack`、`previousTrack`
- `seekBackward`、`seekForward`、`skipBackward`、`skipForward`
- `rating`、`like`、`dislike`、`bookmark`
- `changeRepeatMode`、`changeShuffleMode`
- `enableLanguageOption`、`disableLanguageOption`

---

## 常见用例

### 显示 Now Playing 信息

```typescript
MediaPlayer.nowPlayingInfo = {
  title: "播客集数",
  artist: "主持人",
  elapsedPlaybackTime: 120,
  playbackDuration: 1800,
  playbackRate: 1.0
}
```

### 响应播放命令

```typescript
MediaPlayer.setAvailableCommands(["play", "pause", "stop"])

MediaPlayer.commandHandler = (command, event) => {
  if (command === "play") {
    console.log("开始播放")
  } else if (command === "pause") {
    console.log("暂停播放")
  }
}
```

### 处理自定义事件

```typescript
MediaPlayer.commandHandler = (command, event) => {
  if (command === "seekForward") {
    const seekEvent = event as MediaPlayerSeekCommandEvent
    console.log(`Seek 事件类型: ${seekEvent.type}`)
  }
}
```

---

## 最佳实践

1. **保持元数据最新**：在播放状态变化时更新 `nowPlayingInfo`。
2. **处理所有相关命令**：确保支持用户交互（如跳转或快进）。
3. **资源管理**：播放停止时清除 `nowPlayingInfo`，避免显示过期信息。
4. **使用外部设备测试**：通过耳机或车载系统验证命令处理。
5. **提供用户反馈**：在命令响应中提示成功或失败。

---

## 完整示例

以下是 `MediaPlayer` 的完整实现：

```typescript
// 设置 Now Playing 信息
MediaPlayer.nowPlayingInfo = {
  title: "歌曲标题",
  artist: "艺术家",
  albumTitle: "专辑名称",
  playbackRate: 1.0,
  elapsedPlaybackTime: 0,
  playbackDuration: 300
}

// 启用命令
MediaPlayer.setAvailableCommands(["play", "pause", "nextTrack", "previousTrack", "seekForward", "seekBackward"])

// 处理命令
MediaPlayer.commandHandler = (command, event) => {
  switch (command) {
    case "play":
      console.log("开始播放")
      break
    case "pause":
      console.log("暂停播放")
      break
    case "nextTrack":
      console.log("跳到下一曲")
      break
    case "seekForward":
      const seekEvent = event as MediaPlayerSeekCommandEvent
      console.log(`Seek 事件: ${seekEvent.type}`)
      break
    default:
      console.log(`未处理的命令: ${command}`)
  }
}
```