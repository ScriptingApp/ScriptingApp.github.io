# 上传任务

`URLSessionUploadTask` 表示一个后台上传任务实例。
它由 `BackgroundURLSession.startUpload()` 或 `BackgroundURLSession.resumeUpload()` 创建，用于在前台或后台上传文件。
上传任务由系统管理，可以在应用或脚本被暂停、切换到后台甚至被终止后继续执行。

每个上传任务都提供状态、进度信息，以及多个回调事件以便追踪上传过程。

***

## 属性（Properties）

### `id: string`

任务的唯一标识符。
可用于脚本重启后识别并恢复同一个上传任务。

**示例**

```ts
console.log(task.id) // 输出任务唯一ID
```

***

### `state: URLSessionTaskState`

上传任务的当前状态。

可能的值包括：

- `"running"`：任务正在上传中
- `"suspended"`：任务已暂停
- `"canceling"`：任务正在取消
- `"completed"`：任务已完成
- `"unknown"`：状态未知（可能任务已被系统清除）

**示例**

```ts
if (task.state === "running") {
  console.log("文件上传中…")
}
```

***

### `progress: URLSessionProgress`

任务的实时进度信息。

包含以下字段：

- `fractionCompleted: number`：完成比例（0–1）
- `totalUnitCount: number`：总字节数
- `completedUnitCount: number`：已上传的字节数
- `isFinished: boolean`：是否已完成
- `estimatedTimeRemaining: number | null`：预计剩余时间（秒），可能为 `null`

**示例**

```ts
const p = task.progress
console.log(`上传进度 ${(p.fractionCompleted * 100).toFixed(1)}%`)
```

***

### `priority: number`

任务优先级（范围 0.0–1.0），默认值为 `0.5`。
数值越高，系统越倾向于优先调度此任务。

**示例**

```ts
task.priority = 0.8
```

***

### `earliestBeginDate?: Date | null`

任务可以开始的最早时间。
可用于延迟任务启动，例如等到网络空闲或充电时执行。

**示例**

```ts
task.earliestBeginDate = new Date(Date.now() + 5_000) // 5秒后可开始上传
```

***

### `countOfBytesClientExpectsToSend: number`

客户端预估将要上传的字节数，仅供系统参考。

### `countOfBytesClientExpectsToReceive: number`

客户端预估将要接收的字节数，仅供系统参考。

***

## 回调函数（Callbacks）

### `onReceiveData?: (data: Data) => void`

当服务器返回响应数据时触发。
参数 `data` 为服务端返回的二进制内容（`Data` 对象）。

**示例**

```ts
task.onReceiveData = data => {
  console.log("收到响应数据：", data.length, "字节")
}
```

***

### `onComplete?: (error: Error | null, resumeData: Data | null) => void`

当上传任务完成（成功或失败）后触发。

**参数说明**

- `error`：若上传失败则为错误对象，否则为 `null`。
- `resumeData`：若上传失败且支持断点续传，包含可用于恢复的 `Data` 对象，否则为 `null`。

**示例**

```ts
task.onComplete = (error, resumeData) => {
  if (error) {
    console.error("上传失败：", error)
    if (resumeData) {
      console.log("任务支持断点续传，可稍后恢复")
    }
  } else {
    console.log("上传完成！")
  }
}
```

***

## 方法（Methods）

### `suspend(): void`

暂停上传任务。
暂停后不会再产生网络流量，也不会超时。可通过 `resume()` 继续。

**示例**

```ts
task.suspend()
console.log("任务已暂停")
```

***

### `resume(): void`

恢复被暂停的上传任务。
新创建的任何任务都处于暂停状态，需要调用 `resume()` 才能开始上传。

**示例**

```ts
task.resume()
console.log("任务已恢复上传")
```

***

### `cancel(): void`

取消上传任务。
调用后任务会立即进入 `"canceling"` 状态，完成取消后触发 `onComplete` 回调并返回错误信息。

**示例**

```ts
task.cancel()
console.log("任务已取消")
```

***

## 示例代码（完整上传流程）

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
  console.log("收到服务器响应：", data.length, "字节")
}

task.onComplete = (error, resumeData) => {
  if (error) {
    console.error("上传出错：", error)
    if (resumeData) console.log("可以使用 resumeData 恢复上传")
  } else {
    console.log("上传成功！")
  }
}
```

***

## 注意事项与最佳实践

- 任务暂停（`suspend()`）后可通过 `resume()` 恢复。
- 某些服务器支持断点续传，可利用 `resumeData` 实现上传恢复。
- 即使脚本被终止或应用切换到后台，上传任务仍可继续执行。
- 可通过 `BackgroundURLSession.getUploadTasks()` 在脚本重启后找回仍在执行的任务，并重新绑定回调。
- 使用 `notifyOnFinished` 可在上传完成时显示本地通知，方便用户获知任务状态。
- 若需要携带鉴权信息（如 `Authorization`），请务必安全地管理凭证并在请求头中配置。
