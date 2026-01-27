---
title: BluetoothPeripheral
tag: PRO
---

The `BluetoothPeripheral` interface represents a Bluetooth Low Energy (BLE) peripheral device. It provides properties and methods for interacting with the device, including connecting, discovering services and characteristics, reading/writing values, and subscribing to notifications.

---

## Properties (Read-only)

### `id: string`

A unique identifier (UUID string) for the peripheral. It remains constant across app launches and can be used to identify and reconnect to the device.

---

### `name: string | null`

The name of the peripheral device, or `null` if not available (e.g., if not broadcast).

---

### `isConnected: boolean`

Indicates whether the peripheral is currently connected.

* `true`: Connected and ready for communication
* `false`: Not connected or disconnected

---

### `canSendWriteWithoutResponse: boolean`

Indicates whether the peripheral is ready to send write requests without waiting for a response.

* `true`: Supports fast, unacknowledged writes (`writeWithoutResponse`)
* `false`: Requires response before next write

The `onReadyToSendWriteWithoutResponse` callback is triggered when this changes to `true`.

---

### `ancsAuthorized: boolean`

Indicates whether the peripheral is authorized to use Apple Notification Center Service (ANCS). Relevant only for peripherals that support ANCS.

---

### `services: BluetoothService[] | null`

The list of services discovered on the peripheral. `null` if `discoverServices()` has not been called yet.

---

## Event Handlers

### `onConnected: (() => void) | null`

Called when the peripheral is successfully connected.

---

### `onDisconnected: ((error: Error | null, isReconnecting: boolean) => void) | null`

Called when the peripheral is disconnected.

* `error`: An error object if the disconnection was unexpected, or `null` if intentional
* `isReconnecting`: `true` if the system is attempting to reconnect automatically

---

### `onConnectFailed: ((error: Error) => void) | null`

Called when the peripheral fails to connect.

---

### `onNameChanged: ((name: string | null) => void) | null`

Called when the peripheral's name changes.

---

### `onDiscoverServices: ((error: Error | null, services: BluetoothService[] | null) => void) | null`

Called after calling `discoverServices()`.

---

### `onDiscoverCharacteristics: ((error: Error | null, characteristics: BluetoothCharacteristic[] | null) => void) | null`

Called after calling `discoverCharacteristics()`.

---

### `onDiscoverIncludedServices: ((error: Error | null, services: BluetoothService[] | null) => void) | null`

Called after calling `discoverIncludedServices()`.

---

### `onReadyToSendWriteWithoutResponse: (() => void) | null`

Called when the peripheral is ready to send more write requests without response.

---

## Methods

### `readValue(characteristic: BluetoothCharacteristic): Promise<Data>`

Reads the value of a given characteristic.

* **Parameters**:

  * `characteristic`: The characteristic to read from
* **Returns**: A `Promise<Data>` containing the value

---

### `maxWriteValueLength(writeType: "withResponse" | "withoutResponse"): number`

Gets the maximum number of bytes that can be written in a single operation.

* **Parameters**:

  * `writeType`: `"withResponse"` or `"withoutResponse"`
* **Returns**: A `number` representing the max write size

---

### `writeValue(characteristic, value, writeType): Promise<void>`

Writes data to a characteristic.

* **Parameters**:

  * `characteristic`: Target characteristic
  * `value`: The data to write (`Data`)
  * `writeType`: `"withResponse"` or `"withoutResponse"`
* **Returns**: `Promise<void>`

---

### `subscribe(characteristic, handler): Promise<void>`

Subscribes to notifications or indications from a characteristic.

* **Requirements**: The characteristic must support `"notify"` or `"indicate"`
* **Parameters**:

  * `characteristic`: Target characteristic
  * `handler(error, value)`: Callback triggered on value change

    * `error`: Error object if any
    * `value`: New value as `Data`
* **Returns**: `Promise<void>`

---

### `unsubscribe(characteristic): Promise<void>`

Unsubscribes from notifications for a characteristic.

* **Parameters**:

  * `characteristic`: Target characteristic
* **Returns**: `Promise<void>`

---

### `discoverServices(serviceUUIDs?: string[]): Promise<void>`

Discovers the services available on the peripheral.

* **Parameters**:

  * `serviceUUIDs`: Optional list of service UUIDs to filter
* **Returns**: `Promise<void>`

---

### `discoverIncludedServices(service, includedServiceUUIDs?): Promise<void>`

Discovers included services within a service.

* **Parameters**:

  * `service`: The parent service
  * `includedServiceUUIDs`: Optional list of included service UUIDs
* **Returns**: `Promise<void>`

---

### `discoverCharacteristics(service, characteristicUUIDs?): Promise<void>`

Discovers characteristics within a service.

* **Parameters**:

  * `service`: The target service
  * `characteristicUUIDs`: Optional list of characteristic UUIDs
* **Returns**: `Promise<void>`

---

### `readRSSI(): Promise<number>`

Reads the current Received Signal Strength Indicator (RSSI).

* **Returns**: A `Promise<number>` representing signal strength in dBm

---

## Examples

### Connect and Read Characteristics

```ts
await BluetoothCentralManager.connect(peripheral)
await peripheral.discoverServices()

for (const service of peripheral.services ?? []) {
  await peripheral.discoverCharacteristics(service)
  for (const char of service.characteristics ?? []) {
    if (char.properties.includes("read")) {
      const value = await peripheral.readValue(char)
      console.log("Value:", value?.toRawString())
    }
  }
}
```

---

### Write Value and Subscribe

```ts
const data = Data.fromRawString("hello")
await peripheral.writeValue(characteristic, data, "withResponse")

await peripheral.subscribe(characteristic, (error, value) => {
  if (!error && value) {
    console.log("Notification:", value.toHexString())
  }
})
```

---

## Notes

* Always call `discoverServices()` and `discoverCharacteristics()` before interacting with a peripheral’s data.
* Be sure to `unsubscribe()` when notifications are no longer needed.
* Avoid writing when `canSendWriteWithoutResponse` is `false`.
