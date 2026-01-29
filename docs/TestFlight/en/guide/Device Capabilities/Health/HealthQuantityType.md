---
title: HealthQuantityType
description: This interface provides a way to define and manage health quantity types, which represent measurable health data such as steps, heart rate, or calories burned.
tag: PRO
---

This document lists all supported `HealthQuantityType` identifiers, categorized by domain. Each type is associated with a measurable health-related metric and can be used to track fitness, vital signs, nutrition, environment, and more.

---

## 1. Body Measurements

| Identifier                      | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `bodyMass`                      | Weight of the body (in kilograms or pounds)             |
| `bodyMassIndex`                 | Body Mass Index (BMI), a weight-to-height ratio         |
| `height`                        | Height of the user                                      |
| `bodyFatPercentage`             | Percentage of fat in the body                           |
| `leanBodyMass`                  | Mass excluding fat, bones, and organs                   |
| `waistCircumference`            | Waist measurement, often used in metabolic health       |
| `appleSleepingWristTemperature` | Skin temperature during sleep from Apple Watch          |
| `bodyTemperature`               | Core body temperature                                   |
| `basalBodyTemperature`          | Minimum daily body temperature, often used in fertility |

---

## 2. Activity & Fitness

| Identifier                    | Description                                    |
| ----------------------------- | ---------------------------------------------- |
| `stepCount`                   | Number of steps taken                          |
| `distanceWalkingRunning`      | Distance walked or run                         |
| `flightsClimbed`              | Number of floors climbed                       |
| `activeEnergyBurned`          | Active calories burned through movement        |
| `basalEnergyBurned`           | Calories burned at rest                        |
| `appleExerciseTime`           | Time spent in Apple-defined exercise           |
| `appleMoveTime`               | Move ring time for activity summary            |
| `appleStandTime`              | Time standing (Apple Watch)                    |
| `pushCount`                   | Number of wheelchair pushes                    |
| `distanceWheelchair`          | Distance traveled via wheelchair               |
| `nikeFuel`                    | Deprecated Nike activity score                 |
| `estimatedWorkoutEffortScore` | Effort score estimation (Apple Workout)        |
| `workoutEffortScore`          | Direct effort score from workouts              |
| `physicalEffort`              | Intensity estimation of effort during workouts |

---

## 3. Exercise-Specific Metrics

| Identifier                        | Description                              |
| --------------------------------- | ---------------------------------------- |
| `cyclingSpeed`                    | Speed during cycling                     |
| `cyclingPower`                    | Power output during cycling              |
| `cyclingCadence`                  | Pedal revolutions per minute             |
| `cyclingFunctionalThresholdPower` | Max sustainable power for cycling        |
| `distanceCycling`                 | Distance cycled                          |
| `distanceRowing`                  | Distance rowed                           |
| `rowingSpeed`                     | Speed while rowing                       |
| `distanceSwimming`                | Distance swum                            |
| `swimmingStrokeCount`             | Number of swimming strokes               |
| `distancePaddleSports`            | Distance paddled (e.g., kayaking)        |
| `paddleSportsSpeed`               | Speed during paddle sports               |
| `distanceSkatingSports`           | Distance in skating sports               |
| `distanceDownhillSnowSports`      | Distance in downhill skiing/snowboarding |
| `distanceCrossCountrySkiing`      | Distance in cross-country skiing         |
| `crossCountrySkiingSpeed`         | Speed in cross-country skiing            |

---

## 4. Running & Walking Analysis

| Identifier                       | Description                       |
| -------------------------------- | --------------------------------- |
| `runningSpeed`                   | Running speed                     |
| `runningPower`                   | Running power output              |
| `runningStrideLength`            | Stride length                     |
| `runningVerticalOscillation`     | Vertical bounce during running    |
| `runningGroundContactTime`       | Foot-ground contact time          |
| `walkingStepLength`              | Step length while walking         |
| `walkingSpeed`                   | Walking speed                     |
| `walkingAsymmetryPercentage`     | Gait asymmetry                    |
| `walkingDoubleSupportPercentage` | % of time both feet are on ground |
| `appleWalkingSteadiness`         | Apple’s fall risk metric          |
| `walkingHeartRateAverage`        | Avg heart rate during walking     |
| `sixMinuteWalkTestDistance`      | Distance in 6-minute walk test    |
| `stairAscentSpeed`               | Speed ascending stairs            |
| `stairDescentSpeed`              | Speed descending stairs           |

---

## 5. Heart & Vitals

