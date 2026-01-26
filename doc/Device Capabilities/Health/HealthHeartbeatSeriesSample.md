# HealthHeartbeatSeriesSample PRO

The `HealthHeartbeatSeriesSample` class provides an interface for accessing **heartbeat series samples**, representing a series of individual heartbeat intervals recorded over time. These samples are typically used for analyzing heart rhythm and detecting irregularities such as atrial fibrillation.

This class is returned by the public API method `Health.queryHeartbeatSeriesSamples()`.

***

## Use Cases

- **Monitoring heart rhythm** during workouts or recovery
- **Analyzing irregular heartbeats**
- **Studying heart behavior** during sleep or rest
- **Generating datasets** for research or diagnostics

***

## Class: `HealthHeartbeatSeriesSample`

### Properties

| Property     | Type                          | Description                                                           |
| ------------ | ----------------------------- | --------------------------------------------------------------------- |
| `uuid`       | `string`                      | A unique identifier for the sample                                    |
| `sampleType` | `string`                      | The type of the sample. Typically `"HKHeartbeatSeriesTypeIdentifier"` |
| `startDate`  | `Date`                        | When the heartbeat series recording began                             |
| `endDate`    | `Date`                        | When the recording ended                                              |
| `count`      | `number`                      | Total number of heartbeat intervals in the series                     |
| `metadata`   | `Record<string, any> \| null` | Optional metadata including device info or annotations                |

> **Note**: This class currently does not expose individual RR intervals. It represents only the series summary.

***

## Method: `Health.queryHeartbeatSeriesSamples(options?)`

### Definition

```ts
function queryHeartbeatSeriesSamples(
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
    strictStartDate?: boolean
    strictEndDate?: boolean
    sortDescriptors?: Array<{
      key: "startDate" | "endDate" | "count"
      order?: "forward" | "reverse"
    }>
    requestPermissions?: HealthQuantityType[]
  }
): Promise<HealthHeartbeatSeriesSample[]>
```

### Parameters

- `startDate` _(optional)_: Only return samples on or after this date.
- `endDate` _(optional)_: Only return samples on or before this date.
- `limit` _(optional)_: Maximum number of samples to return.
- `strictStartDate` _(optional)_: If true, only include samples whose `startDate` equals `startDate`.
- `strictEndDate` _(optional)_: If true, only include samples whose `endDate` equals `endDate`.
- `sortDescriptors` _(optional)_: Sort results by `startDate`, `endDate`, or `count`, in forward or reverse order.
- `requestPermissions` _(optional)_: An array of health quantity types for which to request permissions before querying. You must request permissions for the types you want to query. Default only requests permissions for the `heartbeat`, `heartRateVariabilitySDNN` and `heartRate` types.

### Returns

A Promise resolving to an array of `HealthHeartbeatSeriesSample` instances, sorted according to the provided descriptors.

***

## Example

```ts
async function fetchHeartbeatSeries() {
  const heartbeatSamples = await Health.queryHeartbeatSeriesSamples({
    startDate: new Date('2024-01-01'),
    endDate: new Date(),
    sortDescriptors: [
      { key: 'startDate', order: 'reverse' }
    ],
    limit: 5,
  })

  for (const sample of heartbeatSamples) {
    console.log('UUID:', sample.uuid)
    console.log('Start:', sample.startDate)
    console.log('End:', sample.endDate)
    console.log('Beats Count:', sample.count)
    console.log('Metadata:', sample.metadata)
  }
}
```

***

## Notes

- If no permission is granted to access heartbeat data, the returned array will be empty.
- Heartbeat series are most commonly recorded by Apple Watch and represent detailed rhythm data over short durations.
