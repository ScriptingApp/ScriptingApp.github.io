---
title: 健康分类值类型（HealthCategoryValue）
tag: PRO
---

本文档列出了 `HealthCategorySample.create()` 及相关 API 中支持的所有 `HealthCategoryValue` 枚举类型。每个枚举值用于表示特定 `HealthCategoryType` 的分类结果。

---

## 1. `HealthCategoryValuePresence`

**适用类型：**

* `mindfulSession`（正念训练）
* `intermenstrualBleeding`（经间出血）
* `sexualActivity`（性行为）
* `pregnancy`（怀孕）
* `lactation`（哺乳）

**说明：** 用于表示事件是否发生。

| 值            | 含义    |
| ------------ | ----- |
| `present`    | 事件已发生 |
| `notPresent` | 事件未发生 |

---

## 2. `HealthCategoryValueSeverity`

**适用类型：**

* `menstrualFlow`（月经流量）
* `acneSeverity`（痤疮严重程度）
* `hairLossSeverity`（脱发严重程度）
* `abdominalCramps`（腹痛）
* `headache`（头痛）
* `nausea`（恶心）

**说明：** 表示症状的严重程度。

| 值             | 含义   |
| ------------- | ---- |
| `unspecified` | 未指定  |
| `notPresent`  | 无此症状 |
| `mild`        | 轻度   |
| `moderate`    | 中度   |
| `severe`      | 重度   |

---

## 3. `HealthCategoryValueSleepAnalysis`

**适用类型：**

* `sleepAnalysis`（睡眠分析）

**说明：** 描述某时间段内的睡眠状态。

| 值                   | 含义          |
| ------------------- | ----------- |
| `inBed`             | 在床上（不一定在睡觉） |
| `asleepUnspecified` | 睡着（阶段未知）    |
| `awake`             | 醒着          |
| `asleepCore`        | 核心睡眠        |
| `asleepDeep`        | 深度睡眠        |
| `asleepREM`         | 快速眼动睡眠      |

---

## 4. `HealthCategoryValueOvulationTestResult`

**适用类型：**

* `ovulationTestResult`（排卵测试）

| 值                         | 含义           |
| ------------------------- | ------------ |
| `negative`                | 未检测到 LH 激增   |
| `luteinizingHormoneSurge` | LH 激增，可能即将排卵 |
| `indeterminate`           | 结果不明确        |
| `estrogenSurge`           | 检测到雌激素激增     |

---

## 5. `HealthCategoryValuePregnancyTestResult`

**适用类型：**

* `pregnancyTestResult`（怀孕测试）

| 值               | 含义    |
| --------------- | ----- |
| `negative`      | 阴性    |
| `positive`      | 阳性    |
| `indeterminate` | 结果不明确 |

---

## 6. `HealthCategoryValueProgesteroneTestResult`

**适用类型：**

* `progesteroneTestResult`（孕酮测试）

| 值               | 含义    |
| --------------- | ----- |
| `negative`      | 阴性    |
| `positive`      | 阳性    |
| `indeterminate` | 结果不明确 |

---

## 7. `HealthCategoryValueCervicalMucusQuality`

**适用类型：**

* `cervicalMucusQuality`（宫颈黏液质量）

| 值          | 含义  |
| ---------- | --- |
| `dry`      | 干燥  |
| `sticky`   | 黏稠  |
| `creamy`   | 乳霜状 |
| `watery`   | 水样  |
| `eggWhite` | 蛋清状 |

---

## 8. `HealthCategoryValueContraceptive`

**适用类型：**

* `contraceptive`（避孕方式）

| 值                    | 含义         |
| -------------------- | ---------- |
| `unspecified`        | 未指定        |
| `implant`            | 植入型避孕棒     |
| `injection`          | 注射型避孕      |
| `intrauterineDevice` | 宫内节育器（IUD） |
| `intravaginalRing`   | 阴道环        |
| `oral`               | 口服避孕药      |
| `patch`              | 皮肤贴片       |

---

## 9. `HealthCategoryValueVaginalBleeding`（仅 iOS 18 及以上支持）

**适用类型：**

* `vaginalBleeding`（阴道出血）

| 值             | 含义   |
| ------------- | ---- |
| `unspecified` | 未指定  |
| `light`       | 轻度出血 |
| `medium`      | 中度出血 |
| `heavy`       | 重度出血 |
| `none`        | 无出血  |

---

## 10. `HealthCategoryValueAppetiteChanges`

**适用类型：**

* `appetiteChanges`（食欲变化）

| 值             | 含义   |
| ------------- | ---- |
| `unspecified` | 未指定  |
| `noChange`    | 无变化  |
| `decreased`   | 食欲减退 |
| `increased`   | 食欲增加 |

---

## 11. `HealthCategoryValueAppleStandHour`

**适用类型：**

* `appleStandHour`（Apple 久坐提醒）

| 值       | 含义       |
| ------- | -------- |
| `stood` | 用户起身活动过  |
| `idle`  | 用户一直保持静止 |

---

## 12. `HealthCategoryValueAppleWalkingSteadinessEvent`

**适用类型：**

* `appleWalkingSteadinessEvent`（步态稳定性事件）

| 值                | 含义         |
| ---------------- | ---------- |
| `initialLow`     | 初次检测到低稳定性  |
| `initialVeryLow` | 初次检测到极低稳定性 |
| `repeatLow`      | 重复检测到低稳定性  |
| `repeatVeryLow`  | 重复检测到极低稳定性 |

---

## 13. `HealthCategoryValueEnvironmentalAudioExposureEvent`

**适用类型：**

* `environmentalAudioExposureEvent`（环境音暴露事件）

| 值                | 含义       |
| ---------------- | -------- |
| `momentaryLimit` | 瞬间超过暴露限制 |

---

## 14. `HealthCategoryValueHeadphoneAudioExposureEvent`

**适用类型：**

* `headphoneAudioExposureEvent`（耳机音量暴露事件）

| 值               | 含义              |
| --------------- | --------------- |
| `sevenDayLimit` | 超过推荐的 7 天音量暴露上限 |

---

## 15. `HealthCategoryValueLowCardioFitnessEvent`

**适用类型：**

* `lowCardioFitnessEvent`（心肺适能不足事件）

| 值            | 含义           |
| ------------ | ------------ |
| `lowFitness` | 检测到较低的心肺适能水平 |

---

## 使用示例

```ts
const sample = HealthCategorySample.create({
  type: "menstrualFlow",
  startDate: new Date("2025-07-03T10:00:00"),
  endDate: new Date("2025-07-03T12:00:00"),
  value: HealthCategoryValueSeverity.moderate
})

await Health.saveCategorySample(sample)
```

---

## 注意事项

* `value` 的值必须与 `type` 对应的枚举类型一致，类型不符会导致错误。
* 请确保已获得 HealthKit 权限后再调用读取或保存方法。
* 所有枚举值最终会映射为 Apple HealthKit 的 `HKCategoryValue` 存储。