| Identifier                   | Description                             |
| ---------------------------- | --------------------------------------- |
| `heartRate`                  | Beats per minute                        |
| `restingHeartRate`           | Resting heart rate                      |
| `walkingHeartRateAverage`    | Average heart rate while walking        |
| `heartRateVariabilitySDNN`   | HRV: Standard deviation of NN intervals |
| `heartRateRecoveryOneMinute` | HR recovery 1 min post-exercise         |
| `peripheralPerfusionIndex`   | Blood perfusion index                   |
| `atrialFibrillationBurden`   | AFib percentage over time               |
| `vo2Max`                     | Max oxygen uptake, fitness metric       |
| `bloodPressureSystolic`      | Systolic blood pressure                 |
| `bloodPressureDiastolic`     | Diastolic blood pressure                |
| `oxygenSaturation`           | Blood oxygen %                          |
| `bloodGlucose`               | Blood sugar level                       |
| `insulinDelivery`            | Insulin delivered                       |
| `inhalerUsage`               | Number of inhaler puffs                 |
| `respiratoryRate`            | Breaths per minute                      |
| `forcedExpiratoryVolume1`    | Volume in first second of exhalation    |
| `forcedVitalCapacity`        | Max air exhaled after deep breath       |
| `peakExpiratoryFlowRate`     | Peak flow during exhalation             |

---

## 6. Audio & Environment

| Identifier                    | Description                               |
| ----------------------------- | ----------------------------------------- |
| `environmentalAudioExposure`  | Ambient sound levels                      |
| `environmentalSoundReduction` | Noise reduction via headphones            |
| `headphoneAudioExposure`      | Audio exposure from headphones            |
| `uvExposure`                  | Ultraviolet radiation exposure            |
| `timeInDaylight`              | Time spent in daylight (Apple Watch)      |
| `underwaterDepth`             | Depth below water during activity         |
| `waterTemperature`            | Temperature of water when swimming/diving |

---

## 7. Nutrition (Dietary Intake)

| Identifier                  | Description                 |
| --------------------------- | --------------------------- |
| `dietaryEnergyConsumed`     | Total dietary energy intake |
| `dietaryProtein`            | Protein intake              |
| `dietaryCarbohydrates`      | Carbohydrate intake         |
| `dietaryFatTotal`           | Total fat intake            |
| `dietaryFatSaturated`       | Saturated fat               |
| `dietaryFatMonounsaturated` | Monounsaturated fat         |
| `dietaryFatPolyunsaturated` | Polyunsaturated fat         |
| `dietarySugar`              | Total sugar                 |
| `dietaryFiber`              | Fiber                       |
| `dietaryWater`              | Water intake (in mL or L)   |
| `dietaryCaffeine`           | Caffeine intake             |
| `dietaryCholesterol`        | Cholesterol intake          |
| `dietarySodium`             | Sodium intake               |
| `dietaryPotassium`          | Potassium intake            |
| `dietaryCalcium`            | Calcium intake              |
| `dietaryIron`               | Iron intake                 |
| `dietaryMagnesium`          | Magnesium intake            |
| `dietaryZinc`               | Zinc intake                 |
| `dietaryIodine`             | Iodine intake               |
| `dietaryVitaminA`           | Vitamin A intake            |
| `dietaryVitaminB6`          | Vitamin B6 intake           |
| `dietaryVitaminB12`         | Vitamin B12 intake          |
| `dietaryVitaminC`           | Vitamin C intake            |
| `dietaryVitaminD`           | Vitamin D intake            |
| `dietaryVitaminE`           | Vitamin E intake            |
| `dietaryVitaminK`           | Vitamin K intake            |
| `dietaryThiamin`            | Vitamin B1 intake           |
| `dietaryRiboflavin`         | Vitamin B2 intake           |
| `dietaryNiacin`             | Vitamin B3 intake           |
| `dietaryPantothenicAcid`    | Vitamin B5 intake           |
| `dietaryFolate`             | Folate intake               |
| `dietaryCopper`             | Copper intake               |
| `dietarySelenium`           | Selenium intake             |
| `dietaryChromium`           | Chromium intake             |
| `dietaryManganese`          | Manganese intake            |
| `dietaryMolybdenum`         | Molybdenum intake           |
| `dietaryPhosphorus`         | Phosphorus intake           |
| `dietaryBiotin`             | Biotin intake               |

---

## 8. Lifestyle & Others

| Identifier                           | Description                        |
| ------------------------------------ | ---------------------------------- |
| `bloodAlcoholContent`                | Blood alcohol %                    |
| `numberOfAlcoholicBeverages`         | Count of alcoholic drinks          |
| `numberOfTimesFallen`                | Fall detection count               |
| `appleSleepingBreathingDisturbances` | Sleep breathing irregularity count |

---

## When to Use `HealthQuantityType`

You will provide a `HealthQuantityType` string when:

1. **Querying quantity samples**:

```ts
const results = await Health.queryQuantitySamples({
  type: "stepCount",
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02")
})
```

2. **Writing a quantity sample**:

```ts
const sample = HealthQuantitySample.create({
  type: "bodyMass",
  unit: HealthUnit.gramUnit(HealthUnitPrefix.kilo),
  value: 70.0,
  startDate: new Date("2025-07-01 00:00:00"),
  endDate:  new Date("2025-07-02 00:00:00"),
})

await Health.saveQuantitySample(sample)
```

3. **Reading statistics from a workout**:

```ts
const stat = workout.allStatistics["heartRate"]
const avg = stat?.averageQuantity(HealthUnit.count().divided(HealthUnit.minute()))
```
