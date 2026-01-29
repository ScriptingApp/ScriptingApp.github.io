---
title: BluetoothPeripheralManager
description: This interface allows you to create a Bluetooth peripheral that can advertise services and characteristics, and accept connections from central devices.
tag: PRO
---

The `BluetoothPeripheralManager` API enables your device to act as a Bluetooth Low Energy (BLE) peripheral. It allows you to:

* Advertise device name and service UUIDs
* Add or remove services with characteristics
* Handle read and write requests from central devices
* Notify subscribed centrals of characteristic value changes
* Manage connection parameters such as connection latency

This API is ideal for building custom sensor devices, BLE peripheral simulators, controllers, and similar use cases.

---

## Core Status Property

### `isAdvertising: Promise<boolean>`

Returns whether the device is currently advertising as a peripheral.

```ts
const advertising = await BluetoothPeripheralManager.isAdvertising
console.log(advertising ? "Advertising" : "Not advertising")
```

---

## Advertising Control

### `startAdvertising(advertisementData: { localName?: string; serviceUUIDs?: string[] }): Promise<void>`

Begins BLE advertising with optional device name and service UUIDs.

```ts
await BluetoothPeripheralManager.startAdvertising({
  localName: "MyPeripheral",
  serviceUUIDs: ["1234", "ABCD"]
})
```

---

### `stopAdvertising(): Promise<void>`

Stops ongoing BLE advertising.

```ts
await BluetoothPeripheralManager.stopAdvertising()
```

---

## Service Management

### `addService(service): Promise<void>`

Adds a service and its characteristics to the peripheral.

**Parameters:**

```ts
{
  uuid: string,
  characteristics: Array<{
    uuid: string,
    properties: string[], // e.g., ["read", "notify"]
    permissions: string[], // e.g., ["readable"]
    value?: Data
  }>
}
```

**Example:**

```ts
await BluetoothPeripheralManager.addService({
  uuid: "180F",
  characteristics: [
    {
      uuid: "2A19",
      properties: ["read", "notify"],
      permissions: ["readable"],
      value: Data.fromIntArray([85]) // 85% battery
    }
  ]
})
```

---

### `removeService(serviceUUID: string): Promise<void>`

Removes a previously added service by its UUID.

---

### `removeAllServices(): Promise<void>`

Removes all services added by the current script.

---

## Event Handlers for Central Interaction

### `onRestoreState: ((state) => void) | null`

Called when the system restores your script due to a background BLE session. Useful for restoring service and advertising state.

```ts
BluetoothPeripheralManager.onRestoreState = (state) => {
  console.log("Restored state. Services count:", state.services.length)
}
```

```ts
type RestoreState = {
  services: BluetoothServiceInfo[]
  advertisementData: BluetoothAdvertisementData
}
```

---

### `onReadyToUpdateSubscribers: (() => void) | null`

Called when the system's transmission queue is cleared and ready to send notifications again after a previous failure due to queue congestion.

```ts
BluetoothPeripheralManager.onReadyToUpdateSubscribers = () => {
  console.log("Ready to resend notifications")
}
```

---

### `onReadCharacteristicValue: (characteristicId, offset, central) => Promise<{result, value}>`

Invoked when a remote central requests to read a characteristic.

If not implemented, the system returns `readNotPermitted`.

```ts
BluetoothPeripheralManager.onReadCharacteristicValue = async (id, offset, central) => {
  if (id === "2A19") {
    return {
      result: BluetoothATTResponseCode.success,
      value: Data.fromIntArray([85]) // battery level
    }
  }
  return { result: BluetoothATTResponseCode.attributeNotFound }
}
```

**Signature:**

```ts
(
  characteristicId: string,
  offset: number,
  central: {
    id: string,
    maximumUpdateValueLength: number
  }
) => Promise<{
  result: BluetoothATTResponseCode,
  value?: Data | null
}>
```

---

