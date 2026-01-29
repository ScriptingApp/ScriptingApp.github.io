---
title: 视频预览视图（VideoPreviewView）
description: 显示与 VideoRecorder 实例关联的实时摄像头预览的视图。

---

`VideoPreviewView` 用于实时展示 `VideoRecorder` 当前相机会话的预览画面（camera preview）。
它是 UI 层组件，不负责录制控制逻辑；录制的准备、开始、暂停、恢复与停止由 `VideoRecorder` 负责。

`VideoPreviewView` 的核心职责是：将录制器内部的预览输出渲染到界面中，并支持通过通用 View props（如 `frame`、`aspectRatio` 等）进行布局。

---

## 组件定义

```ts
type VideoPreviewViewProps = {
  recorder: VideoRecorder
}

declare const VideoPreviewView: FunctionComponent<VideoPreviewViewProps>
```

---

## Props 说明

### recorder

```ts
recorder: VideoRecorder
```

绑定的 `VideoRecorder` 实例。`VideoPreviewView` 会从该实例获取预览画面来源。

#### 行为约定

* 当 `recorder.prepare()` 成功后，预览画面可用并开始更新。
* 当 `recorder.dispose()` 被调用后，预览画面停止并释放底层资源。
* `VideoPreviewView` 不会自动调用 `prepare()` 或自动开始录制。

---

## 与 VideoRecorder 状态的关系

`VideoPreviewView` 的显示效果通常与 `VideoRecorder.state` 对应如下（具体表现可能受系统行为影响）：

| Recorder 状态 | 预览表现           |
| ----------- | -------------- |
| `idle`      | 尚未准备，可能为空画面    |
| `preparing` | 正在准备中，画面可能尚不可用 |
| `ready`     | 预览可用           |
| `recording` | 正常实时预览         |
| `paused`    | 通常停留在暂停时的最后一帧  |
| `finishing` | 停止更新或逐步停止      |
| `finished`  | 不再更新           |
| `failed`    | 不可用            |

---

## 推荐用法与生命周期管理

建议将 `VideoRecorder` 作为页面级对象创建，并在页面卸载时调用 `dispose()` 释放资源。
同时，使用 `onStateChanged` 监听状态，以驱动 UI 文案、按钮可用性、错误提示等。

要点：

* `VideoRecorder` 建议通过 `useMemo` 创建，避免每次渲染重复构造。
* 在 `useEffect` 中绑定 `onStateChanged`，并在 cleanup 中调用 `dispose()`。
* 录制前必须 `await recorder.prepare()`。

---

## 完整示例

```tsx
function View() {
  // Access dismiss function.
  const dismiss = Navigation.useDismiss()
  const recorder = useMemo(() => {
    return new VideoRecorder({
      camera: {
        position: "front",
      },
      frameRate: 30,
      audioEnabled: true,
      orientation: "portrait",
      sessionPreset: "hd1280x720",
      videoCodec: "hevc"
    })
  }, [])
  const [state, setState] = useState<VideoRecorderState>("idle")

  useEffect(() => {
    recorder.onStateChanged = (state, details) => {
      setState(state)

      if (state === "failed") {
        Dialog.alert(details!)
      }
    }

    return () => {
      recorder.dispose()
    }
  }, [])

  return <NavigationStack>
    <List
      navigationTitle="Page Title"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        topBarLeading: <Button
          title="Done"
          action={dismiss}
        />
      }}
    >
      <Text>State: {state}</Text>

      <Button
        title="Start"
        action={async () => {
          await recorder.prepare()
          recorder.startRecording(
            Path.join(
              FileManager.documentsDirectory,
              "test.mov"
            )
          )
        }}
      />

      <Button
        title="Pause"
        action={() => {
          recorder.pauseRecording()
        }}
      />

      <Button
        title="Resume"
        action={() => {
          recorder.resumeRecording()
        }}
      />

      <Button
        title="Stop"
        action={async () => {
          await recorder.stopRecording()
        }}
      />

      <VideoPreviewView
        recorder={recorder}
        frame={{
          width: 300
        }}
        aspectRatio={{
          value: 3 / 4,
          contentMode: "fill"
        }}
      />
    </List>
  </NavigationStack>
}
```

---

## 布局与渲染建议

### 使用 frame 控制尺寸

`VideoPreviewView` 支持通过通用的 `frame` 属性约束宽高。例如：

* 仅指定 `width`：配合 `aspectRatio` 确定最终高度
* 指定 `width` + `height`：强制固定大小（可能导致裁剪或拉伸，取决于 aspect ratio 与 content mode）

### 使用 aspectRatio 控制比例与填充策略

示例：

```tsx
<VideoPreviewView
  recorder={recorder}
  aspectRatio={{ value: 3 / 4, contentMode: "fill" }}
/>
```

* `value`：宽高比
* `contentMode: "fill"`：按比例填充并裁剪
* 若你希望完整显示画面且允许留边，可使用 `contentMode: "fit"`（如果你们的通用 props 支持该值）

---

## 常见注意事项

### 必须 prepare 才能稳定显示预览

`VideoPreviewView` 绑定 `recorder` 并不意味着会自动启动会话。若未 `prepare()`：

* 预览可能为空
* 或短时间内不可用
* 不建议依赖隐式行为

最佳实践：在 Start 按钮中 `await recorder.prepare()` 后再 `startRecording()`，如示例所示。

### 释放资源

* 页面关闭或不再需要预览时，务必调用 `recorder.dispose()`。
* 建议使用 `useEffect` cleanup 释放，避免相机占用导致后续页面无法打开摄像头或耗电。

### 错误处理

当 `state === "failed"` 时，建议：

* 立即提示 `details`（如示例 `Dialog.alert(details!)`）
* 同时在 UI 上禁用录制按钮，或提供重试逻辑（例如 `await recorder.reset()` 后再 `prepare()`）

---

## 组件职责边界

* `VideoRecorder`：负责录制控制与状态机（prepare/start/pause/resume/stop/reset/dispose）
* `VideoPreviewView`：负责画面显示与 UI 布局（通过 `frame` / `aspectRatio` 等通用属性）
