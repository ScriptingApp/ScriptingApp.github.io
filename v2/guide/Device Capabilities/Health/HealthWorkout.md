# HealthWorkout

The `HealthWorkout` class provides a high-level interface for accessing and analyzing workout data from Apple Health. A workout represents a full session of physical activity, such as running, swimming, or cycling, recorded between a start and end time, and may include additional events and aggregated statistics.

***

## Use Cases

- Retrieve and display workout history
- Analyze workout types and durations
- Correlate workout sessions with metrics such as heart rate, calories burned, or distance
- Visualize workout events like pauses, resumes, laps, and segments
- Access health statistics collected during the workout session

***

## Properties

| Property              | Type                                                   | Description                                                                                      |
| --------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `uuid`                | `string`                                               | A unique identifier for the workout instance.                                                    |
| `workoutActivityType` | `HealthWorkoutActivityType`                            | The type of activity, such as running, swimming, yoga, etc.                                      |
| `startDate`           | `Date`                                                 | The start time of the workout session.                                                           |
| `endDate`             | `Date`                                                 | The end time of the workout session.                                                             |
| `duration`            | `number`                                               | The duration of the workout in seconds.                                                          |
| `metadata`            | `Record<string, any> \| null`                          | Optional metadata, which may include the source app, device, or user-defined tags.               |
| `workoutEvents`       | `HealthWorkoutEvent[] \| null`                         | An array of workout events such as pauses, laps, or segments, captured during the session.       |
| `allStatistics`       | `Record<HealthQuantityType, HealthStatistics \| null>` | A dictionary mapping quantity types to statistics recorded during the workout (e.g. heart rate). |

***

## Related Types

### `HealthWorkoutActivityType`

Represents the type of physical activity, such as:

- `running`
- `walking`
- `cycling`
- `swimming`
- `yoga`
- ... and many more (see `HealthWorkoutActivityType` documentation)

### `HealthWorkoutEvent`

Represents a specific event during the workout, such as:

- pause
- resume
- motion paused/resumed
- lap or segment markers

### `HealthStatistics`

Provides calculated metrics such as:

- `averageQuantity()`
- `sumQuantity()`
- `maximumQuantity()`
- `minimumQuantity()`
- `mostRecentQuantity()`

These are based on health data samples (e.g., heart rate, energy burned) during the workout's time interval.

***

## Example Usage

```ts
function displayWorkoutSummary(workout: HealthWorkout) {
  console.log(`Workout ID: ${workout.uuid}`)
  console.log(`Activity Type: ${workout.workoutActivityType}`)
  console.log(`Start: ${workout.startDate.toISOString()}`)
  console.log(`End: ${workout.endDate.toISOString()}`)
  console.log(`Duration: ${(workout.duration / 60).toFixed(1)} minutes`)

  if (workout.metadata) {
    console.log(`Metadata: ${JSON.stringify(workout.metadata)}`)
  }

  if (workout.workoutEvents) {
    for (const event of workout.workoutEvents) {
      console.log(`Event: ${HealthWorkoutEventType[event.type]} at ${event.dateInterval.start.toISOString()}`)
    }
  }

  const heartRateStats = workout.allStatistics["heartRate"]
  if (heartRateStats) {
    console.log(`Average Heart Rate: ${heartRateStats.averageQuantity("count/min")} bpm`)
  }
}
```

***

## Notes

- `HealthWorkout` instances are typically retrieved using query APIs such as `Health.queryWorkouts()` (if available in the framework).
- The `allStatistics` property provides quick access to summary data without needing to query samples manually.
- Use the `workoutEvents` property to reconstruct the timeline of activity (e.g., when the user paused or resumed).
