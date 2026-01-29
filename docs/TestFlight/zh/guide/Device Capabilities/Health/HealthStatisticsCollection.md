---
title: 健康统计集合（HealthStatisticsCollection）
description: 该接口提供了一种在指定时间段内收集和管理健康数据统计信息的方法，如健康数量样本的平均值、最小值、最大值和总和。
tag: PRO
---

`HealthStatisticsCollection` 类用于表示按时间分组的健康统计数据集合，如每日、每周或每月的汇总统计。集合中的每一项代表一个时间区间，并对应一个 `HealthStatistics` 实例，包含该时间段内的统计信息。

该类特别适用于：

* 绘制健康数据的**时间趋势图**
* 生成**按日/周/月分组的报告**
* 按日期区间访问统计数据

---

## 总览

每一个 `HealthStatisticsCollection`：

* 是通过按时间查询健康数据获得的
* 基于 anchorDate 和 intervalComponents（如每日、每周）进行时间对齐
* 可选支持按来源（如设备、App）聚合

---

## 方法说明

### `sources(): HealthSource[]`

返回一个数组，包含所有为此集合提供数据的 `HealthSource`（数据来源）。

每个 `HealthSource` 表示一个设备或 App（如 Apple Watch、iPhone、第三方健康应用等）。

#### 示例：

```ts
const sources = collection.sources()
sources.forEach(source => {
  console.log("来源：", source.name, source.bundleIdentifier)
})
```

---

### `statistics(): HealthStatistics[]`

返回此集合中所有时间区间的统计数据，每一项为一个 `HealthStatistics` 实例。

这些统计数据是根据查询时提供的 anchorDate 和 intervalComponents 进行时间对齐的。

#### 示例：

```ts
const allStats = collection.statistics()
allStats.forEach(stat => {
  const value = stat.sumQuantity(HealthUnit.count())
  console.log(`从 ${stat.startDate} 到 ${stat.endDate}：共计 ${value} 步`)
})
```

---

### `statisticsFor(date: Date): HealthStatistics | null`

根据指定的日期查找该日期所在的时间区间对应的 `HealthStatistics` 实例。

如果该日期不属于任何时间区间，将返回 `null`。

#### 示例：

```ts
const stat = collection.statisticsFor(new Date("2025-07-01"))
if (stat) {
  const value = stat.averageQuantity(HealthUnit.count())
  console.log("7月1日的平均值：", value)
} else {
  console.log("7月1日无数据")
}
```

---

## 使用场景

当你需要：

* 将健康数据**按日/周/月分组展示**
* **分析健康趋势**
* 为用户生成**历史数据图表或报告**

时，推荐使用 `HealthStatisticsCollection`。
