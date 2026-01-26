# 视频播放器

该视图使用强大的 `AVPlayer` 作为后端，配合简单且可定制的前端 UI，用于播放视频和音频内容。通过这种方式，你可以轻松加载媒体、控制播放、处理事件，甚至添加自定义的覆盖（overlay）界面。

***

## 概述

`VideoPlayer` 依赖一个 `AVPlayer` 实例，你需要预先将媒体加载到 `AVPlayer`，然后就能通过它来控制播放（播放、暂停、停止）并响应各种事件，例如视频准备就绪或播放结束。`overlay` 属性允许你在视频内容之上添加交互式 UI 元素（但位于系统自带的播放控制按钮下方）。

**要点概述**：

- 通过传入的 `AVPlayer` 实例来控制播放。
- 使用 `overlay` 在视频上方添加自定义 UI 元素。
- 监听 `onReadyToPlay`、`onEnded`、`onError` 等事件来响应媒体播放过程中的各种状态。

***

## 基本用法

首先，创建并配置一个 `AVPlayer` 实例：

```tsx
const player = new AVPlayer()

// 设置媒体源：可以是本地文件路径或远程 URL
player.setSource("https://example.com/video.mp4")

// 当媒体准备就绪时开始播放
player.onReadyToPlay = () => {
  console.log("媒体已就绪，开始播放。")
  player.play()
}

// 处理播放状态的变化
player.onTimeControlStatusChanged = (status) => {
  console.log("播放状态改变:", status)
}

// 当播放结束时
player.onEnded = () => {
  console.log("播放结束。")
}

// 处理错误
player.onError = (message) => {
  console.error("播放错误:", message)
}

// 配置播放属性
player.volume = 1.0          // 音量全开
player.rate = 1.0            // 正常播放速度
player.numberOfLoops = 0     // 不循环
```

然后，在你的 UI 中使用 `VideoPlayer` 视图：

```tsx
<VideoPlayer
  player={player}
  overlay={
    <HStack padding>
      <Button title="暂停" action={() => player.pause()} />
      <Button title="播放" action={() => player.play()} />
    </HStack>
  }
/>
```

这样就会在视频上展示你自定义的按钮控件，默认显示在底部左侧。

***

## 使用场景示例

假设你想要一个带有自定义控件并能自动重播的视频：

```tsx
function VideoPlayerView() {
  const player = useMemo(() => new AVPlayer(), [])

  useEffect(() => {
    player.setSource(
      Path.join(
        Script.directory,
        "localvideo.mp4"
      )
    )
    player.onReadyToPlay = () => player.play()
    player.onEnded = () => player.play() // 视频结束后自动重播

    // 设置 shared audio session.
    SharedAudioSession.setActive(true)
    SharedAudioSession.setCategory(
      'playback',
      ['mixWithOthers']
    )

    return () => {
      // 当该视图要被销毁时，释放 AVPlayer 实例
      player.dispose()
    }
  }, [])

  return <VideoPlayer
    player={player}
    overlay={
      <HStack padding>
        <Button title="暂停" action={() => player.pause()} />
        <Button title="继续" action={() => player.play()} />
      </HStack>
    }
    frame={{
      height: 300
    }}
  />
}
```

该示例：

- 在视频准备就绪时立即加载并播放本地文件。
- 视频播放结束后自动重播。
- 在视频底部右侧提供自定义的暂停/继续按钮作为叠加控件（overlay）。

***

## 总结

`VideoPlayer` 组件在 `AVPlayer` 实例的支持下，为你的应用带来细致入微的视频播放控制。无论是调整音量、播放速度、处理缓冲状态或错误，亦或是在视频之上叠加自定义 UI 控件，`VideoPlayer` 组件和 `AVPlayer` 类都能为你提供丰富且交互性强的多媒体体验。
