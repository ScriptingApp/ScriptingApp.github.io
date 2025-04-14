---
title: SharedAudioSession
---
The `SharedAudioSession` interface provides a convenient way to manage and interact with the shared audio session in your script. The audio session acts as an intermediary between your script, the Scripting app, the operating system, and the underlying audio hardware, enabling you to configure and control audio behavior effectively.

## Features

- Retrieve and set audio session categories, modes, and options.
- Configure the preferred sample rate for audio input and output.
- Handle audio interruptions.
- Query device capabilities for supported categories and modes.
- Tailor audio behaviors for specific app use cases, such as video recording, voice chat, or background playback.

---

## Methods and Properties

### 1. **Session Category and Options**

#### **`category`**
Get the current audio session category.

```typescript
const category = await SharedAudioSession.category
console.log(category) // Example: 'playback'
```

#### **`categoryOptions`**
Retrieve the current audio session category options.

```typescript
const options = await SharedAudioSession.categoryOptions
console.log(options) // Example: ['mixWithOthers', 'allowAirPlay']
```

#### **`setCategory(category: AudioSessionCategory, options: AudioSessionCategoryOptions[])`**
Set the audio session category with specific options.

```typescript
await SharedAudioSession.setCategory('playback', ['mixWithOthers'])
```

---

### 2. **Session Mode**

#### **`mode`**
Retrieve the current audio session mode.

```typescript
const mode = await SharedAudioSession.mode
console.log(mode) // Example: 'videoChat'
```

#### **`setMode(mode: AudioSessionMode)`**
Set the audio session mode.

```typescript
await SharedAudioSession.setMode('voiceChat')
```

---

### 3. **Sample Rate**

#### **`preferredSampleRate`**
Retrieve the preferred sample rate in hertz.

```typescript
const sampleRate = await SharedAudioSession.preferredSampleRate
console.log(sampleRate) // Example: 44100
```

#### **`setPreferredSampleRate(sampleRate: number)`**
Set the preferred sample rate for audio input and output.

```typescript
await SharedAudioSession.setPreferredSampleRate(48000)
```

---

### 4. **Interruption Handling**

#### **`addInterruptionListener(listener: AudioSessionInterruptionListener)`**
Listen for audio interruptions.

```typescript
SharedAudioSession.addInterruptionListener((type) => {
  if (type === 'began') {
    console.log('Audio interruption began')
  } else if (type === 'ended') {
    console.log('Audio interruption ended')
  }
})
```

#### **`removeInterruptionListener(listener: AudioSessionInterruptionListener)`**
Remove an interruption listener.

```typescript
SharedAudioSession.removeInterruptionListener(myListener)
```

---

### 5. **Device Capabilities**

#### **`availableCategories`**
Get the list of audio session categories available on the device.

```typescript
const categories = await SharedAudioSession.availableCategories
console.log(categories) // Example: ['playback', 'record', 'soloAmbient']
```

#### **`availableModes`**
Get the list of audio session modes available on the device.

```typescript
const modes = await SharedAudioSession.availableModes
console.log(modes) // Example: ['default', 'videoChat', 'voiceChat']
```

---

### 6. **Additional Properties**

#### **`isOtherAudioPlaying`**
Check if other audio is currently playing on the device.

```typescript
const isPlaying = await SharedAudioSession.isOtherAudioPlaying
console.log(isPlaying) // Example: true
```

#### **`secondaryAudioShouldBeSilencedHint`**
Check if secondary audio should be silenced.

```typescript
const shouldSilence = await SharedAudioSession.secondaryAudioShouldBeSilencedHint
console.log(shouldSilence) // Example: false
```

#### **`allowHapticsAndSystemSoundsDuringRecording`**
Check if haptics and system sounds are allowed during recording.

```typescript
const allowHaptics = await SharedAudioSession.allowHapticsAndSystemSoundsDuringRecording
console.log(allowHaptics) // Example: true
```

#### **`prefersNoInterruptionsFromSystemAlerts`**
Check if the session prefers no interruptions from system alerts.

```typescript
const prefersNoInterruptions = await SharedAudioSession.prefersNoInterruptionsFromSystemAlerts
console.log(prefersNoInterruptions) // Example: false
```

---

### 7. **Session Activation**

#### **`setActive(active: boolean)`**
Activate or deactivate the shared audio session.

```typescript
await SharedAudioSession.setActive(true)
```

---

### 8. **System Settings**

#### **`setAllowHapticsAndSystemSoundsDuringRecording(value: boolean)`**
Enable or disable haptics and system sounds during recording.

```typescript
await SharedAudioSession.setAllowHapticsAndSystemSoundsDuringRecording(true)
```

#### **`setPrefersNoInterruptionsFromSystemAlerts(value: boolean)`**
Set the preference for no interruptions from system alerts.

```typescript
await SharedAudioSession.setPrefersNoInterruptionsFromSystemAlerts(true)
```

---

## Enumerations

### **AudioSessionCategory**
Defines the session's audio category:
- `'ambient'`
- `'multiRoute'`
- `'playAndRecord'`
- `'playback'`
- `'record'`
- `'soloAmbient'`

### **AudioSessionCategoryOptions**
Optional behaviors for audio categories:
- `'mixWithOthers'`
- `'duckOthers'`
- `'interruptSpokenAudioAndMixWithOthers'`
- `'allowBluetooth'`
- `'allowBluetoothA2DP'`
- `'allowAirPlay'`
- `'defaultToSpeaker'`
- `'overrideMutedMicrophoneInterruption'`

### **AudioSessionMode**
Specifies the session's mode:
- `'default'`
- `'gameChat'`
- `'measurement'`
- `'moviePlayback'`
- `'spokenAudio'`
- `'videoChat'`
- `'videoRecording'`
- `'voiceChat'`
- `'voicePrompt'`

### **AudioSessionInterruptionType**
Specifies the type of interruption:
- `'began'`
- `'ended'`
- `'unknown'`

---

This interface offers extensive control over audio session management in Scripting, making it suitable for building audio-heavy script like music players and video conferencing tools.