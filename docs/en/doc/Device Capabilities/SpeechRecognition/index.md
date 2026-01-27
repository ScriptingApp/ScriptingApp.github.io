---
title: SpeechRecognition

---
        
The `SpeechRecognition` interface provides a high-level API for performing speech recognition. It supports real-time speech recognition and recognition of audio files, offering flexibility in a variety of use cases.

---

## Features Overview

- **Real-Time Recognition:** Transcribe live audio from the microphone.
- **File-Based Recognition:** Analyze and transcribe recorded audio files.
- **Multi-Language Support:** Specify the recognition locale for different languages.
- **Intermediate Results:** Access partial and final results for progressive transcription.
- **Custom Callbacks:** Handle transcription results and sound level changes with event listeners.

---

## Type Definitions

### `RecognitionTaskHint`
Hints for the type of task for which speech recognition is used:
- `'confirmation'`: For commands like "yes," "no," or "maybe."
- `'dictation'`: For tasks similar to keyboard dictation.
- `'search'`: For identifying search terms.
- `'unspecified'`: For general-purpose speech recognition.

---

### `SpeechRecognitionResult`
Represents the result of speech recognition:
- `isFinal`: Indicates if the transcription is complete and final.
- `text`: The transcription as a user-displayable string, with the highest confidence level.

---

## Static Properties

### Supported Locales
- `supportedLocales`: Returns a list of locales supported by the speech recognizer, such as `"en-US"`, `"fr-FR"`, or `"zh-CN"`.

### Recognition State
- `isRecognizing`: Indicates whether a recognition request is currently active.

---

## Methods

### Start Real-Time Recognition
`start(options: object): Promise<boolean>`  
Starts speech recognition from the device microphone.

#### Options
- `locale`: Locale string for the desired language (optional).
- `partialResults`: Return intermediate results (default: `true`).
- `addsPunctuation`: Automatically add punctuation to results (default: `false`).
- `requestOnDeviceRecognition`: Keep audio data on the device (default: `false`).
- `taskHint`: Specify the recognition task type (`'confirmation'`, `'dictation'`, `'search'`, `'unspecified'`).
- `useDefaultAudioSessionSettings`: Use default audio session settings (default: `true`).
- `onResult`: Callback for recognition results (`SpeechRecognitionResult`).
- `onSoundLevelChanged`: Callback for sound level changes (optional).

#### Example
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

### Recognize Speech in Audio Files
`recognizeFile(options: object): Promise<boolean>`  
Starts recognition for a recorded audio file.

#### Options
- `filePath`: Path to the audio file.
- `locale`: Locale string for the desired language (optional).
- `partialResults`: Return intermediate results (default: `false`).
- `addsPunctuation`: Automatically add punctuation to results (default: `false`).
- `requestOnDeviceRecognition`: Keep audio data on the device (default: `false`).
- `taskHint`: Specify the recognition task type (`'confirmation'`, `'dictation'`, `'search'`, `'unspecified'`).
- `onResult`: Callback for recognition results (`SpeechRecognitionResult`).

#### Example
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

### Stop Recognition
`stop(): Promise<void>`  
Stops an active speech recognition session.

#### Example
```ts
await SpeechRecognition.stop()
```

---

## Examples

### Real-Time Recognition with Progress Updates
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

### Recognize Audio File
```ts
await SpeechRecognition.recognizeFile({
  filePath: FileManager.join(FileManager.documentDirectory, "audio.m4a"),
  partialResults: false,
  onResult: (result) => {
    console.log("File recognition completed. Transcription:", result.text)
  }
})
```

### Stop Active Recognition
```ts
if (await SpeechRecognition.start({
  // ...
})) {
  // Stop after 10 seconds.
  setTimeout(() => {
    await SpeechRecognition.stop()
  }, 10 * 1000)
}

```

---

## Notes

- Ensure the necessary microphone or file access permissions are granted before using this API.
- Use `supportedLocales` to determine available languages for recognition.
- For optimal performance, use audio files in formats supported by iOS (e.g., `.wav`, `.m4a`).