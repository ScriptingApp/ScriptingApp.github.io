# AVPlayerView

`AVPlayerView` is a video playback component introduced in Scripting that wraps the system-native `AVPlayerViewController`.
Unlike `VideoPlayer`, `AVPlayerView` **fully supports system Picture in Picture (PiP)** and exposes PiP lifecycle state to scripts.

This component is intended for **media-centric scenarios** where native playback behavior, PiP, Now Playing integration, and background playback are required.

***

## 1. When to Use AVPlayerView

Use `AVPlayerView` when you need:

- System Picture in Picture (PiP) for video
- Native playback controls
- Integration with Now Playing / Control Center / Lock Screen
- Automatic PiP when entering background
- Fine-grained observation of PiP lifecycle

If you do **not** need PiP, `VideoPlayer` remains a lighter alternative.

***

## 2. Core Properties Explained

### 2.1 `player`

```ts
player: AVPlayer
```

- The underlying media player
- Fully managed by the developer
- Supports local files, remote URLs, HLS streams, etc.

`AVPlayerView` **does not own the player lifecycle**.
The player must remain alive while PiP is active.

***

### 2.2 `pipStatus`

```ts
pipStatus: Observable<PIPStatus>
```

Provides real-time updates for the PiP lifecycle.

Possible values:

| Value              | Meaning               |
| ------------------ | --------------------- |
| `willStart`        | PiP is about to start |
| `didStart`         | PiP has started       |
| `willStop`         | PiP is about to stop  |
| `didStop`          | PiP has stopped       |
| `undefined / null` | No PiP activity yet   |

This value is **system-controlled**.
You should **observe it only**, never assign values manually.

***

## 3. Picture in Picture Configuration

### 3.1 `allowsPictureInPicturePlayback`

- Enables or disables PiP entirely
- Default: `true`

When set to `false`:

- PiP controls are hidden
- PiP cannot be activated

***

### 3.2 `canStartPictureInPictureAutomaticallyFromInline`

- If enabled, PiP starts automatically when:

  - The app moves to background
  - Video is playing inline
- Default: `false`

Recommended for:

- Media apps
- Continuous playback experiences

***

### 3.3 `updatesNowPlayingInfoCenter`

- Controls automatic updates to:

  - Lock screen
  - Control Center
  - External playback controls
- Default: `true`

Should generally remain enabled for video playback apps.

***

## 4. Full-Screen Playback Behavior

### 4.1 `entersFullScreenWhenPlaybackBegins`

- Automatically enters full screen on play
- Default: `false`

***

### 4.2 `exitsFullScreenWhenPlaybackEnds`

- Automatically exits full screen on completion
- Default: `false`

***

## 5. Video Scaling (`videoGravity`)

```ts
videoGravity?: AVLayerVideoGravity
```

| Value              | Behavior                                    |
| ------------------ | ------------------------------------------- |
| `resize`           | Stretch to fill (no aspect ratio)           |
| `resizeAspect`     | Preserve aspect ratio, fit inside (default) |
| `resizeAspectFill` | Preserve aspect ratio, fill and crop        |

***

## 6. Complete Demo Example

The following example demonstrates:

- Creating and configuring `AVPlayer`
- Activating audio playback session
- Observing PiP lifecycle
- Controlling playback state
- Proper cleanup

```tsx
function Example() {
  const dismiss = Navigation.useDismiss()
  const [status, setStatus] = useState<TimeControlStatus>(
    TimeControlStatus.paused
  )
  const pipstatus = useObservable<PIPStatus>()

  console.log(pipstatus.value)

  const player = useMemo(() => {
    const player = new AVPlayer()

    player.setSource(
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    )

    player.onTimeControlStatusChanged = status => {
      setStatus(status)
    }

    SharedAudioSession.setActive(true)
    SharedAudioSession.setCategory(
      "playback",
      ["defaultToSpeaker"]
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
      navigationTitle="VideoPlayer"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        cancellationAction: <Button
          title="Done"
          action={dismiss}
        />
      }}
    >
      <AVPlayerView
        player={player}
        pipStatus={pipstatus}
        canStartPictureInPictureAutomaticallyFromInline
        updatesNowPlayingInfoCenter
        entersFullScreenWhenPlaybackBegins
      />

      <Button
        title={
          status === TimeControlStatus.paused
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
  </NavigationStack>
}
```

***

## 7. PiP Lifecycle Notes

Typical PiP state progression:

1. `willStart`
2. `didStart`
3. PiP running
4. `willStop`
5. `didStop`

The system may skip stages in error or interruption scenarios.
Always treat `didStart` and `didStop` as authoritative.

***

## 8. Important Notes and Constraints

### 8.1 AVPlayerView PiP is System-Level PiP

- Uses native video PiP
- Completely separate from Scripting’s custom PiP View Modifiers
- These two mechanisms must not be mixed

***

### 8.2 Audio Session Is Required

For PiP to work reliably:

- An active audio session is required
- Category should be `playback`
- Background audio capability must be enabled

Failing to configure the audio session may cause PiP to fail silently.

***

### 8.3 Do Not Dispose AVPlayer While PiP Is Active

- Disposing or replacing `AVPlayer` during PiP
- Will force PiP to stop unexpectedly
- May result in system errors

Always wait until `pipStatus` reaches `didStop` before releasing the player.

***

## 9. Recommended Best Practices

- Use `AVPlayerView` exclusively for video PiP
- Treat `pipStatus` as read-only state
- Keep `AVPlayer` lifecycle stable during PiP
- Configure audio session explicitly
- Avoid frequent player replacement
- Clean up resources only after PiP has fully stopped
