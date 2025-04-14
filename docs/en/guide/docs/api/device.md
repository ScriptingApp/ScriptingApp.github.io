The `Device` interface provides information about the current device and its environment, as well as methods to control certain device capabilities like wake locks. You can access device-specific metadata such as model, operating system details, orientation, battery state, and localization settings.

## Overview

`Device` is a utility class that exposes static properties and methods. This means you can call its members directly on the class without needing to instantiate it.

For example, you can retrieve the device model like this:

```tsx
const deviceModel = Device.model
console.log('Device Model:', deviceModel)
```

## Device Information

- **`Device.model: string`**  
  The device model, e.g., `"iPhone"`.  
  ```tsx
  console.log(Device.model)  // "iPhone"
  ```

- **`Device.systemVersion: string`**  
  The current OS version, such as `"16.0"`.  
  ```tsx
  console.log(Device.systemVersion)  // "16.0"
  ```

- **`Device.systemName: string`**  
  The name of the operating system, typically `"iOS"`.  
  ```tsx
  console.log(Device.systemName)  // "iOS"
  ```

- **`Device.isiPad: boolean`**  
  Indicates whether the current device is an iPad.  
  ```tsx
  if (Device.isiPad) {
    console.log("Running on an iPad")
  }
  ```

- **`Device.isiPhone: boolean`**  
  Indicates whether the current device is an iPhone.  
  ```tsx
  if (Device.isiPhone) {
    console.log("Running on an iPhone")
  }
  ```

- **`Device.isiOSAppOnMac: boolean`**  
  Checks if the process is an iPhone or iPad app running on a Mac.  
  ```tsx
  if (Device.isiOSAppOnMac) {
    console.log("This iOS app is running on a Mac")
  }
  ```

## Battery Information

- **`Device.batteryState: "full" | "charging" | "unplugged" | "unknown"`**  
  The current battery state of the device.  
  ```tsx
  console.log(Device.batteryState)  // e.g., "charging"
  ```

- **`Device.batteryLevel: number`**  
  A number between 0.0 and 1.0 representing the battery level.  
  ```tsx
  console.log(Device.batteryLevel)  // e.g., 0.8 means 80%
  ```

## Screen & Orientation & Appearance

- **`Device.screen: { width: number; height: number; scale: number }`**  
  The current screen's width, height, and scale.

- **`Device.isLandscape: boolean`**  
  `true` if the device is currently in a landscape orientation.
  
- **`Device.isPortrait: boolean`**  
  `true` if the device is currently in a portrait orientation.
  
- **`Device.isFlat: boolean`**  
  `true` if the device is lying flat (face up or face down).
  
- **`Device.colorScheme: "light" | "dark"`**  
  The current interface appearance, either `"light"` or `"dark"`.
  
  ```tsx
  if (Device.colorScheme === 'dark') {
    console.log("Dark mode is enabled")
  }
  ```

## Localization Settings

- **`Device.systemLocale: string`**  
  The current system locale, such as `"en_US"`.
  
- **`Device.systemLocales: string[]`**  
  The user’s preferred locales, e.g., `["en-US", "zh-Hans-CN"]`.
  
- **`Device.systemLanguageTag: string`**  
  The current locale language tag, such as `"en-US"`.
  
- **`Device.systemLanguageCode: string`**  
  The language code derived from the locale, e.g., `"en"`.
  
- **`Device.systemCountryCode?: string`**  
  The country code derived from the locale, e.g., `"US"`.
  
- **`Device.systemScriptCode?: string`**  
  The script code if available, e.g., `"Hans"` in `"zh_CN_Hans"`.

```tsx
console.log(Device.systemLocale)       // "en_US"
console.log(Device.systemLocales)      // ["en-US", "zh-Hans-CN"]
console.log(Device.systemLanguageTag)  // "en-US"
console.log(Device.systemLanguageCode) // "en"
console.log(Device.systemCountryCode)  // "US"
console.log(Device.systemScriptCode)   // "Hans" if available
```

## Wake Lock

A wake lock prevents the device’s screen from turning off due to inactivity. Use these methods to control the wake lock:

- **`Device.setWakeLockEnabled(enabled: boolean): void`**  
  Enable or disable the wake lock. Setting `enabled` to `true` prevents the screen from sleeping.
  
  ```tsx
  // Keep the screen awake
  Device.setWakeLockEnabled(true)
  ```

- **`Device.isWakeLockEnabled(): Promise<boolean>`**  
  Checks if the wake lock is currently enabled.
  
  ```tsx
  Device.isWakeLockEnabled().then(isEnabled => {
    console.log("Wake lock enabled:", isEnabled)
  })
  ```