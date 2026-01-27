---
title: 蓝牙中央设备管理器
tag: PRO
---

`BluetoothCentralManager` 提供了用于操作 BLE 中央设备的核心接口，包括扫描附近蓝牙设备、连接外设、获取已知设备、断开连接等能力。适用于实现如外设控制、数据采集、IoT通信等典型蓝牙场景。

---

## 成员属性

### `isScanning: Promise<boolean>`

> 获取当前是否正在扫描外围设备。

* **类型**：`Promise<boolean>`
* **示例**：

  ```ts
  const scanning = await BluetoothCentralManager.isScanning
  console.log(scanning ? "正在扫描" : "未扫描")
  ```

---

## 方法

### `startScan(onDiscoverPeripheral, options?): Promise<void>`

> 启动 BLE 设备扫描，直到调用 `stopScan()` 结束。每发现一个设备都会触发 `onDiscoverPeripheral` 回调。

#### 参数

* `onDiscoverPeripheral: (peripheral, advertisementData, rssi) => void`

  * 每发现一个外围设备时调用
  * 参数说明：

    * `peripheral`: `BluetoothPeripheral` 外设对象
    * `advertisementData`: `BluetoothAdvertisementData` 广播数据
    * `rssi`: `number` 信号强度（dBm）

* `options?: { services?: string[]; allowDuplicates?: boolean; solicitedServiceUUIDs?: string[] }`

  * `services`: 只扫描包含指定服务 UUID 的外设
  * `allowDuplicates`: 是否允许重复回调同一设备，默认 `false`
  * `solicitedServiceUUIDs`: 一个包含外设请求的服务 UUID 的数组，表明希望由中央设备提供哪些服务

##### BluetoothAdvertisementData 广播数据结构

在使用 `BluetoothCentralManager.startScan()` 进行蓝牙扫描时，每次发现设备都会返回包含该设备广播数据的 `advertisementData` 对象。该对象包含设备在广播包中附带的多种信息字段，用于识别、过滤、分类外设。

---

###### 数据结构说明

```ts
type BluetoothAdvertisementData = {
  localName?: string
  txPowerLevel?: number
  manufacturerData?: Data
  serviceData?: Record<string, Data>
  serviceUUIDs?: string[]
  overflowServiceUUIDs?: string[]
  isConnectable?: boolean
  solicitedServiceUUIDs?: string[]
}
```

---

###### 字段详解

| 字段名                     | 类型                         | 说明                                            |
| ----------------------- | -------------------------- | --------------------------------------------- |
| `localName`             | `string`（可选）               | 外设广播的本地名称（若有）。用于展示用户可识别的设备名称。                 |
| `txPowerLevel`          | `number`（可选）               | 发射功率（单位 dBm）。用于估算设备距离，RSSI + TxPower 可用于计算距离。 |
| `manufacturerData`      | `Data`（可选）                 | 厂商自定义数据，常用于识别设备型号、序列号等。需自行解析 `Data`。          |
| `serviceData`           | `Record<string, Data>`（可选） | 服务数据字段，键为服务 UUID，值为对应的服务内容（`Data` 类型）。        |
| `serviceUUIDs`          | `string[]`（可选）             | 广播中声明支持的服务 UUID 列表。可用于快速判断设备功能类型。             |
| `overflowServiceUUIDs`  | `string[]`（可选）             | 当 `serviceUUIDs` 超出广播数据包大小限制时，会将溢出部分放入该字段。    |
| `isConnectable`         | `boolean`（可选）              | 该设备是否支持连接。扫描结果中用于快速过滤无法连接的广播型设备。              |
| `solicitedServiceUUIDs` | `string[]`（可选）             | 外设请求的服务 UUID，表明希望由中央设备提供哪些服务。                 |

---

###### 常见用途

* 根据 `localName` 或 `serviceUUIDs` 进行设备筛选
* 解析 `manufacturerData` 判断厂商/设备类型
* 结合 `txPowerLevel` 和 `RSSI` 估算设备距离
* 利用 `isConnectable` 判断是否需要尝试连接

---

###### 注意事项

