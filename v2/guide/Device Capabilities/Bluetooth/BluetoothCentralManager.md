# BluetoothCentralManager

The `BluetoothCentralManager` namespace provides core functionality for managing Bluetooth Low Energy (BLE) operations as a central device. It supports scanning, connecting, disconnecting, and retrieving known or connected peripherals. This API is ideal for building custom Bluetooth workflows, interacting with smart devices, wearables, and IoT peripherals.

***

## Properties

### `isScanning: Promise<boolean>`

> Returns whether the central manager is currently scanning for peripherals.

- **Type**: `Promise<boolean>`
- **Example**:

  ```ts
  const scanning = await BluetoothCentralManager.isScanning
  console.log(scanning ? "Scanning..." : "Not scanning")
  ```

***

## Methods

### `startScan(onDiscoverPeripheral, options?): Promise<void>`

> Starts scanning for BLE peripherals. The scan continues until you call `stopScan()`. The callback will be triggered every time a peripheral is discovered.

#### Parameters

- `onDiscoverPeripheral: (peripheral, advertisementData, rssi) => void`

  - Callback triggered on discovery.
  - Arguments:

    - `peripheral`: A `BluetoothPeripheral` object
    - `advertisementData`: A `BluetoothAdvertisementData` object
    - `rssi`: Signal strength in dBm

- `options?: { services?: string[]; allowDuplicates?: boolean; solicitedServiceUUIDs?: string[] }`

  - `services`: An array of UUID strings to filter devices by services
  - `allowDuplicates`: If `true`, reports duplicates; if `false` (default), filters out repeated discoveries
  - `solicitedServiceUUIDs`: An array of UUID strings to filter devices by solicited services

##### BluetoothAdvertisementData

When using `BluetoothCentralManager.startScan()` to scan for Bluetooth peripherals, each discovered device includes an `advertisementData` object. This object contains key metadata extracted from the peripheral's BLE advertisement packets. It can help identify, filter, or categorize devices before establishing a connection.

***

###### Type Definition

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

***

###### Field Descriptions

| Field Name              | Type                              | Description                                                                                |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| `localName`             | `string` (optional)               | The local name advertised by the peripheral, if available. Useful for display.             |
| `txPowerLevel`          | `number` (optional)               | Transmit power level in dBm. Combined with RSSI, it can be used for distance estimation.   |
| `manufacturerData`      | `Data` (optional)                 | Manufacturer-specific binary data. Often used to encode model or serial information.       |
| `serviceData`           | `Record<string, Data>` (optional) | Service-specific data mapped by UUID. Each value is a `Data` object.                       |
| `serviceUUIDs`          | `string[]` (optional)             | List of service UUIDs the peripheral is advertising. Indicates supported capabilities.     |
| `overflowServiceUUIDs`  | `string[]` (optional)             | Additional service UUIDs not included in `serviceUUIDs` due to size limits.                |
| `isConnectable`         | `boolean` (optional)              | Indicates whether the peripheral accepts connections. Helps filter broadcast-only devices. |
| `solicitedServiceUUIDs` | `string[]` (optional)             | UUIDs of services that the peripheral is requesting from central devices.                  |

***

###### Common Use Cases

- **Filtering devices** by `localName`, `serviceUUIDs`, or `isConnectable`
- **Identifying vendor-specific devices** using `manufacturerData`
- **Estimating distance** using `txPowerLevel` + RSSI
- **Understanding device intentions** via `solicitedServiceUUIDs`

***

###### Notes

- All fields are optional; some peripherals may omit certain fields.
- `manufacturerData` and `serviceData` are raw `Data` objects and must be parsed using manufacturer-specific formats.
- `serviceUUIDs` represent only advertised services. To get the full list of available services, call `peripheral.discoverServices()` after connecting.

#### Returns

- `Promise<void>`

#### Example

```ts
await BluetoothCentralManager.startScan((peripheral, adv, rssi) => {
  console.log(`Discovered ${peripheral.name} with RSSI ${rssi}`)
}, {
  services: ["180D"], // Filter for Heart Rate Service
  allowDuplicates: false
})
```

***

### `stopScan(): Promise<void>`

> Stops an ongoing scan.

#### Returns

- `Promise<void>`

#### Example

```ts
await BluetoothCentralManager.stopScan()
console.log("Scan stopped")
```

***

### `retrievePeripherals(ids: string[]): Promise<BluetoothPeripheral[]>`

> Retrieves known peripherals by their identifiers.

#### Parameters

- `ids`: An array of peripheral UUID strings

#### Returns

- `Promise<BluetoothPeripheral[]>`

#### Example

```ts
const known = await BluetoothCentralManager.retrievePeripherals(["A1-B2-C3-D4"])
```

***

### `retrieveConnectedPeripherals(serviceUUIDs: string[]): Promise<BluetoothPeripheral[]>`

> Retrieves currently connected peripherals that provide at least one of the specified services.

#### Parameters

- `serviceUUIDs`: An array of service UUID strings

#### Returns

- `Promise<BluetoothPeripheral[]>`

#### Example

```ts
const connected = await BluetoothCentralManager.retrieveConnectedPeripherals(["180F"])
console.log(`Found ${connected.length} connected devices with Battery Service`)
```

***

### `connect(peripheral, options?): Promise<void>`

> Establishes a connection to the specified peripheral.

#### Parameters

- `peripheral`: A `BluetoothPeripheral` object to connect to
- `options?`:

  - `startDelay?: number` – Delay in seconds before connecting
  - `enableTransportBridging?: boolean` – Enables transport bridging (advanced)
  - `requiresANCS?: boolean` – Whether Apple Notification Center Service is required
  - `enableAutoReconnect?: boolean` – Whether to auto-reconnect if disconnected
  - `notifyOnConnection?: boolean` - Whether to notify when the connection is established
  - `notifyOnDisconnection?: boolean` - Whether to notify when the connection is disconnected
  - `notifyOnNotification?: boolean` - Whether to notify when a notification is received

#### Returns

- `Promise<void>`

#### Example

```ts
await BluetoothCentralManager.connect(peripheral, {
  startDelay: 100,
  enableAutoReconnect: true
})
console.log("Connected")
```

***

### `disconnect(peripheral): Promise<void>`

> Disconnects from the specified peripheral. This is a non-blocking operation.

#### Parameters

- `peripheral`: A `BluetoothPeripheral` object

#### Returns

- `Promise<void>`

#### Notes

- Physical disconnection is not guaranteed if other apps are connected to the same peripheral.
- From the app's perspective, the device is considered disconnected and `onDisconnected` will be triggered.

#### Example

```ts
await BluetoothCentralManager.disconnect(peripheral)
console.log("Disconnected")
```

***

## Workflow Example

```ts
await BluetoothCentralManager.startScan((peripheral) => {
  BluetoothCentralManager.stopScan()
  BluetoothCentralManager.connect(peripheral)
    .then(() => peripheral.discoverServices())
    .then(() => console.log("Services discovered"))
})
```

***

## Best Practices

- Always call `stopScan()` when scanning is no longer needed to save battery and reduce system load.
- Make sure Bluetooth permissions are granted before using these APIs.
- After connecting to a peripheral, call `discoverServices()` followed by `discoverCharacteristics()` before reading or writing data.
