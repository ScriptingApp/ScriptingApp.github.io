# 健康数量型数据（HealthQuantityType）

`HealthQuantityType` 用于指定你希望读取或写入的健康数据类型。每个标识符代表一种可度量的健康指标，涵盖身体测量、运动、营养、生理信号、环境暴露等多个维度。

***

## 1. 身体测量

| 类型标识符                           | 用途说明                     |
| ------------------------------- | ------------------------ |
| `bodyMass`                      | 体重（kg 或磅）                |
| `bodyMassIndex`                 | 身体质量指数（BMI）              |
| `height`                        | 身高                       |
| `bodyFatPercentage`             | 体脂百分比                    |
| `leanBodyMass`                  | 去脂体重（不包括脂肪、骨骼、器官）        |
| `waistCircumference`            | 腰围，常用于代谢健康分析             |
| `appleSleepingWristTemperature` | 睡眠期间的手腕皮肤温度（Apple Watch） |
| `bodyTemperature`               | 核心体温                     |
| `basalBodyTemperature`          | 基础体温，常用于生理周期追踪           |

***

## 2. 活动与运动

| 类型标识符                         | 用途说明              |
| ----------------------------- | ----------------- |
| `stepCount`                   | 步数                |
| `distanceWalkingRunning`      | 步行与跑步距离           |
| `flightsClimbed`              | 登楼层数              |
| `activeEnergyBurned`          | 主动能量消耗（卡路里）       |
| `basalEnergyBurned`           | 基础代谢能量消耗          |
| `appleExerciseTime`           | Apple 定义的锻炼时间     |
| `appleMoveTime`               | 活动时间（Move 环）      |
| `appleStandTime`              | 站立时间（Apple Watch） |
| `pushCount`                   | 轮椅推进次数            |
| `distanceWheelchair`          | 轮椅行进距离            |
| `nikeFuel`                    | Nike 活动得分（已弃用）    |
| `estimatedWorkoutEffortScore` | 锻炼努力估算分值          |
| `workoutEffortScore`          | 实际锻炼努力分值          |
| `physicalEffort`              | 锻炼期间的身体努力强度       |

***

## 3. 运动专项指标

| 类型标识符                             | 用途说明        |
| --------------------------------- | ----------- |
| `cyclingSpeed`                    | 骑行速度        |
| `cyclingPower`                    | 骑行输出功率      |
| `cyclingCadence`                  | 骑行踏频        |
| `cyclingFunctionalThresholdPower` | 功能性阈值功率（骑行） |
| `distanceCycling`                 | 骑行距离        |
| `distanceRowing`                  | 划船距离        |
| `rowingSpeed`                     | 划船速度        |
| `distanceSwimming`                | 游泳距离        |
| `swimmingStrokeCount`             | 游泳划水次数      |
| `distancePaddleSports`            | 划桨类运动距离     |
| `paddleSportsSpeed`               | 划桨运动速度      |
| `distanceSkatingSports`           | 滑冰运动距离      |
| `distanceDownhillSnowSports`      | 高山滑雪运动距离    |
| `distanceCrossCountrySkiing`      | 越野滑雪距离      |
| `crossCountrySkiingSpeed`         | 越野滑雪速度      |

***

## 4. 步态与跑步分析

| 类型标识符                            | 用途说明            |
| -------------------------------- | --------------- |
| `runningSpeed`                   | 跑步速度            |
| `runningPower`                   | 跑步功率            |
| `runningStrideLength`            | 步幅长度            |
| `runningVerticalOscillation`     | 垂直振幅（跑步中身体上下波动） |
| `runningGroundContactTime`       | 跑步着地接触时间        |
| `walkingStepLength`              | 步行步长            |
| `walkingSpeed`                   | 步行速度            |
| `walkingAsymmetryPercentage`     | 步态不对称百分比        |
| `walkingDoubleSupportPercentage` | 双脚同时着地的步行时间百分比  |
| `appleWalkingSteadiness`         | 苹果步态稳定性指标       |
| `walkingHeartRateAverage`        | 步行平均心率          |
| `sixMinuteWalkTestDistance`      | 六分钟步行测试距离       |
| `stairAscentSpeed`               | 上楼速度            |
| `stairDescentSpeed`              | 下楼速度            |

***

## 5. 心率与生命体征

| 类型标识符                        | 用途说明           |
| ---------------------------- | -------------- |
| `heartRate`                  | 心率（bpm）        |
| `restingHeartRate`           | 静息心率           |
| `walkingHeartRateAverage`    | 步行平均心率         |
| `heartRateVariabilitySDNN`   | 心率变异性（标准差）     |
| `heartRateRecoveryOneMinute` | 运动后 1 分钟心率恢复值  |
| `peripheralPerfusionIndex`   | 外周灌注指数         |
| `atrialFibrillationBurden`   | 房颤负荷（AFib 百分比） |
| `vo2Max`                     | 最大摄氧量，衡量有氧能力   |
| `bloodPressureSystolic`      | 收缩压            |
| `bloodPressureDiastolic`     | 舒张压            |
| `oxygenSaturation`           | 血氧饱和度          |
| `bloodGlucose`               | 血糖浓度           |
| `insulinDelivery`            | 胰岛素输送量         |
| `inhalerUsage`               | 吸入器使用次数        |
| `respiratoryRate`            | 呼吸频率（次/分钟）     |
| `forcedExpiratoryVolume1`    | 第1秒用力呼气量       |
| `forcedVitalCapacity`        | 用力肺活量          |
| `peakExpiratoryFlowRate`     | 呼气峰流速          |

