# HealthCharacteristicType

This section describes enums related to **user health profile attributes** and **activity configuration**, including biological sex, blood type, skin type, wheelchair use, and activity move mode. These enums are used with the `Health` API to retrieve user profile data from HealthKit.

***

## 1. `HealthBiologicalSex`

Represents the user’s biological sex.

| Enum Value | Description     |
| ---------- | --------------- |
| `notSet`   | Not set         |
| `female`   | Female          |
| `male`     | Male            |
| `other`    | Other/nonbinary |

***

## 2. `HealthBloodType`

Represents the user’s blood type.

| Enum Value   | Description |
| ------------ | ----------- |
| `notSet`     | Not set     |
| `aPositive`  | A Positive  |
| `aNegative`  | A Negative  |
| `bPositive`  | B Positive  |
| `bNegative`  | B Negative  |
| `abPositive` | AB Positive |
| `abNegative` | AB Negative |
| `oPositive`  | O Positive  |
| `oNegative`  | O Negative  |

***

## 3. `HealthFitzpatrickSkinType`

Represents the Fitzpatrick skin type classification, indicating the skin's response to sun exposure.

| Enum Value | Type     | Description                                 |
| ---------- | -------- | ------------------------------------------- |
| `notSet`   | –        | Not set                                     |
| `I`        | Type I   | Very fair, always burns, never tans         |
| `II`       | Type II  | Fair, usually burns, tans minimally         |
| `III`      | Type III | Medium, sometimes mild burn, gradually tans |
| `IV`       | Type IV  | Olive/dark, rarely burns, tans well         |
| `V`        | Type V   | Brown skin, rarely burns, tans easily       |
| `VI`       | Type VI  | Deeply pigmented, never burns               |

***

## 4. `HealthWheelchairUse`

Indicates whether the user uses a wheelchair.

| Enum Value | Description     |
| ---------- | --------------- |
| `notSet`   | Not set         |
| `no`       | Does not use    |
| `yes`      | Uses wheelchair |

***

## 5. `HealthActivityMoveMode`

Represents how the user prefers to track their movement goals in the Activity summary.

| Enum Value      | Description                                  |
| --------------- | -------------------------------------------- |
| `activeEnergy`  | Based on active energy burned                |
| `appleMoveTime` | Based on movement duration (Apple Move Time) |

***

## Usage Examples

```ts
// Check if the user uses a wheelchair
const wheelchair = await Health.wheelchairUse()
if (wheelchair === HealthWheelchairUse.yes) {
  console.log("The user uses a wheelchair")
}

// Retrieve and log the user's Fitzpatrick skin type
const skinType = await Health.fitzpatrickSkinType()
switch (skinType) {
  case HealthFitzpatrickSkinType.III:
    console.log("Medium skin type, gradually tans")
    break
}

// Determine user's activity move mode
const moveMode = await Health.activityMoveMode()
if (moveMode === HealthActivityMoveMode.appleMoveTime) {
  console.log("The user uses Apple Move Time mode")
}
```
