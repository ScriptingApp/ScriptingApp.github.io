---
title: 语音识别

---
        
该接口可用于执行语音识别，包括实时语音识别和音频文件的识别，能适应多种使用场景的需求。

---

## 功能概览

- **实时识别**：从麦克风捕获实时音频并转录为文本。
- **文件识别**：分析和转录已录制的音频文件。
- **多语言支持**：指定识别的语言区域，用于识别不同语言。
- **中间结果**：获取渐进式的转录结果，包括部分结果和最终结果。
- **自定义回调**：通过事件监听器处理转录结果和音量变化等。

---

## 类型定义

### `RecognitionTaskHint`
用于指定语音识别任务的类型提示：
- `'confirmation'`：适合诸如“yes”，“no”或“maybe”之类的指令。
- `'dictation'`：类似键盘输入的语音听写。
- `'search'`：识别搜索关键词。
- `'unspecified'`：通用的语音识别。

---

### `SpeechRecognitionResult`
表示语音识别的结果：
- `isFinal`: 表示该转录结果是否完整且最终。
- `text`: 转录内容，为置信度最高的可展示文本。

---

## 静态属性

### 支持的语言区域
- `supportedLocales`: 返回该语音识别器支持的语言区域列表，如 `"en-US"`、`"fr-FR"` 或 `"zh-CN"` 等。

### 识别状态
- `isRecognizing`: 指示当前是否有识别请求在进行中。

---

## 方法

### 开始实时识别
**`start(options: object): Promise<boolean>`**  
从设备麦克风开始进行语音识别。

#### Options 参数
- `locale`: 识别所用的语言区域字符串（可选）。
- `partialResults`: 是否返回中间结果（默认为 `true`）。
- `addsPunctuation`: 是否自动添加标点符号（默认为 `false`）。
- `requestOnDeviceRecognition`: 是否将音频数据留在本地进行识别（默认为 `false`）。
- `taskHint`: 指定识别任务类型（`'confirmation'`, `'dictation'`, `'search'`, `'unspecified'`）。
- `useDefaultAudioSessionSettings`: 是否使用默认的音频会话设置（默认为 `true`）。
- `onResult`: 用于处理识别结果的回调函数（参数类型为 `SpeechRecognitionResult`）。
- `onSoundLevelChanged`: 音量变化时触发的回调函数（可选）。

#### 使用示例
```ts
await SpeechRecognition.start({
  locale: "en-US",
  partialResults: true,
  addsPunctuation: true,
  onResult: (result) => {
    console.log("Transcription:", result.text)
  },
  onSoundLevelChanged: (level) => {
    console.log("Sound Level:", level)
  }
})
```

---

### 识别音频文件
**`recognizeFile(options: object): Promise<boolean>`**  
对已录制的音频文件进行识别。

#### Options 参数
- `filePath`: 音频文件的路径。
- `locale`: 识别所用的语言区域字符串（可选）。
- `partialResults`: 是否返回中间结果（默认为 `false`）。
- `addsPunctuation`: 是否自动添加标点符号（默认为 `false`）。
- `requestOnDeviceRecognition`: 是否将音频数据留在本地进行识别（默认为 `false`）。
- `taskHint`: 指定识别任务类型（`'confirmation'`, `'dictation'`, `'search'`, `'unspecified'`）。
- `onResult`: 用于处理识别结果的回调函数（参数类型为 `SpeechRecognitionResult`）。

#### 使用示例
```ts
await SpeechRecognition.recognizeFile({
  filePath: FileManager.join(FileManager.documentDirectory, "example.wav"),
  locale: "en-US",
  addsPunctuation: true,
  onResult: (result) => {
    console.log("File Transcription:", result.text)
  }
})
```

---

### 停止识别
**`stop(): Promise<void>`**  
停止当前正在进行的语音识别。

#### 使用示例
```ts
await SpeechRecognition.stop()
```

---

## 示例

### 实时识别并查看进度
```ts
await SpeechRecognition.start({
  locale: "en-US",
  onResult: (result) => {
    console.log(result.isFinal ? "Final Result:" : "Partial Result:", result.text)
  },
  onSoundLevelChanged: (level) => {
    console.log("Sound Level:", level)
  }
})
```

### 识别音频文件
```ts
await SpeechRecognition.recognizeFile({
  filePath: FileManager.join(FileManager.documentDirectory, "audio.m4a"),
  partialResults: false,
  onResult: (result) => {
    console.log("File recognition completed. Transcription:", result.text)
  }
})
```

### 停止正在进行的识别
```ts
if (await SpeechRecognition.start({
  // ...
})) {
  // 10 秒后停止识别
  setTimeout(() => {
    await SpeechRecognition.stop()
  }, 10 * 1000)
}
```

---

## 注意事项

- 在使用该 API 前，请先确保已获取必要的麦克风或文件访问权限。
- 可以使用 `supportedLocales` 来确定可用于识别的语言。
- 为了获得最佳效果，请使用 iOS 支持的音频格式（例如 `.wav`, `.m4a`）作为输入。