The `Notification` module in the **Scripting** app allows you to schedule, manage, and display local notifications with advanced trigger types, interactive actions, and rich UI capabilities.

---

## Table of Contents

1. [Scheduling Notifications](#scheduling-notifications)
2. [Notification Triggers](#notification-triggers)

   * [TimeIntervalNotificationTrigger](#timeintervalnotificationtrigger)
   * [CalendarNotificationTrigger](#calendarnotificationtrigger)
   * [LocationNotificationTrigger](#locationnotificationtrigger)
3. [Notification Actions](#notification-actions)
4. [Rich Notifications with Custom UI](#rich-notifications-with-custom-ui)
5. [Managing Notifications](#managing-notifications)
6. [NotificationInfo and Request Structure](#notificationinfo-and-request-structure)
7. [Comprehensive Example](#comprehensive-example)

---

## Scheduling Notifications

Use `Notification.schedule` to schedule a local notification. It supports text content, triggers, action buttons, custom UI, and delivery configuration:

```ts
await Notification.schedule({
  title: "Reminder",
  body: "Time to stand up!",
  trigger: new TimeIntervalNotificationTrigger({
    timeInterval: 1800,
    repeats: true
  }),
  actions: [
    {
      title: "OK",
      url: Script.createRunURLScheme("My Script", { acknowledged: true })
    }
  ],
  customUI: false
})
```

### Parameters

| Name                                  | Type                                                                                                          | Description                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `title`                               | `string`                                                                                                      | Required. Notification title.                                                |
| `subtitle`                            | `string?`                                                                                                     | Optional. Additional context.                                                |
| `body`                                | `string?`                                                                                                     | Optional. Main content text.                                                 |
| `badge`                               | `number?`                                                                                                     | Optional. App icon badge count.                                              |
| `silent`                              | `boolean?`                                                                                                    | Optional. Defaults to `true`. Set to `false` to play sound.                  |
| `interruptionLevel`                   | `"active"` \| `"passive"` \| `"timeSensitive"`                                                                | Optional. Defines priority and delivery behavior.                            |
| `userInfo`                            | `Record<string, any>?`                                                                                        | Optional. Custom metadata.                                                   |
| `threadIdentifier`                    | `string?`                                                                                                     | Optional. Identifier for grouping notifications.                             |
| `trigger`                             | `TimeIntervalNotificationTrigger` \| `CalendarNotificationTrigger` \| `LocationNotificationTrigger` \| `null` | Optional. Defines when the notification is delivered.                        |
| `actions`                             | `NotificationAction[]?`                                                                                       | Optional. Action buttons.                                                    |
| `customUI`                            | `boolean?`                                                                                                    | Optional. Enables rich notification interface using `notification.tsx`.      |
| `avoidRunningCurrentScriptWhenTapped` | `boolean?`                                                                                                    | Optional. Prevents the script from running when tapped. Defaults to `false`. |

> **Deprecated:** `triggerTime` and `repeatsType` are deprecated. Use `trigger` instead.

---

## Notification Triggers

### TimeIntervalNotificationTrigger

Triggers a notification after a specified number of seconds.

```ts
new TimeIntervalNotificationTrigger({
  timeInterval: 3600,
  repeats: true
})
```

* `timeInterval`: Delay in seconds.
* `repeats`: Whether it repeats.
* `nextTriggerDate()`: Returns the next expected trigger date.

---

### CalendarNotificationTrigger

Triggers when the current date matches specific calendar components.

```ts
const components = new DateComponents({ hour: 8, minute: 0 })
new CalendarNotificationTrigger({
  dateMatching: components,
  repeats: true
})
```

* Set any of `year`, `month`, `day`, `hour`, etc.
* Useful for daily, weekly, or one-time schedules.

---

### LocationNotificationTrigger

Triggers when entering or exiting a geographic region.

```ts
new LocationNotificationTrigger({
  region: {
    identifier: "Work",
    center: { latitude: 37.7749, longitude: -122.4194 },
    radius: 100,
    notifyOnEntry: true,
    notifyOnExit: false
  },
  repeats: false
})
```

* Fires based on entering/exiting the specified region.

---

## Notification Actions

Use the `actions` parameter to define buttons shown when a notification is expanded.

```ts
actions: [
  {
    title: "Open Details",
    url: Script.createRunURLScheme("Details Script", { fromNotification: true })
  },
  {
    title: "Dismiss",
    url: Script.createRunURLScheme("Dismiss Script", { dismissed: true }),
    destructive: true
  }
]
```

* Use `Script.createRunURLScheme(scriptName, parameters)` to generate the correct callback URLs.
* Actions are displayed when long-pressing or pulling down the notification.

---

## Rich Notifications with Custom UI

You can provide a JSX-based interface for expanded notifications by:

1. Setting `customUI: true` in `Notification.schedule`.
2. Creating a `notification.tsx` file in your script.
3. Calling `Notification.present(element)` inside that file.

### `Notification.present(...)`

```ts
Notification.present(element: JSX.Element): void
```

* Must be called within `notification.tsx`.
* Renders the provided element as the notification's expanded UI.

---

### Example `notification.tsx`

```tsx
import { Notification, VStack, Text, Button } from 'scripting'

function NotificationView() {
  return (
    <VStack>
      <Text>Need to complete your task?</Text>
      <Button title="Done" action={() => console.log("Task completed")} />
      <Button title="Later" action={() => console.log("Task postponed")} />
    </VStack>
  )
}

Notification.present(<NotificationView />)
```

---

## Managing Notifications

| Method                                 | Description                                           |
| -------------------------------------- | ----------------------------------------------------- |
| `getAllDelivereds()`                   | Returns all delivered notifications.                  |
| `getAllPendings()`                     | Returns all scheduled but undelivered notifications.  |
| `removeAllDelivereds()`                | Removes all delivered notifications.                  |
| `removeAllPendings()`                  | Cancels all pending notifications.                    |
| `removeDelivereds(ids)`                | Removes delivered notifications with matching IDs.    |
| `removePendings(ids)`                  | Cancels scheduled notifications with matching IDs.    |
| `getAllDeliveredsOfCurrentScript()`    | Delivered notifications from the current script only. |
| `getAllPendingsOfCurrentScript()`      | Scheduled notifications from the current script only. |
| `removeAllDeliveredsOfCurrentScript()` | Clears current script’s delivered notifications.      |
| `removeAllPendingsOfCurrentScript()`   | Cancels current script’s pending notifications.       |
| `setBadgeCount(count)`                 | Sets the app icon badge value.                        |

---

## NotificationInfo and Request Structure

Use `Notification.current` to access information when the script is launched from a notification tap.

```ts
if (Notification.current) {
  const { title, userInfo } = Notification.current.request.content
  console.log(`Launched from: ${title}`, userInfo)
}
```

### `NotificationRequest`

| Field                      | Description                           |
| -------------------------- | ------------------------------------- |
| `identifier`               | Unique ID for the request             |
| `content.title`            | Notification title                    |
| `content.subtitle`         | Optional subtitle                     |
| `content.body`             | Notification body                     |
| `content.userInfo`         | Custom metadata                       |
| `content.threadIdentifier` | Grouping key                          |
| `trigger`                  | Trigger object that controls delivery |

---

## Comprehensive Example

This example demonstrates a complete use of notification features: custom UI, interactive actions, time-sensitive interruption level, and repeated delivery using `TimeIntervalNotificationTrigger`.

### Step 1: Schedule the Notification

```ts
await Notification.schedule({
  title: "Hydration Reminder",
  body: "Time to drink water!",
  interruptionLevel: "timeSensitive",
  customUI: true,
  trigger: new TimeIntervalNotificationTrigger({
    timeInterval: 3600,
    repeats: true
  }),
  actions: [
    {
      title: "I Drank",
      url: Script.createRunURLScheme("Hydration Reminder", { drank: true }),
    },
    {
      title: "Ignore",
      url: Script.createRunURLScheme("Hydration Reminder", { drank: false }),
      destructive: true
    }
  ]
})
```

### Step 2: Define `notification.tsx`

```tsx
import { Notification, VStack, Text, Button } from 'scripting'

function HydrationUI() {
  return (
    <VStack>
      <Text>Have you drunk water?</Text>
      <Button title="Yes" action={() => console.log("Hydration confirmed")} />
      <Button title="No" action={() => console.log("Reminder ignored")} />
    </VStack>
  )
}

Notification.present(<HydrationUI />)
```

---

## Summary

The `Notification` API in the Scripting app provides rich scheduling capabilities, including:

* Time, calendar, and location-based triggers
* Actionable notifications with structured URL callbacks
* Custom UI for interactive experiences
* Full notification lifecycle management

Migrate to the `trigger`-based scheduling model for full control and platform-aligned behavior.
