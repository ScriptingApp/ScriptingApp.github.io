`HealthQuantitySample` 表示一条健康数量类型的数据样本，例如一次心率测量、记录的步数或摄入的热量。它包含了关于该数据的类型、数值、时间区间、单位和可选的元数据信息。

该类是两个更具体子类的基类：

- `HealthCumulativeQuantitySample`（累计型样本）
- `HealthDiscreteQuantitySample`（离散型样本）

***

## 基本信息

此类用于：

- 读取单条健康数据记录
- 写入新的健康数据记录
- 按单位转换样本数值

***

## 属性说明

| 属性名            | 类型                            | 描述          |
| -------------- | ----------------------------- | ----------- |
| `uuid`         | `string`                      | 样本的唯一标识符    |
| `quantityType` | `HealthQuantityType`          | 健康指标的类型     |
| `startDate`    | `Date`                        | 测量开始时间      |
| `endDate`      | `Date`                        | 测量结束时间      |
| `count`        | `number`                      | 样本数量（通常为 1） |
| `metadata`     | `Record<string, any> \| null` | 可选的元数据      |

***

## 方法说明

### `quantityValue(unit: HealthUnit): number`

以指定单位返回该样本的数值。

**参数：**

- `unit`: 单位对象（如 `HealthUnit.kilocalorie()`）

**返回：**

- 转换后的数值（number）

**示例：**

```ts
const bpm = sample.quantityValue(HealthUnit.count().divided(HealthUnit.minute()))
console.log(`心率: ${bpm} 次/分钟`)
```

***

## 静态方法

### `HealthQuantitySample.create(options): HealthQuantitySample | null`

创建一条新的健康样本数据。

**参数结构：**

```ts
{
  type: HealthQuantityType
  startDate: Date
  endDate: Date
  value: number
  unit: HealthUnit
  metadata?: Record<string, any> | null
}
```

**返回：**

- 成功则返回 `HealthQuantitySample` 实例，否则为 `null`

**示例：**

```ts
const sample = HealthQuantitySample.create({
  type: 'stepCount',
  startDate: new Date('2025-07-01T09:00:00'),
  endDate: new Date('2025-07-01T09:01:00'),
  value: 200,
  unit: HealthUnit.count(),
  metadata: { source: 'manualEntry' }
})
```

***

# 子类：HealthCumulativeQuantitySample

`HealthCumulativeQuantitySample` 表示累计型的健康数据，例如总步数、总距离或总能量消耗等。

## 新增属性

| 属性名                       | 类型        | 描述          |
| ------------------------- | --------- | ----------- |
| `hasUndeterminedDuration` | `boolean` | 是否为不确定时长的样本 |

## 新增方法

### `sumQuantity(unit: HealthUnit): number`

以指定单位返回该样本的累计值。

**示例：**

```ts
const totalKcal = cumulativeSample.sumQuantity(HealthUnit.kilocalorie())
console.log(`总活动能量: ${totalKcal} 千卡`)
```

### `quantityValue(unit: HealthUnit): number`

返回值同 `sumQuantity()`，用于兼容统一接口。

***

# 子类：HealthDiscreteQuantitySample

`HealthDiscreteQuantitySample` 表示一系列离散时间点上的测量值，例如心率、步数或温度变化等。

## 新增属性

| 属性名                              | 类型                           | 描述            |
| -------------------------------- | ---------------------------- | ------------- |
| `mostRecentQuantityDateInterval` | `HealthDateInterval \| null` | 最近一次数值对应的时间范围 |

## 新增方法

| 方法名                        | 描述              |
| -------------------------- | --------------- |
| `averageQuantity(unit)`    | 返回平均值           |
| `maximumQuantity(unit)`    | 返回最大值           |
| `minimumQuantity(unit)`    | 返回最小值           |
| `mostRecentQuantity(unit)` | 返回最近一次记录的值（若存在） |

**示例：**

```ts
const avg = discreteSample.averageQuantity(HealthUnit.count())
const max = discreteSample.maximumQuantity(HealthUnit.count())
const recent = discreteSample.mostRecentQuantity(HealthUnit.count())
console.log(`平均: ${avg}, 最大: ${max}, 最近: ${recent}`)
```

***

## 使用场景对比

| 场景               | 推荐使用的类                           | 示例          |
| ---------------- | -------------------------------- | ----------- |
| 记录或读取单条测量数据      | `HealthQuantitySample`           | 手动输入体重      |
| 处理总量（如总步数、总能量）   | `HealthCumulativeQuantitySample` | 1 小时内的总步数   |
| 进行统计分析（最小值/最大值等） | `HealthDiscreteQuantitySample`   | 心率记录的最大/平均值 |

***

## 相关类型

- `HealthUnit`: 表示测量单位（如 kg、bpm、kcal 等）
- `HealthQuantityType`: 指定测量的数据类型（如步数、心率等）
- `HealthDateInterval`: 表示一个时间区间（start + end + duration）
