---
title: 视频播放组件(AVPlayerView)

---

`AVPlayerView` 是 Scripting 提供的视频播放组件，基于系统原生 `AVPlayerViewController` 封装。
与 `VideoPlayer` 不同，`AVPlayerView` **完整支持系统级 Picture in Picture（画中画，PiP）**，并允许脚本层监听 PiP 的生命周期变化。

该组件适用于对**原生播放行为、后台播放、PiP、锁屏与控制中心联动**有明确需求的媒体类场景。

---

## 一、何时使用 AVPlayerView

当你的场景满足以下任意条件时，应使用 `AVPlayerView`：

* 需要视频进入系统 PiP 模式
* 需要原生播放控制 UI
* 需要在后台持续播放视频
* 需要与系统 Now Playing / 锁屏 / 控制中心联动
* 需要精确感知 PiP 的开始与结束

如果仅做简单的视频展示且不需要 PiP，`VideoPlayer` 仍然是更轻量的选择。

---

## 二、核心属性详解

### 1. `player`

```ts
player: AVPlayer
```

* 实际执行播放的核心对象
* 由开发者自行创建和管理
* 支持网络视频、本地文件、HLS 等格式

`AVPlayerView` **不会管理播放器的生命周期**，播放器在 PiP 期间必须保持存活。

---

### 2. `pipStatus`

```ts
pipStatus: Observable<PIPStatus>
```

用于监听系统 PiP 的生命周期状态变化。

可能的取值如下：

| 状态                 | 含义            |
| ------------------ | ------------- |
| `willStart`        | PiP 即将开始      |
| `didStart`         | PiP 已开始       |
| `willStop`         | PiP 即将结束      |
| `didStop`          | PiP 已结束       |
| `undefined / null` | 尚未进入 PiP 生命周期 |

该状态完全由系统控制，**只能监听，不应手动修改**。

---

## 三、PiP 相关配置项

### 1. `allowsPictureInPicturePlayback`

```ts
allowsPictureInPicturePlayback?: boolean
```

* 是否允许视频进入 PiP
* 默认值：`true`

若设为 `false`：

* 系统 PiP 按钮不会显示
* 视频无法进入画中画模式

---

### 2. `canStartPictureInPictureAutomaticallyFromInline`

```ts
canStartPictureInPictureAutomaticallyFromInline?: boolean
```

* 当应用从前台切换到后台时，是否自动进入 PiP
* 默认值：`false`

适合以下场景：

* 用户按下 Home 键离开应用
* 希望播放不中断并自动进入 PiP

---

### 3. `updatesNowPlayingInfoCenter`

```ts
updatesNowPlayingInfoCenter?: boolean
```

* 是否自动更新系统 Now Playing 信息
* 默认值：`true`

开启后，视频信息会显示在：

* 锁屏界面
* 控制中心
* 外接播放设备

---

## 四、全屏播放行为

### 1. `entersFullScreenWhenPlaybackBegins`

```ts
entersFullScreenWhenPlaybackBegins?: boolean
```

* 播放开始时是否自动进入全屏
* 默认值：`false`

---

### 2. `exitsFullScreenWhenPlaybackEnds`

```ts
exitsFullScreenWhenPlaybackEnds?: boolean
```

* 播放结束时是否自动退出全屏
* 默认值：`false`

---

## 五、视频显示方式（videoGravity）

```ts
videoGravity?: AVLayerVideoGravity
```

| 值                  | 行为说明           |
| ------------------ | -------------- |
| `resize`           | 拉伸填满，不保持比例     |
| `resizeAspect`     | 保持比例，完整显示（默认）  |
| `resizeAspectFill` | 保持比例，填满区域，可能裁剪 |

---

## 六、完整 DEMO 示例

以下示例演示了：

* 创建并配置 `AVPlayer`
* 正确配置音频会话
* 监听 PiP 生命周期
* 控制播放 / 暂停
* 正确释放资源

```tsx
function Example() {
  const dismiss = Navigation.useDismiss()
  const [status, setStatus] = useState<TimeControlStatus>(
    TimeControlStatus.paused
  )
  const pipstatus = useObservable<PIPStatus>()

  console.log(pipstatus.value)

  const player = useMemo(() => {
    const player = new AVPlayer()

    player.setSource(
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    )

    player.onTimeControlStatusChanged = status => {
      setStatus(status)
    }

    SharedAudioSession.setActive(true)
    SharedAudioSession.setCategory(
      "playback",
      ["defaultToSpeaker"]
    )

    return player
  }, [])

  useEffect(() => {
    return () => {
      player.dispose()
    }
  }, [])

  return <NavigationStack>
    <VStack
      navigationTitle="VideoPlayer"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        cancellationAction: <Button
          title="Done"
          action={dismiss}
        />
      }}
    >
      <AVPlayerView
        player={player}
        pipStatus={pipstatus}
        canStartPictureInPictureAutomaticallyFromInline
        updatesNowPlayingInfoCenter
        entersFullScreenWhenPlaybackBegins
      />

      <Button
        title={
          status === TimeControlStatus.paused
            ? "Play"
            : "Pause"
        }
        action={() => {
          if (status === TimeControlStatus.paused) {
            player.play()
          } else {
            player.pause()
          }
        }}
      />
    </VStack>
  </NavigationStack>
}
```

---

## 七、PiP 生命周期说明

PiP 状态通常按以下顺序变化：

1. `willStart`
2. `didStart`
3. PiP 运行中
4. `willStop`
5. `didStop`

在异常或系统打断情况下，部分状态可能被跳过，因此应以 `didStart` 和 `didStop` 作为最终判断依据。

---

## 八、重要注意事项

### 1. AVPlayerView 使用的是系统级视频 PiP

* 基于系统原生视频 PiP
* 与 Scripting 的自定义 PiP View Modifiers **完全不同**
* 两种 PiP 机制不可混用

---

### 2. PiP 依赖正确的音频会话配置

要保证 PiP 正常工作，必须：

* 激活音频会话
* 使用 `playback` 类别
* 正确配置后台音频能力

否则可能出现 PiP 无法启动或静默失败的情况。

---

### 3. PiP 期间不要销毁 AVPlayer

* PiP 运行中销毁或替换 `AVPlayer`
* 会导致 PiP 异常退出
* 甚至触发系统错误

应在 `pipStatus` 变为 `didStop` 后再释放播放器资源。

---

## 九、推荐实践总结

* 视频 PiP 场景始终使用 `AVPlayerView`
* 将 `pipStatus` 视为只读状态
* PiP 期间保持 `AVPlayer` 生命周期稳定
* 显式配置音频会话
* 避免频繁创建或替换播放器
* 在 PiP 完全结束后再释放资源
