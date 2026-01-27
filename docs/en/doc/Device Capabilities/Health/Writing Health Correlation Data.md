---
title: Writing Health Correlation Data
tag: PRO
---

In the Scripting app, you can write **correlated health data** to Apple HealthKit using the global `HealthCorrelation.create()` method and `Health.saveCorrelation()`. A correlation represents a relationship between multiple health samples, such as a blood pressure reading that includes both systolic and diastolic values, or a meal record that includes nutritional quantities.

This guide explains how to create and save a correlation sample.

---

## What Is a Correlation?

A correlation groups related health data samples into a single, logical record. HealthKit currently supports the following correlation types:

* `"bloodPressure"` — includes two quantity samples: `"bloodPressureSystolic"` and `"bloodPressureDiastolic"`
* `"food"` — can include multiple nutritional quantity samples such as calories, protein, carbohydrates, etc.

---

## 1. Create Related Quantity Samples

Before creating a correlation, you must first create the individual `HealthQuantitySample` instances that will be included.

### Example: Blood Pressure Samples

```ts
const systolic = HealthQuantitySample.create({
  type: "bloodPressureSystolic",
  startDate: new Date(),
  endDate: new Date(),
  value: 120,
  unit: HealthUnit.millimeterOfMercury()
})

const diastolic = HealthQuantitySample.create({
  type: "bloodPressureDiastolic",
  startDate: new Date(),
  endDate: new Date(),
  value: 80,
  unit: HealthUnit.millimeterOfMercury()
})
```

Check that both samples are not null before proceeding.

---

## 2. Create the Correlation

Use `HealthCorrelation.create()` to group the samples into a correlation.

### Parameters

* `type`: `"bloodPressure"` or `"food"`
* `startDate`: Start of the event
* `endDate`: End of the event
* `objects`: An array of `HealthQuantitySample` (or `HealthCategorySample`) instances to include
* `metadata` *(optional)*: Additional metadata (e.g., source, context)

### Example

```ts
const correlation = HealthCorrelation.create({
  type: "bloodPressure",
  startDate: systolic.startDate,
  endDate: systolic.endDate,
  objects: [systolic, diastolic],
  metadata: {
    source: "ScriptingApp"
  }
})

if (!correlation) {
  throw new Error("Failed to create correlation.")
}
```

---

## 3. Save the Correlation to HealthKit

Use `Health.saveCorrelation()` to persist the correlation data to the HealthKit store.

```ts
await Health.saveCorrelation(correlation)
```

---

## Full Example: Writing a Blood Pressure Correlation

```ts
async function writeBloodPressure() {
  const systolic = HealthQuantitySample.create({
    type: "bloodPressureSystolic",
    startDate: new Date(),
    endDate: new Date(),
    value: 120,
    unit: HealthUnit.millimeterOfMercury()
  })

  const diastolic = HealthQuantitySample.create({
    type: "bloodPressureDiastolic",
    startDate: new Date(),
    endDate: new Date(),
    value: 80,
    unit: HealthUnit.millimeterOfMercury()
  })

  if (!systolic || !diastolic) {
    console.error("Failed to create samples.")
    return
  }

  const correlation = HealthCorrelation.create({
    type: "bloodPressure",
    startDate: systolic.startDate,
    endDate: systolic.endDate,
    objects: [systolic, diastolic],
    metadata: {
      note: "Manually recorded",
    }
  })

  if (!correlation) {
    console.error("Failed to create correlation.")
    return
  }

  try {
    await Health.saveCorrelation(correlation)
    console.log("Blood pressure data saved.")
  } catch (err) {
    console.error("Failed to save:", err)
  }
}

writeBloodPressure()
```

---

## Notes

* All quantity samples in the correlation **must have matching or consistent time ranges**.
* For `"bloodPressure"`, the correlation must include **both** `systolic` and `diastolic` samples.
* For `"food"`, you may include multiple samples like:

  * `"dietaryEnergyConsumed"` → `HealthUnit.kilocalorie()`
  * `"dietaryProtein"` → `HealthUnit.gram()`
  * `"dietaryCarbohydrates"` → `HealthUnit.gram()`
* Correlation creation returns `null` if invalid or incomplete.
