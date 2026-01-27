---
title: 健康心跳序列数据（HealthHeartbeatSeriesSample）
tag: PRO
---

`HealthHeartbeatSeriesSample` 类用于访问 **心跳序列样本（heartbeat series samples）**，它表示一段时间内记录的一系列心跳间隔（RR 间期），通常用于分析心律，识别心律不齐等情况。

该类的实例由公共接口 `Health.queryHeartbeatSeriesSamples()` 返回。

---

## 使用场景

* **监测运动过程中的心律变化**
* **识别异常心律（如房颤）**
* **记录休息或睡眠期间的心跳模式**
* **生成健康数据分析与研究报告**

---

## 类：`HealthHeartbeatSeriesSample`

### 属性说明

| 属性名          | 类型                            | 描述                                           |
| ------------ | ----------------------------- | -------------------------------------------- |
| `uuid`       | `string`                      | 此样本的唯一标识符                                    |
| `sampleType` | `string`                      | 样本类型，通常为 `"HKHeartbeatSeriesTypeIdentifier"` |
| `startDate`  | `Date`                        | 该系列数据的开始时间                                   |
| `endDate`    | `Date`                        | 该系列数据的结束时间                                   |
| `count`      | `number`                      | 序列中包含的心跳次数（即 RR 间期数量）                        |
| `metadata`   | `Record<string, any> \| null` | 可选的元数据，如记录设备、来源信息等                           |

> 注意：目前此类不暴露具体的 RR 间期数据，仅表示整体序列信息。

---

## 方法：`Health.queryHeartbeatSeriesSamples(options?)`

### 方法定义

```ts
function queryHeartbeatSeriesSamples(
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
    strictStartDate?: boolean
    strictEndDate?: boolean
    sortDescriptors?: Array<{
      key: "startDate" | "endDate" | "count"
      order?: "forward" | "reverse"
    }>
    requestPermissions?: HealthQuantityType[]
  }
): Promise<HealthHeartbeatSeriesSample[]>
```

### 参数说明

* `startDate` *(可选)*：筛选起始时间之后的样本
* `endDate` *(可选)*：筛选截止时间之前的样本
* `limit` *(可选)*：最多返回的样本数量
* `strictStartDate` *(可选)*：是否仅返回开始时间等于 `startDate` 的样本
* `strictEndDate` *(可选)*：是否仅返回结束时间等于 `endDate` 的样本
* `sortDescriptors` *(可选)*：设置排序字段，如 `startDate`、`endDate` 或 `count`，可指定顺序为 `"forward"` 或 `"reverse"`
* `requestPermissions`: *(可选)*`: 设置需要请求授权的数据类型，默认只请求了 `heartbeat`, `heartRateVariabilitySDNN` and `heartRate` 等类型，如果需要访问更新相关数据必须要设置对应数据的类型授权

### 返回值

一个 Promise 对象，解析为 `HealthHeartbeatSeriesSample` 实例数组，结果按指定排序返回。

---

## 使用示例

```ts
async function fetchHeartbeatSeries() {
  const samples = await Health.queryHeartbeatSeriesSamples({
    startDate: new Date('2024-01-01'),
    endDate: new Date(),
    sortDescriptors: [
      { key: 'startDate', order: 'reverse' }
    ],
    limit: 5,
  })

  for (const sample of samples) {
    console.log('UUID:', sample.uuid)
    console.log('开始时间:', sample.startDate)
    console.log('结束时间:', sample.endDate)
    console.log('心跳次数:', sample.count)
    console.log('元数据:', sample.metadata)
  }
}
```

---

## 注意事项

* 如果用户未授权读取心跳序列数据，将返回空数组。
* 心跳序列通常由 Apple Watch 等设备记录，表示某段时间内的连续心跳间隔数据。