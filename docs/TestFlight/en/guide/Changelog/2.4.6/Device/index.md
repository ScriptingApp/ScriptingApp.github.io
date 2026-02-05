---
title: Device
description: New networkInterfaces method.

---
        
The `Device` namespace provides access to information about the current device and its environment, including hardware characteristics, system details, screen metrics, battery status, orientation, proximity sensor state, locale and language settings, wake lock control, and network interfaces.

This API is commonly used to adapt UI layouts, behavior, and feature availability based on the device’s runtime context.

---

## Orientation

Represents the physical orientation of the device.

```ts
type Orientation =
  | "portrait"
  | "portraitUpsideDown"
  | "landscapeLeft"
  | "landscapeRight"
  | "faceUp"
  | "faceDown"
  | "unknown"
```

### Description

* `portrait`: Portrait orientation, default upright position
* `portraitUpsideDown`: Portrait orientation, upside down
* `landscapeLeft`: Landscape orientation rotated to the left
* `landscapeRight`: Landscape orientation rotated to the right
* `faceUp`: Device is lying flat with the screen facing upward
* `faceDown`: Device is lying flat with the screen facing downward
* `unknown`: Orientation cannot be determined

---

## InterfaceOrientation

Represents the supported interface orientations for the app.

```ts
type InterfaceOrientation =
  | "portrait"
  | "portraitUpsideDown"
  | "landscape"
  | "landscapeLeft"
  | "landscapeRight"
  | "all"
  | "allButUpsideDown"
```

### Description

* `portrait`: Portrait orientation, default upright position
* `portraitUpsideDown`: Portrait orientation, upside down
* `landscape`: Landscape orientation, either left or right
* `landscapeLeft`: Landscape orientation rotated to the left
* `landscapeRight`: Landscape orientation rotated to the right
* `all`: All supported orientations
* `allButUpsideDown`: All supported orientations except upside down

---

## NetworkInterface

Describes a single network interface address.

```ts
type NetworkInterface = {
  address: string
  netmask: string | null
  family: "IPv4" | "IPv6"
  mac: string | null
  isInternal: boolean
  cidr: string | null
}
```

### Properties

* `address`: IP address
* `netmask`: Subnet mask
* `family`: Address family, either IPv4 or IPv6
* `mac`: MAC address (may be null depending on system restrictions)
* `isInternal`: Indicates whether the interface is internal (for example, loopback)
* `cidr`: CIDR notation, such as `192.168.1.10/24`

---

## BatteryState

Represents the current battery state.

```ts
type BatteryState = "full" | "charging" | "unplugged" | "unknown"
```

### Description

* `full`: Battery is fully charged
* `charging`: Device is currently charging
* `unplugged`: Device is not connected to power
* `unknown`: Battery state cannot be determined

---

## Device Information

### model

```ts
const model: string
```

The device model, such as `"iPhone"` or `"iPad"`.

---

### localizedModel

```ts
const localizedModel: string
```

The localized name of the device model.

---

### systemVersion

```ts
const systemVersion: string
```

The current operating system version, for example `"18.2"`.

---

### systemName

```ts
const systemName: string
```

The name of the operating system, such as `"iOS"`, `"iPadOS"`, or `"macOS"`.

---

### isiPad / isiPhone

```ts
const isiPad: boolean
const isiPhone: boolean
```

Indicates whether the current device is an iPad or an iPhone.

---

### screen

```ts
const screen: {
  width: number
  height: number
  scale: number
}
```

Screen metrics:

* `width`: Screen width in logical pixels
* `height`: Screen height in logical pixels
* `scale`: Screen scale factor (for example, 2 or 3)

---

## Battery and Sensors

### batteryState

```ts
const batteryState: BatteryState
```

The current battery state.

---

### batteryLevel

```ts
const batteryLevel: number
```

The current battery level, expressed as a value between `0.0` and `1.0`.

---

### proximityState

```ts
const proximityState: boolean
```

The state of the proximity sensor.
`true` indicates that the device is close to the user, such as during a phone call.

---

## Orientation and Layout

### isLandscape / isPortrait / isFlat

```ts
const isLandscape: boolean
const isPortrait: boolean
const isFlat: boolean
```

* `isLandscape`: Indicates whether the device is in a landscape orientation
* `isPortrait`: Indicates whether the device is in a portrait orientation
* `isFlat`: Indicates whether the device is lying flat (face up or face down)

