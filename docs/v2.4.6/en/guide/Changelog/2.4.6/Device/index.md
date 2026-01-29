---
title: Device
description: New networkInterfaces method.

---
        
The `Device` namespace provides access to device information, system environment data, screen and battery status, language and locale settings, and selected device capabilities (such as wake lock and network interface inspection).

This API is commonly used for:

* Device-specific logic (iPhone / iPad / Mac)
* UI layout and adaptive design
* Localization and language selection
* Network inspection and debugging
* Preventing the device from sleeping during script execution

---

## Device and System Information

### `Device.model: string`

The device model name, for example `"iPhone"` or `"iPad"`.

---

### `Device.systemName: string`

The name of the operating system, such as `"iOS"`, `"iPadOS"`, or `"macOS"`.

---

### `Device.systemVersion: string`

The current operating system version, for example `"17.2"`.

---

### `Device.isiPhone: boolean`

Indicates whether the current device is an iPhone.

---

### `Device.isiPad: boolean`

Indicates whether the current device is an iPad.

---

### `Device.isiOSAppOnMac: boolean`

A Boolean value that indicates whether the process is an iPhone or iPad app running on a Mac (Mac Catalyst or Apple Silicon).

---

## Screen Information

### `Device.screen`

Information about the main screen.

```ts
{
  width: number
  height: number
  scale: number
}
```

Field descriptions:

* `width`: Logical screen width (points)
* `height`: Logical screen height (points)
* `scale`: Screen scale factor (for example, 2 or 3)

This is commonly used for layout calculations, canvas sizing, screenshots, or rendering logic.

---

## Orientation and Device Posture

### `Device.isPortrait: boolean`

Indicates whether the device is currently in portrait orientation.

---

### `Device.isLandscape: boolean`

Indicates whether the device is currently in landscape orientation.

---

### `Device.isFlat: boolean`

Indicates whether the device is lying flat (for example, placed on a table).

This value is typically derived from motion sensors and can be used for advanced interaction logic.

---

## Appearance and Theme

### `Device.colorScheme: ColorScheme`

The current system appearance mode.

Typical values include:

* `light`
* `dark`

This is useful for adapting UI themes and styles to match system settings.

---

## Battery Information

### `Device.batteryState`

The current battery state:

```ts
"full" | "charging" | "unplugged" | "unknown"
```

Descriptions:

* `full`: Battery is fully charged
* `charging`: Battery is charging
* `unplugged`: Device is not connected to power
* `unknown`: Battery state is unavailable

---

### `Device.batteryLevel: number`

The current battery level, in the range:

* `0.0` to `1.0`
* May return `-1` if the battery level is unavailable

---

## Language and Locale Settings

### `Device.systemLocale: string`

The system’s current locale identifier, for example:

```text
"en_US"
```

---

### `Device.preferredLanguages: string[]`

The user’s preferred languages, ordered by priority, for example:

```ts
["en-US", "zh-Hans-CN"]
```

This is the recommended API for language selection and localization logic.

---

### `Device.systemLocales: string[]` (Deprecated)

The user’s preferred locales.

> Deprecated. Use `Device.preferredLanguages` instead.

---

### `Device.systemLanguageTag: string`

The current language tag in BCP-47 format, for example:

```text
"en-US"
```

---

### `Device.systemLanguageCode: string`

The current language code, for example:

```text
"en"
```

---

### `Device.systemCountryCode: string | undefined`

The current country or region code, for example:

```text
"US"
```

This value may be `undefined` if no country information is available.

---

### `Device.systemScriptCode: string | undefined`

The script code of the current language, for example:

```text
"Hans"   // zh_CN_Hans
```

This is commonly used to distinguish writing systems, such as Simplified vs. Traditional Chinese.

---

## Wake Lock

Wake lock prevents the device from automatically sleeping while a script is running.

### `Device.isWakeLockEnabled: Promise<boolean>`

Retrieves whether the wake lock is currently enabled.

```ts
const enabled = await Device.isWakeLockEnabled
```

---

### `Device.setWakeLockEnabled(enabled: boolean): void`

Enables or disables the wake lock.

```ts
Device.setWakeLockEnabled(true)
```

Notes:

* Available only in the **Scripting app**
* Prevents the screen from dimming or the device from sleeping
* Should be disabled when no longer needed to conserve battery

---

## Network Interface Information

### `Device.NetworkInterface`

The structure that represents a network interface entry:

```ts
type NetworkInterface = {
  address: string
  netmask: string | null
  family: 'IPv4' | 'IPv6'
  mac: string | null
  isInternal: boolean
  cidr: string | null
}
```

Field descriptions:

* `address`: IP address
* `netmask`: Subnet mask
* `family`: Address family (`IPv4` or `IPv6`)
* `mac`: MAC address (may be null on some systems)
* `isInternal`: Indicates whether the interface is internal (for example, loopback)
* `cidr`: CIDR notation (for example, `192.168.1.10/24`)

---

### `Device.networkInterfaces(): Record<string, NetworkInterface[]>`

Returns the network interfaces of the device.

The returned object is structured as:

```ts
{
  [interfaceName: string]: NetworkInterface[]
}
```

Example:

```ts
const interfaces = Device.networkInterfaces()

for (const name in interfaces) {
  for (const info of interfaces[name]) {
    console.log(name, info.address, info.family)
  }
}
```

Common use cases:

* Retrieving local IP addresses
* Distinguishing Wi-Fi, cellular, and loopback interfaces
* Network diagnostics and debugging
* Emulating Node.js `os.networkInterfaces()` behavior

---

## Best Practices

* Prefer `preferredLanguages` for localization logic
* Always disable the wake lock when it is no longer required
* Do not assume specific interface names (such as `en0`) will always exist
* Network interface availability may vary based on permissions and network state

