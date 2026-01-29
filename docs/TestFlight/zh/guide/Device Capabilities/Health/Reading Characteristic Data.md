---
title: 读取特征数据
description: 该接口允许您从 HealthKit 存储中读取健康特征数据。
tag: PRO
---

HealthKit 中的 **特征数据** 指的是用户个人的静态属性，如出生日期、生物性别、血型、皮肤类型、是否使用轮椅，以及活动移动模式等。这些信息通常由用户在“健康”App 中设置，属于只读数据。

Scripting 提供了一系列 **全局异步 API** 来读取这些数据。

---

## 支持读取的特征

| 特征名称              | API 调用方式                             | 返回类型                           |
| ----------------- | ------------------------------------ | ------------------------------ |
| 出生日期              | `await Health.dateOfBirth()`         | `DateComponents`               |
| 生物性别              | `await Health.biologicalSex()`       | `HealthBiologicalSex` 枚举       |
| 血型                | `await Health.bloodType()`           | `HealthBloodType` 枚举           |
| 皮肤类型（Fitzpatrick） | `await Health.fitzpatrickSkinType()` | `HealthFitzpatrickSkinType` 枚举 |
| 是否使用轮椅            | `await Health.wheelchairUse()`       | `HealthWheelchairUse` 枚举       |
| 活动移动模式            | `await Health.activityMoveMode()`    | `HealthActivityMoveMode` 枚举    |

---

## 1. 读取出生日期

```ts
const birthDate = await Health.dateOfBirth()
console.log(`出生日期：${birthDate.year}年${birthDate.month}月${birthDate.day}日`)
```

返回值为 `DateComponents` 对象，例如：

```ts
{
  year: 1989,
  month: 7,
  day: 4
}
```

---

## 2. 读取生物性别

```ts
const sex = await Health.biologicalSex()

switch (sex) {
  case HealthBiologicalSex.female:
    console.log("女性")
    break
  case HealthBiologicalSex.male:
    console.log("男性")
    break
  case HealthBiologicalSex.other:
    console.log("其他")
    break
  case HealthBiologicalSex.notSet:
    console.log("未设置")
    break
}
```

---

## 3. 读取血型

```ts
const blood = await Health.bloodType()

switch (blood) {
  case HealthBloodType.aPositive:
    console.log("A型阳性")
    break
  case HealthBloodType.oNegative:
    console.log("O型阴性")
    break
  // 可补充更多类型
  default:
    console.log("未设置")
}
```

---

## 4. 读取皮肤类型（Fitzpatrick）

```ts
const skinType = await Health.fitzpatrickSkinType()

switch (skinType) {
  case HealthFitzpatrickSkinType.I:
    console.log("类型 I：非常白")
    break
  case HealthFitzpatrickSkinType.VI:
    console.log("类型 VI：深褐色至黑色")
    break
  default:
    console.log("未设置")
}
```

---

## 5. 判断是否使用轮椅

```ts
const wheelchair = await Health.wheelchairUse()

if (wheelchair === HealthWheelchairUse.yes) {
  console.log("用户使用轮椅")
} else if (wheelchair === HealthWheelchairUse.no) {
  console.log("用户不使用轮椅")
} else {
  console.log("未设置")
}
```

---

## 6. 读取活动移动模式

```ts
const mode = await Health.activityMoveMode()

if (mode === HealthActivityMoveMode.activeEnergy) {
  console.log("通过活跃能量追踪活动")
} else if (mode === HealthActivityMoveMode.appleMoveTime) {
  console.log("通过 Apple Move Time 追踪活动")
}
```

---

## 错误处理

如果：

* 用户未设置该特征；
* 没有获取权限；
* 设备不支持 HealthKit；

调用 API 时可能抛出异常。建议使用 `try/catch` 进行捕获：

```ts
try {
  const sex = await Health.biologicalSex()
  console.log(sex)
} catch (err) {
  console.error("读取生物性别失败：", err)
}
```

---

## 总结

你可以通过以下全局 API 读取用户的静态健康特征：

```ts
await Health.dateOfBirth()
await Health.biologicalSex()
await Health.bloodType()
await Health.fitzpatrickSkinType()
await Health.wheelchairUse()
await Health.activityMoveMode()
```

这些值来源于用户在健康 App 中的个人设置，通常不会频繁变化。请注意处理未设置或读取失败的情况。