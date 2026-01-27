---
title: 录音

---

`AudioRecorder` 类允许您将音频数据录制到文件。它提供了开始、停止、暂停和管理音频录制的功能，并可配置音频质量、采样率、格式等。

## 功能
- 从系统的活跃输入设备录制音频。
- 可以录制指定时长，或在手动停止前一直录制。
- 暂停并恢复录制。
- 删除已录制的音频文件。

---

## 用法

### 设置 SharedAudioSession
在创建 `AudioRecorder` 实例之前，需要先设置 `SharedAudioSession`。因为音频会话与硬件相关，因此需要确保正确激活会话。

```ts
await SharedAudioSession.setActive(true)
await SharedAudioSession.setCategory(
  "playAndRecord",
  ["defaultToSpeaker"]
)
```

### 创建 AudioRecorder 实例
使用 `create` 方法来创建一个音频录制器实例：

```ts
async function createRecorder() {
  try {
    const filePath = Path.join(
      FileManager.documentsDirectory,
      "recording.m4a"
    )
    const recorder = await AudioRecorder.create(filePath, {
      format: "MPEG4AAC",
      sampleRate: 44100,
      numberOfChannels: 2,
      encoderAudioQuality: AVAudioQuality.high
    })
    return recorder
  } catch (error) {
    console.error("Failed to create recorder: ", error)
  }
}
```

### 录制音频
您可以使用 `record()` 方法开始录制：

```ts
async function startRecording() {
  const recorder = await createRecorder()
  if (recorder) {
    const success = recorder.record()
    console.log("Recording started: ", success)
  }
}
```

也可以提供额外的选项来控制录制开始的时间及录制时长：

```ts
function startSynchronizedRecording(recorderOne, recorderTwo) {
  let timeOffset = recorderOne.deviceCurrentTime + 0.01
  
  // 使两个 recorder 的录制时间同步
  recorderOne.record({ atTime: timeOffset })
  recorderTwo.record({ atTime: timeOffset })
}
```

### 暂停和停止录制
暂停录制：

```ts
function pauseRecording(recorder) {
  recorder.pause()
  console.log("Recording paused.")
}
```

停止录制：

```ts
function stopRecording(recorder) {
  recorder.stop()
  console.log("Recording stopped.")
}
```

### 删除录音文件
要删除已经录制好的文件：

```ts
function deleteRecording(recorder) {
  const success = recorder.deleteRecording()
  console.log("Recording deleted: ", success)
}
```

### 释放 Recorder
当不再需要使用录制器时，应调用 `dispose()` 来释放资源：

```ts
function disposeRecorder(recorder) {
  recorder.dispose()
  console.log("Recorder disposed.")
}
```

### 事件处理
可以使用 `onFinish` 和 `onError` 回调来处理录制完成和错误情况：

```ts
async function setupRecorder() {
  const recorder = await createRecorder()
  if (recorder) {
    recorder.onFinish = (success) => {
      console.log("Recording finished successfully: ", success)
    }

    recorder.onError = (message) => {
      console.error("Recording error: ", message)
    }
  }
}
```

---

## API 参考

### `AudioRecorder.create(filePath, settings?)`
使用指定的设置创建一个 `AudioRecorder` 实例。
- **filePath** (string): 要录制到的文件系统路径。
- **settings** (可选对象): 录音的音频设置：
  - **format** (AudioFormat): 音频数据的格式，可选值包括 `"LinearPCM"`, `"MPEG4AAC"`, `"AppleLossless"`, `"AppleIMA4"`, `"iLBC"`, `"ULaw"`。
  - **sampleRate** (number): 采样率，单位为赫兹 (范围 8000 到 192000)。
  - **numberOfChannels** (number): 声道数量 (1 到 64)。
  - **encoderAudioQuality** (AVAudioQuality): 音频编码质量 (从 `AVAudioQuality.min` 到 `AVAudioQuality.max`)。

**返回值**: 一个 `Promise`，解析后返回 `AudioRecorder` 实例。

### `AudioRecorder.isRecording`
一个布尔值，用于指示录制器当前是否正在录音。

### `AudioRecorder.currentTime`
从录音开始到当前的时间（单位为秒）。

### `AudioRecorder.deviceCurrentTime`
主机音频设备的当前时间（单位为秒）。

### `AudioRecorder.record(options?)`
开始录制音频。
- **options** (可选对象):
  - **atTime** (number): 相对于 `deviceCurrentTime`，指定开始录制的时间。
  - **duration** (number): 录音时长（单位为秒）。

**返回值**: 一个布尔值，表示录制是否成功开始。

### `AudioRecorder.pause()`
暂停当前录制。

### `AudioRecorder.stop()`
停止录制并关闭音频文件。

### `AudioRecorder.deleteRecording()`
删除已经录制的音频文件。

**返回值**: 一个布尔值，表示删除操作是否成功。

### `AudioRecorder.dispose()`
释放录制器所使用的资源。

### `AudioRecorder.onFinish`
录音完成后调用的回调函数。
- **success** (boolean): 表示录制是否成功完成。

### `AudioRecorder.onError`
在录制或编码出现错误时调用的回调函数。
- **message** (string): 描述错误的字符串。

---

## 使用示例
```ts
import { Path } from 'scripting'

async function run() {

  await SharedAudioSession.setActive(true)
  await SharedAudioSession.setCategory(
    "playAndRecord",
    ["defaultToSpeaker"]
  )

  try {
    const filePath = Path.join(
      FileManager.documentsDirectory,
      "recording.m4a"
    )
    const recorder = await AudioRecorder.create(filePath, {
      format: "MPEG4AAC",
      sampleRate: 48000,
      numberOfChannels: 2,
      encoderAudioQuality: AVAudioQuality.high
    })

    recorder.onFinish = (success) => console.log("Recording finished successfully: ", success)
    recorder.onError = (message) => console.error("Recording error: ", message)

    recorder.record()
    setTimeout(() => {
      recorder.stop()
    }, 5000) // 5秒后停止录制
  } catch (error) {
    console.error("Error: ", String(error))
  }
}

run()
```

使用 `AudioRecorder` 类，您可以在脚本中轻松管理音频录制操作，并灵活控制音频录制流程。