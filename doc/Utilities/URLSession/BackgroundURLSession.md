# BackgroundURLSession

`BackgroundURLSession` provides APIs in the **Scripting app** for creating, resuming, and managing background download and upload tasks that continue running even when your script or app is not active.

> **Availability:** Only available when your script is running in the main app (`Script.env === "index"`).

***

## Namespace: `BackgroundURLSession`

### 1) `startDownload(options): URLSessionDownloadTask`

**Description:**
Starts a new background download task.

**Signature**

```ts
function startDownload(options: {
  url: string
  destination: string
  headers?: Record<string, string>
  notifyOnFinished?: {
    success: string
    failure: string
  }
}): URLSessionDownloadTask
```

**Parameters**

- `url` (`string`): The URL of the file to download.
- `destination` (`string`): The local file path where the downloaded file will be saved.
- `headers` (`Record<string, string>`, optional): Custom HTTP headers.
- `notifyOnFinished` (`{ success: string, failure: string }`, optional): Whether to show a local notification when the download finishes.

**Returns**

- `URLSessionDownloadTask`: A download task object (the task starts automatically).

**Example**

```ts
const task = BackgroundURLSession.startDownload({
  url: 'https://example.com/file.zip',
  destination: '/var/mobile/Containers/.../Downloads/file.zip',
  headers: { 'User-Agent': 'Scripting/1.0' },
  notifyOnFinished: {
    success: 'Download completed',
    failure: 'Download failed'
  }
})

task.resum()

task.onProgress = d => console.log('Progress:', d.progress)
task.onFinishDownload = (err, info) => {
  if (!err) console.log('Download completed at:', info.destination)
}
```

***

### 2) `resumeDownload(options): URLSessionDownloadTask`

**Description:**
Resumes a previously paused or interrupted download task using resume data.

**Signature**

```ts
function resumeDownload(options: {
  resumeData: Data
  destination: string
  notifyOnFinished?: {
    success: string
    failure: string
  }
}): URLSessionDownloadTask
```

**Parameters**

- `resumeData` (`Data`): The resume data returned by `cancelByProducingResumeData()`.
- `destination` (`string`): The path to save the resumed download.
- `notifyOnFinished` (`{ success: string, failure: string }`, optional): Whether to show a local notification when the download finishes.

**Returns**

- `URLSessionDownloadTask`: A resumed download task (starts automatically).

**Example**

```ts
const task = BackgroundURLSession.resumeDownload({
  resumeData,
  destination: '/.../Downloads/file.zip',
  notifyOnFinished: {
    success: 'Resumed download completed',
    failure: 'Resumed download failed'
  }
})

task.resume()

task.onFinishDownload = (err, info) => {
  if (!err) console.log('Resumed download completed:', info.destination)
}
```

***

### 3) `getDownloadTasks(): Promise<URLSessionDownloadTask[]>`

**Description:**
Retrieves all active or pending background download tasks currently managed by the system.
Useful when your script is restarted or relaunched — you can restore callbacks and monitor ongoing tasks.

**Signature**

```ts
function getDownloadTasks(): Promise<URLSessionDownloadTask[]>
```

**Returns**

- `Promise<URLSessionDownloadTask[]>`: An array of active `URLSessionDownloadTask` objects.

**Example**

```ts
const tasks = await BackgroundURLSession.getDownloadTasks()
for (const task of tasks) {
  console.log('Task ID:', task.id, 'State:', task.state)
  task.onComplete = err => {
    if (err) console.error('Download failed:', err)
  }
}
```

***

### 4) `startUpload(options): URLSessionUploadTask`

**Description:**
Starts a new background upload task.

**Signature**

```ts
function startUpload(options: {
  filePath: string
  toURL: string
  method?: string
  headers?: Record<string, string>
  notifyOnFinished?: {
    success: string
    failure: string
  }
}): URLSessionUploadTask
```

**Parameters**

- `filePath` (`string`): The local file path to upload.
- `toURL` (`string`): The destination server URL.
- `method` (`string`, optional, default `"POST"`): The HTTP method to use.
- `headers` (`Record<string, string>`, optional): Custom HTTP headers.
- `notifyOnFinished` (`{ success: string, failure: string }`, optional): Whether to show a local notification when the upload finishes.

**Returns**

- `URLSessionUploadTask`: An upload task object (the task starts automatically).

**Example**

```ts
const task = BackgroundURLSession.startUpload({
  filePath: '/.../upload.bin',
  toURL: 'https://api.example.com/upload',
  method: 'PUT',
  headers: { Authorization: 'Bearer token' },
  notifyOnFinished: {
    success: 'Upload completed',
    failure: 'Upload failed'
  }
})

task.resume()

task.onComplete = err => {
  if (!err) console.log('Upload completed')
  else console.error('Upload failed:', err)
}
```

***

### 5) `resumeUpload(options): URLSessionUploadTask`

**Description:**
Resumes a paused or failed upload task using previously saved resume data (if supported by the server).

**Signature**

```ts
function resumeUpload(options: {
  resumeData: Data
  notifyOnFinished?: {
    success: string
    failure: string
  }
}): URLSessionUploadTask
```

**Parameters**

- `resumeData` (`Data`): Resume data returned from a previous incomplete upload.
- `notifyOnFinished` (`{ success: string, failure: string }`, optional): Whether to show a local notification when the upload finishes.

**Returns**

- `URLSessionUploadTask`: A new resumed upload task (starts automatically).

**Example**

```ts
const task = BackgroundURLSession.resumeUpload({
  resumeData,
  notifyOnFinished: {
    success: 'Resumed upload completed',
    failure: 'Resumed upload failed'
  }
})

task.resume()

task.onComplete = err => {
  if (!err) console.log('Resumed upload completed successfully')
}
```

***

### 6) `getUploadTasks(): Promise<URLSessionUploadTask[]>`

**Description:**
Retrieves all active or pending background upload tasks currently managed by the system.
Use this method after restarting your script to reattach callbacks to ongoing uploads.

**Signature**

```ts
function getUploadTasks(): Promise<URLSessionUploadTask[]>
```

**Returns**

- `Promise<URLSessionUploadTask[]>`: An array of active `URLSessionUploadTask` objects.

**Example**

```ts
const tasks = await BackgroundURLSession.getUploadTasks()
for (const task of tasks) {
  console.log('Task ID:', task.id, 'State:', task.state)
  task.onComplete = err => {
    if (err) console.error('Upload failed:', err)
  }
}
```

***

## Usage Notes and Best Practices

- **Start tasks:** Tasks begin in a suspended state, so you need to call `resume()` manually.
- **Pause and resume:** You can temporarily pause a task using `task.suspend()` and later call `task.resume()` to continue.
- **Resume support:** Download tasks can generate resume data via `cancelByProducingResumeData()`. Upload resumability depends on server capabilities.
- **Task restoration:** Even if your script is terminated, ongoing background tasks continue running. When restarted, use `getDownloadTasks()` or `getUploadTasks()` to retrieve them and reattach event handlers.
- **Local notifications:** The `notifyOnFinished` option only controls whether a notification is shown when a task completes; it does not affect task lifecycle or callbacks.
