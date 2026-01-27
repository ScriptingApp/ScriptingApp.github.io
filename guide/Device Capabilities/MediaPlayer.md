# MediaPlayer

The `MediaPlayer` API allows you to interact with the Now Playing Center, manage Now Playing Info, and respond to remote control events. Below is a comprehensive guide on its usage, including best practices and examples.

***

## Getting Started

The `MediaPlayer` API provides control over media playback information and remote command handling. To get started:

1. Set the `nowPlayingInfo` to display current media information.
2. Configure available commands using `setAvailableCommands()`.
3. Register a `commandHandler` to respond to remote events.

```typescript
MediaPlayer.nowPlayingInfo = {
  title: "Song Title",
  artist: "Artist Name",
  playbackRate: 1.0,
  elapsedPlaybackTime: 30,
  playbackDuration: 240
}

MediaPlayer.setAvailableCommands(["play", "pause", "nextTrack", "previousTrack"])

MediaPlayer.commandHandler = (command, event) => {
  console.log(`Command received: ${command}`)
}
```

***

## API Reference

### NowPlayingInfo

The `nowPlayingInfo` object displays metadata about the currently playing media. Set it to `null` to clear the Now Playing Info Center.

**Properties:**

- **`title`**: `string` (Required)
  - The title of the media item.
- **`artist`**: `string` (Optional)
  - The artist or performer of the media item.
- **`albumTitle`**: `string` (Optional)
  - The album title of the media item.
- **`artwork`**: `UIImage` (Optional)
  - An image representing the media item.
- **`mediaType`**: `MediaType` (Optional)
  - Defaults to `audio`.
- **`playbackRate`**: `number` (Optional)
  - Defaults to `0`. Indicates the current playback rate.
- **`elapsedPlaybackTime`**: `DurationInSeconds` (Optional)
  - Defaults to `0`. The current playback time.
- **`playbackDuration`**: `DurationInSeconds` (Optional)
  - Defaults to `0`. The total duration of the media.

### Playback State

The `playbackState` property indicates the app's current playback state:

- **`unknown`**: Default state when playback status is undefined.
- **`playing`**: Media is actively playing.
- **`paused`**: Media playback is paused.
- **`stopped`**: Playback has stopped.
- **`interrupted`**: Playback is interrupted by an external event.

```typescript
if (MediaPlayer.playbackState === MediaPlayerPlaybackState.playing) {
    console.log("Media is currently playing")
}
```

### Commands and Event Handlers

#### `setAvailableCommands(commands: MediaPlayerRemoteCommand[])`

Specifies which remote commands are enabled for user interaction.

**Example:**

```typescript
MediaPlayer.setAvailableCommands(["play", "pause", "stop", "nextTrack"])
```

#### `commandHandler`

A callback to handle remote commands. Register this function to process commands like `play`, `pause`, or `seekBackward`.

**Example:**

```typescript
MediaPlayer.commandHandler = (command, event) => {
  switch (command) {
    case "play":
      console.log("Play command received")
      break
    case "pause":
      console.log("Pause command received")
      break
    default:
      console.log(`Command not handled: ${command}`)
  }
}
```

**Supported Commands:**

- `play`, `pause`, `stop`, `nextTrack`, `previousTrack`
- `seekBackward`, `seekForward`, `skipBackward`, `skipForward`
- `rating`, `like`, `dislike`, `bookmark`
- `changeRepeatMode`, `changeShuffleMode`
- `enableLanguageOption`, `disableLanguageOption`

***

## Common Use Cases

### Display Now Playing Info

```typescript
MediaPlayer.nowPlayingInfo = {
  title: "Podcast Episode",
  artist: "Podcast Host",
  elapsedPlaybackTime: 120,
  playbackDuration: 1800,
  playbackRate: 1.0
}
```

### Respond to Playback Commands

```typescript
MediaPlayer.setAvailableCommands(["play", "pause", "stop"])

MediaPlayer.commandHandler = (command, event) => {
  if (command === "play") {
    console.log("Start playback")
  } else if (command === "pause") {
    console.log("Pause playback")
  }
}
```

### Handle Custom Events

```typescript
MediaPlayer.commandHandler = (command, event) => {
  if (command === "seekForward") {
    const seekEvent = event as MediaPlayerSeekCommandEvent
    console.log(`Seek Event Type: ${seekEvent.type}`)
  }
}
```

***

## Best Practices

1. **Keep Metadata Up-to-Date:** Update `nowPlayingInfo` as playback changes.
2. **Handle All Relevant Commands:** Ensure user interactions like skipping or seeking are supported.
3. **Resource Management:** Clear `nowPlayingInfo` when playback stops to avoid stale information.
4. **Test with External Devices:** Use remote controls like headphones or car systems to validate command handling.
5. **Provide Feedback:** Inform users of successful or failed actions in response to commands.

***

## Full Example

Below is a complete implementation of `MediaPlayer`:

```typescript
// Set Now Playing Info
MediaPlayer.nowPlayingInfo = {
  title: "Song Title",
  artist: "Artist Name",
  albumTitle: "Album Name",
  playbackRate: 1.0,
  elapsedPlaybackTime: 0,
  playbackDuration: 300
}

// Enable Commands
MediaPlayer.setAvailableCommands(["play", "pause", "nextTrack", "previousTrack", "seekForward", "seekBackward"])

// Handle Commands
MediaPlayer.commandHandler = (command, event) => {
  switch (command) {
    case "play":
      console.log("Playing media")
      break
    case "pause":
      console.log("Pausing media")
      break
    case "nextTrack":
      console.log("Skipping to next track")
      break
    case "seekForward":
      const seekEvent = event as MediaPlayerSeekCommandEvent
      console.log(`Seek Event: ${seekEvent.type}`)
      break
    default:
      console.log(`Unhandled command: ${command}`)
  }
}
```
