# HealthStatistics

The `HealthStatistics` class provides an interface for analyzing **aggregated health quantity data** over a specified time range. It allows you to compute key statistical values such as:

- Total duration
- Average, sum, minimum, maximum quantities
- Most recent value and its date range

This class is ideal for generating summaries of daily, weekly, or custom health data intervals.

***

## Overview

Each `HealthStatistics` instance represents statistics for a specific `HealthQuantityType` within a defined `startDate` and `endDate` range. You can optionally filter statistics by a `HealthSource` (e.g., only include samples recorded by a specific device or app).

***

## Properties

| Property       | Type                     | Description                                                       |
| -------------- | ------------------------ | ----------------------------------------------------------------- |
| `quantityType` | `HealthQuantityType`     | The quantity type the statistics are based on (e.g., `stepCount`) |
| `startDate`    | `Date`                   | The beginning of the statistics window                            |
| `endDate`      | `Date`                   | The end of the statistics window                                  |
| `sources`      | `HealthSource[] \| null` | The list of sources contributing data to these statistics         |

***

## Methods

### `duration(unit: HealthUnit, source?: HealthSource): number | null`

Returns the total accumulated **duration** of all samples within the range.

- `unit`: The unit of time to return the duration in (e.g., seconds, minutes).
- `source` _(optional)_: If provided, only samples from that source will be included.

Returns `null` if no matching samples are found.

***

### `averageQuantity(unit: HealthUnit, source?: HealthSource): number | null`

Returns the **average quantity** value of all samples.

- `unit`: The unit to express the average in (e.g., `HealthUnit.bpm()`).
- `source` _(optional)_: Filter samples by source.

***

### `sumQuantity(unit: HealthUnit, source?: HealthSource): number | null`

Returns the **total sum** of quantity values over the date range.

***

### `minimumQuantity(unit: HealthUnit, source?: HealthSource): number | null`

Returns the **minimum** recorded value in the given unit.

***

### `maximumQuantity(unit: HealthUnit, source?: HealthSource): number | null`

Returns the **maximum** recorded value in the given unit.

***

### `mostRecentQuantity(unit: HealthUnit, source?: HealthSource): number | null`

Returns the **most recent** quantity value recorded within the range. If no values are available, returns `null`.

***

### `mostRecentQuantityDateInterval(source?: HealthSource): HealthDateInterval | null`

Returns a `HealthDateInterval` object indicating the **start and end time** of the most recent recorded value. Useful for knowing **when** the last data point was recorded.

***

## Example Usage

```ts
const stats = await Health.queryStatistics({
  type: "stepCount",
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02")
})

const totalSteps = stats.sumQuantity(HealthUnit.count())
const average = stats.averageQuantity(HealthUnit.count())
const mostRecent = stats.mostRecentQuantity(HealthUnit.count())
const recentInterval = stats.mostRecentQuantityDateInterval()

console.log("Steps Summary:")
console.log("Total:", totalSteps)
console.log("Average:", average)
console.log("Most Recent:", mostRecent)
console.log("Interval:", recentInterval)
```

***

## `HealthSource` Class

The `HealthSource` class represents the **origin** of a HealthKit sample. It is typically an app or device that generated or synced the health data.

### Properties

| Property           | Type     | Description                                              |
| ------------------ | -------- | -------------------------------------------------------- |
| `bundleIdentifier` | `string` | The app or device bundle ID (e.g., `"com.apple.Health"`) |
| `name`             | `string` | A human-readable name for the source                     |

### Static Methods

#### `HealthSource.forCurrentApp(): HealthSource`

Returns a `HealthSource` object representing the current Scripting app. This can be used to filter statistics only for data recorded or synced by your app.

***

## Example: Filtering by Source

```ts
const stats = await Health.queryStatistics("heartRate", {
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02")
})

const currentAppSource = HealthSource.forCurrentApp()
const averageHR = stats.averageQuantity(HealthUnit.countPerMinute(), currentAppSource)

console.log("Heart rate from this app:", averageHR)
```

***

## Summary

- `HealthStatistics` helps you analyze trends over time by calculating averages, totals, and most recent values.
- Supports optional filtering by source using `HealthSource`.
- Useful for building visual health summaries and dashboards based on HealthKit data.
