# Reading Workout Samples

The Scripting app allows you to retrieve **workout sessions** from HealthKit using the global `Health.queryWorkouts()` function. Workouts represent physical activity sessions such as running, walking, swimming, cycling, strength training, and more.

Each workout includes metadata such as duration, activity type, start/end times, and detailed statistics like heart rate, distance, and energy burned.

***

## What Is a Workout?

A **HealthWorkout** record contains:

- `startDate` / `endDate`: The duration of the workout session
- `duration`: Total duration in seconds
- `workoutActivityType`: Enum representing the workout type (e.g., running, walking)
- `metadata`: Optional custom metadata
- `workoutEvents`: Optional array of workout-related events (e.g., pauses, laps)
- `allStatistics`: A dictionary of detailed quantity statistics (e.g., heart rate, distance, calories)

***

## API Overview

```ts
Health.queryWorkouts(
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
    strictStartDate?: boolean
    strictEndDate?: boolean
    sortDescriptors?: Array<{
      key: "startDate" | "endDate" | "duration"
      order?: "forward" | "reverse"
    }>
    requestPermissions?: HealthQuantityType[]
  }
): Promise<HealthWorkout[]>
```

***

## Parameters

| Parameter                           | Description                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| `startDate` / `endDate`             | Optional time range to filter workouts                                              |
| `limit`                             | Maximum number of workouts to return                                                |
| `strictStartDate` / `strictEndDate` | Whether to match the exact start/end dates                                          |
| `sortDescriptors`                   | Sort results by `startDate`, `endDate`, or `duration`                               |
| `requestPermissions`                | An array of health quantity types for which to request permissions before querying. |

***

## Example: Read Recent Workouts

```ts
const workouts = await Health.queryWorkouts({
  startDate: new Date("2025-07-01"),
  endDate: new Date("2025-07-05"),
  sortDescriptors: [{ key: "startDate", order: "reverse" }]
})

for (const workout of workouts) {
  console.log("Workout Type:", workout.workoutActivityType)
  console.log("Start:", workout.startDate)
  console.log("End:", workout.endDate)
  console.log("Duration (min):", workout.duration / 60)

  const heartRate = workout.allStatistics["heartRate"]
  const energy = workout.allStatistics["activeEnergyBurned"]

  if (heartRate) {
    const avgHR = heartRate.averageQuantity(HealthUnit.count().divided(HealthUnit.minute()))
    console.log("Avg Heart Rate:", avgHR)
  }

  if (energy) {
    const kcal = energy.sumQuantity(HealthUnit.kilocalorie())
    console.log("Calories Burned:", kcal)
  }

  console.log("---")
}
```

***

## Accessing Detailed Statistics

The `allStatistics` dictionary provides detailed quantity data recorded during the workout. You can extract values using:

```ts
const stat = workout.allStatistics["heartRate"]
const avg = stat?.averageQuantity(HealthUnit.count().divided(HealthUnit.minute()))
const max = stat?.maximumQuantity(HealthUnit.count().divided(HealthUnit.minute()))
```

Common available statistics include:

- `"heartRate"`
- `"activeEnergyBurned"`
- `"distanceWalkingRunning"`
- `"stepCount"`

***

## Workout Events (Optional)

If recorded, `workout.workoutEvents` contains an array of time-stamped workout events:

```ts
for (const event of workout.workoutEvents || []) {
  console.log("Event:", event.type)
  console.log("From:", event.dateInterval.start)
  console.log("To:", event.dateInterval.end)
}
```

Event types include: pause, resume, lap, segment, motion pause/resume, etc.

***

## Notes

- Each workout is an instance of `HealthWorkout`
- `workoutActivityType` is an enum, which you can map to labels or icons
- If `allStatistics` is missing some keys, the data may not have been recorded by the device/app
- You can combine workout data with category and quantity samples for full activity insights

***

## Summary

To read workouts from HealthKit:

1. Call `Health.queryWorkouts(options)` to get a list of `HealthWorkout` records
2. Use `startDate`, `endDate`, and sorting options to filter and order results
3. Access properties like `duration`, `activityType`, and `allStatistics` for insights
4. Optionally inspect `workoutEvents` and metadata

This API is ideal for analyzing exercise history, generating workout summaries, or visualizing fitness trends.
