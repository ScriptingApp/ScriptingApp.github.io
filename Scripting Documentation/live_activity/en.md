
The `LiveActivity` interface in Scripting enables your script to present real-time data on the Dynamic Island and Lock Screen, providing quick interactions for you.
---

## Types and Interfaces

### `LiveActivityState`
Defines the state of a Live Activity:
- `active`: The Live Activity is visible and can receive updates.
- `dismissed`: The Live Activity has ended and is no longer visible.
- `ended`: The Live Activity is visible but will no longer update.
- `stale`: The Live Activity's content is outdated and requires an update.

### `LiveActivityDetail`
Provides details for each Live Activity instance.
- **id**: Unique identifier for the activity.
- **state**: Current `LiveActivityState`.

### `LiveActivityUI`
Describes the layout for the Live Activity:
- **content**: The main view shown on the Lock Screen.
- **expanded**: Expanded view components for the Dynamic Island(One of the following must be provided):
  - **leading**: (Optional)Content on the left side.
  - **trailing**: (Optional)Content on the right side.
  - **center**: (Optional)Content centered below the camera.
  - **bottom**: (Optional)Content below all other sections.
- **compactLeading** and **compactTrailing**: Compact views for leading and trailing edges.
- **minimal**: Minimal presentation for a compact view.

### `LiveActivityUIBuilder<T>`
A function that builds the `LiveActivityUI` based on dynamic attributes.

### `LiveActivityOptions`
Options for configuring a Live Activity:
- **staleDate**: Timestamp when the activity is considered outdated.
- **relevanceScore**: Determines the priority of multiple Live Activities.

### `LiveActivityUpdateOptions` and `LiveActivityEndOptions`
Similar to `LiveActivityOptions`, with additional alert configuration for updates and dismissal timing for end options.

---

## LiveActivity Class

### Constructor

```typescript
constructor(builder: LiveActivityUIBuilder<T>)
```
Creates a new Live Activity using a UI builder function.

### Properties

- **activityId**: `string | undefined` - ID of the Live Activity after `start` is executed.
- **started**: `boolean` - Indicates whether the Live Activity has started.

### Methods

#### `start(attributes: T, options?: LiveActivityOptions): Promise<boolean>`
Starts a Live Activity with the specified attributes and options. Returns `true` if successful.

#### `update(attributes: T, options?: LiveActivityUpdateOptions): Promise<boolean>`
Updates the Live Activity's dynamic attributes. Alerts the user if specified in `options`.

#### `end(attributes: T, options?: LiveActivityEndOptions): Promise<boolean>`
Ends an active Live Activity with optional final attributes and end options.

#### `getActivityState(): Promise<LiveActivityState | null>`
Retrieves the current state of the Live Activity.

#### `addUpdateListener(listener: (state: LiveActivityState) => void): void`
Adds a listener for state changes in the Live Activity.

#### `removeUpdateListener(listener: (state: LiveActivityState) => void): void`
Removes the specified update listener.

### Static Methods

- **`areActivitiesEnabled()`**: Checks if Live Activities can be started.
- **`addActivitiesEnabledListener(listener: LiveActivityActivitiesEnabledListener)`**: Adds a listener for changes to activities-enabled status.
- **`getAllActivities()`**: Returns an array of all active Live Activities.
- **`getAllActivitiesIds()`**: Returns the IDs of all active Live Activities.
- **`endAllActivities(options?: LiveActivityEndOptions)`**: Ends all active Live Activities.

---

## Usage Examples

### Example 1: Starting a Live Activity

```typescript
const liveActivity = new LiveActivity(({ status, eta, icon }) => ({
  content: <Text>{status}</Text>,
  expanded: {
    leading: <Text>ETA: {eta}</Text>,
    trailing: <Image systemName={icon} />
  },
  compactLeading: <Text>{eta}</Text>,
  compactTrailing: <Image systemName={icon} />,
  minimal: <Text>{eta}</Text>
}))

await liveActivity.start({ status: "Tracking delivery", eta: "20 min", icon: "truck.box.badge.clock" })
```

### Example 2: Updating a Live Activity

```typescript
await liveActivity.update(
  { status: "Arriving soon", eta: "10 min", icon: "truck.box.badge.clock" },
  {
    alert: {
      title: "Order Update",
      body: "Your order is arriving soon!"
    }
  }
)
```

### Example 3: Ending a Live Activity

```typescript
await liveActivity.end(
  { status: "Delivered", eta: "0 min", icon: "truck.box" },
  { dismissTimeInterval: 5000 }
)
```

In these examples, the attributes `status`, `eta`, and `icon` are defined consistently and used across `start`, `update`, and `end` to ensure the Live Activity UI displays correctly based on the provided data.
