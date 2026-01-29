# Quick Start

`VideoRecorder` is a high-level video capture and recording module provided by Scripting.
It encapsulates complex AVFoundation details such as `AVCaptureSession` management, audio/video synchronization, orientation handling, encoding, and pause/resume timelines, and exposes a **state-driven**, script-friendly API.

Typical use cases include:

- Video recording with pause and resume
- Synchronized audio capture
- High frame rate and high bitrate recording
- ProRes video encoding
- Capturing photos during video recording
- Runtime camera control (focus, exposure, zoom, torch)
- UI-agnostic preview rendering via a separate preview view

***

## Design Principles

### State-Driven Architecture

`VideoRecorder` is governed by a strict internal state machine.
All public APIs are validated against the current state to prevent invalid transitions and undefined behavior.

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

State definitions:

- **idle**
  Initial state or fully reset. No active capture session.

- **preparing**
  Capture session, devices, and encoders are being configured.

- **ready**
  Fully prepared and ready to start recording.

- **recording**
  Actively recording video (and audio if enabled).

- **paused**
  Recording timeline is paused; media writing is suspended.

- **stopping**
  Recording is ending and the output file is being finalized.

- **finished**
  Recording completed successfully. `details` contains the output file path.

- **failed**
  An error occurred. `details` contains the error message.

***

## Capture Session

```ts
class AVCaptureSession {
  private constructor()
}
```

`VideoRecorder.session` exposes a read-only `AVCaptureSession` instance managed internally by `VideoRecorder`.

This session is intended for:

- Attaching preview views
- Integration with other components that require direct access to the capture session

The session **cannot be instantiated or modified directly**.

***

## Recorder Configuration

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

### Camera Selection

- `position`
  Selects the front or back camera.

- `preferredTypes`
  A prioritized list of physical camera types, such as:

  - `"wide"`
  - `"ultraWide"`
  - `"telephoto"`
  - `"triple"`

If not specified, the system automatically selects an appropriate camera for the chosen position.

***

### Frame Rate

Supported frame rates:

- 24
- 30 (default)
- 60
- 120 (device-dependent)

***

### Audio Recording

```ts
audioEnabled?: boolean
```

Enables or disables audio recording.
Defaults to `true`.

***

### Session Preset

Controls capture resolution and quality, for example:

- `"high"`
- `"hd1920x1080"`
- `"hd4K3840x2160"`

***

### Video Codec

Supported codecs include:

- `"hevc"` (default)
- `"h264"`
- `"hevcWithAlpha"`
- `"proRes422"`
- `"proRes4444"`
- `"appleProRes4444XQ"`
- `"proResRAW"`

Availability depends on device capabilities and OS version.

***

### Video Bit Rate

```ts
videoBitRate?: number
```

Specifies the target video bitrate in bits per second.
Default value is `5_000_000`.
Only applies to certain codecs.

***

### Orientation

```ts
orientation?: "portrait" | "landscapeLeft" | "landscapeRight"
```

Defines the recording orientation and affects both pixel buffers and output metadata.

***

### Front Camera Mirroring

```ts
mirrorFrontCamera?: boolean
```

Mirrors the front camera image if set to `true`.
Defaults to `false`.

***

### Audio Session Management

```ts
autoConfigAppAudioSession?: boolean
```

- `true` (default)
  The system automatically configures the shared `AVAudioSession` for optimal recording.
  The original audio session state is **not restored** after recording.

- `false`
  The app is responsible for configuring `AVAudioSession`.
  Incompatible settings may cause recording to fail.

***

## State Access and Observation

### Get Current State

```ts
function getState(): Promise<State>
```

Returns the current state of the recorder.

***

### State Change Listener

```ts
function addStateListener(
  listener: (state: State, details?: string) => void
): void
```

- `state`
  The new recorder state.

- `details`

  - For `"failed"`: error description
  - For `"finished"`: output file path

```ts
function removeStateListener(
  listener?: (state: State, details?: string) => void
): void
```

If no listener is provided, all listeners are removed.

***

## Recording Lifecycle

### Prepare

```ts
function prepare(configuration?: Configuration): Promise<void>
```

- Creates and configures the capture session
- Requests camera and microphone permissions
- Initializes encoders

Transitions to the `ready` state upon success.

***

### Start Recording

```ts
function start(toPath: string): Promise<void>
```

- Begins recording
- Writes output to the specified file path
- Transitions to `recording`

***

### Pause and Resume

```ts
function pause(): Promise<void>
function resume(): Promise<void>
```

- Pauses and resumes the recording timeline
- Does not create separate files
- Suitable for long-form or segmented recording

***

### Stop Recording

```ts
function stop(options?: {
  closeSession?: boolean
}): Promise<void>
```

- Finalizes the recording
- Transitions to `finished`
- `details` contains the output file path

***

### Cancel Recording

```ts
function cancel(options?: {
  closeSession?: boolean
}): Promise<void>
```

- Aborts recording
- Deletes the output file
- Does not enter the `finished` state

***

### Reset Recorder

```ts
function reset(): Promise<void>
```

- Closes the capture session
- Clears all internal state
- Returns to the `idle` state

Typically used when switching cameras or fully releasing resources.

***

## Photo Capture During Recording

```ts
function takePhoto(): Promise<UIImage | null>
```

- Only valid while in the `recording` state
- Captures a still image from the current video stream
- Does not interrupt recording

***

## Camera Controls

### Torch (Flashlight)

```ts
const hasTorch: boolean
const torchMode: "auto" | "on" | "off"

function setTorchMode(mode: "auto" | "on" | "off"): void
```

***

### Focus and Exposure

```ts
function setFocusPoint(point: { x: number; y: number }): void
function setExposurePoint(point: { x: number; y: number }): void

function resetFocus(): void
function resetExposure(): void
```

- Coordinates are **normalized** (0.0–1.0)
- `{ x: 0, y: 0 }` corresponds to the top-left corner

***

### Zoom Control

```ts
const minZoomFactor: number
const maxZoomFactor: number
const currentZoomFactor: number

function setZoomFactor(factor: number): void
function rampZoomFactor(toFactor: number, rate: number): void
function resetZoom(): void
```

On iOS 18 and later:

```ts
const displayZoomFactor: number
const displayZoomFactorMultiplier: number
```

These values are intended for user-friendly zoom display in the UI.

***

## Typical Usage Flow

```ts
await VideoRecorder.prepare(config)
await VideoRecorder.start(path)

// recording in progress
await VideoRecorder.pause()
await VideoRecorder.resume()

await VideoRecorder.stop()
// or
await VideoRecorder.cancel()

await VideoRecorder.reset()
```

***

## Usage Notes and Best Practices

- A full lifecycle follows: `prepare → start → stop | cancel`
- Switching cameras during `recording` is not recommended; call `reset` first
- High frame rates and ProRes codecs require significant performance and storage
- When disabling automatic audio session configuration, ensure compatibility manually
- Preview rendering is decoupled from recording logic and should be handled separately
