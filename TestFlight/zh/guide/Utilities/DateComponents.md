# 日期组件

`DateComponents` 类提供了一种灵活的方式，用于表示和操作日期与时间的各个组成部分，例如年、月、日、小时、分钟、秒等。该类基于 Swift 的 `DateComponents` 实现，并与系统当前日历协同工作。

***

## 构造函数

```ts
new DateComponents(options?)
```

### 参数

构造函数可接收一个可选的 `options` 对象，用于初始化各个日期字段：

```ts
const components = new DateComponents({
  year: 2025,
  month: 6,
  day: 24,
  hour: 9,
  minute: 30
})
```

***

## 静态方法

### `DateComponents.fromDate(date: Date): DateComponents`

从给定的 `Date` 对象中提取所有可用的日期组成部分（年、月、日、小时、分钟、秒、纳秒），返回一个新的 `DateComponents` 实例。

#### 参数

- `date` (`Date`)：需要提取信息的日期对象。

#### 返回

- 包含该日期对应的组成部分的 `DateComponents` 实例。

#### 示例

```ts
const now = new Date()
const components = DateComponents.fromDate(now)
console.log(components.year, components.month)
```

***

### `DateComponents.forHourly(date: Date): DateComponents`

为“每小时重复”的需求创建一个日期组件，仅设置 `minute` 字段。

- 设置字段：`minute`

#### 示例

```ts
const components = DateComponents.forHourly(new Date())
// 每小时的指定分钟触发
```

***

### `DateComponents.forDaily(date: Date): DateComponents`

为“每天重复”的需求创建一个日期组件，设置 `hour` 和 `minute` 字段。

- 设置字段：`hour`, `minute`

#### 示例

```ts
const components = DateComponents.forDaily(new Date())
// 每天的同一时间触发
```

***

### `DateComponents.forWeekly(date: Date): DateComponents`

为“每周重复”的需求创建一个日期组件，设置 `weekday`、`hour`、`minute` 字段。

- 设置字段：`weekday`, `hour`, `minute`

#### 示例

```ts
const components = DateComponents.forWeekly(new Date())
// 每周的相同星期几和时间触发
```

***

### `DateComponents.forMonthly(date: Date): DateComponents`

为“每月重复”的需求创建一个日期组件，设置 `day`、`hour`、`minute` 字段。

- 设置字段：`day`, `hour`, `minute`

#### 示例

```ts
const components = DateComponents.forMonthly(new Date())
// 每月的相同日期和时间触发
```

***

## 属性说明

### 只读属性

- **`date?: Date | null`**
  使用当前组件通过系统日历计算得出的 `Date` 对象。如果无效则为 `null`。

- **`isValidDate: boolean`**
  当前组件组合是否构成一个有效日期。

***

### 可设置的字段

以下所有字段均为可选，可设为 `number` 或 `null`：

- `era`：纪元

- `year`：年份

- `yearForWeekOfYear`：与周数关联的年份

- `quarter`：季度（1 到 4）

- `month`：月份（1 到 12）

- `isLeapMonth`：是否为闰月（布尔值）

- `weekOfMonth`：当前月份中的第几周

- `weekOfYear`：当前年份中的第几周

- `weekday`：星期几（1 = 星期日，2 = 星期一，…，7 = 星期六）

- `weekdayOrdinal`：某星期几在当前月中第几次出现

  #### 示例

  ```ts
  const c = new DateComponents()
  c.weekday = 2           // 星期一
  c.weekdayOrdinal = 1    // 本月的第一个星期一
  ```

- `day`：每月中的某一天

- `hour`：小时（0 到 23）

- `minute`：分钟（0 到 59）

- `second`：秒（0 到 59）

- `nanosecond`：纳秒（0 到 999,999,999）

- `dayOfYear`：一年中的第几天（1 到 366）

***

## 使用示例

```ts
const components = new DateComponents({
  year: 2025,
  month: 12,
  day: 25,
  hour: 10,
  minute: 0
})

if (components.isValidDate) {
  console.log("有效日期:", components.date)
}
```

```ts
const daily = DateComponents.forDaily(new Date())
const weekly = DateComponents.forWeekly(new Date())
```

***

## 注意事项

- `date` 和 `isValidDate` 的计算依赖系统当前的日历设置。
- 若未设置足够字段，可能无法构成一个有效日期。
- 推荐使用 `forHourly`、`forDaily`、`forWeekly`、`forMonthly` 方法快速创建周期性日期组件，适用于通知调度、事件提醒等场景。
