# 设备

`Device` 命名空间提供当前运行设备的基础信息、系统环境、屏幕与电池状态、语言与地区设置，以及部分与设备能力相关的方法（如唤醒锁、网络接口信息）。

该 API 常用于：

- 设备差异化逻辑（iPhone / iPad / Mac）
- UI 布局与适配
- 多语言与本地化判断
- 网络调试与诊断
- 防止脚本执行期间设备休眠

***

## 设备与系统信息

### `Device.model: string`

设备型号名称，例如 `"iPhone"`、`"iPad"`。

***

### `Device.systemName: string`

当前操作系统名称，例如 `"iOS"`、`"iPadOS"`、`"macOS"`。

***

### `Device.systemVersion: string`

当前操作系统版本号，例如 `"17.2"`。

***

### `Device.isiPhone: boolean`

当前设备是否为 iPhone。

***

### `Device.isiPad: boolean`

当前设备是否为 iPad。

***

### `Device.isiOSAppOnMac: boolean`

当前进程是否为 **iPhone / iPad App 运行在 Mac 上**（Mac Catalyst / Apple Silicon Mac）。

***

## 屏幕信息

### `Device.screen`

当前主屏幕的信息。

```ts
{
  width: number
  height: number
  scale: number
}
```

字段说明：

- `width`：屏幕逻辑宽度（pt）
- `height`：屏幕逻辑高度（pt）
- `scale`：屏幕缩放因子（如 2 / 3）

常用于布局计算、画布尺寸、截图或渲染比例控制。

***

## 方向与姿态

### `Device.isPortrait: boolean`

当前设备是否处于竖屏方向。

***

### `Device.isLandscape: boolean`

当前设备是否处于横屏方向。

***

### `Device.isFlat: boolean`

设备是否平放（例如放在桌面上）。

该值通常基于设备姿态传感器，用于高级交互或方向判断。

***

## 外观与主题

### `Device.colorScheme: ColorScheme`

当前系统外观模式。

可能的值通常包括：

- `light`
- `dark`

可用于根据系统外观自动调整 UI 主题或样式。

***

## 电池信息

### `Device.batteryState`

当前电池状态：

```ts
"full" | "charging" | "unplugged" | "unknown"
```

说明：

- `full`：电池已充满
- `charging`：正在充电
- `unplugged`：未连接电源
- `unknown`：状态不可用

***

### `Device.batteryLevel: number`

当前电量百分比，取值范围：

- `0.0` \~ `1.0`
- 当电量不可用时，可能返回 `-1`

***

## 语言与地区设置

### `Device.systemLocale: string`

系统当前使用的 Locale，例如：

```text
"en_US"
```

***

### `Device.preferredLanguages: string[]`

用户偏好的语言列表（按优先级排序），例如：

```ts
["en-US", "zh-Hans-CN"]
```

推荐用于多语言内容选择。

***

### `Device.systemLocales: string[]` （已废弃）

用户偏好的 Locale 列表。

> 已废弃，请使用 `Device.preferredLanguages`。

***

### `Device.systemLanguageTag: string`

当前语言的 BCP-47 语言标签，例如：

```text
"en-US"
```

***

### `Device.systemLanguageCode: string`

当前语言代码，例如：

```text
"en"
```

***

### `Device.systemCountryCode: string | undefined`

当前国家 / 地区代码，例如：

```text
"US"
```

如果系统未设置国家信息，可能为 `undefined`。

***

### `Device.systemScriptCode: string | undefined`

当前语言的书写系统代码，例如：

```text
"Hans"   // zh_CN_Hans
```

常用于区分简体 / 繁体等书写系统。

***

## 唤醒锁（Wake Lock）

唤醒锁用于防止设备在脚本运行期间自动休眠。

### `Device.isWakeLockEnabled: Promise<boolean>`

获取当前是否启用了唤醒锁。

```ts
const enabled = await Device.isWakeLockEnabled
```

***

### `Device.setWakeLockEnabled(enabled: boolean): void`

启用或关闭唤醒锁。

```ts
Device.setWakeLockEnabled(true)
```

说明：

- 仅在 **Scripting App** 中可用
- 启用后可防止屏幕自动熄灭或设备进入休眠
- 建议在不需要时及时关闭，以节省电量

***

## 网络接口信息

### `Device.NetworkInterface`

网络接口对象结构：

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

字段说明：

- `address`：IP 地址
- `netmask`：子网掩码
- `family`：地址类型（IPv4 / IPv6）
- `mac`：MAC 地址（部分系统可能为 null）
- `isInternal`：是否为内部接口（如回环接口）
- `cidr`：CIDR 表示法（如 `192.168.1.10/24`）

***

### `Device.networkInterfaces(): Record<string, NetworkInterface[]>`

获取设备当前的网络接口信息。

返回值结构：

```ts
{
  [interfaceName: string]: NetworkInterface[]
}
```

示例：

```ts
const interfaces = Device.networkInterfaces()

for (const name in interfaces) {
  for (const info of interfaces[name]) {
    console.log(name, info.address, info.family)
  }
}
```

常见用途：

- 获取本地 IP 地址
- 区分 Wi-Fi / 蜂窝网络 / 回环接口
- 网络调试与诊断
- 模拟 Node.js `os.networkInterfaces()` 行为

***

## 使用建议

- 语言与地区相关逻辑优先使用 `preferredLanguages`
- 唤醒锁应在任务完成后及时关闭
- 网络接口信息可能因系统权限或网络状态变化而不同
- 不要假设某个接口名称一定存在（如 `en0`）
