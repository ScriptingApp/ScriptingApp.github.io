---
title: Example
description: Learn how to use VideoRecorder.
tag: PRO
---

```tsx
import { Button, Navigation, NavigationStack, Script, useEffect, Path, MagnifyGesture, useObservable, VideoRecorderPreviewView, VStack, Toolbar, ToolbarItem, ToolbarItemGroup } from "scripting"

const recorder = VideoRecorder

function View() {
  // Access dismiss function.
  const dismiss = Navigation.useDismiss()
  const state = useObservable<VideoRecorder.State>("idle")
  const displayZoom = useObservable(1)
  const startZoom = useObservable(1)
  const volume = useObservable(0)
  const toastVisible = useObservable(false)
  const toastMessage = useObservable("")
  const position = useObservable<VideoRecorder.CameraPosition>("back")

  function showToast(message: string) {
    toastVisible.setValue(true)
    toastMessage.setValue(message)
  }

  useEffect(() => {

    const listener = (value: number, old: number) => {
      console.log("old:", old, "new:", value)
      volume.setValue(value)
    }
    SharedAudioSession.addOutputVolumeListener(listener)

    return () => {
      SharedAudioSession.removeOutputVolumeListener(listener)
    }
  }, [])

  async function prepare() {
    await recorder.prepare({
      camera: {
        position: position.value,
        // preferredTypes: ["triple"]
      },
      frameRate: 30,
      audioEnabled: true,
      orientation: "portrait",
      sessionPreset: "high",
      videoCodec: "appleProRes4444XQ",
      // autoConfigAppAudioSession: false
    })
  }

  useEffect(() => {
    prepare().then(() => {
      recorder.start(
        Path.join(
          FileManager.documentsDirectory,
          "test.mov"
        )
      )
    }).catch(e => {
      showToast("Failed to prepare:" + String(e))
    })
    recorder.addStateListener((
      newState, details
    ) => {
      state.setValue(newState)

      if (newState === "ready") {
        // recorder.rampZoomFactor(0.5, 4
      }

      if (newState === "failed") {
        Dialog.alert(details!)
      }

    })

    return () => {
      recorder.reset()
    }
  }, [])

  return <NavigationStack>
    <VStack
      toolbar={
        <Toolbar>
          <ToolbarItem
            placement="topBarLeading"
          >
            <Button
              title="Done"
              systemImage="xmark"
              action={dismiss}
            />
          </ToolbarItem>
          <ToolbarItem
            placement="topBarTrailing"
          >
            <Button
              title="Toggle Torch"
              action={() => {
                if (recorder.torchMode === "on") {
                  recorder.setTorchMode("off")
                } else {
                  recorder.setTorchMode("on")
                }
              }}
            />
          </ToolbarItem>
          <ToolbarItemGroup
            placement="bottomBar"
          >
            {state.value == "idle" && <Button
              title="Prepare"
              action={async () => {
                try {
                  await recorder.prepare()
                } catch (e) {
                  showToast("Failed to prepare:" + e)
                }
              }}
            />}
            {(state.value == "idle" || state.value == "ready") && <Button
              title="Toggle Camera"
              action={async () => {
                try {
                  position.setValue(
                    position.value == "back"
                      ? "front"
                      : "back"
                  )
                  await recorder.reset()
                  await prepare()
                } catch (e) {
                  showToast("Failed to toggle camera:" + e)
                }
              }}
            />}
            {state.value == "ready" && <Button
              title="Start"
              action={async () => {
                try {
                  await recorder.start(
                    Path.join(
                      FileManager.documentsDirectory,
                      "test.mov"
                    )
                  )
                } catch (e) {
                  showToast("Failed to start:" + e)
                }
              }}
            />}
            {state.value == "recording" && <Button
              title="Pause"
              action={async () => {
                try {
                  await recorder.pause()
                } catch (e) {
                  console.error("Failed to call pause", e)
                }
              }}
            />}
            {state.value == "paused" && <Button
              title="Resume"
              action={async () => {
                try {
                  await recorder.resume()
                } catch (e) {
                  showToast("Failed to resume:" + e)
                }
              }}
            />}
            {state.value == "recording" && <Button
              title="Cancel"
              action={async () => {
                try {
                  await recorder.cancel()
                } catch (e) {
                  showToast("Failed to cancel:" + e)
                }
              }}
            />}
            {state.value == "recording" && <Button
              title="Stop"
              action={async () => {
                try {
                  await recorder.stop()
                  await prepare()
                } catch (e) {
                  showToast("Failed to stop: " + e)
                }
              }}
            />}
          </ToolbarItemGroup>
        </Toolbar>
      }
      toast={{
        isPresented: toastVisible,
        message: toastMessage.value,
        position: "top"
      }}
    >

      {/*  <Text>State: {state.value}</Text>
      <Text>OutputVolume: {volume.value}</Text> */}
      <VideoRecorderPreviewView
        key="videoRecorder"
        ignoresSafeArea
        frame={{
          width: Device.screen.width
        }}
        aspectRatio={{
          value: 3 / 4,
          contentMode: "fill"
        }}
        gesture={
          MagnifyGesture()
            .onChanged(details => {
              recorder.setZoomFactor(
                details.magnification * startZoom.value
              )
              displayZoom.setValue(
                recorder.displayZoomFactor
              )
            })
            .onEnded(details => {
              recorder.setZoomFactor(
                details.magnification * startZoom.value
              )
              displayZoom.setValue(
                recorder.displayZoomFactor
              )
              startZoom.setValue(
                recorder.currentZoomFactor
              )
            })
        }
      />
    </VStack >
  </NavigationStack >
}

async function run() {
  // Present view.
  await Navigation.present({
    element: <View />
  })

  // Avoiding memory leaks.
  Script.exit()
}

run()
```