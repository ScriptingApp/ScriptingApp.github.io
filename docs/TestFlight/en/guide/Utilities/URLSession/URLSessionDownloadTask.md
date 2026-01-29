---
title: URLSessionDownloadTask
description: Represents a download task instance that can be performed in the foreground or background, and can be resumed after the script is terminated.

---

`URLSessionDownloadTask` represents a background download task created by
`BackgroundURLSession.startDownload()` or `BackgroundURLSession.resumeDownload()`.
It allows scripts in the **Scripting app** to download files in the foreground or background, and the task can continue even if the script is terminated or the app is suspended.

Each download task is managed by the system and provides detailed state, progress, and event callbacks.

---

## Properties

### `id: string`

A unique identifier for the download task.
You can use this ID to recognize or reattach to the same task when your script restarts.

**Example**

```ts
console.log(task.id) // Prints the unique task ID
```

---

### `state: URLSessionTaskState`

The current state of the task.

Possible values:

* `"running"` — The task is currently downloading.
* `"suspended"` — The task is paused.
* `"canceling"` — The task is being canceled.
* `"completed"` — The task has finished.
* `"unknown"` — The state is unknown (usually when the task has been removed by the system).

**Example**

```ts
if (task.state === "running") {
  console.log("Download in progress…")
}
```

---

### `progress: URLSessionProgress`

Real-time progress information for the task.

Contains the following fields:

* `fractionCompleted: number` — Progress fraction between `0` and `1`.
* `totalUnitCount: number` — Total number of bytes to download.
* `completedUnitCount: number` — Number of bytes downloaded so far.
* `isFinished: boolean` — Whether the task has completed.
* `estimatedTimeRemaining: number | null` — Estimated remaining time (in seconds), or `null` if unknown.

**Example**

```ts
const p = task.progress
console.log(`Completed ${(p.fractionCompleted * 100).toFixed(2)}%`)
```

---

### `priority: number`

The priority of the download task (range: `0.0–1.0`).
Defaults to `0.5`.
Higher values increase the likelihood that the system will prioritize this task.

**Example**

```ts
task.priority = 0.8
```

---

### `earliestBeginDate?: Date | null`

The earliest date when the download task is allowed to begin.
Useful for delaying downloads or optimizing bandwidth usage.

**Example**

```ts
task.earliestBeginDate = new Date(Date.now() + 10_000) // start after 10 seconds
```

---

### `countOfBytesClientExpectsToSend: number`

A best-guess upper bound on the number of bytes expected to send (for system estimation only).

### `countOfBytesClientExpectsToReceive: number`

A best-guess upper bound on the number of bytes expected to receive (for system estimation only).

---

## Callbacks

### `onProgress?: (details) => void`

Called periodically as the download progresses.

**details** includes:

* `progress: number` — Progress fraction between `0` and `1`.
* `bytesWritten: number` — Bytes written since the last update.
* `totalBytesWritten: number` — Total bytes downloaded so far.
* `totalBytesExpectedToWrite: number` — Total expected bytes for the download.

**Example**

```ts
task.onProgress = details => {
  console.log(`Download progress: ${(details.progress * 100).toFixed(1)}%`)
}
```

---

### `onFinishDownload?: (error, details) => void`

Called when the download finishes (successfully or with an error).

**Parameters**

* `error: Error | null` — Error object if the download failed, otherwise `null`.
* `details.temporary: string` — The temporary file path used by the system.
* `details.destination: string | null` — The final destination path (if successful) or `null` if the download failed.

> The downloaded file is automatically moved to the specified `destination` path upon completion.

**Example**

```ts
task.onFinishDownload = (error, details) => {
  if (error) {
    console.error("Download failed:", error)
  } else {
    console.log("Download completed at:", details.destination)
  }
}
```

---

### `onComplete?: (error, resumeData) => void`

Called when the task finishes completely (either successfully or unsuccessfully).

**Parameters**

* `error: Error | null` — Error object if the download failed, otherwise `null`.
* `resumeData: Data | null` — Resume data available if the download can be resumed later.

**Example**

```ts
task.onComplete = (error, resumeData) => {
  if (error) {
    console.error("Download error:", error)
    if (resumeData) {
      console.log("Resume data is available for resuming the download")
    }
  } else {
    console.log("Download completed successfully")
  }
}
```

---

## Methods

### `suspend(): void`

Suspends the download task.
While suspended, the task produces no network activity and is not subject to timeouts.
You can later call `resume()` to continue.

**Example**

```ts
task.suspend()
console.log("Task suspended")
```

---

### `resume(): void`

Resumes a suspended task.
Call this only if the task is in a `"suspended"` state.

**Example**

```ts
task.resume()
console.log("Task resumed")
```

---

### `cancel(): void`

Cancels the download task immediately.
The task enters the `"canceling"` state, and the `onComplete` callback is triggered with an error once cancellation finishes.

**Example**

```ts
task.cancel()
console.log("Task canceled")
```

---

### `cancelByProducingResumeData(): Promise<Data | null>`

Cancels the download task and attempts to produce resume data.
If resumable, the returned promise resolves to `Data` which can be used later with
`BackgroundURLSession.resumeDownload()`.
Otherwise, it resolves to `null`.

**Example**

```ts
const resumeData = await task.cancelByProducingResumeData()
if (resumeData) {
  console.log("Download canceled; resume data available for later resumption")
}
```

---

## Example Usage

```ts
const task = BackgroundURLSession.startDownload({
  url: "https://example.com/largefile.zip",
  destination: "/.../Downloads/largefile.zip",
  notifyOnFinished: true
})

task.onProgress = ({ progress }) => {
  console.log(`Progress: ${(progress * 100).toFixed(1)}%`)
}

task.onFinishDownload = (error, details) => {
  if (error) {
    console.error("Download failed:", error)
  } else {
    console.log("Download completed at:", details.destination)
  }
}

task.onComplete = async (error, resumeData) => {
  if (error && resumeData) {
    console.log("Resume data available — save it to resume later")
  }
}
```

---

## Notes and Best Practices

* You need to call `resume()` start the download when you create a task by `BackgroundURLSession.startDownload()`.
* Use `cancelByProducingResumeData()` to implement **download resumption**.
* Even if the script exits or is terminated, downloads continue in the background.
* After restarting the script, use `BackgroundURLSession.getDownloadTasks()` to recover existing tasks and reattach callbacks.
* For long-running tasks, use `notifyOnFinished` to inform the user when a download completes.
