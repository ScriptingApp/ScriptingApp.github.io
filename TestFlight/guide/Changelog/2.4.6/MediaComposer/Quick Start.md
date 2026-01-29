# Quick Start

`MediaComposer` is used in Scripting to **compose video, image, and audio timelines and export a final media file**.
It provides a stable and precise timeline model that supports video clips, image clips, audio overlays, fades, audio ducking, and flexible export configuration.

This module is suitable for:

- Mixing videos and images into a single output
- Adding background music, voice-over, or sound effects
- Generating videos from image sequences
- Automated and script-driven media production

***

## Design Overview

MediaComposer consists of three core layers:

1. **Time Model**
   Based on `MediaTime` and `TimeRange` for precise time representation

2. **Timeline Model**

   - `VideoItem[]`: visual timeline (videos or images, sequential)
   - `AudioClip[]`: audio timeline (positioned or sequential)

3. **Export System**
   A unified `composeAndExport` API for rendering and exporting

***

## Timeline Structure

```ts
timeline: {
  videoItems: VideoItem[]
  audioClips: AudioClip[]
}
```

- **videoItems**
  Defines the visual timeline. Video and image items are concatenated strictly in array order.
- **audioClips**
  Defines the audio timeline. Clips may be explicitly positioned or appended sequentially.

The final exported duration is determined by the **videoItems timeline**.

***

## VideoItem

```ts
type VideoItem = XOR<VideoClip, ImageClip>
```

A `VideoItem` represents a single visual segment in the timeline.
It can be either a **video clip** or an **image clip**, but never both.

***

## VideoClip

```ts
type VideoClip = {
  videoPath: string
  sourceTimeRange?: TimeRange | null
  keepOriginalAudio?: boolean
  fade?: FadeConfig | null
}
```

### videoPath

- Path to the video file
- Local video files are supported

***

### sourceTimeRange

```ts
sourceTimeRange?: TimeRange | null
```

- Specifies the portion of the source video to use
- Defaults to the entire video when omitted

**Common use cases:**

- Trimming a video
- Extracting a specific segment as material

***

### keepOriginalAudio

```ts
keepOriginalAudio?: boolean
```

- Whether to keep the original audio from the video
- Default: `false`

**Notes:**

- When `true`, the video’s original audio participates in the final mix
- External `audioClips` may still be used simultaneously
- Ducking behavior is controlled by `ExportOptions.ducking`

***

### fade

```ts
fade?: FadeConfig | null
```

- Per-clip fade-in / fade-out configuration
- Overrides the global video fade when provided

***

## ImageClip

```ts
type ImageClip = {
  imagePath: string
  duration: MediaTime
  contentMode?: "fit" | "crop"
  backgroundColor?: Color
  fade?: FadeConfig | null
}
```

`ImageClip` allows a still image to appear as a timed segment within the video timeline.

***

### imagePath

- Path to the image file
- Common image formats are supported (JPEG, PNG, HEIC, etc.)

***

### duration

```ts
duration: MediaTime
```

- The display duration of the image clip in the video
- This field is required

***

### contentMode

```ts
contentMode?: "fit" | "crop"
```

- Controls how the image is scaled to the render size
- Default: `fit`

Behavior:

- `fit`: Entire image is visible; letterboxing may occur
- `crop`: Image fills the frame; excess is cropped

***

### backgroundColor

```ts
backgroundColor?: Color
```

- Background color for areas not covered by the image
- Commonly used together with `fit` mode

***

### fade

```ts
fade?: FadeConfig | null
```

- Fade-in / fade-out configuration for the image clip
- Behaves the same as fades for video clips

***

## AudioClip

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

`AudioClip` is used to add background music, narration, or sound effects to the final video.

***

### path

- Path to the audio file

***

### sourceTimeRange

- Specifies the portion of the audio to use
- Defaults to the entire audio file

***

### at

```ts
at?: MediaTime
```

- Explicit placement time on the final timeline
- When omitted, audio clips are appended sequentially

***

### volume

```ts
volume?: number
```

- Per-clip gain (0…1)
- Default: `1`

***

### fade

- Fade-in / fade-out configuration for the audio clip

***

### loopToFitVideoDuration

```ts
loopToFitVideoDuration?: boolean
```

- Whether the audio should loop to match the total video duration
- Commonly used for background music

***

## FadeConfig

```ts
type FadeConfig = {
  fadeInSeconds?: number
  fadeOutSeconds?: number
}
```

- Duration is expressed in seconds
- Applicable to video, image, and audio clips
- Defaults to 0 when omitted

***

## ExportOptions

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

### Common options

- **renderSize**
  Output resolution, default is 1080×1920

- **frameRate**
  Rendering frame rate, default is 30

- **globalVideoFade**
  Global fade applied to all visual clips unless overridden

- **ducking**
  Automatically lowers external audio volume when original video audio exists

- **presetName / outputFileType**
  Control encoding quality and output format

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

### Parameters

- **exportPath**
  Output file path

- **timeline.videoItems**
  Visual timeline (videos and images, in sequence)

- **timeline.audioClips**
  Audio timeline (positioned or sequential)

- **exportOptions**
  Optional export configuration

- **overwrite**
  Whether to overwrite an existing file (default: `true`)

***

### Return Value

```ts
{
  exportPath: string
  duration: MediaTime
}
```

- **exportPath**: final output path
- **duration**: total duration of the exported video (derived from `videoItems`)

***

## Usage Guidelines and Best Practices

- Always use `MediaTime` for time values; avoid raw floating-point seconds
- `ImageClip.duration` must always be explicitly specified
- Audio and visual timelines are independent but mixed in the final output
- For complex projects, use a consistent timescale (e.g. 600)
- Background music typically uses `loopToFitVideoDuration`

***

## Typical Use Cases

- Mixed image and video composition
- Adding background music or narration to videos
- Automated video generation
- Script-driven content creation pipelines
