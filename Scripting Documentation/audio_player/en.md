The `AVPlayer` API allows you to play audio or video with various customizable options. Below is a detailed guide on how to use this API effectively, with notes on best practices and potential issues.

---

## Getting Started

To use `AVPlayer`, create an instance and set the media source using `setSource()`. Configure the desired playback options like `volume` or `rate`, and start playback with `play()`.

```typescript
const player = new AVPlayer()

// Set the media source (local or remote)
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

- **`volume`**: `number`
    - Controls the playback volume, ranging from `0.0` (muted) to `1.0` (full volume).
    - Example:
      ```typescript
      player.volume = 0.5 // Set to 50% volume
      ```

- **`duration`**: `DurationInSeconds`
    - The total duration of the media. Will be `0` until the media is ready.
    - Example:
      ```typescript
      console.log(`Media duration: ${player.duration} seconds`)
      ```

- **`currentTime`**: `DurationInSeconds`
    - The current playback position. Can also be set to seek to a specific time.
    - Example:
      ```typescript
      player.currentTime = 30 // Seek to 30 seconds
      ```

- **`rate`**: `number`
    - Controls playback speed. `1.0` is normal speed; higher values increase speed.
    - Example:
      ```typescript
      player.rate = 1.5 // Play 1.5x faster
      ```

- **`timeControlStatus`**: `TimeControlStatus`
    - Indicates playback state (e.g., playing, paused, waiting).

- **`numberOfLoops`**: `number`
    - Sets how many times the media should loop. `0` for no loops, `-1` for infinite loops.
    - Example:
      ```typescript
      player.numberOfLoops = -1 // Loop indefinitely
      ```

### Methods

- **`setSource(filePathOrURL: string): boolean`**
    - Sets the media source. Accepts a local file path or a remote URL.
    - Returns `true` on success.

- **`play(): boolean`**
    - Starts playback. Returns `true` if successful.

- **`pause()`**
    - Pauses playback.

- **`stop()`**
    - Stops playback and resets to the beginning.

- **`dispose()`**
    - Releases all resources. Must be called when the player is no longer needed.

### Callbacks

- **`onReadyToPlay?: () => void`**
    - Called when the media is ready to play.

- **`onTimeControlStatusChanged?: (status: TimeControlStatus) => void`**
    - Called when the playback status changes.

- **`onEnded?: () => void`**
    - Called when playback ends.

- **`onError?: (message: string) => void`**
    - Called when an error occurs.

---

## Handling Audio Sessions

The `AVPlayer` API relies on the system's shared audio session. Here are key considerations:

1. **Audio Session Interruption**
    - Register an interruption listener using `SharedAudioSession.addInterruptionListener` to handle interruptions such as incoming calls.
    - Example:
      ```typescript
      SharedAudioSession.addInterruptionListener((type) => {
          if (type === 'began') {
              player.pause()
          } else if (type === 'ended') {
              player.play()
          }
      })
      ```

2. **Category and Options**
    - Set the appropriate audio session category and options based on the use case.
    - Example:
      ```typescript
      await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
      ```

3. **Activation**
    - Activate the audio session before playback.
    - Example:
      ```typescript
      await SharedAudioSession.setActive(true)
      ```

---

## Common Use Cases

### Play Remote Audio

```typescript
player.setSource("https://example.com/audio.mp3")
player.onReadyToPlay = () => {
    player.play()
}
```

### Play Local Audio

```typescript
player.setSource("/path/to/local/audio.mp3")
player.play()
```

### Handle Playback Events

```typescript
player.onEnded = () => {
    console.log("Playback finished.")
}
player.onError = (message) => {
    console.error("Playback error:", message)
}
```

### Loop Playback

```typescript
player.numberOfLoops = 3 // Loop 3 times
player.play()
```

---

## Best Practices

1. **Resource Management**
    - Always call `dispose()` when the player is no longer needed.

2. **Error Handling**
    - Implement `onError` to handle playback issues, such as network failures.

3. **Audio Session Configuration**
    - Configure the audio session category and options appropriately for your app's behavior.

4. **Interruption Management**
    - Use interruption listeners to pause and resume playback gracefully.

5. **Optimize for User Experience**
    - Provide UI feedback for loading and playback states using `onReadyToPlay` and `onTimeControlStatusChanged` callbacks.

---

## Full Example

Here is a complete example showcasing how to use the `AVPlayer` API:

```typescript
// Create an instance of AVPlayer
const player = new AVPlayer()

// Configure audio session
await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
await SharedAudioSession.setActive(true)

// Set the media source
if (player.setSource("https://example.com/audio.mp3")) {
    // Register events
    player.onReadyToPlay = () => {
        console.log("Media is ready to play")
        player.play()
    }

    player.onEnded = () => {
        console.log("Playback finished")
        player.dispose()
    }

    player.onError = (message) => {
        console.error("Playback error:", message)
        player.dispose()
    }
} else {
    console.error("Failed to set media source")
}

// Handle interruptions
SharedAudioSession.addInterruptionListener((type) => {
    if (type === 'began') {
        player.pause()
    } else if (type === 'ended') {
        player.play()
    }
})
```

