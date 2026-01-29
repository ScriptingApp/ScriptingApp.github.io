# VideoRecorderPreviewView

`VideoRecorderPreviewView` is a UI component used to display the live video feed produced by `VideoRecorder`.
It is a **pure preview component** and does **not** manage recording logic or state.

Its responsibilities include:

- Rendering the real-time camera preview
- Supporting different video fill modes (`videoGravity`)
- Handling mirrored display (commonly for the front camera)
- Applying visual effects such as corner radius and clipping
- Composing with gestures to implement zoom, focus, or exposure interactions

***

## Design Principles

### Decoupled from Recording Logic

`VideoRecorderPreviewView`:

- Does not start, stop, or control recording
- Does not observe or depend on `VideoRecorder.State`
- Does not manage camera or encoder configuration

It only binds to the capture session managed by `VideoRecorder`.

***

### One-Way Dependency

```
VideoRecorder  ──▶  AVCaptureSession  ──▶  VideoRecorderPreviewView
```

- The capture session lifecycle is owned by `VideoRecorder`
- The preview view is a passive consumer for rendering only

***

## Props Definition

```ts
type VideoRecorderPreviewViewProps = {
  videoGravity?: "resizeAspect" | "resizeAspectFill" | "resize"
  isVideoMirrored?: boolean
  cornerRadius?: number
  masksToBounds?: boolean
}
```

***

## videoGravity

```ts
videoGravity?: "resizeAspect" | "resizeAspectFill" | "resize"
```

Controls how the video content is scaled and positioned within the view.
This maps directly to `AVLayerVideoGravity`.

- `resizeAspect`
  Preserves aspect ratio and fits the entire video within the view.
  Black bars may appear.

- `resizeAspectFill` (default)
  Preserves aspect ratio and fills the view, potentially cropping edges.

- `resize`
  Stretches the video to fill the view without preserving aspect ratio.

Choose the mode based on UI and layout requirements.

***

## isVideoMirrored

```ts
isVideoMirrored?: boolean
```

Determines whether the preview image is horizontally mirrored.

- `true`
  The preview is mirrored, typically used for front-facing cameras.

- `false` (default)
  The preview is displayed in its original orientation.

> Note:
> This property affects **preview rendering only** and does not change how the recorded video file is encoded.

***

## cornerRadius

```ts
cornerRadius?: number
```

Specifies the corner radius applied to the preview view’s background.

- Default value: `0`
- Affects only the view’s background by default
- To clip the video content itself, `masksToBounds` must be set to `true`

***

## masksToBounds

```ts
masksToBounds?: boolean
```

Controls whether the preview content is clipped to the view’s bounds.

- `false` (default)
  Rounded corners apply only to the background; the video content is not clipped.

- `true`
  The video content is clipped to the rounded corners.

Typically used together with `cornerRadius`.

***

## Lifecycle and Update Behavior

### Relationship with Declarative UI Frameworks

`VideoRecorderPreviewView` is a declarative component whose underlying native preview layer (for example, an `AVCaptureVideoPreviewLayer`) is intended to persist across updates.

Important considerations:

- **Recreating the view instance**
  May cause the underlying preview layer to be rebound to the capture session.

- **Frequent view reconstruction**
  Can lead to brief stutters, flashes, or preview interruptions.

***

### Importance of the `key` Property

In dynamic UI scenarios such as camera switching or session reconfiguration:

```tsx
<VideoRecorderPreviewView
  key="videoRecorder"
  ...
/>
```

Best practices:

- Always provide a stable, unique `key`
- Ensures the preview view remains correctly bound to the current capture session
- Prevents unnecessary destruction and recreation caused by diffing mismatches

***

## Cooperation with VideoRecorder

### Capture Session Source

Internally, `VideoRecorderPreviewView` binds to:

```ts
VideoRecorder.session
```

The preview view does not create or manage the session itself.

***

### Behavior When the Session Is Reset

When calling:

```ts
await VideoRecorder.reset()
```

- The underlying `AVCaptureSession` is stopped and released
- The preview may freeze or display a blank frame
- After calling `prepare` again, the preview resumes automatically

No additional handling is required in the preview view.

***

## Gestures and Interaction Composition

`VideoRecorderPreviewView` does **not** include built-in gesture handling.
Instead, it is designed to compose with the gesture system:

```tsx
<VideoRecorderPreviewView
  gesture={
    MagnifyGesture()
      .onChanged(details => {
        VideoRecorder.setZoomFactor(...)
      })
  }
/>
```

Common interaction patterns:

- Pinch gesture → adjust zoom via `setZoomFactor`
- Tap gesture → convert to normalized coordinates and call `setFocusPoint`
- Long press → lock or adjust exposure

***

## Usage Recommendations

- Avoid recreating the preview view while in the `recording` state
- When switching cameras:

  1. Call `VideoRecorder.reset()`
  2. Call `VideoRecorder.prepare(...)`
  3. Keep the preview view `key` stable
- Apply mirroring, rounding, and clipping at the preview layer
- Perform all recording control through `VideoRecorder`, not the preview view

***

## Minimal Example

```tsx
<VideoRecorderPreviewView
  key="videoRecorder"
  videoGravity="resizeAspectFill"
  isVideoMirrored={true}
  cornerRadius={12}
  masksToBounds={true}
/>
```

***

## Summary

`VideoRecorderPreviewView` is a **pure rendering component**:

- Renders the live camera feed
- Does not manage recording state or lifecycle
- Depends on `VideoRecorder` via a one-way capture session relationship
- Designed for flexible composition with gestures and UI layout
