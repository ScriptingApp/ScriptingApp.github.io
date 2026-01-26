# Writing Health Category Samples PRO

The Scripting app allows you to write **categorical health data** to Apple HealthKit using the `HealthCategorySample` class and the `Health.saveCategorySample()` method. Category samples represent discrete health-related events or conditions, such as sleep stages, mindful sessions, menstrual flow, ovulation test results, and more.

This guide describes how to create and save a `HealthCategorySample`.

***

## Prerequisites

- Confirm that HealthKit is available on the device:

  ```ts
  if (!Health.isHealthDataAvailable) {
    throw new Error("Health data is not available on this device.")
  }
  ```

- Ensure the script has the required permission for the target category type. The Scripting app will automatically request authorization if needed when saving.

***

## 1. Create a `HealthCategorySample`

Use `HealthCategorySample.create()` to construct a new category sample.

### Parameters

- `type`: A `HealthCategoryType` string (e.g., `"sleepAnalysis"`, `"mindfulSession"`, `"menstrualFlow"`, etc.).
- `startDate`: The beginning of the time interval that the event applies to (JavaScript `Date`).
- `endDate`: The end of the event’s time interval (JavaScript `Date`).
- `value`: The integer value representing the state of the category. You must use the corresponding enum value based on the type.
- `metadata` _(optional)_: An optional metadata object describing additional attributes.

### Value Mapping

The `value` must be one of the pre-defined category values. For example:

- For `"sleepAnalysis"`, use the `HealthCategoryValueSleepAnalysis` enum:

  - `HealthCategoryValueSleepAnalysis.asleepCore`
  - `HealthCategoryValueSleepAnalysis.awake`
  - etc.

- For `"menstrualFlow"`, use `HealthCategoryValueSeverity`:

  - `HealthCategoryValueSeverity.mild`, `moderate`, `severe`, etc.

Refer to each category type’s enum definition for valid values.

***

### Example

```ts
const sample = HealthCategorySample.create({
  type: "sleepAnalysis",
  startDate: new Date("2025-07-03T23:00:00"),
  endDate: new Date("2025-07-04T07:00:00"),
  value: HealthCategoryValueSleepAnalysis.asleepCore,
  metadata: {
    source: "ScriptingApp"
  }
})

if (!sample) {
  throw new Error("Failed to create HealthCategorySample.")
}
```

***

## 2. Save the Category Sample

Use `Health.saveCategorySample()` to save the created sample to HealthKit.

```ts
await Health.saveCategorySample(sample)
```

If saving fails (e.g., due to permission denial), the promise will reject with an error.

***

## Full Example

```ts
async function writeSleepData() {
  const sample = HealthCategorySample.create({
    type: "sleepAnalysis",
    startDate: new Date("2025-07-03T23:00:00"),
    endDate: new Date("2025-07-04T07:00:00"),
    value: HealthCategoryValueSleepAnalysis.asleepCore,
  })

  if (!sample) {
    console.error("Failed to create sample.")
    return
  }

  try {
    await Health.saveCategorySample(sample)
    console.log("Sleep data saved successfully.")
  } catch (err) {
    console.error("Error saving sample:", err)
  }
}

writeSleepData()
```

***

## Notes

- The `value` must be a valid enum for the selected `type`, or the creation will fail.
- `startDate` and `endDate` define the time range the event applies to — e.g., a sleep session or a mindful moment.
- Metadata is optional but can be useful for tagging data source or context.
