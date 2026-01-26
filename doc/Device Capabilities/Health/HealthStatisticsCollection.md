# HealthStatisticsCollection PRO

The `HealthStatisticsCollection` class provides a structured representation of **time-based grouped health statistics**, such as daily, weekly, or monthly summaries. Each entry in the collection corresponds to one interval, and encapsulates its own `HealthStatistics` object.

This class is particularly useful for:

- Plotting **health trends over time**
- Generating **time-series reports**
- Separating and accessing statistics by date intervals

***

## Overview

Each `HealthStatisticsCollection` is:

- Created by a time-based health statistics query
- Aligned using an anchor date and interval component (e.g., daily, weekly)
- Optionally aggregated by data source (e.g., app, device)

***

## Methods

### `sources(): HealthSource[]`

Returns an array of `HealthSource` objects that contributed data to this collection.

Each `HealthSource` represents a device or app that generated health samples (e.g., Apple Watch, iPhone, a third-party app).

#### Example

```ts
const sources = collection.sources()
sources.forEach(source => {
  console.log("Source:", source.name, source.bundleIdentifier)
})
```

***

### `statistics(): HealthStatistics[]`

Returns all interval-based statistics in the collection as an array of `HealthStatistics` objects.

Each item represents one time interval, aligned by the query's `anchorDate` and `intervalComponents`.

#### Example

```ts
const allStats = collection.statistics()
allStats.forEach(stat => {
  const value = stat.sumQuantity(HealthUnit.count())
  console.log(`From ${stat.startDate} to ${stat.endDate}: ${value} steps`)
})
```

***

### `statisticsFor(date: Date): HealthStatistics | null`

Returns the `HealthStatistics` object that contains the given date, if it falls within any of the predefined intervals in the collection.

If no interval includes the given date, it returns `null`.

#### Example

```ts
const stat = collection.statisticsFor(new Date("2025-07-01"))
if (stat) {
  const value = stat.averageQuantity(HealthUnit.count())
  console.log("Average on July 1st:", value)
} else {
  console.log("No data for July 1st.")
}
```

***

## When to Use

Use `HealthStatisticsCollection` when:

- You want to break health data into **intervals** (e.g., by day/week/month)
- You need to **retrieve and analyze health trends** over time
- You're building **graphs** or **dashboards** from historical health data
