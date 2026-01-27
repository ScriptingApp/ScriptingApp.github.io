---
title: 健康活动摘要（HealthActivitySummary）
tag: PRO
---

`HealthActivitySummary` 类用于访问用户每日健康活动的汇总数据，包括活跃能量消耗、锻炼时间、站立小时数等。该类支持不同的移动模式（如消耗能量或移动时间），可用于显示活动圆环的进度或生成自定义的健康日报表。

---

## 使用场景

* 展示每日 Apple 活动圆环（移动、锻炼、站立）进度
* 比较用户每日活动与其设定的目标
* 构建自定义健康看板或健身追踪 UI
* 提供趋势分析或活动达成提醒功能

---

## 类：`HealthActivitySummary`

### 属性

| 属性名                | 类型                       | 描述                                                                  |
| ------------------ | ------------------------ | ------------------------------------------------------------------- |
| `dateComponents`   | `DateComponents`         | 当前活动摘要所对应的日期信息。                                                     |
| `activityMoveMode` | `HealthActivityMoveMode` | 表示该摘要使用的移动模式，可能为 `activeEnergy`（活跃能量）或 `appleMoveTime`（Apple 移动时间）。 |

---

### 方法

以下方法都返回指定单位下的数值（`HealthUnit`），表示当前日期的实际数据或目标值：

#### `activeEnergyBurned(unit: HealthUnit): number`

返回当天的活跃能量消耗（例如千卡），适用于 `activeEnergy` 移动模式。

#### `activeEnergyBurnedGoal(unit: HealthUnit): number`

返回当天的活跃能量目标值（例如千卡），仅在 `activityMoveMode` 为 `activeEnergy` 时有效。

---

#### `appleMoveTime(unit: HealthUnit): number`

返回 Apple Watch 记录的当天移动时间（单位通常为分钟），适用于 `appleMoveTime` 移动模式。

#### `appleMoveTimeGoal(unit: HealthUnit): number`

返回当天的移动时间目标，仅在 `activityMoveMode` 为 `appleMoveTime` 时有效。

---

#### `appleExerciseTime(unit: HealthUnit): number`

返回当天的锻炼时间总长，通常以分钟为单位。

#### `appleExerciseTimeGoal(unit: HealthUnit): number`

返回当天的锻炼时间目标。

---

#### `appleStandHours(unit: HealthUnit): number`

返回当天站立小时数（即每小时至少活动1分钟的小时数）。

#### `appleStandHoursGoal(unit: HealthUnit): number`

返回当天的站立目标小时数（通常为12小时）。

---

## 示例用法

```ts
async function showTodaySummary() {
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)

  const start = DateComponents.fromDate(startDate)
  const end = DateComponents.fromDate(startDate)
  end.date += 1

  const summaries = await Health.queryActivitySummaries({
    start, // today
    end,
  })

  if (summaries.length === 0) {
    console.log('今天暂无活动摘要')
    return
  }

  const summary = summaries[0]

  console.log('日期:', summary.dateComponents)
  console.log('移动模式:', summary.activityMoveMode)

  const kcal = summary.activeEnergyBurned(HealthUnit.kilocalorie())
  const kcalGoal = summary.activeEnergyBurnedGoal(HealthUnit.kilocalorie())

  console.log(`活跃能量消耗: ${kcal} / ${kcalGoal} 千卡`)
  console.log(`锻炼时间: ${summary.appleExerciseTime(HealthUnit.minute())} 分钟`)
  console.log(`站立小时数: ${summary.appleStandHours(HealthUnit.count())} 小时`)
}
```

---

## 注意事项

* `HealthActivitySummary` 表示单日的活动摘要，若需趋势分析需查询多个摘要。
* 不同用户可能启用了不同的移动目标模式：基于能量或移动时间。
* `HealthUnit` 必须匹配目标字段类型。例如时间应使用 `minute()` 或 `second()`，计数使用 `count()`。
* 可搭配 `Health.queryActivitySummaries()` 方法查询指定日期范围内的摘要数组。
