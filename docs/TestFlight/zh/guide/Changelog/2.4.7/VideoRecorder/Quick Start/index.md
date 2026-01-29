---
title: 快速掌握视频录制
description: 了解VideoRecorder的API
tag: PRO
---
        
`VideoRecorder` 是 Scripting 提供的高层视频采集与录制接口，对底层 `AVCaptureSession`、`AVAssetWriter`、音视频同步、方向处理等复杂逻辑进行了封装，以 **状态驱动** 的方式向脚本侧暴露一个稳定、可组合的录制 API。

该模块适用于：

* 视频录制（支持暂停 / 恢复）
* 同步音频录制
* 高帧率 / 高码率 / ProRes 编码
* 拍照（录像过程中抓帧）
* 实时对焦、曝光、变焦、补光灯控制
* 与 UI 解耦的预览展示（通过 `VideoRecorderPreviewView`）

---

## 核心设计理念

### 状态机驱动

`VideoRecorder` 内部采用明确的状态机模型，所有操作都受当前状态约束，避免非法调用导致的崩溃或未定义行为。

```ts
type State =
  | "idle"
  | "preparing"
  | "ready"
  | "recording"
  | "paused"
  | "stopping"
  | "finished"
  | "failed"
```

* **idle**
  初始状态，尚未创建或已重置会话

* **preparing**
  正在配置采集会话、设备、编码参数

* **ready**
  会话已准备完成，可以开始录制

* **recording**
  正在录制视频（音视频同步写入）

* **paused**
  录制已暂停，时间线被冻结

* **stopping**
  正在结束录制并写入文件尾

* **finished**
  录制完成，`details` 中包含输出文件路径

* **failed**
  出现错误，`details` 中包含错误信息

---

## Capture Session

```ts
class AVCaptureSession {
  private constructor()
}
```

`VideoRecorder.session` 暴露的是一个只读的 `AVCaptureSession` 实例，用于：

* 绑定预览视图
* 与其他需要底层 Session 的组件协作

该对象**不能自行创建或修改**，生命周期由 `VideoRecorder` 管理。

---

## 录制配置（Configuration）

```ts
type Configuration = {
  camera?: {
    position: "front" | "back"
    preferredTypes?: CameraType[]
  }
  frameRate?: number
  audioEnabled?: boolean
  sessionPreset?: SessionPreset
  videoCodec?: VideoCodec
  videoBitRate?: number
  orientation?: VideoOrientation
  mirrorFrontCamera?: boolean
  autoConfigAppAudioSession?: boolean
}
```

### camera

* `position`
  使用前置或后置摄像头

* `preferredTypes`
  优先选择的物理摄像头类型，例如：

  * `"wide"`
  * `"ultraWide"`
  * `"telephoto"`
  * `"triple"`

如果不提供，将根据 `position` 自动选择系统默认组合。

---

### frameRate

支持的帧率：

* 24
* 30（默认）
* 60
* 120（设备支持的前提下）

---

### audioEnabled

是否录制音频，默认 `true`。

---

### sessionPreset

控制采集分辨率与质量，例如：

* `"high"`
* `"hd1920x1080"`
* `"hd4K3840x2160"`

---

### videoCodec

支持多种编码格式，包括：

* `"hevc"`（默认）
* `"h264"`
* `"hevcWithAlpha"`
* `"proRes422"`
* `"proRes4444"`
* `"appleProRes4444XQ"`
* `"proResRAW"` 等

⚠️ 部分 ProRes 编码对设备与系统版本有要求。

---

### videoBitRate

视频码率（bps），默认 `5_000_000`。
仅对部分编码器生效。

---

### orientation

录制时的视频方向：

* `"portrait"`（默认）
* `"landscapeLeft"`
* `"landscapeRight"`

该值影响最终文件的方向元数据与写入顺序。

---

### mirrorFrontCamera

是否镜像前置摄像头画面，默认 `false`。

---

