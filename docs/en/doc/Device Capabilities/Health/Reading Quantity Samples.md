---
title: Reading Quantity Samples
tag: PRO
---

The Scripting app allows you to query **quantity-based health data**, such as step count, heart rate, body mass, calories burned, distance, and more, using the global `Health.queryQuantitySamples()` API.

This guide explains how to retrieve quantity samples and work with the results.

---

## What Are Quantity Samples?

A **quantity sample** represents a numeric health measurement taken at a specific time or over a time interval. Common examples include:

* `stepCount`
* `heartRate`
* `bodyMass`
* `activeEnergyBurned`
* `distanceWalkingRunning`

These samples can be either **discrete** (a single measurement) or **cumulative** (a value summed over time).

---

## API Overview

```ts
Health.queryQuantitySamples(
  quantityType: HealthQuantityType,
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
  }
): Promise<Array<HealthQuantitySample | HealthCumulativeQuantitySample | HealthDiscreteQuantitySample>>
```

---

## Parameters

* `quantityType`: The health data type to query (e.g., `"stepCount"`, `"heartRate"`)
* `startDate` / `endDate`: Time range for filtering samples
* `limit`: Maximum number of results
* `strictStartDate` / `strictEndDate`: If `true`, only samples starting/ending exactly at those dates will be included
* `sortDescriptors`: Optional array to sort results by `startDate`, `endDate`, or `count`

---

## Sample Code: Reading Step Count

```ts
const results = await Health.queryQuantitySamples("stepCount", {
  startDate: new Date("2025-07-01T00:00:00"),
  endDate: new Date("2025-07-02T00:00:00"),
  limit: 10,
  sortDescriptors: [{ key: "startDate", order: "reverse" }]
})

for (const sample of results) {
  const value = sample.quantityValue(HealthUnit.count())
  console.log(`Steps: ${value} from ${sample.startDate} to ${sample.endDate}`)
}
```

---

## Sample Code: Reading Heart Rate with Unit

```ts
const results = await Health.queryQuantitySamples("heartRate", {
  startDate: new Date(Date.now() - 3600 * 1000), // past hour
})

for (const sample of results) {
  const bpm = sample.quantityValue(
    HealthUnit.count().divided(HealthUnit.minute())
  )
  console.log(`Heart Rate: ${bpm} bpm at ${sample.startDate}`)
}
```

---

## Interpreting Sample Types

Each sample returned may be:

* `HealthQuantitySample`: The base class
* `HealthCumulativeQuantitySample`: Includes `.sumQuantity(unit)`
* `HealthDiscreteQuantitySample`: Includes `.averageQuantity(unit)`, `.maximumQuantity(unit)`, etc.

You can use `instanceof` or feature detection to check for extended properties.

Example:

```ts
if ("averageQuantity" in sample) {
  const avg = sample.averageQuantity(HealthUnit.count())
  console.log("Average:", avg)
}
```

---

## Notes

* The unit passed to `.quantityValue()` **must match** the type (e.g., use `count()` for steps, `gram(HealthMetricPrefix.kilo)` for body mass).
* Some types (like heart rate) require compound units like `count().divided(minute())`.
* The time interval is defined by `startDate` and `endDate` on each sample.
* Samples may have an optional `.metadata` and `.count`.

---

## Common Units by Type

| Quantity Type              | Recommended Unit                                  |
| -------------------------- | ------------------------------------------------- |
| `"stepCount"`              | `HealthUnit.count()`                              |
| `"heartRate"`              | `HealthUnit.count().divided(HealthUnit.minute())` |
| `"bodyMass"`               | `HealthUnit.gram(HealthMetricPrefix.kilo)`                           |
| `"activeEnergyBurned"`     | `HealthUnit.kilocalorie()`                        |
| `"distanceWalkingRunning"` | `HealthUnit.meter()`                              |

---

## Error Handling

```ts
try {
  const results = await Health.queryQuantitySamples("stepCount")
  console.log("Sample count:", results.length)
} catch (err) {
  console.error("Failed to query samples:", err)
}
```

---

## Summary

To read quantity samples:

1. Call `Health.queryQuantitySamples(type, options)`
2. Loop through the results
3. Use `.quantityValue(unit)` or `.sumQuantity(unit)` depending on the type

This API gives you powerful access to time-series health data stored in HealthKit.
