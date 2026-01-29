---
title: 健康分类数据（HealthCategoryType）
description: 该接口提供了一种定义和管理健康分类数据的方法，表示定性的健康数据，如睡眠分析、情绪或月经周期。
tag: PRO
---

`HealthCategoryType` 用于表示离散型的健康状态或事件。它们通常为“是否发生”的记录（如：是否怀孕、是否进行正念训练、是否存在某种症状），适用于症状追踪、睡眠分析、生殖健康记录、环境暴露监测等场景。

---

## 1. Apple 系统事件与健康警示

| 标识符                               | 用途说明                     |
| --------------------------------- | ------------------------ |
| `appleStandHour`                  | 是否在当前小时内站立过（Apple Watch） |
| `environmentalAudioExposureEvent` | 环境噪音过高事件（例如超过 80 分贝）     |
| `headphoneAudioExposureEvent`     | 耳机音量暴露过高事件               |
| `highHeartRateEvent`              | 静息状态下心率异常升高              |
| `lowHeartRateEvent`               | 心率低于正常值                  |
| `irregularHeartRhythmEvent`       | 心律不齐检测（如房颤）              |
| `lowCardioFitnessEvent`           | 心肺适能过低事件                 |
| `appleWalkingSteadinessEvent`     | 步态稳定性过低，可能存在跌倒风险         |

---

## 2. 正念与健康行为记录

| 标识符                  | 用途说明                     |
| -------------------- | ------------------------ |
| `mindfulSession`     | 正念冥想记录                   |
| `handwashingEvent`   | 洗手行为记录（Apple Watch 自动识别） |
| `toothbrushingEvent` | 刷牙行为记录（如连接智能牙刷）          |

---

## 3. 生殖与月经周期健康

| 标识符                                | 用途说明            |
| ---------------------------------- | --------------- |
| `menstrualFlow`                    | 经期流量记录          |
| `intermenstrualBleeding`           | 经期之间的异常出血       |
| `prolongedMenstrualPeriods`        | 经期持续时间异常延长      |
| `infrequentMenstrualCycles`        | 经期频率过低          |
| `irregularMenstrualCycles`         | 经期时间不规律         |
| `persistentIntermenstrualBleeding` | 经间出血持续时间过长      |
| `bleedingDuringPregnancy`          | 怀孕期间出血          |
| `bleedingAfterPregnancy`           | 分娩后出血           |
| `pregnancy`                        | 是否怀孕            |
| `lactation`                        | 是否哺乳/泌乳         |
| `sexualActivity`                   | 性行为记录           |
| `ovulationTestResult`              | 排卵测试结果（阳性/阴性）   |
| `pregnancyTestResult`              | 验孕测试结果          |
| `progesteroneTestResult`           | 孕酮水平检测结果        |
| `contraceptive`                    | 使用的避孕方式         |
| `cervicalMucusQuality`             | 宫颈黏液质地（用于排卵期追踪） |

---

## 4. 睡眠与呼吸相关事件

| 标识符               | 用途说明               |
| ----------------- | ------------------ |
| `sleepAnalysis`   | 睡眠阶段记录（如：在床、入睡、清醒） |
| `sleepApneaEvent` | 睡眠呼吸暂停事件           |

---

## 5. 症状与身体状况

| 标识符                                  | 用途说明        |
| ------------------------------------ | ----------- |
| `abdominalCramps`                    | 腹部或经期腹痛     |
| `acne`                               | 青春痘严重程度     |
| `appetiteChanges`                    | 食欲变化（增加或减少） |
| `bladderIncontinence`                | 尿失禁         |
| `bloating`                           | 腹胀感         |
| `breastPain`                         | 乳房疼痛或不适     |
| `chestTightnessOrPain`               | 胸口紧绷或疼痛     |
| `chills`                             | 发冷、寒颤       |
| `constipation`                       | 便秘          |
| `coughing`                           | 咳嗽          |
| `diarrhea`                           | 腹泻          |
| `dizziness`                          | 头晕          |
| `drySkin`                            | 皮肤干燥        |
| `fainting`                           | 昏厥          |
| `fatigue`                            | 疲惫、乏力       |
| `fever`                              | 发烧          |
| `generalizedBodyAche`                | 全身酸痛        |
| `hairLoss`                           | 脱发          |
| `headache`                           | 头痛          |
| `heartburn`                          | 胃灼热、胃酸倒流    |
| `hotFlashes`                         | 潮热（如更年期症状）  |
| `lossOfSmell`                        | 嗅觉丧失        |
| `lossOfTaste`                        | 味觉丧失        |
| `lowerBackPain`                      | 下背部疼痛       |
| `memoryLapse`                        | 记忆模糊、短暂性遗忘  |
| `moodChanges`                        | 情绪波动        |
| `nausea`                             | 恶心感         |
| `nightSweats`                        | 夜间出汗        |
| `pelvicPain`                         | 骨盆区域疼痛      |
| `rapidPoundingOrFlutteringHeartbeat` | 心悸、心跳过快     |
| `runnyNose`                          | 流鼻涕         |
| `shortnessOfBreath`                  | 呼吸困难        |
| `sinusCongestion`                    | 鼻窦阻塞        |
| `skippedHeartbeat`                   | 心跳中断或跳拍     |
| `sleepChanges`                       | 睡眠质量或习惯变化   |
| `soreThroat`                         | 喉咙痛         |
| `vaginalDryness`                     | 阴道干涩        |
| `vomiting`                           | 呕吐          |
| `wheezing`                           | 呼吸时发出喘鸣声    |

---

## 应用场景举例

* **生殖健康应用**：可使用如 `menstrualFlow`、`ovulationTestResult`、`pregnancy`、`lactation` 等类型追踪月经、排卵、孕期及哺乳情况。
* **日常行为与习惯追踪**：通过 `mindfulSession`、`handwashingEvent`、`toothbrushingEvent` 引导用户建立良好生活习惯。
* **睡眠与心率监测**：结合 `sleepAnalysis`、`sleepApneaEvent` 与心律相关类型，为用户提供全面夜间与心血管健康评估。
* **症状记录与疾病管理**：适用于日记类、康复类 App，记录如 `fatigue`、`nausea`、`fever` 等症状，便于观察病情趋势。

---

## 示例：写入睡眠阶段记录

```ts
const sample = HealthCategorySample.create({
  type: "sleepAnalysis",
  startDate: new Date("2025-07-03T22:30:00"),
  endDate: new Date("2025-07-04T06:30:00"),
  value: HealthCategoryValueSleepAnalysis.asleepDeep
})

await Health.saveCategorySample(sample)
```

---

## 示例：查询冥想记录

```ts
const results = await Health.queryCategorySamples({
  type: "mindfulSession",
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-05")
})

for (const session of results) {
  console.log("开始：", session.startDate)
  console.log("结束：", session.endDate)
}
```

---

## 注意事项

* `value` 值必须使用与类型匹配的枚举类型，否则 `create()` 会返回 `null`。
* `endDate` 必须大于 `startDate`，即事件需持续至少 1 秒。
* 分类样本适合用于表示有状态变化或事件发生的健康记录。