### `onWriteCharacteristicValue: (characteristicId, offset, value, central) => Promise<BluetoothATTResponseCode>`

Invoked when a remote central attempts to write to a characteristic.

If not implemented, the system returns `writeNotPermitted`.

```ts
BluetoothPeripheralManager.onWriteCharacteristicValue = async (id, offset, value, central) => {
  console.log(`Write request to ${id}:`, value.toIntArray())
  if (id === "2A19") {
    return BluetoothATTResponseCode.success
  }
  return BluetoothATTResponseCode.attributeNotFound
}
```

**Signature:**

```ts
(
  characteristicId: string,
  offset: number,
  value: Data,
  central: {
    id: string,
    maximumUpdateValueLength: number
  }
) => Promise<BluetoothATTResponseCode>
```

---

### `onSubscribe: (characteristicId, central) => void`

Called when a central subscribes to a characteristic that supports notifications or indications.

```ts
BluetoothPeripheralManager.onSubscribe = (id, central) => {
  console.log(`Central ${central.id} subscribed to ${id}`)
}
```

---

### `onUnsubscribe: (characteristicId, central) => void`

Called when a central unsubscribes from a characteristic.

```ts
BluetoothPeripheralManager.onUnsubscribe = (id, central) => {
  console.log(`Central ${central.id} unsubscribed from ${id}`)
}
```

---

## Notifications and Subscriptions

### `getSubscribers(characteristicId: string): Promise<Central[]>`

Returns a list of central devices currently subscribed to a given characteristic.

Each item:

```ts
{
  id: string,
  maximumUpdateValueLength: number
}
```

---

### `updateValue(characteristicId: string, value: Data, options?): Promise<boolean>`

Sends a notification or indication to all subscribed centrals (or a specified subset) with the updated characteristic value.

**Returns:**

* `true`: Successfully sent
* `false`: Queue is full — wait for `onReadyToUpdateSubscribers` before retrying

---

## Connection Parameters

### `setDesiredConnectionLatency(centralId: string, latency): Promise<void>`

Sets the preferred connection latency for a specific central device.

* `"low"` – Faster interaction, higher power usage
* `"medium"` – Balanced
* `"high"` – Lower power usage, less frequent interaction

---

## `BluetoothATTResponseCode` Enumeration

Defines response codes for read/write operations:

| Name                            | Value | Meaning                        |
| ------------------------------- | ----- | ------------------------------ |
| `success`                       | 0     | Operation succeeded            |
| `invalidHandle`                 | 1     | Invalid handle                 |
| `readNotPermitted`              | 2     | Read not permitted             |
| `writeNotPermitted`             | 3     | Write not permitted            |
| `invalidPdu`                    | 4     | Invalid PDU                    |
| `insufficientAuthentication`    | 5     | Not authenticated              |
| `requestNotSupported`           | 6     | Request not supported          |
| `invalidOffset`                 | 7     | Invalid offset                 |
| `insufficientAuthorization`     | 8     | Not authorized                 |
| `prepareQueueFull`              | 9     | Prepare queue is full          |
| `attributeNotFound`             | 10    | Attribute not found            |
| `attributeNotLong`              | 11    | Attribute not long             |
| `insufficientEncryptionKeySize` | 12    | Encryption key size too small  |
| `invalidAttributeValueLength`   | 13    | Invalid attribute value length |
| `unlikelyError`                 | 14    | Unlikely error occurred        |
| `insufficientEncryption`        | 15    | Encryption required            |
| `unsupportedGroupType`          | 16    | Unsupported group type         |
| `insufficientResources`         | 17    | Insufficient resources         |

---

## Example: Broadcasting a Battery Service

```ts
await BluetoothPeripheralManager.addService({
  uuid: "180F",
  characteristics: [
    {
      uuid: "2A19",
      properties: ["read", "notify"],
      permissions: ["readable"],
      value: Data.fromIntArray([100]) // Battery level 100%
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
