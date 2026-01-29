---
title: 蓝牙服务特征值
description: 表示蓝牙服务（`BluetoothService`）中的一个特征值，是 BLE 设备数据交互的核心单元。
tag: PRO
---

`BluetoothCharacteristic` 表示蓝牙服务（`BluetoothService`）中的一个特征值，是 BLE 设备数据交互的核心单元。每个特征值由唯一 UUID 标识，并定义了支持的操作类型、当前值、通知状态等属性。

---

## 一、属性字段

### `uuid: string`

特征值的 UUID（统一唯一标识符），用于识别特征的类型。

* 示例：

  * `"2A37"` 表示标准心率测量特征
  * `"6E400002-B5A3-F393-E0A9-E50E24DCCA9E"` 是一个自定义特征 UUID

---

### `serviceUUID: string | null`

当前特征值所属服务的 UUID，如果服务未被发现则可能为 `null`。

---

### `properties: BluetoothCharacteristicProperty[]`

当前特征值支持的操作类型，是以下字符串枚举值组成的数组（可能同时包含多个）：

#### 可用的属性（`BluetoothCharacteristicProperty` 枚举）：

| 属性名                            | 说明                      |
| ------------------------------ | ----------------------- |
| `"broadcast"`                  | 支持广播（较少使用）              |
| `"read"`                       | 支持读取特征值                 |
| `"writeWithoutResponse"`       | 支持写入但不要求响应（更快，适用于高频率写入） |
| `"write"`                      | 支持写入并要求响应（更安全）          |
| `"notify"`                     | 支持通知（value 变化时主动推送）     |
| `"indicate"`                   | 支持指示（带确认的通知）            |
| `"authenticatedSignedWrites"`  | 支持认证写入（安全性更高）           |
| `"extendedProperties"`         | 包含扩展属性（由额外属性描述符定义）      |
| `"notifyEncryptionRequired"`   | 通知需加密（必须加密连接才能启用通知）     |
| `"indicateEncryptionRequired"` | 指示需加密（同上）               |

#### 示例判断：

```ts
if (characteristic.properties.includes("read")) {
  const value = await peripheral.readValue(characteristic)
}
```

---

### `isNotifying: boolean`

当前是否处于通知（`notify`）或指示（`indicate`）订阅状态。

* `true`: 已启用订阅，设备会推送值变化
* `false`: 未启用订阅

> 可通过 `peripheral.subscribe()` 和 `unsubscribe()` 控制通知状态。

---

### `value: Data | null`

当前特征值的内容，通常在调用 `readValue()` 或接收到通知时更新。

* `Data` 为 Scripting 提供的二进制数据类型
* 若尚未读取或写入，此字段可能为 `null`

---

## 二、特征权限

虽然 `BluetoothCharacteristic` 接口本身不包含权限字段，但在创建或定义特征值（如 Peripheral 模式）时可用下列权限枚举类型：

### `BluetoothAttributePermissions` 枚举（权限类型）

| 权限值                         | 说明      |
| --------------------------- | ------- |
| `"readable"`                | 可被读取    |
| `"writeable"`               | 可被写入    |
| `"readEncryptionRequired"`  | 读取需加密连接 |
| `"writeEncryptionRequired"` | 写入需加密连接 |

---

## 三、操作示例

### 读取特征值（需支持 `"read"`）

```ts
if (characteristic.properties.includes("read")) {
  const value = await peripheral.readValue(characteristic)
  console.log("读取到内容:", value?.toRawString())
}
```

---

### 写入特征值（需支持 `"write"` 或 `"writeWithoutResponse"`）

```ts
const data = Data.fromRawString("COMMAND")
if (characteristic.properties.includes("writeWithoutResponse")) {
  await peripheral.writeValue(characteristic, data, "withoutResponse")
} else if (characteristic.properties.includes("write")) {
  await peripheral.writeValue(characteristic, data, "withResponse")
}
```

---

### 订阅通知（需支持 `"notify"` 或 `"indicate"`）

```ts
if (characteristic.properties.includes("notify")) {
  await peripheral.subscribe(characteristic, (error, value) => {
    if (!error && value) {
      console.log("收到通知:", value.toHexString())
    }
  })
}
```

---

### 取消通知订阅

```ts
await peripheral.unsubscribe(characteristic)
```

---

## 四、使用建议与注意事项

* 特征值操作前必须调用 `discoverCharacteristics(service)` 获取特征值列表。
* **不要假设**所有特征值都支持读写，请根据 `properties` 判断支持的操作。
* 通知（Notify）和指示（Indicate）必须先调用 `subscribe()`，停止时需配套调用 `unsubscribe()`。
* 使用 `"writeWithoutResponse"` 时，建议配合 `canSendWriteWithoutResponse` 状态控制频率。
* 写入前建议调用 `maxWriteValueLength()` 获取最大支持长度。
