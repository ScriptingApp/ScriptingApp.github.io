---
title: 读取锻炼数据（HealthWorkout）
description: 该接口允许您从 HealthKit 存储中读取健康锻炼样本。
tag: PRO
---

Scripting 应用支持通过全局函数 `Health.queryWorkouts()` 从 HealthKit 查询**锻炼记录**。Workout 表示一次完整的身体活动，如跑步、步行、游泳、骑行、力量训练等。

每条锻炼记录包含活动类型、起止时间、持续时间、相关事件以及详细的统计信息（如心率、步数、距离、能量消耗等）。

---

## 什么是 Workout？

每条 `HealthWorkout` 锻炼记录包含以下内容：

* `startDate` / `endDate`：锻炼的起止时间
* `duration`：持续时间（单位：秒）
* `workoutActivityType`：锻炼类型（枚举值，如跑步、步行、瑜伽等）
* `metadata`：可选的附加信息
* `workoutEvents`：可选的事件数组（如暂停、继续、圈数等）
* `allStatistics`：一个包含所有健康指标统计的字典，例如心率、距离、卡路里等

---

## API 用法

```ts
Health.queryWorkouts(
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
    strictStartDate?: boolean
    strictEndDate?: boolean
    sortDescriptors?: Array<{
      key: "startDate" | "endDate" | "duration"
      order?: "forward" | "reverse"
    }>
    requestPermissions?: HealthQuantityType[]
  }
): Promise<HealthWorkout[]>
```

---

## 参数说明

| 参数名                                 | 描述                                          |
| ----------------------------------- | ------------------------------------------- |
| `startDate` / `endDate`             | 用于筛选锻炼记录的时间范围（可选）                           |
| `limit`                             | 最大返回条数（可选）                                  |
| `strictStartDate` / `strictEndDate` | 是否严格匹配起止时间                                  |
| `sortDescriptors`                   | 按 `startDate`、`endDate` 或 `duration` 排序（可选） |
| `requestPermissions`                | 申请更多数据类型的权限（可选） |

---

## 示例：读取最近的锻炼记录

```ts
const workouts = await Health.queryWorkouts({
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-05"),
  sortDescriptors: [{ key: "startDate", order: "reverse" }]
})

for (const workout of workouts) {
  console.log("锻炼类型：", workout.workoutActivityType)
  console.log("开始时间：", workout.startDate)
  console.log("结束时间：", workout.endDate)
  console.log("持续时间（分钟）：", workout.duration / 60)

  const heartRate = workout.allStatistics["heartRate"]
  const energy = workout.allStatistics["activeEnergyBurned"]

  if (heartRate) {
    const avgHR = heartRate.averageQuantity(HealthUnit.count().divided(HealthUnit.minute()))
    console.log("平均心率：", avgHR)
  }

  if (energy) {
    const kcal = energy.sumQuantity(HealthUnit.kilocalorie())
    console.log("消耗能量（千卡）：", kcal)
  }

  console.log("---")
}
```

---

## 如何读取统计指标

每条锻炼记录的 `allStatistics` 字典包含该锻炼过程中的各种指标统计，例如：

```ts
const stat = workout.allStatistics["heartRate"]
const avg = stat?.averageQuantity(HealthUnit.count().divided(HealthUnit.minute()))
const max = stat?.maximumQuantity(HealthUnit.count().divided(HealthUnit.minute()))
```

常见可用指标包括：

* `"heartRate"`：心率
* `"activeEnergyBurned"`：活跃能量消耗
* `"distanceWalkingRunning"`：步行/跑步距离
* `"stepCount"`：步数

---

## Workout Events（可选事件）

如果记录了事件（如暂停、继续、圈数等），可通过 `workout.workoutEvents` 获取：

```ts
for (const event of workout.workoutEvents || []) {
  console.log("事件类型：", event.type)
  console.log("从：", event.dateInterval.start)
  console.log("到：", event.dateInterval.end)
}
```

事件类型包括：暂停（pause）、继续（resume）、圈数（lap）、分段（segment）等。

---

## 注意事项

* 每条记录都是 `HealthWorkout` 实例
* `workoutActivityType` 是一个枚举，可转换为文本或图标
* 如果 `allStatistics` 中缺少某些指标，说明设备或应用在当时未记录该数据
* 可结合分类数据（如睡眠）或数量数据（如心率）进行完整的活动分析

---

## 小结

读取 Workout 数据的步骤如下：

1. 调用 `Health.queryWorkouts(options)` 获取锻炼记录数组；
2. 可通过时间范围、数量限制、排序方式进行筛选；
3. 通过属性获取锻炼类型、时长等基本信息；
4. 使用 `allStatistics` 获取详细的健康指标；
5. 可选读取 `workoutEvents` 获取锻炼过程中的事件记录。

该 API 非常适用于展示锻炼历史、生成健身日报或绘制活动趋势图等场景。
