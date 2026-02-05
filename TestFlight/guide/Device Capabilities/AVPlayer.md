# AVPlayer

`AVPlayer` provides audio and video playback capabilities, including playback control, rate control, looping, playback state observation, and media metadata loading.

You set a media source using `setSource()` (local file or remote URL), then start playback using `play()`.

***

## Getting Started

```ts
const player = new AVPlayer()

if (player.setSource("https://example.com/audio.mp3")) {
  player.onReadyToPlay = () => {
    player.play()
  }

  player.onEnded = () => {
    console.log("Playback finished")
  }
} else {
  console.error("Failed to set media source")
}
```

***

## API Reference

### Properties

#### `volume: number`

Controls the playback volume.
Range: `0.0` (muted) to `1.0` (maximum).

```ts
player.volume = 0.5
```

***

#### `duration: DurationInSeconds`

The total duration of the media in seconds.
This value is `0` until the media has finished loading.

```ts
console.log(player.duration)
```

***

#### `currentTime: DurationInSeconds`

The current playback position in seconds.
You can assign a value to seek to a specific time.

```ts
player.currentTime = 30
```

***

#### `rate: number`

The **current playback rate**.

- `1.0` = normal speed
- `< 1.0` = slower playback
- `> 1.0` = faster playback

This property reflects the actual playback speed while playing.

```ts
player.rate = 1.25
```

***

#### `defaultRate: number`

The **default playback rate used when playback starts**.

- Used when calling `play()` **without** specifying `atRate`
- Changing `defaultRate` does **not** immediately affect an ongoing playback
- Primarily intended to control the rate for the _next_ playback start

```ts
player.defaultRate = 1.5
```

Typical use cases:

- The user selects a preferred playback speed before pressing play
- Playback automatically starts at that speed next time `play()` is called

***

#### `timeControlStatus: TimeControlStatus`

Indicates the current playback state:

- `paused`
  Playback is paused or has not started
- `waitingToPlayAtSpecifiedRate`
  Waiting for playback conditions (e.g. buffering, network)
- `playing`
  Playback is in progress

***

#### `numberOfLoops: number`

Controls how many times the media will loop:

- `0`: no looping
- positive value: loop a specific number of times
- negative value: loop indefinitely

```ts
player.numberOfLoops = -1
```

***

### Methods

#### `setSource(filePathOrURL: string): boolean`

Sets the media source for playback.

Supports:

- Local file paths
- Remote URLs

Returns:

- `true` if the source was set successfully
- `false` if it failed

***

#### `play(atRate?: number): boolean`

Starts playback of the current media.

Playback rate resolution order:

1. If `atRate` is provided, playback starts at that rate
2. Otherwise, `defaultRate` is used

During playback, you can still modify `rate` dynamically.

```ts
player.play()        // Uses defaultRate
player.play(1.25)    // Starts playback at 1.25× speed
```

Returns:

- `true` if playback started successfully
- `false` otherwise

***

#### `pause()`

Pauses playback.

***

#### `stop()`

Stops playback and resets the position to the beginning.

***

#### `dispose()`

Releases all player resources and removes internal observers.
Must be called when the player is no longer needed to avoid resource leaks.

***

#### `loadMetadata(): Promise<AVMetadataItem[] | null>`

Loads the full metadata of the current media.

Returns:

- An array of `AVMetadataItem`
- `null` if no source is set or metadata is unavailable

```ts
const metadata = await player.loadMetadata()
```

***

#### `loadCommonMetadata(): Promise<AVMetadataItem[] | null>`

Loads the _common metadata_ of the current media.

Common metadata provides format-independent `commonKey` values, typically used for title, artist, album, etc.

```ts
const common = await player.loadCommonMetadata()
```

***

### Callbacks

#### `onReadyToPlay?: () => void`

Called when the media is ready for playback.

***

#### `onTimeControlStatusChanged?: (status: TimeControlStatus) => void`

Called whenever the playback state changes, such as:

- waiting → playing
- playing → paused

***

#### `onEnded?: () => void`

Called when playback finishes.

***

#### `onError?: (message: string) => void`

Called when a playback error occurs.
Receives a descriptive error message.

***

## Audio Session Notes

`AVPlayer` relies on the system’s shared audio session.
You should configure and activate it before playback.

```ts
await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)
```

Handling interruptions (e.g. phone calls):

```ts
SharedAudioSession.addInterruptionListener(type => {
  if (type === 'began') {
    player.pause()
  } else if (type === 'ended') {
    player.play()
  }
})
```

***

## Common Usage Examples

### Play Using the Default Rate

```ts
player.defaultRate = 1.5
player.play()
```

***

### Start Playback at a Specific Rate

```ts
player.play(2.0)
```

***

### Loop Playback

```ts
player.numberOfLoops = 3
player.play()
```

***

### Read Common Metadata

```ts
const metadata = await player.loadCommonMetadata()
if (metadata) {
  const title = metadata.find(i => i.commonKey === 'title')
  console.log(await title?.stringValue)
}
```

***

## Best Practices

1. **Differentiate `defaultRate` vs `rate`**

   - `defaultRate` affects how playback _starts_
   - `rate` reflects or controls the _current_ playback speed

2. **Always Release Resources**

   - Call `dispose()` when playback ends or the player is no longer needed

3. **Observe Playback State**

   - Use `onTimeControlStatusChanged` to update loading or playing UI states

4. **Configure Audio Session Before Playing**

   - Prevent unexpected background, mute, or mixing behavior

5. **Metadata Timing**

   - Reading metadata after `onReadyToPlay` is more reliable

***

## Full Example

```ts
const player = new AVPlayer()

await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)

player.defaultRate = 1.25

if (player.setSource("https://example.com/audio.mp3")) {
  player.onReadyToPlay = () => {
    player.play()
  }

  player.onEnded = () => {
    console.log("Playback finished")
    player.dispose()
  }

  player.onError = message => {
    console.error("Playback error:", message)
    player.dispose()
  }

  const metadata = await player.loadCommonMetadata()
  if (metadata) {
    const title = metadata.find(i => i.commonKey === 'title')
    console.log("Title:", await title?.stringValue)
  }
}
```
