# 查询统计数据（HealthStatistics）

`queryStatistics` 方法用于查询某个健康数量类型在指定时间范围内的**聚合统计数据**，包括：

- 总和（sum）
- 平均值（average）
- 最小值、最大值
- 最近一条记录
- 总持续时间（duration）

你也可以选择**按来源（设备或应用）分开统计**。

此方法非常适合生成**每日、每周或历史健康数据的摘要**。

***

## 方法签名

```ts
function queryStatistics(
  quantityType: HealthQuantityType,
  options?: {
    startDate?: Date
    endDate?: Date
    strictStartDate?: boolean
    strictEndDate?: boolean
    statisticsOptions?: HealthStatisticsOptions | Array<HealthStatisticsOptions>
  }
): Promise<HealthStatistics | null>
```

***

## 参数说明

### `quantityType: HealthQuantityType`（必填）

要查询的健康数量类型，例如：

- `"stepCount"`（步数）
- `"heartRate"`（心率）
- `"bodyMass"`（体重）
- `"activeEnergyBurned"`（活动能量消耗）

请使用支持的 `HealthQuantityType` 值。

***

### `options`（可选）

用于配置查询范围和结果的选项对象：

| 参数名                 | 类型                              | 说明                                  |
| ------------------- | ------------------------------- | ----------------------------------- |
| `startDate`         | `Date`                          | 查询起始时间                              |
| `endDate`           | `Date`                          | 查询结束时间                              |
| `strictStartDate`   | `boolean`                       | 若为 `true`，仅包含从 `startDate` 精确开始的统计项 |
| `strictEndDate`     | `boolean`                       | 若为 `true`，仅包含在 `endDate` 精确结束的统计项   |
| `statisticsOptions` | `HealthStatisticsOptions` 或数组形式 | 指定要包含哪些统计指标（详见下方）                   |

***

## 可用的 `HealthStatisticsOptions`

| 选项名                  | 描述                |
| -------------------- | ----------------- |
| `"cumulativeSum"`    | 总和（适用于步数、卡路里等累计值） |
| `"discreteAverage"`  | 平均值（适用于心率等离散值）    |
| `"discreteMin"`      | 最小值               |
| `"discreteMax"`      | 最大值               |
| `"mostRecent"`       | 最近一条记录的值          |
| `"duration"`         | 所有样本的总持续时间        |
| `"separateBySource"` | 按来源（设备或 App）分开统计  |

***

## 返回值

返回一个 `Promise`，解析为 `HealthStatistics` 对象，或在没有数据时返回 `null`。

你可以通过 `HealthStatistics` 提供的方法来获取聚合值，例如：

- `sumQuantity(...)`
- `averageQuantity(...)`
- `mostRecentQuantity(...)`
- `duration(...)`

***

## 示例：查询每日步数汇总

```ts
const stats = await Health.queryStatistics("stepCount", {
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02"),
  statisticsOptions: ["cumulativeSum", "mostRecent", "duration"]
})

if (stats) {
  const steps = stats.sumQuantity(HealthUnit.count())
  const last = stats.mostRecentQuantity(HealthUnit.count())
  const time = stats.duration(HealthUnit.second())

  console.log("步数：", steps)
  console.log("最近一次记录：", last)
  console.log("总持续时间（秒）：", time)
} else {
  console.log("未找到步数数据")
}
```

***

## 示例：仅查询当前 App 写入的心率平均值

```ts
const stats = await Health.queryStatistics("heartRate", {
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02"),
  statisticsOptions: ["discreteAverage"]
})

const source = HealthSource.forCurrentApp()
const averageHR = stats?.averageQuantity(HealthUnit.countPerMinute(), source)

console.log("当前 App 的心率平均值：", averageHR)
```

***

## 注意事项

- 如果未指定 `statisticsOptions`，某些字段（如总和、平均值等）可能为 `null`。
- 若需访问原始样本数据，请使用 `Health.queryQuantitySamples()` 方法。
- 可用的统计类型与数据类型相关，例如心率支持 `discreteAverage`，而步数支持 `cumulativeSum`。
