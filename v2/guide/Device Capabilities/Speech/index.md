# Speech

The `Speech` interface provides a high-level API for text-to-speech (TTS) functionality. This interface allows you to synthesize speech, control playback, and manage speech synthesis settings. Below are the details of the `Speech` API, its methods, properties, and usage examples.

***

## Features Overview

- **Text-to-Speech:** Convert text into speech with customizable options like pitch, rate, and volume.
- **Voice Management:** Choose from available system voices by language or identifier.
- **Markdown Support:** Render text with basic formatting using Markdown.
- **Audio Session Management:** Control audio sessions for seamless speech integration with other audio sources.
- **Event Listeners:** Respond to speech synthesis lifecycle events.

***

## Type Definitions

### `SpeechBoundary`

Specifies when to pause or stop speech:

- `'immediate'`: Pause/stop immediately.
- `'word'`: Pause/stop after finishing the current word.

***

### `SpeechSynthesisVoice`

Represents a voice for speech synthesis:

- `identifier`: Unique voice identifier.
- `name`: Display name of the voice.
- `language`: BCP 47 language and locale code.
- `quality`: Voice quality (`'default'`, `'premium'`, `'enhanced'`).
- `gender`: Voice gender (`'male'`, `'female'`, `'unspecified'`).

***

### `SpeechProgressDetails`

Details about progress during speech synthesis:

- `text`: Full text being spoken.
- `start`: Start index of the current word.
- `end`: End index of the current word.
- `word`: The current word being spoken.

***

### `SpeechSynthesisOptions`

Options for customizing speech synthesis:

- `isMarkdown` (optional): Interpret text as Markdown.
- `pitch`, `rate`, `volume`: Override global `Speech` values for pitch, rate, and volume.
- `preUtteranceDelay`, `postUtteranceDelay`: Control pauses before and after utterances.
- `voiceIdentifier`, `voiceLanguage`: Override global voice settings.

***

## Static Properties

### Global Speech Settings

- `pitch`: Default pitch value (range: `0.5` to `2.0`; default: `1.0`).
- `rate`: Speech rate (range: `Speech.minSpeechRate` to `Speech.maxSpeechRate`; default: `Speech.defaultSpeechRate`).
- `volume`: Default volume (range: `0.0` to `1.0`; default: `1.0`).
- `preUtteranceDelay`, `postUtteranceDelay`: Global delays before and after utterances.

### Voice and Language

- `speechVoices`: Retrieves all available voices.
- `currentLanguageCode`: The device's current language code.

### Audio Session

- `usesApplicationAudioSession`: Specifies whether the app manages the audio session.

***

## Methods

### Speaking and Synthesis

- `speak(text: string, options?: SpeechSynthesisOptions): Promise<void>`\
  Adds text to the speech queue for synthesis.

- `synthesizeToFile(text: string, filePath: string, options?: SpeechSynthesisOptions): Promise<void>`\
  Synthesizes text to an audio file in the documents directory.

### Playback Control

- `pause(at?: SpeechBoundary): Promise<boolean>`\
  Pauses speech at the specified boundary. Defaults to "immediate".

- `resume(): Promise<boolean>`\
  Resumes speech from the paused state.

- `stop(at?: SpeechBoundary): Promise<boolean>`\
  Stops speech at the specified boundary. Defaults to "immediate".

### State Management

- `isSpeaking`: Checks if the synthesizer is speaking or paused.
- `isPaused`: Checks if the synthesizer is in a paused state.

### Voice Management

- `setVoiceByIdentifier(identifier: string): Promise<boolean>`\
  Sets a voice by its identifier.

- `setVoiceByLanguage(language: string): Promise<boolean>`\
  Sets a voice by its language code.

***

## Event Listeners

### Supported Events

- `start`: Speech synthesis starts.
- `pause`: Speech pauses.
- `continue`: Speech resumes.
- `finish`: Speech finishes.
- `cancel`: Speech is canceled.
- `progress`: Provides progress details (`SpeechProgressDetails`).

### Managing Listeners

- `addListener(event: string, listener: Function): void`\
  Adds an event listener.

- `removeListener(event: string, listener: Function): void`\
  Removes an event listener.

***

## Examples

### Setup `SharedAudioSession`

```ts
await SharedAudioSession.setActive(true)
await SharedAudioSession.setCategory(
  "playback",
  ["mixWithOthers"]
)
```

### Speak Text

```ts
await Speech.speak("Hello, world!")
```

### Speak with Custom Options

```ts
await Speech.speak("Welcome to **Scripting**", {
  isMarkdown: true,
  pitch: 1.5,
  rate: 0.8,
  voiceLanguage: "en-US",
})
```

### Synthesize to File

```ts
import { Path } from "scripting"

const filePath = Path.join(FileManager.documentDirectory, "output.caf")
await Speech.synthesizeToFile("Saving to file.", filePath, { rate: 1.0 })
```

### Control Playback

```ts
await Speech.speak("Pausing example...")
await Speech.pause("word")
await Speech.resume()
await Speech.stop() // Defaults stop "immediately".
```

### Add Progress Listener

```ts
Speech.addListener("progress", (details) => {
  console.log(`Speaking: ${details.word}`)
});
await Speech.speak("Event listening example.")
Speech.removeListener("progress", listener)
```
