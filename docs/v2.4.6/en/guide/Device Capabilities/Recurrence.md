---
title: Recurrence
description: The recurrence-related types and classes allow you to define and manage recurring patterns for events and reminders.

---

The recurrence-related types and classes (`RecurrenceFrequency`, `RecurrenceDayOfWeek`, `RecurrenceWeekday`, `RecurrenceEnd`, and `RecurrenceRule`) allow you to define and manage recurring patterns for events and reminders in the `Scripting` app. These types and classes make it possible to set up recurrence intervals, specify days or months for recurring patterns, and define end conditions.

## Recurrence Types and Classes

### 1. `RecurrenceFrequency`

`RecurrenceFrequency` defines the frequency with which an event or reminder repeats. The frequency can be one of the following values:

- `daily`: Repeats every day.
- `weekly`: Repeats every week.
- `monthly`: Repeats every month.
- `yearly`: Repeats every year.

This type is used as a property within the `RecurrenceRule` class to specify how often the recurrence should occur.

**Example Usage:**

```ts
const frequency: RecurrenceFrequency = "weekly"
```

### 2. `RecurrenceWeekday`

`RecurrenceWeekday` is an enumeration representing the days of the week. It allows you to specify which day or days an event should recur on within a weekly pattern. The values are:

- `"sunday"`, `"monday"`, `"tuesday"`, `"wednesday"`, `"thursday"`, `"friday"`, `"saturday"`

**Example Usage:**

```ts
const weekday: RecurrenceWeekday = "monday"
```

### 3. `RecurrenceDayOfWeek`

`RecurrenceDayOfWeek` allows for specifying a particular weekday, optionally combined with a `weekNumber`. This type is useful in more complex weekly recurrence patterns where you want to specify both the weekday and its occurrence within a month (like the second Tuesday of each month).

`RecurrenceDayOfWeek` can either be:
- A `RecurrenceWeekday`, or
- An object containing:
  - `weekday`: A `RecurrenceWeekday` (e.g., `"monday"`)
  - `weekNumber`: A number indicating which occurrence of the weekday (positive or negative for backward counting). For example, `1` is the first occurrence, `-1` is the last occurrence.

**Example Usage:**

```ts
const dayOfWeek: RecurrenceDayOfWeek = { weekday: "tuesday", weekNumber: 2 }
```

### 4. `RecurrenceEnd`

`RecurrenceEnd` defines when a recurrence rule should stop. It provides two options for ending a recurrence:

- `fromCount(count: number)`: Ends the recurrence after a specified number of occurrences.
- `fromDate(date: Date)`: Ends the recurrence on a specific date.

This is useful when setting a limit for how many times the event or reminder should recur.

#### RecurrenceEnd Methods

- **fromCount(count)**: Creates a count-based recurrence end.
  ```ts
  const endByCount = RecurrenceEnd.fromCount(10)
  ```

- **fromDate(date)**: Creates a date-based recurrence end.
  ```ts
  const endByDate = RecurrenceEnd.fromDate(new Date("2024-12-31"))
  ```

### 5. `RecurrenceRule`

`RecurrenceRule` defines the complete pattern for a recurring event or reminder, including its frequency, interval, specific days, months, and an optional end condition.

#### RecurrenceRule Properties

- **identifier**: `string` – Unique identifier for the recurrence rule.
- **frequency**: `RecurrenceFrequency` – Frequency of recurrence (daily, weekly, monthly, yearly).
- **interval**: `number` – Interval between recurrences (e.g., every 2 weeks). Must be greater than 0.
- **recurrenceEnd**: `RecurrenceEnd (optional)` – Specifies the end of the recurrence.
- **firstDayOfTheWeek**: `number` – The day treated as the start of the week.
- **daysOfTheWeek**: `RecurrenceDayOfWeek[] (optional)` – Specific days of the week for the recurrence.
- **daysOfTheMonth**: `number[] (optional)` – Specific days of the month (values from 1 to 31, or -1 to -31).
- **daysOfTheYear**: `number[] (optional)` – Specific days of the year.
- **weeksOfTheYear**: `number[] (optional)` – Specific weeks of the year.
- **monthsOfTheYear**: `number[] (optional)` – Specific months of the year.
- **setPositions**: `number[] (optional)` – Filters recurrences to specific positions within the frequency period.

#### RecurrenceRule Method

- **create(options)**: Creates a `RecurrenceRule` instance using the specified options.
  - **Options**:
    - **frequency**: Frequency of the recurrence (e.g., `daily`, `weekly`).
    - **interval**: Interval for the recurrence (e.g., every 2 days).
    - **daysOfTheWeek**: Array of `RecurrenceDayOfWeek`.
    - **daysOfTheMonth**: Array of specific days in the month.
    - **monthsOfTheYear**: Array of specific months for recurrence.
    - **weeksOfTheYear**: Array of specific weeks for recurrence.
    - **daysOfTheYear**: Array of specific days in the year.
    - **setPositions**: Array of ordinal numbers for filtering recurrences.
    - **end**: Specifies the end of the recurrence rule.

```ts
const rule = RecurrenceRule.create({
  frequency: "monthly",
  interval: 1,
  daysOfTheWeek: [{ weekday: "monday", weekNumber: 1 }],
  end: RecurrenceEnd.fromCount(10)
})
```

## Using Recurrence Types and Classes Together

To create a recurring event or reminder with these types, follow these steps:

1. **Define the Frequency**: Set a `RecurrenceFrequency` to specify how often the event or reminder should occur.
2. **Specify Days or Months**: Use `RecurrenceWeekday`, `RecurrenceDayOfWeek`, `daysOfTheMonth`, etc., to specify exact days.
3. **Set the Interval**: Use `interval` to control how often the event or reminder should recur based on the frequency.
4. **Define the End Condition** (optional): Use `RecurrenceEnd` to specify when the recurrence should stop.
5. **Create the Rule**: Use `RecurrenceRule.create()` with the configured options.

### Example: Recurring Meeting Every Second Tuesday for 6 Months

```ts
const recurrenceRule = RecurrenceRule.create({
  frequency: "monthly",
  interval: 1,
  daysOfTheWeek: [{ weekday: "tuesday", weekNumber: 2 }],
  end: RecurrenceEnd.fromCount(6)
})

// Add recurrenceRule to your event or reminder
event.addRecurrenceRule(recurrenceRule)
await event.save()
```

This example creates a `RecurrenceRule` for an event that occurs every second Tuesday each month, ending after six occurrences. 
