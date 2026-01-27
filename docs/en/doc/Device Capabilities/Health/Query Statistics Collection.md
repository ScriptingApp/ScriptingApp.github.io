---
title: Query Statistics Collection
tag: PRO
---

The `Health.queryStatisticsCollection()` method retrieves **time-based aggregated statistics** for a given `HealthQuantityType` over a specified date range. It returns a `HealthStatisticsCollection` object, which contains multiple `HealthStatistics` entries aligned to defined time intervals (such as daily, weekly, or monthly).

This method is ideal for analyzing trends, building charts, and generating historical summaries of health data.

---

## Method Signature

```ts
function queryStatisticsCollection(
  quantityType: HealthQuantityType,
  options: {
    startDate?: Date
    endDate?: Date
    strictStartDate?: boolean
    strictEndDate?: boolean
    statisticsOptions?: HealthStatisticsOptions | Array<HealthStatisticsOptions>
    anchorDate: Date
    intervalComponents: DateComponents
  }
): Promise<HealthStatisticsCollection>
```

---

## Parameters

| Name                         | Type                                         | Required | Description                                                                                                                                                                                               |
| ---------------------------- | -------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quantityType`               | `HealthQuantityType`                         | Yes      | The health quantity type to query (e.g., `"stepCount"`, `"heartRate"`).                                                                                                                                   |
| `options.startDate`          | `Date`                                       | No       | The start date of the time range. Samples outside this range will be excluded.                                                                                                                            |
| `options.endDate`            | `Date`                                       | No       | The end date of the time range.                                                                                                                                                                           |
| `options.strictStartDate`    | `boolean`                                    | No       | If `true`, includes only statistics whose interval starts exactly at `startDate`.                                                                                                                         |
| `options.strictEndDate`      | `boolean`                                    | No       | If `true`, includes only statistics whose interval ends exactly at `endDate`.                                                                                                                             |
| `options.statisticsOptions`  | `HealthStatisticsOptions[]` or single option | No       | The list of statistics to compute. Can include: `"cumulativeSum"`, `"discreteAverage"`, `"discreteMin"`, `"discreteMax"`, `"mostRecent"`, `"duration"`, `"separateBySource"` |
| `options.anchorDate`         | `Date`                                       | Yes      | The anchor date used to align intervals. For example, use midnight to align daily intervals to calendar days.                                                                                             |
| `options.intervalComponents` | `DateComponents`                             | Yes      | Defines the interval for grouping data (e.g., day, week, month). Create using `new DateComponents({ day: 1 })`, etc.                                             |

---

## Return Value

Returns a `Promise` that resolves to a `HealthStatisticsCollection` object. This collection includes statistics for each time interval between the start and end dates, aligned by the anchor date and grouped using the provided `intervalComponents`.

---

## Example: Retrieve Daily Step Count Statistics for the Past 7 Days

```ts
const now = new Date()
const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

const collection = await Health.queryStatisticsCollection("stepCount", {
  startDate: sevenDaysAgo,
  endDate: now,
  anchorDate: new Date(), // typically midnight today
  intervalComponents: new DateComponents({ day: 1 }),
  statisticsOptions: ["cumulativeSum"]
})

const stats = collection.statistics()
for (const stat of stats) {
  const steps = stat.sumQuantity(HealthUnit.count())
  console.log(`From ${stat.startDate.toDateString()}: ${steps} steps`)
}
```

---

## Notes

* If no data exists for a specific interval, its corresponding `HealthStatistics` entry may return `null` values.
* Intervals are aligned using the `anchorDate`, and the grouping is defined by `intervalComponents`.
* If you only need overall statistics for the full range without interval grouping, use `Health.queryStatistics()` instead.
