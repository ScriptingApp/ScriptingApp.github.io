# DateComponents

The `DateComponents` class provides a flexible way to represent and manipulate individual components of a date and time value, such as year, month, day, hour, minute, second, and more. This class is modeled after Swift’s `DateComponents` and integrates with the current system calendar.

***

## Constructor

```ts
new DateComponents(options?)
```

### Parameters

The constructor accepts an optional `options` object to initialize date/time fields:

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

## Static Methods

### `DateComponents.fromDate(date: Date): DateComponents`

Creates a `DateComponents` instance by extracting all possible components from a given `Date` object.

#### Parameters

- `date` (`Date`): The source date.

#### Returns

- A `DateComponents` instance with year, month, day, hour, minute, second, and nanosecond set.

#### Example

```ts
const now = new Date()
const components = DateComponents.fromDate(now)
console.log(components.year, components.month)
```

***

### `DateComponents.forHourly(date: Date): DateComponents`

Creates a `DateComponents` instance representing the hourly trigger for scheduling purposes.

- Sets: `minute`

#### Example

```ts
const components = DateComponents.forHourly(new Date())
// Triggers every hour at the same minute as the provided date
```

***

### `DateComponents.forDaily(date: Date): DateComponents`

Creates a `DateComponents` instance representing the daily trigger.

- Sets: `hour`, `minute`

#### Example

```ts
const components = DateComponents.forDaily(new Date())
// Triggers daily at the same hour and minute as the provided date
```

***

### `DateComponents.forWeekly(date: Date): DateComponents`

Creates a `DateComponents` instance for weekly triggers, useful for weekly recurring events.

- Sets: `weekday`, `hour`, `minute`

#### Example

```ts
const components = DateComponents.forWeekly(new Date())
// Triggers weekly on the same weekday at the same time
```

***

### `DateComponents.forMonthly(date: Date): DateComponents`

Creates a `DateComponents` instance representing a monthly trigger.

- Sets: `day`, `hour`, `minute`

#### Example

```ts
const components = DateComponents.forMonthly(new Date())
// Triggers monthly on the same day and time
```

***

## Properties

### Read-only Properties

- **`date?: Date | null`**
  The computed `Date` object based on the current components using the current system calendar. Returns `null` if the components do not form a valid date.

- **`isValidDate: boolean`**
  Indicates whether the current combination of components forms a valid date.

***

### Date and Time Fields

Each of these fields can be initialized via the constructor or set manually afterward. All are `number | null` unless otherwise stated.

- `era`: The era of the date.

- `year`: The year component.

- `yearForWeekOfYear`: The year that corresponds to the week-based calendar.

- `quarter`: The quarter of the year (1 to 4).

- `month`: The month of the year (1 to 12).

- `isLeapMonth`: Optional boolean indicating whether the month is a leap month.

- `weekOfMonth`: The week number within the current month.

- `weekOfYear`: The week number within the current year.

- `weekday`: The day of the week (1 = Sunday, 2 = Monday, ..., 7 = Saturday).

- `weekdayOrdinal`: The ordinal occurrence of the weekday in the month.

  #### Example

  ```ts
  const components = new DateComponents()
  components.weekday = 2             // Monday
  components.weekdayOrdinal = 1      // First Monday of the month
  ```

- `day`: The day of the month.

- `hour`: The hour of the day (0–23).

- `minute`: The minute (0–59).

- `second`: The second (0–59).

- `nanosecond`: The nanosecond part of the time.

- `dayOfYear`: The day of the year (1–366).

***

## Usage Example

```ts
const components = new DateComponents({
  year: 2025,
  month: 12,
  day: 25,
  hour: 10,
  minute: 0
})

if (components.isValidDate) {
  console.log("Valid date:", components.date)
}
```

Or create from a `Date`:

```ts
const now = new Date()
const components = DateComponents.fromDate(now)
console.log(components.hour, components.minute)

const dailyTrigger = DateComponents.forDaily(new Date())
const weeklyTrigger = DateComponents.forWeekly(new Date())
```

***

## Notes

- `date` and `isValidDate` rely on the system’s calendar.
- Use specialized static methods (`forDaily`, `forWeekly`, etc.) for easier creation of recurring triggers.
- `DateComponents` is ideal for scheduling notifications, alarms, calendar events, and more.