### autoConfigAppAudioSession

是否由系统自动配置 `AVAudioSession`，默认 `true`。

* `true`
  系统会根据摄像头方向、麦克风位置自动调整 Audio Session
  **不会在录制结束后恢复原状态**

* `false`
  由应用自行管理 Audio Session
  ⚠️ 如果配置不兼容，可能导致录制失败

---

## 状态与监听

### 获取当前状态

```ts
function getState(): Promise<State>
```

返回当前 `VideoRecorder` 的状态。

---

### 监听状态变化

```ts
function addStateListener(
  listener: (state: State, details?: string) => void
): void
```

* `state`
  新状态

* `details`

  * `failed`：错误信息
  * `finished`：输出文件路径

```ts
function removeStateListener(
  listener?: (state: State, details?: string) => void
): void
```

不传参数将移除所有监听器。

---

## 生命周期控制

### prepare

```ts
function prepare(configuration?: Configuration): Promise<void>
```

* 创建并配置采集会话
* 请求相机 / 麦克风权限
* 初始化编码器

成功后进入 `ready` 状态。

---

### start

```ts
function start(toPath: string): Promise<void>
```

* 开始录制
* 视频写入指定路径
* 进入 `recording` 状态

---

### pause / resume

```ts
function pause(): Promise<void>
function resume(): Promise<void>
```

* 暂停与恢复时间线
* 不会生成新文件
* 适用于长时间录制、分段控制

---

### stop

```ts
function stop(options?: {
  closeSession?: boolean
}): Promise<void>
```

* 正常结束录制
* 进入 `finished` 状态
* `details` 中返回最终文件路径

---

### cancel

```ts
function cancel(options?: {
  closeSession?: boolean
}): Promise<void>
```

* 中断录制
* 删除已生成的文件
* 不进入 `finished`

---

### reset

```ts
function reset(): Promise<void>
```

* 关闭采集会话
* 清理内部状态
* 状态回到 `idle`

适用于彻底释放资源或重新切换摄像头。

---

## 拍照能力

```ts
function takePhoto(): Promise<UIImage | null>
```

* 仅在 `recording` 状态有效
* 返回当前帧的静态图片
* 不影响视频录制

---

## 相机控制能力

### 补光灯（Torch）

```ts
const hasTorch: boolean
const torchMode: "auto" | "on" | "off"

function setTorchMode(mode: "auto" | "on" | "off"): void
```

---

### 对焦与曝光

```ts
function setFocusPoint(point: { x: number; y: number }): void
function setExposurePoint(point: { x: number; y: number }): void

function resetFocus(): void
function resetExposure(): void
```

* 坐标为 **归一化坐标**（0~1）
* 左上角为 `{ x: 0, y: 0 }`

---

### 变焦

```ts
const minZoomFactor: number
const maxZoomFactor: number
const currentZoomFactor: number

function setZoomFactor(factor: number): void
function rampZoomFactor(toFactor: number, rate: number): void
function resetZoom(): void
```

iOS 18+ 额外提供：

```ts
const displayZoomFactor: number
const displayZoomFactorMultiplier: number
```

用于 UI 层展示更符合用户直觉的倍率值。

---

## 典型使用流程

```ts
await VideoRecorder.prepare(config)
await VideoRecorder.start(path)

// recording
await VideoRecorder.pause()
await VideoRecorder.resume()

await VideoRecorder.stop()
// or
await VideoRecorder.cancel()

await VideoRecorder.reset()
```

---

## 使用建议与注意事项

* `prepare → start → stop / cancel` 是一条完整生命周期
* 不建议在 `recording` 状态切换摄像头，应先 `reset`
* 高帧率 + ProRes 对设备性能与存储要求较高
* 若关闭 `autoConfigAppAudioSession`，需自行保证音频会话兼容性
* 预览 UI 与录制逻辑解耦，推荐通过 `VideoRecorderPreviewView` 展示画面
