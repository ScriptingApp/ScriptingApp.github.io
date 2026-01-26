# 健康特征类型（HealthCharacteristicType） PRO

本文档介绍与 HealthKit 中“个人健康档案”及“活动摘要”相关的枚举类型，主要用于获取或表示用户的静态健康特征信息（如性别、血型、皮肤类型、轮椅使用情况）以及运动模式设定。

***

## 1. `HealthBiologicalSex`

表示用户的生物性别（Biological Sex）。

| 枚举值      | 描述   |
| -------- | ---- |
| `notSet` | 未设置  |
| `female` | 女性   |
| `male`   | 男性   |
| `other`  | 其他性别 |

***

## 2. `HealthBloodType`

表示用户的血型信息。

| 枚举值          | 描述         |
| ------------ | ---------- |
| `notSet`     | 未设置        |
| `aPositive`  | A 型 Rh 阳性  |
| `aNegative`  | A 型 Rh 阴性  |
| `bPositive`  | B 型 Rh 阳性  |
| `bNegative`  | B 型 Rh 阴性  |
| `abPositive` | AB 型 Rh 阳性 |
| `abNegative` | AB 型 Rh 阴性 |
| `oPositive`  | O 型 Rh 阳性  |
| `oNegative`  | O 型 Rh 阴性  |

***

## 3. `HealthFitzpatrickSkinType`

表示 Fitzpatrick 皮肤类型，用于评估个体对阳光暴露的反应。

| 枚举值      | 类型     | 描述              |
| -------- | ------ | --------------- |
| `notSet` | 未设置    | 无皮肤类型信息         |
| `I`      | 类型 I   | 非常白皙，极易晒伤，几乎不晒黑 |
| `II`     | 类型 II  | 白皙，容易晒伤，难以晒黑    |
| `III`    | 类型 III | 中等肤色，有时晒伤，逐渐晒黑  |
| `IV`     | 类型 IV  | 深肤色，罕见晒伤，容易晒黑   |
| `V`      | 类型 V   | 深棕色皮肤，很少晒伤，晒黑明显 |
| `VI`     | 类型 VI  | 深黑色皮肤，从不晒伤      |

***

## 4. `HealthWheelchairUse`

表示用户是否使用轮椅。

| 枚举值      | 描述    |
| -------- | ----- |
| `notSet` | 未设置   |
| `no`     | 不使用轮椅 |
| `yes`    | 使用轮椅  |

***

## 5. `HealthActivityMoveMode`

表示用户 Apple 健康活动摘要的“移动环”目标计算模式。

| 枚举值             | 描述                   |
| --------------- | -------------------- |
| `activeEnergy`  | 传统模式：根据“主动消耗的卡路里”计算  |
| `appleMoveTime` | 时间模式：根据“活动时间”计算目标完成度 |

***

## 示例代码

```ts
// 获取用户是否使用轮椅
const wheelchair = await Health.wheelchairUse()
if (wheelchair === HealthWheelchairUse.yes) {
  console.log("用户使用轮椅")
}

// 获取用户皮肤类型
const skinType = await Health.fitzpatrickSkinType()
switch (skinType) {
  case HealthFitzpatrickSkinType.III:
    console.log("中等肤色，逐渐晒黑")
    break
}

// 获取用户活动模式
const mode = await Health.activityMoveMode()
if (mode === HealthActivityMoveMode.appleMoveTime) {
  console.log("用户使用 Apple Move Time 模式")
}
```
