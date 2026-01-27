# Notification

The `Notification` module in the **Scripting** app allows you to schedule, manage, and display local notifications with advanced trigger types, interactive actions, and rich UI capabilities.

***

## Table of Contents

1. [Scheduling Notifications](#scheduling-notifications)
2. [Notification Triggers](#notification-triggers)

   - [TimeIntervalNotificationTrigger](#timeintervalnotificationtrigger)
   - [CalendarNotificationTrigger](#calendarnotificationtrigger)
   - [LocationNotificationTrigger](#locationnotificationtrigger)
3. [Notification Actions](#notification-actions)
4. [Rich Notifications with Custom UI](#rich-notifications-with-custom-ui)
5. [Managing Notifications](#managing-notifications)
6. [NotificationInfo and Request Structure](#notificationinfo-and-request-structure)
7. [Comprehensive Example](#comprehensive-example)

***

## Scheduling Notifications

Use `Notification.schedule` to schedule a local notification. It supports content, triggers, tap behaviors, action buttons, rich UI, and delivery configurations:

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
  tapAction: {
    type: "runScript",
    scriptName: "Acknowledge Script"
  },
  customUI: false
})
```

### Parameters

| Name                | Type                                                                                                          | Description                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `title`             | `string`                                                                                                      | Required. Notification title.                                                    |
| `subtitle`          | `string?`                                                                                                     | Optional. Additional context.                                                    |
| `body`              | `string?`                                                                                                     | Optional. Main content text.                                                     |
| `badge`             | `number?`                                                                                                     | Optional. App icon badge count.                                                  |
| `iconImageData`     | `Data` \| `SystemImageIcon` \| `null`                                                                         | Optional. Custom notification icon image data or system icon name.               |
| `silent`            | `boolean?`                                                                                                    | Optional. Defaults to `false`. If `true`, delivers silently without sound.       |
| `interruptionLevel` | `"active"` \| `"passive"` \| `"timeSensitive"`                                                                | Optional. Defines priority and delivery behavior.                                |
| `userInfo`          | `Record<string, any>?`                                                                                        | Optional. Custom metadata.                                                       |
| `threadIdentifier`  | `string?`                                                                                                     | Optional. Identifier for grouping notifications.                                 |
| `trigger`           | `TimeIntervalNotificationTrigger` \| `CalendarNotificationTrigger` \| `LocationNotificationTrigger` \| `null` | Optional. Defines when the notification is delivered.                            |
| `actions`           | `NotificationAction[]?`                                                                                       | Optional. Action buttons shown when long-pressing or expanding the notification. |
| `customUI`          | `boolean?`                                                                                                    | Optional. Enables rich notification UI using `notification.tsx`.                 |
| `tapAction`         | `"none"` \| `{ type: "runScript", scriptName: string }` \| `{ type: "openURL", url: string }`                 | Optional. Controls what happens when the user taps the notification.             |

#### SystemImageIcon

```ts
type SystemImageIcon = {
  systemImage: string
  color: Color
}
```

Used to define notification icon using system image name and color.

- `systemImage`: SFSymbol name
- `color`: Icon color

***

### Notification Actions (`actions`)

The `actions` parameter defines action buttons that are shown when the user long-presses or expands the notification. Each action has a title and an optional URL to open when tapped.

#### Notification Action (`NotificationAction`)

```ts
type NotificationAction = {
  title: string;
  icon?: string;
  url: string;
  destructive?: boolean;
}
```

- `title`: Action button title
- `icon`: Action button icon
- `url`: URL to open when tapped
- `destructive`: Whether the action is destructive

***

### Tap Behavior (`tapAction`)

The `tapAction` parameter gives you precise control over what happens when the user taps the notification:

- `"none"` – Do nothing when tapped
- `{ type: "runScript", scriptName: string }` – Run a different script
- `{ type: "openURL", url: string }` – Open a deep link or web page

If `tapAction` is not provided, the default behavior is to run the **current script**, and the notification details can be accessed using `Notification.current`.

***

## Notification Triggers

### TimeIntervalNotificationTrigger

Triggers a notification after a specified number of seconds.

```ts
new TimeIntervalNotificationTrigger({
  timeInterval: 3600,
  repeats: true
})
```

- `timeInterval`: Delay in seconds
- `repeats`: Whether it repeats
- `nextTriggerDate()`: Returns the next expected trigger date

***

### CalendarNotificationTrigger

Triggers when the current date matches specific calendar components.

```ts
const components = new DateComponents({ hour: 8, minute: 0 })
new CalendarNotificationTrigger({
  dateMatching: components,
  repeats: true
})
```

- Supports components like `year`, `month`, `day`, `hour`, etc.
- Useful for daily or weekly reminders

***

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

- Fires based on entering/exiting the specified circular region

***

## Notification Actions

Use the `actions` array to define buttons shown when the notification is expanded:

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

- Use `Script.createRunURLScheme(...)` to generate Scripting app URLs
- Action buttons appear on long-press or pull-down

***

## Rich Notifications with Custom UI

You can provide an interactive JSX interface:

1. Set `customUI: true` in the `Notification.schedule()` call
2. Create a `notification.tsx` file
3. Call `Notification.present(element)` inside that file

### `Notification.present(element: JSX.Element): void`

Must be called from `notification.tsx`. Renders the element as the expanded notification interface.

***

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

***

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

***

## NotificationInfo and Request Structure

Use `Notification.current` to get launch context when the script is opened from a notification tap:

```ts
if (Notification.current) {
  const { title, userInfo } = Notification.current.request.content
  console.log(`Launched from: ${title}`, userInfo)
}
```

### `NotificationRequest` Fields

| Field                      | Description                           |
| -------------------------- | ------------------------------------- |
| `identifier`               | Unique ID for the request             |
| `content.title`            | Notification title                    |
| `content.subtitle`         | Optional subtitle                     |
| `content.body`             | Notification body                     |
| `content.userInfo`         | Custom metadata                       |
| `content.threadIdentifier` | Grouping key                          |
| `trigger`                  | Trigger object that controls delivery |

***

## Comprehensive Example

This example demonstrates a full-featured notification with actions, rich UI, and repeated delivery.

### Step 1: Schedule the Notification

```ts
await Notification.schedule({
  title: "Hydration Reminder",
  body: "Time to drink water!",
  interruptionLevel: "timeSensitive",
  iconImageData: UIImage
    .fromSFSymbol("waterbottle")!
    .withTintColor("systemBlue")!
    .toPNGData(),
  customUI: true,
  trigger: new TimeIntervalNotificationTrigger({
    timeInterval: 3600,
    repeats: true
  }),
  tapAction: {
    type: "runScript",
    scriptName: "Hydration Tracker"
  },
  actions: [
    {
      title: "I Drank",
      url: Script.createRunURLScheme("Hydration Tracker", { drank: true }),
    },
    {
      title: "Ignore",
      url: Script.createRunURLScheme("Hydration Tracker", { drank: false }),
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

***

## Summary

The `Notification` API in the Scripting app supports:

- Time, calendar, and location-based triggers
- Actionable buttons and script redirection
- Tap behaviors via `tapAction`
- Rich notification UI via `notification.tsx`
- Full lifecycle management (deliver, remove, query)
