# BluetoothCharacteristic

The `BluetoothCharacteristic` interface represents a Bluetooth Low Energy (BLE) characteristic, which is the fundamental data unit in a BLE service. A characteristic exposes a specific piece of data and supports operations such as reading, writing, or subscribing to notifications.

***

## 1. Properties

### `uuid: string`

The universally unique identifier (UUID) of the characteristic.

- Used to identify standard (e.g., `"2A37"` for Heart Rate Measurement) or custom vendor-defined characteristics.

***

### `serviceUUID: string | null`

The UUID of the service that contains this characteristic. May be `null` if the service is not known or not yet discovered.

***

### `properties: BluetoothCharacteristicProperty[]`

An array of supported operations for this characteristic. These define how the characteristic can be interacted with (read, write, notify, etc.).

#### Available Values (`BluetoothCharacteristicProperty`):

| Property                       | Description                                       |
| ------------------------------ | ------------------------------------------------- |
| `"broadcast"`                  | Supports broadcasting                             |
| `"read"`                       | Supports reading                                  |
| `"writeWithoutResponse"`       | Supports writing without requiring acknowledgment |
| `"write"`                      | Supports writing with response                    |
| `"notify"`                     | Supports notification when value changes          |
| `"indicate"`                   | Supports indication with acknowledgment           |
| `"authenticatedSignedWrites"`  | Supports authenticated signed writes              |
| `"extendedProperties"`         | Has extended properties (defined via descriptors) |
| `"notifyEncryptionRequired"`   | Notification requires an encrypted connection     |
| `"indicateEncryptionRequired"` | Indication requires an encrypted connection       |

**Example:**

```ts
if (characteristic.properties.includes("read")) {
  const value = await peripheral.readValue(characteristic)
}
```

***

### `isNotifying: boolean`

Indicates whether notifications or indications are currently enabled for the characteristic.

- `true`: Notifications or indications are active
- `false`: Notifications are not active

***

### `value: Data | null`

The current value of the characteristic, as a `Data` object.

- May be `null` if the value has not yet been read or written.
- Use `peripheral.readValue(characteristic)` to fetch the latest value.

***

## 2. Attribute Permissions

Although not directly present in the characteristic interface, attributes may be configured with permissions when used in a Peripheral (GATT Server) role.

### `BluetoothAttributePermissions` (Enum)

| Permission                  | Description                               |
| --------------------------- | ----------------------------------------- |
| `"readable"`                | The attribute can be read                 |
| `"writeable"`               | The attribute can be written              |
| `"readEncryptionRequired"`  | Requires an encrypted connection to read  |
| `"writeEncryptionRequired"` | Requires an encrypted connection to write |

***

## 3. Usage Examples

### Read from a characteristic (requires `"read"`)

```ts
if (characteristic.properties.includes("read")) {
  const value = await peripheral.readValue(characteristic)
  console.log("Value:", value?.toRawString())
}
```

***

### Write to a characteristic

```ts
const data = Data.fromRawString("COMMAND")
if (characteristic.properties.includes("writeWithoutResponse")) {
  await peripheral.writeValue(characteristic, data, "withoutResponse")
} else if (characteristic.properties.includes("write")) {
  await peripheral.writeValue(characteristic, data, "withResponse")
}
```

***

### Subscribe to notifications

```ts
if (characteristic.properties.includes("notify")) {
  await peripheral.subscribe(characteristic, (error, value) => {
    if (!error && value) {
      console.log("Notification received:", value.toHexString())
    }
  })
}
```

***

### Unsubscribe from notifications

```ts
await peripheral.unsubscribe(characteristic)
```

***

## 4. Best Practices and Notes

- Always call `discoverCharacteristics(service)` before interacting with any characteristic.
- Do not assume all characteristics support read/write; check `properties` before performing operations.
- When subscribing to notifications or indications, you must explicitly call `subscribe()` and later `unsubscribe()` to clean up.
- For `"writeWithoutResponse"` operations, use `canSendWriteWithoutResponse` to control flow rate.
- Before writing, use `maxWriteValueLength()` to ensure the data size is within limits.
