# HealthCategoryType PRO

The `HealthCategoryType` identifies discrete health-related states or events, often recorded as binary values (e.g., present or not present) or discrete outcomes. These are commonly used for tracking symptoms, reproductive health, audio exposure events, and sleep states.

***

## 1. Apple Events and System Health

| Identifier                        | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `appleStandHour`                  | Indicates whether the user stood up during an hour      |
| `environmentalAudioExposureEvent` | Notifies of high environmental noise exposure           |
| `headphoneAudioExposureEvent`     | Indicates potentially harmful headphone volume exposure |
| `highHeartRateEvent`              | Detects unusually high heart rate during inactivity     |
| `lowHeartRateEvent`               | Detects unusually low heart rate                        |
| `irregularHeartRhythmEvent`       | Flags irregular heart rhythms (e.g., AFib)              |
| `lowCardioFitnessEvent`           | Indicates low cardio fitness level                      |
| `appleWalkingSteadinessEvent`     | Indicates risk of falling due to walking instability    |

***

## 2. Mindfulness and Hygiene

| Identifier           | Description                                     |
| -------------------- | ----------------------------------------------- |
| `mindfulSession`     | Logs a mindfulness session                      |
| `handwashingEvent`   | Detects handwashing activity (Apple Watch)      |
| `toothbrushingEvent` | Logs toothbrushing sessions (e.g., via sensors) |

***

## 3. Reproductive and Menstrual Health

| Identifier                         | Description                                 |
| ---------------------------------- | ------------------------------------------- |
| `menstrualFlow`                    | Records menstrual bleeding and its severity |
| `intermenstrualBleeding`           | Bleeding between menstrual periods          |
| `prolongedMenstrualPeriods`        | Periods longer than usual                   |
| `infrequentMenstrualCycles`        | Infrequent cycle occurrence                 |
| `irregularMenstrualCycles`         | Irregular cycle patterns                    |
| `persistentIntermenstrualBleeding` | Ongoing bleeding between cycles             |
| `bleedingDuringPregnancy`          | Bleeding while pregnant                     |
| `bleedingAfterPregnancy`           | Postpartum bleeding                         |
| `pregnancy`                        | Indicates whether the user is pregnant      |
| `lactation`                        | Indicates breastfeeding or milk production  |
| `sexualActivity`                   | Logs sexual activity                        |
| `ovulationTestResult`              | Ovulation test result (positive, negative)  |
| `pregnancyTestResult`              | Pregnancy test result                       |
| `progesteroneTestResult`           | Progesterone test outcome                   |
| `contraceptive`                    | Contraceptive method being used             |
| `cervicalMucusQuality`             | Tracks type of cervical mucus               |

***

## 4. Sleep and Breathing

| Identifier        | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `sleepAnalysis`   | Sleep duration and categorization (e.g., in bed, asleep) |
| `sleepApneaEvent` | Detected apnea event during sleep                        |

***

## 5. Symptoms and Conditions

| Identifier                           | Description                                      |
| ------------------------------------ | ------------------------------------------------ |
| `abdominalCramps`                    | Stomach or menstrual cramps                      |
| `acne`                               | Acne severity                                    |
| `appetiteChanges`                    | Increase or decrease in appetite                 |
| `bladderIncontinence`                | Urinary control issues                           |
| `bloating`                           | Feeling of abdominal swelling                    |
| `breastPain`                         | Pain or tenderness in the breast                 |
| `chestTightnessOrPain`               | Tightness or discomfort in the chest             |
| `chills`                             | Sudden feeling of cold without cause             |
| `constipation`                       | Difficulty passing stool                         |
| `coughing`                           | Cough symptom                                    |
| `diarrhea`                           | Loose or watery stools                           |
| `dizziness`                          | Feeling lightheaded or unsteady                  |
| `drySkin`                            | Skin dryness                                     |
| `fainting`                           | Temporary loss of consciousness                  |
| `fatigue`                            | General tiredness or low energy                  |
| `fever`                              | Elevated body temperature                        |
| `generalizedBodyAche`                | Full body soreness or aching                     |
| `hairLoss`                           | Notable hair thinning or shedding                |
| `headache`                           | Head pain                                        |
| `heartburn`                          | Burning sensation in chest or throat             |
| `hotFlashes`                         | Sudden feeling of warmth (commonly in menopause) |
| `lossOfSmell`                        | Anosmia (loss of smell)                          |
| `lossOfTaste`                        | Ageusia (loss of taste)                          |
| `lowerBackPain`                      | Pain in the lower back                           |
| `memoryLapse`                        | Difficulty remembering                           |
| `moodChanges`                        | Mood swings or emotional variation               |
| `nausea`                             | Sensation of wanting to vomit                    |
| `nightSweats`                        | Sweating during sleep                            |
| `pelvicPain`                         | Pain in the lower abdominal area                 |
| `rapidPoundingOrFlutteringHeartbeat` | Palpitations or abnormal heart rhythms           |
| `runnyNose`                          | Nasal discharge                                  |
| `shortnessOfBreath`                  | Difficulty breathing                             |
| `sinusCongestion`                    | Nasal blockage due to sinus inflammation         |
| `skippedHeartbeat`                   | Noticeable skipped or irregular heartbeats       |
| `sleepChanges`                       | Changes in sleep quality or duration             |
| `soreThroat`                         | Throat irritation or pain                        |
| `vaginalDryness`                     | Lack of natural vaginal lubrication              |
| `vomiting`                           | Expelling stomach contents                       |
| `wheezing`                           | Whistling sound while breathing                  |

***

## Use Cases

- **Reproductive Health Apps**: Use types like `menstrualFlow`, `ovulationTestResult`, `pregnancy`, and `lactation` to help users track fertility and cycles.
- **Mindfulness and Lifestyle**: Use `mindfulSession`, `handwashingEvent`, and `toothbrushingEvent` for promoting daily habits.
- **Sleep and Heart Monitoring**: Use `sleepAnalysis`, `sleepApneaEvent`, and heart rhythm-related types to provide nighttime and cardiovascular insights.
- **Symptom Trackers**: Use symptom-related types (e.g., `fatigue`, `fever`, `nausea`) in journaling, recovery, or diagnostics support apps.

***

## Example: Save a Sleep Stage Sample

```ts
const sample = HealthCategorySample.create({
  type: "sleepAnalysis",
  startDate: new Date("2025-07-03T22:30:00"),
  endDate: new Date("2025-07-04T06:30:00"),
  value: HealthCategoryValueSleepAnalysis.asleepDeep
})

await Health.saveCategorySample(sample)
```

***

## Example: Query Mindful Sessions

```ts
const results = await Health.queryCategorySamples({
  type: "mindfulSession",
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-05")
})

for (const session of results) {
  console.log("From", session.startDate, "to", session.endDate)
}
```

***

## Notes

- The `value` provided to a category sample must match the expected enum for the given `type`.
- If the `value` does not match the required category value type, the `create()` method will return `null`.
- Samples must span at least one second (`endDate > startDate`).
