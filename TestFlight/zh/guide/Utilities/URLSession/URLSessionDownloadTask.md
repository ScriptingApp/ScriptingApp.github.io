# 下载任务

`URLSessionDownloadTask` 表示一个后台下载任务实例。
它由 `BackgroundURLSession.startDownload()` 或 `BackgroundURLSession.resumeDownload()` 创建，用于在前台或后台下载文件，并可在脚本被终止后继续运行。

每个下载任务都由系统负责调度与执行，并提供进度、状态和事件回调等信息。
任务在创建后需手动调用 `resume()` 开始任何。

***

## 属性（Properties）

### `id: string`

下载任务的唯一标识符。
可用于在脚本重启后识别同一个下载任务。

**示例**

```ts
console.log(task.id) // 输出任务唯一 ID
```

***

### `state: URLSessionTaskState`

当前任务的状态。

可能的值包括：

- `"running"`：任务正在进行中
- `"suspended"`：任务已暂停
- `"canceling"`：任务正在取消中
- `"completed"`：任务已完成
- `"unknown"`：状态未知（通常表示任务已被系统移除）

**示例**

```ts
if (task.state === "running") {
  console.log("下载中…")
}
```

***

### `progress: URLSessionProgress`

任务的实时进度信息。

包含以下字段：

- `fractionCompleted: number`：完成比例（0–1）
- `totalUnitCount: number`：总字节数
- `completedUnitCount: number`：已完成字节数
- `isFinished: boolean`：是否已完成
- `estimatedTimeRemaining: number | null`：预计剩余时间（秒），可能为 `null`

**示例**

```ts
const p = task.progress
console.log(`已完成 ${(p.fractionCompleted * 100).toFixed(2)}%`)
```

***

### `priority: number`

任务的优先级（0.0–1.0），默认值为 `0.5`。
值越高，系统越可能优先调度此任务。

**示例**

```ts
task.priority = 0.8
```

***

### `earliestBeginDate?: Date | null`

任务可开始执行的最早时间。
可用于延迟任务开始（例如在网络空闲时再执行）。

**示例**

```ts
task.earliestBeginDate = new Date(Date.now() + 10_000) // 延迟 10 秒后可开始
```

***

### `countOfBytesClientExpectsToSend: number`

客户端预计将要发送的字节数（仅供系统参考，不影响任务执行）。

### `countOfBytesClientExpectsToReceive: number`

客户端预计将要接收的字节数（仅供系统参考，不影响任务执行）。

***

## 回调函数（Callbacks）

### `onProgress?: (details) => void`

当下载进度变化时调用。
`details` 参数包含：

- `progress: number`：完成比例（0–1）
- `bytesWritten: number`：本次写入的字节数
- `totalBytesWritten: number`：已下载的总字节数
- `totalBytesExpectedToWrite: number`：预期的总下载字节数

**示例**

```ts
task.onProgress = details => {
  console.log(`下载进度：${(details.progress * 100).toFixed(1)}%`)
}
```

***

### `onFinishDownload?: (error, details) => void`

当下载完成（或失败）后调用。

**参数说明**

- `error: Error | null`：若下载失败则为错误对象，否则为 `null`。
- `details.temporary: string`：临时文件路径。
- `details.destination: string | null`：目标文件路径（如果下载成功则为目标路径，否则可能为 `null`）。

**注意**：文件在下载完成后系统会自动移动到指定 `destination` 路径。

**示例**

```ts
task.onFinishDownload = (error, details) => {
  if (error) {
    console.error("下载失败：", error)
  } else {
    console.log("下载完成，文件保存于：", details.destination)
  }
}
```

***

### `onComplete?: (error, resumeData) => void`

任务完全结束时调用，无论成功或失败都会触发。

**参数说明**

- `error: Error | null`：若任务失败则为错误对象，否则为 `null`。
- `resumeData: Data | null`：如果任务支持断点续传且失败，可通过此数据恢复下载。

**示例**

```ts
task.onComplete = (error, resumeData) => {
  if (error) {
    console.error("下载失败：", error)
    if (resumeData) {
      console.log("可使用 resumeData 续传")
    }
  } else {
    console.log("任务成功完成")
  }
}
```

***

## 方法（Methods）

### `suspend(): void`

暂停任务。
暂停后不会再产生网络流量，也不会超时。
稍后可通过 `resume()` 继续。

**示例**

```ts
task.suspend()
console.log("任务已暂停")
```

***

### `resume(): void`

恢复被暂停的任务。
仅在任务处于 `"suspended"` 状态时可调用。

**示例**

```ts
task.resume()
console.log("任务已恢复")
```

***

### `cancel(): void`

取消任务。
调用后立即返回，任务状态变为 `"canceling"`，完成后触发 `onComplete` 回调并带上错误信息。

**示例**

```ts
task.cancel()
console.log("任务已取消")
```

***

### `cancelByProducingResumeData(): Promise<Data | null>`

取消任务并生成可续传的数据。
若任务支持断点续传，返回的 `Data` 可用于恢复下载；否则返回 `null`。

可在之后使用：

```ts
BackgroundURLSession.resumeDownload({ resumeData, destination })
```

**示例**

```ts
const resumeData = await task.cancelByProducingResumeData()
if (resumeData) {
  console.log("任务已取消，可通过 resumeData 续传")
}
```

***

## 示例代码（完整流程）

```ts
const task = BackgroundURLSession.startDownload({
  url: "https://example.com/largefile.zip",
  destination: "/.../Downloads/largefile.zip",
  notifyOnFinished: {
    success: "下载成功",
    failure: "下载失败"
  }
})

// 开始任务
task.resume()

task.onProgress = ({ progress }) => {
  console.log(`下载进度：${(progress * 100).toFixed(1)}%`)
}

task.onFinishDownload = (error, details) => {
  if (error) {
    console.error("下载出错：", error)
  } else {
    console.log("下载完成：", details.destination)
  }
}

task.onComplete = async (error, resumeData) => {
  if (error && resumeData) {
    console.log("可继续下载，保存 resumeData 以备后续恢复")
  }
}
```

***

## 注意事项与最佳实践

- 任务创建后需调用 `resume()` 开始下载。
- 任务暂停后（`suspend()`）可稍后用 `resume()` 继续执行。
- 使用 `cancelByProducingResumeData()` 可实现**断点续传**功能。
- 即使脚本退出或被系统终止，下载仍会在后台继续执行。
- 重新启动脚本后可通过 `BackgroundURLSession.getDownloadTasks()` 找回任务并重新绑定回调。
- 建议为长时间任务设置 `notifyOnFinished` 以便用户了解进度完成状态。
