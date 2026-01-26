# Writing Health Quantity Samples PRO

The Scripting app allows you to write quantity-based health data (such as step count, heart rate, calories, and more) to Apple HealthKit using the `HealthQuantitySample` class and the `Health.saveQuantitySample` method.

This guide explains how to create and save a new quantity sample.

## Prerequisites

- Ensure HealthKit is available on the device:

  ```ts
  if (!Health.isHealthDataAvailable) {
    throw new Error("Health data is not available on this device.")
  }
  ```

- Make sure your script has the appropriate write permission for the quantity type you want to save. Permissions are requested automatically when you call save APIs.

## 1. Create a `HealthQuantitySample`

Use `HealthQuantitySample.create()` to instantiate a new sample.

### Parameters

- `type`: A `HealthQuantityType` string, such as `"stepCount"`, `"heartRate"`, `"bodyMass"`, etc.
- `startDate`: The start of the measurement period (a JavaScript `Date` object).
- `endDate`: The end of the measurement period (a JavaScript `Date` object).
- `value`: The numeric value of the sample.
- `unit`: A `HealthUnit` representing the measurement unit (e.g., `HealthUnit.count()`, `HealthUnit.gram()`, `HealthUnit.meter()`).
- `metadata` _(optional)_: An object containing additional metadata.

### Example

```ts
const sample = HealthQuantitySample.create({
  type: "stepCount",
  startDate: new Date("2025-07-03T08:00:00"),
  endDate: new Date("2025-07-03T09:00:00"),
  value: 1200,
  unit: HealthUnit.count(),
  metadata: {
    source: "ScriptingApp"
  }
})

if (!sample) {
  throw new Error("Failed to create HealthQuantitySample.")
}
```

## 2. Save the Quantity Sample

After creating the sample, use `Health.saveQuantitySample()` to store it in the HealthKit database.

```ts
await Health.saveQuantitySample(sample)
```

If saving fails (e.g., due to missing permissions), the promise will reject with an error.

## Full Example

```ts
async function writeStepCount() {
  const sample = HealthQuantitySample.create({
    type: "stepCount",
    startDate: new Date("2025-07-03T08:00:00"),
    endDate: new Date("2025-07-03T09:00:00"),
    value: 1200,
    unit: HealthUnit.count(),
  })

  if (!sample) {
    console.error("Failed to create sample.")
    return
  }

  try {
    await Health.saveQuantitySample(sample)
    console.log("Step count saved successfully.")
  } catch (err) {
    console.error("Failed to save sample:", err)
  }
}

writeStepCount()
```

## Notes

- The unit must match the type. For example:

  - `"stepCount"` → `HealthUnit.count()`
  - `"bodyMass"` → `HealthUnit.gram(HealthMetrixPrefix.kilo)`
  - `"heartRate"` → `HealthUnit.count().divided(HealthUnit.minute())`
- If the sample’s type is cumulative (e.g., steps, distance), the `startDate` and `endDate` should cover the time window over which the value was measured.
