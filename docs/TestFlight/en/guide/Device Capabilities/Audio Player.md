---
title: Audio Player
description: The interface allows for playback of both local and network audio sources, and offers controls such as play, pause, stop, volume, and more.

---

The `AVPlayer` class provides audio and video playback capabilities with support for playback control, looping, event callbacks, and metadata retrieval.
You can use `setSource()` to set a media source (either a local file or a remote URL) and call `play()` to start playback.

---

## Getting Started

Example usage of `AVPlayer`:

```typescript
const player = new AVPlayer()

// Set the media source (local file or remote URL)
if (player.setSource("https://example.com/audio.mp3")) {
    player.onReadyToPlay = () => {
        player.play()
    }
    player.onEnded = () => {
        console.log("Playback finished.")
    }
} else {
    console.error("Failed to set media source.")
}
```

---

## API Reference

### Properties

#### `volume: number`

Controls the playback volume, ranging from `0.0` (muted) to `1.0` (maximum).

```typescript
player.volume = 0.5 // Set to 50% volume
```

---

#### `duration: DurationInSeconds`

The total duration of the media in seconds.
This value will be `0` until the media is fully loaded.

```typescript
console.log(`Media duration: ${player.duration} seconds`)
```

---

#### `currentTime: DurationInSeconds`

The current playback time in seconds.
You can set this value to seek to a specific time.

```typescript
player.currentTime = 30 // Seek to 30 seconds
```

---

#### `rate: number`

Controls the playback speed.
A value of `1.0` is normal speed; values below `1.0` slow down playback, and values above `1.0` speed it up.

```typescript
player.rate = 1.5 // Play at 1.5× speed
```

---

#### `timeControlStatus: TimeControlStatus`

Indicates the current playback state.
Possible values:

* `paused`: playback is paused
* `waitingToPlayAtSpecifiedRate`: waiting for conditions to start (e.g., buffering)
* `playing`: currently playing

---

#### `numberOfLoops: number`

Sets how many times the media will loop.

* `0`: no looping
* positive value: specific number of loops
* negative value: infinite looping

```typescript
player.numberOfLoops = -1 // Infinite looping
```

---

### Methods

#### `setSource(filePathOrURL: string): boolean`

Sets the media source for playback.
Accepts a local file path or a remote URL.

Returns:

* `true` if successfully set
* `false` if setting failed

---

#### `play(): boolean`

Starts playback of the current media.

Returns:

* `true` if playback started successfully
* `false` if it failed to start

---

#### `pause()`

Pauses the current playback.

---

#### `stop()`

Stops playback and resets the position to the beginning.

---

#### `dispose()`

Releases all player resources and removes observers.
Call this method when the player is no longer needed to avoid memory leaks.

---

#### `loadMetadata(): Promise<AVMetadataItem[] | null>`

Loads detailed metadata for the current media file.

Returns:

* An array of `AVMetadataItem` objects
* `null` if no metadata is available or no source has been set

Example:

```typescript
const metadata = await player.loadMetadata()
if (metadata) {
  for (const item of metadata) {
    console.log(item.key, await item.stringValue)
  }
}
```

---

#### `loadCommonMetadata(): Promise<AVMetadataItem[] | null>`

Loads the *common metadata* of the current media, where each `AVMetadataItem` provides a `commonKey` that can be used across media formats.

Example:

```typescript
const commonMetadata = await player.loadCommonMetadata()
if (commonMetadata) {
  const titleItem = commonMetadata.find(i => i.commonKey === "title")
  console.log("Title:", await titleItem?.stringValue)
}
```

---

### Callbacks

#### `onReadyToPlay?: () => void`

Called when the media is ready for playback.

---

#### `onTimeControlStatusChanged?: (status: TimeControlStatus) => void`

Called when the playback state changes, such as from “waiting” to “playing.”

---

#### `onEnded?: () => void`

Called when playback finishes.

---

#### `onError?: (message: string) => void`

Called when an error occurs during playback.
Receives an error message as an argument.

---

## Audio Session Handling

`AVPlayer` relies on the system’s shared audio session.
You can configure it using `SharedAudioSession` to ensure correct playback behavior.

```typescript
await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)
```

Handling interruptions (such as phone calls):

```typescript
SharedAudioSession.addInterruptionListener((type) => {
  if (type === 'began') player.pause()
  else if (type === 'ended') player.play()
})
```

---

## Common Use Cases

### Play Remote Audio

```typescript
player.setSource("https://example.com/audio.mp3")
player.onReadyToPlay = () => player.play()
```

---

### Play Local File

```typescript
player.setSource("/path/to/audio.mp3")
player.play()
```

---

### Loop Playback

```typescript
player.numberOfLoops = 3 // Loop 3 times
player.play()
```

---

### Retrieve Metadata

```typescript
const metadata = await player.loadCommonMetadata()
if (metadata) {
  const artist = metadata.find(i => i.commonKey === "artist")
  console.log("Artist:", await artist?.stringValue)
}
```

---

## Best Practices

1. **Resource Management**
   Always call `dispose()` after playback to release system resources.

2. **Error Handling**
   Implement the `onError` callback to handle playback issues gracefully (e.g., network failures).

3. **Interruption Management**
   Use audio session interruption listeners to pause and resume playback smoothly.

4. **UI State Updates**
   Use `onTimeControlStatusChanged` to update your UI when the playback state changes.

5. **Metadata Usage**
   Use `loadCommonMetadata()` to retrieve general information such as title, artist, or album artwork for display in your app’s UI.

---

## Full Example

```typescript
const player = new AVPlayer()

await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)

if (player.setSource("https://example.com/audio.mp3")) {
  player.onReadyToPlay = () => player.play()
  player.onEnded = () => {
    console.log("Playback finished")
    player.dispose()
  }
  player.onError = (message) => {
    console.error("Playback error:", message)
    player.dispose()
  }

  // Load metadata
  const commonMetadata = await player.loadCommonMetadata()
  if (commonMetadata) {
    const titleItem = commonMetadata.find(i => i.commonKey === "title")
    console.log("Title:", await titleItem?.stringValue)
  }
} else {
  console.error("Failed to set media source")
}
```
