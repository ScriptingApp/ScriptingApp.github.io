# 快速开始

`MediaComposer` 用于在 Scripting 中 **组合视频、图片与音频时间线并导出最终媒体文件**。
它封装了一套稳定的时间线模型，支持视频剪辑、图片片段、音频叠加、淡入淡出、音频 ducking、导出参数控制等高级能力。

该模块适用于：

- 视频与图片混合生成短片
- 给视频添加背景音乐、配音或音效
- 使用图片序列生成视频
- 自动化视频处理与内容生成脚本

***

## 设计概览

MediaComposer 的核心由三部分组成：

1. **时间模型**
   使用 `MediaTime` / `TimeRange` 精确描述时间点与时长

2. **时间线模型**

   - `VideoItem[]`：视频或图片片段（顺序拼接）
   - `AudioClip[]`：音频轨道（可指定时间点或自动顺序放置）

3. **导出系统**
   通过统一的 `composeAndExport` 接口完成渲染与导出

***

## 时间线结构

```ts
timeline: {
  videoItems: VideoItem[]
  audioClips: AudioClip[]
}
```

- **videoItems**
  定义视觉时间线，视频与图片会严格按数组顺序依次排列
- **audioClips**
  定义音频时间线，可自由指定放置时间（`at`），或顺序追加

最终导出的视频时长由 **videoItems 决定**。

***

## VideoItem

```ts
type VideoItem = XOR<VideoClip, ImageClip>
```

`VideoItem` 表示时间线中的一个“视觉片段”，可以是 **视频** 或 **图片**，但不能同时是两者。

***

## VideoClip（视频片段）

```ts
type VideoClip = {
  videoPath: string
  sourceTimeRange?: TimeRange | null
  keepOriginalAudio?: boolean
  fade?: FadeConfig | null
}
```

### videoPath

- 视频文件路径
- 支持本地视频文件

***

### sourceTimeRange

```ts
sourceTimeRange?: TimeRange | null
```

- 指定从源视频中使用的时间范围
- 不提供时，默认使用整个视频

**常见用途：**

- 裁剪视频片段
- 只取某一段作为素材

***

### keepOriginalAudio

```ts
keepOriginalAudio?: boolean
```

- 是否保留视频自带的音频
- 默认值：`false`

**说明：**

- 为 `true` 时，视频原音会参与混音
- 可与外部 `audioClips` 同时存在
- 是否对外部音频进行 ducking 由 `ExportOptions.ducking` 控制

***

### fade

```ts
fade?: FadeConfig | null
```

- 视频片段的淡入淡出配置
- 会覆盖全局视频淡入淡出设置（如果存在）

***

## ImageClip（图片片段）

```ts
type ImageClip = {
  imagePath: string
  duration: MediaTime
  contentMode?: "fit" | "crop"
  backgroundColor?: Color
  fade?: FadeConfig | null
}
```

`ImageClip` 用于将一张静态图片作为视频时间线中的一个片段。

***

### imagePath

- 图片文件路径
- 支持常见图片格式（JPEG / PNG / HEIC 等）

***

### duration

```ts
duration: MediaTime
```

- 图片片段在视频中的显示时长
- 必须显式指定

***

### contentMode

```ts
contentMode?: "fit" | "crop"
```

- 控制图片如何适配渲染尺寸
- 默认值：`fit`

说明：

- `fit`：完整显示图片，可能留黑边
- `crop`：填满画面，超出部分裁剪

***

### backgroundColor

```ts
backgroundColor?: Color
```

- 图片未覆盖区域的背景色
- 通常与 `fit` 模式搭配使用

***

### fade

```ts
fade?: FadeConfig | null
```

- 图片片段的淡入淡出配置
- 支持与视频片段统一使用

***

## AudioClip（音频片段）

```ts
type AudioClip = {
  path: string
  sourceTimeRange?: TimeRange | null
  at?: MediaTime
  volume?: number
  fade?: FadeConfig | null
  loopToFitVideoDuration?: boolean
}
```

音频片段用于在最终视频中添加背景音乐、配音或音效。

***

### path

- 音频文件路径

***

### sourceTimeRange

- 指定使用音频的某一时间段
- 默认使用整个音频文件

***

### at

```ts
at?: MediaTime
```

- 指定音频在最终时间线中的放置时间
- 不指定时：

  - 按顺序接在前一个外部音频片段之后

***

### volume

```ts
volume?: number
```

- 单个音频片段的音量（0…1）
- 默认值：1

***

### fade

- 音频淡入淡出配置
- 常用于背景音乐的自然过渡

***

### loopToFitVideoDuration

```ts
loopToFitVideoDuration?: boolean
```

- 是否循环音频以匹配视频总时长
- 常用于背景音乐

***

## FadeConfig（淡入淡出）

```ts
type FadeConfig = {
  fadeInSeconds?: number
  fadeOutSeconds?: number
}
```

- 单位：秒
- 可用于视频、图片、音频
- 未指定时默认为 0

***

## ExportOptions（导出配置）

```ts
type ExportOptions = {
  renderSize?: Size
  frameRate?: number
  scaleMode?: VideoScaleMode
  globalVideoFade?: FadeConfig | null
  externalAudioBaseVolume?: number
  ducking?: DuckingConfig
  presetName?: ExportPreset
  outputFileType?: ExportFileType
}
```

### 常用说明

- **renderSize**
  最终视频分辨率，默认 1080×1920

- **frameRate**
  渲染帧率，默认 30

- **globalVideoFade**
  全局视频淡入淡出（可被单个 clip 覆盖）

- **ducking**
  当视频存在原音时，自动降低外部音频音量

- **presetName / outputFileType**
  控制编码质量与文件格式

***

## composeAndExport

```ts
function composeAndExport(options: {
  exportPath: string
  timeline: {
    videoItems: VideoItem[]
    audioClips: AudioClip[]
  }
  exportOptions?: ExportOptions
  overwrite?: boolean
}): Promise<{
  exportPath: string
  duration: MediaTime
}>
```

### 参数说明

- **exportPath**
  导出文件路径

- **timeline.videoItems**
  视频 / 图片时间线（顺序执行）

- **timeline.audioClips**
  音频时间线（可自由放置）

- **exportOptions**
  导出配置，可选

- **overwrite**
  是否覆盖已有文件，默认 `true`

***

### 返回结果

```ts
{
  exportPath: string
  duration: MediaTime
}
```

- **exportPath**：最终导出路径
- **duration**：最终视频时长（由 videoItems 决定）

***

## 使用建议与最佳实践

- 始终使用 `MediaTime` 描述时间，避免直接使用浮点秒数
- 图片片段必须显式指定 `duration`
- 音频与视频的时间线是 **独立但最终混合** 的
- 对复杂项目，建议统一 timescale（如 600）
- 背景音乐推荐使用 `loopToFitVideoDuration`

***

## 典型使用场景

- 图片 + 视频混合短片
- 自动生成带背景音乐的视频
- 视频剪辑与配音合成
- 内容创作与自动化视频生成
