---
title: 示例
description: VideoPlayer 视图允许您播放来自任意 URL（本地或远程）的影片。

---

```tsx
import { Button, Navigation, NavigationStack, Script, useEffect, useMemo, useState, VideoPlayer, VStack } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()
  const [status, setStatus] = useState<TimeControlStatus>(TimeControlStatus.paused)

  const player = useMemo(() => {
    const player = new AVPlayer()
    player.setSource("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
    player.onTimeControlStatusChanged = (status) => {
      setStatus(status)
    }
    SharedAudioSession.setActive(true)
    SharedAudioSession.setCategory(
      'playback',
      ['mixWithOthers']
    )
    return player
  }, [])

  useEffect(() => {
    return () => {
      player.dispose()
    }
  }, [])

  return <NavigationStack>
    <VStack
      navigationTitle={"VideoPlayer"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />
      }}
    >
      <VideoPlayer
        player={player}
        frame={{
          height: 300
        }}
      />
      <Button
        title={status === TimeControlStatus.paused
          ? "Play"
          : "Pause"
        }
        action={() => {
          if (status === TimeControlStatus.paused) {
            player.play()
          } else {
            player.pause()
          }
        }}
      />
    </VStack>
  </NavigationStack >
}

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```