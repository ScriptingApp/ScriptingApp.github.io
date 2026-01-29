---
title: 视频录制（VideoRecorder）
description: 提供对摄像头配置、音频捕获、编码、暂停/恢复行为以及最终文件输出的细粒度控制，以实现视频录制的高级 API。
tag: PRO
---

`VideoRecorder` 用于在 Scripting 中创建和控制一个可编程的视频录制会话，完整封装了相机选择、音视频采集、编码、暂停/恢复、缩放、对焦、补光灯控制以及最终文件写入流程。

该 API 适用于自定义相机界面、视频采集工具、自动化录制脚本等场景。

---

## 核心能力概览

* 支持前置与后置摄像头
* 支持指定摄像头类型（广角、超广角、长焦等）
* 支持多种帧率（24 / 30 / 60 / 120）
* 支持音频录制的启用与禁用
* 支持多种系统 Session Preset
* 支持多种视频编码格式（HEVC / H.264 / ProRes 等）
* 支持录制过程中的暂停与恢复
* 支持对焦点、曝光点独立控制
* 支持变焦与平滑变焦（ramp）
* 支持补光灯（Torch）控制
* 明确的状态机与状态回调
* 明确的生命周期管理（prepare / reset / dispose）

---

## 类型定义

### CameraPosition

```ts
type CameraPosition = "front" | "back"
```

表示使用的摄像头朝向。

---

### CameraType

```ts
type CameraType =
  | "wide"
  | "ultraWide"
  | "telephoto"
  | "trueDepth"
  | "dual"
  | "dualWide"
  | "triple"
```

表示摄像头的物理类型。
是否支持某一类型取决于设备硬件能力。

---

### VideoRecorderState

```ts
type VideoRecorderState =
  | "idle"
  | "preparing"
  | "ready"
  | "recording"
  | "paused"
  | "finishing"
  | "finished"
  | "failed"
```

#### 状态说明

| 状态          | 含义             |
| ----------- | -------------- |
| `idle`      | 初始状态，尚未配置资源    |
| `preparing` | 正在配置相机会话与音视频管线 |
| `ready`     | 已准备完成，可以开始录制   |
| `recording` | 正在录制           |
| `paused`    | 录制已暂停          |
| `finishing` | 正在结束录制并写入文件    |
| `finished`  | 录制完成           |
| `failed`    | 发生错误，录制失败      |

---

### VideoCaptureSessionPreset

```ts
type VideoCaptureSessionPreset =
  | "high"
  | "medium"
  | "low"
  | "cif352x288"
  | "vga640x480"
  | "iFrame960x540"
  | "iFrame1280x720"
  | "hd1280x720"
  | "hd1920x1080"
  | "hd4K3840x2160"
```

表示捕捉会话的分辨率预设。

---

### VideoCodec

```ts
type VideoCodec =
  | "hevc"
  | "h264"
  | "jpeg"
  | "JPEGXL"
  | "proRes4444"
  | "appleProRes4444XQ"
  | "proRes422"
  | "proRes422HQ"
  | "proRes422LT"
  | "proRes422Proxy"
  | "proResRAW"
  | "proResRAWHQ"
  | "hevcWithAlpha"
```

表示视频编码格式。
具体是否可用取决于设备与系统支持情况。

---

### VideoOrientation

```ts
type VideoOrientation =
  | "portrait"
  | "landscapeLeft"
  | "landscapeRight"
```

表示输出视频的方向。

---

## 构造函数

```ts
new VideoRecorder(settings?)
```

### settings 参数

```ts
{
  camera?: {
    position: CameraPosition
    preferredTypes?: CameraType[]
  }
  frameRate?: number
  audioEnabled?: boolean
  sessionPreset?: VideoCaptureSessionPreset
  videoCodec?: VideoCodec
  videoBitRate?: number
  orientation?: VideoOrientation
  mirrorFrontCamera?: boolean
}
```

#### 参数说明

* **camera**

  * `position`
    使用的摄像头位置，默认 `"back"`
  * `preferredTypes`
    偏好的摄像头类型列表
    如果未提供，内部将根据摄像头位置自动选择合适的类型

* **frameRate**
  目标帧率，支持 24 / 30 / 60 / 120，默认 30
  实际帧率受设备与分辨率限制

* **audioEnabled**
  是否录制音频，默认 `true`

* **sessionPreset**
  捕捉会话分辨率预设，默认 `"high"`

* **videoCodec**
  视频编码格式，默认 `"hevc"`

* **videoBitRate**
  视频平均码率（bit/s），未指定时由系统自动选择

* **orientation**
  输出视频方向，默认 `"portrait"`

* **mirrorFrontCamera**
  前置摄像头是否镜像，默认 `true`
  仅在使用前置摄像头时生效

---

## 只读属性

### minZoomFactor

```ts
readonly minZoomFactor: number
```

