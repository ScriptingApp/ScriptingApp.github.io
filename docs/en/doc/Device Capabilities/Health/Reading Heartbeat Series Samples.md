---
title: Reading Heartbeat Series Samples
tag: PRO
---

The Scripting app provides access to **heartbeat series samples** stored in Apple Health using the global API `Health.queryHeartbeatSeriesSamples()`. These samples represent beat-to-beat heartbeat intervals collected during workouts or background monitoring sessions (usually via Apple Watch).

Each record contains the **time range**, **number of beats**, and optional **metadata**, but not the raw interval values.

---

## What Is a Heartbeat Series Sample?

A `HealthHeartbeatSeriesSample` object includes:

* `uuid`: A unique identifier for the sample
* `sampleType`: Always `"heartbeatSeries"`
* `startDate` / `endDate`: The time range over which the heartbeats were recorded
* `count`: The number of heartbeat intervals collected
* `metadata`: Optional information attached by the recording source (e.g., watch model, app version)

> **Note:** This API provides high-level information about the series. It does not expose individual heartbeat intervals.

---

## API Reference

```ts
Health.queryHeartbeatSeriesSamples(
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
    strictStartDate?: boolean
    strictEndDate?: boolean
    sortDescriptors?: Array<{
      key: "startDate" | "endDate"
      order?: "forward" | "reverse"
    }>
    requestPermissions?: HealthQuantityType[]
  }
): Promise<HealthHeartbeatSeriesSample[]>
```

---

## Parameters

| Parameter                           | Description                                    |
| ----------------------------------- | ---------------------------------------------- |
| `startDate` / `endDate`             | Optional filter range for sample time interval |
| `limit`                             | Maximum number of samples to return            |
| `strictStartDate` / `strictEndDate` | Whether to include only exact matches          |
| `sortDescriptors`                   | Optional sorting by `startDate` or `endDate`   |
| `requestPermissions`                | Optional requesting permission for other types |

---

## Example: Query Recent Heartbeat Series

```ts
const results = await Health.queryHeartbeatSeriesSamples({
  startDate: new Date("2025-07-01T00:00:00"),
  endDate: new Date("2025-07-05T00:00:00"),
  limit: 10,
  sortDescriptors: [{ key: "startDate", order: "reverse" }]
})

for (const sample of results) {
  console.log("UUID:", sample.uuid)
  console.log("Start:", sample.startDate)
  console.log("End:", sample.endDate)
  console.log("Heartbeat count:", sample.count)
  console.log("Metadata:", sample.metadata)
  console.log("---")
}
```

---

## Limitations

* Individual heartbeat intervals (R–R data) are **not accessible** via this API.

* To analyze HRV or derive BPM, you’ll need **only the `count`** and **duration**:

  ```ts
  const durationSeconds = (sample.endDate.getTime() - sample.startDate.getTime()) / 1000
  const avgBPM = (sample.count / durationSeconds) * 60
  ```

* Gaps or anomalies (e.g. pauses, data loss) are not available in this summary sample.

---

## Summary

To read heartbeat series:

1. Call `Health.queryHeartbeatSeriesSamples()` with optional date range or limits.
2. Iterate through the returned `HealthHeartbeatSeriesSample` objects.
3. Each item provides `startDate`, `endDate`, `count`, and `metadata`.
4. You can approximate average BPM over the session using `count` and duration.

This API is useful for **overviewing heart rhythm tracking sessions**, especially for detecting how often heart rate was sampled during a day or workout.
