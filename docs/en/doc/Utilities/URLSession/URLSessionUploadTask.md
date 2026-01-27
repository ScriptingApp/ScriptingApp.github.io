---
title: URLSessionUploadTask

---

`URLSessionUploadTask` represents a background upload task instance.
It is created via `BackgroundURLSession.startUpload()` or `BackgroundURLSession.resumeUpload()` and allows file uploads to continue in the **Scripting app**, even when the app is in the background or the script is terminated.

Each upload task provides real-time state, progress, and event callbacks for tracking upload activity.

---

## Properties

### `id: string`

A unique identifier for the upload task.
This value can be used to recognize and reattach to the same task after restarting a script.

**Example**

```ts
console.log(task.id) // Prints the unique task ID
```

---

### `state: URLSessionTaskState`

The current state of the upload task.

Possible values:

* `"running"` — The task is currently uploading
* `"suspended"` — The task is paused
* `"canceling"` — The task is being canceled
* `"completed"` — The task has completed
* `"unknown"` — The task’s state is unknown (usually if removed by the system)

**Example**

```ts
if (task.state === "running") {
  console.log("Upload in progress…")
}
```

---

### `progress: URLSessionProgress`

Real-time progress information for the upload task.

Contains the following fields:

* `fractionCompleted: number` — Completion ratio between `0` and `1`
* `totalUnitCount: number` — Total number of bytes expected to upload
* `completedUnitCount: number` — Number of bytes uploaded so far
* `isFinished: boolean` — Whether the task has finished
* `estimatedTimeRemaining: number | null` — Estimated remaining time in seconds (may be `null`)

**Example**

```ts
const p = task.progress
console.log(`Upload progress: ${(p.fractionCompleted * 100).toFixed(1)}%`)
```

---

### `priority: number`

The upload priority (range: `0.0–1.0`).
Defaults to `0.5`.
Higher values indicate a higher scheduling priority for the system.

**Example**

```ts
task.priority = 0.8
```

---

### `earliestBeginDate?: Date | null`

Specifies the earliest date and time when the upload task may begin.
Useful for delaying uploads until conditions like network availability or power are favorable.

**Example**

```ts
task.earliestBeginDate = new Date(Date.now() + 5000) // Begin after 5 seconds
```

---

### `countOfBytesClientExpectsToSend: number`

A best-guess upper bound of bytes expected to send (for system estimation only).

### `countOfBytesClientExpectsToReceive: number`

A best-guess upper bound of bytes expected to receive (for system estimation only).

---

## Callbacks

### `onReceiveData?: (data: Data) => void`

Triggered when response data is received from the server.
The `data` parameter contains binary data from the server.

**Example**

```ts
task.onReceiveData = data => {
  console.log("Received response data:", data.length, "bytes")
}
```

---

### `onComplete?: (error: Error | null, resumeData: Data | null) => void`

Triggered when the upload task finishes, whether successfully or with an error.

**Parameters**

* `error`: If the upload failed, contains the error object; otherwise `null`.
* `resumeData`: If the upload failed and can be resumed, contains resume data (`Data`); otherwise `null`.

**Example**

```ts
task.onComplete = (error, resumeData) => {
  if (error) {
    console.error("Upload failed:", error)
    if (resumeData) {
      console.log("Upload is resumable — save resumeData for later recovery")
    }
  } else {
    console.log("Upload completed successfully!")
  }
}
```

---

## Methods

### `suspend(): void`

Pauses the upload task.
A suspended task produces no network traffic and isn’t subject to timeouts.
Use `resume()` to continue the upload later.

**Example**

```ts
task.suspend()
console.log("Task suspended")
```

---

### `resume(): void`

Resumes a suspended upload task.
Newly-initialized tasks begin in a suspended state, so you need to call this method to start the task.

**Example**

```ts
task.resume()
console.log("Upload resumed")
```

---

### `cancel(): void`

Cancels the upload task immediately.
The task enters the `"canceling"` state, and the `onComplete` callback is invoked with an error once cancellation finishes.

**Example**

```ts
task.cancel()
console.log("Task canceled")
```

---

## Example Usage

```ts
const task = BackgroundURLSession.startUpload({
  filePath: "/path/to/file.txt",
  toURL: "https://api.example.com/upload",
  method: "POST",
  headers: { Authorization: "Bearer my_token" },
  notifyOnFinished: true
})

task.resume()

task.onReceiveData = data => {
  console.log("Received response:", data.length, "bytes")
}

task.onComplete = (error, resumeData) => {
  if (error) {
    console.error("Upload error:", error)
    if (resumeData) console.log("Resume data available — can retry later")
  } else {
    console.log("Upload completed successfully")
  }
}
```

---

## Notes and Best Practices

* You can pause a task with `suspend()` and later resume it with `resume()`.
* Some servers support resumable uploads; if supported, you can use `resumeData` for recovery.
* Uploads can continue even if the script or app is suspended or terminated.
* Use `BackgroundURLSession.getUploadTasks()` to retrieve and reattach callbacks to ongoing uploads after restarting your script.
* Setting `notifyOnFinished` allows a local notification to alert users when the upload completes.
* When including authorization information (e.g., `Authorization` headers), ensure credentials are stored and managed securely.