* 所有字段均为可选项，某些设备可能不广播特定字段
* `manufacturerData` 和 `serviceData` 是原始二进制数据（`Data` 类型），需根据厂商协议解析
* `serviceUUIDs` 仅代表广播包中声明的服务，完整服务需通过 `discoverServices()` 获取

#### 返回值

* `Promise<void>`：扫描启动成功时 resolve，失败时 reject

#### 示例

```ts
await BluetoothCentralManager.startScan((peripheral, adv, rssi) => {
  console.log(`发现设备: ${peripheral.name}, 信号: ${rssi} dBm`)
}, {
  services: ["180D"], // 只扫描支持心率服务的设备
  allowDuplicates: false
})
```

---

### `stopScan(): Promise<void>`

> 停止正在进行的扫描操作。

#### 返回值

* `Promise<void>`：成功停止时 resolve

#### 示例

```ts
await BluetoothCentralManager.stopScan()
console.log("已停止扫描")
```

---

### `retrievePeripherals(ids: string[]): Promise<BluetoothPeripheral[]>`

> 根据设备 UUID 获取已知的蓝牙设备（可能已连接或已配对）。

#### 参数

* `ids: string[]`：设备的唯一标识符数组

#### 返回值

* `Promise<BluetoothPeripheral[]>`：返回符合 ID 的设备列表

#### 示例

```ts
const knownDevices = await BluetoothCentralManager.retrievePeripherals(["A1-B2-C3-D4"])
```

---

### `retrieveConnectedPeripherals(serviceUUIDs: string[]): Promise<BluetoothPeripheral[]>`

> 获取当前连接中并提供指定服务的外围设备。

#### 参数

* `serviceUUIDs: string[]`：过滤条件，仅返回包含这些服务 UUID 的设备

#### 返回值

* `Promise<BluetoothPeripheral[]>`：匹配的设备列表

#### 示例

```ts
const connected = await BluetoothCentralManager.retrieveConnectedPeripherals(["180F"])
console.log(`发现 ${connected.length} 个已连接电池服务设备`)
```

---

### `connect(peripheral, options?): Promise<void>`

> 与指定外围设备建立连接。

#### 参数

* `peripheral: BluetoothPeripheral`：要连接的设备
* `options?:` 可选连接配置：

  * `startDelay?: number`：延迟连接（秒）
  * `enableTransportBridging?: boolean`：启用传输桥接（用于特殊外设）
  * `requiresANCS?: boolean`：是否需要 ANCS 支持（苹果通知服务）
  * `enableAutoReconnect?: boolean`：是否自动重连
  * `notifyOnConnection?: boolean` - 是否通知app连接成功
  * `notifyOnDisconnection?: boolean` - 是否通知app连接已断开
  * `notifyOnNotification?: boolean` - 是否通知app收到通知

#### 返回值

* `Promise<void>`：连接成功 resolve，失败 reject

#### 示例

```ts
await BluetoothCentralManager.connect(peripheral, {
  startDelay: 100,
  enableAutoReconnect: true
})
console.log("已连接到外设")
```

---

### `disconnect(peripheral): Promise<void>`

> 断开与指定外围设备的连接。此操作是非阻塞的，部分尚未完成的操作可能无法继续。

#### 参数

* `peripheral: BluetoothPeripheral`：要断开的设备

#### 返回值

* `Promise<void>`

#### 注意事项

* 并不能保证物理连接立即断开（系统层面可能仍被其他 App 占用）
* 但从 Scripting 角度来看，设备即视为断开，`onDisconnected` 回调将被调用

#### 示例

```ts
await BluetoothCentralManager.disconnect(peripheral)
console.log("已断开连接")
```

---

## 注意事项

* 所有蓝牙方法需要在已授权蓝牙权限的前提下执行。
* 设备连接后请调用 `discoverServices()` 发现服务，然后通过 `discoverCharacteristics()` 获取特征值后再读写。
* 建议在扫描结束后手动调用 `stopScan()`，避免后台持续运行。

---

## 示例工作流程

```ts
await BluetoothCentralManager.startScan((peripheral) => {
  BluetoothCentralManager.stopScan()
  BluetoothCentralManager.connect(peripheral)
    .then(() => peripheral.discoverServices())
    .then(() => console.log("服务已发现"))
})
```
