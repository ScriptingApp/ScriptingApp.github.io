# HealthWorkoutEvent PRO

The `HealthWorkoutEvent` class provides an interface for accessing workout-related events in Apple Health data. Each event represents a specific moment or action within a workout session, such as when the workout is paused, resumed, or marked with a lap or milestone.

***

## Use Cases

- Analyzing workout flow: determine when a user paused or resumed a workout.
- Measuring active versus idle workout time.
- Identifying workout laps or marked segments.
- Supporting custom logic in workout summaries or visualizations.

***

## Enum: `HealthWorkoutEventType`

This enum defines the various types of workout events.

| Value | Name                   | Description                                                                 |
| ----- | ---------------------- | --------------------------------------------------------------------------- |
| `1`   | `pause`                | Indicates that the workout was paused manually.                             |
| `2`   | `resume`               | Indicates that the workout was resumed after a pause.                       |
| `3`   | `lap`                  | Marks a lap during the workout, useful for sports like running or swimming. |
| `4`   | `marker`               | A generic marker placed by the system or user for reference.                |
| `5`   | `motionPaused`         | Indicates that the workout was automatically paused due to no movement.     |
| `6`   | `motionResumed`        | Workout automatically resumed after detecting motion.                       |
| `7`   | `segment`              | Marks the start of a new workout segment, e.g., during interval training.   |
| `8`   | `pauseOrResumeRequest` | A system-generated request to pause or resume, not a guaranteed action.     |

***

## Class: `HealthWorkoutEvent`

### Properties

| Property       | Type                          | Description                                                          |
| -------------- | ----------------------------- | -------------------------------------------------------------------- |
| `type`         | `HealthWorkoutEventType`      | The specific event type (e.g., pause, lap, motionPaused).            |
| `dateInterval` | `HealthDateInterval`          | The time interval during which this event occurred.                  |
| `metadata`     | `Record<string, any> \| null` | Optional metadata describing additional information about the event. |

> Note: `HealthDateInterval` contains `start`, `end`, and `duration` (in seconds).

***

## Example

### Logging Workout Events

```ts
function logWorkoutEvent(event: HealthWorkoutEvent) {
  const { type, dateInterval, metadata } = event
  const start = dateInterval.start.toISOString()
  const end = dateInterval.end.toISOString()
  const duration = dateInterval.duration

  console.log(`Event Type: ${HealthWorkoutEventType[type]}`)
  console.log(`Start: ${start}`)
  console.log(`End: ${end}`)
  console.log(`Duration (sec): ${duration}`)

  if (metadata) {
    console.log(`Metadata: ${JSON.stringify(metadata)}`)
  }
}
```

***

## Notes

- Workout events are typically part of a `HealthWorkout` instance, which includes these events as an array.
- You can use these events to reconstruct the full timeline of a workout session and determine user behavior.
- Automatic motion detection (pause/resume) is particularly useful for passive workouts such as walking or cycling.
