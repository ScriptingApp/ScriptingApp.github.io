---
title: 读取分类数据（HealthCategorySample）
description: 该接口允许您从 HealthKit 存储中读取健康分类样本。
tag: PRO
---

Scripting 应用支持通过全局函数 `Health.queryCategorySamples()` 访问 HealthKit 中的**分类健康数据**。分类样本表示某一健康事件或状态的记录，通常包括起止时间和一个离散的状态值，例如：睡眠分析、冥想记录、经期流量、排卵测试结果等。

本文将介绍如何查询、解析并使用这些分类数据。

---

## 什么是 Category Sample？

**Category Sample（分类样本）** 包含以下信息：

* `type`：样本的分类类型（如 `"sleepAnalysis"`、`"mindfulSession"`）
* `startDate` / `endDate`：事件发生的起止时间
* `value`：表示事件状态的整数值，需使用对应的枚举进行解释
* `metadata`：可选的附加信息

常见示例：

* `"sleepAnalysis"` 对应的值可以是 `asleepCore`、`awake`、`inBed`
* `"menstrualFlow"` 对应的值可以是 `mild`、`moderate`、`severe`

---

## API 用法

```ts
Health.queryCategorySamples(
  categoryType: HealthCategoryType,
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
    strictStartDate?: boolean
    strictEndDate?: boolean
    sortDescriptors?: Array<{
      key: "startDate" | "endDate" | "value"
      order?: "forward" | "reverse"
    }>
  }
): Promise<HealthCategorySample[]>
```

---

## 参数说明

| 参数名                                 | 描述                                            |
| ----------------------------------- | --------------------------------------------- |
| `categoryType`                      | 要查询的分类数据类型（如 `"sleepAnalysis"`）               |
| `startDate` / `endDate`             | 筛选结果的时间范围                                     |
| `limit`                             | 返回的最大样本数量                                     |
| `strictStartDate` / `strictEndDate` | 是否严格匹配起止时间                                    |
| `sortDescriptors`                   | 可选排序规则，例如按 `startDate`、`endDate` 或 `value` 排序 |

---

## 示例：读取睡眠分析数据

```ts
const results = await Health.queryCategorySamples("sleepAnalysis", {
  startDate: new Date("2025-07-01T00:00:00"),
  endDate: new Date("2025-07-05T00:00:00"),
  sortDescriptors: [{ key: "startDate", order: "forward" }]
})

for (const sample of results) {
  console.log("开始时间：", sample.startDate)
  console.log("结束时间：", sample.endDate)
  console.log("睡眠状态值：", sample.value) // 需要使用枚举解释该值
}
```

你可以使用对应的枚举来解释 `value` 值：

```ts
switch (sample.value) {
  case HealthCategoryValueSleepAnalysis.awake:
    console.log("清醒")
    break
  case HealthCategoryValueSleepAnalysis.asleepCore:
    console.log("核心睡眠")
    break
  case HealthCategoryValueSleepAnalysis.asleepDeep:
    console.log("深度睡眠")
    break
  case HealthCategoryValueSleepAnalysis.inBed:
    console.log("在床上")
    break
  // 可根据需要继续扩展其他状态
}
```

---

## 示例：读取冥想记录

```ts
const sessions = await Health.queryCategorySamples("mindfulSession", {
  startDate: new Date(Date.now() - 7 * 86400 * 1000) // 最近 7 天
})

console.log(`共找到 ${sessions.length} 条冥想记录`)
```

---

## 注意事项

* 所有返回结果都是 `HealthCategorySample` 实例
* `.value` 是一个整数，需要使用对应类型的枚举进行解释
* `.metadata` 字段为可选，可提供附加信息（如来源、标签等）
* 分类数据适用于建模事件型健康记录，例如睡眠、冥想、生理周期、症状等

---

## 小结

要读取分类样本数据：

1. 调用 `Health.queryCategorySamples(categoryType, options)`
2. 设置时间范围、数量限制、排序方式等参数
3. 使用 `.value` 配合相应枚举来解释数据含义

该 API 提供了对基于事件的健康数据的结构化访问方式，适用于日志展示、趋势分析等场景。
