---
title: Query Statistics
tag: PRO
---

The `queryStatistics` method retrieves **aggregated statistics** for a specific health quantity type over a defined date range. It can compute metrics such as total sum, average, minimum, maximum, most recent value, and duration, with optional support for breaking down results by source (e.g., device or app).

This method is ideal for producing **daily, weekly, or historical health summaries**.

---

## Method Signature

```ts
function queryStatistics(
  quantityType: HealthQuantityType,
  options?: {
    startDate?: Date
    endDate?: Date
    strictStartDate?: boolean
    strictEndDate?: boolean
    statisticsOptions?: HealthStatisticsOptions | Array<HealthStatisticsOptions>
  }
): Promise<HealthStatistics | null>
```

---

## Parameters

### `quantityType: HealthQuantityType` (required)

The health quantity type to query, such as:

* `"stepCount"`
* `"heartRate"`
* `"bodyMass"`
* `"activeEnergyBurned"`
* Any supported `HealthQuantityType`

---

### `options` (optional)

An object specifying filtering and configuration options for the query.

| Option              | Type                                                     | Description                                                                             |
| ------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `startDate`         | `Date`                                                   | The start date for the query range.                                                     |
| `endDate`           | `Date`                                                   | The end date for the query range.                                                       |
| `strictStartDate`   | `boolean`                                                | If `true`, only includes statistics that **begin exactly** at `startDate`. Optional.    |
| `strictEndDate`     | `boolean`                                                | If `true`, only includes statistics that **end exactly** at `endDate`. Optional.        |
| `statisticsOptions` | `HealthStatisticsOptions` or `HealthStatisticsOptions[]` | An option or array of options to define what kind of statistics to retrieve. See below. |

---

## Available `HealthStatisticsOptions`

| Option               | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `"cumulativeSum"`    | Includes the total sum of all quantity values.              |
| `"discreteAverage"`  | Includes the average of discrete samples.                   |
| `"discreteMin"`      | Includes the minimum value.                                 |
| `"discreteMax"`      | Includes the maximum value.                                 |
| `"mostRecent"`       | Includes the most recently recorded sample.                 |
| `"duration"`         | Includes the total duration of all samples.                 |
| `"separateBySource"` | Separates results by source (e.g., different apps/devices). |

---

## Return Value

Returns a `Promise` that resolves to a `HealthStatistics` object, or `null` if no data is available for the given type and range.

Use the returned `HealthStatistics` object to access computed values like:

* `sumQuantity(...)`
* `averageQuantity(...)`
* `mostRecentQuantity(...)`
* `duration(...)`

---

## Example: Query Daily Step Count Summary

```ts
const stats = await Health.queryStatistics("stepCount", {
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02"),
  statisticsOptions: ["cumulativeSum", "mostRecent", "duration"]
})

if (stats) {
  const steps = stats.sumQuantity(HealthUnit.count())
  const last = stats.mostRecentQuantity(HealthUnit.count())
  const time = stats.duration(HealthUnit.second())

  console.log("Steps:", steps)
  console.log("Most recent count:", last)
  console.log("Duration (s):", time)
} else {
  console.log("No step count data found.")
}
```

---

## Example: Query Average Heart Rate from This App Only

```ts
const stats = await Health.queryStatistics("heartRate", {
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02"),
  statisticsOptions: ["discreteAverage"]
})

const source = HealthSource.forCurrentApp()
const averageHR = stats?.averageQuantity(HealthUnit.countPerMinute(), source)

console.log("App-only Heart Rate:", averageHR)
```

---

## Notes

* If `statisticsOptions` is not specified, some fields (like sum, average, or most recent) may return `null`.
* This method returns **aggregated values**—to access raw samples, use `queryQuantitySamples()` instead.
* Results depend on the type of quantity. For instance, heart rate supports `discreteAverage`, while step count supports `cumulativeSum`.
