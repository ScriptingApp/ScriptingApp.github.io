# 健康单位（HealthUnit） PRO

`HealthUnit` 类用于表示 HealthKit 中各种度量单位。你可以使用它来构建基本单位（如公斤、米、升等）、带前缀的单位（如毫克、千米等），并支持进行乘法、除法、次方等单位组合运算。

## 枚举：HealthMetricPrefix

表示公制单位前缀：

| 枚举值     | 前缀符号 | 示例         |
| ------- | ---- | ---------- |
| `none`  | -    | gram()     |
| `milli` | m    | milligram  |
| `centi` | c    | centimeter |
| `kilo`  | k    | kilometer  |
| `mega`  | M    | megajoule  |
| `micro` | μ    | microliter |
| `nano`  | n    | nanometer  |

完整枚举见 API 定义。

***

## 1. 创建单位

### 使用静态方法创建基本单位

```ts
const weight = HealthUnit.gram()
const length = HealthUnit.meter()
const energy = HealthUnit.kilocalorie()
```

### 创建带前缀的单位

```ts
const mg = HealthUnit.gramUnit(HealthMetricPrefix.milli)
const km = HealthUnit.meterUnit(HealthMetricPrefix.kilo)
const mL = HealthUnit.literUnit(HealthMetricPrefix.milli)
```

### 从字符串构建单位

```ts
const unit = HealthUnit.fromString('kg')
```

***

## 2. 单位运算

### 单位乘法

用于构建复合单位，例如能量密度、速度单位等。

```ts
const meter = HealthUnit.meter()
const second = HealthUnit.second()
const speedUnit = meter.divided(second)  // 表示 m/s
```

### 单位除法

```ts
const bpm = HealthUnit.count().divided(HealthUnit.minute()) // 次/分钟
```

### 单位乘方

```ts
const m2 = HealthUnit.meter().raisedToPower(HealthMetricPrefix.none) // 平方米
```

### 倒数单位

```ts
const perLiter = HealthUnit.liter().reciprocal() // 表示每升 (1/L)
```

***

## 3. 单位属性

| 属性名          | 类型        | 说明                |
| ------------ | --------- | ----------------- |
| `unitString` | `string`  | 单位的字符串表示，如 `"kg"` |
| `isNull`     | `boolean` | 表示该单位是否为空或无效      |

***

## 4. 与 HealthQuantitySample 联合使用

配合 `HealthUnit`，你可以创建或读取 `HealthQuantitySample` 实例的值。

### 创建样本示例

```ts
const unit = HealthUnit.kilocalorie()

const sample = HealthQuantitySample.create({
  type: 'activeEnergyBurned',
  startDate: new Date('2025-07-04T10:00:00'),
  endDate: new Date('2025-07-04T10:30:00'),
  value: 150,
  unit: unit,
})
```

### 读取样本值（使用自定义单位）

```ts
const valueInJoules = sample.quantityValue(HealthUnit.joule())
```

***

## 5. 常用单位参考

| 类别  | 示例方法                             |
| --- | -------------------------------- |
| 重量  | `gram()`, `ounce()`, `pound()`   |
| 长度  | `meter()`, `inch()`, `mile()`    |
| 体积  | `liter()`, `fluidOunceUS()`      |
| 时间  | `second()`, `minute()`, `hour()` |
| 能量  | `kilocalorie()`, `joule()`       |
| 电压  | `volt()`, `voltUnit(prefix)`     |
| 温度  | `degreeCelsius()`, `kelvin()`    |
| 无量纲 | `percent()`, `count()`           |
| 光照  | `lux()`, `luxUnit(prefix)`       |

***

## 6. 示例：构建复合单位样本

```ts
// 构建一个速率单位 (steps / minute)
const stepsPerMinute = HealthUnit.count().divided(HealthUnit.minute())

const stepSample = HealthQuantitySample.create({
  type: 'stepCount',
  startDate: new Date(),
  endDate: new Date(),
  value: 120,
  unit: stepsPerMinute,
})
```

***

## 7. 示例：单位字符串解析和检查

```ts
const unit = HealthUnit.fromString('g/mL')
console.log(unit.unitString) // 输出: g/mL
console.log(unit.isNull)     // false
```

***

## 8. `Health.preferredUnits()` 方法

用于获取系统或用户在健康应用中为一个或多个 `HealthQuantityType` 设置的**首选显示单位**。此方法可帮助你在界面中展示符合用户习惯的健康数据（例如体重显示为公斤或磅）。

***

### 方法签名

```ts
function preferredUnits(
  quantityTypes: HealthQuantityType[]
): Promise<Record<HealthQuantityType, HealthUnit>>
```

***

### 参数

| 参数名             | 类型                     | 说明                                    |
| --------------- | ---------------------- | ------------------------------------- |
| `quantityTypes` | `HealthQuantityType[]` | 健康数量类型数组，例如 `"bodyMass"`、`"height"` 等 |

***

### 返回值

返回一个 `Promise`，解析后是一个对象 (`Record`)，每个键为 `HealthQuantityType`，对应的值为该类型的 `HealthUnit`（单位），代表用户设置的首选单位。

***

### 错误处理

如果无法获取首选单位，则会抛出异常。

***

### 示例代码

```ts
const types: HealthQuantityType[] = ["bodyMass", "height", "dietaryEnergyConsumed"]

const preferred = await Health.preferredUnits(types)

const bodyMassUnit = preferred["bodyMass"]         // 可能为 kilogram 或 pound
const heightUnit = preferred["height"]             // 可能为 meter 或 inch
const energyUnit = preferred["dietaryEnergyConsumed"] // 可能为 kilocalorie

console.log("用户首选单位：")
console.log("体重：", bodyMassUnit)
console.log("身高：", heightUnit)
console.log("能量摄入：", energyUnit)
```

***

### 使用提示

- 首选单位可能因用户的区域设置或设备偏好而异。
- 若要提供符合用户期望的健康数据展示，建议在界面展示前调用此方法。
- 如果某些类型不被支持，返回的结果中可能会省略对应的键。
