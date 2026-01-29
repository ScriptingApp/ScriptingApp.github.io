---
title: 后台网络会话
description: 该接口提供发起、恢复与查询「后台可持续」的下载与上传任务的能力

---

`BackgroundURLSession` 提供在 **Scripting app** 中发起、恢复与查询「后台可持续」的下载与上传任务的能力。

> **可用性：** 仅当脚本运行在主应用 (`Script.env === "index"`) 时可用。

---

## 命名空间：`BackgroundURLSession`

### 1) `startDownload(options): URLSessionDownloadTask`

**作用**：启动一个新的后台下载任务。

**签名**

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

**参数说明**

* `url` (`string`)：要下载的文件 URL。
* `destination` (`string`)：下载完成后保存的目标文件路径。
* `headers` (`Record<string, string>`, 可选)：HTTP 请求头。
* `notifyOnFinished` (`{ success: string, failure: string }`, 可选)：下载完成后是否发送本地通知, `success` 为成功通知标题，`failure` 为失败通知标题。

**返回值**

* `URLSessionDownloadTask`：下载任务对象（任务会自动启动）。

**示例**

```ts
const task = BackgroundURLSession.startDownload({
  url: 'https://example.com/file.zip',
  destination: '/var/mobile/Containers/.../Downloads/file.zip',
  headers: { 'User-Agent': 'Scripting/1.0' },
  notifyOnFinished: {
    success: '下载成功',
    failure: '下载失败'
  }
})

// 开始下载
task.resume()

// 监听进度与完成事件
task.onProgress = d => console.log('进度：', d.progress)
task.onFinishDownload = (err, info) => {
  if (!err) console.log('下载完成，文件保存于：', info.destination)
}
```

---

### 2) `resumeDownload(options): URLSessionDownloadTask`

**作用**：从断点续传数据恢复一个下载任务。

**签名**

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

**参数说明**

* `resumeData` (`Data`)：通过 `cancelByProducingResumeData()` 获取的断点数据。
* `destination` (`string`)：下载完成后的目标保存路径。
* `notifyOnFinished` (`{ success: string, failure: string }`, 可选)：下载完成后是否发送本地通知, `success` 为成功通知标题，`failure` 为失败通知标题。

**返回值**

* `URLSessionDownloadTask`：下载任务对象（任务会自动启动）。

**示例**

```ts
const task = BackgroundURLSession.resumeDownload({
  resumeData,
  destination: '/.../Downloads/file.zip',
  notifyOnFinished: true
})

// 开始续传
task.resume()

task.onFinishDownload = (err, info) => {
  if (!err) console.log('续传完成：', info.destination)
}
```

---

### 3) `getDownloadTasks(): Promise<URLSessionDownloadTask[]>`

**作用**：获取当前系统中仍存在的后台下载任务。
脚本被终止或重启后，可通过该方法重新获取任务实例并重新设置回调。

**签名**

```ts
function getDownloadTasks(): Promise<URLSessionDownloadTask[]>
```

**返回值**

* `Promise<URLSessionDownloadTask[]>`：下载任务对象数组。

**示例**

```ts
const tasks = await BackgroundURLSession.getDownloadTasks()
for (const task of tasks) {
  console.log('任务ID:', task.id, '状态:', task.state)
  task.onComplete = err => {
    if (err) console.error('下载失败：', err)
  }
}
```

---

### 4) `startUpload(options): URLSessionUploadTask`

**作用**：启动一个新的后台上传任务。

**签名**

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

**参数说明**

* `filePath` (`string`)：要上传的本地文件路径。
* `toURL` (`string`)：服务器目标 URL。
* `method` (`string`, 可选，默认 `"POST"`)：HTTP 请求方法。
* `headers` (`Record<string, string>`, 可选)：HTTP 请求头。
* `notifyOnFinished` (`{ success: string, failure: string }`, 可选)：上传完成后是否发送本地通知, `success` 为成功通知标题，`failure` 为失败通知标题。

**返回值**

* `URLSessionUploadTask`：上传任务对象（任务会自动启动）。

**示例**

```ts
const task = BackgroundURLSession.startUpload({
  filePath: '/.../upload.bin',
  toURL: 'https://api.example.com/upload',
  method: 'PUT',
  headers: { Authorization: 'Bearer token' },
  notifyOnFinished: {
    success: '上传成功',
    failure: '上传失败'
  }
})

// 开始上传
task.resume()

task.onComplete = err => {
  if (!err) console.log('上传完成')
  else console.error('上传失败：', err)
}
```

---

### 5) `resumeUpload(options): URLSessionUploadTask`

**作用**：恢复一个可续传的上传任务。

**签名**

```ts
function resumeUpload(options: {
  resumeData: Data
  notifyOnFinished?: {
    success: string
    failure: string
  }
}): URLSessionUploadTask
```

**参数说明**

* `resumeData` (`Data`)：先前上传任务失败时生成的续传数据。
* `notifyOnFinished` (`{ success: string, failure: string }`, 可选)：上传完成后是否发送本地通知, `success` 为成功通知标题，`failure` 为失败通知标题。

**返回值**

* `URLSessionUploadTask`：新的上传任务对象（任务会自动启动）。

**示例**

```ts
const task = BackgroundURLSession.resumeUpload({
  resumeData,
  notifyOnFinished: {
    success: '上传成功',
    failure: '上传失败'
  }
})

// 开始续传
task.resume()

task.onComplete = err => {
  if (!err) console.log('上传续传完成')
}
```

---

### 6) `getUploadTasks(): Promise<URLSessionUploadTask[]>`

**作用**：获取系统中仍存在的后台上传任务，用于脚本重启后恢复任务状态与回调。

**签名**

```ts
function getUploadTasks(): Promise<URLSessionUploadTask[]>
```

**返回值**

* `Promise<URLSessionUploadTask[]>`：上传任务数组。

**示例**

```ts
const tasks = await BackgroundURLSession.getUploadTasks()
for (const t of tasks) {
  console.log('任务ID:', t.id, '状态:', t.state)
  t.onComplete = err => {
    if (err) console.error('上传失败：', err)
  }
}
```

---

## 使用说明与建议

* **暂停与恢复：** 如果调用了 `task.suspend()` 暂停任务，则可通过 `task.resume()` 恢复。
* **断点续传：** 下载任务可通过 `cancelByProducingResumeData()` 生成续传数据；上传任务是否支持续传取决于服务器。
* **任务恢复：** 当脚本被系统终止后，后台任务仍会继续。重新启动脚本后，可使用 `getDownloadTasks()` 或 `getUploadTasks()` 取回并重新绑定事件回调。
* **通知提示：** `notifyOnFinished` 仅影响任务完成时的本地通知显示，不影响任务执行流程。
