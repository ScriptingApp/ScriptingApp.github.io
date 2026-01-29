---
title: 读取数量型数据（HealthQuantitySample）
description: 该接口允许您从 HealthKit 存储中读取健康数量样本。
tag: PRO
---

Scripting 应用支持通过全局 API `Health.queryQuantitySamples()` 查询 HealthKit 中的**数量型健康数据**，例如步数、心率、体重、卡路里、距离等。

本文将介绍如何使用该 API 查询数据样本并解析结果。

---

## 什么是 Quantity Sample？

**Quantity Sample（数量型样本）** 表示某一时间点或时间段内的数值型健康数据。常见类型包括：

* `stepCount`（步数）
* `heartRate`（心率）
* `bodyMass`（体重）
* `activeEnergyBurned`（活动能量消耗）
* `distanceWalkingRunning`（步行/跑步距离）

数据样本可能是：

* **离散数据**（单次测量）
* **累积数据**（时间段内累加值）

---

## API 简介

```ts
Health.queryQuantitySamples(
  quantityType: HealthQuantityType,
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
    strictStartDate?: boolean
    strictEndDate?: boolean
    sortDescriptors?: Array<{
      key: "startDate" | "endDate" | "count"
      order?: "forward" | "reverse"
    }>
  }
): Promise<Array<HealthQuantitySample | HealthCumulativeQuantitySample | HealthDiscreteQuantitySample>>
```

---

## 参数说明

| 参数名                                 | 类型        | 描述                                            |
| ----------------------------------- | --------- | --------------------------------------------- |
| `quantityType`                      | `string`  | 要查询的数据类型，如 `"stepCount"`、`"heartRate"`        |
| `startDate` / `endDate`             | `Date`    | 查询的时间范围                                       |
| `limit`                             | `number`  | 限制返回的最大样本数量                                   |
| `strictStartDate` / `strictEndDate` | `boolean` | 是否严格匹配开始/结束时间                                 |
| `sortDescriptors`                   | `Array`   | 对结果进行排序，可按 `startDate`、`endDate` 或 `count` 排序 |

---

## 示例：读取步数数据

```ts
const results = await Health.queryQuantitySamples("stepCount", {
  startDate: new Date("2025-07-01T00:00:00"),
  endDate: new Date("2025-07-02T00:00:00"),
  limit: 10,
  sortDescriptors: [{ key: "startDate", order: "reverse" }]
})

for (const sample of results) {
  const value = sample.quantityValue(HealthUnit.count())
  console.log(`步数：${value} 时间：${sample.startDate} ~ ${sample.endDate}`)
}
```

---

## 示例：读取心率数据（单位为 bpm）

```ts
const results = await Health.queryQuantitySamples("heartRate", {
  startDate: new Date(Date.now() - 3600 * 1000) // 最近一小时
})

for (const sample of results) {
  const bpm = sample.quantityValue(
    HealthUnit.count().divided(HealthUnit.minute())
  )
  console.log(`心率：${bpm} bpm 时间：${sample.startDate}`)
}
```

---

## 判断样本类型

返回的样本可能属于以下三种之一：

* `HealthQuantitySample`（基础类）
* `HealthCumulativeQuantitySample`：可调用 `.sumQuantity(unit)`
* `HealthDiscreteQuantitySample`：可调用 `.averageQuantity(unit)`、`.maximumQuantity(unit)` 等

你可以使用 `in` 操作符判断：

```ts
if ("averageQuantity" in sample) {
  const avg = sample.averageQuantity(HealthUnit.count())
  console.log("平均值：", avg)
}
```

---

## 常见类型与推荐单位

| 数据类型                       | 推荐单位                                              |
| -------------------------- | ------------------------------------------------- |
| `"stepCount"`              | `HealthUnit.count()`                              |
| `"heartRate"`              | `HealthUnit.count().divided(HealthUnit.minute())` |
| `"bodyMass"`               | `HealthUnit.gram(HealthMetricPrefix.kilo)`                           |
| `"activeEnergyBurned"`     | `HealthUnit.kilocalorie()`                        |
| `"distanceWalkingRunning"` | `HealthUnit.meter()`                              |

---

## 错误处理示例

```ts
try {
  const results = await Health.queryQuantitySamples("stepCount")
  console.log("共返回样本数量：", results.length)
} catch (err) {
  console.error("查询失败：", err)
}
```

---

## 小结

读取数量型样本的流程如下：

1. 调用 `Health.queryQuantitySamples(类型, 查询参数)`
2. 遍历返回结果
3. 使用 `.quantityValue(unit)` 或 `.sumQuantity(unit)` 等方法获取数值

该 API 提供了对时间序列健康数据的强大访问能力，适用于统计、图表和趋势分析等应用场景。
