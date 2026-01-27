# 重复规则

这些与重复相关的类型和类（`RecurrenceFrequency`、`RecurrenceDayOfWeek`、`RecurrenceWeekday`、`RecurrenceEnd` 以及 `RecurrenceRule`）允许你在 Scripting 中为事件和提醒定义并管理重复模式。通过这些类型和类，你可以设置重复间隔、指定重复的特定日期或月份，以及定义结束条件。

## 重复类型和类

### 1. `RecurrenceFrequency`

`RecurrenceFrequency` 用于定义事件或提醒的重复频率。可选值如下：

- `daily`: 每天重复。
- `weekly`: 每周重复。
- `monthly`: 每月重复。
- `yearly`: 每年重复。

此类型通常作为 `RecurrenceRule` 类中的一个属性，用来指定重复发生的频率。

**使用示例：**

```ts
const frequency: RecurrenceFrequency = "weekly"
```

### 2. `RecurrenceWeekday`

`RecurrenceWeekday` 是一个枚举类型，表示一周中的某一天。它可以让你在周重复模式下指定事件重复的具体星期几。可用值包括：

- `"sunday"`, `"monday"`, `"tuesday"`, `"wednesday"`, `"thursday"`, `"friday"`, `"saturday"`

**使用示例：**

```ts
const weekday: RecurrenceWeekday = "monday"
```

### 3. `RecurrenceDayOfWeek`

`RecurrenceDayOfWeek` 允许你指定某个特定的工作日（weekday），并可选地配合 `weekNumber` 一起使用。\
在更复杂的周重复模式中，如果你想指定某个月的某个特定星期几（例如，每月的第二个星期二），就可以用到这个类型。

`RecurrenceDayOfWeek` 可以是以下两种形式之一：

- 一个简单的 `RecurrenceWeekday`（例如 `"monday"`），或
- 一个对象，包含：
  - `weekday`: 一个 `RecurrenceWeekday`（如 `"monday"`）
  - `weekNumber`: 一个数字，用来表示该星期几在当月或当年出现的次序（正数代表从头数，负数代表从尾数）。例如，`1` 表示第一个出现的星期几，`-1` 表示最后一个出现的星期几。

**使用示例：**

```ts
const dayOfWeek: RecurrenceDayOfWeek = { weekday: "tuesday", weekNumber: 2 }
```

### 4. `RecurrenceEnd`

`RecurrenceEnd` 用于定义重复规则何时结束。它提供了两种结束重复的方式：

- `fromCount(count: number)`: 在重复了指定次数后结束。
- `fromDate(date: Date)`: 在某个特定日期结束。

这在需要限制事件或提醒的重复次数或日期时非常有用。

#### RecurrenceEnd 方法

- **fromCount(count)**: 基于重复次数创建结束条件。
  ```ts
  const endByCount = RecurrenceEnd.fromCount(10)
  ```

- **fromDate(date)**: 基于具体日期创建结束条件。
  ```ts
  const endByDate = RecurrenceEnd.fromDate(new Date("2024-12-31"))
  ```

### 5. `RecurrenceRule`

`RecurrenceRule` 用来定义事件或提醒的完整重复模式，包括重复频率、间隔、指定的日期、月份，以及可选的结束条件等。

#### RecurrenceRule 属性

- **identifier**: `string` – 该重复规则的唯一标识符。
- **frequency**: `RecurrenceFrequency` – 重复的频率（`daily`, `weekly`, `monthly`, `yearly`）。
- **interval**: `number` – 重复间的间隔（例如，每 2 周一次），必须大于 0。
- **recurrenceEnd**: `RecurrenceEnd (可选)` – 指定重复何时结束。
- **firstDayOfTheWeek**: `number` – 用来表示一周的起始日。
- **daysOfTheWeek**: `RecurrenceDayOfWeek[] (可选)` – 指定一周中的哪些天需要重复。
- **daysOfTheMonth**: `number[] (可选)` – 指定一个月中哪些日期需要重复（1 到 31 或 -1 到 -31）。
- **daysOfTheYear**: `number[] (可选)` – 指定一年中的哪些天需要重复。
- **weeksOfTheYear**: `number[] (可选)` – 指定一年中的哪些周需要重复。
- **monthsOfTheYear**: `number[] (可选)` – 指定一年中的哪些月份需要重复。
- **setPositions**: `number[] (可选)` – 用于在频率周期内筛选特定序号位置的重复。

#### RecurrenceRule 方法

- **create(options)**: 使用指定的选项创建一个 `RecurrenceRule` 实例。
  - **Options**:
    - **frequency**: 重复的频率（如 `daily`、`weekly`）。
    - **interval**: 重复的间隔（如每 2 天）。
    - **daysOfTheWeek**: `RecurrenceDayOfWeek` 数组。
    - **daysOfTheMonth**: 月中某些特定日期的数组。
    - **monthsOfTheYear**: 一年中某些特定月份的数组。
    - **weeksOfTheYear**: 一年中某些特定周的数组。
    - **daysOfTheYear**: 一年中某些特定天的数组。
    - **setPositions**: 指定用于筛选重复位置的序号数组。
    - **end**: 指定何时结束重复的规则。

**示例：**

```ts
const rule = RecurrenceRule.create({
  frequency: "monthly",
  interval: 1,
  daysOfTheWeek: [{ weekday: "monday", weekNumber: 1 }],
  end: RecurrenceEnd.fromCount(10)
})
```

## 综合运用

要使用这些类型来创建带有重复模式的事件或提醒，可以按照以下步骤：

1. **定义重复频率**：设置 `RecurrenceFrequency` 来指定事件或提醒的重复频率。
2. **指定日期或月份**：使用 `RecurrenceWeekday`、`RecurrenceDayOfWeek`、`daysOfTheMonth` 等来确定具体的重复日期。
3. **设置间隔**：通过 `interval` 控制基于频率的重复间隔。
4. **定义结束条件**（可选）：使用 `RecurrenceEnd` 指定重复何时终止。
5. **创建规则**：通过 `RecurrenceRule.create()` 并传入相关配置选项，生成最终的重复规则。

### 示例：每月的第二个星期二开会，持续 6 个月

```ts
const recurrenceRule = RecurrenceRule.create({
  frequency: "monthly",
  interval: 1,
  daysOfTheWeek: [{ weekday: "tuesday", weekNumber: 2 }],
  end: RecurrenceEnd.fromCount(6)
})

// 将 recurrenceRule 添加到你的事件或提醒中
event.addRecurrenceRule(recurrenceRule)
await event.save()
```

此示例中，`RecurrenceRule` 定义了每个月的第二个星期二重复一次的会议，共重复六次后停止。
