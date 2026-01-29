# HealthUnit

The `HealthUnit` class provides an interface to construct and manipulate various units used in HealthKit. You can create basic units (e.g., grams, meters, liters), apply metric prefixes (e.g., milligrams, kilometers), and perform arithmetic operations like multiplication, division, exponentiation, and inversion.

***

## Enum: `HealthMetricPrefix`

Represents metric prefixes applied to units:

| Enum Value | Symbol | Example    |
| ---------- | ------ | ---------- |
| `none`     | —      | `gram()`   |
| `milli`    | m      | milligram  |
| `centi`    | c      | centimeter |
| `kilo`     | k      | kilometer  |
| `mega`     | M      | megajoule  |
| `micro`    | µ      | microliter |
| `nano`     | n      | nanometer  |

Refer to the full enum for more supported prefixes.

***

## 1. Creating Units

### Basic Units

```ts
const weight = HealthUnit.gram()
const distance = HealthUnit.meter()
const energy = HealthUnit.kilocalorie()
```

### Prefixed Units

```ts
const mg = HealthUnit.gramUnit(HealthMetricPrefix.milli)
const km = HealthUnit.meterUnit(HealthMetricPrefix.kilo)
const mL = HealthUnit.literUnit(HealthMetricPrefix.milli)
```

### Create from Unit String

```ts
const unit = HealthUnit.fromString('kg')
```

***

## 2. Unit Arithmetic

### Multiplication

```ts
const meter = HealthUnit.meter()
const second = HealthUnit.second()
const speed = meter.divided(second) // meters per second
```

### Division

```ts
const bpm = HealthUnit.count().divided(HealthUnit.minute()) // beats per minute
```

### Exponentiation

```ts
const m2 = HealthUnit.meter().raisedToPower(HealthMetricPrefix.none) // square meters
```

### Reciprocal

```ts
const perLiter = HealthUnit.liter().reciprocal() // 1 per liter
```

***

## 3. Unit Properties

| Property     | Type    | Description                                    |
| ------------ | ------- | ---------------------------------------------- |
| `unitString` | string  | String representation of the unit (e.g., "kg") |
| `isNull`     | boolean | Indicates whether the unit is null/invalid     |

***

## 4. Using with `HealthQuantitySample`

Use `HealthUnit` when creating or reading quantity-based health samples.

### Create a Sample

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

### Read Sample in Another Unit

```ts
const valueInJoules = sample.quantityValue(HealthUnit.joule())
```

***

## 5. Common Units Overview

| Category        | Example Methods                           |
| --------------- | ----------------------------------------- |
| Weight          | `gram()`, `pound()`, `ounce()`            |
| Length          | `meter()`, `inch()`, `mile()`             |
| Volume          | `liter()`, `fluidOunceUS()`               |
| Time            | `second()`, `minute()`, `hour()`, `day()` |
| Energy          | `kilocalorie()`, `joule()`                |
| Temperature     | `degreeCelsius()`, `kelvin()`             |
| Voltage         | `volt()`, `voltUnit(prefix)`              |
| Light Intensity | `lux()`, `luxUnit(prefix)`                |
| Dimensionless   | `count()`, `percent()`                    |
| Sound Level     | `decibelAWeightedSoundPressureLevel()`    |

***

## 6. Example: Composite Unit Sample

```ts
// steps per minute
const unit = HealthUnit.count().divided(HealthUnit.minute())

const stepSample = HealthQuantitySample.create({
  type: 'stepCount',
  startDate: new Date(),
  endDate: new Date(),
  value: 120,
  unit: unit,
})
```

***

## 7. Example: Parse from Unit String

```ts
const unit = HealthUnit.fromString('g/mL')
console.log(unit.unitString) // g/mL
console.log(unit.isNull)     // false
```

***

## 8. `Health.preferredUnits()` Method

Retrieves the **user’s preferred display units** for one or more `HealthQuantityType` entries. This is useful when presenting health data in a way that respects the system’s regional and user-specific settings (e.g., showing weight in kilograms vs pounds).

***

### Method Signature

```ts
function preferredUnits(
  quantityTypes: HealthQuantityType[]
): Promise<Record<HealthQuantityType, HealthUnit>>
```

***

### Parameters

| Name            | Type                   | Description                                                         |
| --------------- | ---------------------- | ------------------------------------------------------------------- |
| `quantityTypes` | `HealthQuantityType[]` | An array of health quantity types (e.g., `"bodyMass"`, `"height"`). |

***

### Returns

A `Promise` that resolves to a mapping object (`Record`) where each key is a `HealthQuantityType`, and each value is a corresponding `HealthUnit` representing the user's preferred unit for that type.

***

### Throws

An error if the system fails to determine the preferred units for the given quantity types.

***

### Example

```ts
const types: HealthQuantityType[] = ["bodyMass", "height", "dietaryEnergyConsumed"]

const preferred = await Health.preferredUnits(types)

const bodyMassUnit = preferred["bodyMass"]         // e.g., kilograms or pounds
const heightUnit = preferred["height"]             // e.g., meters or inches
const energyUnit = preferred["dietaryEnergyConsumed"] // e.g., kilocalories

console.log("Preferred units:")
console.log("Weight:", bodyMassUnit)
console.log("Height:", heightUnit)
console.log("Energy:", energyUnit)
```

***

### Usage Notes

- Preferred units may vary across devices depending on locale and user Health app settings.
- Always call this method before displaying health data in the UI if you want to respect the user’s expectations.
- For unsupported or unknown quantity types, the result may omit that key.
