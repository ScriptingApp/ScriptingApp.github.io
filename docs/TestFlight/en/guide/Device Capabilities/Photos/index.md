---
title: Photos
description: The interface that manages access and changes to the user’s photo library.

---
        
The `Photos` module provides unified access to the system photo library and camera. It enables scripts to:

* Capture photos or record videos using the system camera
* Pick images, videos, or Live Photos from the photo library
* Retrieve the most recent photos
* Save images or videos to the Photos app

All APIs are built on top of native iOS frameworks such as Photos and PHPicker, and follow these principles:

* System-managed permissions
* Promise-based asynchronous APIs
* System-controlled UI presentation
* Secure and constrained access to media data

---

## CaptureInfo

```ts
type CaptureInfo = {
  cropRect: {
    x: number
    y: number
    width: number
    height: number
  } | null
  originalImage: UIImage | null
  editedImage: UIImage | null
  imagePath: string | null
  mediaMetadata: Record<string, any> | null
  mediaPath: string | null
  mediaType: string | null
}
```

`CaptureInfo` describes the complete result of a capture operation (photo or video).

### Properties

* `cropRect`
  The cropping rectangle applied during editing.
  `null` if no cropping was performed.

* `originalImage`
  The original image captured by the camera.

* `editedImage`
  The edited image, if editing was enabled and applied.

* `imagePath`
  File path to the captured image on disk.

* `mediaMetadata`
  Metadata associated with the captured media, such as EXIF data.

* `mediaPath`
  File path to the captured video.

* `mediaType`
  The UTType string describing the media type.

---

## availableMediaTypes()

```ts
function availableMediaTypes(): string[] | null
```

Returns the list of media UTTypes supported by the current device’s camera.

Common use cases include checking whether video capture is supported or dynamically adjusting capture options.

Returns `null` if the information is unavailable.

---

## capture(options)

```ts
function capture(options: {
  mode: "photo" | "video"
  mediaTypes: UTType[]
  allowsEditing?: boolean
  cameraDevice?: "rear" | "front"
  cameraFlashMode?: "auto" | "on" | "off"
  videoMaximumDuration?: DurationInSeconds
  videoQuality?: 
    | "low"
    | "medium"
    | "high"
    | "640x480"
    | "iFrame960x540"
    | "iFrame1280x720"
}): Promise<CaptureInfo | null>
```

Presents the system camera interface to capture a photo or record a video.

### Options

* `mode`
  Capture mode

  * `"photo"`: capture a photo
  * `"video"`: record a video

* `mediaTypes`
  Allowed media UTTypes.

* `allowsEditing`
  Whether the user can edit the captured media.

* `cameraDevice`
  Camera to use. Defaults to `"rear"`.

* `cameraFlashMode`
  Flash behavior. Defaults to `"auto"`.

* `videoMaximumDuration`
  Maximum video duration in seconds.

* `videoQuality`
  Video resolution and encoding quality.

### Behavior Notes

* The UI is fully system-managed
* The Promise resolves only after the user finishes or cancels the operation
* Permission prompts are handled by the system

---

## pick(options)

```ts
function pick(options?: {
  mode?: "default" | "compact"
  filter?: PHPickerFilter
  limit?: number
}): Promise<PHPickerResult[]>
```

Presents the system photo picker to select media items from the photo library.

### Options

* `mode`
  Picker layout style

  * `default`: grid layout
  * `compact`: linear layout

* `filter`
  A `PHPickerFilter` that restricts selectable asset types.

* `limit`
  Maximum number of selectable items. Defaults to `1`.

### Return Value

Returns an array of `PHPickerResult` objects.
Each result must be explicitly resolved into a concrete media representation.

---

## PHPickerFilter

`PHPickerFilter` defines which asset types can be selected in `Photos.pick`.

It is a non-instantiable class and can only be constructed via static methods.

---

### Basic Filters

* `PHPickerFilter.images()`
  Allows selection of standard images.

* `PHPickerFilter.videos()`
  Allows selection of videos.

