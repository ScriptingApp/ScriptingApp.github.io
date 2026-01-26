# Reading Correlation Data PRO

The Scripting app allows you to query **correlated health data** using the global `Health.queryCorrelations()` API. A correlation groups related health samples into a single logical event — such as a blood pressure reading (systolic and diastolic) or a food intake record (calories, protein, etc.).

This guide explains how to retrieve and interpret correlation data from HealthKit.

***

## What Is a Correlation?

A **correlation** in HealthKit represents a composite health event made up of multiple samples, including:

- `"bloodPressure"` — combines `bloodPressureSystolic` and `bloodPressureDiastolic`
- `"food"` — may include `dietaryEnergyConsumed`, `dietaryProtein`, `dietaryCarbohydrates`, etc.

Each correlation includes:

- Start and end date
- Type (`"bloodPressure"` or `"food"`)
- Metadata (optional)
- Associated samples (quantity or category samples)

***

## API Overview

```ts
Health.queryCorrelations(
  correlationType: HealthCorrelationType,
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
  }
): Promise<HealthCorrelation[]>
```

***

## Parameters

| Parameter                         | Description                                 |
| --------------------------------- | ------------------------------------------- |
| `correlationType`                 | `"bloodPressure"` or `"food"`               |
| `startDate`/`endDate`             | Query time range                            |
| `limit`                           | Maximum number of correlations to return    |
| `strictStartDate`/`strictEndDate` | Whether to match exact boundaries           |
| `sortDescriptors`                 | Sort by `startDate` or `endDate` (optional) |

***

## Example: Query Blood Pressure Correlations

```ts
const correlations = await Health.queryCorrelations("bloodPressure", {
  startDate: new Date("2025-07-01T00:00:00"),
  endDate: new Date("2025-07-02T00:00:00"),
  limit: 5,
  sortDescriptors: [{ key: "startDate", order: "reverse" }]
})

for (const correlation of correlations) {
  console.log("Start:", correlation.startDate)
  console.log("End:", correlation.endDate)

  const systolic = correlation.quantitySamples.find(
    s => s.quantityType === "bloodPressureSystolic"
  )

  const diastolic = correlation.quantitySamples.find(
    s => s.quantityType === "bloodPressureDiastolic"
  )

  if (systolic && diastolic) {
    const sys = systolic.quantityValue(HealthUnit.millimeterOfMercury())
    const dia = diastolic.quantityValue(HealthUnit.millimeterOfMercury())
    console.log(`Blood Pressure: ${sys}/${dia} mmHg`)
  }
}
```

***

## Example: Query Food Correlations

```ts
const correlations = await Health.queryCorrelations("food", {
  startDate: new Date(Date.now() - 86400 * 1000),
  limit: 10
})

for (const correlation of correlations) {
  console.log("Food intake at:", correlation.startDate)

  for (const sample of correlation.quantitySamples) {
    const value = sample.quantityValue(sample.quantityType.includes("Energy")
      ? HealthUnit.kilocalorie()
      : HealthUnit.gram())
    console.log(`${sample.quantityType}: ${value}`)
  }
}
```

***

## Accessing Correlation Samples

Each correlation contains the following sample arrays:

- `quantitySamples`: All quantity samples (including cumulative/discrete)
- `cumulativeQuantitySamples`: Only cumulative quantity samples
- `discreteQuantitySamples`: Only discrete quantity samples
- `categorySamples`: Any associated category samples (for future support)

You can use `.quantityType` and `.quantityValue(unit)` to interpret each sample.

***

## Error Handling

```ts
try {
  const results = await Health.queryCorrelations("bloodPressure")
  console.log("Found", results.length, "records")
} catch (err) {
  console.error("Failed to query correlations:", err)
}
```

***

## Summary

To read correlation data from HealthKit:

1. Call `Health.queryCorrelations(type, options)`
2. Iterate through each `HealthCorrelation`
3. Access `quantitySamples` or `categorySamples`
4. Use `.quantityValue(unit)` to extract values

This is useful for composite health records like blood pressure or nutrition intake.
