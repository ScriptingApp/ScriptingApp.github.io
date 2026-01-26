# 蓝牙外设管理器

`BluetoothPeripheralManager` 提供将设备作为 BLE 外设运行的能力，允许你：

- 广播设备名称与服务 UUID
- 添加并移除服务
- 处理来自中央设备的读写请求
- 发送通知给已订阅的中央设备
- 管理连接参数（如连接延迟）

该 API 适用于构建如自定义传感器设备、蓝牙外设模拟器、控制器等场景。

***

## 基本状态属性

### `isAdvertising: Promise<boolean>`

查询当前是否正在进行广播。

- **类型**：`Promise<boolean>`
- **示例**：

```ts
const advertising = await BluetoothPeripheralManager.isAdvertising
console.log(advertising ? "正在广播" : "已停止广播")
```

***

## 广播控制

### `startAdvertising(advertisementData): Promise<void>`

启动蓝牙广播。

- **参数**：

  - `advertisementData`（对象）：

    - `localName?: string`：设备名称
    - `serviceUUIDs?: string[]`：要广播的服务 UUID

- **示例**：

```ts
await BluetoothPeripheralManager.startAdvertising({
  localName: "MyPeripheral",
  serviceUUIDs: ["1234", "ABCD"]
})
```

***

### `stopAdvertising(): Promise<void>`

停止当前的广播。

```ts
await BluetoothPeripheralManager.stopAdvertising()
```

***

## 服务管理

### `addService(service): Promise<void>`

向外设添加服务及其特征值。

- **参数**：

  - `service` 对象：

    - `uuid`: 服务 UUID
    - `characteristics`: 特征值列表，每项包含：

      - `uuid`
      - `properties`: 如 `"read"`, `"writeWithoutResponse"` 等
      - `permissions`: 如 `"readable"`, `"writeEncryptionRequired"` 等
      - `value?`: 初始值（`Data` 类型）

- **示例**：

```ts
await BluetoothPeripheralManager.addService({
  uuid: "180F",
  characteristics: [
    {
      uuid: "2A19",
      properties: ["read", "notify"],
      permissions: ["readable"],
      value: Data.fromIntArray([85]) // 初始电量 85%
    }
  ]
})
```

***

### `removeService(serviceUUID: string): Promise<void>`

移除指定 UUID 的服务（仅移除由当前脚本添加的实例）。

***

### `removeAllServices(): Promise<void>`

移除所有由脚本添加的服务。

***

## 中央设备交互事件

### `onRestoreState: ((state) => void) | null`

当系统因后台 BLE 任务恢复脚本时调用，用于恢复已添加的服务和广播状态。

#### 类型定义：

```ts
var onRestoreState: ((state: {
  services: BluetoothServiceInfo[]
  advertisementData: BluetoothAdvertisementData
}) => void) | null
```

#### 示例：

```ts
BluetoothPeripheralManager.onRestoreState = (state) => {
  console.log("恢复状态，已注册服务数：", state.services.length)
}
```

***

### `onReadyToUpdateSubscribers: (() => void) | null`

如果调用 `updateValue()` 发送通知时因底层队列已满而失败，系统会在队列恢复后调用此回调，你可在此时重试发送。

#### 类型定义：

```ts
var onReadyToUpdateSubscribers: (() => void) | null
```

#### 示例：

```ts
BluetoothPeripheralManager.onReadyToUpdateSubscribers = () => {
  console.log("队列已空，准备重新发送通知")
}
```

***

### `onReadCharacteristicValue: (characteristicId, offset, central) => Promise<{result, value}>`

当远程中央设备请求读取某个特征值时调用此回调。如果你未实现该回调，则该读取请求将以 `readNotPermitted` 响应失败。

#### 类型定义：

```ts
var onReadCharacteristicValue: (
  characteristicId: string,
  offset: number,
  central: {
    id: string
    maximumUpdateValueLength: number
  }
) => Promise<{
  result: BluetoothATTResponseCode
  value?: Data | null
}> | null
```

#### 参数说明：

- `characteristicId`：请求读取的特征值 UUID 字符串。
- `offset`：从哪个偏移位置开始读取（通常为 0）。
- `central`：发起请求的中央设备信息：

  - `id`：中央设备的标识符。
  - `maximumUpdateValueLength`：该中央设备可接受的最大数据长度。

#### 返回：

一个 `Promise`，解析为对象：

- `result`：读取结果的响应码（参见 `BluetoothATTResponseCode` 枚举）。
- `value`：如果读取成功，返回一个 `Data` 对象；否则为 `null`。

#### 示例：

```ts
BluetoothPeripheralManager.onReadCharacteristicValue = async (id, offset, central) => {
  if (id === "2A19") {
    const batteryLevel = 85
    return {
      result: BluetoothATTResponseCode.success,
      value: Data.fromIntArray([batteryLevel])
    }
  }
  return { result: BluetoothATTResponseCode.attributeNotFound }
}
```

***

### `onWriteCharacteristicValue: (characteristicId, offset, value, central) => Promise<BluetoothATTResponseCode>`