***

## 6. 声音与环境暴露

| 类型标识符                         | 用途说明          |
| ----------------------------- | ------------- |
| `environmentalAudioExposure`  | 环境噪音暴露（分贝）    |
| `environmentalSoundReduction` | 降噪程度（耳机）      |
| `headphoneAudioExposure`      | 耳机音量暴露（时间与分贝） |
| `uvExposure`                  | 紫外线暴露水平       |
| `timeInDaylight`              | 曝晒在日光下的时间     |
| `underwaterDepth`             | 水下深度          |
| `waterTemperature`            | 水温（如游泳、潜水）    |

***

## 7. 营养摄入（饮食追踪）

| 类型标识符                       | 用途说明        |
| --------------------------- | ----------- |
| `dietaryEnergyConsumed`     | 摄入能量（卡路里）   |
| `dietaryProtein`            | 蛋白质摄入量      |
| `dietaryCarbohydrates`      | 碳水化合物摄入量    |
| `dietaryFatTotal`           | 总脂肪摄入量      |
| `dietaryFatSaturated`       | 饱和脂肪        |
| `dietaryFatMonounsaturated` | 单不饱和脂肪      |
| `dietaryFatPolyunsaturated` | 多不饱和脂肪      |
| `dietarySugar`              | 糖分摄入        |
| `dietaryFiber`              | 膳食纤维        |
| `dietaryWater`              | 水分摄入        |
| `dietaryCaffeine`           | 咖啡因摄入       |
| `dietaryCholesterol`        | 胆固醇摄入       |
| `dietarySodium`             | 钠摄入         |
| `dietaryPotassium`          | 钾摄入         |
| `dietaryCalcium`            | 钙摄入         |
| `dietaryIron`               | 铁摄入         |
| `dietaryMagnesium`          | 镁摄入         |
| `dietaryZinc`               | 锌摄入         |
| `dietaryIodine`             | 碘摄入         |
| `dietaryVitaminA`           | 维生素 A       |
| `dietaryVitaminB6`          | 维生素 B6      |
| `dietaryVitaminB12`         | 维生素 B12     |
| `dietaryVitaminC`           | 维生素 C       |
| `dietaryVitaminD`           | 维生素 D       |
| `dietaryVitaminE`           | 维生素 E       |
| `dietaryVitaminK`           | 维生素 K       |
| `dietaryThiamin`            | 维生素 B1（硫胺素） |
| `dietaryRiboflavin`         | 维生素 B2（核黄素） |
| `dietaryNiacin`             | 维生素 B3（烟酸）  |
| `dietaryPantothenicAcid`    | 泛酸（维生素 B5）  |
| `dietaryFolate`             | 叶酸          |
| `dietaryCopper`             | 铜摄入         |
| `dietarySelenium`           | 硒摄入         |
| `dietaryChromium`           | 铬摄入         |
| `dietaryManganese`          | 锰摄入         |
| `dietaryMolybdenum`         | 钼摄入         |
| `dietaryPhosphorus`         | 磷摄入         |
| `dietaryBiotin`             | 生物素         |

***

## 8. 生活方式与其他

| 类型标识符                                | 用途说明              |
| ------------------------------------ | ----------------- |
| `bloodAlcoholContent`                | 血液酒精含量            |
| `numberOfAlcoholicBeverages`         | 饮酒次数              |
| `numberOfTimesFallen`                | 跌倒次数（Apple Watch） |
| `appleSleepingBreathingDisturbances` | 睡眠期间呼吸干扰次数        |

***

## 使用示例

### 查询步数样本：

```ts
const samples = await Health.queryQuantitySamples({
  type: "stepCount",
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-02"),
  limit: 20
})

for (const sample of samples) {
  const value = sample.quantity?.valueForUnit(HealthUnit.count())
  console.log("步数：", value)
}
```

### 写入体重数据：

```ts
const sample = HealthQuantitySample.create({
  type: "bodyMass",
  unit: HealthUnit.gramUnit(HealthUnitPrefix.kilo),
  value: 70.0,
  startDate: new Date("2025-07-01 00:00:00"),
  endDate: new Date("2025-07-02 00:00:00"),
})

await Health.saveQuantitySample(sample)
```

### 读取锻炼中的平均心率：

```ts
const stat = workout.allStatistics["heartRate"]
const avg = stat?.averageQuantity(HealthUnit.count().divided(HealthUnit.minute()))
```
