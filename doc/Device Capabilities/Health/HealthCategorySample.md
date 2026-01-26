# HealthCategorySample

The `HealthCategorySample` class represents an individual category-based health record, such as a sleep session, menstrual flow level, or a test result. These samples are used to store discrete events or conditions over time, usually characterized by a start and end date along with a categorical value.

***

## Overview

This class is suitable for:

- Tracking and analyzing time-bound health events (e.g., sleep analysis)
- Recording categorical values with a specific time interval (e.g., "present" or "not present")
- Manually creating samples for use with HealthKit-compatible export or analysis

***

## Properties

| Property       | Type                          | Description                                                                       |
| -------------- | ----------------------------- | --------------------------------------------------------------------------------- |
| `uuid`         | `string`                      | A unique identifier for the sample.                                               |
| `categoryType` | `HealthCategoryType`          | The category type of the sample (e.g., `sleepAnalysis`, `sexualActivity`).        |
| `startDate`    | `Date`                        | The start date and time of the recorded event.                                    |
| `endDate`      | `Date`                        | The end date and time of the recorded event.                                      |
| `value`        | `number`                      | The categorical value for the sample, from a specific `HealthCategoryValue` enum. |
| `metadata`     | `Record<string, any> \| null` | Optional additional metadata about the sample (e.g., source, notes).              |

***

## Method: `static create(...)`

Creates a new `HealthCategorySample` instance using the specified parameters.

### Signature

```ts
static create(options: {
  type: HealthCategoryType
  startDate: Date
  endDate: Date
  value: HealthCategoryValueAppetiteChanges | HealthCategoryValueAppleStandHour | HealthCategoryValueAppleWalkingSteadinessEvent | HealthCategoryValueCervicalMucusQuality | HealthCategoryValueContraceptive | HealthCategoryValueEnvironmentalAudioExposureEvent | HealthCategoryValueHeadphoneAudioExposureEvent | HealthCategoryValueLowCardioFitnessEvent | HealthCategoryValueOvulationTestResult | HealthCategoryValuePregnancyTestResult | HealthCategoryValuePresence | HealthCategoryValueProgesteroneTestResult | HealthCategoryValueSeverity | HealthCategoryValueSleepAnalysis | HealthCategoryValueVaginalBleeding
  metadata?: Record<string, any> | null
}): HealthCategorySample | null
```

### Parameters

| Parameter   | Type                                    | Description                                           |
| ----------- | --------------------------------------- | ----------------------------------------------------- |
| `type`      | `HealthCategoryType`                    | The category type this sample represents.             |
| `startDate` | `Date`                                  | When the health event began.                          |
| `endDate`   | `Date`                                  | When the health event ended.                          |
| `value`     | One of the `HealthCategoryValue*` enums | The specific categorical value. Must match the type.  |
| `metadata`  | Optional `Record<string, any>`          | Optional data such as annotations or tracking source. |

### Returns

- A `HealthCategorySample` instance if the inputs are valid.
- `null` if the parameters are invalid (e.g., value/type mismatch).

***

## Usage Examples

### 1. Creating a Sleep Analysis Sample

```ts
const sample = HealthCategorySample.create({
  type: 'sleepAnalysis',
  startDate: new Date('2025-07-01T23:00:00'),
  endDate: new Date('2025-07-02T06:00:00'),
  value: HealthCategoryValueSleepAnalysis.asleep,
  metadata: { source: 'manual entry' }
})

if (sample) {
  console.log(`Created sleep sample from ${sample.startDate} to ${sample.endDate}`)
}
```

### 2. Logging a Sexual Activity Event

```ts
const event = HealthCategorySample.create({
  type: 'sexualActivity',
  startDate: new Date('2025-07-03T22:30:00'),
  endDate: new Date('2025-07-03T22:40:00'),
  value: HealthCategoryValuePresence.present
})
```

### 3. Tracking Ovulation Test Result

```ts
const result = HealthCategorySample.create({
  type: 'ovulationTestResult',
  startDate: new Date('2025-07-05T08:00:00'),
  endDate: new Date('2025-07-05T08:05:00'),
  value: HealthCategoryValueOvulationTestResult.positive
})
```

***

## Notes on `value`

The `value` field must be a valid enum value for the given category type. For example:

- `sleepAnalysis` must use `HealthCategoryValueSleepAnalysis`
- `sexualActivity` must use `HealthCategoryValuePresence`
- `menstrualFlow` must use `HealthCategoryValueSeverity`
- `ovulationTestResult` must use `HealthCategoryValueOvulationTestResult`

If the value and type do not match, the sample creation will fail and return `null`.

***

## Common Use Cases

| Type                              | Value Enum                                           | Use Case Example       |
| --------------------------------- | ---------------------------------------------------- | ---------------------- |
| `sleepAnalysis`                   | `HealthCategoryValueSleepAnalysis`                   | Sleep tracking apps    |
| `sexualActivity`                  | `HealthCategoryValuePresence`                        | Lifestyle logging      |
| `menstrualFlow`                   | `HealthCategoryValueSeverity`                        | Menstrual health apps  |
| `pregnancyTestResult`             | `HealthCategoryValuePregnancyTestResult`             | Fertility tracking     |
| `appleStandHour`                  | `HealthCategoryValueAppleStandHour`                  | Stand reminder history |
| `environmentalAudioExposureEvent` | `HealthCategoryValueEnvironmentalAudioExposureEvent` | Noise alerts tracking  |
