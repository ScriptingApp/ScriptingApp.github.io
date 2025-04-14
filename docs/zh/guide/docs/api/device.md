`Device` 接口提供了对当前设备及其环境的信息访问，并提供了一些控制设备功能（如唤醒锁）的方法。您可以获取设备相关的元数据，如机型、操作系统信息、屏幕方向、电池状态以及本地化设置。

## 概述

`Device` 是一个工具类，暴露了静态属性和方法。这意味着您可以直接在类上调用其成员，而无需实例化它。

示例：您可以像这样获取设备型号：
```tsx
const deviceModel = Device.model
console.log('Device Model:', deviceModel)
```

## 设备信息

- **`Device.model: string`**  
  设备型号，例如 `"iPhone"`。  
  ```tsx
  console.log(Device.model)  // "iPhone"
  ```

- **`Device.systemVersion: string`**  
  当前操作系统的版本，例如 `"16.0"`。  
  ```tsx
  console.log(Device.systemVersion)  // "16.0"
  ```

- **`Device.systemName: string`**  
  操作系统名称，通常为 `"iOS"`。  
  ```tsx
  console.log(Device.systemName)  // "iOS"
  ```

- **`Device.isiPad: boolean`**  
  指示当前设备是否为 iPad。  
  ```tsx
  if (Device.isiPad) {
    console.log("Running on an iPad")
  }
  ```

- **`Device.isiPhone: boolean`**  
  指示当前设备是否为 iPhone。  
  ```tsx
  if (Device.isiPhone) {
    console.log("Running on an iPhone")
  }
  ```

- **`Device.isiOSAppOnMac: boolean`**  
  检测当前进程是否为在 Mac 上运行的 iPhone 或 iPad App。  
  ```tsx
  if (Device.isiOSAppOnMac) {
    console.log("This iOS app is running on a Mac")
  }
  ```

## 电池信息

- **`Device.batteryState: "full" | "charging" | "unplugged" | "unknown"`**  
  设备当前的电池状态。  
  ```tsx
  console.log(Device.batteryState)  // 例如 "charging"
  ```

- **`Device.batteryLevel: number`**  
  代表电池电量的数值，范围在 `0.0` 到 `1.0` 之间。  
  ```tsx
  console.log(Device.batteryLevel)  // 例如 0.8 表示80%
  ```

## 屏幕方向 & 尺寸 & 外观

- **`Device.screen: { width: number; height: number; scale: number }`**  
  包含当前的屏幕尺寸和缩放比例。

- **`Device.isLandscape: boolean`**  
  如果设备目前为横向，则返回 `true`。

- **`Device.isPortrait: boolean`**  
  如果设备目前为纵向，则返回 `true`。

- **`Device.isFlat: boolean`**  
  如果设备平放在桌面（正面或背面朝上），则返回 `true`。

- **`Device.colorScheme: "light" | "dark"`**  
  设备当前的界面外观，为 `"light"` 或 `"dark"`。  
  ```tsx
  if (Device.colorScheme === 'dark') {
    console.log("Dark mode is enabled")
  }
  ```

## 本地化设置

- **`Device.systemLocale: string`**  
  当前系统区域设置，例如 `"en_US"`。

- **`Device.systemLocales: string[]`**  
  用户的偏好区域设置列表，例如 `["en-US", "zh-Hans-CN"]`。

- **`Device.systemLanguageTag: string`**  
  当前语言标记，如 `"en-US"`。

- **`Device.systemLanguageCode: string`**  
  从区域设置中得出的语言代码，例如 `"en"`。

- **`Device.systemCountryCode?: string`**  
  从区域设置中得出的国家/地区代码，例如 `"US"`。

- **`Device.systemScriptCode?: string`**  
  如果可用，脚本代码，例如 `"Hans"`（在 `"zh_CN_Hans"` 中）。

```tsx
console.log(Device.systemLocale)       // "en_US"
console.log(Device.systemLocales)      // ["en-US", "zh-Hans-CN"]
console.log(Device.systemLanguageTag)  // "en-US"
console.log(Device.systemLanguageCode) // "en"
console.log(Device.systemCountryCode)  // "US"
console.log(Device.systemScriptCode)   // 如果可用，则为 "Hans"
```

## 唤醒锁 (Wake Lock)

唤醒锁可以防止设备因无操作而自动熄屏。您可以使用以下方法来控制唤醒锁：

- **`Device.setWakeLockEnabled(enabled: boolean): void`**  
  启用或禁用唤醒锁。将 `enabled` 设置为 `true` 会阻止设备进入休眠状态。
  ```tsx
  // 让屏幕保持唤醒
  Device.setWakeLockEnabled(true)
  ```

- **`Device.isWakeLockEnabled(): Promise<boolean>`**  
  检查当前是否启用了唤醒锁。
  ```tsx
  Device.isWakeLockEnabled().then(isEnabled => {
    console.log("Wake lock enabled:", isEnabled)
  })
  ```