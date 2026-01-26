# HealthCategoryValue Types PRO

This document provides a comprehensive reference for all supported `HealthCategoryValue` enums used with `HealthCategorySample.create()` and related APIs. Each enum represents a specific categorical value associated with a `HealthCategoryType`.

***

## 1. `HealthCategoryValuePresence`

**Applicable Types:**

- `mindfulSession`
- `intermenstrualBleeding`
- `sexualActivity`
- `pregnancy`
- `lactation`

**Description:** Indicates the presence or absence of an event.

| Value        | Meaning                 |
| ------------ | ----------------------- |
| `present`    | The event occurred      |
| `notPresent` | The event did not occur |

***

## 2. `HealthCategoryValueSeverity`

**Applicable Types:**

- `menstrualFlow`
- `acneSeverity`
- `hairLossSeverity`
- `abdominalCramps`
- `headache`
- `nausea`

**Description:** Represents the severity level of a symptom.

| Value         | Meaning           |
| ------------- | ----------------- |
| `unspecified` | Not specified     |
| `notPresent`  | Not present       |
| `mild`        | Mild severity     |
| `moderate`    | Moderate severity |
| `severe`      | Severe            |

***

## 3. `HealthCategoryValueSleepAnalysis`

**Applicable Types:**

- `sleepAnalysis`

**Description:** Categorizes sleep states during a given time range.

| Value               | Meaning                         |
| ------------------- | ------------------------------- |
| `inBed`             | In bed (not necessarily asleep) |
| `asleepUnspecified` | Asleep (unspecified phase)      |
| `awake`             | Awake                           |
| `asleepCore`        | Core sleep                      |
| `asleepDeep`        | Deep sleep                      |
| `asleepREM`         | REM sleep                       |

***

## 4. `HealthCategoryValueOvulationTestResult`

**Applicable Types:**

- `ovulationTestResult`

| Value                     | Meaning                              |
| ------------------------- | ------------------------------------ |
| `negative`                | No LH surge detected                 |
| `luteinizingHormoneSurge` | LH surge detected (ovulation likely) |
| `indeterminate`           | Result unclear                       |
| `estrogenSurge`           | Estrogen surge detected              |

***

## 5. `HealthCategoryValuePregnancyTestResult`

**Applicable Types:**

- `pregnancyTestResult`

| Value           | Meaning           |
| --------------- | ----------------- |
| `negative`      | Test was negative |
| `positive`      | Test was positive |
| `indeterminate` | Result unclear    |

***

## 6. `HealthCategoryValueProgesteroneTestResult`

**Applicable Types:**

- `progesteroneTestResult`

| Value           | Meaning           |
| --------------- | ----------------- |
| `negative`      | Test was negative |
| `positive`      | Test was positive |
| `indeterminate` | Result unclear    |

***

## 7. `HealthCategoryValueCervicalMucusQuality`

**Applicable Types:**

- `cervicalMucusQuality`

| Value      | Meaning           |
| ---------- | ----------------- |
| `dry`      | Dry               |
| `sticky`   | Sticky            |
| `creamy`   | Creamy            |
| `watery`   | Watery            |
| `eggWhite` | Egg-white texture |

***

## 8. `HealthCategoryValueContraceptive`

**Applicable Types:**

- `contraceptive`

| Value                | Meaning                   |
| -------------------- | ------------------------- |
| `unspecified`        | Not specified             |
| `implant`            | Contraceptive implant     |
| `injection`          | Hormonal injection        |
| `intrauterineDevice` | Intrauterine device (IUD) |
| `intravaginalRing`   | Vaginal ring              |
| `oral`               | Oral contraceptive        |
| `patch`              | Transdermal patch         |

***

## 9. `HealthCategoryValueVaginalBleeding` _(iOS 18+)_

**Applicable Types:**

- `vaginalBleeding`

| Value         | Meaning         |
| ------------- | --------------- |
| `unspecified` | Not specified   |
| `light`       | Light bleeding  |
| `medium`      | Medium bleeding |
| `heavy`       | Heavy bleeding  |
| `none`        | No bleeding     |

***

## 10. `HealthCategoryValueAppetiteChanges`

**Applicable Types:**

- `appetiteChanges`

| Value         | Meaning               |
| ------------- | --------------------- |
| `unspecified` | Not specified         |
| `noChange`    | No change in appetite |
| `decreased`   | Appetite decreased    |
| `increased`   | Appetite increased    |

***

## 11. `HealthCategoryValueAppleStandHour`

**Applicable Types:**

- `appleStandHour`

| Value   | Meaning            |
| ------- | ------------------ |
| `stood` | User stood up      |
| `idle`  | User remained idle |

***

## 12. `HealthCategoryValueAppleWalkingSteadinessEvent`

**Applicable Types:**

- `appleWalkingSteadinessEvent`

| Value            | Meaning                     |
| ---------------- | --------------------------- |
| `initialLow`     | Initial low stability       |
| `initialVeryLow` | Initial very low stability  |
| `repeatLow`      | Repeated low stability      |
| `repeatVeryLow`  | Repeated very low stability |

***

## 13. `HealthCategoryValueEnvironmentalAudioExposureEvent`

**Applicable Types:**

- `environmentalAudioExposureEvent`

| Value            | Meaning                                 |
| ---------------- | --------------------------------------- |
| `momentaryLimit` | Momentary noise exposure limit exceeded |

***

## 14. `HealthCategoryValueHeadphoneAudioExposureEvent`

**Applicable Types:**

- `headphoneAudioExposureEvent`

| Value           | Meaning                                |
| --------------- | -------------------------------------- |
| `sevenDayLimit` | Exceeded recommended 7-day audio limit |

***

## 15. `HealthCategoryValueLowCardioFitnessEvent`

**Applicable Types:**

- `lowCardioFitnessEvent`

| Value        | Meaning                           |
| ------------ | --------------------------------- |
| `lowFitness` | Low cardio fitness level detected |

***

## Usage Example

```ts
const sample = HealthCategorySample.create({
  type: "menstrualFlow",
  startDate: new Date("2025-07-03T10:00:00"),
  endDate: new Date("2025-07-03T12:00:00"),
  value: HealthCategoryValueSeverity.moderate
})

await Health.saveCategorySample(sample)
```

***

## Notes

- Each enum value must match the `type` specified in the sample; using an incorrect enum will result in an error.
- Ensure HealthKit permissions are granted before saving or reading samples.
- `HealthCategorySample` values are stored using Apple's `HKCategoryTypeIdentifier` mapping under the hood.