当前设备支持的最小变焦倍率。

---

### maxZoomFactor

```ts
readonly maxZoomFactor: number
```

当前设备支持的最大变焦倍率。

---

### currentZoomFactor

```ts
readonly currentZoomFactor: number
```

当前变焦倍率。

---

### displayZoomFactor

```ts
readonly displayZoomFactor: number
```

用户可读的变焦倍率。

---

### hasTorch

```ts
readonly hasTorch: boolean
```

当前摄像头是否支持补光灯。

---

### torchMode

```ts
readonly torchMode: "auto" | "on" | "off"
```

当前补光灯模式。

---

## 状态与回调

### state

```ts
state: VideoRecorderState
```

表示当前录制器所处的状态。

---

### onStateChanged

```ts
onStateChanged?: (
  state: VideoRecorderState,
  details?: string
) => void
```

状态变化回调。

* 当 `state === "failed"`
  `details` 为错误信息描述

* 当 `state === "finished"`
  `details` 为最终视频文件的完整保存路径

---

## 方法说明

### prepare()

```ts
prepare(): Promise<void>
```

准备录制器资源，包括相机会话、输入输出与音视频管线配置。

#### 使用约束

* 必须在 `startRecording` 之前调用
* 成功后状态变为 `ready`
* 失败会进入 `failed` 状态

---

### startRecording(toPath)

```ts
startRecording(toPath: string): void
```

开始录制视频。

#### 参数

* **toPath**
  视频文件保存路径（完整路径）

#### 使用约束

* 仅允许在 `ready` 状态下调用
* 调用后状态变为 `recording`

---

### pauseRecording()

```ts
pauseRecording(): void
```

暂停当前录制。

#### 使用约束

* 仅允许在 `recording` 状态下调用
* 调用后状态变为 `paused`
* 时间线会被正确压缩，不产生空白帧

---

### resumeRecording()

```ts
resumeRecording(): void
```

恢复已暂停的录制。

#### 使用约束

* 仅允许在 `paused` 状态下调用
* 调用后状态回到 `recording`

---

### stopRecording()

```ts
stopRecording(): Promise<void>
```

停止录制并生成最终视频文件。

#### 行为说明

* 状态先进入 `finishing`
* 文件写入完成后进入 `finished`
* 最终文件路径通过 `onStateChanged` 回调返回

---

### reset()

```ts
reset(): Promise<void>
```

重置录制器状态，用于开始新一轮录制。

#### 使用场景

* 已完成一次录制
* 或录制失败后希望复用同一实例

#### 行为说明

* 成功后状态回到 `idle`
* 可再次调用 `prepare`

---

### setTorchMode()

```ts
setTorchMode(mode: "auto" | "off" | "on"): void
```

设置补光灯模式。

---

### setFocusPoint()

```ts
setFocusPoint(point: { x: number; y: number }): void
```

设置对焦点。

* 坐标为归一化值，范围 `0.0 ~ 1.0`
* `(0,0)` 表示画面左上角，`(1,1)` 表示右下角

---

### setExposurePoint()

```ts
setExposurePoint(point: { x: number; y: number }): void
```

设置曝光点，坐标规则与对焦点一致。

---

### resetFocus()

```ts
resetFocus(): void
```

恢复自动对焦模式。

---

### resetExposure()

```ts
resetExposure(): void
```

恢复自动曝光模式。

---

### setZoomFactor()

```ts
setZoomFactor(factor: number): void
```

立即设置变焦倍率。

* 值应位于 `minZoomFactor` 与 `maxZoomFactor` 之间

---

### rampZoomFactor()

```ts
rampZoomFactor(toFactor: number, rate: number): void
```

以平滑方式调整变焦倍率。

* `toFactor` 为目标倍率
* `rate` 为变化速率，单位为每秒的 2 次幂变化

---

### resetZoom()

```ts
resetZoom(): void
```

将变焦倍率恢复为默认值（通常为 1.0）。

---

### dispose()

```ts
dispose(): Promise<void>
```

释放并销毁录制器。

#### 使用约束

* 调用后实例不可再使用
* 会释放相机、音频与底层系统资源
* 建议在页面或脚本生命周期结束时调用

---

## 典型使用流程

```ts
const recorder = new VideoRecorder({
  camera: { position: "back" },
  frameRate: 60,
  videoCodec: "hevc"
})

recorder.onStateChanged = (state, details) => {
  if (state === "finished") {
    console.log("Video saved at:", details)
  }
}

await recorder.prepare()
recorder.startRecording("/path/to/tmp/demo.mov")
```

---

## 使用建议

* 始终监听 `onStateChanged` 以掌握完整状态变化
* 不要在未调用 `prepare` 的情况下开始录制
* 每次完成录制后，如需复用实例，应先调用 `reset`
* 生命周期结束时务必调用 `dispose` 释放资源
