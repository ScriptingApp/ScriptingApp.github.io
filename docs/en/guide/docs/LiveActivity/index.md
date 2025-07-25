---
title: LiveActivity
---
The `LiveActivity` API enables you to display real-time, dynamic information from your script on the Lock Screen and, where supported, in the Dynamic Island on iOS devices. It provides a structured interface to start, update, and end Live Activities, and observe their state throughout their lifecycle.

---

## Type Definitions

### `LiveActivityState`

Represents the current lifecycle state of a Live Activity.

```ts
type LiveActivityState = 'active' | 'dismissed' | 'ended' | 'stale'
```

* `active`: The Live Activity is visible and actively receiving updates.
* `ended`: The Live Activity has been ended, and no further updates will occur. It may still be visible.
* `dismissed`: The Live Activity has ended and is no longer visible, it has been removed by the user or the system.
* `stale`: The Live Activity is still visible, but its data is outdated. Consider updating the content.

---

### `LiveActivityDetail`

Describes a specific Live Activity instance.

```ts
type LiveActivityDetail = {
  id: string
  state: LiveActivityState
}
```

* `id`: A unique identifier for the Live Activity.
* `state`: The current state of the Live Activity.

---

### `LiveActivityUI`

Describes the UI layout of a Live Activity, for both Lock Screen and Dynamic Island presentation.

```ts
type LiveActivityUI = {
  content: VirtualNode
  expanded: {
    leading?: VirtualNode
    trailing?: VirtualNode
    center?: VirtualNode
    bottom?: VirtualNode
  }
  compactLeading: VirtualNode
  compactTrailing: VirtualNode
  minimal: VirtualNode
}
```

* `content`: The main view shown on the Lock Screen and as a banner on unsupported Dynamic Island devices.
* `expanded`: The expanded Dynamic Island layout with sections:

  * `leading`: Left-aligned content.
  * `trailing`: Right-aligned content.
  * `center`: Center-aligned content below the TrueDepth camera.
  * `bottom`: Content below the leading, trailing, and center areas.
* `compactLeading`: The compact leading view in the Dynamic Island.
* `compactTrailing`: The compact trailing view in the Dynamic Island.
* `minimal`: The minimal view used when the Dynamic Island is collapsed.

---

### `LiveActivityUIBuilder<T>`

A function that builds a `LiveActivityUI` layout using dynamic attributes of type `T`.

```ts
interface LiveActivityUIBuilder<T> {
  (attributes: T): LiveActivityUI
}
```

---

### `LiveActivityOptions`

Optional configuration used when starting a Live Activity.

```ts
type LiveActivityOptions = {
  staleDate?: number
  relevanceScore?: number
}
```

* `staleDate`: A timestamp after which the system marks the activity as `stale`.
* `relevanceScore`: A number indicating display priority for multiple Live Activities. Higher scores appear more prominently.

---

### `LiveActivityUpdateOptions`

Extends `LiveActivityOptions` with alert configuration.

```ts
type LiveActivityUpdateOptions = LiveActivityOptions & {
  alert?: {
    title: string
    body: string
  }
}
```

* `alert.title`: Short title for the Apple Watch alert when updating the activity.
* `alert.body`: Main text for the Apple Watch alert.

---

### `LiveActivityEndOptions`

Extends `LiveActivityOptions` with dismissal configuration.

```ts
type LiveActivityEndOptions = LiveActivityOptions & {
  dismissTimeInterval?: number
}
```

* `dismissTimeInterval`:

  * Not provided: uses default system policy (up to 4 hours).
  * `<= 0`: immediate removal.
  * `> 0`: removal occurs after the specified interval or 4 hours, whichever is earlier.

---

## Class: `LiveActivity<T>`

Manages the lifecycle of a Live Activity.

```ts
class LiveActivity<T> {
  constructor(builder: LiveActivityUIBuilder<T>)
}
```

### Properties

* `activityId: string | undefined`
  The unique identifier of the activity. Available after `start()` is successfully called.

* `started: boolean`
  Whether the activity has been started.

---

### Methods

#### `start(attributes: T, options?: LiveActivityOptions): Promise<boolean>`

Starts the Live Activity.

* `attributes`: Dynamic data for rendering the activity.
* `options`: Optional configuration for relevance and stale date.
* Returns a Promise resolving to `true` if the activity starts successfully.

#### `update(attributes: T, options?: LiveActivityUpdateOptions): Promise<boolean>`

Updates the activity’s content.

* `attributes`: Updated dynamic attributes.
* `options`: Optional configuration and alert.
* Returns a Promise resolving to `true` on success.

#### `end(attributes: T, options?: LiveActivityEndOptions): Promise<boolean>`

Ends the Live Activity.

* `attributes`: Final set of attributes to display before dismissal.
* `options`: Optional dismissal timing.
* Returns a Promise resolving to `true` on success.

#### `getActivityState(): Promise<LiveActivityState | null>`

Retrieves the current state of this Live Activity.

#### `addUpdateListener(listener: (state: LiveActivityState) => void): void`

Adds a listener for state changes in this activity.

#### `removeUpdateListener(listener: (state: LiveActivityState) => void): void`

Removes a previously added update listener.

---

### Static Methods

#### `areActivitiesEnabled(): Promise<boolean>`

Checks whether Live Activities are supported and enabled on the current device.

#### `addActivitiesEnabledListener(listener: (enabled: boolean) => void): void`

Adds a listener to observe availability changes.

#### `removeActivitiesEnabledListener(listener: (enabled: boolean) => void): void`

Removes a previously added availability listener.

#### `addActivityUpdateListener(listener: (detail: LiveActivityDetail) => void): void`

Adds a global listener for updates to any Live Activity.

#### `removeActivityUpdateListener(listener: (detail: LiveActivityDetail) => void): void`

Removes a global update listener.

#### `getActivityState(activityId: string): Promise<LiveActivityState | null>`

Returns the state of a Live Activity with the given `activityId`.

#### `getAllActivities(): Promise<LiveActivityDetail[]>`

Retrieves all current Live Activities.

#### `getAllActivitiesIds(): Promise<string[]>`

Returns a list of all active Live Activity IDs.

#### `endAllActivities(options?: LiveActivityEndOptions): Promise<boolean>`

Ends all currently active Live Activities.

#### `from<T>(activityId: string, builder: LiveActivityUIBuilder<T>): Promise<LiveActivity<T> | null>`

Recreates a `LiveActivity` instance using an existing `activityId`.

* Useful when a script reruns and needs to restore a previously started activity.

---

## Usage Examples

### Example 1: Starting a Live Activity

```ts
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

await liveActivity.start({
  status: "Tracking delivery",
  eta: "20 min",
  icon: "truck.box.badge.clock"
})
```

---

### Example 2: Updating a Live Activity

```ts
await liveActivity.update(
  {
    status: "Arriving soon",
    eta: "10 min",
    icon: "truck.box.badge.clock"
  },
  {
    alert: {
      title: "Order Update",
      body: "Your order is arriving soon!"
    }
  }
)
```

---

### Example 3: Ending a Live Activity

```ts
await liveActivity.end(
  {
    status: "Delivered",
    eta: "0 min",
    icon: "checkmark.circle"
  },
  {
    dismissTimeInterval: 0
  }
)
```
