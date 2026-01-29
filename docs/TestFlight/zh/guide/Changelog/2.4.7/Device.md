---
title: 设备
description: 新增 proximityState、orientation 属性以及 addProximityListener 等监听方法。

---

`Device` 命名空间提供对当前设备硬件、系统环境、语言区域、屏幕信息、电池状态、方向感知、接近传感器以及网络接口等信息的访问能力，并提供相关状态变化的监听接口。

该 API 主要用于根据设备环境动态调整 UI、行为逻辑或系统能力使用方式。

---

## Orientation

表示设备当前的物理朝向。

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

### 说明

* `portrait`：竖屏，Home 键在下（或标准竖屏方向）
* `portraitUpsideDown`：竖屏倒置
* `landscapeLeft`：横屏，设备向左旋转
* `landscapeRight`：横屏，设备向右旋转
* `faceUp`：设备平放，屏幕朝上
* `faceDown`：设备平放，屏幕朝下
* `unknown`：无法确定方向

---

## NetworkInterface

描述单个网络接口地址的信息。

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

### 字段说明

* `address`：IP 地址
* `netmask`：子网掩码
* `family`：地址族，IPv4 或 IPv6
* `mac`：MAC 地址（部分系统或接口可能为 null）
* `isInternal`：是否为内部接口（如 loopback）
* `cidr`：CIDR 表示形式，例如 `192.168.1.10/24`

---

## BatteryState

表示当前电池状态。

```ts
type BatteryState = "full" | "charging" | "unplugged" | "unknown"
```

### 说明

* `full`：电量已充满
* `charging`：正在充电
* `unplugged`：未连接电源
* `unknown`：无法确定状态

---

## Device Information

### model

```ts
const model: string
```

设备型号，例如 `"iPhone"`、`"iPad"`。

---

### localizedModel

```ts
const localizedModel: string
```

本地化后的设备型号名称。

---

### systemVersion

```ts
const systemVersion: string
```

当前操作系统版本号，例如 `"18.2"`。

---

### systemName

```ts
const systemName: string
```

操作系统名称，例如 `"iOS"`、`"iPadOS"`、`"macOS"`。

---

### isiPad / isiPhone

```ts
const isiPad: boolean
const isiPhone: boolean
```

指示当前设备是否为 iPad 或 iPhone。

---

### screen

```ts
const screen: {
  width: number
  height: number
  scale: number
}
```

屏幕信息：

* `width`：屏幕宽度（逻辑像素）
* `height`：屏幕高度（逻辑像素）
* `scale`：屏幕缩放比例（如 2、3）

---

## Battery & Sensors

### batteryState

```ts
const batteryState: BatteryState
```

当前电池状态。

---

### batteryLevel

```ts
const batteryLevel: number
```

当前电量百分比，范围为 `0.0` 到 `1.0`。

---

### proximityState

```ts
const proximityState: boolean
```

接近传感器状态，`true` 表示设备靠近用户（例如通话时贴近耳朵）。

---

## Orientation & Layout

### isLandscape / isPortrait / isFlat

```ts
const isLandscape: boolean
const isPortrait: boolean
const isFlat: boolean
```

* `isLandscape`：是否处于横屏
* `isPortrait`：是否处于竖屏
* `isFlat`：设备是否平放（face up / face down）

---

### orientation

```ts
const orientation: Orientation
```

当前设备物理方向。

---

## Appearance & Environment

### colorScheme

```ts
const colorScheme: ColorScheme
```

当前系统颜色模式，例如浅色或深色模式。

---

### isiOSAppOnMac

```ts
const isiOSAppOnMac: boolean
```

指示当前进程是否为运行在 macOS 上的 iPhone / iPad App（Mac Catalyst 或 iOS App on Mac）。

---

## Locale & Language

### systemLocale

```ts
const systemLocale: string
```

当前系统 Locale，例如 `"en_US"`。

---

### preferredLanguages

```ts
const preferredLanguages: string[]
```

用户偏好的语言列表，例如：

```ts
["en-US", "zh-Hans-CN"]
```

---

### systemLocales（已废弃）

```ts
const systemLocales: string[]
```

已废弃，请使用 `preferredLanguages`。

---

### systemLanguageTag

```ts
const systemLanguageTag: string
```

语言标签，例如 `"en-US"`。

---

### systemLanguageCode

```ts
const systemLanguageCode: string
```

语言代码，例如 `"en"`。

---

### systemCountryCode

```ts
const systemCountryCode: string | undefined
```

国家代码，例如 `"US"`。

---

### systemScriptCode

```ts
const systemScriptCode: string | undefined
```

书写系统代码，例如 `"Hans"`（简体中文）。

---

## Wake Lock

### isWakeLockEnabled

```ts
const isWakeLockEnabled: Promise<boolean>
```

查询当前是否启用了屏幕唤醒锁定（防止设备自动锁屏）。

---

### setWakeLockEnabled

```ts
function setWakeLockEnabled(enabled: boolean): void
```

启用或禁用 Wake Lock。

说明：

* 仅在 **Scripting App** 内可用
* 启用后可防止设备自动休眠

---

## Battery Listeners

### addBatteryStateListener

```ts
function addBatteryStateListener(
  callback: (state: BatteryState) => void
): void
```

监听电池状态变化。

---

### removeBatteryStateListener

```ts
function removeBatteryStateListener(
  callback?: (state: BatteryState) => void
): void
```

移除电池状态监听器。

* 未传入 `callback` 时将移除所有监听器

---

### addBatteryLevelListener

```ts
function addBatteryLevelListener(
  callback: (level: number) => void
): void
```

监听电量变化。

---

### removeBatteryLevelListener

```ts
function removeBatteryLevelListener(
  callback?: (level: number) => void
): void
```

移除电量监听器。

---

## Orientation Listeners

### addOrientationListener

```ts
function addOrientationListener(
  callback: (orientation: Orientation) => void
): void
```

开始监听设备方向变化。

注意事项：

* 必须先调用该方法才能接收方向变化
* 系统方向锁开启时不会生效

---

### removeOrientationListener

```ts
function removeOrientationListener(
  callback?: (orientation: Orientation) => void
): void
```

移除方向监听器。

* 未传入 `callback` 时将停止所有方向监听并结束观察

---

## Proximity Listeners

### addProximityStateListener

```ts
function addProximityStateListener(
  callback: (state: boolean) => void
): void
```

监听接近传感器状态变化。

---

### removeProximityStateListener

```ts
function removeProximityStateListener(
  callback?: (state: boolean) => void
): void
```

移除接近传感器监听器。

---

## Network

### networkInterfaces

```ts
function networkInterfaces(): Record<string, NetworkInterface[]>
```

获取当前设备的网络接口信息。

返回值说明：

* Key：接口名称（如 `en0`、`lo0`）
* Value：该接口对应的地址信息数组

适用于网络诊断、本地 IP 获取、调试用途。
