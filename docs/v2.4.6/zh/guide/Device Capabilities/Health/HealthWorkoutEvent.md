---
title: 健康锻炼事件（HealthWorkoutEvent）
description: 表示一条健康锻炼事件记录，例如锻炼会话的开始或结束，或锻炼中的暂停。
tag: PRO
---

`HealthWorkoutEvent` 类用于访问 Apple 健康中记录的锻炼事件。每个事件表示一次锻炼过程中的特定动作或时刻，例如暂停、继续、圈数记录、标记、或自动运动检测。

---

## 使用场景

* 分析锻炼流程：判断用户何时暂停或恢复锻炼。
* 统计锻炼中活跃与静止的时间段。
* 记录跑步、游泳等项目中的圈数。
* 用于可视化锻炼记录和事件时间轴。

---

## 枚举：`HealthWorkoutEventType`

定义了各种类型的锻炼事件。

| 值   | 名称                     | 描述                       |
| --- | ---------------------- | ------------------------ |
| `1` | `pause`                | 用户手动暂停了锻炼。               |
| `2` | `resume`               | 用户在暂停后恢复了锻炼。             |
| `3` | `lap`                  | 表示一圈锻炼结束，常用于跑步、游泳等。      |
| `4` | `marker`               | 一个用户或系统添加的标记点。           |
| `5` | `motionPaused`         | 因无动作被系统自动暂停。             |
| `6` | `motionResumed`        | 系统因检测到动作自动恢复锻炼。          |
| `7` | `segment`              | 表示一个新的锻炼分段开始，常用于间歇训练等场景。 |
| `8` | `pauseOrResumeRequest` | 系统提出的暂停或继续请求，但不一定实际执行。   |

---

## 类：`HealthWorkoutEvent`

### 属性说明

| 属性名            | 类型                            | 描述                                            |
| -------------- | ----------------------------- | --------------------------------------------- |
| `type`         | `HealthWorkoutEventType`      | 当前事件的类型，例如暂停、圈数、自动恢复等。                        |
| `dateInterval` | `HealthDateInterval`          | 该事件发生的时间区间，包含 `start`、`end` 和 `duration`（秒数）。 |
| `metadata`     | `Record<string, any> \| null` | 可选的附加信息，例如记录来源、设备等。                           |

> 说明：`HealthDateInterval` 是一个对象，包含：
>
> * `start: Date`：事件开始时间
> * `end: Date`：事件结束时间
> * `duration: number`：事件持续时间（单位为秒）

---

## 示例代码

### 记录锻炼事件日志

```ts
function logWorkoutEvent(event: HealthWorkoutEvent) {
  const { type, dateInterval, metadata } = event
  const start = dateInterval.start.toISOString()
  const end = dateInterval.end.toISOString()
  const duration = dateInterval.duration

  console.log(`事件类型：${HealthWorkoutEventType[type]}`)
  console.log(`开始时间：${start}`)
  console.log(`结束时间：${end}`)
  console.log(`持续时长（秒）：${duration}`)

  if (metadata) {
    console.log(`元数据：${JSON.stringify(metadata)}`)
  }
}
```

---

## 说明与提示

* `HealthWorkoutEvent` 实例通常包含在 `HealthWorkout` 中的 `events` 数组内。
* 可结合多个事件分析锻炼的完整时序、自动暂停/恢复、间歇训练分段等信息。
* 在无操作或锻炼设备脱离身体时，系统会自动生成 motionPaused / motionResumed 事件。
