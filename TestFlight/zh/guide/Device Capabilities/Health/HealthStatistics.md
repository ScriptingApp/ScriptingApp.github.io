`HealthStatistics` 类提供了对特定健康数量类型在指定时间范围内的**统计数据访问**。通过此类，你可以获取以下汇总信息：

- 总持续时间（duration）
- 平均值（average）
- 总和（sum）
- 最小值和最大值（min/max）
- 最近一次的值及其时间范围

该类适用于生成每日、每周或任意自定义区间的健康数据统计信息。

***

## 概览

- 每个 `HealthStatistics` 实例表示一个 `HealthQuantityType` 的统计数据。
- 所有统计信息都基于一个时间段内的样本数据。
- 可选地，你可以通过 `HealthSource` 过滤样本来源，只计算特定来源的统计结果。

***

## 属性说明

| 属性名            | 类型                       | 描述                              |
| -------------- | ------------------------ | ------------------------------- |
| `quantityType` | `HealthQuantityType`     | 当前统计数据所针对的健康数量类型（如 `stepCount`） |
| `startDate`    | `Date`                   | 当前统计数据所涵盖时间范围的开始时间              |
| `endDate`      | `Date`                   | 当前统计数据所涵盖时间范围的结束时间              |
| `sources`      | `HealthSource[] \| null` | 提供当前统计数据的所有健康数据来源（如设备、应用等）      |

***

## 方法说明

### `duration(unit: HealthUnit, source?: HealthSource): number | null`

返回符合条件的所有样本的总持续时间。

- `unit`: 使用的时间单位（如秒、分钟）
- `source`: （可选）只统计指定来源的样本

无匹配样本时返回 `null`。

***

### `averageQuantity(unit: HealthUnit, source?: HealthSource): number | null`

返回所有样本的**平均值**。

***

### `sumQuantity(unit: HealthUnit, source?: HealthSource): number | null`

返回所有样本的数值总和。

***

### `minimumQuantity(unit: HealthUnit, source?: HealthSource): number | null`

返回样本中的最小数值。

***

### `maximumQuantity(unit: HealthUnit, source?: HealthSource): number | null`

返回样本中的最大数值。

***

### `mostRecentQuantity(unit: HealthUnit, source?: HealthSource): number | null`

返回指定范围内最近记录的一条样本的值。

***

### `mostRecentQuantityDateInterval(source?: HealthSource): HealthDateInterval | null`

返回最近一条样本的时间区间（开始和结束时间）。

***

## 示例代码

```ts
const stats = await Health.queryStatistics({
  type: "stepCount",
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02")
})

const totalSteps = stats.sumQuantity(HealthUnit.count())
const average = stats.averageQuantity(HealthUnit.count())
const mostRecent = stats.mostRecentQuantity(HealthUnit.count())
const recentInterval = stats.mostRecentQuantityDateInterval()

console.log("步数统计：")
console.log("总步数：", totalSteps)
console.log("平均步数：", average)
console.log("最近记录：", mostRecent)
console.log("记录时间区间：", recentInterval)
```

***

# `HealthSource` 类

`HealthSource` 表示一个健康数据的来源，如某个 app 或设备（例如 iPhone、Apple Watch 等）。

***

## 属性说明

| 属性名                | 类型       | 描述                                         |
| ------------------ | -------- | ------------------------------------------ |
| `bundleIdentifier` | `string` | 来源的 bundle ID，例如 `"com.apple.Health"`      |
| `name`             | `string` | 来源的可读名称，例如 `"Apple Watch"` 或 `"Scripting"` |

***

## 静态方法

### `HealthSource.forCurrentApp(): HealthSource`

返回当前应用（Scripting）对应的 `HealthSource` 对象，可用于筛选由当前应用写入的健康数据。

***

## 示例：按来源过滤统计结果

```ts
const stats = await Health.queryStatistics("heartRate"， {
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02")
})

const currentAppSource = HealthSource.forCurrentApp()
const averageHR = stats.averageQuantity(HealthUnit.countPerMinute(), currentAppSource)

console.log("当前 App 的心率数据：", averageHR)
```

***

## 总结

- `HealthStatistics` 可用于获取健康数据的统计汇总，支持单位转换和数据来源过滤。
- 搭配 `HealthSource` 可以精确控制数据分析的来源，适用于可视化分析和报表功能。
- 常见场景包括：展示日均步数、记录最近一次体重、分析指定设备或 app 的活跃时间等。