当远程中央设备请求写入某个特征值时调用此回调。如果你未实现该回调，则写入请求将以 `writeNotPermitted` 响应失败。

#### 类型定义：

```ts
var onWriteCharacteristicValue: (
  characteristicId: string,
  offset: number,
  value: Data,
  central: {
    id: string
    maximumUpdateValueLength: number
  }
) => Promise<BluetoothATTResponseCode> | null
```

#### 参数说明：

- `characteristicId`：请求写入的特征值 UUID。
- `offset`：写入偏移（一般为 0）。
- `value`：远程写入的数据（`Data` 类型）。
- `central`：发起写入请求的中央设备。

#### 返回：

一个 `Promise`，解析为响应码，表示写入是否成功。

#### 示例：

```ts
BluetoothPeripheralManager.onWriteCharacteristicValue = async (id, offset, value, central) => {
  console.log(`收到写入请求：${id}`, value.toIntArray())
  if (id === "2A19") {
    // 可存储或响应更新
    return BluetoothATTResponseCode.success
  }
  return BluetoothATTResponseCode.attributeNotFound
}
```

***

### `onSubscribe: (characteristicId, central) => void`

当远程中央设备订阅某个支持 notify 或 indicate 的特征值时调用。

#### 类型定义：

```ts
var onSubscribe: (
  characteristicId: string,
  central: {
    id: string
    maximumUpdateValueLength: number
  }
) => void | null
```

#### 示例：

```ts
BluetoothPeripheralManager.onSubscribe = (id, central) => {
  console.log(`设备 ${central.id} 订阅了 ${id}`)
}
```

***

### `onUnsubscribe: (characteristicId, central) => void`

当远程中央设备取消订阅某个特征值时调用。

#### 类型定义：

```ts
var onUnsubscribe: (
  characteristicId: string,
  central: {
    id: string
    maximumUpdateValueLength: number
  }
) => void | null
```

#### 示例：

```ts
BluetoothPeripheralManager.onUnsubscribe = (id, central) => {
  console.log(`设备 ${central.id} 取消订阅了 ${id}`)
}
```

***

## 通知与订阅管理

### `getSubscribers(characteristicId: string): Promise<Central[]>`

获取当前订阅某个特征值的所有中央设备。

- 返回项结构：

  - `id: string`
  - `maximumUpdateValueLength: number`

***

### `updateValue(characteristicId, value, options?): Promise<boolean>`

更新特征值并向订阅者发送通知或指示。

- `options.centrals`：指定要发送的中央设备 ID（否则广播给所有已订阅设备）

- 返回值：

  - `true`: 发送成功
  - `false`: 传输队列满，需等待 `onReadyToUpdateSubscribers`

***

## 连接参数设置

### `setDesiredConnectionLatency(centralId, latency): Promise<void>`

设置与指定中央设备的期望连接延迟等级：

- `latency` 取值：

  - `"low"`：高频率交互（更快但更耗电）
  - `"medium"`：平衡模式
  - `"high"`：低频率交互（省电）

***

## 响应码枚举：BluetoothATTResponseCode

用于表示对读取/写入操作的响应结果：

| 名称                              | 数值 | 含义           |
| ------------------------------- | -- | ------------ |
| `success`                       | 0  | 操作成功         |
| `invalidHandle`                 | 1  | 无效的句柄        |
| `readNotPermitted`              | 2  | 不允许读取        |
| `writeNotPermitted`             | 3  | 不允许写入        |
| `invalidPdu`                    | 4  | 无效的 PDU      |
| `insufficientAuthentication`    | 5  | 未通过身份验证      |
| `requestNotSupported`           | 6  | 不支持该请求       |
| `invalidOffset`                 | 7  | 偏移量无效        |
| `insufficientAuthorization`     | 8  | 授权不足         |
| `prepareQueueFull`              | 9  | Prepare 队列已满 |
| `attributeNotFound`             | 10 | 未找到指定属性      |
| `attributeNotLong`              | 11 | 属性不支持长读写     |
| `insufficientEncryptionKeySize` | 12 | 加密密钥长度不足     |
| `invalidAttributeValueLength`   | 13 | 属性值长度无效      |
| `unlikelyError`                 | 14 | 发生了不太可能的错误   |
| `insufficientEncryption`        | 15 | 未加密或加密级别不足   |
| `unsupportedGroupType`          | 16 | 不支持的组类型      |
| `insufficientResources`         | 17 | 系统资源不足       |

***

## 示例：构建一个广播电量的外围设备

```ts
await BluetoothPeripheralManager.addService({
  uuid: "180F",
  characteristics: [
    {
      uuid: "2A19",
      properties: ["read", "notify"],
      permissions: ["readable"],
      value: Data.fromIntArray([100]) // 电量 100%
    }
  ]
})

await BluetoothPeripheralManager.startAdvertising({
  localName: "BatteryPeripheral",
  serviceUUIDs: ["180F"]
})

BluetoothPeripheralManager.onReadCharacteristicValue = async (id, offset, central) => {
  return { result: BluetoothATTResponseCode.success, value: Data.fromIntArray([90]) }
}
```
