# HealthCorrelation

The `HealthCorrelation` class represents a group of health samples that are logically related. It provides an interface for accessing and creating correlation records that group multiple health data types together—such as combining dietary intake and blood pressure readings, or linking ovulation tests with menstrual flow records.

***

## Use Cases

- Grouping blood pressure systolic and diastolic values together
- Associating food intake with nutritional data
- Creating a composite record for cycle tracking events

***

## Properties

| Property Name               | Type                                                                                                                 | Description                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `uuid`                      | `string`                                                                                                             | A unique identifier for the correlation sample.                              |
| `correlationType`           | `HealthCorrelationType`                                                                                              | The type of the correlation, such as `"bloodPressure"` or `"food"`.          |
| `startDate`                 | `Date`                                                                                                               | The start time of the correlation event.                                     |
| `endDate`                   | `Date`                                                                                                               | The end time of the correlation event.                                       |
| `metadata`                  | `Record<string, any> \| null`                                                                                        | Optional metadata associated with the correlation, such as user annotations. |
| `samples`                   | `(HealthQuantitySample \| HealthCumulativeQuantitySample \| HealthDiscreteQuantitySample \| HealthCategorySample)[]` | All samples included in this correlation.                                    |
| `quantitySamples`           | `HealthQuantitySample[]`                                                                                             | A convenience array of all quantity-based samples.                           |
| `cumulativeQuantitySamples` | `HealthCumulativeQuantitySample[]`                                                                                   | A filtered array of only cumulative quantity samples.                        |
| `discreteQuantitySamples`   | `HealthDiscreteQuantitySample[]`                                                                                     | A filtered array of only discrete quantity samples.                          |
| `categorySamples`           | `HealthCategorySample[]`                                                                                             | A filtered array of all category-based samples.                              |

***

## Static Method

### `HealthCorrelation.create(options): HealthCorrelation | null`

Creates a new correlation with one or more health samples.

#### Parameters

| Parameter   | Type                                               | Required | Description                                                  |
| ----------- | -------------------------------------------------- | -------- | ------------------------------------------------------------ |
| `type`      | `HealthCorrelationType`                            | Yes      | The correlation type, e.g., `"bloodPressure"` or `"food"`.   |
| `startDate` | `Date`                                             | Yes      | The start time of the correlation.                           |
| `endDate`   | `Date`                                             | Yes      | The end time of the correlation.                             |
| `metadata`  | `Record<string, any> \| null`                      | No       | Optional metadata to store alongside the correlation.        |
| `objects`   | `(HealthQuantitySample \| HealthCategorySample)[]` | Yes      | The array of health samples to associate in the correlation. |

#### Returns

- A new `HealthCorrelation` instance if the parameters are valid.
- Returns `null` if the type and samples are incompatible or validation fails.

***

## Examples

### Example 1: Create a blood pressure correlation

```ts
const systolic = HealthQuantitySample.create({
  type: "bloodPressureSystolic",
  startDate: new Date("2025-07-04T08:00:00"),
  endDate: new Date("2025-07-04T08:01:00"),
  value: 120,
  unit: HealthUnit.millimeterOfMercury()
})

const diastolic = HealthQuantitySample.create({
  type: "bloodPressureDiastolic",
  startDate: new Date("2025-07-04T08:00:00"),
  endDate: new Date("2025-07-04T08:01:00"),
  value: 80,
  unit: HealthUnit.millimeterOfMercury()
})

const correlation = HealthCorrelation.create({
  type: "bloodPressure",
  startDate: systolic.startDate,
  endDate: systolic.endDate,
  objects: [systolic, diastolic]
})

if (correlation) {
  // save correlation...
}
```

***

### Example 2: Query and inspect a correlation

```ts
for (const sample of correlation.quantitySamples) {
  const value = sample.quantityValue(HealthUnit.millimeterOfMercury())
  console.log(`${sample.quantityType}: ${value}`)
}
```

***

## Notes

- Samples in a correlation must match the expected types for the given `HealthCorrelationType`.
- Currently supported correlation types include `"bloodPressure"` and `"food"`.
- This class allows grouping samples for higher-level reasoning or visualization of composite health events.
