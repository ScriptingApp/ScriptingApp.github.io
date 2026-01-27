---
title: HealthQuantitySample
tag: PRO
---

The `HealthQuantitySample` class represents a single health quantity data point, such as a heart rate measurement, a recorded step count, or a logged calorie value. It provides information about the measurement’s type, time interval, unit, value, and optional metadata.

This class is the base for more specialized subclasses: `HealthCumulativeQuantitySample` and `HealthDiscreteQuantitySample`.

---

## Overview

A `HealthQuantitySample` encapsulates the following:

- A **specific health metric** (e.g., steps, heart rate)
- A **value with unit**
- A **time window** representing when the data was recorded
- Optional **metadata** for context or classification

This class is primarily used for:

- Reading individual health data samples
- Writing new health data samples
- Converting values between units

---

## Properties

| Property       | Type                          | Description                              |
| -------------- | ----------------------------- | ---------------------------------------- |
| `uuid`         | `string`                      | Unique identifier for the sample         |
| `quantityType` | `HealthQuantityType`          | Type of the health metric                |
| `startDate`    | `Date`                        | Start of the measurement                 |
| `endDate`      | `Date`                        | End of the measurement                   |
| `count`        | `number`                      | Number of samples aggregated (usually 1) |
| `metadata`     | `Record<string, any> \| null` | Optional metadata dictionary             |

---

## Methods

### `quantityValue(unit: HealthUnit): number`

Converts the sample's stored value to the specified unit.

**Parameters:**

- `unit`: A `HealthUnit` instance (e.g., `HealthUnit.kilocalorie()`)

**Returns:**

- The converted numeric value.

**Example:**

```ts
const bpm = sample.quantityValue(HealthUnit.count().divided(HealthUnit.minute()));
console.log(`Heart Rate: ${bpm} bpm`);
```

---

## Static Methods

### `HealthQuantitySample.create(options): HealthQuantitySample | null`

Creates a new quantity sample with the specified parameters.

**Parameters:**

```ts
{
  type: HealthQuantityType
  startDate: Date
  endDate: Date
  value: number
  unit: HealthUnit
  metadata?: Record<string, any> | null
}
```

**Returns:**

- A new `HealthQuantitySample` if valid, otherwise `null`.

**Example:**

```ts
const sample = HealthQuantitySample.create({
  type: "stepCount",
  startDate: new Date("2025-07-01T09:00:00"),
  endDate: new Date("2025-07-01T09:01:00"),
  value: 200,
  unit: HealthUnit.count(),
  metadata: { source: "manualEntry" },
});
```

---

## Subclass: HealthCumulativeQuantitySample

The `HealthCumulativeQuantitySample` class represents cumulative data (i.e., totals over time), such as energy burned or distance traveled.

## Additional Properties

| Property                  | Type      | Description                                          |
| ------------------------- | --------- | ---------------------------------------------------- |
| `hasUndeterminedDuration` | `boolean` | Indicates whether the sample’s duration is uncertain |

## Additional Methods

### `sumQuantity(unit: HealthUnit): number`

Returns the total accumulated quantity in the specified unit.

**Example:**

```ts
const totalKcal = cumulativeSample.sumQuantity(HealthUnit.kilocalorie());
console.log(`Total active energy: ${totalKcal} kcal`);
```

### `quantityValue(unit: HealthUnit): number`

Alias for `sumQuantity()` — retrieves the total value in the given unit.

---

## Subclass: HealthDiscreteQuantitySample

The `HealthDiscreteQuantitySample` class represents a series of discrete values sampled at specific times — such as heart rate measurements or step counts across a time window.

## Additional Properties

| Property                         | Type                         | Description                                   |
| -------------------------------- | ---------------------------- | --------------------------------------------- |
| `mostRecentQuantityDateInterval` | `HealthDateInterval \| null` | Time window of the most recent recorded value |

## Additional Methods

| Method                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `averageQuantity(unit)`    | Returns the average of all values in the specified unit |
| `maximumQuantity(unit)`    | Returns the maximum value in the specified unit         |
| `minimumQuantity(unit)`    | Returns the minimum value in the specified unit         |
| `mostRecentQuantity(unit)` | Returns the most recent recorded value (if available)   |

### Example:

```ts
const avg = discreteSample.averageQuantity(HealthUnit.count());
const max = discreteSample.maximumQuantity(HealthUnit.count());
const recent = discreteSample.mostRecentQuantity(HealthUnit.count());
console.log(`Average: ${avg}, Max: ${max}, Recent: ${recent}`);
```

---

## Use Cases

| Scenario                          | Use This Class                   | Example                                     |
| --------------------------------- | -------------------------------- | ------------------------------------------- |
| Record or retrieve a single value | `HealthQuantitySample`           | A manually entered weight                   |
| Work with totals over time        | `HealthCumulativeQuantitySample` | Total distance walked in 1 hour             |
| Analyze statistics across samples | `HealthDiscreteQuantitySample`   | Min/Max/Average heart rate during a workout |

---

## Related Types

- `HealthUnit`: Represents the unit of measurement.
- `HealthQuantityType`: Specifies the kind of health metric being measured.
- `HealthDateInterval`: A time range used for timestamping specific values.
