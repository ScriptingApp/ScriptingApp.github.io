---
title: 查询统计数据集合（HealthStatisticsCollection）
description: 该接口允许您查询一组健康统计数据，如在指定时间段内的健康数量样本的平均值、最小值、最大值和总和。
tag: PRO
---

`Health.queryStatisticsCollection()` 方法用于按时间区间查询指定 `HealthQuantityType` 类型的**聚合统计数据**，例如每天、每周或每月的步数、心率等。它返回一个 `HealthStatisticsCollection` 实例，其中包含多个按时间间隔对齐的 `HealthStatistics` 对象。

此方法非常适合：

* 分析健康趋势
* 构建图表
* 生成历史报告

---

## 方法签名

```ts
function queryStatisticsCollection(
  quantityType: HealthQuantityType,
  options: {
    startDate?: Date
    endDate?: Date
    strictStartDate?: boolean
    strictEndDate?: boolean
    statisticsOptions?: HealthStatisticsOptions | Array<HealthStatisticsOptions>
    anchorDate: Date
    intervalComponents: DateComponents
  }
): Promise<HealthStatisticsCollection>
```

---

## 参数说明

| 参数名称                         | 类型                                | 必填  | 说明                                                                                                                                                                        |
| ---------------------------- | --------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quantityType`               | `HealthQuantityType`              | Yes | 要查询的健康数据类型，如 `"stepCount"`、`"heartRate"` 等                                                                                                                                |
| `options.startDate`          | `Date`                            | No  | 查询范围的起始日期，查询结果不包含此日期之前的数据                                                                                                                                                 |
| `options.endDate`            | `Date`                            | No  | 查询范围的结束日期，查询结果不包含此日期之后的数据                                                                                                                                                 |
| `options.strictStartDate`    | `boolean`                         | No  | 若为 `true`，仅包含精确从 `startDate` 开始的区间                                                                                                                                        |
| `options.strictEndDate`      | `boolean`                         | No  | 若为 `true`，仅包含精确在 `endDate` 结束的区间                                                                                                                                          |
| `options.statisticsOptions`  | `HealthStatisticsOptions[]` 或单个选项 | No  | 指定要计算的统计类型，可包含： `"cumulativeSum"`, `"discreteAverage"`, `"discreteMin"`, `"discreteMax"`, `"mostRecent"`, `"duration"`, `"separateBySource"` |
| `options.anchorDate`         | `Date`                            | Yes | 用于对齐时间间隔的锚点日期，通常设为当天零点                                                                                                                                                    |
| `options.intervalComponents` | `DateComponents`                  | Yes | 定义时间间隔，例如每日、每周等。通过 `new DateComponents({ day: 1 })`、`new DateComponents({ weekOfYear: 1 })` 等方式创建                                                                         |

---

## 返回值

返回一个 `Promise`，解析为 `HealthStatisticsCollection` 对象。该集合按时间间隔组织，每个区间包含一个 `HealthStatistics` 实例。

---

## 示例：获取过去 7 天每日步数统计

```ts
const now = new Date()
const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

const collection = await Health.queryStatisticsCollection("stepCount", {
  startDate: sevenDaysAgo,
  endDate: now,
  anchorDate: new Date(), // 通常为当天零点
  intervalComponents: new DateComponents({ day: 1 }),
  statisticsOptions: ["cumulativeSum"]
})

const stats = collection.statistics()
for (const stat of stats) {
  const steps = stat.sumQuantity(HealthUnit.count())
  console.log(`从 ${stat.startDate.toDateString()} 开始：${steps} 步`)
}
```

---

## 注意事项

* 如果某个时间区间没有任何样本数据，该区间对应的 `HealthStatistics` 对象可能会返回 `null`。
* 所有统计数据基于 `anchorDate` 对齐，区间由 `intervalComponents` 定义。
* 如果只需查询整个时间范围的汇总统计（不按时间拆分），可使用 `Health.queryStatistics()` 方法代替。
