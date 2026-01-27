---
title: 健康分类数据（HealthCategorySample）
tag: PRO
---

`HealthCategorySample` 表示一条基于分类的健康事件记录，例如睡眠分析、月经流量、排卵测试结果等。每条样本通常具有一个时间区间以及一个类别值，适用于记录健康相关事件的状态或发生情况。

---

## 适用场景

* 记录用户在某段时间内发生的健康事件（如睡觉、排卵、饮酒等）
* 存储和显示事件类型及其状态
* 手动添加健康事件数据
* 跟踪时间段型的健康行为

---

## 属性说明

| 属性名            | 类型                            | 说明                                           |
| -------------- | ----------------------------- | -------------------------------------------- |
| `uuid`         | `string`                      | 唯一标识该健康样本的 UUID。                             |
| `categoryType` | `HealthCategoryType`          | 样本的分类类型，例如 `sleepAnalysis`、`sexualActivity`。 |
| `startDate`    | `Date`                        | 事件开始时间。                                      |
| `endDate`      | `Date`                        | 事件结束时间。                                      |
| `value`        | `number`                      | 分类值，使用相应的 `HealthCategoryValue*` 枚举类型。       |
| `metadata`     | `Record<string, any> \| null` | 可选的元数据，可包含事件来源、自定义标签等。                       |

---

## 方法说明

### `static create(options): HealthCategorySample | null`

创建一条新的 `HealthCategorySample` 健康分类样本。

#### 参数说明

```ts
{
  type: HealthCategoryType               // 分类类型，例如 'sleepAnalysis'
  startDate: Date                        // 事件起始时间
  endDate: Date                          // 事件结束时间
  value: HealthCategoryValueXxx          // 分类值，根据类型不同需传入不同枚举
  metadata?: Record<string, any> | null  // 可选元数据
}
```

#### 返回值

* 创建成功时返回一个 `HealthCategorySample` 实例；
* 如果参数无效（例如类型与值不匹配），返回 `null`。

---

## 使用示例

### 示例 1：创建一条睡眠记录

```ts
const sample = HealthCategorySample.create({
  type: 'sleepAnalysis',
  startDate: new Date('2025-07-01T23:00:00'),
  endDate: new Date('2025-07-02T06:00:00'),
  value: HealthCategoryValueSleepAnalysis.asleep,
  metadata: { source: 'manual entry' }
})

if (sample) {
  console.log(`已创建睡眠样本：从 ${sample.startDate} 到 ${sample.endDate}`)
}
```

---

### 示例 2：记录一次性行为事件

```ts
const event = HealthCategorySample.create({
  type: 'sexualActivity',
  startDate: new Date('2025-07-03T22:30:00'),
  endDate: new Date('2025-07-03T22:40:00'),
  value: HealthCategoryValuePresence.present
})
```

---

### 示例 3：记录一次排卵测试结果

```ts
const result = HealthCategorySample.create({
  type: 'ovulationTestResult',
  startDate: new Date('2025-07-05T08:00:00'),
  endDate: new Date('2025-07-05T08:05:00'),
  value: HealthCategoryValueOvulationTestResult.positive
})
```

---

## 值的使用说明

`value` 参数必须使用对应类型的枚举值，示例如下：

| 类型 (`type`)                       | 所需枚举类型                                               |
| --------------------------------- | ---------------------------------------------------- |
| `sleepAnalysis`                   | `HealthCategoryValueSleepAnalysis`                   |
| `sexualActivity`                  | `HealthCategoryValuePresence`                        |
| `menstrualFlow`                   | `HealthCategoryValueSeverity`                        |
| `ovulationTestResult`             | `HealthCategoryValueOvulationTestResult`             |
| `appleStandHour`                  | `HealthCategoryValueAppleStandHour`                  |
| `environmentalAudioExposureEvent` | `HealthCategoryValueEnvironmentalAudioExposureEvent` |

如果类型与值不匹配，将导致创建失败返回 `null`。

---

## 常见使用场景

| 类型                    | 值枚举类型                                    | 示例用途      |
| --------------------- | ---------------------------------------- | --------- |
| `sleepAnalysis`       | `HealthCategoryValueSleepAnalysis`       | 睡眠记录      |
| `sexualActivity`      | `HealthCategoryValuePresence`            | 性行为记录     |
| `menstrualFlow`       | `HealthCategoryValueSeverity`            | 月经记录      |
| `pregnancyTestResult` | `HealthCategoryValuePregnancyTestResult` | 排卵或怀孕测试结果 |
| `appleStandHour`      | `HealthCategoryValueAppleStandHour`      | 久坐提醒记录    |

---

## 相关方法

* `Health.queryCategorySamples()`：用于查询分类健康样本的 API。
* `HealthCategoryType`：定义所有支持的分类类型。
* `HealthCategoryValue*`：不同类型的分类值枚举定义。
