# 语音合成

该接口为文本转语音（TTS）功能提供了高级 API，方便进行语音合成、播放控制以及语音合成相关设置的管理。下面详细介绍 `Speech` API 的方法、属性以及用法示例。

***

## 功能概述

- **文本转语音**：将文本转换为语音，可自定义语速、音调和音量等选项。
- **语音管理**：根据语言或语音标识符来选择系统中的可用语音。
- **Markdown 支持**：将文本作为 Markdown 解析以进行基本格式化。
- **音频会话管理**：与其他音频源无缝衔接，控制音频会话。
- **事件监听器**：对语音合成过程中的生命周期事件做出响应。

***

## 类型定义

### `SpeechBoundary`

指定何时暂停或停止语音：

- `'immediate'`: 立即暂停或停止。
- `'word'`: 在完成当前单词后暂停或停止。

***

### `SpeechSynthesisVoice`

表示语音合成使用的语音：

- `identifier`: 语音的唯一标识符。
- `name`: 语音的显示名称。
- `language`: BCP 47 格式的语言和区域代码。
- `quality`: 语音品质（`'default'`、`'premium'`、`'enhanced'`）。
- `gender`: 语音性别（`'male'`、`'female'`、`'unspecified'`）。

***

### `SpeechProgressDetails`

语音合成过程中有关进度的详细信息：

- `text`: 正在朗读的完整文本。
- `start`: 当前单词在文本中的起始索引。
- `end`: 当前单词在文本中的结束索引。
- `word`: 当前正在朗读的单词。

***

### `SpeechSynthesisOptions`

自定义语音合成的选项：

- `isMarkdown`（可选）: 将文本视为 Markdown 解析。
- `pitch`, `rate`, `volume`: 用于覆盖全局 `Speech` 设置中的音调、语速和音量。
- `preUtteranceDelay`, `postUtteranceDelay`: 控制每句开始前与结束后的延迟。
- `voiceIdentifier`, `voiceLanguage`: 用于覆盖全局语音设置。

***

## 静态属性

### 全局语音设置

- `pitch`: 默认音调（范围：`0.5`～`2.0`；默认值：`1.0`）。
- `rate`: 语速（范围：`Speech.minSpeechRate` ～ `Speech.maxSpeechRate`；默认值：`Speech.defaultSpeechRate`）。
- `volume`: 默认音量（范围：`0.0`～`1.0`；默认值：`1.0`）。
- `preUtteranceDelay`, `postUtteranceDelay`: 全局的发音前后延迟。

### 语音和语言

- `speechVoices`: 获取所有可用语音。
- `currentLanguageCode`: 设备的当前语言代码。

### 音频会话

- `usesApplicationAudioSession`: 指定是否由应用来管理音频会话。

***

## 方法

### 语音播放与合成

- **`speak(text: string, options?: SpeechSynthesisOptions): Promise<void>`**\
  将文本添加到语音队列进行合成和朗读。

- **`synthesizeToFile(text: string, filePath: string, options?: SpeechSynthesisOptions): Promise<void>`**\
  将文本合成为音频文件并保存在文档目录下的指定文件路径。

### 播放控制

- **`pause(at?: SpeechBoundary): Promise<boolean>`**\
  在指定的边界点暂停语音。默认在 `'immediate'` 处暂停。

- **`resume(): Promise<boolean>`**\
  从暂停状态恢复朗读。

- **`stop(at?: SpeechBoundary): Promise<boolean>`**\
  在指定边界点停止朗读。默认在 `'immediate'` 处停止。

### 状态管理

- **`isSpeaking`**: 检查当前合成器是否正在朗读或处于暂停状态。
- **`isPaused`**: 检查当前合成器是否处于暂停状态。

### 语音管理

- **`setVoiceByIdentifier(identifier: string): Promise<boolean>`**\
  根据语音标识符来设置语音。

- **`setVoiceByLanguage(language: string): Promise<boolean>`**\
  根据语言代码来设置语音。

***

## 事件监听器

### 支持的事件

- **`start`**: 语音合成开始。
- **`pause`**: 语音暂停。
- **`continue`**: 语音从暂停状态继续。
- **`finish`**: 语音朗读完成。
- **`cancel`**: 语音合成被取消。
- **`progress`**: 提供合成进度的详细信息（`SpeechProgressDetails`）。

### 监听器管理

- **`addListener(event: string, listener: Function): void`**\
  添加事件监听器。

- **`removeListener(event: string, listener: Function): void`**\
  移除事件监听器。

***

## 示例

### 配置 `SharedAudioSession`

```ts
await SharedAudioSession.setActive(true)
await SharedAudioSession.setCategory(
  "playback",
  ["mixWithOthers"]
)
```

### 播放文本

```ts
await Speech.speak("Hello, world!")
```

### 使用自定义选项朗读文本

```ts
await Speech.speak("Welcome to **Scripting**", {
  isMarkdown: true,
  pitch: 1.5,
  rate: 0.8,
  voiceLanguage: "en-US",
})
```

### 将文本合成为文件

```ts
import { Path } from "scripting"

const filePath = Path.join(FileManager.documentDirectory, "output.caf")
await Speech.synthesizeToFile("Saving to file.", filePath, { rate: 1.0 })
```

### 控制播放

```ts
await Speech.speak("Pausing example...")
await Speech.pause("word")
await Speech.resume()
await Speech.stop() // 默认在 "immediate" 处停止。
```

### 添加进度监听器

```ts
Speech.addListener("progress", (details) => {
  console.log(`正在朗读: ${details.word}`)
});
await Speech.speak("Event listening example.")
Speech.removeListener("progress", listener)
```

通过这些 API，你可以在脚本中实现功能强大的语音合成操作，包括基础的文本转语音、播放控制以及事件回调，为开发者提供灵活且丰富的 TTS 功能。
