# 写入分类数据（HealthCategorySample） PRO

Scripting 应用支持将分类健康数据（如睡眠状态、冥想记录、月经流量、排卵测试结果等）写入 Apple HealthKit。你可以通过 `HealthCategorySample` 类创建分类数据样本，并使用 `Health.saveCategorySample()` 方法将其保存到健康数据库中。

***

## 使用前提

- 确保设备支持 HealthKit：

  ```ts
  if (!Health.isHealthDataAvailable) {
    throw new Error("此设备不支持健康数据。")
  }
  ```

- 确保脚本具备目标分类数据类型的写入权限。Scripting 会在首次保存时自动请求授权。

***

## 一、创建 `HealthCategorySample` 实例

使用 `HealthCategorySample.create()` 方法创建分类数据样本。

### 参数说明

| 参数          | 类型                        | 描述                                                                   |
| ----------- | ------------------------- | -------------------------------------------------------------------- |
| `type`      | `HealthCategoryType`      | 要写入的分类类型，例如 `"sleepAnalysis"`、`"mindfulSession"`、`"menstrualFlow"` 等 |
| `startDate` | `Date`                    | 分类事件的开始时间                                                            |
| `endDate`   | `Date`                    | 分类事件的结束时间                                                            |
| `value`     | 对应的枚举值                    | 表示该分类状态的枚举值，需根据具体类型使用相应枚举                                            |
| `metadata`  | `Record<string, any>`（可选） | 可选的元数据，用于标记数据来源或附加信息                                                 |

### 枚举值说明

- 不同类型的分类数据需要传入不同的枚举类型：

  - 对于 `"sleepAnalysis"`，应使用 `HealthCategoryValueSleepAnalysis` 枚举，如：

    - `HealthCategoryValueSleepAnalysis.asleepCore`
    - `HealthCategoryValueSleepAnalysis.awake`

  - 对于 `"menstrualFlow"`，应使用 `HealthCategoryValueSeverity` 枚举，如：

    - `HealthCategoryValueSeverity.mild`、`moderate`、`severe`

  请参考具体分类类型所支持的枚举列表。

***

### 示例代码

```ts
const sample = HealthCategorySample.create({
  type: "sleepAnalysis",
  startDate: new Date("2025-07-03T23:00:00"),
  endDate: new Date("2025-07-04T07:00:00"),
  value: HealthCategoryValueSleepAnalysis.asleepCore,
  metadata: {
    source: "ScriptingApp"
  }
})

if (!sample) {
  throw new Error("创建 HealthCategorySample 失败")
}
```

***

## 二、保存样本到 HealthKit

使用 `Health.saveCategorySample()` 方法将创建的样本写入 HealthKit：

```ts
await Health.saveCategorySample(sample)
```

如果保存失败（如权限不足），该方法将抛出错误。

***

## 完整示例

```ts
async function writeSleepData() {
  const sample = HealthCategorySample.create({
    type: "sleepAnalysis",
    startDate: new Date("2025-07-03T23:00:00"),
    endDate: new Date("2025-07-04T07:00:00"),
    value: HealthCategoryValueSleepAnalysis.asleepCore,
  })

  if (!sample) {
    console.error("创建样本失败")
    return
  }

  try {
    await Health.saveCategorySample(sample)
    console.log("睡眠数据写入成功")
  } catch (err) {
    console.error("保存失败：", err)
  }
}

writeSleepData()
```

***

## 注意事项

- `value` 参数必须是指定 `type` 类型对应的合法枚举值，否则创建将失败。
- `startDate` 与 `endDate` 应表示事件的发生时间段，例如一次睡眠或一次冥想。
- `metadata` 是可选的，适用于添加数据来源或标识用途。
