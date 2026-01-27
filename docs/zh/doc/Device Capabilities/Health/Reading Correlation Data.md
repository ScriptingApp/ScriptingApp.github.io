---
title: 读取关联数据（HealthCorrelation）
tag: PRO
---

Scripting 应用支持通过全局 API `Health.queryCorrelations()` 查询 HealthKit 中的**相关健康数据**。相关数据用于表示一组相互关联的健康样本，例如：

* 一次血压测量（包含收缩压和舒张压）
* 一次食物摄入记录（包含热量、蛋白质、碳水等）

本文将介绍如何读取相关数据并提取其中的样本信息。

---

## 什么是 Correlation（相关数据）？

Correlation 是将多个健康样本组合成单个事件的数据结构。支持的类型包括：

* `"bloodPressure"`：包含两个数量样本：`bloodPressureSystolic`（收缩压）和 `bloodPressureDiastolic`（舒张压）
* `"food"`：可包含多个营养类样本，如 `dietaryEnergyConsumed`（摄入热量）、`dietaryProtein`（蛋白质）、`dietaryCarbohydrates`（碳水化合物）等

每个 Correlation 包含以下信息：

* 类型（如 `"bloodPressure"`、`"food"`）
* 开始/结束时间
* 元数据（可选）
* 相关的多个样本（QuantitySample 或 CategorySample）

---

## API 用法

```ts
Health.queryCorrelations(
  correlationType: HealthCorrelationType,
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
    strictStartDate?: boolean
    strictEndDate?: boolean
    sortDescriptors?: Array<{
      key: "startDate" | "endDate"
      order?: "forward" | "reverse"
    }>
  }
): Promise<HealthCorrelation[]>
```

---

## 参数说明

| 参数名                                 | 描述                                     |
| ----------------------------------- | -------------------------------------- |
| `correlationType`                   | `"bloodPressure"` 或 `"food"`           |
| `startDate` / `endDate`             | 查询的时间范围                                |
| `limit`                             | 返回的最大条数                                |
| `strictStartDate` / `strictEndDate` | 是否严格匹配起止时间                             |
| `sortDescriptors`                   | 可选的排序规则，支持按 `startDate` 或 `endDate` 排序 |

---

## 示例：读取血压记录

```ts
const correlations = await Health.queryCorrelations("bloodPressure", {
  startDate: new Date("2025-07-01T00:00:00"),
  endDate: new Date("2025-07-02T00:00:00"),
  limit: 5,
  sortDescriptors: [{ key: "startDate", order: "reverse" }]
})

for (const correlation of correlations) {
  console.log("开始时间：", correlation.startDate)
  console.log("结束时间：", correlation.endDate)

  const systolic = correlation.quantitySamples.find(
    s => s.quantityType === "bloodPressureSystolic"
  )

  const diastolic = correlation.quantitySamples.find(
    s => s.quantityType === "bloodPressureDiastolic"
  )

  if (systolic && diastolic) {
    const sys = systolic.quantityValue(HealthUnit.millimeterOfMercury())
    const dia = diastolic.quantityValue(HealthUnit.millimeterOfMercury())
    console.log(`血压：${sys}/${dia} mmHg`)
  }
}
```

---

## 示例：读取食物摄入记录

```ts
const correlations = await Health.queryCorrelations("food", {
  startDate: new Date(Date.now() - 86400 * 1000), // 最近 24 小时
  limit: 10
})

for (const correlation of correlations) {
  console.log("记录时间：", correlation.startDate)

  for (const sample of correlation.quantitySamples) {
    const unit = sample.quantityType.includes("Energy")
      ? HealthUnit.kilocalorie()
      : HealthUnit.gram()

    const value = sample.quantityValue(unit)
    console.log(`${sample.quantityType}：${value}`)
  }
}
```

---

## 如何访问样本

每个 `HealthCorrelation` 实例中包含以下数组：

* `quantitySamples`：所有数量样本（可含 cumulative / discrete 类型）
* `cumulativeQuantitySamples`：仅累积样本
* `discreteQuantitySamples`：仅离散样本
* `categorySamples`：分类样本（某些类型支持）

你可以通过 `.quantityType` 和 `.quantityValue(unit)` 读取每个样本的具体数值。

---

## 错误处理

```ts
try {
  const results = await Health.queryCorrelations("bloodPressure")
  console.log("共返回", results.length, "条记录")
} catch (err) {
  console.error("查询失败：", err)
}
```

---

## 小结

读取 HealthKit 中的 Correlation 数据的步骤如下：

1. 使用 `Health.queryCorrelations(type, options)` 进行查询；
2. 遍历返回的 `HealthCorrelation` 列表；
3. 使用 `.quantitySamples` 访问每个相关样本；
4. 使用 `.quantityValue(unit)` 获取数值。

该方法适用于读取复合型健康数据（如血压或饮食记录），适合用于统计分析或健康日志记录。
