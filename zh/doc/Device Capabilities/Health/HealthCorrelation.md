# 健康关联数据（HealthCorrelation） PRO

`HealthCorrelation` 类表示一组彼此相关的健康样本。它提供接口用于访问和创建健康关联记录，这些记录将多个健康数据类型组合成一个整体，例如将饮食摄入与血压读数关联，或将排卵测试结果与月经流量数据相关联。

***

## 适用场景

- 将血压的收缩压和舒张压值组合为一条记录
- 将食物摄入与营养成分相关联
- 将多个月经追踪事件合并为一个周期相关事件

***

## 属性说明

| 属性名                         | 类型                                                                                                                   | 描述                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `uuid`                      | `string`                                                                                                             | 该关联样本的唯一标识符。                           |
| `correlationType`           | `HealthCorrelationType`                                                                                              | 关联的类型，例如 `"bloodPressure"` 或 `"food"`。 |
| `startDate`                 | `Date`                                                                                                               | 该关联事件的起始时间。                            |
| `endDate`                   | `Date`                                                                                                               | 该关联事件的结束时间。                            |
| `metadata`                  | `Record<string, any> \| null`                                                                                        | 可选元数据，例如用户的注释。                         |
| `samples`                   | `(HealthQuantitySample \| HealthCumulativeQuantitySample \| HealthDiscreteQuantitySample \| HealthCategorySample)[]` | 此关联包含的所有健康样本。                          |
| `quantitySamples`           | `HealthQuantitySample[]`                                                                                             | 所有基于数量类型的样本（包含累积和离散类型）。                |
| `cumulativeQuantitySamples` | `HealthCumulativeQuantitySample[]`                                                                                   | 仅包含累积数量样本。                             |
| `discreteQuantitySamples`   | `HealthDiscreteQuantitySample[]`                                                                                     | 仅包含离散数量样本。                             |
| `categorySamples`           | `HealthCategorySample[]`                                                                                             | 所有基于类别的健康样本。                           |

***

## 静态方法

### `HealthCorrelation.create(options): HealthCorrelation | null`

创建一个新的健康数据关联。

#### 参数

| 参数名         | 类型                                                 | 是否必填 | 描述                                        |
| ----------- | -------------------------------------------------- | ---- | ----------------------------------------- |
| `type`      | `HealthCorrelationType`                            | 是    | 要创建的关联类型，例如 `"bloodPressure"` 或 `"food"`。 |
| `startDate` | `Date`                                             | 是    | 关联的开始时间。                                  |
| `endDate`   | `Date`                                             | 是    | 关联的结束时间。                                  |
| `metadata`  | `Record<string, any> \| null`                      | 否    | 可选元数据，例如附加说明或标记。                          |
| `objects`   | `(HealthQuantitySample \| HealthCategorySample)[]` | 是    | 要包含在该关联中的健康样本。                            |

#### 返回值

- 如果参数合法，返回新的 `HealthCorrelation` 实例；
- 如果类型与样本不兼容或参数无效，则返回 `null`。

***

## 使用示例

### 示例 1：创建一条血压关联记录

```ts
const systolic = HealthQuantitySample.create({
  type: "bloodPressureSystolic",
  startDate: new Date("2025-07-04T08:00:00"),
  endDate: new Date("2025-07-04T08:01:00"),
  value: 120,
  unit: HealthUnit.millimeterOfMercury()
})

const diastolic = HealthQuantitySample.create({
  type: "bloodPressureDiastolic",
  startDate: new Date("2025-07-04T08:00:00"),
  endDate: new Date("2025-07-04T08:01:00"),
  value: 80,
  unit: HealthUnit.millimeterOfMercury()
})

const correlation = HealthCorrelation.create({
  type: "bloodPressure",
  startDate: systolic.startDate,
  endDate: systolic.endDate,
  objects: [systolic, diastolic]
})

if (correlation) {
  // 保存记录...
}
```

***

### 示例 2：遍历关联中的样本

```ts
for (const sample of correlation.quantitySamples) {
  const value = sample.quantityValue(HealthUnit.millimeterOfMercury())
  console.log(`${sample.quantityType}: ${value}`)
}
```

***

## 注意事项

- `objects` 参数中的样本类型必须符合该关联类型所支持的数据类型。
- 当前支持的关联类型包括 `"bloodPressure"` 和 `"food"`。
- 使用此类可以在视图中更完整地展示一次健康事件的相关信息，或用于分析多个数据之间的关系。
