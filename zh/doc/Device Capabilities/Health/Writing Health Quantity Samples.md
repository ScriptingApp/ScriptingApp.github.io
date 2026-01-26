# 写入数量型数据（HealthQuantitySample） PRO

Scripting 应用支持将数量型健康数据（例如步数、心率、体重、卡路里等）写入 Apple 的 HealthKit。你可以使用 `HealthQuantitySample` 类创建数据样本，并通过 `Health.saveQuantitySample()` 方法保存到健康数据库中。

## 使用前提

- 确保设备支持 HealthKit：

  ```ts
  if (!Health.isHealthDataAvailable) {
    throw new Error("此设备不支持健康数据。")
  }
  ```

- 脚本需要具备对目标数据类型的写入权限。当你调用保存 API 时，Scripting 会自动检查并请求所需权限。

***

## 一、创建 `HealthQuantitySample` 实例

使用 `HealthQuantitySample.create()` 方法创建一个数量型数据样本。

### 参数说明

| 参数          | 类型                       | 描述                                                                     |
| ----------- | ------------------------ | ---------------------------------------------------------------------- |
| `type`      | `HealthQuantityType`     | 要写入的数据类型，如 `"stepCount"`（步数）、`"heartRate"`（心率）、`"bodyMass"`（体重）等       |
| `startDate` | `Date`                   | 样本的开始时间                                                                |
| `endDate`   | `Date`                   | 样本的结束时间                                                                |
| `value`     | `number`                 | 健康数据的数值                                                                |
| `unit`      | `HealthUnit`             | 数据单位，如 `HealthUnit.count()`、`HealthUnit.gram(HealthMetrixPrefix.kilo)` |
| `metadata`  | `Record<string, any>` 可选 | 元数据，例如来源信息                                                             |

### 示例

```ts
const sample = HealthQuantitySample.create({
  type: "stepCount",
  startDate: new Date("2025-07-03T08:00:00"),
  endDate: new Date("2025-07-03T09:00:00"),
  value: 1200,
  unit: HealthUnit.count(),
  metadata: {
    source: "ScriptingApp"
  }
})

if (!sample) {
  throw new Error("创建 HealthQuantitySample 失败")
}
```

***

## 二、保存样本到 HealthKit

创建完样本后，调用 `Health.saveQuantitySample()` 将其写入健康数据：

```ts
await Health.saveQuantitySample(sample)
```

如果写入失败（例如权限不足），此方法将抛出错误。

***

## 完整示例

```ts
async function writeStepCount() {
  const sample = HealthQuantitySample.create({
    type: "stepCount",
    startDate: new Date("2025-07-03T08:00:00"),
    endDate: new Date("2025-07-03T09:00:00"),
    value: 1200,
    unit: HealthUnit.count(),
  })

  if (!sample) {
    console.error("创建样本失败")
    return
  }

  try {
    await Health.saveQuantitySample(sample)
    console.log("步数数据写入成功")
  } catch (err) {
    console.error("写入失败：", err)
  }
}

writeStepCount()
```

***

## 注意事项

- 请确保 `unit` 与 `type` 类型匹配，例如：

  - `"stepCount"` → `HealthUnit.count()`
  - `"bodyMass"` → `HealthUnit.gram(HealthMetrixPrefix.kilo)`
  - `"heartRate"` → `HealthUnit.count().divided(HealthUnit.minute())`
- 对于累计类数据（如步数、距离），`startDate` 和 `endDate` 应表示数据的记录时间段。
