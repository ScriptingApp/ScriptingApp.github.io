---
title: MediaComposer Example
description: This example shows how to use MediaComposer.

---

This example demonstrates how to use `MediaComposer` to compose a final video from **video, image, and audio sources**, and export it to the script directory.

The workflow covered in this example includes:

1. Picking an audio file
2. Picking an image
3. Picking a video
4. Building a visual timeline (video + image)
5. Inserting audio at a specific time
6. Exporting the composed video

---

## Example Code

```tsx
import { Path, Script } from "scripting"

console.present().then(() => Script.exit())

async function run() {
  try {

    const audioPath = (await DocumentPicker.pickFiles({
      types: ["public.audio"]
    })).at(0)

    if (audioPath == null) {
      console.error("no audio")
      return
    }

    console.log("Audio Picked")

    const imageResult = (await Photos.pick({
      filter: PHPickerFilter.images()
    })).at(0)

    const imagePath = await imageResult?.itemProvider.loadFilePath("public.image")

    if (!imagePath) {
      console.log("No image")
      return
    }

    console.log("Image picked")

    const videoResult = (await Photos.pick({
      filter: PHPickerFilter.videos()
    })).at(0)

    const videoPath = await videoResult?.itemProvider.loadFilePath("public.movie")

    if (videoPath == null) {
      console.log("No video")
      return
    }

    console.log("Video Picked")

    console.log("Start composing...")

    const exportPath = Path.join(
      Script.directory,
      "dest.mp4"
    )

    const exportResult = await MediaComposer.composeAndExport({
      exportPath,
      timeline: {
        videoItems: [{
          videoPath: videoPath
        }, {
          imagePath: imagePath,
          duration: MediaTime.make({
            seconds: 5,
            preferredTimescale: 600
          })
        }],
        audioClips: [{
          path: audioPath,
          at: MediaTime.make({
            seconds: 5,
            preferredTimescale: 600
          })
        }]
      }
    })

    console.log(
      "Result:",
      exportResult.exportPath,
      "\n",
      exportResult.duration.getSeconds()
    )

  } catch (e) {
    console.error(e)
  }
}

run()
```

---

## Timeline Breakdown

### Visual Timeline (videoItems)

```ts
videoItems: [
  { videoPath },
  {
    imagePath,
    duration: MediaTime.make({
      seconds: 5,
      preferredTimescale: 600
    })
  }
]
```

* The first `VideoItem` is a full video clip
* The second `VideoItem` is an image displayed for 5 seconds
* All `videoItems` are concatenated **in strict order**
* Final video duration = video duration + 5 seconds

---

### Audio Timeline (audioClips)

```ts
audioClips: [{
  path: audioPath,
  at: MediaTime.make({
    seconds: 5,
    preferredTimescale: 600
  })
}]
```

* The audio starts playing at **5 seconds** on the final timeline
* When `at` is omitted, audio clips are appended sequentially
* Audio does **not** affect the final video duration

---

## Export Result

```ts
{
  exportPath: string
  duration: MediaTime
}
```

* `exportPath`: the full output file path
* `duration`: the total video duration (derived from `videoItems`)

---

## Common Errors and Edge Cases

### 1. ImageClip without duration

```ts
{
  imagePath: "...",
  // ❌ missing duration
}
```

**Issue:**

* Images have no intrinsic duration
* Omitting `duration` will cause composition to fail

**Solution:**

* Always provide an explicit `MediaTime` duration

---

### 2. Using raw numbers instead of MediaTime

```ts
// ❌ incorrect
at: 5
```

**Correct usage:**

```ts
at: MediaTime.make({
  seconds: 5,
  preferredTimescale: 600
})
```

All time values in MediaComposer **must** be represented by `MediaTime`.

---

### 3. Mixed timescales causing precision issues

**Issue:**

* Different media sources may use different timescales
* This can lead to rounding errors during trimming, fades, or alignment

**Recommendation:**

* Use a consistent `preferredTimescale` (e.g. 600)
* Convert external times using `convertScale` when needed

---

### 4. Audio extending beyond the video duration

**Behavior:**

* Audio that exceeds the end of the video does not extend the final duration
* Any audio beyond the video end is automatically truncated

---

### 5. Unexpected audio balance when mixing original and external audio

**Cause:**

* By default, original video audio and external audio are mixed together
* Without ducking, dialogue may be masked by background music

---

## Audio Ducking Behavior

### What is Ducking

Ducking refers to:

> Automatically lowering the volume of external audio (e.g. background music) when original video audio (e.g. dialogue) is present.

---

### Ducking Configuration

```ts
exportOptions: {
  ducking: {
    enabled: true,
    duckedVolume: 0.25,
    attackSeconds: 0.15,
    releaseSeconds: 0.25
  }
}
```

#### Parameters

* **enabled**
  Enables or disables ducking (default: `true`)

* **duckedVolume**
  Target volume for external audio during ducking (0…1)

* **attackSeconds**
  Ramp-down duration before original audio starts

* **releaseSeconds**
  Ramp-up duration after original audio ends

---

### Conditions for Ducking to Apply

Ducking is applied only when all of the following are true:

1. `VideoClip.keepOriginalAudio === true`
2. At least one external `AudioClip` exists
3. `exportOptions.ducking.enabled !== false`

---

## Audio Mixing Rules Summary

1. **Original Video Audio**

   * Included only when `keepOriginalAudio` is set to `true`

2. **External Audio**

   * Can be positioned or appended sequentially
   * Supports per-clip `volume`, `fade`, and looping

3. **Final Mix**

   * All audio sources are mixed into a single output track
   * Audio never changes the final video duration
   * Ducking is applied automatically during mixing
