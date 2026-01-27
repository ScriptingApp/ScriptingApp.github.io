---
title: VideoPlayer

---
        
The `VideoPlayer` view integrates a powerful `AVPlayer` backend with a simple, customizable front-end UI for playing video and audio content. With this setup, you can easily load media, control playback, handle events, and even add custom overlays.

## Overview

`VideoPlayer` requires an `AVPlayer` instance, which you configure to load your media, control its playback (play, pause, stop), and respond to events like when the video is ready or ends. The `overlay` prop allows you to place interactive UI elements over the video content, below any system playback controls.

**Key points:**

- Control playback through the `AVPlayer` instance passed into `VideoPlayer`.
- Add custom UI elements on top of the video using `overlay`.
- Listen for events like `onReadyToPlay`, `onEnded`, or `onError` to react to media lifecycle states.

## Basic Usage

First, create and configure the `AVPlayer` instance:

```tsx
const player = new AVPlayer()

// Set the media source: local file path or remote URL
player.setSource("https://example.com/video.mp4")

// When the media is ready, start playing
player.onReadyToPlay = () => {
  console.log("Media is ready, starting playback.")
  player.play()
}

// Handle playback state changes
player.onTimeControlStatusChanged = (status) => {
  console.log("Playback status changed:", status)
}

// Handle the end of playback
player.onEnded = () => {
  console.log("Playback ended.")
}

// Handle errors
player.onError = (message) => {
  console.error("Playback error:", message)
}

// Configure playback properties
player.volume = 1.0          // Full volume
player.rate = 1.0            // Normal speed
player.numberOfLoops = 0     // No looping
```

Then, use the `VideoPlayer` view in your UI:

```tsx
<VideoPlayer
  player={player}
  overlay={
    <HStack padding>
      <Button title="Pause" action={() => player.pause()} />
      <Button title="Play" action={() => player.play()} />
    </HStack>
  }
/>
```

This displays the video with your custom controls positioned at the bottom-left corner.

## Example Scenario

Imagine you want a video with custom controls and automatic replay:

```tsx
function VideoPlayerView() {
  const player = useMemo(() => new AVPlayer(), [])

  useEffect(() => {
    player.setSource(
      Path.join(
        Script.directory,
        "localvideo.mp4"
      )
    )
    player.onReadyToPlay = () => player.play()
    player.onEnded = () => player.play() // Restart video automatically when ended

    
    // Setup shared audio session.
    SharedAudioSession.setActive(true)
    SharedAudioSession.setCategory(
      'playback',
      ['mixWithOthers']
    )

    return () => {
      // Dispose the AVPlayer instance when the view to be destroied.
      player.dispose()
    }
  }, [])

  return <VideoPlayer
    player={player}
    overlay={
      <HStack padding>
        <Button title="Pause" action={() => player.pause()} />
        <Button title="Resume" action={() => player.play()} />
      </HStack>
    }
    frame={{
      height: 300
    }}
  />
}
```

This setup:

- Loads and plays a local video file immediately when ready.
- Automatically replays the video once it ends.
- Provides custom pause/resume controls overlaid on the bottom-right corner.

## Summary

The `VideoPlayer` component, powered by an `AVPlayer` instance, gives you fine-grained control over video playback in your app. From adjusting volume and playback speed to handling buffering states and errors, and even layering your own UI controls over the video, the `VideoPlayer` component and `AVPlayer` class allow for a rich and interactive media experience.