* `PHPickerFilter.livePhotos()`
  Allows selection of Live Photos.

* `PHPickerFilter.bursts()`
  Burst photo sequences.

* `PHPickerFilter.panoramas()`
  Panorama photos.

* `PHPickerFilter.screenshots()`
  Screenshots.

* `PHPickerFilter.screenRecordings()`
  Screen recording videos.

* `PHPickerFilter.depthEffectPhotos()`
  Photos with depth effects (portrait photos).

* `PHPickerFilter.cinematicVideos()`
  Cinematic mode videos.

* `PHPickerFilter.slomoVideos()`
  Slow-motion videos.

* `PHPickerFilter.timelapseVideos()`
  Time-lapse videos.

---

### Composite Filters

* `PHPickerFilter.all(filters)`
  Matches assets that satisfy all provided filters
  Logical AND

* `PHPickerFilter.any(filters)`
  Matches assets that satisfy at least one filter
  Logical OR

* `PHPickerFilter.not(filter)`
  Excludes assets matching the specified filter
  Logical NOT

#### Example

```ts
const filter = PHPickerFilter.any([
  PHPickerFilter.livePhotos(),
  PHPickerFilter.images()
])

await Photos.pick({ filter })
```

---

## PHPickerResult

Represents a single item returned from the photo picker.

### itemProvider: ItemProvider

The item provider for the selected asset, which can be used to load the asset.

### livePhoto()

```ts
livePhoto(): Promise<LivePhoto | null>
```

Attempts to read the result as a Live Photo.
Resolves to `null` if the asset cannot be represented as a Live Photo.

---

### uiImage()

```ts
uiImage(): Promise<UIImage | null>
```

Attempts to read the result as a UIImage object.
Resolves to `null` if the asset cannot be represented as an image.

---

### imagePath()

```ts
imagePath(): Promise<string | null>
```

If this result can be read as an image, this file will be copied to the app group's sandbox and returns a promise that resolves to the image path, otherwise returns null, or rejects with an error. You should delete the image file when you no longer need it.

#### Example

```ts
const filePath = await result.imagePath()
```

---

### videoPath()

```ts
videoPath(): Promise<string | null>
```

If this result can be read as a video, this file will be copied to the app group's sandbox and returns a promise that resolves to the video path, otherwise returns null, or rejects with an error. You should delete the video file when you no longer need it.

---

## getLatestPhotos(count)

```ts
function getLatestPhotos(count: number): Promise<UIImage[] | null>
```

Retrieves the most recent photos from the photo library.

### Notes

* Images only (no videos)
* Ordered from newest to oldest
* Returns `null` if access is unavailable

---

## pickPhotos(count)

```ts
function pickPhotos(count: number): Promise<UIImage[]>
```

Legacy convenience API for selecting a fixed number of photos.

Returns an array of `UIImage` objects without file paths or metadata.

---

## takePhoto()

```ts
function takePhoto(): Promise<UIImage | null>
```

Quick photo capture API.

* No advanced configuration
* Returns `null` if the user cancels

---

## savePhoto(path, options)

```ts
function savePhoto(
  path: string,
  options?: { fileName?: string }
): Promise<boolean>
```

Saves an image file from disk to the Photos app.

---

## savePhoto(image, options)

```ts
function savePhoto(
  image: Data,
  options?: { fileName?: string }
): Promise<boolean>
```

Saves raw image data directly to the Photos app, avoiding temporary files.

---

## saveVideo(path, options)

```ts
function saveVideo(
  path: string,
  options?: { fileName?: string }
): Promise<boolean>
```

Saves a video file from disk to the Photos app.

---

## saveVideo(video, options)

```ts
function saveVideo(
  video: Data,
  options?: { fileName?: string }
): Promise<boolean>
```

Saves raw video data directly to the Photos app.

---

## Design Notes

* All APIs are asynchronous and permission-aware
* All UI is system-managed and not customizable
* Picker results are lazy and must be explicitly resolved
* Save APIs return only success status, not asset identifiers
