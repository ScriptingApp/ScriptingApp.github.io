---
title: 蓝牙外设
description: 表示一个 BLE 外围设备对象，支持读取设备信息、连接状态、发现服务与特征值、读取写入数据、订阅通知等。
tag: PRO
---

`BluetoothPeripheral` 表示一个 BLE 外围设备对象，支持读取设备信息、连接状态、发现服务与特征值、读取写入数据、订阅通知等。它是蓝牙通信的主要交互对象。

---

## 属性（只读）

### `id: string`

设备唯一标识符（UUID 格式），可用于标识并连接该设备。此值在 App 生命周期中保持不变。

---

### `name: string | null`

设备的名称，可能为 `null`（例如设备未广播名称）。

---

### `isConnected: boolean`

是否已连接到设备：

* `true`: 已连接，可以进行数据交互
* `false`: 未连接或已断开

---

### `canSendWriteWithoutResponse: boolean`

是否允许进行无响应写入：

* `true`: 可发送无响应数据（`writeWithoutResponse`）
* `false`: 需等待写入响应（使用 `write`）

当该值变为 `true` 时会触发 `onReadyToSendWriteWithoutResponse` 事件。

---

### `ancsAuthorized: boolean`

是否已授权使用 Apple Notification Center Service（仅适用于支持 ANCS 的设备）。

---

### `services: BluetoothService[] | null`

已发现的服务列表，如果尚未调用 `discoverServices()`，此值为 `null`。

---

## 事件回调（可选）

### `onConnected: (() => void) | null`

连接成功时触发。

---

### `onDisconnected: ((error: Error | null, isReconnecting: boolean) => void) | null`

断开连接时触发。

* `error`: 若为非主动断开，则包含错误信息；否则为 `null`
* `isReconnecting`: 是否正在尝试重连

---

### `onConnectFailed: ((error: Error) => void) | null`

连接失败时触发。

---

### `onNameChanged: ((name: string | null) => void) | null`

设备名称发生变更时触发。

---

### `onDiscoverServices: ((error: Error | null, services: BluetoothService[] | null) => void) | null`

调用 `discoverServices()` 后，服务发现完成时触发。

---

### `onDiscoverCharacteristics: ((error: Error | null, characteristics: BluetoothCharacteristic[] | null) => void) | null`

调用 `discoverCharacteristics()` 后，特征值发现完成时触发。

---

### `onDiscoverIncludedServices: ((error: Error | null, services: BluetoothService[] | null) => void) | null`

调用 `discoverIncludedServices()` 后，包含服务发现完成时触发。

---

### `onReadyToSendWriteWithoutResponse: (() => void) | null`

设备准备好接收新的无响应写入时触发。

---

## 方法

### `readValue(characteristic: BluetoothCharacteristic): Promise<Data>`

读取指定特征值的内容。

* **参数**：

  * `characteristic`: 要读取的特征值对象
* **返回**：`Promise<Data>`，表示读取到的数据

---

### `maxWriteValueLength(writeType: "withResponse" | "withoutResponse"): number`

获取设备支持的最大写入字节数。

* **参数**：

  * `writeType`: `"withResponse"` 或 `"withoutResponse"`
* **返回**：可写入的最大字节数（`number`）

---

### `writeValue(characteristic, value, writeType): Promise<void>`

向特征值写入数据。

* **参数**：

  * `characteristic`: 要写入的特征值对象
  * `value`: 要写入的 `Data` 数据
  * `writeType`: 写入类型 `"withResponse"` 或 `"withoutResponse"`
* **返回**：`Promise<void>`

---

### `subscribe(characteristic, handler): Promise<void>`

订阅特征值通知或指示。

* **要求**：该特征值必须包含 `"notify"` 或 `"indicate"` 属性
* **参数**：

  * `characteristic`: 要订阅的特征值
  * `handler(error, value)`: 通知触发时回调函数

    * `error`: 出错时为 `Error`，否则为 `null`
    * `value`: 通知传递的 `Data` 数据，可能为 `null`
* **返回**：`Promise<void>`

---

### `unsubscribe(characteristic): Promise<void>`

取消特征值的通知订阅。

* **参数**：

  * `characteristic`: 要取消订阅的特征值
* **返回**：`Promise<void>`

---

### `discoverServices(serviceUUIDs?: string[]): Promise<void>`

发现设备提供的服务。

* **参数**：

  * `serviceUUIDs`: 可选服务 UUID 列表，用于筛选
* **返回**：`Promise<void>`

---

### `discoverIncludedServices(service, includedServiceUUIDs?): Promise<void>`

发现指定服务中嵌套的服务。

* **参数**：

  * `service`: 要发现的服务
  * `includedServiceUUIDs`: 可选的服务 UUID 筛选
* **返回**：`Promise<void>`

---

### `discoverCharacteristics(service, characteristicUUIDs?): Promise<void>`

发现指定服务中的特征值。

* **参数**：

  * `service`: 要发现的服务
  * `characteristicUUIDs`: 可选的特征值 UUID 筛选
* **返回**：`Promise<void>`

---

### `readRSSI(): Promise<number>`

读取当前设备的信号强度（RSSI，单位 dBm）。

* **返回**：`Promise<number>`

---

## 示例

### 连接设备并读取特征值

```ts
await BluetoothCentralManager.connect(peripheral)
await peripheral.discoverServices()

for (const service of peripheral.services ?? []) {
  await peripheral.discoverCharacteristics(service)
  for (const char of service.characteristics ?? []) {
    if (char.properties.includes("read")) {
      const value = await peripheral.readValue(char)
      console.log("读取到值:", value?.toRawString())
    }
  }
}
```

---

### 写入数据并订阅通知

```ts
const data = Data.fromRawString("hello")
await peripheral.writeValue(characteristic, data, "withResponse")

await peripheral.subscribe(characteristic, (error, value) => {
  if (!error && value) {
    console.log("收到通知:", value.toHexString())
  }
})
```

---

## 注意事项

* 所有操作前必须确保设备已连接，并通过 `discoverServices()` 和 `discoverCharacteristics()` 获取服务和特征值。
* 订阅通知后应在合适时机调用 `unsubscribe()` 释放资源。
* `canSendWriteWithoutResponse` 为 `false` 时不应进行无响应写入。
