---
title: 写入关联数据（HealthCorrelation）
tag: PRO
---

Scripting 应用允许你使用全局 API `HealthCorrelation.create()` 和 `Health.saveCorrelation()` 向 Apple HealthKit 写入**相关健康数据**。相关数据表示多个健康样本之间的逻辑关联，例如：

* 一次血压测量同时包含收缩压和舒张压；
* 一次进食记录同时包含卡路里、蛋白质、碳水等多种营养成分。

本文档将说明如何创建和保存相关样本。

---

## 什么是 Correlation（相关数据）？

Correlation 是一种将多个健康样本聚合为一个事件的机制，目前支持以下类型：

* `"bloodPressure"`：包含 `"bloodPressureSystolic"`（收缩压）和 `"bloodPressureDiastolic"`（舒张压）两个样本
* `"food"`：可以包含热量、蛋白质、脂肪、碳水化合物等营养成分的样本

---

## 一、创建关联的 QuantitySample

在创建相关数据前，需要先创建各个组成的 `HealthQuantitySample` 实例。

### 示例：血压测量数据

```ts
const systolic = HealthQuantitySample.create({
  type: "bloodPressureSystolic",
  startDate: new Date(),
  endDate: new Date(),
  value: 120,
  unit: HealthUnit.millimeterOfMercury()
})

const diastolic = HealthQuantitySample.create({
  type: "bloodPressureDiastolic",
  startDate: new Date(),
  endDate: new Date(),
  value: 80,
  unit: HealthUnit.millimeterOfMercury()
})
```

请确保创建成功（返回值不为 `null`）后再继续。

---

## 二、创建 Correlation 实例

使用 `HealthCorrelation.create()` 创建相关数据对象。

### 参数说明

| 参数          | 类型                           | 描述                         |           |
| ----------- | ---------------------------- | -------------------------- | --------- |
| `type`      | `"bloodPressure"` 或 `"food"` | 相关类型                       |           |
| `startDate` | `Date`                       | 事件开始时间                     |           |
| `endDate`   | `Date`                       | 事件结束时间                     |           |
| `objects`   | `(HealthQuantitySample      \| HealthCategorySample)[]` | 包含的健康样本数组 |
| `metadata`  | `Record<string, any>`（可选）    | 附加元数据（如来源说明）               |           |

### 示例

```ts
const correlation = HealthCorrelation.create({
  type: "bloodPressure",
  startDate: systolic.startDate,
  endDate: systolic.endDate,
  objects: [systolic, diastolic],
  metadata: {
    source: "ScriptingApp"
  }
})

if (!correlation) {
  throw new Error("创建 Correlation 失败")
}
```

---

## 三、保存到 HealthKit

使用 `Health.saveCorrelation()` 将创建的相关数据写入 HealthKit：

```ts
await Health.saveCorrelation(correlation)
```

---

## 完整示例：写入一次血压记录

```ts
async function writeBloodPressure() {
  const systolic = HealthQuantitySample.create({
    type: "bloodPressureSystolic",
    startDate: new Date(),
    endDate: new Date(),
    value: 120,
    unit: HealthUnit.millimeterOfMercury()
  })

  const diastolic = HealthQuantitySample.create({
    type: "bloodPressureDiastolic",
    startDate: new Date(),
    endDate: new Date(),
    value: 80,
    unit: HealthUnit.millimeterOfMercury()
  })

  if (!systolic || !diastolic) {
    console.error("样本创建失败")
    return
  }

  const correlation = HealthCorrelation.create({
    type: "bloodPressure",
    startDate: systolic.startDate,
    endDate: systolic.endDate,
    objects: [systolic, diastolic],
    metadata: {
      note: "手动记录"
    }
  })

  if (!correlation) {
    console.error("Correlation 创建失败")
    return
  }

  try {
    await Health.saveCorrelation(correlation)
    console.log("血压数据写入成功")
  } catch (err) {
    console.error("保存失败：", err)
  }
}

writeBloodPressure()
```

---

## 注意事项

* 所有样本的时间范围（startDate / endDate）应一致或合理重叠；
* `"bloodPressure"` 类型必须包含 **收缩压** 和 **舒张压** 两个样本；
* `"food"` 类型可包含多个营养成分样本，如：

  * `"dietaryEnergyConsumed"` → `HealthUnit.kilocalorie()`
  * `"dietaryProtein"` → `HealthUnit.gram()`
  * `"dietaryCarbohydrates"` → `HealthUnit.gram()`
* 如果传入的参数不合法或缺少必要样本，`HealthCorrelation.create()` 将返回 `null`。
