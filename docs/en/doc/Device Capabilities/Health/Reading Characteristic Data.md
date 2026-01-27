---
title: Reading Characteristic Data
tag: PRO
---

HealthKit stores **characteristics** as immutable personal attributes, such as biological sex, date of birth, blood type, skin type, wheelchair usage, and activity move mode. These values are typically entered by the user in the Health app and rarely change.

The Scripting app provides global asynchronous APIs for accessing these values.

---

## Supported Characteristics

You can read the following characteristics:

| Characteristic        | API                            | Return Type                      |
| --------------------- | ------------------------------ | -------------------------------- |
| Date of birth         | `Health.dateOfBirth()`         | `DateComponents`                 |
| Biological sex        | `Health.biologicalSex()`       | `HealthBiologicalSex` enum       |
| Blood type            | `Health.bloodType()`           | `HealthBloodType` enum           |
| Fitzpatrick skin type | `Health.fitzpatrickSkinType()` | `HealthFitzpatrickSkinType` enum |
| Wheelchair use status | `Health.wheelchairUse()`       | `HealthWheelchairUse` enum       |
| Activity move mode    | `Health.activityMoveMode()`    | `HealthActivityMoveMode` enum    |

---

## 1. Read Date of Birth

```ts
const birthDate = await Health.dateOfBirth()
console.log(`Year: ${birthDate.year}, Month: ${birthDate.month}, Day: ${birthDate.day}`)
```

Returned object conforms to `DateComponents`:

```ts
{
  era?: number
  year?: number
  month?: number
  day?: number
  hour?: number
  minute?: number
  second?: number
  weekday?: number
  ...
}
```

---

## 2. Read Biological Sex

```ts
const sex = await Health.biologicalSex()

switch (sex) {
  case HealthBiologicalSex.female:
    console.log("Female")
    break
  case HealthBiologicalSex.male:
    console.log("Male")
    break
  case HealthBiologicalSex.other:
    console.log("Other")
    break
  case HealthBiologicalSex.notSet:
    console.log("Not Set")
    break
}
```

---

## 3. Read Blood Type

```ts
const blood = await Health.bloodType()

switch (blood) {
  case HealthBloodType.aPositive:
    console.log("A+")
    break
  case HealthBloodType.oNegative:
    console.log("O-")
    break
  // ... other values
  default:
    console.log("Not Set")
}
```

---

## 4. Read Fitzpatrick Skin Type

```ts
const skinType = await Health.fitzpatrickSkinType()

switch (skinType) {
  case HealthFitzpatrickSkinType.I:
    console.log("Type I: Very fair")
    break
  case HealthFitzpatrickSkinType.VI:
    console.log("Type VI: Deeply pigmented dark brown to black")
    break
  default:
    console.log("Not Set")
}
```

---

## 5. Read Wheelchair Use Status

```ts
const wheelchair = await Health.wheelchairUse()

if (wheelchair === HealthWheelchairUse.yes) {
  console.log("User uses a wheelchair")
} else if (wheelchair === HealthWheelchairUse.no) {
  console.log("User does not use a wheelchair")
} else {
  console.log("Not Set")
}
```

---

## 6. Read Activity Move Mode

```ts
const mode = await Health.activityMoveMode()

if (mode === HealthActivityMoveMode.activeEnergy) {
  console.log("Tracking by active energy burned")
} else if (mode === HealthActivityMoveMode.appleMoveTime) {
  console.log("Tracking by Apple Move Time")
}
```

---

## Error Handling

Each method may throw an error if:

* The characteristic is not set by the user
* The permission is denied
* HealthKit is unavailable

Example:

```ts
try {
  const sex = await Health.biologicalSex()
  console.log(sex)
} catch (err) {
  console.error("Failed to read biological sex:", err)
}
```

---

## Summary

You can access personal attributes using the following global APIs:

```ts
await Health.dateOfBirth()
await Health.biologicalSex()
await Health.bloodType()
await Health.fitzpatrickSkinType()
await Health.wheelchairUse()
await Health.activityMoveMode()
```

These values are static and reflect the user’s personal configuration in the Health app. Be sure to handle missing or unset values gracefully.
