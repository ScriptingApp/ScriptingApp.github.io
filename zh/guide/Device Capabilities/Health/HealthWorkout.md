# 健康锻炼数据（HealthWorkout）

`HealthWorkout` 类提供了访问和分析 Apple 健康应用中锻炼数据的接口。每个锻炼实例代表一次完整的锻炼会话，包括活动类型、开始与结束时间、持续时长，以及相关的事件与统计数据。

***

## 使用场景

- 获取用户的锻炼历史记录
- 分析锻炼类型与锻炼时间
- 结合锻炼期间采集的健康数据（如心率、卡路里、距离等）进行评估
- 可视化锻炼过程中的事件（如暂停、恢复、圈数、分段）
- 获取锻炼期间的统计指标，如平均心率或总能量消耗

***

## 属性说明

| 属性名                   | 类型                                                     | 描述                         |
| --------------------- | ------------------------------------------------------ | -------------------------- |
| `uuid`                | `string`                                               | 此锻炼实例的唯一标识符                |
| `workoutActivityType` | `HealthWorkoutActivityType`                            | 此次锻炼的活动类型，如跑步、骑行、游泳、瑜伽等    |
| `startDate`           | `Date`                                                 | 锻炼的开始时间                    |
| `endDate`             | `Date`                                                 | 锻炼的结束时间                    |
| `duration`            | `number`                                               | 锻炼的总时长，单位为秒                |
| `metadata`            | `Record<string, any> \| null`                          | 可选的元数据，如记录来源、设备信息或用户自定义标签等 |
| `workoutEvents`       | `HealthWorkoutEvent[] \| null`                         | 相关锻炼事件，如暂停、恢复、圈数等          |
| `allStatistics`       | `Record<HealthQuantityType, HealthStatistics \| null>` | 每种健康指标对应的统计数据，例如心率、步数、卡路里等 |

***

## 相关类型说明

### `HealthWorkoutActivityType`

表示此次锻炼的具体类型，例如：

- `running`（跑步）
- `walking`（步行）
- `cycling`（骑行）
- `swimming`（游泳）
- `yoga`（瑜伽）
- 等其他 Apple Health 支持的活动类型（参考 `HealthWorkoutActivityType` 文档）

### `HealthWorkoutEvent`

锻炼过程中记录的事件类型，例如：

- 暂停 (`pause`)
- 恢复 (`resume`)
- 运动暂停/恢复 (`motionPaused` / `motionResumed`)
- 圈数标记 (`lap`)
- 分段标记 (`segment`)

### `HealthStatistics`

统计锻炼期间采集到的健康数据，可用的方法包括：

- `averageQuantity()`：平均值
- `sumQuantity()`：总和
- `maximumQuantity()`：最大值
- `minimumQuantity()`：最小值
- `mostRecentQuantity()`：最近一次的值

***

## 示例代码

```ts
function showWorkout(workout: HealthWorkout) {
  console.log(`锻炼 ID: ${workout.uuid}`)
  console.log(`活动类型: ${workout.workoutActivityType}`)
  console.log(`开始时间: ${workout.startDate.toISOString()}`)
  console.log(`结束时间: ${workout.endDate.toISOString()}`)
  console.log(`持续时长: ${(workout.duration / 60).toFixed(1)} 分钟`)

  if (workout.metadata) {
    console.log(`元数据: ${JSON.stringify(workout.metadata)}`)
  }

  if (workout.workoutEvents) {
    for (const event of workout.workoutEvents) {
      console.log(`事件: ${HealthWorkoutEventType[event.type]} 时间: ${event.dateInterval.start.toISOString()}`)
    }
  }

  const stats = workout.allStatistics["heartRate"]
  if (stats) {
    console.log(`平均心率: ${stats.averageQuantity("count/min")} bpm`)
  }
}
```

***

## 补充说明

- `HealthWorkout` 实例通常由类似 `Health.queryWorkouts()` 的方法获取（取决于框架支持的 API）。
- `allStatistics` 属性可快速访问锻炼期间的聚合数据，避免手动查询每个样本。
- `workoutEvents` 可用于还原锻炼过程中的行为轨迹，例如暂停与恢复的时间点。
