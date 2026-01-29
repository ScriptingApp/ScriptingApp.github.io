# 读取心跳序列数据（HealthHeartbeatSeriesSample）

Scripting 应用通过全局函数 `Health.queryHeartbeatSeriesSamples()` 提供对 Apple Health 中**心跳序列数据**的访问。该数据代表 Apple Watch 在锻炼或静息状态下记录的一系列连续心跳间隔（R-R 间隔），可用于分析心律稳定性与频率变化。

每条记录提供该心跳序列的**持续时间、心跳数量**及**元数据**，但**不包含原始的每次间隔时间值**。

***

## 什么是 Heartbeat Series Sample？

每个 `HealthHeartbeatSeriesSample` 对象包含以下字段：

- `uuid`：该样本的唯一标识符
- `sampleType`：样本类型（恒为 `"heartbeatSeries"`）
- `startDate` / `endDate`：记录该序列的时间范围
- `count`：该序列中记录的心跳次数
- `metadata`：可选的附加信息（如记录来源设备、应用等）

> 注意：此接口仅返回摘要信息，不包含每一次心跳的具体间隔值。

***

## API 用法

```ts
Health.queryHeartbeatSeriesSamples(
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
    requestPermissions?: HealthQuantityType[]
  }
): Promise<HealthHeartbeatSeriesSample[]>
```

***

## 参数说明

| 参数名                                 | 描述                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------- |
| `startDate` / `endDate`             | 可选时间范围，用于筛选样本                                                          |
| `limit`                             | 限制返回的最大样本数量                                                            |
| `strictStartDate` / `strictEndDate` | 是否严格匹配起止时间边界                                                           |
| `sortDescriptors`                   | 可选排序方式（如按 `startDate` 或 `endDate` 排序）                                  |
| `requestPermissions`                | 可选请求更多数据类型权限，默认只请求`heartRate`、`heartbeat` 和 `heartRateVariabilitySDNN` |

***

## 示例：读取最近的心跳序列记录

```ts
const results = await Health.queryHeartbeatSeriesSamples({
  startDate: new Date("2025-07-01T00:00:00"),
  endDate: new Date("2025-07-05T00:00:00"),
  limit: 10,
  sortDescriptors: [{ key: "startDate", order: "reverse" }]
})

for (const sample of results) {
  console.log("UUID:", sample.uuid)
  console.log("开始时间：", sample.startDate)
  console.log("结束时间：", sample.endDate)
  console.log("心跳次数：", sample.count)
  console.log("元数据：", sample.metadata)
  console.log("---")
}
```

***

## 数据说明与限制

- **无法获取每一次心跳的具体间隔时间**，仅可看到总次数和时间范围。

- 如需计算平均心率（BPM），可通过以下方式估算：

  ```ts
  const duration = (sample.endDate.getTime() - sample.startDate.getTime()) / 1000
  const avgBPM = (sample.count / duration) * 60
  ```

- 该 API 不包含间隔异常（如缺失数据、节律中断）信息。

***

## 小结

读取心跳序列数据的流程如下：

1. 使用 `Health.queryHeartbeatSeriesSamples()` 方法进行查询；
2. 可按时间范围、排序或限制数量进行过滤；
3. 遍历返回的 `HealthHeartbeatSeriesSample` 数组；
4. 每个对象包含 `startDate`、`endDate`、`count` 和 `metadata`；
5. 可通过持续时间与总次数计算平均心率。

此 API 适用于分析 Apple Watch 记录的心跳追踪频率，可结合锻炼或其他健康数据进行综合评估。
