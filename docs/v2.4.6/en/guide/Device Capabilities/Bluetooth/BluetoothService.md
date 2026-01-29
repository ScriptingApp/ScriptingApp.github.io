---
title: BluetoothService
description: This interface represents a Bluetooth Low Energy (BLE) service. A service is a logical grouping of related characteristics and possibly other included services.
tag: PRO
---

The `BluetoothService` interface represents a Bluetooth Low Energy (BLE) service. A service is a logical grouping of related characteristics and possibly other included services. Services are used to define the functionality of a peripheral device, such as Heart Rate Monitoring or Battery Level Reporting.

---

## Overview

Services provide structure to BLE communication. Each service is identified by a universally unique identifier (UUID) and may include:

* Characteristics: Data points and operations (e.g., read/write/notify)
* Included services: References to other services

---

## Properties

### `uuid: string`

The UUID of the service.

* This UUID identifies the type of service (e.g., standard service like Battery Service `"180F"` or custom UUID for vendor-defined functionality).
* You can use this to filter or recognize services.

---

### `peripheralId: string | null`

The identifier of the peripheral that contains this service.

* If the peripheral context is not known or no longer available, this value may be `null`.

---

### `isPrimary: boolean`

Indicates whether this is a primary or secondary service.

* `true`: This is a primary service essential to the device's functionality
* `false`: This is a secondary service typically used as a dependency of another service

---

### `includedServices: BluetoothService[] | null`

An array of included services referenced by this service.

* Included services may be primary or secondary.
* If not yet discovered, this value will be `null`.
* You must call `discoverIncludedServices(service)` on the associated `BluetoothPeripheral` to populate this.

---

### `characteristics: BluetoothCharacteristic[] | null`

The characteristics contained in this service.

* These define the operations (read, write, notify, etc.) and data exposed by the service.
* If not yet discovered, this will be `null`.
* You must call `discoverCharacteristics(service)` on the associated `BluetoothPeripheral` to populate this.

---

## Example

### Discover characteristics in a service

```ts
await peripheral.discoverServices()
for (const service of peripheral.services ?? []) {
  console.log("Service UUID:", service.uuid)

  await peripheral.discoverCharacteristics(service)
  for (const characteristic of service.characteristics ?? []) {
    console.log("Characteristic UUID:", characteristic.uuid)
  }
}
```

---

### Discover included services

```ts
await peripheral.discoverServices()
for (const service of peripheral.services ?? []) {
  await peripheral.discoverIncludedServices(service)
  for (const included of service.includedServices ?? []) {
    console.log("Included Service UUID:", included.uuid)
  }
}
```

---

## Notes

* All properties are read-only.
* Services must be discovered before accessing characteristics or included services.
* When working with included services, recursive discovery may be necessary if they contain their own dependencies.
