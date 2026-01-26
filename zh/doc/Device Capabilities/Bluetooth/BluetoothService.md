# 蓝牙服务 PRO

`BluetoothService` 表示一个 BLE（低功耗蓝牙）服务。服务是外围设备中功能的逻辑分组，包含一个或多个特征值（`Characteristic`），也可以包含对其他服务的引用（包含服务）。

***

## 概述

每个服务都由一个唯一的 UUID 标识，用于描述设备提供的某项功能，例如：

- 标准服务，如 `"180F"` 表示电池服务
- 自定义服务，通常为厂商自定义的 UUID

服务的主要用途是组织设备提供的数据和操作。

***

## 属性说明

### `uuid: string`

服务的 UUID。

- 用于唯一标识服务类型
- 可通过此字段识别标准服务或自定义服务

***

### `peripheralId: string | null`

所属外围设备的标识符（UUID 字符串）。

- 如果上下文丢失或设备未记录，则可能为 `null`

***

### `isPrimary: boolean`

是否为主服务。

- `true`: 主服务，表示设备核心功能
- `false`: 次服务，通常被其他服务引用（嵌套）

***

### `includedServices: BluetoothService[] | null`

包含服务（referenced services）的数组。

- 这些服务可能是主服务或次服务
- 若尚未调用 `discoverIncludedServices()`，此值为 `null`
- 可通过 `BluetoothPeripheral.discoverIncludedServices(service)` 方法获取

***

### `characteristics: BluetoothCharacteristic[] | null`

当前服务下包含的特征值数组。

- 特征值用于实际的数据交互（读、写、通知等）
- 若尚未调用 `discoverCharacteristics()`，此值为 `null`
- 可通过 `BluetoothPeripheral.discoverCharacteristics(service)` 方法获取

***

## 使用示例

### 发现服务并列出特征值

```ts
await peripheral.discoverServices()
for (const service of peripheral.services ?? []) {
  console.log("服务 UUID:", service.uuid)

  await peripheral.discoverCharacteristics(service)
  for (const char of service.characteristics ?? []) {
    console.log("特征值 UUID:", char.uuid)
  }
}
```

***

### 发现包含服务（嵌套服务）

```ts
await peripheral.discoverServices()
for (const service of peripheral.services ?? []) {
  await peripheral.discoverIncludedServices(service)
  for (const included of service.includedServices ?? []) {
    console.log("包含服务 UUID:", included.uuid)
  }
}
```

***

## 注意事项

- 所有属性均为只读。
- 必须先调用 `discoverServices()` 才能访问 `characteristics` 和 `includedServices`。
- 包含服务可能嵌套更深层级，若需深入访问需递归调用发现方法。
