---
title: VideoPreviewView

---

`VideoPreviewView` is a UI component that displays the live camera preview associated with a `VideoRecorder` instance.
It renders the real-time output of the recorder’s capture session and serves as the visual foundation for custom camera interfaces.

`VideoPreviewView` does **not** control recording behavior. All recording logic—preparation, start, pause, resume, stop, and disposal—is handled exclusively by `VideoRecorder`.

---

## Purpose and Responsibilities

* Display the live camera preview from a `VideoRecorder`
* Automatically follow the lifecycle of the recorder’s capture session
* Serve as a composable preview layer for custom camera UIs
* Support layout and sizing through standard view props such as `frame` and `aspectRatio`

---

## Component Definition

```ts
type VideoPreviewViewProps = {
  recorder: VideoRecorder
}

declare const VideoPreviewView: FunctionComponent<VideoPreviewViewProps>
```

---

## Props

### recorder

```ts
recorder: VideoRecorder
```

The `VideoRecorder` instance that provides the preview source.

#### Behavior

* After `recorder.prepare()` completes successfully, the preview becomes available.
* When `recorder.dispose()` is called, the preview stops and underlying resources are released.
* `VideoPreviewView` does not own the recorder lifecycle; it only references it.

---

## Relationship to VideoRecorder State

The preview behavior typically correlates with `VideoRecorder.state` as follows (exact behavior may vary slightly by system):

| Recorder State | Preview Behavior                    |
| -------------- | ----------------------------------- |
| `idle`         | No preview or empty output          |
| `preparing`    | Preview may not yet be available    |
| `ready`        | Preview is available                |
| `recording`    | Live, continuously updating preview |
| `paused`       | Usually frozen at the last frame    |
| `finishing`    | Preview stops updating              |
| `finished`     | Preview stopped                     |
| `failed`       | Preview unavailable                 |

---

## Recommended Lifecycle Management

`VideoRecorder` should be created at the page level and disposed of when the page is dismissed.

Recommended practices:

* Create the recorder using `useMemo` to avoid unnecessary re-instantiation.
* Assign `onStateChanged` inside `useEffect`.
* Call `recorder.dispose()` in the cleanup function.
* Always call `await recorder.prepare()` before starting a recording.

---

## Complete Example

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

## Layout and Rendering Guidance

### Controlling Size with `frame`

`VideoPreviewView` supports standard layout props such as `frame`.

Examples:

* Specify only `width` and rely on `aspectRatio` to determine height
* Specify both `width` and `height` to force a fixed size (may crop or stretch depending on aspect ratio)

---

### Controlling Aspect Ratio

```tsx
<VideoPreviewView
  recorder={recorder}
  aspectRatio={{
    value: 3 / 4,
    contentMode: "fill"
  }}
/>
```

* `value`: width-to-height ratio
* `contentMode: "fill"`: fills the view and crops if necessary
* Use `contentMode: "fit"` (if supported by your common props) to fully contain the preview with possible letterboxing

---

## Important Notes

### Preparation Is Required

Binding a `VideoRecorder` to `VideoPreviewView` does not automatically start the capture session.

If `prepare()` is not called:

* The preview may remain empty
* The preview may become available only intermittently
* Relying on implicit behavior is discouraged

Best practice: explicitly call `await recorder.prepare()` before recording, as shown in the example.

---

### Resource Cleanup

* Always call `recorder.dispose()` when leaving the page or when the preview is no longer needed.
* Failing to dispose may keep the camera active, increase power usage, or block subsequent camera access.

---

### Error Handling

When `state === "failed"`:

* Display `details` to the user (for example, using `Dialog.alert`)
* Disable recording controls
* Optionally allow retry by calling `await recorder.reset()` followed by `prepare()`

---

## Responsibility Boundary

* **VideoRecorder**
  Controls recording logic, state transitions, and resource management.

* **VideoPreviewView**
  Renders the camera preview and participates only in UI layout.

This separation keeps recording logic deterministic and the UI layer composable.