---

### orientation

```ts
const orientation: Orientation
```

The current physical orientation of the device.

---

### supportedInterfaceOrientations

```ts
var supportedInterfaceOrientations: InterfaceOrientation[]
```

The list of supported interface orientations. You can set this property to limit the orientations that your page supports.

#### Example
```tsx
function Page() {
  useEffect(() => {
    Device.supportedInterfaceOrientations = ["all"]
    return () => {
      Device.supportedInterfaceOrientations = ["portrait"]
    }
  }, [])
  return <VStack>...</VStack>
}
```

---

## Appearance and Environment

### colorScheme

```ts
const colorScheme: ColorScheme
```

The current system color scheme, such as light or dark mode.

---

### isiOSAppOnMac

```ts
const isiOSAppOnMac: boolean
```

Indicates whether the current process is an iPhone or iPad app running on macOS.

---

## Locale and Language

### systemLocale

```ts
const systemLocale: string
```

The current system locale, for example `"en_US"`.

---

### preferredLanguages

```ts
const preferredLanguages: string[]
```

The user’s preferred languages, for example:

```ts
["en-US", "zh-Hans-CN"]
```

---

### systemLocales (Deprecated)

```ts
const systemLocales: string[]
```

Deprecated. Use `preferredLanguages` instead.

---

### systemLanguageTag

```ts
const systemLanguageTag: string
```

The current language tag, such as `"en-US"`.

---

### systemLanguageCode

```ts
const systemLanguageCode: string
```

The current language code, such as `"en"`.

---

### systemCountryCode

```ts
const systemCountryCode: string | undefined
```

The current country code, such as `"US"`.

---

### systemScriptCode

```ts
const systemScriptCode: string | undefined
```

The script code of the current locale, such as `"Hans"` for Simplified Chinese.

---

## Wake Lock

### isWakeLockEnabled

```ts
const isWakeLockEnabled: Promise<boolean>
```

Retrieves whether the wake lock is currently enabled, preventing the device from automatically sleeping.

---

### setWakeLockEnabled

```ts
function setWakeLockEnabled(enabled: boolean): void
```

Enables or disables the wake lock.

Notes:

* Available only in the **Scripting app**
* When enabled, the device will remain awake and not auto-lock

---

## Battery Listeners

### addBatteryStateListener

```ts
function addBatteryStateListener(
  callback: (state: BatteryState) => void
): void
```

Registers a listener for battery state changes.

---

### removeBatteryStateListener

```ts
function removeBatteryStateListener(
  callback?: (state: BatteryState) => void
): void
```

Removes a battery state listener.
If `callback` is not provided, all battery state listeners are removed.

---

### addBatteryLevelListener

```ts
function addBatteryLevelListener(
  callback: (level: number) => void
): void
```

Registers a listener for battery level changes.

---

### removeBatteryLevelListener

```ts
function removeBatteryLevelListener(
  callback?: (level: number) => void
): void
```

Removes a battery level listener.
If `callback` is not provided, all battery level listeners are removed.

---

## Orientation Listeners

### addOrientationListener

```ts
function addOrientationListener(
  callback: (orientation: Orientation) => void
): void
```

Starts observing device orientation changes.

Notes:

* This method must be called before orientation updates are delivered
* Orientation updates do not work when system orientation lock is enabled

---

### removeOrientationListener

```ts
function removeOrientationListener(
  callback?: (orientation: Orientation) => void
): void
```

Removes an orientation change listener.
If `callback` is not provided, all orientation listeners are removed and observation is stopped.

---

## Proximity Listeners

### addProximityStateListener

```ts
function addProximityStateListener(
  callback: (state: boolean) => void
): void
```

Registers a listener for proximity sensor state changes.

---

### removeProximityStateListener

```ts
function removeProximityStateListener(
  callback?: (state: boolean) => void
): void
```

Removes a proximity state listener.
If `callback` is not provided, all proximity listeners are removed.

---

## Network

### networkInterfaces

```ts
function networkInterfaces(): Record<string, NetworkInterface[]>
```

Returns the network interfaces available on the device.

Return value:

* Keys are interface names (such as `en0`, `lo0`)
* Values are arrays of `NetworkInterface` objects associated with each interface

This method is useful for network diagnostics, retrieving local IP addresses, and debugging connectivity issues.
