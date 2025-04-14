
The `Notification` module in the **Scripting** app allows you to create, manage, and display local notifications with optional rich content and interactive actions. It provides APIs to schedule notifications, customize their appearance, and define actions that users can perform directly within the notification interface.

### Table of Contents
1. **Scheduling Notifications**
2. **Fetching Notifications**
3. **Removing Notifications**
4. **Setting Badge Count**
5. **Displaying Custom UI for Rich Notifications**
6. **Accessing Notification Data in Custom UI**

---

### 1. Scheduling Notifications

The `Notification.schedule` method is used to schedule a local notification with various options, including custom actions and the ability to display a rich notification UI when expanded.

**Method**: `Notification.schedule(options: NotificationScheduleOptions): Promise<boolean>`

#### NotificationScheduleOptions

Use this type to define the configuration for your notification:

```ts
type NotificationScheduleOptions = {
  title: string
  subtitle?: string
  body?: string
  badge?: number
  silent?: boolean
  userInfo?: Record<string, any>
  threadIdentifier?: string
  triggerTime?: number
  repeatsType?: 'hourly' | 'daily' | 'weekly' | 'monthly'
  actions?: NotificationAction[]
  customUI?: boolean
}
```

| Property         | Type                | Description                                                                                         |
|------------------|---------------------|-----------------------------------------------------------------------------------------------------|
| `title`          | `string`            | The main text of the notification alert.                                                            |
| `subtitle`       | `string` (optional) | Additional text to clarify the notification’s purpose. Not displayed in all cases.                  |
| `body`           | `string` (optional) | The main body text of the notification.                                                             |
| `badge`          | `number` (optional) | Number to show on the app icon badge.                                                               |
| `silent`         | `boolean` (optional) | If `true`, suppresses the notification sound (default: `true`).                                     |
| `userInfo`       | `Record<string, any>`(optional) | Custom data associated with the notification, accessible to your script.                           |
| `threadIdentifier` | `string` (optional) | A string to group notifications visually.                                                           |
| `triggerTime`    | `number` (optional) | Time in milliseconds to trigger the notification; `null` for immediate delivery.                    |
| `repeatsType`    | `'hourly' \| 'daily' \| 'weekly' \| 'monthly'` (optional) | Sets the interval for repeating the notification. |
| `actions`        | `NotificationAction[]` (optional) | Interactive actions displayed with the notification. |
| `customUI`       | `boolean` (optional) | If `true`, enables custom UI rendering via `notification.tsx` on a long press or pull-down action.  |

#### NotificationAction

```ts
type NotificationAction = {
  title: string          // Button title
  url: string            // URL to open when tapped; supports Scripting URL scheme or https:// links
  destructive?: boolean  // Optional: Marks the action as destructive
}
```

**Example with Custom UI and Actions:**

Suppose we’re delivering a notification that reminds the user to drink water. In `notification.tsx`, we can display a custom interface with buttons to confirm that the user has taken action (e.g., "Drank Water") or to ignore the reminder. Additionally, we can set `actions` with `NotificationAction` to allow the user to perform similar tasks directly in the notification.

```tsx
// Hydration Reminder index.tsx

await Notification.schedule({
  title: "Hydration Reminder",
  body: "Time to drink water!",
  customUI: true,
  repeatsType: "hourly", // remind once an hour
  triggerTime: 
  actions: [
    {
      title: "I Drank",
      url: Script.createRunURLScheme("Hydration Reminder", {drank: true}),
    },
    {
      title: "Ignore",
      url: Script.createRunURLScheme("Hydration Reminder", {drank: false}),
      destructive: true
    }
  ]
})

// When Hydration Reminder is running,
// the index.tsx is the entry point. 
// Check the value of `Script.queryParameter["drank"]`.
const drank = Script.queryParameters["drank"]
if (drank === "true") {
  // drank
} else if (drank === "false") {
  // ignored
}
```

---

### 2. Fetching Notifications

**Get Delivered Notifications**  
Method: `Notification.getAllDelivereds(): Promise<NotificationInfo[]>`

Returns all delivered notifications still visible in Notification Center.

```ts
type NotificationInfo = {
  // The unique identifier for this notification request.
  identifier: string
  // The delivery timestamp of the notification.
  deliveryTime: number
  // The notification title.
  title: string
  // The notification subtitle.
  subtitle: string
  // The notification body.
  body: string
  // The custom data to associate with the notification.
  userInfo: Record<string, any>
  // The identifier that groups related notifications.
  threadIdentifier: string
}
```

**Get Pending Notifications**  
Method: `Notification.getAllPendings(): Promise<NotificationInfo[]>`

Returns all pending notifications that have not yet been delivered.

---

### 3. Removing Notifications

**Remove All Delivered Notifications**  
Method: `Notification.removeAllDelivereds(): Promise<void>`

Removes all delivered notifications for the current script from Notification Center.

**Remove All Pending Notifications**  
Method: `Notification.removeAllPendings(): Promise<void>`

Removes all pending notifications for the current script.

**Remove Specific Delivered Notifications**  
Method: `Notification.removeDelivereds(identifiers: string[]): Promise<void>`

Removes specific delivered notifications by their identifiers.

**Remove Specific Pending Notifications**  
Method: `Notification.removePendings(identifiers: string[]): Promise<void>`

Removes specific pending notifications by their identifiers.

---

### 4. Setting Badge Count

**Method**: `Notification.setBadgeCount(count: number): Promise<boolean>`

Updates the Scripting app icon’s badge count.

**Example:**

```ts
await Notification.setBadgeCount(5)
```

---

### 5. Displaying Custom UI for Rich Notifications

By setting `customUI` to `true` in `NotificationScheduleOptions`, you can enable rich notifications. When the user expands the notification (e.g., by long-pressing), the custom UI defined in `notification.tsx` will render, allowing you to display interactive elements and capture user input.

**Method**: `Notification.present(element: JSX.Element)`

This method is used within `notification.tsx` to present custom UI when a notification is expanded.

**Example in `notification.tsx`:**

```tsx
import { Notification, VStack, Text, Button, } from 'scripting'

function HydrationNotification() {
  const handleDrinkWater = () => {
    // Logic to log that water was consumed
    console.log("User drank water")
  }

  const handleIgnore = () => {
    // Logic to ignore this reminder
    console.log("User ignored the reminder")
  }

  return (
    <VStack>
      <Text>Remember to stay hydrated!</Text>
      <Button title="I Drank" action={handleDrinkWater} />
      <Button title="Ignore" action={handleIgnore} />
    </VStack>
  )
}

Notification.present(<HydrationNotification />)
```

---

### 6. Accessing Notification Data

**Property**: `Notification.current`

When a notification opens the script or when rendering the rich notification UI, you can access the notification’s information via `Notification.current`.

**Example:**

```ts
const notificationData = Notification.current
if (notificationData != null) {
  console.log(notificationData.title, notificationData.body)
}
```

---

This documentation provides an overview of how to use the `Notification` module in the **Scripting** app to deliver, manage, and customize notifications with actionable elements and rich content. Happy coding!
