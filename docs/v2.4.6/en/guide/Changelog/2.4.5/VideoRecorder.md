---
title: VideoRecorder
description: A high-level API for recording video with fine-grained control over camera configuration, audio capture, encoding, pause/resume behavior, and final file output.
tag: PRO
---

`VideoRecorder` provides a programmable video recording session in Scripting.
It encapsulates camera selection, audio/video capture, encoding, pause/resume handling, zoom, focus, torch control, and final file writing.

This API is intended for custom camera interfaces, video capture utilities, and automated recording workflows.

---

## Capabilities Overview

* Front and back camera support
* Explicit camera type selection (wide, ultra-wide, telephoto, etc.)
* Multiple frame rates (24 / 30 / 60 / 120)
* Optional audio recording
* Multiple system capture session presets
* Multiple video codecs (HEVC / H.264 / ProRes, etc.)
* Pause and resume during recording
* Independent focus and exposure control
* Zoom and smooth zoom (ramp) control
* Torch (flashlight) control
* Deterministic state machine with callbacks
* Explicit lifecycle management (`prepare / reset / dispose`)

---

## Type Definitions

### CameraPosition

```ts
type CameraPosition = "front" | "back"
```

Represents the physical camera position.

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

Represents the physical camera device type.
Availability depends on the device hardware.

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

#### State Semantics

| State       | Meaning                                               |
| ----------- | ----------------------------------------------------- |
| `idle`      | Initial state, no resources configured                |
| `preparing` | Camera session and pipelines are being configured     |
| `ready`     | Recorder is ready to start recording                  |
| `recording` | Recording is in progress                              |
| `paused`    | Recording is paused                                   |
| `finishing` | Recording is stopping and file writing is in progress |
| `finished`  | Recording completed successfully                      |
| `failed`    | An error occurred                                     |

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

Defines the capture session resolution preset.

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

Specifies the video encoding format.
Actual availability depends on system and hardware support.

---

### VideoOrientation

```ts
type VideoOrientation =
  | "portrait"
  | "landscapeLeft"
  | "landscapeRight"
```

Specifies the output video orientation.

---

## Constructor

```ts
new VideoRecorder(settings?)
```

### settings

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

#### Parameter Details

* **camera**

  * `position`
    Camera position. Defaults to `"back"`.
  * `preferredTypes`
    Preferred camera device types.
    If omitted, a suitable device is selected automatically based on position.

* **frameRate**
  Target frame rate. Supported values: 24, 30, 60, 120.
  Defaults to 30. Actual frame rate depends on device capability.

* **audioEnabled**
  Indicates whether audio is recorded. Defaults to `true`.

* **sessionPreset**
  Capture session resolution preset. Defaults to `"high"`.

* **videoCodec**
  Video encoding format. Defaults to `"hevc"`.

* **videoBitRate**
  Average video bit rate in bits per second.
  If omitted, the system selects an appropriate value.

* **orientation**
  Output video orientation. Defaults to `"portrait"`.

* **mirrorFrontCamera**
  Indicates whether the front camera output is mirrored.
  Defaults to `true`. Only applies to the front camera.

---

## Read-Only Properties

### minZoomFactor

```ts
readonly minZoomFactor: number
```

Minimum supported zoom factor for the active device.

---

### maxZoomFactor

```ts
readonly maxZoomFactor: number
```

Maximum supported zoom factor for the active device.

---

### currentZoomFactor

```ts
readonly currentZoomFactor: number
```

Current zoom factor.

---

### displayZoomFactor

```ts
readonly displayZoomFactor: number
```

Zoom factor displayed to the user.

---

### hasTorch

```ts
readonly hasTorch: boolean
```

Indicates whether the active camera supports a torch.

---

### torchMode

```ts
readonly torchMode: "auto" | "on" | "off"
```

Current torch mode.

---

## State and Callbacks

### state

```ts
state: VideoRecorderState
```

Represents the current state of the recorder.

---

### onStateChanged

```ts
onStateChanged?: (
  state: VideoRecorderState,
  details?: string
) => void
```

Invoked whenever the recorder state changes.

* When `state === "failed"`
  `details` contains an error description.

* When `state === "finished"`
  `details` contains the full output file path.

---

## Methods

### prepare()

```ts
prepare(): Promise<void>
```

Prepares the recorder by configuring the camera session and audio/video pipelines.

#### Usage Constraints

* Must be called before `startRecording`
* Transitions state to `ready` on success
* Transitions to `failed` on error

---

### startRecording(toPath)

```ts
startRecording(toPath: string): void
```

Starts video recording.

#### Parameters

* **toPath**
  Full file path where the video will be saved.

#### Usage Constraints

* Only valid in the `ready` state
* Transitions state to `recording`

---

### pauseRecording()

```ts
pauseRecording(): void
```

Pauses the ongoing recording.

#### Usage Constraints

* Only valid in the `recording` state
* Transitions state to `paused`
* Timeline is compacted without introducing blank segments

---

### resumeRecording()

```ts
resumeRecording(): void
```

Resumes a paused recording.

#### Usage Constraints

* Only valid in the `paused` state
* Transitions state back to `recording`

---

### stopRecording()

```ts
stopRecording(): Promise<void>
```

Stops recording and finalizes the output file.

#### Behavior

* Transitions state to `finishing`
* Transitions to `finished` after file writing completes
* Final file path is delivered via `onStateChanged`

---

### reset()

```ts
reset(): Promise<void>
```

Resets the recorder state to allow a new recording session.

#### Intended Use

* After a completed recording
* After a failed recording

#### Behavior

* Transitions state back to `idle`
* `prepare` may be called again

---

### setTorchMode()

```ts
setTorchMode(mode: "auto" | "off" | "on"): void
```

Sets the torch mode for the active camera.

---

### setFocusPoint()

```ts
setFocusPoint(point: { x: number; y: number }): void
```

Sets the focus point.

* Coordinates are normalized in the range `0.0 ~ 1.0`
* `(0,0)` represents the top-left corner
* `(1,1)` represents the bottom-right corner

---

### setExposurePoint()

```ts
setExposurePoint(point: { x: number; y: number }): void
```

Sets the exposure point using the same coordinate system as focus.

---

### resetFocus()

```ts
resetFocus(): void
```

Restores automatic focus mode.

---

### resetExposure()

```ts
resetExposure(): void
```

Restores automatic exposure mode.

---

### setZoomFactor()

```ts
setZoomFactor(factor: number): void
```

Immediately sets the zoom factor.

* Value must be within `minZoomFactor` and `maxZoomFactor`

---

### rampZoomFactor()

```ts
rampZoomFactor(toFactor: number, rate: number): void
```

Smoothly transitions the zoom factor.

* `toFactor` specifies the target zoom factor
* `rate` specifies the transition speed in powers of two per second

---

### resetZoom()

```ts
resetZoom(): void
```

Resets the zoom factor to the default value (typically `1.0`).

---

### dispose()

```ts
dispose(): Promise<void>
```

Releases all resources and destroys the recorder.

#### Usage Constraints

* The instance cannot be used after disposal
* Releases camera, audio, and system resources
* Should be called when the recording lifecycle ends

---

## Typical Usage Flow

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

## Usage Guidelines

* Always observe `onStateChanged` to track state transitions
* Do not start recording before calling `prepare`
* Call `reset` before reusing the same instance for another recording
* Call `dispose` when the recorder is no longer needed
