---
title: 读取活动摘要（HealthActivitySummary）
description: 该接口允许您从 HealthKit 存储中读取健康活动摘要。
tag: PRO
---

Scripting 应用通过全局函数 `Health.queryActivitySummaries()` 提供对 Apple Health 每日活动摘要数据的访问。这些摘要包含 Apple Watch 追踪的 **移动（Move）**、**锻炼（Exercise）** 和 **站立（Stand）** 目标，以及完成情况和历史趋势。

此 API 非常适合在应用中展示每日活动环或分析长期健身趋势。

---

## 什么是活动摘要？

`HealthActivitySummary` 提供一天 Apple Watch 活动的概览：

* **移动（活跃能量消耗）**

  * `activeEnergyBurned(unit: HealthUnit): number`
  * `activeEnergyBurnedGoal(unit: HealthUnit): number`

* **锻炼（分钟）**

  * `appleExerciseTime(unit: HealthUnit): number`
  * `appleExerciseTimeGoal(unit: HealthUnit): number`

* **站立（小时）**

  * `appleStandHours(unit: HealthUnit): number`
  * `appleStandHoursGoal(unit: HealthUnit): number`

* **日期信息**

  * `dateComponents: DateComponents` —— 包含 `year`、`month`、`day` 的 `DateComponents` 对象

---

## API 概览

```ts
Health.queryActivitySummaries(
  options?: {
    start: DateComponents
    end: DateComponents
  }
): Promise<HealthActivitySummary[]>
```

---

## 参数

| 参数      | 类型               | 说明                               |
| ------- | ---------------- | -------------------------------- |
| `start` | `DateComponents` | 查询范围的起始日期，仅返回在该日期或之后的摘要。 |
| `end`   | `DateComponents` | 查询范围的结束日期，仅返回在该日期或之前的摘要。 |

> 如果同时省略 `options`，则返回所有可用摘要（受系统限制）。
> 返回的摘要按日期升序排序。

---

## 示例：读取最近 7 天的活动摘要

```ts
async function fetchLastWeek() {
  // 构建日期范围
  const today = new Date()
  const sevenDaysAgo = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  )

  const startComponents = DateComponents.fromDate(sevenDaysAgo)
  const endComponents = DateComponents.fromDate(today)

  // 查询活动摘要
  const summaries = await Health.queryActivitySummaries({
    start: startComponents,
    end: endComponents,
  })

  // 遍历并打印每天数据
  for (const summary of summaries) {
    const date = summary.dateComponents.date
    console.log(`日期: ${date?.toDateString()}`)

    const kcal = summary.activeEnergyBurned(HealthUnit.kilocalorie())
    const kcalGoal = summary.activeEnergyBurnedGoal(HealthUnit.kilocalorie())
    const exerciseMin = summary.appleExerciseTime(HealthUnit.minute())
    const standHrs = summary.appleStandHours(HealthUnit.count())

    console.log(` 移动:    ${kcal} / ${kcalGoal} kcal`)
    console.log(` 锻炼:    ${exerciseMin} 分钟`)
    console.log(` 站立:    ${standHrs} 小时`)
    console.log('---')
  }
}

fetchLastWeek()
```

---

## 注意事项

* `DateComponents` 至少需包含 `year`、`month`、`day`，其他字段（如小时、分钟）在日摘要中会被忽略。
* 各项指标方法均返回所指定单位下的原始 `number` 值。
* 使用 `HealthUnit` 工厂方法（如 `kilocalorie()`、`minute()`、`count()`）来指定单位。
* 如果某些日期没有数据（例如 Apple Watch 未佩戴或未同步），则该日期的摘要可能会被省略。

---

## 总结

1. 调用 `Health.queryActivitySummaries({ start, end })` 并传入 `DateComponents` 指定查询范围。
2. 获取按日期升序排列的 `HealthActivitySummary[]`。
3. 调用摘要实例的方法读取移动、锻炼和站立的实际值及目标值。
4. 在 UI 或分析中展示或统计这些数字。
