# HealthActivitySummary

The `HealthActivitySummary` class provides an interface for accessing daily summaries of user activity as recorded by the Apple Health system. This includes move, exercise, and stand metrics, and optionally supports both energy-based and time-based activity move goals.

This class is useful for apps that aim to present a user's daily activity rings or generate daily fitness reports.

***

## Use Cases

- Displaying daily activity ring progress (Move, Exercise, Stand)
- Comparing user activity against daily goals
- Building custom health dashboards and fitness visualizations
- Providing trend analysis or goal reminders

***

## Class: `HealthActivitySummary`

### Properties

| Property           | Type                     | Description                                                                                                           |
| ------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `dateComponents`   | `DateComponents`         | Represents the calendar date associated with this activity summary.                                                   |
| `activityMoveMode` | `HealthActivityMoveMode` | Indicates the move mode used for this summary — either active energy (`activeEnergy`) or move time (`appleMoveTime`). |

***

### Methods

Each of the following methods returns a numeric value representing either the achieved metric or the goal for that metric on the specified date. All values are returned in the unit specified by the caller.

#### `activeEnergyBurned(unit: HealthUnit): number`

Returns the amount of active energy burned for the day in the given unit (e.g., kilocalories).

#### `activeEnergyBurnedGoal(unit: HealthUnit): number`

Returns the daily goal for active energy burned in the given unit.

> Only valid when `activityMoveMode` is `HealthActivityMoveMode.activeEnergy`.

***

#### `appleMoveTime(unit: HealthUnit): number`

Returns the duration of movement (in minutes or seconds) tracked by the Apple Watch's move time mode.

#### `appleMoveTimeGoal(unit: HealthUnit): number`

Returns the goal for move time on the current day.

> Only valid when `activityMoveMode` is `HealthActivityMoveMode.appleMoveTime`.

***

#### `appleExerciseTime(unit: HealthUnit): number`

Returns the total time spent in exercise (typically in minutes), as measured by the Apple Watch.

#### `appleExerciseTimeGoal(unit: HealthUnit): number`

Returns the exercise time goal for the current day.

***

#### `appleStandHours(unit: HealthUnit): number`

Returns the number of hours in which the user stood and moved for at least one minute.

#### `appleStandHoursGoal(unit: HealthUnit): number`

Returns the user's stand hours goal for the day (typically 12).

***

## Example Usage

```ts
async function showTodaySummary() {
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)

  const start = DateComponents.fromDate(startDate)
  const end = DateComponents.fromDate(startDate)
  end.date += 1

  const summaries = await Health.queryActivitySummaries({
    start, // today
    end,
  })

  if (summaries.length === 0) {
    console.log('No activity summary available for today.')
    return
  }

  const summary = summaries[0]

  console.log('Date:', summary.dateComponents)
  console.log('Move Mode:', summary.activityMoveMode)

  const kcal = summary.activeEnergyBurned(HealthUnit.kilocalorie())
  const kcalGoal = summary.activeEnergyBurnedGoal(HealthUnit.kilocalorie())

  console.log(`Active Energy Burned: ${kcal} / ${kcalGoal} kcal`)
  console.log(`Exercise Time: ${summary.appleExerciseTime(HealthUnit.minute())} min`)
  console.log(`Stand Hours: ${summary.appleStandHours(HealthUnit.count())} hr`)
}
```

***

## Notes

- `HealthActivitySummary` does not store historical trend data. Use multiple summaries to build a timeline.
- Depending on the user's Apple Watch settings, the move goal can be based on energy burned or move time.
- All returned values are numeric and can be formatted or converted further based on your needs.
- `HealthUnit` must match the type of data requested. For time-based values, use `HealthUnit.minute()` or `HealthUnit.second()`. For count-based values like stand hours, use `HealthUnit.count()`.
