---
title: LivePhotoView
description: This component is intended for media-centric scenarios where Live Photo playback is required.

---

`LivePhoto` represents a system Live Photo, which consists of:

* A high-resolution still image
* A short video clip bound to that image

In Scripting, `LivePhoto` is a **system-managed object**. It cannot be instantiated directly with `new` and is typically obtained from:

* A photo picker result
* Asynchronous construction from local image and video files

LivePhoto is commonly used to:

* Display Live Photos in the UI
* Access underlying image and video resources
* Decompose, rebuild, or re-save Live Photos

---

## LivePhoto Class

### size

```ts
readonly size: Size
```

The pixel size of the Live Photo, corresponding to its still image component.

Typical use cases include layout calculation, scaling decisions, and inspecting the original resolution.

---

### getAssetResources()

```ts
getAssetResources(): Promise<{
  data: Data
  assetLocalIdentifier: string
  contentType: UTType
  originalFilename: string
  pixelHeight: number
  pixelWidth: number
}[]>
```

Retrieves the **underlying asset resources** of the Live Photo.

A Live Photo usually contains at least:

* One still image resource (JPEG / HEIC)
* One video resource (QuickTime MOV)

Each returned resource object includes:

* `data`
  The raw binary data of the resource

* `assetLocalIdentifier`
  The Photos framework local identifier for this resource

* `contentType`
  The uniform type identifier (UTType), indicating image or video

* `originalFilename`
  The original filename in the photo library

* `pixelWidth` / `pixelHeight`
  The actual resolution of the resource

Common scenarios include exporting Live Photos, splitting them into image and video files, or re-saving them without intermediate temporary files.

---

### LivePhoto.from(options)

```ts
static from(options: {
  imagePath: string
  videoPath: string
  targetSize?: Size | null
  placeholderImage: UIImage | null
  contentMode?: "aspectFit" | "aspectFill"
  onResult: (
    result: LivePhoto | null,
    info: {
      error: string | null
      degraded: boolean | null
      cancelled: boolean | null
    }
  ) => void
}): Promise<() => void>
```

Asynchronously constructs a Live Photo from a still image file and a matching video file.

Key characteristics:

* The operation is asynchronous
* `onResult` may be invoked multiple times
* Supports degraded (low-quality) intermediate results
* Can be cancelled explicitly

#### Parameters

* `imagePath`
  Path to the still image file (JPEG / HEIC)

* `videoPath`
  Path to the associated video file (MOV)

* `targetSize`
  The desired output size of the Live Photo
  Pass `null` to preserve the original size

* `placeholderImage`
  A UIImage displayed while the Live Photo is loading

* `contentMode`
  How the placeholder image is rendered

  * `aspectFit`: preserves aspect ratio
  * `aspectFill`: fills the container, possibly cropping

* `onResult(result, info)`
  Callback invoked when loading completes or updates

#### info Object

* `error`
  Error message if the request fails

* `degraded`
  Indicates whether the result is a lower-quality version

* `cancelled`
  Indicates whether the request was cancelled

#### Return Value

Returns a Promise that resolves to a **cancellation function**:

```ts
() => void
```

Calling this function cancels the Live Photo loading request.

---

## LivePhotoView

`LivePhotoView` is a native UI component used to **display and play a Live Photo**, matching the behavior of the system Photos app.

It is purely a presentation component and does not handle loading, permissions, or persistence.

---

### LivePhotoViewProps

```ts
type LivePhotoViewProps = {
  livePhoto: Observable<LivePhoto | null>
}
```

#### livePhoto

* Type: `Observable<LivePhoto | null>`
* Required

An observable binding to the Live Photo being displayed.

Using `Observable` allows:

* Asynchronous loading workflows
* Dynamic replacement of the Live Photo
* Automatic UI updates without manual refresh logic

When the observable value changes, `LivePhotoView` updates accordingly.

---

## LivePhotoView Example

The following concise example demonstrates how to display a Live Photo using `LivePhotoView`.

```tsx
import { LivePhotoView, Button, useObservable } from "scripting"

function Example() {
  const livePhoto = useObservable<LivePhoto | null>(null)

  return <>
    <Button
      title="Set Live Photo"
      action={async () => {
        const lp = await getLivePhotoSomehow()
        livePhoto.setValue(lp)
      }}
    />

    <LivePhotoView
      livePhoto={livePhoto}
      frame={{ idealHeight: 300 }}
    />
  </>
}
```

### Explanation

* `useObservable<LivePhoto | null>`
  Declares an observable Live Photo state

* `livePhoto.setValue(lp)`
  Updates the observable once the Live Photo is available

* `LivePhotoView`
  Automatically renders and plays the Live Photo when the observable value is non-null

This pattern highlights the core design principles:

* Data acquisition and UI presentation are decoupled
* UI updates are driven by reactive state
* No manual invalidation or redraw logic is required

---

## Design Notes

* `LivePhoto` instances are system-managed objects
* `LivePhotoView` must be driven by an `Observable`
* A single LivePhoto can be shared across multiple views
* The recommended pattern is always **state-driven rendering**

---

## Summary

Live Photo support in Scripting consists of two core components:

* **LivePhoto**
  A data model for representing, constructing, and inspecting system Live Photos

* **LivePhotoView**
  A native UI component for rendering Live Photos with dynamic updates
