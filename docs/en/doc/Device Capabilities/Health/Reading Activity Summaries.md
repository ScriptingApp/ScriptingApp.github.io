---
title: Reading Activity Summaries
tag: PRO
---

The Scripting app provides access to **daily activity summary data** from Apple Health using the global function `Health.queryActivitySummaries()`. These summaries represent **Move**, **Exercise**, and **Stand** goals tracked by Apple Watch, along with completion metrics and historical trends.

This API is ideal for displaying daily ring data or analyzing long-term fitness trends.

---

## What Is an Activity Summary?

An `HealthActivitySummary` provides a high-level overview of a day’s Apple Watch activity:

* **Move (Active Energy Burned)**

  * `activeEnergyBurned(unit: HealthUnit): number`
  * `activeEnergyBurnedGoal(unit: HealthUnit): number`

* **Exercise (Minutes)**

  * `appleExerciseTime(unit: HealthUnit): number`
  * `appleExerciseTimeGoal(unit: HealthUnit): number`

* **Stand (Hours)**

  * `appleStandHours(unit: HealthUnit): number`
  * `appleStandHoursGoal(unit: HealthUnit): number`

* **Date Information**

  * `dateComponents: DateComponents` – a `DateComponents` object containing at least year, month, and day.

---

## API Overview

```ts
Health.queryActivitySummaries(
  options?: {
    start: DateComponents
    end: DateComponents
  }
): Promise<HealthActivitySummary[]>
```

---

## Parameters

| Parameter | Type             | Description                                                                                    |
| --------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| `start`   | `DateComponents` | The start of the query range. Only summaries on or after this date are returned. |
| `end`     | `DateComponents` | The end of the query range. Only summaries on or before this date are returned.  |

> If you omit the options, the API returns all available summaries (up to system limits).
> Summaries are returned sorted by date in ascending order.

---

## Example: Read Last 7 Days’ Activity Summaries

```ts
async function fetchLastWeek() {
  // Build DateComponents for the date range
  const today = new Date()
  const sevenDaysAgo = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  )

  const startComponents = DateComponents.fromDate(sevenDaysAgo)
  const endComponents = DateComponents.fromDate(today)

  // Query activity summaries
  const summaries = await Health.queryActivitySummaries({
    start: startComponents,
    end: endComponents,
  })

  // Iterate and log each day’s data
  for (const summary of summaries) {
    const date = summary.dateComponents.date
    console.log(`Date: ${date?.toDateString()}`)

    const kcal = summary.activeEnergyBurned(HealthUnit.kilocalorie())
    const kcalGoal = summary.activeEnergyBurnedGoal(HealthUnit.kilocalorie())
    const exerciseMin = summary.appleExerciseTime(HealthUnit.minute())
    const standHrs = summary.appleStandHours(HealthUnit.count())

    console.log(` Move:    ${kcal} / ${kcalGoal} kcal`)
    console.log(` Exercise: ${exerciseMin} min`)
    console.log(` Stand:    ${standHrs} hrs`)
    console.log('---')
  }
}

fetchLastWeek()
```

---

## Notes

* **DateComponents** must include at least year, month, and day—other fields (hour, minute) are ignored for daily summaries.
* Each metric method returns a raw `number` in the specified unit.
* Use `HealthUnit` factory methods (e.g., `kilocalorie()`, `minute()`, `count()`) to specify units.
* Days with no data (e.g., Apple Watch off-wrist) may be omitted from results.

---

## Summary

1. Call `Health.queryActivitySummaries({ start, end })` with `DateComponents` to specify your date range.
2. Receive an array of `HealthActivitySummary`, sorted ascending by date.
3. Use the summary’s methods to read actual vs. goal values for Move, Exercise, and Stand.
4. Convert and display the numbers in your UI or analytics.
