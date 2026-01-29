---
title: Reading Category Samples
description: This interface allows you to read health category samples from the HealthKit store.
tag: PRO
---

The Scripting app provides access to **category-based health data** using the global function `Health.queryCategorySamples()`. Category samples represent health-related events or states with a start date, end date, and a discrete value — such as sleep stages, mindful sessions, menstrual flow, and ovulation test results.

This guide explains how to query, interpret, and use category samples in your scripts.

---

## What Is a Category Sample?

A **category sample** includes:

* `type`: The category data type (e.g., `"sleepAnalysis"`, `"mindfulSession"`)
* `startDate` / `endDate`: The time interval the event occurred
* `value`: An integer representing a state, mapped from an enum
* `metadata`: Optional additional info

Examples:

* `"sleepAnalysis"` with value `asleepCore`, `awake`, or `inBed`
* `"menstrualFlow"` with value `mild`, `moderate`, or `severe`

---

## API Overview

```ts
Health.queryCategorySamples(
  categoryType: HealthCategoryType,
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
    strictStartDate?: boolean
    strictEndDate?: boolean
    sortDescriptors?: Array<{
      key: "startDate" | "endDate" | "value"
      order?: "forward" | "reverse"
    }>
  }
): Promise<HealthCategorySample[]>
```

---

## Parameters

| Parameter                           | Description                                                    |
| ----------------------------------- | -------------------------------------------------------------- |
| `categoryType`                      | The type of category data to query (e.g., `"sleepAnalysis"`)   |
| `startDate` / `endDate`             | Time range to filter results                                   |
| `limit`                             | Maximum number of samples to return                            |
| `strictStartDate` / `strictEndDate` | Whether to match the exact start or end times                  |
| `sortDescriptors`                   | Optional sorting (e.g., by `startDate`, `endDate`, or `value`) |

---

## Example: Reading Sleep Analysis Samples

```ts
const results = await Health.queryCategorySamples("sleepAnalysis", {
  startDate: new Date("2025-07-01T00:00:00"),
  endDate: new Date("2025-07-05T00:00:00"),
  sortDescriptors: [{ key: "startDate", order: "forward" }]
})

for (const sample of results) {
  console.log("Start:", sample.startDate)
  console.log("End:", sample.endDate)
  console.log("Sleep State:", sample.value) // Use enum to interpret value
}
```

You can map the `value` to an enum like this:

```ts
const value = sample.value

switch (value) {
  case HealthCategoryValueSleepAnalysis.awake:
    console.log("Awake")
    break
  case HealthCategoryValueSleepAnalysis.asleepCore:
    console.log("Asleep (Core)")
    break
  case HealthCategoryValueSleepAnalysis.asleepDeep:
    console.log("Asleep (Deep)")
    break
  case HealthCategoryValueSleepAnalysis.inBed:
    console.log("In bed")
    break
  // Handle other states as needed
}
```

---

## Example: Reading Mindful Session Events

```ts
const sessions = await Health.queryCategorySamples("mindfulSession", {
  startDate: new Date(Date.now() - 7 * 86400 * 1000), // past 7 days
})

console.log(`Found ${sessions.length} mindful sessions`)
```

---

## Notes

* All returned items are instances of `HealthCategorySample`
* The `.value` field is numeric and should be interpreted using the appropriate enum
* You can access optional `.metadata` for extra context if available
* Category data is ideal for modeling sleep, mental wellness, reproductive health, and symptoms

---

## Summary

To read category samples:

1. Use `Health.queryCategorySamples(categoryType, options)`
2. Filter by date, sort, and limit as needed
3. Map `.value` to the correct enum for human-readable interpretation

This API gives you structured access to event-based health records in HealthKit.
